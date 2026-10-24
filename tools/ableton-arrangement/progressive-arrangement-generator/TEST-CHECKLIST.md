# Test checklist

[README](README.md) · [Validation results](VALIDATION.md)

This is a repeatable check for your setup. Use a disposable Live Set so the experiments stay separate from a production session. The recorded implementation test results are in `VALIDATION.md`; unchecked items below are instructions, not claims of completion.

## Basic use

- [ ] Load the AMXD onto an empty MIDI track and wait for Ready.
- [ ] Stop playback/recording and use 4/4.
- [ ] Choose G Natural Minor, progression 1–6–3–7, Start bar 1, Density 60%, Variation 35%, Seed 1.
- [ ] Set all six section lengths to 4 bars for a 24-bar sketch.
- [ ] Click Preview. Confirm section boundaries and Bass / Chords / Arp counts appear and the track count does not change.
- [ ] Click Generate once. Confirm progress appears and action buttons disable until completion.
- [ ] Confirm three fresh numbered MIDI tracks exist in Arrangement View.
- [ ] Confirm the clips occupy the expected section ranges, with bass absent in Intro and Break.
- [ ] Double-click a clip and confirm its MIDI notes are editable.

## Getting sound and musical review

- [ ] Before loading instruments, play the generated range and confirm MIDI activity but no generated audio.
- [ ] Stop, then load your chosen instruments on the generated Bass, Chords, and Arp tracks.
- [ ] Confirm their output reaches Main and set comfortable instrument levels.
- [ ] Audition each part individually, then together.
- [ ] Listen for bass/chord compatibility, comfortable registers, useful arp movement, section entrances, the bass-free break, and the thinning outro.
- [ ] Adjust instrument release/polyphony if sustained chord tails or low-register notes clash with your sounds.

## Versions and reproducibility

- [ ] Keep an earlier generation's clips or musical phrase on another track as a reference.
- [ ] Generate again with identical controls and seed; compare notes, timing, and velocities, rather than track names or run numbers.
- [ ] Confirm earlier clips remain intact.
- [ ] Mute the earlier output tracks before auditioning another generation.
- [ ] Click New Seed. Confirm the seed changes without creating tracks.
- [ ] Preview and generate with the new seed; confirm a new numbered set of tracks appears.
- [ ] Try Start bar 257 and a seed above 256; confirm neither control is capped at 256.

## Persistence and guard behavior

- [ ] Save with nondefault settings, close the test Set, and reopen it.
- [ ] Confirm controls and generated clips return.
- [ ] While playing, attempt Generate; confirm a playback/recording error and no additional tracks.
- [ ] Stop, change the meter to 3/4, and attempt Generate; confirm a 4/4-only error and no additional tracks. Restore 4/4 afterward.
- [ ] Set Density to zero and attempt Generate; confirm an empty-composition error and no additional tracks.
- [ ] Set all section lengths to zero and attempt Preview; confirm an error. Restore nonzero sections afterward.
- [ ] Set one section length to zero; confirm it is skipped and later boundaries move earlier by its former length.

## Developer checks

Run from the `progressive-arrangement-generator` folder with Python 3 and Node installed:

```sh
node tests/test.js
```

The full downloadable toolkit contains an additional saved-Set verifier. The public repository omits its validation Set fixture. If Node is not on your PATH, use `--node /absolute/path/to/node`.

To rebuild after source changes:

```sh
python3 source/build_device.py
node tests/test.js
```

Rebuilding overwrites the generated AMXD and `.maxpat` with the current source. Retest a newly loaded device in Live after changes. A passing composition test does not replace in-app API, persistence, or listening checks.
