# Frequently asked questions

[README](README.md) · [Quick start](QUICKSTART.md) · [Troubleshooting](TROUBLESHOOTING.md)

## What does this device actually make?

It composes MIDI notes for bass, chords, and arpeggios, then creates ordinary editable MIDI clips in Arrangement View. Each generation creates three fresh MIDI tracks, with named and colored clips for the enabled, nonempty sections.

## Why is there no sound?

It contains no instruments and produces no audio. Load your own instruments on the **generated Bass, Chords, and Arp tracks**. Adding an instrument only to the generator/control track will not voice the clips on those other tracks.

## Is it a real-time sequencer or a MIDI Generator in Live's clip editor?

Neither. It is a standard Max for Live MIDI Effect that writes a complete arrangement when you click Generate. It does not require a recording pass and does not stream newly generated MIDI notes during playback.

## What is the difference between the control track and the generated tracks?

The control track holds this Max for Live device. The new `PAG N Bass`, `PAG N Chords`, and `PAG N Arp` tracks hold the actual composition. Put sound-producing instruments on those new tracks.

## Where are the clips? I don't see anything in Session View.

They are in Arrangement View. Press Tab to switch views, find the new tracks near the end of your track list, and navigate to the Start bar you selected.

## Do I need to arm a track or record the output?

No. Generate writes notes directly into clips. Track arming and recording are unnecessary.

## Does it change my tempo, global scale, or existing clips?

It does not change tempo, the Set's global scale, existing clips, existing routing, or instruments. It appends new tracks. It also does not start playback or move your loop brace. Keep the Set stopped and avoid editing tracks during generation.

## Does it follow the key shown at the top of Live?

No. Choose Root and Scale on the device. Live's clip scale highlighting may inherit the Set's scale and can therefore differ from the device's selected key. The actual note pitches follow the device's controls.

## What do the progression numbers mean?

They are scale degrees, with one chord per bar and a four-bar repeating cycle. In G natural minor:

| Device progression | Chords |
| --- | --- |
| 1–6–3–7 | G minor → E-flat major → B-flat major → F major |
| 1–7–6–7 | G minor → F major → E-flat major → F major |
| 1–4–6–5 | G minor → C minor → E-flat major → D minor |

All chords stay diatonic. The last progression uses **D minor**, not a harmonic-minor D major dominant. In Major mode, the same numbers refer to the chosen major scale.

## What does a Seed do?

A seed identifies a reproducible composition. Identical settings and seed produce identical pitches, timings, durations, and velocities. The UI accepts integers from 1 to 16,777,215.

New Seed picks another seed but does not create clips. Click Preview to inspect it and Generate to write another arrangement. Changing Density, Variation, harmony, or section lengths can change the notes even when the seed stays the same.

## Are Density and Variation the same thing?

No. Density controls rhythmic omissions. Variation controls the chance of arp-pattern changes at four-bar boundaries and occasional bass approaches. Velocity variation is restrained and seeded; timing remains on the grid.

At 100% Density, Intro, Break, Build, and Outro still apply their section-specific energy shaping. It does not mean every possible note plays in every section.

## Why is the bass missing from Intro and Break?

That is intentional. Intro introduces sparse chords and arp. Build brings in bass and increases activity. Main A uses all parts. Break removes bass and thins the arp. Main B restores the parts. Outro gradually reduces activity.

## Why are there fewer than 18 clips?

There are six sections and three parts, but Intro and Break omit bass. At the default settings this gives 16 clips. Lower density or other seeds can leave additional part/section combinations empty. Empty clips are omitted while the section's duration remains in the timeline.

## Can I make shorter songs or skip a section?

Yes. Section lengths are 0–64 bars in increments of four. Zero skips a section. Setting all six lengths to 4 gives a 24-bar sketch; the defaults total 128 bars. At least one section must be enabled.

## Does Preview create anything? Do changed controls update existing clips?

Preview does not write to Live. Changing controls also does not rewrite existing clips. Generate takes a snapshot of the current controls and writes fresh tracks. Settings changed while generation is busy apply to the next run.

## What happens if I press Generate twice?

Clicks are blocked while generation is busy. After it finishes, another Generate creates another numbered set of three tracks. Previous material remains, so mute earlier versions when comparing ideas.

## Does the device copy instruments to the next generation?

No. Every new generation starts with empty MIDI tracks. Copy your selected instruments to the new tracks yourself if you want the same sounds.

## Can I use different sounds or edit the notes?

Yes. The clips are normal MIDI. Use any suitable pitched instruments and Live's normal MIDI editing tools. Bass is monophonic; chords are sustained triads; the arp is already written as individual notes.

## Does it generate drums, automation, or a finished mix?

No. Version one generates bass, chords, and arp notes only. Sound design, drums, automation, effects, mixing, and final musical decisions remain yours.

## Can I use 3/4, custom scales, or my own progression?

Version one supports 4/4, Major/Natural Minor, and the three listed progressions. Custom meters, scales, progressions, and source-clip rearrangement would require a source change.

## Can I remove the device afterward?

Yes. Generated clips remain on their tracks. Save your Set first. You do not need to keep the device active for those clips to play through your instruments.

## How do I remove an unwanted generation?

Once generation has stopped, select only that generation's three output tracks and delete them, or mute them to keep the idea. Check the `PAG N` number so you do not remove another version. The device does not promise a single-step Undo for the whole generation.

## What happens if generation fails halfway?

The device stops, shows an error, and retains partial output for inspection. It does not delete tracks or silently retry. Review any reported output tracks before generating again; see [Troubleshooting](TROUBLESHOOTING.md).

## Does it use AI, upload my project, or need an internet connection?

No. The device uses local, deterministic composition code and Live's API. It does not call an AI service, read your musical clips as input, or upload the Set.

## Do I need the source files, Python, or Node to use it?

No. Both JavaScript modules are embedded in the AMXD. Python and Node are only used for rebuilding and developer tests.

## Which versions have actually been tested?

Live 12.4.7 with Max 9.1.5 on macOS. The device targets Max 9.1 or newer. Other combinations have not been verified; see the [validation report](VALIDATION.md).

## Is it recreating the film soundtrack?

No. It creates original MIDI from a small set of harmonic and rhythmic rules, designed around a driving progressive arrangement. It does not sample or reproduce the soundtrack tracks discussed earlier.
