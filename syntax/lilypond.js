var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._lilypond();
    this.hl('');
    return this.main;
};
HL.prototype.hl = function hl(m,s) {
    this.pos += m.length;
    this.str = this.str.slice(m.length);
    if(this.style == s)
        this.hlText += m;
    else {
        if(this.hlText) {
            if(this.style == 'dsNormal')
                this.main.appendChild(document.createTextNode(this.hlText));
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(this.hlText));
                span.className = this.style;
                this.main.appendChild(span);
            }
        }
        this.style = s;
        this.hlText = m;
    }
    return true;
};
HL.prototype._lilypond = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^\b[a-z]+\s*=/i.exec(this.str)) {this._assignment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._music = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._default = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._basic = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._musiccommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\(&dynamics;)&b;/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[<!>]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\(&scripts;)&b;/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[()]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[][]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword')) continue;
        if((m = /^\\note(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._notemode();continue;}
        if((m = /^\\drum(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._drummode();continue;}
        if((m = /^\\chord(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._chordmode();continue;}
        if((m = /^\\figure(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._figuremode();continue;}
        if((m = /^\\(lyric(mode|s)|addlyrics)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lyricmode();continue;}
        if((m = /^\\lyricsto&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lyricsto();continue;}
        if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._markup();continue;}
        if((m = /^\\(header|paper|layout|midi|with)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._section();continue;}
        if((m = /^\\(new|context|change)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._context();continue;}
        if((m = /^\\(un)?set\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._set();continue;}
        if((m = /^\\(override(Property)?|revert)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._override();continue;}
        if((m = /^\\skip&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._duration();continue;}
        if((m = /^\\tempo&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._tempo();continue;}
        if((m = /^\\(&keywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\\(&commands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\\(&toplevelvars;)&b;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(&deprecatedkeywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\\(&deprecatedcommands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\\(translator|newcontext)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._context();continue;}
        if((m = /^\\property&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._override();continue;}
        if((m = /^\\[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\' && this.hl('\\', 'dsError')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._command = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword')) continue;
        if((m = /^\\note(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._notemode();continue;}
        if((m = /^\\drum(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._drummode();continue;}
        if((m = /^\\chord(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._chordmode();continue;}
        if((m = /^\\figure(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._figuremode();continue;}
        if((m = /^\\(lyric(mode|s)|addlyrics)&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lyricmode();continue;}
        if((m = /^\\lyricsto&b;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lyricsto();continue;}
        if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._markup();continue;}
        if((m = /^\\(header|paper|layout|midi|with)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._section();continue;}
        if((m = /^\\(new|context|change)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._context();continue;}
        if((m = /^\\(un)?set\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._set();continue;}
        if((m = /^\\(override(Property)?|revert)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._override();continue;}
        if((m = /^\\skip&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._duration();continue;}
        if((m = /^\\tempo&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._tempo();continue;}
        if((m = /^\\(&keywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\\(&commands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\\(&toplevelvars;)&b;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(&deprecatedkeywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\\(&deprecatedcommands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\\(translator|newcontext)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._context();continue;}
        if((m = /^\\property&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._override();continue;}
        if((m = /^\\[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\' && this.hl('\\', 'dsError')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._assignment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\b(&toplevelvars;)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^[a-z]+/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._pitch = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^=\s*('+|,+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[!?]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._duration = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._chord = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) {this._chordend();continue;}
        if((m = /^&pitch;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._chordpitch();continue;}
        if((m = /^[<{}srR]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._chordpitch = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^=\s*('+|,+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._chordend = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._commentline = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentblock = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._connect = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[.\-+|>\^_12345]/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._scheme = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._scheme2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsFloat')) {this._scheme3();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsFloat')) {this._schemerules();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsFloat')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsFloat')) {this._schemestring();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsFloat')) {this._schemecommentline();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsFloat')) {this._schemesub();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsFloat')) {this._schemequote();continue;}
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsFloat')) {this._schemecommentblock();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsFloat')) {this._schemelily();continue;}
        if((m = /^(?:AbsoluteDynamicEvent|AnnotateOutputEvent|ApplyContext|ApplyOutputEvent|ArpeggioEvent|ArticulationEvent|AutoChangeMusic|BarCheck|BassFigureEvent|BeamEvent|BeamForbidEvent|BendAfterEvent|BreathingEvent|ClusterNoteEvent|ContextChange|ContextSpeccedMusic|CrescendoEvent|DecrescendoEvent|Event|EventChord|ExtenderEvent|FingeringEvent|GlissandoEvent|GraceMusic|HarmonicEvent|HyphenEvent|KeyChangeEvent|LabelEvent|LaissezVibrerEvent|LigatureEvent|LineBreakEvent|LyricCombineMusic|LyricEvent|MarkEvent|MultiMeasureRestEvent|MultiMeasureRestMusic|MultiMeasureTextEvent|Music|NoteEvent|NoteGroupingEvent|OverrideProperty|PageBreakEvent|PageTurnEvent|PartCombineMusic|PercentEvent|PercentRepeatedMusic|PesOrFlexaEvent|PhrasingSlurEvent|PropertySet|PropertyUnset|QuoteMusic|RelativeOctaveCheck|RelativeOctaveMusic|RepeatTieEvent|RepeatedMusic|RestEvent|RevertProperty|ScriptEvent|SequentialMusic|SimultaneousMusic|SkipEvent|SkipMusic|SlurEvent|SoloOneEvent|SoloTwoEvent|SostenutoEvent|SpacingSectionEvent|SpanEvent|StaffSpanEvent|StringNumberEvent|StrokeFingerEvent|SustainEvent|TextScriptEvent|TextSpanEvent|TieEvent|TimeScaledMusic|TransposedMusic|TremoloEvent|TremoloRepeatedMusic|TremoloSpanEvent|TrillSpanEvent|TupletSpanEvent|UnaCordaEvent|UnfoldedRepeatedMusic|UnisonoEvent|UnrelativableMusic|VoiceSeparator|VoltaRepeatedMusic)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[-+]?(\d+(\.\d+)?|\.\d+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^#(t|f|b[-+]?[01.]+|o[-+]?[0-7.]+|d[-+]?[0-9.]+|x[-+]?[0-9a-f.]+)/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[+-](inf|nan)\.0/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if(/^[^\S\n]+/.exec(this.str)) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._scheme3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsFloat')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsFloat')) {this._schemerules();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsFloat')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsFloat')) {this._schemestring();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsFloat')) {this._schemecommentline();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsFloat')) {this._schemesub();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsFloat')) {this._schemequote();continue;}
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsFloat')) {this._schemecommentblock();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsFloat')) {this._schemelily();continue;}
        if((m = /^(?:AbsoluteDynamicEvent|AnnotateOutputEvent|ApplyContext|ApplyOutputEvent|ArpeggioEvent|ArticulationEvent|AutoChangeMusic|BarCheck|BassFigureEvent|BeamEvent|BeamForbidEvent|BendAfterEvent|BreathingEvent|ClusterNoteEvent|ContextChange|ContextSpeccedMusic|CrescendoEvent|DecrescendoEvent|Event|EventChord|ExtenderEvent|FingeringEvent|GlissandoEvent|GraceMusic|HarmonicEvent|HyphenEvent|KeyChangeEvent|LabelEvent|LaissezVibrerEvent|LigatureEvent|LineBreakEvent|LyricCombineMusic|LyricEvent|MarkEvent|MultiMeasureRestEvent|MultiMeasureRestMusic|MultiMeasureTextEvent|Music|NoteEvent|NoteGroupingEvent|OverrideProperty|PageBreakEvent|PageTurnEvent|PartCombineMusic|PercentEvent|PercentRepeatedMusic|PesOrFlexaEvent|PhrasingSlurEvent|PropertySet|PropertyUnset|QuoteMusic|RelativeOctaveCheck|RelativeOctaveMusic|RepeatTieEvent|RepeatedMusic|RestEvent|RevertProperty|ScriptEvent|SequentialMusic|SimultaneousMusic|SkipEvent|SkipMusic|SlurEvent|SoloOneEvent|SoloTwoEvent|SostenutoEvent|SpacingSectionEvent|SpanEvent|StaffSpanEvent|StringNumberEvent|StrokeFingerEvent|SustainEvent|TextScriptEvent|TextSpanEvent|TieEvent|TimeScaledMusic|TransposedMusic|TremoloEvent|TremoloRepeatedMusic|TremoloSpanEvent|TrillSpanEvent|TupletSpanEvent|UnaCordaEvent|UnfoldedRepeatedMusic|UnisonoEvent|UnrelativableMusic|VoiceSeparator|VoltaRepeatedMusic)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[-+]?(\d+(\.\d+)?|\.\d+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^#(t|f|b[-+]?[01.]+|o[-+]?[0-7.]+|d[-+]?[0-9.]+|x[-+]?[0-9a-f.]+)/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[+-](inf|nan)\.0/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._schemerules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsFloat')) {this._schemerules();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsFloat')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsFloat')) {this._schemestring();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsFloat')) {this._schemecommentline();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsFloat')) {this._schemesub();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsFloat')) {this._schemequote();continue;}
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsFloat')) {this._schemecommentblock();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsFloat')) {this._schemelily();continue;}
        if((m = /^(?:AbsoluteDynamicEvent|AnnotateOutputEvent|ApplyContext|ApplyOutputEvent|ArpeggioEvent|ArticulationEvent|AutoChangeMusic|BarCheck|BassFigureEvent|BeamEvent|BeamForbidEvent|BendAfterEvent|BreathingEvent|ClusterNoteEvent|ContextChange|ContextSpeccedMusic|CrescendoEvent|DecrescendoEvent|Event|EventChord|ExtenderEvent|FingeringEvent|GlissandoEvent|GraceMusic|HarmonicEvent|HyphenEvent|KeyChangeEvent|LabelEvent|LaissezVibrerEvent|LigatureEvent|LineBreakEvent|LyricCombineMusic|LyricEvent|MarkEvent|MultiMeasureRestEvent|MultiMeasureRestMusic|MultiMeasureTextEvent|Music|NoteEvent|NoteGroupingEvent|OverrideProperty|PageBreakEvent|PageTurnEvent|PartCombineMusic|PercentEvent|PercentRepeatedMusic|PesOrFlexaEvent|PhrasingSlurEvent|PropertySet|PropertyUnset|QuoteMusic|RelativeOctaveCheck|RelativeOctaveMusic|RepeatTieEvent|RepeatedMusic|RestEvent|RevertProperty|ScriptEvent|SequentialMusic|SimultaneousMusic|SkipEvent|SkipMusic|SlurEvent|SoloOneEvent|SoloTwoEvent|SostenutoEvent|SpacingSectionEvent|SpanEvent|StaffSpanEvent|StringNumberEvent|StrokeFingerEvent|SustainEvent|TextScriptEvent|TextSpanEvent|TieEvent|TimeScaledMusic|TransposedMusic|TremoloEvent|TremoloRepeatedMusic|TremoloSpanEvent|TrillSpanEvent|TupletSpanEvent|UnaCordaEvent|UnfoldedRepeatedMusic|UnisonoEvent|UnrelativableMusic|VoiceSeparator|VoltaRepeatedMusic)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[-+]?(\d+(\.\d+)?|\.\d+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^#(t|f|b[-+]?[01.]+|o[-+]?[0-7.]+|d[-+]?[0-9.]+|x[-+]?[0-9a-f.]+)/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[+-](inf|nan)\.0/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._schemequote = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._schemelily = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.str[1] == '}' && this.hl('#}', 'dsFloat')) return;
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^\b[a-z]+\s*=/i.exec(this.str)) {this._assignment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._schemecommentline = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._schemecommentblock = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '!' && this.str[1] == '#' && this.hl('!#', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._schemesub = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._schemestring = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\\[0fnrtav\\"]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._notemode = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._notemode2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._notemode2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._noterules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._noterules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._noterules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._drummode = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._drummode2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._drummode2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._drumrules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^<(?!<)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._drumchord();continue;}
        if((m = /^(?:acousticbassdrum|acousticsnare|agh|agl|bassdrum|bd|bda|boh|bohm|boho|bol|bolm|bolo|cab|cabasa|cb|cgh|cghm|cgho|cgl|cglm|cglo|chinesecymbal|cl|claves|closedhihat|cowbell|crashcymbal|crashcymbala|crashcymbalb|cuim|cuio|cymc|cymca|cymcb|cymch|cymr|cymra|cymrb|cyms|da|db|dc|dd|de|electricsnare|fivedown|fiveup|fourdown|fourup|gui|guil|guiro|guis|halfopenhihat|handclap|hc|hh|hhc|hhho|hho|hhp|hiagogo|hibongo|hiconga|highfloortom|hightom|hihat|himidtom|hisidestick|hitimbale|hiwoodblock|loagogo|lobongo|loconga|longguiro|longwhistle|losidestick|lotimbale|lowfloortom|lowmidtom|lowoodblock|lowtom|mar|maracas|mutecuica|mutehibongo|mutehiconga|mutelobongo|muteloconga|mutetriangle|onedown|oneup|opencuica|openhibongo|openhiconga|openhihat|openlobongo|openloconga|opentriangle|pedalhihat|rb|ridebell|ridecymbal|ridecymbala|ridecymbalb|shortguiro|shortwhistle|sidestick|sn|sna|snare|sne|splashcymbal|ss|ssh|ssl|tamb|tambourine|tamtam|threedown|threeup|timh|timl|tomfh|tomfl|tomh|toml|tommh|tomml|tri|triangle|trim|trio|tt|twodown|twoup|ua|ub|uc|ud|ue|vibraslap|vibs|wbh|wbl|whl|whs)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._duration();continue;}
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._drumrules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._drumrules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^<(?!<)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._drumchord();continue;}
        if((m = /^(?:acousticbassdrum|acousticsnare|agh|agl|bassdrum|bd|bda|boh|bohm|boho|bol|bolm|bolo|cab|cabasa|cb|cgh|cghm|cgho|cgl|cglm|cglo|chinesecymbal|cl|claves|closedhihat|cowbell|crashcymbal|crashcymbala|crashcymbalb|cuim|cuio|cymc|cymca|cymcb|cymch|cymr|cymra|cymrb|cyms|da|db|dc|dd|de|electricsnare|fivedown|fiveup|fourdown|fourup|gui|guil|guiro|guis|halfopenhihat|handclap|hc|hh|hhc|hhho|hho|hhp|hiagogo|hibongo|hiconga|highfloortom|hightom|hihat|himidtom|hisidestick|hitimbale|hiwoodblock|loagogo|lobongo|loconga|longguiro|longwhistle|losidestick|lotimbale|lowfloortom|lowmidtom|lowoodblock|lowtom|mar|maracas|mutecuica|mutehibongo|mutehiconga|mutelobongo|muteloconga|mutetriangle|onedown|oneup|opencuica|openhibongo|openhiconga|openhihat|openlobongo|openloconga|opentriangle|pedalhihat|rb|ridebell|ridecymbal|ridecymbala|ridecymbalb|shortguiro|shortwhistle|sidestick|sn|sna|snare|sne|splashcymbal|ss|ssh|ssl|tamb|tambourine|tamtam|threedown|threeup|timh|timl|tomfh|tomfl|tomh|toml|tommh|tomml|tri|triangle|trim|trio|tt|twodown|twoup|ua|ub|uc|ud|ue|vibraslap|vibs|wbh|wbl|whl|whs)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._duration();continue;}
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._drumchord = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:acousticbassdrum|acousticsnare|agh|agl|bassdrum|bd|bda|boh|bohm|boho|bol|bolm|bolo|cab|cabasa|cb|cgh|cghm|cgho|cgl|cglm|cglo|chinesecymbal|cl|claves|closedhihat|cowbell|crashcymbal|crashcymbala|crashcymbalb|cuim|cuio|cymc|cymca|cymcb|cymch|cymr|cymra|cymrb|cyms|da|db|dc|dd|de|electricsnare|fivedown|fiveup|fourdown|fourup|gui|guil|guiro|guis|halfopenhihat|handclap|hc|hh|hhc|hhho|hho|hhp|hiagogo|hibongo|hiconga|highfloortom|hightom|hihat|himidtom|hisidestick|hitimbale|hiwoodblock|loagogo|lobongo|loconga|longguiro|longwhistle|losidestick|lotimbale|lowfloortom|lowmidtom|lowoodblock|lowtom|mar|maracas|mutecuica|mutehibongo|mutehiconga|mutelobongo|muteloconga|mutetriangle|onedown|oneup|opencuica|openhibongo|openhiconga|openhihat|openlobongo|openloconga|opentriangle|pedalhihat|rb|ridebell|ridecymbal|ridecymbala|ridecymbalb|shortguiro|shortwhistle|sidestick|sn|sna|snare|sne|splashcymbal|ss|ssh|ssl|tamb|tambourine|tamtam|threedown|threeup|timh|timl|tomfh|tomfl|tomh|toml|tommh|tomml|tri|triangle|trim|trio|tt|twodown|twoup|ua|ub|uc|ud|ue|vibraslap|vibs|wbh|wbl|whl|whs)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) {this._chordend();continue;}
        if((m = /^&pitch;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._chordpitch();continue;}
        if((m = /^[<{}srR]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._chordmode = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._chordmode2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._chordmode2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._chordrules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^:?([\.^]?\d+[-+]?|(m|dim|aug|maj|sus)&b;)*(/\+?&pitch;)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._chordrules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._chordrules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^:?([\.^]?\d+[-+]?|(m|dim|aug|maj|sus)&b;)*(/\+?&pitch;)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._connect();continue;}
        if(this.str[0] == '\\') {this._musiccommand();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._chord();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._pitch();continue;}
        if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._figuremode = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._figuremode2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._figuremode2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._figurerules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._figure();continue;}
        if((m = /^&rest;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._duration();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._figurerules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._figurerules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._figure();continue;}
        if((m = /^&rest;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._duration();continue;}
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._figure = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsDataType')) {this._chordend();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._markup();continue;}
        if((m = /^\\skip&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._duration();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lyricmode = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._lyricmode2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._lyricmode2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._lyricrules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^(\w+-{2,}|\w+_{2,}|-{2,}\w+|_{2,}\w+)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(--|__|_)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if((m = /^\S+\}/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lyricsto = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^"(\\["\\]|[^"\\])+"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._lyricsto2();continue;}
        if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lyricsto2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._lyricsto2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._lyricsto3();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lyricsto3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._lyricrules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^(\w+-{2,}|\w+_{2,}|-{2,}\w+|_{2,}\w+)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(--|__|_)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if((m = /^\S+\}/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lyricrules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._lyricrules();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^(\w+-{2,}|\w+_{2,}|-{2,}\w+|_{2,}\w+)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(--|__|_)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        if((m = /^\S+\}/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._markup = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._markup2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\score\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._notemode();continue;}
        if((m = /^\\(&markupwithtextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\(&markupnotextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if((m = /^[^"\s\\#%{}$]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._markup2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._markuprules();continue;}
        if((m = /^\\score\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._notemode();continue;}
        if((m = /^\\(&markupnotextargs;|&markupwithtextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\(&deprecatedmarkup;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[A-Za-z]+(-[A-Za-z]+)*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._markuprules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._markuprules();continue;}
        if((m = /^\\score\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._notemode();continue;}
        if((m = /^\\(&markupnotextargs;|&markupwithtextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\(&deprecatedmarkup;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[A-Za-z]+(-[A-Za-z]+)*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._section = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._section2();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._section2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._sectionrules();continue;}
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^("?)\b(&engravers;)\b\1/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:aDueText|alignAboveContext|alignBassFigureAccidentals|alignBelowContext|allowBeamBreak|associatedVoice|autoAccidentals|autoBeamCheck|autoBeamSettings|autoBeaming|autoCautionaries|automaticBars|barAlways|barCheckSynchronize|barNumberVisibility|baseMoment|bassFigureFormatFunction|bassStaffProperties|beamExceptions|beatGrouping|beatLength|beatStructure|chordChanges|chordNameExceptions|chordNameExceptionsFull|chordNameExceptionsPartial|chordNameFunction|chordNameSeparator|chordNoteNamer|chordPrefixSpacer|chordRootNamer|clefGlyph|clefOctavation|clefPosition|connectArpeggios|countPercentRepeats|createKeyOnClefChange|createSpacing|crescendoSpanner|crescendoText|currentBarNumber|decrescendoSpanner|decrescendoText|defaultBarType|doubleSlurs|doubleRepeatType|drumPitchTable|drumStyleTable|dynamicAbsoluteVolumeFunction|explicitClefVisibility|explicitKeySignatureVisibility|extendersOverRests|extraNatural|figuredBassAlterationDirection|figuredBassCenterContinuations|figuredBassFormatter|figuredBassPlusDirection|fingeringOrientations|firstClef|followVoice|fontSize|forbidBreak|forceClef|gridInterval|hairpinToBarline|harmonicAccidentals|highStringOne|ignoreBarChecks|ignoreFiguredBassRest|ignoreMelismata|implicitBassFigures|implicitTimeSignatureVisibility|instrumentCueName|instrumentEqualizer|instrumentName|instrumentTransposition|internalBarNumber|keepAliveInterfaces|keyAlterationOrder|keySignature|lyricMelismaAlignment|majorSevenSymbol|markFormatter|maximumFretStretch|measureLength|measurePosition|melismaBusyProperties|metronomeMarkFormatter|middleCClefPosition|middleCOffset|middleCPosition|midiInstrument|midiMaximumVolume|midiMinimumVolume|minimumFret|minimumPageTurnLength|minimumRepeatLengthForPageTurn|noteToFretFunction|ottavation|output|pedalSostenutoStrings|pedalSostenutoStyle|pedalSustainStrings|pedalSustainStyle|pedalUnaCordaStrings|pedalUnaCordaStyle|printKeyCancellation|printOctaveNames|printPartCombineTexts|proportionalNotationDuration|recordEventSequence|rehearsalMark|repeatCommands|restNumberThreshold|scriptDefinitions|shapeNoteStyles|shortInstrumentName|shortVocalName|skipBars|skipTypesetting|soloIIText|soloText|squashedPosition|staffLineLayoutFunction|stanza|stemLeftBeamCount|stemRightBeamCount|stringNumberOrientations|stringOneTopmost|stringTunings|strokeFingerOrientations|subdivideBeams|suggestAccidentals|systemStartDelimiter|systemStartDelimiterHierarchy|tablatureFormat|tempoUnitCount|tempoUnitDuration|tempoWholesPerMinute|tieWaitForNote|timeSignatureFraction|timing|tonic|topLevelAlignment|trebleStaffProperties|tremoloFlags|tupletFullLength|tupletFullLengthNote|tupletSpannerDuration|useBassFigureExtenders|verticallySpacedContexts|vocalName|voltaOnThisStaff|voltaSpannerDuration|whichBar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\b(&headervars;|&papervars;|&layoutvars;)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:barNumberAlignSymbol|centralCPosition|extraVerticalExtent|fingerHorizontalDirection|instr|instrument|keyAccidentalOrder|minimumVerticalExtent|rehearsalMarkAlignSymbol|soloADue|tupletNumberFormatFunction|vocNam)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectionrules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._sectionrules();continue;}
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^("?)\b(&engravers;)\b\1/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:aDueText|alignAboveContext|alignBassFigureAccidentals|alignBelowContext|allowBeamBreak|associatedVoice|autoAccidentals|autoBeamCheck|autoBeamSettings|autoBeaming|autoCautionaries|automaticBars|barAlways|barCheckSynchronize|barNumberVisibility|baseMoment|bassFigureFormatFunction|bassStaffProperties|beamExceptions|beatGrouping|beatLength|beatStructure|chordChanges|chordNameExceptions|chordNameExceptionsFull|chordNameExceptionsPartial|chordNameFunction|chordNameSeparator|chordNoteNamer|chordPrefixSpacer|chordRootNamer|clefGlyph|clefOctavation|clefPosition|connectArpeggios|countPercentRepeats|createKeyOnClefChange|createSpacing|crescendoSpanner|crescendoText|currentBarNumber|decrescendoSpanner|decrescendoText|defaultBarType|doubleSlurs|doubleRepeatType|drumPitchTable|drumStyleTable|dynamicAbsoluteVolumeFunction|explicitClefVisibility|explicitKeySignatureVisibility|extendersOverRests|extraNatural|figuredBassAlterationDirection|figuredBassCenterContinuations|figuredBassFormatter|figuredBassPlusDirection|fingeringOrientations|firstClef|followVoice|fontSize|forbidBreak|forceClef|gridInterval|hairpinToBarline|harmonicAccidentals|highStringOne|ignoreBarChecks|ignoreFiguredBassRest|ignoreMelismata|implicitBassFigures|implicitTimeSignatureVisibility|instrumentCueName|instrumentEqualizer|instrumentName|instrumentTransposition|internalBarNumber|keepAliveInterfaces|keyAlterationOrder|keySignature|lyricMelismaAlignment|majorSevenSymbol|markFormatter|maximumFretStretch|measureLength|measurePosition|melismaBusyProperties|metronomeMarkFormatter|middleCClefPosition|middleCOffset|middleCPosition|midiInstrument|midiMaximumVolume|midiMinimumVolume|minimumFret|minimumPageTurnLength|minimumRepeatLengthForPageTurn|noteToFretFunction|ottavation|output|pedalSostenutoStrings|pedalSostenutoStyle|pedalSustainStrings|pedalSustainStyle|pedalUnaCordaStrings|pedalUnaCordaStyle|printKeyCancellation|printOctaveNames|printPartCombineTexts|proportionalNotationDuration|recordEventSequence|rehearsalMark|repeatCommands|restNumberThreshold|scriptDefinitions|shapeNoteStyles|shortInstrumentName|shortVocalName|skipBars|skipTypesetting|soloIIText|soloText|squashedPosition|staffLineLayoutFunction|stanza|stemLeftBeamCount|stemRightBeamCount|stringNumberOrientations|stringOneTopmost|stringTunings|strokeFingerOrientations|subdivideBeams|suggestAccidentals|systemStartDelimiter|systemStartDelimiterHierarchy|tablatureFormat|tempoUnitCount|tempoUnitDuration|tempoWholesPerMinute|tieWaitForNote|timeSignatureFraction|timing|tonic|topLevelAlignment|trebleStaffProperties|tremoloFlags|tupletFullLength|tupletFullLengthNote|tupletSpannerDuration|useBassFigureExtenders|verticallySpacedContexts|vocalName|voltaOnThisStaff|voltaSpannerDuration|whichBar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\b(&headervars;|&papervars;|&layoutvars;)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:barNumberAlignSymbol|centralCPosition|extraVerticalExtent|fingerHorizontalDirection|instr|instrument|keyAccidentalOrder|minimumVerticalExtent|rehearsalMarkAlignSymbol|soloADue|tupletNumberFormatFunction|vocNam)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '\\') {this._command();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._context = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._context2();continue;}
        if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._context2();continue;}
        if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._context2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._section2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._context2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^=(\s*[A-Za-z]+)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._set = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if((m = /^(?:aDueText|alignAboveContext|alignBassFigureAccidentals|alignBelowContext|allowBeamBreak|associatedVoice|autoAccidentals|autoBeamCheck|autoBeamSettings|autoBeaming|autoCautionaries|automaticBars|barAlways|barCheckSynchronize|barNumberVisibility|baseMoment|bassFigureFormatFunction|bassStaffProperties|beamExceptions|beatGrouping|beatLength|beatStructure|chordChanges|chordNameExceptions|chordNameExceptionsFull|chordNameExceptionsPartial|chordNameFunction|chordNameSeparator|chordNoteNamer|chordPrefixSpacer|chordRootNamer|clefGlyph|clefOctavation|clefPosition|connectArpeggios|countPercentRepeats|createKeyOnClefChange|createSpacing|crescendoSpanner|crescendoText|currentBarNumber|decrescendoSpanner|decrescendoText|defaultBarType|doubleSlurs|doubleRepeatType|drumPitchTable|drumStyleTable|dynamicAbsoluteVolumeFunction|explicitClefVisibility|explicitKeySignatureVisibility|extendersOverRests|extraNatural|figuredBassAlterationDirection|figuredBassCenterContinuations|figuredBassFormatter|figuredBassPlusDirection|fingeringOrientations|firstClef|followVoice|fontSize|forbidBreak|forceClef|gridInterval|hairpinToBarline|harmonicAccidentals|highStringOne|ignoreBarChecks|ignoreFiguredBassRest|ignoreMelismata|implicitBassFigures|implicitTimeSignatureVisibility|instrumentCueName|instrumentEqualizer|instrumentName|instrumentTransposition|internalBarNumber|keepAliveInterfaces|keyAlterationOrder|keySignature|lyricMelismaAlignment|majorSevenSymbol|markFormatter|maximumFretStretch|measureLength|measurePosition|melismaBusyProperties|metronomeMarkFormatter|middleCClefPosition|middleCOffset|middleCPosition|midiInstrument|midiMaximumVolume|midiMinimumVolume|minimumFret|minimumPageTurnLength|minimumRepeatLengthForPageTurn|noteToFretFunction|ottavation|output|pedalSostenutoStrings|pedalSostenutoStyle|pedalSustainStrings|pedalSustainStyle|pedalUnaCordaStrings|pedalUnaCordaStyle|printKeyCancellation|printOctaveNames|printPartCombineTexts|proportionalNotationDuration|recordEventSequence|rehearsalMark|repeatCommands|restNumberThreshold|scriptDefinitions|shapeNoteStyles|shortInstrumentName|shortVocalName|skipBars|skipTypesetting|soloIIText|soloText|squashedPosition|staffLineLayoutFunction|stanza|stemLeftBeamCount|stemRightBeamCount|stringNumberOrientations|stringOneTopmost|stringTunings|strokeFingerOrientations|subdivideBeams|suggestAccidentals|systemStartDelimiter|systemStartDelimiterHierarchy|tablatureFormat|tempoUnitCount|tempoUnitDuration|tempoWholesPerMinute|tieWaitForNote|timeSignatureFraction|timing|tonic|topLevelAlignment|trebleStaffProperties|tremoloFlags|tupletFullLength|tupletFullLengthNote|tupletSpannerDuration|useBassFigureExtenders|verticallySpacedContexts|vocalName|voltaOnThisStaff|voltaSpannerDuration|whichBar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:barNumberAlignSymbol|centralCPosition|extraVerticalExtent|fingerHorizontalDirection|instr|instrument|keyAccidentalOrder|minimumVerticalExtent|rehearsalMarkAlignSymbol|soloADue|tupletNumberFormatFunction|vocNam)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._override = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^[A-Za-z]+(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tempo = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._markup();continue;}
        if((m = /^\d+\.*\s*=\s*\d+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsNormal')) {this._commentblock();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._commentline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._scheme();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._schemesub();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
