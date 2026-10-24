/* Pure composition engine. Also embedded verbatim in the device's v8.codebox. */
var PAG = (function () {
    "use strict";
    const sectionNames = ["Intro", "Build", "Main A", "Break", "Main B", "Outro"];
    const parts = ["Bass", "Chords", "Arp"];
    const progressions = [[0, 5, 2, 6], [0, 6, 5, 6], [0, 3, 5, 4]];
    const defaults = {root: 7, mode: 1, progression: 0, startBar: 1,
        density: 60, variation: 35, seed: 1, lengths: [16, 16, 32, 16, 32, 16]};
    function integer(v, lo, hi, label) {
        if (!Number.isInteger(v) || v < lo || v > hi) throw new Error(label + " must be " + lo + "–" + hi + ".");
    }
    function validate(s) {
        integer(s.root, 0, 11, "Root"); integer(s.mode, 0, 1, "Scale");
        integer(s.progression, 0, 2, "Progression"); integer(s.startBar, 1, 394000, "Start bar");
        integer(s.density, 0, 100, "Density"); integer(s.variation, 0, 100, "Variation");
        integer(s.seed, 1, 2147483646, "Seed");
        if (!Array.isArray(s.lengths) || s.lengths.length !== 6) throw new Error("Six section lengths are required.");
        s.lengths.forEach((n, i) => { integer(n, 0, 64, sectionNames[i]);
            if (n % 4) throw new Error(sectionNames[i] + " must be a multiple of four bars."); });
        const total = s.lengths.reduce((a, b) => a + b, 0);
        if (!total) throw new Error("Enable at least one section.");
        if ((s.startBar - 1 + total) * 4 > 1576800) throw new Error("Arrangement extends beyond Live's supported time range.");
    }
    function random(seed) {
        let n = seed >>> 0;
        return () => { n = (Math.imul(1664525, n) + 1013904223) >>> 0; return n / 4294967296; };
    }
    function pc(n) { return ((n % 12) + 12) % 12; }
    function fit(n, lo, hi) { while (n < lo) n += 12; while (n > hi) n -= 12; return n; }
    function voicing(pcs, previous) {
        const candidates = pcs.map(p => Array.from({length: 25}, (_, i) => 55 + i).filter(n => pc(n) === p));
        let best, cost = Infinity;
        candidates[0].forEach(a => candidates[1].forEach(b => candidates[2].forEach(c => {
            const v = [a, b, c].sort((x, y) => x - y);
            if (v[2] - v[0] > 16) return;
            const target = previous || [60, 64, 67];
            const score = v.reduce((sum, n, i) => sum + Math.abs(n - target[i]), 0);
            if (score < cost) { cost = score; best = v; }
        })));
        return best;
    }
    function energy(section, fraction, part) {
        if (section === 0) return part === 0 ? 0 : (part === 1 ? 0.45 : 0.25);
        if (section === 1) return 0.35 + fraction * 0.6;
        if (section === 2) return 0.95;
        if (section === 3) return part === 0 ? 0 : (part === 1 ? 0.65 : 0.18);
        if (section === 4) return 1;
        return Math.max(0, 1 - fraction);
    }
    function compose(input) {
        const s = JSON.parse(JSON.stringify(input)); validate(s);
        const scale = s.mode ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11];
        const degreePitch = d => s.root + scale[((d % 7) + 7) % 7] + 12 * Math.floor(d / 7);
        const rand = random(s.seed), motifRand = random(s.seed ^ 0x5f3759df);
        const gates = [Array.from({length: 32}, () => motifRand()), Array.from({length: 4}, () => motifRand()),
            Array.from({length: 64}, () => motifRand())];
        let elapsed = 0, previous = null, rotation = 0, descending = false;
        const clips = [], sections = [];
        for (let si = 0; si < 6; si++) {
            const bars = s.lengths[si]; if (!bars) continue;
            const notes = [[], [], []], start = (s.startBar - 1 + elapsed) * 4;
            const summary = {name: sectionNames[si], startBar: s.startBar + elapsed,
                endBar: s.startBar + elapsed + bars, bars: bars, counts: [0, 0, 0]};
            for (let b = 0; b < bars; b++) {
                const songBar = elapsed + b, deg = progressions[s.progression][songBar % 4];
                const pcs = [deg, deg + 2, deg + 4].map(d => pc(degreePitch(d)));
                const chord = voicing(pcs, previous); previous = chord;
                const arp = chord.map(n => fit(n, 67, 91)).sort((a, z) => a - z);
                if (songBar % 4 === 0 && rand() < s.variation / 100) {
                    rotation = Math.floor(rand() * 6); descending = rand() < 0.5;
                }
                const fraction = (b + 0.5) / bars;
                function add(part, pitch, time, duration, velocity) {
                    notes[part].push({pitch: pitch, start_time: time,
                        duration: Math.min(duration, bars * 4 - time),
                        velocity: Math.max(1, Math.min(127, velocity + Math.floor(rand() * 11) - 5)),
                        mute: 0, probability: 1});
                }
                function keep(part, step) {
                    const e = energy(si, fraction, part);
                    const gate = gates[part][step % gates[part].length];
                    return e > 0 && gate < (s.density / 100) * e;
                }
                for (let step = 0; step < 8; step++) {
                    if (!keep(0, (songBar % 4) * 8 + step)) continue;
                    let pitch = fit(36 + degreePitch(deg), 31, 55);
                    if (step % 4 === 3) pitch = fit(36 + degreePitch(deg + 4), 31, 55);
                    if (step === 7 && rand() < s.variation / 100) {
                        const next = progressions[s.progression][(songBar + 1) % 4];
                        pitch = fit(36 + degreePitch(next - 1), 31, 55);
                    }
                    add(0, pitch, b * 4 + step * 0.5, 0.42, step % 2 ? 86 : 97);
                }
                if (keep(1, songBar % 4)) chord.forEach(n => add(1, n, b * 4, 3.8, 74));
                for (let step = 0; step < 16; step++) {
                    if (!keep(2, (songBar % 4) * 16 + step)) continue;
                    const pattern = [0, 1, 2, 1, 0, 2];
                    const index = pattern[(step + rotation) % pattern.length];
                    const pitch = arp[descending ? 2 - index : index];
                    add(2, pitch, b * 4 + step * 0.25, 0.20, step % 4 === 0 ? 88 : 76);
                }
            }
            notes.forEach((ns, pi) => {
                summary.counts[pi] = ns.length;
                if (ns.length) clips.push({part: pi, section: si, name: sectionNames[si] + " | " + parts[pi],
                    start: start, length: bars * 4, notes: ns});
            });
            sections.push(summary); elapsed += bars;
        }
        return {version: 1, settings: s, totalBars: elapsed, sections: sections, clips: clips,
            noteCount: clips.reduce((n, c) => n + c.notes.length, 0)};
    }
    return {defaults: defaults, compose: compose, validate: validate, parts: parts, sectionNames: sectionNames};
}());
if (typeof module !== "undefined") module.exports = PAG;
