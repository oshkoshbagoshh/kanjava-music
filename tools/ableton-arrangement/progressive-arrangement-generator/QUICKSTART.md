# Quick start: from an empty MIDI track to an arrangement

[README](README.md) · [FAQ](FAQ.md) · [Troubleshooting](TROUBLESHOOTING.md)

## 1. Load the device

Unzip the download. In Ableton Live 12 Suite, create or select an empty MIDI track. Drag `Progressive Arrangement Generator.amxd` from Finder onto that track's Device View.

Alternatively, add the device's folder to Live's Browser, select a MIDI track, and double-click the device in the Browser. You should see its Root, Scale, Progression, section-length controls, and three action buttons.

You need Max 9.1 or newer. The tested combination is Live 12.4.7 with bundled Max 9.1.5. You do not need to open the Max editor, install Python or Node, or keep the source files beside the device for normal use.

Keep this track as your **generator/control track**. The three musical parts will be written onto separate new tracks.

## 2. Choose your first settings

Stop playback and recording. Use a 4/4 Set. Leave your tempo wherever you want it; the device does not change tempo.

For a short first test:

| Control | Set it to |
| --- | --- |
| Root | G |
| Scale | Natural Minor |
| Progression | 1–6–3–7 |
| Start bar | 1 |
| Intro / Build / Main A / Break / Main B / Outro | 4 bars each |
| Density | 60% |
| Variation | 35% |
| Seed | 1 |

These settings give a 24-bar structure. The device's default section lengths instead total 128 bars.

## 3. Preview

Click **PREVIEW**. The right-hand display shows each enabled section's start/end bar and three note counts in this order:

**Bass / Chords / Arp**

A boundary of `1–5` means bars 1 through 4; bar 5 starts the next section. A Bass count of zero in Intro or Break is expected. Preview calculates the composition without changing the Live Set.

If you change a control, click Preview again to refresh these counts.

## 4. Generate

Click **GENERATE 3 TRACKS** once. Keep Live stopped and leave the track list alone while the status line reports progress. The action buttons temporarily disable.

Wait for **Done**. You should now have:

- `PAG 1 Bass`
- `PAG 1 Chords`
- `PAG 1 Arp`

These tracks are appended near the end of the existing track list. The clips are placed in **Arrangement View**, not Session slots. Press **Tab** if you are looking at the Session grid.

No track arming, Arrangement recording, MIDI capture, or real-time waiting through the song is needed.

## 5. Add sound

The new tracks have notes but no instruments. Silence at this point is normal.

1. Select `PAG 1 Bass` and load a bass instrument or synth patch on it.
2. Select `PAG 1 Chords` and load a sustained chord/pad instrument.
3. Select `PAG 1 Arp` and load a short pluck or other pitched instrument. Avoid adding another arpeggiator initially: the notes are already arpeggiated.
4. Check that each instrument track's audio output reaches Main and that the tracks are active and not muted.
5. Move the playhead to Start bar and play the Arrangement.

Start at a comfortable level. The generator does not balance the levels of the instruments you choose. For the cleanest first listen, audition one part at a time, then combine them.

## 6. Shape it into your track

Double-click any generated clip to edit its MIDI notes. Change pitches, rhythm, velocity, lengths, or voicings using Live's normal clip editing tools.

The generated material contains no drums, audio, instrument patches, or automation. Add those yourself. A simple drum pattern can give the bass and arp more context, but it is not required for the generator to work.

Try a lower Density for more space, a higher Density for more rhythmic activity, or New Seed for a different idea. Preview first, then Generate to create a new version.

Each Generate makes **three more tracks**. Mute the previous version's tracks when comparing versions. Instruments are not copied from earlier output tracks, so add or copy your chosen instruments to the new tracks yourself.

## 7. Save

Save the Live Set. Your controls and generated clips are stored with it. Generated notes do not depend on the generator continuing to run; you may remove the control device once you are done generating.

For your first longer pass, use the default section lengths: **16 / 16 / 32 / 16 / 32 / 16**. Check the [FAQ](FAQ.md) for how the sections evolve.
