"""Build a self-contained Max Instrument with eight embedded native sine voices."""
from pathlib import Path
import json,struct

HERE=Path(__file__).resolve().parent
OUT=HERE.parent
boxes=[];lines=[];parameters={}
def add(id,cls,rect,**kw):
    kw.setdefault('numinlets',1);kw.setdefault('numoutlets',1)
    if cls=='message':kw['numinlets']=2
    if cls=='comment':kw['numoutlets']=0
    b=dict(id=id,maxclass=cls,patching_rect=rect,**kw);boxes.append({'box':b});return b
def obj(id,text,rect,ins=1,outs=1,**kw):return add(id,'newobj',rect,text=text,numinlets=ins,numoutlets=outs,**kw)
def wire(a,b,ao=0,bi=0):lines.append({'patchline':{'source':[a,ao],'destination':[b,bi]}})
def ui(id,cls,rect,**kw):return add(id,cls,rect,presentation=1,presentation_rect=rect,**kw)
def label(id,text,rect,size=11,color=None):
    return ui(id,'comment',rect,text=text,fontsize=size,fontname='Arial',textcolor=color or [.83,.87,.89,1],varname=id)
def control(name,title,x,width,value,lo,hi,unit=0):
    label(name+'Label',title,[x,37,width,16],10)
    attrs=dict(parameter_longname=title,parameter_shortname=title,parameter_type=0,
        parameter_initial=[value],parameter_initial_enable=1,parameter_mmin=lo,parameter_mmax=hi,parameter_unitstyle=unit)
    ui(name,'live.numbox',[x,57,width,20],varname=name,parameter_enable=1,numoutlets=2,
        saved_attribute_attributes={'valueof':attrs})
    parameters[name]=[title,title,0]

label('title','PAG / SINE TEST INSTRUMENT',[14,6,500,24],16,[.40,.84,.80,1])
label('subtitle','8 VOICES · MIDI IN → SINE AUDIO OUT',[14,116,480,16],10)
control('level','Level %',14,110,70,0,100)
control('attack','Attack ms',142,110,5,1,1000)
control('release','Release ms',270,110,120,5,2000)
label('meterLabel','Output',[402,37,110,16],10)
ui('meter','meter~',[404,57,160,20],numoutlets=1)
label('midiStatus','MIDI · waiting for notes',[590,18,560,20])
label('noteStatus','Last note · —',[590,44,560,20])
label('audioStatus','Audio · waiting for signal',[590,70,560,20])
label('status','Initializing…',[14,148,1135,18],10)
for name,title,x,width,msg in [('resetButton','RESET STATS',590,150,'reset'),('panicButton','PANIC',752,120,'panic'),('exportButton','EXPORT REPORT',884,180,None)]:
    ui(name,'live.text',[x,103,width,25],text=title,texton=title,mode=0,parameter_enable=0,numoutlets=2,
        activebgcolor=[.24,.64,.59,1],activetextcolor=[.05,.09,.10,1])
    if msg:
        add(name+'Message','message',[x,260,80,22],text=msg)
        wire(name,name+'Message')
        wire(name+'Message','diagnostics')

# MIDI allocation. notein emits velocity before pitch; pack's pitch inlet is hot.
obj('noteIn','notein',[20,210,60,22],1,3)
obj('notes','pack 0 0',[110,210,90,22],2)
wire('noteIn','notes');wire('noteIn','notes',1,1);wire('notes','diagnostics')
obj('poly','poly 8 1',[20,310,80,22],2,3)
wire('noteIn','poly');wire('noteIn','poly',1,1)
obj('voicePack','pack 0 0 0',[130,310,110,22],3)
wire('poly','voicePack');wire('poly','voicePack',1,1);wire('poly','voicePack',2,2)
obj('route','route 1 2 3 4 5 6 7 8',[20,360,250,22],1,9);wire('voicePack','route')

def voice_patcher():
    bs=[];ls=[]
    def b(id,text,rect,ins=1,outs=1,cls='newobj'):
        entry=dict(id=id,maxclass=cls,numinlets=ins,numoutlets=outs,patching_rect=rect)
        if text:entry['text']=text
        bs.append({'box':entry})
    def w(a,z,ao=0,zi=0):ls.append({'patchline':{'source':[a,ao],'destination':[z,zi]}})
    b('in',None,[15,15,25,25],1,1,'inlet')
    b('trigger','t l l',[15,55,55,22],1,2);w('in','trigger')
    b('pitch','unpack 0 0',[150,95,95,22],1,2);w('trigger','pitch',1)
    b('mtof','mtof',[150,135,50,22]);w('pitch','mtof')
    b('osc','cycle~',[150,175,60,22],2,1);w('mtof','osc')
    b('velocity','unpack 0 0',[15,95,95,22],1,2);w('trigger','velocity')
    b('scale','/ 127.',[15,135,65,22],2,1);w('velocity','scale',1)
    b('env','adsr~ 5 40 0.8 120',[15,220,170,22],5,3);w('scale','env')
    b('attackIn',None,[300,15,25,25],1,1,'inlet');w('attackIn','env',0,1)
    b('releaseIn',None,[380,15,25,25],1,1,'inlet');w('releaseIn','env',0,4)
    b('amp','*~',[150,270,45,22],2,1);w('osc','amp');w('env','amp',0,1)
    b('out',None,[150,315,25,25],1,0,'outlet');w('amp','out')
    return {'fileversion':1,'rect':[0,0,480,370],'classnamespace':'box','boxes':bs,'lines':ls}

for i in range(8):
    name='voice'+str(i+1)
    obj(name,'p sine_voice_'+str(i+1),[20+i*135,420,125,22],3,1,patcher=voice_patcher())
    wire('route',name,i)
    wire('attack',name,0,1);wire('release',name,0,2)

# Equal-weight sum and normalized gain. Audio output is dual-mono stereo.
obj('sum','+~',[20,510,50,22],2)
for i in range(8):wire('voice'+str(i+1),'sum')
obj('normalize','*~ 0.125',[20,550,85,22],2);wire('sum','normalize')
obj('levelScale','/ 100.',[310,220,65,22],2);wire('level','levelScale')
obj('gainRamp','pack 0. 20',[310,260,90,22],2);wire('levelScale','gainRamp')
obj('gainSignal','line~ 0.7',[310,300,85,22],2,2);wire('gainRamp','gainSignal')
obj('gain','*~',[20,590,50,22],2);wire('normalize','gain');wire('gainSignal','gain',0,1)
obj('protect','clip~ -0.98 0.98',[20,630,145,22],3);wire('gain','protect')
obj('out','plugout~',[20,720,80,22],2,2);wire('protect','out');wire('protect','out',0,1);wire('protect','meter')
obj('peak','peakamp~ 100',[210,630,130,22]);wire('protect','peak')
obj('peakMessage','prepend peak',[210,670,120,22]);wire('peak','peakMessage');wire('peakMessage','diagnostics')

obj('stopVoices','stop',[752,300,70,22])
# Use a message box: poly's stop message sends note-offs to all allocated voices.
boxes[-1]['box']['maxclass']='message';boxes[-1]['box']['numinlets']=2
wire('panicButton','stopVoices');wire('stopVoices','poly')
obj('saveDialog','savedialog TEXT',[884,260,145,22]);wire('exportButton','saveDialog')
obj('writeMessage','prepend write',[884,300,125,22]);wire('saveDialog','writeMessage');wire('writeMessage','diagnostics')
obj('thisDevice','live.thisdevice',[470,210,100,22],1,3)
obj('initDefer','deferlow',[470,250,70,22]);wire('thisDevice','initDefer')
add('initMessage','message',[470,290,50,22],text='init');wire('initDefer','initMessage');wire('initMessage','diagnostics')
add('diagnostics','v8.codebox',[590,370,550,350],code=(HERE/'diagnostics.js').read_text(),numinlets=1,numoutlets=1,
    saved_object_attributes={'parameter_enable':0});wire('diagnostics','status')

patch={'patcher':dict(fileversion=1,appversion={'major':9,'minor':1,'revision':5,'architecture':'x64','modernui':1},
    classnamespace='box',rect=[50,100,1160,800],openrect=[0,0,1160,169],openinpresentation=1,
    devicewidth=1160,default_fontname='Arial',default_fontsize=11,bgcolor=[.13,.16,.18,1],
    boxes=boxes,lines=lines,parameters=parameters,dependency_cache=[],autosave=0,
    project={'version':1,'amxdtype':1768515945,'readonly':0,'devpathtype':0,'devpath':'.',
        'autoorganize':1,'hideprojectwindow':1,'autolocalize':0,'contents':{'patchers':{}},'searchpath':{},'layout':{}})}
name='PAG Sine Test Instrument'
(HERE/(name+'.maxpat')).write_text(json.dumps(patch,indent=2)+'\n')
payload=json.dumps(patch,ensure_ascii=False,indent=2).encode()+b'\x00'
header=b'ampf'+struct.pack('<I',4)+b'iiiimeta'+struct.pack('<II',4,0)+b'ptch'+struct.pack('<I',len(payload))
target=OUT/(name+'.amxd');target.write_bytes(header+payload)
print(json.dumps({'device':str(target),'bytes':target.stat().st_size,'embedded_sine_voices':8,'external_dependencies':0}))
