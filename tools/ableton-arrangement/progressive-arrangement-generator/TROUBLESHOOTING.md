# Troubleshooting

[README](README.md) · [Quick start](QUICKSTART.md) · [FAQ](FAQ.md)

## I generated clips but hear nothing

Check these in order:

1. Are you in Arrangement View, playing within the generated section range?
2. Did you add instruments to the **generated** Bass, Chords, and Arp tracks? The control track is separate.
3. Are those tracks active, unmuted, and free of an unintended solo on another track?
4. After adding an instrument, does its track's audio output reach Main?
5. Can the chosen instrument play the generated pitch range? Some sample instruments only respond to a limited set of keys.
6. If Session clips are overriding Arrangement playback, use Live's Back to Arrangement control.

Intro and Break intentionally have no generated bass. Try Main A or Main B when checking the bass instrument. MIDI meter activity without audio is expected on a track that has notes but no instrument.

## I cannot find the clips

Switch to Arrangement View with Tab. Find the new `PAG N` tracks near the end of the existing track list. Navigate to the device's Start bar; it may be far beyond the part of the timeline currently visible.

The device does not fill Session slots, change your loop brace, or move the playhead to the new material.

## The device will not load, looks blank, or does not initialize

- Unzip the package before loading the AMXD.
- Load the `.amxd` onto a MIDI track, rather than opening a source `.js` or `.maxpat` as the device.
- Check that your selected Max application is version 9.1 or newer. The tested setup uses Live 12.4.7 and Max 9.1.5 on macOS.
- If you normally keep Device View hidden, select the host track and show its devices. Shift+Tab switches Clip/Device View when the Detail View is visible.
- Allow initialization to finish. If the status still says it is initializing, capture the message and check Max's Console for an error.

The normal workflow does not require opening the Max editor. If the panel fails to respond, include whether the same action works while the device is open in Max when reporting the problem; this helps distinguish UI interaction from generation errors.

## “Stop playback and recording before generating”

Stop Live's transport. Also turn off Arrangement Record and Session Record if they remain enabled, then retry. The guard intentionally rejects generation when either playback or recording state is active.

Do not start playback until generation reports Done. If playback begins halfway through, the device stops writing and leaves any partial output in place.

## “Version 1 supports 4/4 only”

Use a 4/4 Set for generation. Version one does not adapt section lengths or rhythms to other meters or arrange around meter changes. For a Set containing time-signature changes, use a separate 4/4 sketch Set and transfer/edit the resulting MIDI as needed.

## “Enable at least one section”

All six section lengths are zero. Give at least one section a nonzero length, in multiples of four bars.

## “No notes at these settings. Raise Density before Generate”

Preview contains no notes. Density zero always does this, and very low density can also omit everything for a particular seed and section selection. Raise Density or try a new seed, then Preview again.

## The action buttons are disabled

They disable while the writer creates clips and verifies their notes. Read the status line to see progress. A 128-bar arrangement completed in the tested environment, but runtime depends on the Set and computer; there is no promised timeout or completion time.

Avoid editing tracks or repeatedly clicking while generation is busy. If the status does not advance, capture its exact text and Max Console errors before deciding how to recover. Reopening a saved Set restores that saved state; it does not complete an interrupted generation.

## “This Live version does not expose Arrangement MIDI clip creation”

The device could not find the required API method. Use the tested Live/Max combination or a compatible newer combination. Loading an older Max application externally does not add missing functionality to Live's API.

## “Could not identify the new track” or “Live object … is no longer available”

The track list or referenced Live object changed while the writer was working, or Live did not complete the requested operation. Stop editing the Set, inspect the tracks created at its end, and read the partial-output message. Remove unwanted partial tracks yourself only after identifying them, then try again.

## “Note write failed,” “Note verification mismatch,” or “Clip boundaries changed”

The actual result in Live did not match what the writer expected. The device stops rather than claiming success. Keep the partial clips available for inspection and capture the exact message. Do not assume that a partially populated clip is complete.

## An error says “No verified output tracks,” but older PAG tracks exist

That message describes the **failed attempt**, not the whole Set. Previously generated tracks remain. If a track-creation request was sent but could not be verified, the message also asks you to inspect the end of the Set.

## The key shown in Live differs from the device

The device does not alter the Set's global scale. Its notes use the selected Root and Scale, while the clip's scale highlighting may inherit Live's current scale. Check actual note pitches or adjust the display separately if needed.

## The result is too dense or sounds doubled

Check for older `PAG N` versions playing at the same time. Mute the previous generation's Bass, Chords, and Arp tracks when auditioning the new version. To change the newly composed rhythm, lower Density and generate another version; changing a control does not rewrite existing clips.

## I want the old idea back

Each generation creates fresh tracks. If you kept the previous tracks, unmute them and mute the newer version. A seed alone only reproduces an idea when all the other composition settings also match.

## What information helps diagnose a problem?

Record your Live version, Max version, operating system, all device settings, the exact status/error text, whether output tracks or clips appeared, and any relevant Max Console messages. A screenshot of the controls and affected clips helps. You do not need to share your entire music project to describe the problem.
