/* Embedded diagnostic state; the audio path itself uses native Max/MSP objects. */
var SineDiagnostics = (function () {
    function create(now) {
        const clock = now || (() => Date.now());
        let state, held = {};
        function reset() {
            state = {version:1, startedAt:new Date(clock()).toISOString(), noteOns:0, noteOffs:0,
                maxHeld:heldCount(), minPitch:null, maxPitch:null, lastPitch:null, lastVelocity:0,
                peak:0, peakWindows:0, audibleWindows:0, panicCount:0, events:[], eventsTruncated:false};
        }
        function heldCount() { return Object.values(held).reduce((a,b)=>a+b,0); }
        function note(pitch, velocity) {
            if (!Number.isInteger(pitch) || pitch<0 || pitch>127 || !Number.isInteger(velocity) || velocity<0 || velocity>127)
                throw new Error('MIDI pitch and velocity must be integers from 0 to 127.');
            state.lastPitch=pitch; state.lastVelocity=velocity;
            if (velocity) {
                state.noteOns++; held[pitch]=(held[pitch]||0)+1;
                state.minPitch=state.minPitch===null?pitch:Math.min(state.minPitch,pitch);
                state.maxPitch=state.maxPitch===null?pitch:Math.max(state.maxPitch,pitch);
                state.maxHeld=Math.max(state.maxHeld,heldCount());
            } else { state.noteOffs++; held[pitch]=Math.max(0,(held[pitch]||0)-1); }
            if(state.events.length<20000) state.events.push({time:clock(),pitch,velocity});
            else state.eventsTruncated=true;
        }
        function peak(value) {
            if (!Number.isFinite(value) || value<0) return;
            state.peak=Math.max(state.peak,value); state.peakWindows++;
            if(value>0.00001)state.audibleWindows++;
        }
        function panic() { held={};state.panicCount++; }
        function report() {
            return {...JSON.parse(JSON.stringify(state)),heldNotes:heldCount(),
                lastFrequencyHz:state.lastPitch===null?null:440*Math.pow(2,(state.lastPitch-69)/12),
                midiReceived:state.noteOns>0,audioObserved:state.audibleWindows>0,
                peakDbFS:state.peak>0?20*Math.log10(state.peak):null};
        }
        reset(); return {reset,note,peak,panic,report};
    }
    return {create};
}());
if(typeof module!=='undefined')module.exports=SineDiagnostics;

/* Max UI adapter. No global Live API access and no network calls. */
if(typeof outlet!=='undefined') {
    inlets=1;outlets=1;
    var monitor=SineDiagnostics.create();
    function show() {
        const r=monitor.report();
        this.patcher.getnamed('midiStatus').message('set',r.midiReceived?
            'MIDI received · On '+r.noteOns+' / Off '+r.noteOffs+' · Held '+r.heldNotes+' (max '+r.maxHeld+')':'MIDI · waiting for notes');
        this.patcher.getnamed('noteStatus').message('set',r.lastPitch===null?'Last note · —':
            'Last note '+r.lastPitch+' · velocity '+r.lastVelocity+' · '+r.lastFrequencyHz.toFixed(2)+' Hz');
        this.patcher.getnamed('audioStatus').message('set',r.audioObserved?
            'Audio observed · max '+r.peak.toFixed(5)+' ('+r.peakDbFS.toFixed(1)+' dBFS)':'Audio · waiting for signal');
    }
    function init() {
        ['level','attack','release'].forEach(name=>this.patcher.getnamed(name).message('bang'));
        show();outlet(0,'set','Ready · Add to a generated MIDI track, then play its Arrangement clips.');
    }
    function list(pitch,velocity) { monitor.note(Number(pitch),Number(velocity));show(); }
    function peak(value) { monitor.peak(Number(value));show(); }
    function reset() { monitor.reset();show();outlet(0,'set','Statistics reset. Play MIDI to test input and audio.'); }
    function panic() { monitor.panic();show();outlet(0,'set','Panic · all voices released.'); }
    function write(path) {
        let file=null;
        try {
            file=new File(path,'write','TEXT');
            if(!file.isopen)throw new Error('Cannot open the selected file.');
            file.eof=0;file.writestring(JSON.stringify(monitor.report(),null,2)+'\n');file.close();file=null;
            outlet(0,'set','Diagnostic report saved.');
        } catch(e) { if(file)file.close();outlet(0,'set','Report error · '+e.message); }
    }
}
