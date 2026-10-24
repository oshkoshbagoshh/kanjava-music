/* Appended to arrangement-writer.js in its own embedded v8.codebox. */
inlets = 1;
outlets = 2;
var liveWriter = null, tickTask = null, liveSong = null;
function scalar(v) { return Number(Array.isArray(v) ? v[0] : v); }
function objectIds(v) {
    if (!Array.isArray(v)) return [];
    const ids = [];
    for (let i = 0; i < v.length; i++) if (v[i] === "id" && Number(v[i + 1]) > 0) ids.push(Number(v[++i]));
    return ids;
}
function api(id) { const a = new LiveAPI(null, "id " + id); if (!Number(a.id)) throw new Error("Live object " + id + " is no longer available."); return a; }
function decodeNotes(reply) {
    if (reply && typeof reply === "object" && !Array.isArray(reply) && reply.notes) return reply.notes;
    if (Array.isArray(reply) && reply[0] === "dictionary") return JSON.parse(new Dict(reply[1]).stringify()).notes;
    const raw = Array.isArray(reply) ? reply.join(" ") : String(reply);
    const decoded = JSON.parse(raw);
    if (!Array.isArray(decoded.notes)) throw new Error("Live did not return a readable notes dictionary.");
    return decoded.notes;
}
function init() {
    if (liveWriter) liveWriter.dispose();
    liveSong = new LiveAPI(null, "live_set");
    tickTask = new Task(function () { if (liveWriter) liveWriter.tick(); }, this);
    const host = {
        context: function () { return {id: Number(liveSong.id), playing: scalar(liveSong.get("is_playing")),
            recording: scalar(liveSong.get("record_mode")) || scalar(liveSong.get("session_record")),
            numerator: scalar(liveSong.get("signature_numerator")), denominator: scalar(liveSong.get("signature_denominator"))}; },
        tracks: function () { return objectIds(liveSong.get("tracks")).map(id => ({id: id, name: api(id).getstring("name")})); },
        checkCapability: function () {
            const a = new LiveAPI(null, "this_device canonical_parent");
            if (String(a.info).indexOf("create_midi_clip") < 0) throw new Error("This Live version does not expose Arrangement MIDI clip creation. Update Live 12.");
        },
        createTrack: function () { liveSong.call("create_midi_track", -1); },
        nameTrack: function (id, name, color) { const a = api(id); a.set("name", name); a.set("color", color);
            if (a.getstring("name") !== name) throw new Error("Could not name the new track."); },
        clips: function (id) { return objectIds(api(id).get("arrangement_clips")).map(cid => {
            const a = api(cid); return {id: cid, start: scalar(a.get("start_time")), length: scalar(a.get("end_time")) - scalar(a.get("start_time"))};
        }); },
        createClip: function (id, start, length) { api(id).call("create_midi_clip", start, length); },
        configureClip: function (id, name, color, length) { const a = api(id); a.set("name", name); a.set("color", color);
            a.set("looping", 0); a.set("start_marker", 0); a.set("end_marker", length); },
        addNotes: function (id, notes) { api(id).call("add_new_notes", JSON.stringify({notes: notes})); },
        verifyClip: function (id, expected) {
            const a = api(id), notes = decodeNotes(a.call("get_all_notes_extended"));
            if (notes.length !== expected.notes.length) throw new Error("Note write failed in " + expected.name + ": expected " + expected.notes.length + ", got " + notes.length + ".");
            const sort = ns => ns.slice().sort((x, y) => x.start_time - y.start_time || x.pitch - y.pitch);
            const actual = sort(notes), want = sort(expected.notes);
            for (let i = 0; i < want.length; i++) {
                if (actual[i].pitch !== want[i].pitch || Math.abs(actual[i].start_time - want[i].start_time) > 0.001 ||
                    Math.abs(actual[i].duration - want[i].duration) > 0.002 || Math.abs(actual[i].velocity - want[i].velocity) > 1)
                    throw new Error("Note verification mismatch in " + expected.name + ".");
            }
            if (Math.abs(scalar(a.get("start_time")) - expected.start) > 0.001 ||
                Math.abs(scalar(a.get("end_time")) - expected.start - expected.length) > 0.001)
                throw new Error("Clip boundaries changed in " + expected.name + ".");
        },
        busy: function (value) {
            outlet(1, "busy", value ? 1 : 0);
            ["generateButton", "previewButton", "seedButton"].forEach(name => thisPatcher.getnamed(name).message("active", value ? 0 : 1));
        },
        status: function (text) { outlet(0, "set", text); post("PAG: " + text + "\n"); },
        schedule: function () { tickTask.schedule(10); },
        cancel: function () { if (tickTask) tickTask.cancel(); },
        complete: function () {}
    };
    const thisPatcher = this.patcher;
    liveWriter = createArrangementWriter(host);
}
function msg_dictionary(plan) {
    if (!liveWriter) { outlet(0, "set", "Error · Device is still initializing."); return; }
    liveWriter.start(plan);
}
function dictionary(name) { msg_dictionary(JSON.parse(new Dict(name).stringify())); }
function notifydeleted() { if (liveWriter) liveWriter.dispose(); }
