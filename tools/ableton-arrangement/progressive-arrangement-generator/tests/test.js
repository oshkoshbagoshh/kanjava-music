"use strict";
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const PAG = require('../source/composer.js');
const createWriter = require('../source/arrangement-writer.js');
let checks = 0, compositionCases = 0;
function test(name, fn) { fn(); checks++; console.log('PASS '+name); }
function settings(overrides={}) { return {...PAG.defaults, lengths:PAG.defaults.lengths.slice(), ...overrides}; }
function validateNotes(p) {
    const intervals = p.settings.mode ? [0,2,3,5,7,8,10] : [0,2,4,5,7,9,11];
    const ranges = [[31,55],[55,79],[67,91]];
    for (const c of p.clips) {
        assert(c.start >= (p.settings.startBar-1)*4);
        let previousEnd = -1;
        for (const n of c.notes) {
            assert(Number.isInteger(n.pitch));
            assert(n.pitch>=ranges[c.part][0] && n.pitch<=ranges[c.part][1]);
            assert(intervals.includes(((n.pitch-p.settings.root)%12+12)%12));
            assert(n.start_time>=0 && n.duration>0 && n.start_time+n.duration<=c.length+1e-9);
            assert(n.velocity>=1 && n.velocity<=127 && n.probability===1);
            const grid = c.part===0 ? 2 : c.part===2 ? 4 : 1;
            assert(Number.isInteger(n.start_time*grid));
            if(c.part===0) { assert(n.start_time>=previousEnd); previousEnd=n.start_time+n.duration; }
        }
        if(c.part===1) for(let i=0;i<c.notes.length;i+=3) {
            assert.equal(c.notes[i].start_time,c.notes[i+2].start_time);
            assert(new Set(c.notes.slice(i,i+3).map(n=>n.pitch%12)).size===3);
        }
        if(c.section===0 || c.section===3) assert.notEqual(c.part,0);
    }
}
test('default form, reproducibility, and different seeds',()=>{
    const p=PAG.compose(settings());
    assert.equal(p.totalBars,128); assert.equal(p.sections.at(-1).endBar,129);
    assert.deepEqual(p,PAG.compose(settings()));
    assert.notDeepEqual(p.clips,PAG.compose(settings({seed:2})).clips);
    validateNotes(p);
});
test('all roots, scales, progressions, and density extremes',()=>{
    for(let root=0;root<12;root++) for(let mode=0;mode<2;mode++) for(let progression=0;progression<3;progression++)
        for(const density of [0,1,60,100]) for(const variation of [0,100]) {
            compositionCases++;
            const p=PAG.compose(settings({root,mode,progression,density,variation,lengths:[4,4,4,4,4,4]}));
            validateNotes(p);
            if(!density) assert.equal(p.noteCount,0);
        }
});
test('skipped sections, nonzero placement, maximum form',()=>{
    const p=PAG.compose(settings({startBar:17,lengths:[0,4,0,0,8,0]}));
    assert.equal(p.totalBars,12); assert.equal(p.sections[0].startBar,17); assert.equal(p.sections[1].startBar,21);
    assert.deepEqual(p.sections.map(s=>s.name),['Build','Main B']);
    validateNotes(PAG.compose(settings({density:100,lengths:[64,64,64,64,64,64]})));
});
test('invalid settings reject before any write',()=>{
    for(const override of [{root:12},{seed:0},{density:101},{variation:-1},{mode:2},{startBar:0},
        {lengths:[0,0,0,0,0,0]},{lengths:[3,4,4,4,4,4]},{lengths:[68,4,4,4,4,4]},
        {startBar:394000,lengths:[64,64,64,64,64,64]}]) assert.throws(()=>PAG.compose(settings(override)));
});
function mock(overrides={}) {
    let next=10, scheduled=false, busy=false;
    const original={id:1,name:'Existing music',clips:[{id:2,start:0,length:4,notes:[{pitch:60}]}]};
    const tracks=[original], messages=[], context={id:7,playing:0,recording:0,numerator:4,denominator:4};
    const host={context:()=>({...context}),tracks:()=>tracks.map(t=>({id:t.id,name:t.name})),checkCapability:()=>{},
        createTrack:()=>tracks.push({id:next++,name:'MIDI',clips:[]}),
        nameTrack:(id,name,color)=>Object.assign(tracks.find(t=>t.id===id),{name,color}),
        clips:id=>tracks.find(t=>t.id===id).clips.map(c=>({...c})),
        createClip:(id,start,length)=>tracks.find(t=>t.id===id).clips.push({id:next++,start,length,notes:[]}),
        configureClip:()=>{}, addNotes:(id,notes)=>tracks.flatMap(t=>t.clips).find(c=>c.id===id).notes.push(...notes),
        verifyClip:(id,expected)=>assert.deepEqual(tracks.flatMap(t=>t.clips).find(c=>c.id===id).notes,expected.notes),
        busy:v=>{busy=v;},status:m=>messages.push(m),schedule:()=>{scheduled=true;},cancel:()=>{scheduled=false;},complete:()=>{},...overrides};
    const writer=createWriter(host);
    return {writer,host,tracks,messages,context,original,
        step:()=>{assert(scheduled);scheduled=false;writer.tick();},
        drain:()=>{let ticks=0;while(scheduled){scheduled=false;writer.tick();assert(++ticks<2000);} assert(!busy);return ticks;}};
}
test('writer creates new tracks, chunks writes, preserves existing content, numbers subsequent runs',()=>{
    const m=mock(), original=JSON.stringify(m.original), plan=PAG.compose(settings());
    assert(m.writer.start(plan)); assert(!m.writer.start(plan));
    const ticks=m.drain(); assert(ticks>plan.clips.length*3);
    assert.equal(m.tracks.length,4);assert.equal(JSON.stringify(m.original),original);
    assert.deepEqual(m.tracks.slice(1).map(t=>t.name),['PAG 1 Bass','PAG 1 Chords','PAG 1 Arp']);
    assert(m.messages.at(-1).startsWith('Done'));
    m.writer.start(plan);m.drain();assert.equal(m.tracks.length,7);
    assert.equal(m.tracks[4].name,'PAG 2 Bass');
});
test('playing, recording, unsupported meter, and empty preview cannot mutate',()=>{
    for(const flag of ['playing','recording','numerator','denominator']) {
        const m=mock();m.context[flag]=flag==='numerator'?3:flag==='denominator'?8:1;
        assert(!m.writer.start(PAG.compose(settings())));assert.equal(m.tracks.length,1);
        assert(m.messages.at(-1).startsWith('Error'));
    }
    const m=mock();assert(!m.writer.start(PAG.compose(settings({density:0}))));assert.equal(m.tracks.length,1);
});
test('mid-run playback and API errors stop without retrying or deleting partial output',()=>{
    const m=mock();m.writer.start(PAG.compose(settings()));m.step();m.step();m.context.playing=1;m.step();
    assert(!m.writer.isBusy());assert.equal(m.tracks.length,2);assert(m.messages.at(-1).includes('PAG 1 Bass'));
    const broken=mock({addNotes:()=>{throw new Error('injected notes failure');}});
    broken.writer.start(PAG.compose(settings()));broken.drain();
    assert.equal(broken.tracks.length,4);assert(broken.messages.at(-1).includes('injected notes failure'));
    assert(!broken.writer.isBusy());
});
test('silent track and clip creation failures are detected',()=>{
    for(const fn of ['createTrack','createClip']) {
        const m=mock({[fn]:()=>{}});m.writer.start(PAG.compose(settings()));m.drain();
        assert(m.messages.at(-1).startsWith('Error'));assert(!m.writer.isBusy());
    }
});
test('controller new-seed range and readback remain integral',()=>{
    const controls={root:7,mode:1,progression:0,startBar:257,density:60,variation:35,seed:1,
        length0:4,length1:4,length2:8,length3:4,length4:8,length5:4};
    const emitted=[];
    const sandbox={PAG,Math:Object.create(Math),outlet:(...a)=>emitted.push(a),
        outlet_dictionary:()=>{throw new Error('Changing controls must not generate');},
        patcher:{getnamed:name=>({getvalueof:()=>controls[name],message:(value)=>{controls[name]=value;}})}};
    sandbox.Math.random=()=>0.999999;
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../source/device-controller.js'),'utf8'),sandbox);
    sandbox.init();sandbox.newseed();
    assert(controls.seed>256 && controls.seed<=16777215 && Number.isInteger(controls.seed));
    assert.equal(sandbox.readSettings().startBar,257);
    assert.equal(sandbox.readSettings().seed,controls.seed);
    assert(emitted.at(-1)[2].includes(String(controls.seed)));
});
test('AMXD embeds both exact sources and has no dependency paths or audio objects',()=>{
    const base=path.resolve(__dirname,'..');
    const bytes=fs.readFileSync(path.join(base,'Progressive Arrangement Generator.amxd'));
    assert.equal(bytes.subarray(0,4).toString(),'ampf');assert.equal(bytes.readUInt32LE(28),bytes.length-32);
    const p=JSON.parse(bytes.subarray(32,-1)).patcher;
    const code=p.boxes.map(x=>x.box).filter(b=>b.maxclass==='v8.codebox');assert.equal(code.length,2);
    assert.equal(code[0].code,fs.readFileSync(path.join(base,'source/composer.js'),'utf8')+'\n'+fs.readFileSync(path.join(base,'source/device-controller.js'),'utf8'));
    assert.equal(code[1].code,fs.readFileSync(path.join(base,'source/arrangement-writer.js'),'utf8')+'\n'+fs.readFileSync(path.join(base,'source/live-adapter.js'),'utf8'));
    assert.deepEqual(p.dependency_cache || [],[]);
    assert(!bytes.includes(Buffer.from('/Users/')));
    assert(!p.boxes.some(x=>/~/.test(x.box.text||'')));
    assert.equal(Object.values(p.parameters).filter(Array.isArray).length,13);
    for(const name of ['startBar','seed']) {
        const attrs=p.boxes.find(x=>x.box.varname===name).box.saved_attribute_attributes.valueof;
        assert.equal(attrs.parameter_type,0,'Wide ranges must use Float parameters with Int display');
        assert(attrs.parameter_mmax>256);
    }
});
const start=performance.now();const max=PAG.compose(settings({density:100}));
const report={passed:checks,compositionCases,fullDensity128Bars:{milliseconds:Math.round(performance.now()-start),clips:max.clips.length,notes:max.noteCount},
    runtimeLiveVerification:'See VALIDATION.md for actual in-app checks.'};
fs.writeFileSync(path.join(__dirname,'test-results.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
