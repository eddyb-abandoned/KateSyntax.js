var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
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
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:score|music|header|header2|footer|footer2|top|top2|bottom|bottom2|staff|voice|grids|music|headshapes|block)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\blyrics\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\b((dashed|dotted)\s+)?(bar|endbar|dblbar|invisbar|repeatstart|repeatboth|repeatend|restart)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._barline();continue;}
        if((m = /^\bnew(score|page)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\bmultirest\s+[0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\bunset\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._unset();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:print|left|right|center|title|paragraph|postscript)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._printCommand();continue;}
        if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._printCommand();continue;}
        if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._printCommand();continue;}
        if((m = /^\b((ragged|justified)\s+)?paragraph\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._printCommand();continue;}
        if((m = /^(?:chord|analysis|figbass|dyn)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:dotted|dashed|wavy|wide|medium|line|curve|to|bulge|octave|mussym|phrase|pedal|roll|to|down|up|with|midi)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:above|below|between|all)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\bdist(?=\s+[^=])/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:aboveorder|addtranspose|barstyle|beamslope|beamstyle|beloworder|betweenorder|bottommargin|brace|bracket|cancelkey|chorddist|clef|crescdist|defoct|dist|division|dyndist|endingstyle|firstpage|font|fontfamily|gridfret|gridsatend|gridscale|gridswhereused|key|label|label2|leftmargin|lyricsalign|lyricsfont|lyricsfontfamily|lyricssize|measnum|measnumfont|measnumfontfamily|measnumsize|noteheads|numbermrpt|ontheline|packexp|packfact|pad|pageheight|pagewidth|panelsperpage|pedstyle|printmultnum|rehstyle|release|restcombine|restsymmult|rightmargin|scale|scorepad|scoresep|size|stafflines|staffpad|staffs|staffscale|staffsep|stemlen|swingunit|sylposition|tabwhitebox|time|timeunit|topmargin|transpose|units|visible|vscheme|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._parameter();continue;}
        if((m = /^\[(?=(grace|xnote|cue|diam|with|slash|up|down|len|pad|ho|dist|hs|c\b|=))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._bracket();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._tuplet();continue;}
        if((m = /^[[\]{]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(<<|>>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(\(\s*)?((1/4|1/2|1|2|4|8|16|32|64|128|256)\.*\s*)?((\(\s*)?([a-grs]|us)(?!bm)([0-9'?\sxn]|[+-]+|[&#]{1,2}|\(\s*[&#]{1,2}\s*\)|\(\s*[xn]\s*\)|\(\s*[0-9]\s*\))*\)?\s*)*\s*(?=[;~="<A-Z@^]|\b(bm|es?bm|dashed|dotted|tie|slur|alt|hs|ifn?def|else|elseif|endif|with|above)\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._note();continue;}
        if((m = /^;\s*(?=[~=<]|\b(bm|es?bm|dashed|dotted|tie|slur|alt|hs|ifn?def|else|elseif|endif)\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._note();continue;}
        if((m = /^(1/4|1/2|1|2|4|8|16|32|64|128|256)?mu?[rs]+\s*(?=;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^m\s*rpt\s*(?=;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^=([a-z]|_[a-z][a-z_0-9]*)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([a-z]|_[a-z][a-z_0-9]*)\.[xynews]\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._location();continue;}
        if((m = /^([a-z]|_[a-z][a-z_0-9]*)\.(?=[A-Z])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[(,]\s*(?=([h-qt-z]|_[a-z][a-z_0-9]*)\s*[,)])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._locationProbably();continue;}
        if((m = /^[(,]\s*(?=[a-grs]\s*[,)])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._noteProbably();continue;}
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if((m = /^[0-9.]*\s*til\s*(([0-9]+m(\s*\+\s*[0-9.]+)?)|[0-9.]+)\s*;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[0-9]*[a-z_]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._parameter = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) {this._value();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) return;
        if((m = /^[\s,&()-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:y|n|2f|2o|3f|3o|mussym|octave|dyn|othertext|chord|lyrics|ending|reh|up|down|major|minor|perfect|augmented|diminished|maj|min|per|aug|dim|pedal|8treble|treble8|treble|frenchviolin|soprano|mezzosoprano|alto|tenor|baritone|bass|cut|common|line|alt|pedstar|top|barred|grouped|times|boxed|circled|plain|1n|5n|1drum|5drum|drum|tab|inches|cm|whereused)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^\b[1-9][0-9]*/(1|2|4|8|16|32|64|128)n?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[a-g][#&]?'?([0-9]\b)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[0-7][#&]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^r\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if((m = /^[a-z][a-z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._unset = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:aboveorder|addtranspose|barstyle|beamslope|beamstyle|beloworder|betweenorder|bottommargin|brace|bracket|cancelkey|chorddist|clef|crescdist|defoct|dist|division|dyndist|endingstyle|firstpage|font|fontfamily|gridfret|gridsatend|gridscale|gridswhereused|key|label|label2|leftmargin|lyricsalign|lyricsfont|lyricsfontfamily|lyricssize|measnum|measnumfont|measnumfontfamily|measnumsize|noteheads|numbermrpt|ontheline|packexp|packfact|pad|pageheight|pagewidth|panelsperpage|pedstyle|printmultnum|rehstyle|release|restcombine|restsymmult|rightmargin|scale|scorepad|scoresep|size|stafflines|staffpad|staffs|staffscale|staffsep|stemlen|swingunit|sylposition|tabwhitebox|time|timeunit|topmargin|transpose|units|visible|vscheme|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[\s,]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._printCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\bnl\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\([0-9]+\)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._barline = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b(ending|endending|hidechanges)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\breh(earsal)?\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._barRehearsal();continue;}
        if((m = /^\bmnum\s*=\s*[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\bnum\s*=\s*[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\blet\s*=\s*("[A-Z]{1,2}")?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\bpad\s+[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^=([a-z]|_[a-z][a-z_0-9]*)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._barRehearsal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._printCommand();continue;}
        if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._printCommand();continue;}
        if((m = /^\b(let|mnum|num)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._note = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(\bdashed\s+|\bdotted\s+)?(<(/n|\\n|n/|n\\|[a-g]([+-]*|[0-7]))?>|tie|slur|[~])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^^(/|[a-g]([+-]*|[0-7]))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\bbm\b(\s+with\s+staff\s+(below|above)\b)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\bes?bm\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\balt\s+[1-9]\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\bhs\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._bracket = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return;
        if((m = /^[\s;,]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b(grace|xnote|cue|diam|up|down)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b(slash|len|pad|ho|dist)\s*[0-9.+-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\bwith\s*(?=[A-Z"^>.-])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bracketWith();continue;}
        if((m = /^\bhs\s*(?=[A-Z"])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bracketHs();continue;}
        if((m = /^=([a-z]|_[a-z][a-z_0-9]*)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bc\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._bracketWith = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[>.^-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[\s,]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._bracketHs = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._noteProbably = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-grs]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tuplet = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*(above|below)?\s*[0-9]{1,2}(y|n|num)?(\s*,\s*[0-9]{1,2}\.?([+][0-9]{1,2}\.?)*)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._location = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[+-\s]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\btime\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._locationProbably = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[h-qt-z]|_[a-z][a-z_0-9]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^[\\][][{}%#"nb|^:,\\/ ]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._specialChar();continue;}
        if((m = /^\\f\(/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._fontName();continue;}
        if((m = /^\\s\(/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._fontSize();continue;}
        if((m = /^\\v\(-?[0-9]{1,3}\)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[~<>|^]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[-+]?[0-9]+\|/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._specialChar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        if((m = /^(?:exclamdown|questiondown|sterling|yen|cent|quotedblbase|quotedblleft|``|quotedblright|''|guillemotleft|<<|guillemotright|>>|guildsinglleft|guilsinglright|dagger|daggerdbl|grave|acute|macron|breve|dotaccent|dieresis|ring|cedilla|hungarumlaut|ogonek|caron|emdash|AE|ae|ordfeminine|ordmasculine|Lslash|L\/|lslash|l\/|Oslash|O\/|oslash|o\/|OE|oe|dotlessi|germandbls|ss|Aacute|A'|aacute|a'|Acircumflex|A\^|acircumflex|a\^|Adieresis|A:|adieresis|a:|Agrave|A`|agrave|a`|Aring|Ao|aring|ao|Atilde|A~|atilde|a~|Ccedilla|C,|ccedilla|c,|Eacute|E'|eacute|e'|Ecircumflex|E\^|ecircumflex|e\^|Edieresis|E:|edieresis|e:|Egrave|E`|egrave|e`|Iacute|I'|iacute|i'|Icircumflex|I\^|icircumflex|i\^|Idieresis|i:|idieresis|i:|Igrave|I`|igrave|i`|Ntilde|N~|ntilde|n~|Oacute|O'|oacute|o'|Ocircumflex|O\^|ocircumflex|o\^|Odieresis|O:|odieresis|o:|Ograve|O`|ograve|o`|Otilde|O~|otilde|o~|Scaron|Sv|scaron|sv|Uacute|U'|uacute|u'|Ucircumflex|U\^|ucircumflex|u\^|Udieresis|U:|udieresis|u:|Ugrave|U`|ugrave|u`|Ydieresis|Y:|ydieresis|y:|Zcaron|Zv|zcaron|zv|bullet|space)\b/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^(?:gclef|fclef|cclef|com|cut|flat|dblflat|sharp|dblsharp|nat|4n|2n|1n|dblwhole|xnote|diamond|filldiamond|dwhdiamond|dn2n|dn4n|dn8n|dn16n|dn32n|dn64n|dn128n|dn256n|up2n|up4n|up8n|up16n|up32n|up64n|up128n|up256n|upflag|dnflag|qwhrest|dwhrest|1rest|2rest|4rest|8rest|16rest|32rest|64rest|128rest|256rest|begped|endped|pedal|tr|mor|invmor|turn|invturn|ferm|uferm|acc_gt|acc_hat|acc_uhat|leg|dot|wedge|uwedge|sign|coda|upbow|dnbow|rr|measrpt|copyright|dim|halfdim|triangle|smgclef|smfclef|smcclef|smcom|smcut|smflat|smdblflat|smsharp|smdblsharp|smnat|sm4n|sm2n|sm1n|smdblwhole|smxnote|smdiamond|smfilldiamond|smdwhdiamond|smdn2n|smdn4n|smdn8n|smdn16n|smdn32n|smdn64n|smdn128n|smdn256n|smup2n|smup4n|smup8n|smup16n|smup32n|smup64n|smup128n|smup256n|smupflag|smdnflag|smqwhrest|smdwhrest|sm1rest|sm2rest|sm4rest|sm8rest|sm16rest|sm32rest|sm64rest|sm128rest|sm256rest|smbegped|smendped|smpedal|smtr|smmor|sminvmor|smturn|sminvturn|smferm|smuferm|smacc_gt|smacc_hat|smacc_uhat|smleg|smdot|smwedge|smuwedge|smsign|smcoda|smupbow|smdnbow|smrr|smmeasrpt|smcopyright|smdim|smhalfdim|smtriangle)\b/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[AaEeOo]['`:^~](?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[IiUu]['`:^](?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[Nn]~(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[Yy]:(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[LlOo]/(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[Cc],(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^(>>|<<|``|'')(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[^)"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._fontName = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        if((m = /^[ABCHNPT][RBIX](?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._fontStyle();continue;}
        if((m = /^(PV|previous)(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[^ )"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._fontStyle = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[^ )"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._fontSize = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        if((m = /^[-+]?[0-9]+(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^(PV|previous)(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[^ )"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._macro = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroLocation();continue;}
        if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._macroLocation = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^../.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
