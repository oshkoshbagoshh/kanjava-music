"""Build a self-contained AMXD with two embedded v8.codeboxes; no third-party packages."""
import json
from pathlib import Path
import struct

HERE = Path(__file__).resolve().parent
OUT = HERE.parent
boxes, lines, parameters = [], [], {}

def box(id, cls, rect, **kw):
    if cls == 'message':
        kw.setdefault('numinlets', 2)
        kw.setdefault('numoutlets', 1)
    if cls == 'newobj':
        kw.setdefault('numinlets', 1)
        kw.setdefault('numoutlets', 2 if kw.get('text') == 't b b' else 3 if kw.get('text') == 'live.thisdevice' else 0 if kw.get('text') == 'midiout' else 1)
    b = dict(id=id, maxclass=cls, patching_rect=rect, **kw)
    boxes.append({'box': b})
    return b

def ui(id, cls, rect, **kw):
    return box(id, cls, rect, presentation=1, presentation_rect=rect, **kw)

def wire(source, dest, outlet=0, inlet=0):
    lines.append({'patchline': {'source': [source, outlet], 'destination': [dest, inlet]}})

def label(id, text, rect, size=11, color=None):
    return ui(id, 'comment', rect, text=text, fontsize=size, fontname='Arial',
              textcolor=color or [0.82, 0.86, 0.88, 1], numinlets=1, numoutlets=0)

def control(name, title, x, width, default, lo=0, hi=100, options=None):
    attrs = dict(parameter_longname=title, parameter_shortname=title,
                 parameter_initial=[default], parameter_initial_enable=1,
                 parameter_mmin=lo, parameter_mmax=hi, parameter_type=0 if hi > 255 else 1,
                 parameter_unitstyle=0)
    if options:
        attrs.update(parameter_enum=options, parameter_type=2, parameter_mmin=0, parameter_mmax=len(options)-1)
    label(name+'Label', title, [x, 30, width, 14], 10)
    b = ui(name, 'live.menu' if options else 'live.numbox', [x, 46, width, 19],
        varname=name, parameter_enable=1, numinlets=1, numoutlets=3 if options else 2,
        saved_attribute_attributes={'valueof': attrs})
    parameters[name] = [title, title, 0]
    return b

label('title', 'PROGRESSIVE / ARRANGEMENT GENERATOR', [12, 5, 450, 23], 15, [0.39, 0.84, 0.80, 1])
label('subtitle', 'MIDI ONLY · 3 NEW TRACKS · 4/4', [475, 9, 230, 16], 10)
control('root', 'Root', 14, 52, 7, options=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'])
control('mode', 'Scale', 78, 105, 1, options=['Major','Natural Minor'])
control('progression', 'Progression', 195, 130, 0, options=['1–6–3–7','1–7–6–7','1–4–6–5'])
control('startBar', 'Start bar', 337, 72, 1, 1, 394000)
control('seed', 'Seed', 421, 105, 1, 1, 16777215)
control('density', 'Density %', 538, 75, 60)
control('variation', 'Variation %', 625, 75, 35)

for i, (title, length) in enumerate(zip(['Intro','Build','Main A','Break','Main B','Outro'], [16,16,32,16,32,16])):
    x = 14 + i * 92
    label('lengthLabel'+str(i), title+' bars', [x, 75, 85, 14], 10)
    opts = [str(n) for n in range(0,65,4)]
    attrs = dict(parameter_longname=title+' bars', parameter_shortname=title,
        parameter_type=2, parameter_enum=opts, parameter_mmin=0, parameter_mmax=16,
        parameter_initial=[length//4], parameter_initial_enable=1)
    ui('length'+str(i), 'live.menu', [x, 92, 80, 19], varname='length'+str(i),
       numinlets=1, numoutlets=3, parameter_enable=1, saved_attribute_attributes={'valueof':attrs})
    parameters['length'+str(i)] = [title+' bars', title, 0]
label('sectionHint', '0 = skip\nEnd bar is exclusive', [571, 78, 135, 34], 10)

for id, title, x, w, message in [('previewButton','PREVIEW',14,120,'preview'),
    ('generateButton','GENERATE 3 TRACKS',146,206,'generate'), ('seedButton','NEW SEED',364,120,'newseed')]:
    ui(id, 'live.text', [x, 122, w, 22], varname=id, text=title, texton=title,
       mode=0, parameter_enable=0, numinlets=1, numoutlets=2,
       activebgcolor=[0.24,0.64,0.59,1], activetextcolor=[0.05,0.09,0.10,1])
    box(id+'Select', 'newobj', [x, 335, 40, 22], text='t b')
    box(id+'Message', 'message', [x, 365, 90, 22], text=message)
    wire(id, id+'Select'); wire(id+'Select', id+'Message'); wire(id+'Message','uiDefer')

label('previewHeader','SECTIONS · start–end bar | Bass / Chords / Arp notes', [724, 12, 365, 19], 10, [0.39,0.84,0.80,1])
for i, name in enumerate(['Intro','Build','Main A','Break','Main B','Outro']):
    b = label('section'+str(i), name+'  —  Preview to calculate', [724, 36+i*17, 370, 17], 10)
    b['varname'] = 'section'+str(i)
label('status', 'Initializing…', [14, 150, 1075, 17], 10)

box('uiDefer','newobj',[14,400,65,22],text='deferlow')
composition = (HERE/'composer.js').read_text()+'\n'+(HERE/'device-controller.js').read_text()
writer = (HERE/'arrangement-writer.js').read_text()+'\n'+(HERE/'live-adapter.js').read_text()
box('composer','v8.codebox',[14,440,520,200],code=composition,numinlets=1,numoutlets=2,
    outlettype=['',''],saved_object_attributes={'parameter_enable':0})
box('writer','v8.codebox',[570,440,520,200],code=writer,numinlets=1,numoutlets=2,
    outlettype=['',''],saved_object_attributes={'parameter_enable':0})
wire('uiDefer','composer'); wire('composer','writer'); wire('composer','status',1)
wire('writer','status'); wire('writer','composer',1)
box('thisDevice','newobj',[14,220,90,22],text='live.thisdevice')
box('initDefer','newobj',[14,250,65,22],text='deferlow')
box('initTrigger','newobj',[14,280,45,22],text='t b b')
box('initWriter','message',[95,280,35,22],text='init')
box('initComposer','message',[145,280,35,22],text='init')
wire('thisDevice','initDefer'); wire('initDefer','initTrigger')
wire('initTrigger','initWriter',1); wire('initWriter','writer')
wire('initTrigger','initComposer'); wire('initComposer','composer')
box('midiIn','newobj',[280,230,50,22],text='midiin')
box('midiOut','newobj',[280,270,50,22],text='midiout'); wire('midiIn','midiOut')
box('sourceNote','comment',[400,220,650,60],text='Two embedded JavaScript modules: composition + deferred Live API writer. MIDI passes through unchanged; no audio objects or live note generator. Edit source files and run build_device.py to rebuild.',linecount=3)

patch = {'patcher': dict(fileversion=1,appversion={'major':9,'minor':1,'revision':5,'architecture':'x64','modernui':1},
    classnamespace='box',rect=[50,100,1110,700],openrect=[0,0,1110,169],openinpresentation=1,
    devicewidth=1110,default_fontname='Arial',default_fontsize=11,bgcolor=[0.13,0.16,0.18,1],
    boxes=boxes,lines=lines,parameters=parameters,dependency_cache=[],autosave=0,
    project={'version':1,'amxdtype':1835887981,'readonly':0,'devpathtype':0,'devpath':'.',
        'autoorganize':1,'hideprojectwindow':1,'autolocalize':0,'contents':{'patchers':{}},'searchpath':{},'layout':{}})}
name = 'Progressive Arrangement Generator'
(HERE/(name+'.maxpat')).write_text(json.dumps(patch,indent=2)+'\n')
payload = json.dumps(patch,ensure_ascii=False,indent=2).encode('utf-8')+b'\x00'
header = b'ampf'+struct.pack('<I',4)+b'mmmmmeta'+struct.pack('<II',4,0)+b'ptch'+struct.pack('<I',len(payload))
target = OUT/(name+'.amxd')
target.write_bytes(header+payload)
print(json.dumps({'device':str(target),'bytes':target.stat().st_size,'embedded_modules':2,'external_dependencies':0},indent=2))
