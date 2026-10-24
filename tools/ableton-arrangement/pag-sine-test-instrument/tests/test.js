const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const D=require('../source/diagnostics.js');
let count=0;
function test(name,fn){fn();count++;console.log('PASS '+name);}
test('MIDI notes, note-offs, duplicates, chords, and exact A4 frequency',()=>{
 const d=D.create(()=>1000);d.note(69,100);assert.equal(d.report().lastFrequencyHz,440);
 d.note(60,80);d.note(64,90);assert.equal(d.report().maxHeld,3);
 d.note(69,0);d.note(60,0);d.note(64,0);
 let r=d.report();assert.equal(r.noteOns,3);assert.equal(r.noteOffs,3);assert.equal(r.heldNotes,0);assert(r.midiReceived);
 d.note(60,100);d.note(60,100);assert.equal(d.report().heldNotes,2);d.note(60,0);d.note(60,0);assert.equal(d.report().heldNotes,0);
});
test('audio evidence requires measured signal, not just MIDI events',()=>{
 const d=D.create(()=>1000);d.note(69,100);d.peak(0);assert(!d.report().audioObserved);
 d.peak(0.125);d.peak(0.02);const r=d.report();assert(r.audioObserved);assert.equal(r.peak,0.125);
 assert.equal(r.audibleWindows,2);assert(Math.abs(r.peakDbFS+18.0617997)<0.00001);
});
test('reset, panic, invalid MIDI, and bounded event history',()=>{
 const d=D.create(()=>1000);d.note(60,100);d.reset();assert.equal(d.report().heldNotes,1);assert.equal(d.report().maxHeld,1);
 d.panic();assert.equal(d.report().heldNotes,0);assert.equal(d.report().panicCount,1);
 assert.throws(()=>d.note(128,100));assert.throws(()=>d.note(60,128));assert.throws(()=>d.note(60.5,50));
 for(let i=0;i<20005;i++)d.note(60,i%2?0:100);
 assert.equal(d.report().events.length,20000);assert(d.report().eventsTruncated);
});
test('self-contained polyphonic MIDI instrument and complete stereo audio path',()=>{
 const base=path.resolve(__dirname,'..');const bytes=fs.readFileSync(path.join(base,'PAG Sine Test Instrument.amxd'));
 assert.equal(bytes.subarray(8,12).toString(),'iiii');assert.equal(bytes.readUInt32LE(28),bytes.length-32);
 const p=JSON.parse(bytes.subarray(32,-1)).patcher;const boxes=p.boxes.map(x=>x.box);
 const voices=boxes.filter(x=>x.patcher);assert.equal(voices.length,8);
 voices.forEach(v=>{
  assert(v.patcher.boxes.some(x=>x.box.text==='cycle~'));
  assert(v.patcher.boxes.some(x=>x.box.text==='adsr~ 5 40 0.8 120'));
  const pitchBeforeGate=v.patcher.lines.find(x=>x.patchline.source[0]==='trigger'&&x.patchline.source[1]===1);
  assert.equal(pitchBeforeGate.patchline.destination[0],'pitch');
 });
 assert.equal(boxes.find(x=>x.id==='poly').text,'poly 8 1');
 assert.equal(boxes.find(x=>x.id==='normalize').text,'*~ 0.125');
 assert(boxes.some(x=>x.text==='peakamp~ 100'));
 const outs=p.lines.filter(x=>x.patchline.destination[0]==='out');assert.equal(outs.length,2);
 assert.deepEqual(outs.map(x=>x.patchline.destination[1]).sort(),[0,1]);
 assert.equal(boxes.find(x=>x.id==='diagnostics').code,fs.readFileSync(path.join(base,'source/diagnostics.js'),'utf8'));
 assert.deepEqual(p.dependency_cache||[],[]);assert(!bytes.includes(Buffer.from('/Users/')));
 assert.equal(Object.values(p.parameters).filter(Array.isArray).length,3);
});
const result={passed:count,nativeAudioRuntime:'See VALIDATION.md and validation reports; static patch tests do not prove sound.'};
fs.writeFileSync(path.join(__dirname,'test-results.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
