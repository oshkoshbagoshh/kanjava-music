# PAG Sine Test Instrument — Phase 2

A basic eight-voice Max for Live instrument for auditioning the Progressive Arrangement Generator’s MIDI. It receives MIDI notes and produces sine-wave audio with a velocity-sensitive envelope. Bass, chords and arp can each use a separate instance.

## Start here

1. Open Live 12 Suite with Max 9 available. This version was tested with Live 12.4.7 and bundled Max 9.1.5.
2. Drag **PAG Sine Test Instrument.amxd** onto a generated **Bass** MIDI track. Repeat for **Chords** and **Arp**. Add it to the tracks containing clips; the generator’s own track contains no generated notes.
3. Leave track monitoring on **Auto**, turn track activators on, and route the instrument tracks to **Main**. Track arming is unnecessary for Arrangement playback.
4. Start playback in **Main A**, where all three parts are active. With the default arrangement starting at bar 1, Main A begins at **bar 33**.
5. Watch the MIDI counters, Output meter and **Audio observed** message. Check Live’s Main meter and your chosen audio output if the device shows signal but you cannot hear it.

Keep playback volume comfortable. The default Level is 70%; each of eight voices is scaled by 1/8 for polyphonic headroom. The sound is intentionally plain and relatively quiet.

## Controls

| Control | Default | Function |
|---|---:|---|
| Level % | 70 | Output gain, 0–100% |
| Attack ms | 5 | Envelope attack, 1–1,000 ms |
| Release ms | 120 | Envelope release, 5–2,000 ms |
| Reset Stats | — | Reset diagnostic counts; currently held notes remain tracked |
| Panic | — | Release allocated voices and clear diagnostic held-note tracking |
| Export Report | — | Save a JSON snapshot of MIDI events and measured signal peaks |

For reliable use of the diagnostic buttons in this tested build, click the device’s **Edit** button to open Max, then **Cmd+E** if the window says “unlocked presentation.” Click Reset Stats, Panic or Export Report in the locked presentation. Button clicks in Live’s embedded panel did not respond during automated testing. Opening the editor starts a fresh diagnostics session, so open it **before** playback when collecting a report. Close the editor to return to Live.

Level, Attack and Release are Live parameters saved with the Set. Diagnostic history is temporary and restarts when the device reloads. Reports must be exported to retain them.

## Installation

Copy the `.amxd` into your Live User Library or drag it onto a MIDI track that contains generated clips. No JavaScript sidecar files or samples are needed. The complete downloadable toolkit also includes a ready-made playback Set for repeatable Live testing; the public repository omits that Set and its WAV renders.

## Included files

- `.amxd`: self-contained playable instrument, saved through Max.
- `source/`: editable `.maxpat`, embedded diagnostic JavaScript, and Python builder.
- `tests/test.js`: diagnostic and patch-structure checks, runnable with Node.
- `validation/`: machine-readable playback reports. The full downloadable toolkit includes the playback Set and WAVs.
- `FAQ.md` and `VALIDATION.md`: troubleshooting and exact verification scope.

Rebuilding with `python3 source/build_instrument.py` overwrites the `.amxd` with the source-generated version. Keep a copy of native Max edits before rebuilding.

## Architecture

`notein → poly 8 1 → eight embedded sine/envelope voices → summed gain → safety clip → stereo plugout~`.

Each voice uses `mtof`, `cycle~` and `adsr~`. The output is dual mono. JavaScript counts MIDI and measures peaks supplied by `peakamp~`; it does not synthesize audio or change clips. The instrument does not generate tracks, change transport or tempo, or modify MIDI clips.

References: [poly](https://docs.cycling74.com/reference/poly/), [adsr~](https://docs.cycling74.com/reference/adsr~/), [peakamp~](https://docs.cycling74.com/reference/peakamp~/), [Max File API](https://docs.cycling74.com/apiref/js/file/).
