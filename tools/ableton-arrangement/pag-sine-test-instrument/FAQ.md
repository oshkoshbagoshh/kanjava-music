# FAQ

## Where do I put it?

On each generated Bass, Chords and Arp MIDI track. The Phase 1 device writes clips to new tracks; loading the sine instrument only on the generator track will not audition those clips.

## Why is the bass silent at the beginning?

The default Intro intentionally has no bass. Start at bar 33 for Main A, where all three parts are active. Bass is also absent in Break.

## MIDI counters stay at zero. What should I check?

Select a track that actually contains the generated clips. Use Arrangement View, place the playhead inside an active section, and press Play. Ensure Arrangement playback has not been overridden by Session clips. Keep monitoring on Auto or Off for clip playback, rather than In. No recording or arming is required.

## MIDI arrives, but the device shows no audio.

Turn on the device activator and raise Level above zero. Allow for the Attack setting. Check that Live’s audio engine is enabled. Reset Stats before testing to make the new result easy to see. A historical “Audio observed” message means the device produced signal earlier in this diagnostics session; the Output meter shows current activity.

## The device shows audio but I hear nothing.

Check the track activator, track volume, Solo states, routing to Main, Main volume, Live’s selected audio output device, and the speakers or headphones. Signal measured inside the device does not prove your physical speakers are audible.

## Why is it quieter than a synth preset?

It uses clean sine waves with headroom for eight voices. Raise the track or device level gradually. Bass fundamentals may be hard to hear on small speakers. There are no saturation, filter or bass-enhancement stages.

## Can it play chords?

Yes, up to eight allocated voices per instance. Generated triads use three voices. Dense imported MIDI can exceed eight voices and cause oldest-note stealing.

## Does it change the generated MIDI?

No. Clips remain editable. The saved test Set was compared against the Phase 1 Set: all 5,947 notes and 48 clips matched exactly.

## Does every new generation automatically receive this instrument?

No. Each generation creates fresh tracks. Drag an instance onto each new track you want to hear.

## What do Held and max mean?

Held counts received note-ons not yet matched by note-offs. “max” is the highest simultaneous held-note count during this diagnostics session. Release tails can continue after Held reaches zero. Held tracks input events, not the voice allocator’s eight-voice limit.

## How do I stop a stuck note?

Stop playback. Use Panic in the locked Max editor presentation; allocated voices release according to Release ms. Then resume. Panic does not alter clips. If necessary, deactivate and reactivate the device.

## Why don’t the diagnostic buttons respond in Live’s device panel?

This was a limitation during automated UI testing. Open the Max editor, lock the presentation with Cmd+E if necessary, and use the buttons there. Export Report was tested successfully through this path. Open the editor before your test because loading the editor resets diagnostic counters.

## What does Export Report contain?

Note-on/off counts, pitch range, last MIDI note and velocity, held-note counts, measured peak and dBFS, audio-observed status, timestamps, and up to 20,000 MIDI events. It reports actual received MIDI and sampled signal peaks. It does not certify note-by-note timing against an arbitrary source clip.

## Are controls and reports saved with my Set?

Level, Attack and Release are persisted Live parameters. Diagnostic counters are temporary. Export a JSON report when you need a lasting record. Generated clips are stored in the Live Set itself.

## Can I replace it with another instrument?

Yes. Remove the sine instrument and load your own instrument on the same generated track. Keep the MIDI clips.
