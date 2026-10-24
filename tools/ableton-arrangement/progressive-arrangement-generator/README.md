# Progressive Arrangement Generator

A MIDI-only Max for Live device that composes bass, chords, and arpeggios and writes them into Arrangement View. It is a starting point for driving progressive tracks, with editable notes and six song sections.

## Start here

**Load the device on an empty MIDI track → stop Live → Preview → Generate 3 Tracks → add instruments to the new tracks → play the Arrangement.**

The device itself is silent. Its job is to write notes; your instruments turn those notes into sound. You do not need to record its output or arm a track to generate clips.

| Guide | What it covers |
| --- | --- |
| [Quick start](QUICKSTART.md) | Your first arrangement, finding the clips, and getting sound. |
| [FAQ](FAQ.md) | Seeds, harmony, empty sections, repeated generation, editing, and limitations. |
| [Troubleshooting](TROUBLESHOOTING.md) | No sound, missing clips, error messages, compatibility, and partial output. |
| [Test checklist](TEST-CHECKLIST.md) | A short acceptance check in a disposable Set and developer test commands. |
| [Validation report](VALIDATION.md) | What was actually tested and what remains unverified. |

If you downloaded the ZIP, unzip it first. You only need `Progressive Arrangement Generator.amxd` to use the device; the other files explain, demonstrate, or rebuild it.

## Requirements and installation

- Ableton Live 12 Suite with **Max 9.1 or newer** selected as its Max application. Tested with Live 12.4.7 and bundled Max 9.1.5 on macOS.
- Drag **Progressive Arrangement Generator.amxd** onto a MIDI track, or add this folder to Live's Browser and double-click the device.
- The AMXD contains both JavaScript modules inside embedded `v8.codebox` objects. You can move the AMXD alone; the `source` folder is for editing and rebuilding, not a runtime dependency.
- No package installation, external JavaScript libraries, samples, audio plugins, or network access is required.

## Use

1. Stop Live's playback and recording. Use a 4/4 Set.
2. Choose a root, scale, progression, and starting bar.
3. Set section lengths. They are multiples of four bars; **0 skips a section**.
4. Set Density, Variation, and Seed. Click **Preview** to see section boundaries and Bass / Chords / Arp note counts without changing the Set.
5. Click **Generate 3 Tracks**. Wait for **Done**. Each generation appends fresh tracks named `PAG 1 Bass`, `PAG 1 Chords`, and `PAG 1 Arp`, with increasing run numbers on later generations.
6. Open Arrangement View and add your own instruments to those tracks. The generated tracks contain MIDI clips and no instruments, so they are silent until you add sound sources.
7. Save the Live Set to retain settings and clips.

The first generated group normally appears near the end of the track list. Press **Tab** to switch between Session and Arrangement View, and select the new tracks if they are outside the visible area. To audition another generation, mute the previous generation's three tracks first so both versions do not play together.

For a short first experiment, set all six section lengths to **4 bars**. This creates a 24-bar structure. Use the default 128-bar structure once you are comfortable with the workflow.

You can remove the generator after creating clips; the clips remain ordinary editable MIDI. The host MIDI Effect passes incoming MIDI through unchanged but never generates live notes or audio.

## Controls

| Control | Behavior |
| --- | --- |
| Root / Scale | C–B; Major or Natural Minor. Defaults to G Natural Minor. Independent of Live's displayed Set scale. |
| Progression | Scale degrees 1–6–3–7, 1–7–6–7, or 1–4–6–5. All chords are diatonic; degree 5 in natural minor is a minor chord. |
| Start bar | First Arrangement bar, beginning at 1. It does not move Live's playhead or change its loop brace. |
| Section lengths | Intro, Build, Main A, Break, Main B, Outro; 0–64 bars each. Defaults: 16 / 16 / 32 / 16 / 32 / 16. |
| Density | Probability threshold for rhythmic omissions. Section energy still shapes the result at 100%. Zero produces an empty preview and cannot generate tracks. |
| Variation | Chance of changing the arp pattern at four-bar boundaries, plus occasional diatonic bass approaches. |
| Seed | Integer 1–16,777,215. Identical settings and seed give identical notes. New Seed changes only the control; it does not write clips. |
| Preview | Calculates notes, section boundaries, and counts without writing to Live. End bars are exclusive: 1–17 means bars 1 through 16. |
| Generate | Creates three fresh MIDI tracks and clips, then reads every clip's notes back from Live to verify them. |

Changing controls never writes clips automatically. Preview and Generate use a snapshot of the controls. Settings changed during generation apply to the next run.

## Musical behavior

The harmony follows a four-bar cycle with one chord per bar. Bass uses monophonic eighth-note pulses in MIDI range 31–55. Chords use sustained, voice-led triads in range 55–79. Arpeggios use sixteenth-note chord patterns in range 67–91. Note timing stays on the grid; velocities have restrained seeded variation.

Intro is sparse and omits bass. Build increases density. Main A uses all three parts. Break omits bass and reduces arp activity. Main B restores the parts with related variations. Outro gradually reduces density. Low-density settings can leave some parts or sections empty; empty clips are omitted, but section time is preserved.

## Existing material and errors

The device appends tracks and never overwrites existing clips, inserts instruments, changes existing routing, changes tempo, or starts playback. Action buttons are disabled while writing. Keep the Set stopped and avoid editing tracks until generation finishes.

Unsupported meters, active playback/recording, all-skipped sections, invalid settings, and an empty composition are rejected. If an API operation fails or playback starts during generation, the device stops and reports the error and any partially created tracks. It does not silently retry or delete output. Inspect any partial tracks before generating again.

Live's clip scale highlighting can inherit the Set's scale; the composed note pitches follow the device's Root and Scale controls. The device does not change the Set's global scale.

## Source and tests

- `source/composer.js`: deterministic, standalone musical engine.
- `source/device-controller.js`: controls and preview.
- `source/arrangement-writer.js`: deferred write state machine.
- `source/live-adapter.js`: Live Object Model calls and note readback.
- `source/Progressive Arrangement Generator.maxpat`: editable patch with embedded source.
- `source/build_device.py`: rebuilds the patch and AMXD using Python's standard library.

From this folder:

```sh
python3 source/build_device.py
node tests/test.js
```

The full downloadable toolkit includes an optional `verify_live_set.py` checker and disposable validation Set; both are omitted from this public repository. See `VALIDATION.md` for test scope and remaining listening checks.

The implementation uses Cycling '74's documented [Arrangement clip creation](https://docs.cycling74.com/apiref/lom/track/), [MIDI notes API](https://docs.cycling74.com/apiref/lom/clip/), and [embedded JavaScript codeboxes](https://docs.cycling74.com/reference/v8.codebox/).
