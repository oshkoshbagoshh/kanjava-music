/* Appended to composer.js inside the composition codebox. No external dependencies. */
inlets = 1;
outlets = 2;
var uiReady = false;
var writerBusy = false;
function uiStatus(text) { outlet(1, "set", text); }
function init() { uiReady = true; uiStatus("Ready · MIDI clips only · Stop Live before Generate."); }
function busy(value) { writerBusy = Number(value) !== 0; }
function readControl(name) {
    const v = this.patcher.getnamed(name).getvalueof();
    return Math.round(Number(Array.isArray(v) ? v[0] : v));
}
function readSettings() {
    return {root: readControl("root"), mode: readControl("mode"), progression: readControl("progression"),
        startBar: readControl("startBar"), density: readControl("density"), variation: readControl("variation"),
        seed: readControl("seed"), lengths: [0, 1, 2, 3, 4, 5].map(i => readControl("length" + i) * 4)};
}
function showPreview(plan) {
    for (let i = 0; i < 6; i++) {
        const name = PAG.sectionNames[i], s = plan.sections.find(x => x.name === name);
        const text = s ? name + "  " + s.startBar + "–" + s.endBar + "  |  " + s.counts.join(" / ") : name + "  skipped";
        this.patcher.getnamed("section" + i).message("set", text);
    }
}
function makePlan() {
    if (!uiReady) throw new Error("Device is initializing. Try again in a moment.");
    if (writerBusy) throw new Error("Generation is in progress. Wait for completion.");
    const p = PAG.compose(readSettings()); showPreview(p); return p;
}
function preview() {
    try { const p = makePlan(); uiStatus("Preview · " + p.totalBars + " bars · " + p.clips.length + " clips · " + p.noteCount + " notes · B / C / A counts at right."); }
    catch (e) { uiStatus("Error · " + e.message); }
}
function generate() {
    try {
        const p = makePlan();
        if (!p.noteCount) throw new Error("No notes at these settings. Raise Density before Generate.");
        outlet_dictionary(0, p);
    } catch (e) { uiStatus("Error · " + e.message); }
}
function newseed() {
    if (writerBusy) return;
    const current = readControl("seed");
    let value = Math.floor(Math.random() * 16777215) + 1;
    if (value === current) value = current === 16777215 ? 1 : current + 1;
    this.patcher.getnamed("seed").message(value);
    uiStatus("Seed " + value + " · Preview to inspect; Generate to write new tracks.");
}
