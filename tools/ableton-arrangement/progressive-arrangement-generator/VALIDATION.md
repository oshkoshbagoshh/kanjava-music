# Validation

Tested on macOS with **Ableton Live 12.4.7 / Max 9.1.5**, October 24, 2026.

## Automated checks

`node tests/test.js` passes 10 test groups, including a 576-case composition matrix covering all 12 roots, both scales, all three progressions, four density settings, and both variation extremes.

Checks cover reproducibility, different seeds, scale membership, pitch ranges, triads, grid timing, positive durations, note boundaries, monophonic bass, omitted sections, nonzero placement, maximum section lengths, invalid inputs, and the large-range seed control. The writer is also tested against a simulated Live host for busy-state exclusion, repeated generation, bounded note writes, silent API failures, and stopping on playback or errors without deleting partial output.

The exact delivered AMXD is parsed to verify both embedded JavaScript modules match their source files, no external dependencies or absolute source paths exist, no audio objects exist, all 13 controls are registered, and the wide-range parameters use Float storage with Int display. This avoids Max's 256-value native integer parameter limit.

## Actual Live / Max for Live checks

Generation was exercised in Max's editor while hosted by a separate, disposable Live Set. Three generation runs completed with successful readback of every note:

| Run | Density | Seed | Start bar | Bars | Clips | Verified notes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| PAG 1 | 60% | 1 | 1 | 128 | 16 | 1,311 |
| PAG 2 | 100% | 2 | 5 | 128 | 16 | 2,355 |
| PAG 3 | 100% | 16,603,538 | 257 | 128 | 16 | 2,281 |

- Every run created three new numbered MIDI tracks. Earlier generated clips remained intact.
- Arrangement View visually showed named, colored MIDI clips with editable note content, including sustained triads and denser arp passages.
- Action buttons visibly disabled during generation and returned when it completed.
- Preview populated all six section boundaries and note counts without creating tracks.
- New Seed produced and displayed a value well above 256 without writing clips.
- Generate rejected active playback with an explanatory message and no extra tracks.
- Generate rejected 3/4 with an explanatory message and no extra tracks. The test Set was returned to 4/4.
- A saved/reopened Set retained the generated clips and nondefault Density, Seed, and Start Bar settings.
- Generated tracks contained no instruments and used Live's default No Output MIDI routing. During playback their MIDI meters were active and the Main audio meter remained silent.
- The final AMXD was saved through Max and rechecked for embedded source and dependency integrity.

The full downloadable toolkit includes a disposable validation Set and an optional verifier for independent `.als` readback of all **5,947 notes**, clip positions and lengths. It confirms the original four test tracks remain present, all 13 parameters are stored, and earlier runs survive later generations. This repository contains the resulting `validation/live-set-verification.json` report, but omits the Set fixture.

## Limits of verification

- Subjective listening through user-selected instruments has **not** been performed. Add your own bass, chord, and arp instruments and audition the transitions before using the material in a production.
- No compatibility claim is made for older Max versions, Windows, other Live versions, or third-party instruments.
- API failure injection, mid-run interruption, recording-state rejection, all-skipped sections, and density-zero rejection were covered by automated tests; not every failure was deliberately induced in Live.
- Long-range control persistence is also stored in the validation Set; the earlier save/reopen UI check used seed 2 and start bar 5.
