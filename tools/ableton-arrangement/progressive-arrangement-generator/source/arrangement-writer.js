/* Bounded state machine. Host adapter is separate so this can be tested without Live. */
function createArrangementWriter(host) {
    let state = null;
    const partNames = ["Bass", "Chords", "Arp"];
    const colors = [0x6f9fc9, 0x70bba3, 0xc394ce, 0x7f8db5, 0xe4ad70, 0x859aab];
    function guard() {
        const s = host.context();
        if (!s.id) throw new Error("Live Set is unavailable.");
        if (s.playing || s.recording) throw new Error("Stop playback and recording before generating.");
        if (s.numerator !== 4 || s.denominator !== 4) throw new Error("Version 1 supports 4/4 only. Choose a 4/4 Set.");
        if (state && s.id !== state.songId) throw new Error("Live Set changed during generation.");
        return s;
    }
    function fail(e) {
        const created = state ? state.tracks.map(t => t.name).join(", ") : "";
        const pending = state && state.phase === "track-check" ? " A track creation was requested; inspect the end of the Set." : "";
        host.cancel(); host.busy(false);
        host.status("Error · " + e.message + (created ? " Partial output retained: " + created + "." : " No verified output tracks.") + pending);
        state = null;
    }
    function start(plan) {
        if (state) { host.status("Generation already in progress."); return false; }
        try {
            guard();
            if (!plan || plan.version !== 1 || !plan.noteCount || !plan.clips.length) throw new Error("Preview contains no MIDI notes.");
            const tracks = host.tracks();
            host.checkCapability();
            let run = 1;
            tracks.forEach(t => { const m = /^PAG (\d+) (Bass|Chords|Arp)$/.exec(t.name); if (m) run = Math.max(run, Number(m[1]) + 1); });
            state = {songId: host.context().id, plan: plan, run: run, originals: tracks.map(t => t.id),
                tracks: [], phase: "track-create", clipIndex: 0, current: null, offset: 0};
            host.busy(true); host.status("Creating PAG " + run + " · 3 fresh MIDI tracks…"); host.schedule();
            return true;
        } catch (e) { fail(e); return false; }
    }
    function tick() {
        if (!state) return;
        try {
            guard();
            const s = state;
            if (s.phase === "track-create") {
                s.before = host.tracks().map(t => t.id);
                host.createTrack(); s.phase = "track-check";
            } else if (s.phase === "track-check") {
                const all = host.tracks(), fresh = all.filter(t => s.before.indexOf(t.id) < 0);
                if (fresh.length !== 1 || all.length !== s.before.length + 1) throw new Error("Could not identify the new track. Stop editing the Set during generation.");
                const t = fresh[0], part = s.tracks.length;
                t.name = "PAG " + s.run + " " + partNames[part];
                s.tracks.push(t);
                host.nameTrack(t.id, t.name, [0x5fa8d3, 0x78b89b, 0xc192cf][part]);
                s.phase = s.tracks.length < 3 ? "track-create" : "clip-create";
            } else if (s.phase === "clip-create") {
                if (s.clipIndex === s.plan.clips.length) { s.phase = "finish"; }
                else {
                    s.current = s.plan.clips[s.clipIndex];
                    const t = s.tracks[s.current.part];
                    s.beforeClips = host.clips(t.id).map(c => c.id);
                    host.createClip(t.id, s.current.start, s.current.length);
                    s.phase = "clip-check";
                }
            } else if (s.phase === "clip-check") {
                const t = s.tracks[s.current.part];
                const fresh = host.clips(t.id).filter(c => s.beforeClips.indexOf(c.id) < 0);
                if (fresh.length !== 1) throw new Error("Arrangement clip creation failed on " + t.name + ".");
                s.clipId = fresh[0].id;
                if (Math.abs(fresh[0].start - s.current.start) > 0.001 || Math.abs(fresh[0].length - s.current.length) > 0.001)
                    throw new Error("New clip has an unexpected position or length.");
                host.configureClip(s.clipId, "PAG " + s.run + " | " + s.current.name, colors[s.current.section], s.current.length);
                s.offset = 0; s.phase = "notes";
            } else if (s.phase === "notes") {
                const chunk = s.current.notes.slice(s.offset, s.offset + 128);
                host.addNotes(s.clipId, chunk); s.offset += chunk.length;
                host.status("PAG " + s.run + " · " + s.current.name + " · clip " + (s.clipIndex + 1) + "/" + s.plan.clips.length + " · " + s.offset + "/" + s.current.notes.length + " notes");
                if (s.offset === s.current.notes.length) s.phase = "verify";
            } else if (s.phase === "verify") {
                host.verifyClip(s.clipId, s.current);
                s.clipIndex++; s.phase = "clip-create";
            } else if (s.phase === "finish") {
                const ids = host.tracks().map(t => t.id);
                if (s.originals.some(id => ids.indexOf(id) < 0)) throw new Error("An original track disappeared during generation.");
                if (s.tracks.some(t => ids.indexOf(t.id) < 0)) throw new Error("A generated track disappeared during generation.");
                host.busy(false);
                host.status("Done · PAG " + s.run + " · " + s.plan.totalBars + " bars · " + s.plan.clips.length + " clips · " + s.plan.noteCount + " verified notes. Add your instruments.");
                host.complete(s); state = null; return;
            }
            host.schedule();
        } catch (e) { fail(e); }
    }
    function dispose() { host.cancel(); state = null; }
    return {start: start, tick: tick, dispose: dispose, isBusy: () => state !== null};
}
if (typeof module !== "undefined") module.exports = createArrangementWriter;
