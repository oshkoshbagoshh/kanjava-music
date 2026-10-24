# Phase 2 validation

Tested October 24, 2026 on macOS, Live 12.4.7 and bundled Max 9.1.5, in a separate **PAG Sine Playback Test** Set copied from the Phase 1 validation Set. The original Phase 1 Set was not edited.

## Results

- Instrument loaded successfully on PAG 1 Bass, Chords and Arp; Live changed their outputs from No Output to Main.
- Real-time Arrangement playback drove MIDI counters, signal meters and Live’s track/Main meters.
- Live exported separate Bass, Chords and Arp WAVs for bars 33–37: each is eight seconds, stereo, 44.1 kHz, 16-bit PCM, at 120 BPM. Normalize was off. Live’s triangular dither introduces very low-level noise in the additional empty-track renders.
- Measured peaks: Bass **−20.62 dBFS**, Chords **−16.67 dBFS**, Arp **−20.47 dBFS**. All have substantial nonzero RMS and **zero clipped samples**.
- Spectral energy within 8 Hz of the expected MIDI pitches over this excerpt: Bass **98.38%**, Chords **99.42%**, Arp **94.59%**. This is a broad pitch-content check, not proof of every note’s onset or envelope.
- Saved Set comparison: **5,947 notes and 48 clips exactly unchanged**, across all three prior generated runs. Exactly three Max instruments were added, on the intended PAG 1 tracks.
- Set saved and reopened successfully, with the three instruments and default controls present.
- Export Report worked in the locked Max editor presentation. The exported arp trace contains **38 note-ons, 38 note-offs, Held 0**, and measured audio peak **0.093311**. That real-time audition has a different duration from the fixed four-bar renders.
- Four automated test groups passed: note handling/frequency, actual-peak evidence, reset/panic/bounded diagnostics, and the embedded eight-voice stereo signal path.
- The `.amxd` embeds all eight voice patchers and diagnostic JavaScript. It has no external dependency cache or absolute source paths and was saved through Max.

See `validation/playback-verification.json` for measurements and WAV hashes, `validation/arp-playback-report.json` for the runtime trace, and `tests/test-results.json` for static test results. The full downloadable toolkit includes the playback Set and WAV renders used in this run; they are omitted from the public repository.

## Limits and follow-up checks

Diagnostic buttons did not respond to automated clicks in Live’s embedded device panel; use the locked Max editor presentation. Export is runtime tested there; Panic’s voice-release wiring and diagnostic behavior are structurally/unit tested, but a deliberately stuck note was not induced in Live. Non-default control persistence was not separately verified. Physical speaker audibility and a subjective full-arrangement listening pass were not verified. Runtime audio testing covers the four-bar Main A excerpt and short real-time auditions, not every section of the 128-bar arrangement. The Set’s complete MIDI contents were compared, rather than listening to all 128 bars.

## Repeat the test

1. In Live, add the instrument to a generated Bass, Chords or Arp track and start in Main A (bar 33 in the default form).
2. Inspect MIDI counters and output meters; confirm Live’s Main meter responds.
3. For a fresh JSON trace, open that instrument’s Max editor first, lock its presentation, Reset Stats, play, stop, then Export Report.
4. Run `node tests/test.js` for the included static checks. To reproduce the saved-Set comparison and audio measurements, use the validation fixtures from the full downloadable toolkit.
