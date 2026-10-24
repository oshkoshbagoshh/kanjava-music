# Kanjava Music — Arrangement Tools

## Project brief

Make the Progressive Arrangement Generator and Sine Test Instrument useful inside the Kanjava Ableton workflow. The two devices are built and separately validated. Next, test in a duplicate Kanjava Set, publish device sources in GitHub, and document the repeatable workflow.

## Milestones

### Package and source control

- [x] Use the existing public repository: `oshkoshbagoshh/kanjava-music`, branch `main` (`tools/ableton-arrangement/`).
- Commit both `.amxd` files, editable Max/JavaScript sources, build scripts, product docs and suitable validation records.
- Exclude the full Kanjava Live Set and media unless they are specifically cleared for sharing.

### Safe Kanjava integration

- Create a new working copy of the Kanjava Set in its own project folder. Inventory samples, plug-ins, presets and routing; collect project media where appropriate.
- Select a Kanjava section, start bar, key and progression. Add the generator to an empty MIDI track. Preview, then generate Bass, Chords and Arp.
- Add the sine instrument to each generated track. Check clip fit, MIDI reception, audio level and routing in context. Replace or remove test tones after auditioning.
- Save the result as a new Set and reopen it. Keep the source Set untouched.

### Repeatable workflow and release

- Document chosen musical section, harmony assumptions, arrangement placement and instrument replacement steps.
- Decide what Set, media and audio files can be shared. Document repository and release contents.

## Completion criteria

- A duplicate Kanjava Set opens with its required dependencies accounted for.
- Generated clips fit the selected section and existing tracks remain intact.
- Bass, Chords and Arp are independently audible, and the saved Set reopens.
- A future session can repeat the process from repository docs.

## Current state

The standalone toolchain is packaged under this folder and is being added to the existing public repository `oshkoshbagoshh/kanjava-music` under `tools/ableton-arrangement`. Phase 2 rendered separate four-bar Bass, Chords and Arp WAVs in Live with nonzero signal and no clipped samples; all 5,947 MIDI notes and 48 prior clips remained unchanged in the test Set. The Kanjava Set itself has not yet been modified or auditioned with these devices.

Linear project: [Kanjava Music — Arrangement Tools](https://linear.app/ajavadi/project/kanjava-music-arrangement-tools-88902f7e0c93)

Linear roadmap document: [Kanjava Arrangement Tools — Integration Roadmap](https://linear.app/ajavadi/document/kanjava-arrangement-tools-integration-roadmap-fc134b735620). GitHub repository selection is tracked in issue AJ-6; the selected repository is `oshkoshbagoshh/kanjava-music` on `main`.
