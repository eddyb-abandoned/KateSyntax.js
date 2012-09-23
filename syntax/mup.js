KateSyntax.langs.mup.syntax = {
    default: 'mup_normal',
    mup_normal: function mup_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:score|music|header|header2|footer|footer2|top|top2|bottom|bottom2|staff|voice|grids|music|headshapes|block)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\blyrics\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) continue;
            if((m = /^\b((dashed|dotted)\s+)?(bar|endbar|dblbar|invisbar|repeatstart|repeatboth|repeatend|restart)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) {if(m = this.mup_barline())return this.pop(), m-1;continue;}
            if((m = /^\bnew(score|page)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62;fontWeight:bold')) continue;
            if((m = /^\bmultirest\s+[0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62;fontWeight:bold')) continue;
            if((m = /^\bunset\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;fontWeight:bold')) {if(m = this.mup_unset())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.mup_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mup_string())return this.pop(), m-1;continue;}
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:print|left|right|center|title|paragraph|postscript)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.mup_printCommand())return this.pop(), m-1;continue;}
            if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.mup_printCommand())return this.pop(), m-1;continue;}
            if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.mup_printCommand())return this.pop(), m-1;continue;}
            if((m = /^\b((ragged|justified)\s+)?paragraph\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.mup_printCommand())return this.pop(), m-1;continue;}
            if((m = /^(?:chord|analysis|figbass|dyn)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(?:dotted|dashed|wavy|wide|medium|line|curve|to|bulge|octave|mussym|phrase|pedal|roll|to|down|up|with|midi)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(?:above|below|between|all)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\bdist(?=\s+[^=])/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(?:aboveorder|addtranspose|barstyle|beamslope|beamstyle|beloworder|betweenorder|bottommargin|brace|bracket|cancelkey|chorddist|clef|crescdist|defoct|dist|division|dyndist|endingstyle|firstpage|font|fontfamily|gridfret|gridsatend|gridscale|gridswhereused|key|label|label2|leftmargin|lyricsalign|lyricsfont|lyricsfontfamily|lyricssize|measnum|measnumfont|measnumfontfamily|measnumsize|noteheads|numbermrpt|ontheline|packexp|packfact|pad|pageheight|pagewidth|panelsperpage|pedstyle|printmultnum|rehstyle|release|restcombine|restsymmult|rightmargin|scale|scorepad|scoresep|size|stafflines|staffpad|staffs|staffscale|staffsep|stemlen|swingunit|sylposition|tabwhitebox|time|timeunit|topmargin|transpose|units|visible|vscheme|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.mup_parameter())return this.pop(), m-1;continue;}
            if((m = /^\[(?=(grace|xnote|cue|diam|with|slash|up|down|len|pad|ho|dist|hs|c\b|=))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mup_bracket())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {if(m = this.mup_tuplet())return this.pop(), m-1;continue;}
            if((m = /^[[\]{]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(<<|>>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\(\s*)?((1\/4|1\/2|1|2|4|8|16|32|64|128|256)\.*\s*)?((\(\s*)?([a-grs]|us)(?!bm)([0-9'?\sxn]|[+-]+|[&#]{1,2}|\(\s*[&#]{1,2}\s*\)|\(\s*[xn]\s*\)|\(\s*[0-9]\s*\))*\)?\s*)*\s*(?=[;~="<A-Z@^]|\b(bm|es?bm|dashed|dotted|tie|slur|alt|hs|ifn?def|else|elseif|endif|with|above)\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.mup_note())return this.pop(), m-1;continue;}
            if((m = /^;\s*(?=[~=<]|\b(bm|es?bm|dashed|dotted|tie|slur|alt|hs|ifn?def|else|elseif|endif)\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.mup_note())return this.pop(), m-1;continue;}
            if((m = /^(1\/4|1\/2|1|2|4|8|16|32|64|128|256)?mu?[rs]+\s*(?=;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^m\s*rpt\s*(?=;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^=([a-z]|_[a-z][a-z_0-9]*)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:bold')) continue;
            if((m = /^([a-z]|_[a-z][a-z_0-9]*)\.[xynews]\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:bold')) {if(m = this.mup_location())return this.pop(), m-1;continue;}
            if((m = /^([a-z]|_[a-z][a-z_0-9]*)\.(?=[A-Z])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:normal')) continue;
            if((m = /^[(,]\s*(?=([h-qt-z]|_[a-z][a-z_0-9]*)\s*[,)])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.mup_locationProbably())return this.pop(), m-1;continue;}
            if((m = /^[(,]\s*(?=[a-grs]\s*[,)])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.mup_noteProbably())return this.pop(), m-1;continue;}
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            if((m = /^[0-9.]*\s*til\s*(([0-9]+m(\s*\+\s*[0-9.]+)?)|[0-9.]+)\s*;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[0-9]*[a-z_]+/.exec(this.str)) && this.hl(m[0], 'dsError;color:black')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mup_parameter: function mup_parameter(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '=' && this.hl('=', 'dsNormal')) {if(m = this.mup_value())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_value: function mup_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.hl(';', 'dsNormal')) return this.pop();
            if((m = /^[\s,&()-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:y|n|2f|2o|3f|3o|mussym|octave|dyn|othertext|chord|lyrics|ending|reh|up|down|major|minor|perfect|augmented|diminished|maj|min|per|aug|dim|pedal|8treble|treble8|treble|frenchviolin|soprano|mezzosoprano|alto|tenor|baritone|bass|cut|common|line|alt|pedstar|top|barred|grouped|times|boxed|circled|plain|1n|5n|1drum|5drum|drum|tab|inches|cm|whereused)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^\b[1-9][0-9]*\/(1|2|4|8|16|32|64|128)n?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[a-g][#&]?'?([0-9]\b)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[0-7][#&]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^r\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mup_string())return this.pop(), m-1;continue;}
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            if((m = /^[a-z][a-z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsError;color:black')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_unset: function mup_unset(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:aboveorder|addtranspose|barstyle|beamslope|beamstyle|beloworder|betweenorder|bottommargin|brace|bracket|cancelkey|chorddist|clef|crescdist|defoct|dist|division|dyndist|endingstyle|firstpage|font|fontfamily|gridfret|gridsatend|gridscale|gridswhereused|key|label|label2|leftmargin|lyricsalign|lyricsfont|lyricsfontfamily|lyricssize|measnum|measnumfont|measnumfontfamily|measnumsize|noteheads|numbermrpt|ontheline|packexp|packfact|pad|pageheight|pagewidth|panelsperpage|pedstyle|printmultnum|rehstyle|release|restcombine|restsymmult|rightmargin|scale|scorepad|scoresep|size|stafflines|staffpad|staffs|staffscale|staffsep|stemlen|swingunit|sylposition|tabwhitebox|time|timeunit|topmargin|transpose|units|visible|vscheme|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[\s,]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsError;color:black')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    mup_printCommand: function mup_printCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\bnl\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\([0-9]+\)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    mup_barline: function mup_barline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) continue;
            if((m = /^\b(ending|endending|hidechanges)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) continue;
            if((m = /^\breh(earsal)?\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) {if(m = this.mup_barRehearsal())return this.pop(), m-1;continue;}
            if((m = /^\bmnum\s*=\s*[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) continue;
            if((m = /^\bnum\s*=\s*[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) continue;
            if((m = /^\blet\s*=\s*("[A-Z]{1,2}")?/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) continue;
            if((m = /^\bpad\s+[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) continue;
            if((m = /^=([a-z]|_[a-z][a-z_0-9]*)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:bold')) continue;
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_barRehearsal: function mup_barRehearsal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.mup_printCommand())return this.pop(), m-1;continue;}
            if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.mup_printCommand())return this.pop(), m-1;continue;}
            if((m = /^\b(let|mnum|num)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#c62')) return this.pop();
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_note: function mup_note(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(\bdashed\s+|\bdotted\s+)?(<(\/n|\\n|n\/|n\\|[a-g]([+-]*|[0-7]))?>|tie|slur|[~])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^(\/|[a-g]([+-]*|[0-7]))/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^\bbm\b(\s+with\s+staff\s+(below|above)\b)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^\bes?bm\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^\balt\s+[1-9]\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^\bhs\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mup_string())return this.pop(), m-1;continue;}
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_bracket: function mup_bracket(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return this.pop();
            if((m = /^[\s;,]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b(grace|xnote|cue|diam|up|down)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^\b(slash|len|pad|ho|dist)\s*[0-9.+-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^\bwith\s*(?=[A-Z"^>.-])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) {if(m = this.mup_bracketWith())return this.pop(), m-1;continue;}
            if((m = /^\bhs\s*(?=[A-Z"])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) {if(m = this.mup_bracketHs())return this.pop(), m-1;continue;}
            if((m = /^=([a-z]|_[a-z][a-z_0-9]*)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:bold')) continue;
            if((m = /^\bc\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_bracketWith: function mup_bracketWith(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mup_string())return this.pop(), m-1;continue;}
            if((m = /^[>.^-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#07b;fontStyle:italic')) continue;
            if((m = /^[\s,]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_bracketHs: function mup_bracketHs(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mup_string())return this.pop(), m-1;continue;}
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_noteProbably: function mup_noteProbably(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-grs]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    mup_tuplet: function mup_tuplet(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*(above|below)?\s*[0-9]{1,2}(y|n|num)?(\s*,\s*[0-9]{1,2}\.?([+][0-9]{1,2}\.?)*)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#035')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    mup_location: function mup_location(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[+-\s]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\btime\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:bold')) continue;
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_locationProbably: function mup_locationProbably(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[h-qt-z]|_[a-z][a-z_0-9]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:normal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    mup_comment: function mup_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mup_string: function mup_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^[\\][\][{}%#"nb|^:,\\/ ]/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) {if(m = this.mup_specialChar())return this.pop(), m-1;continue;}
            if((m = /^\\f\(/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) {if(m = this.mup_fontName())return this.pop(), m-1;continue;}
            if((m = /^\\s\(/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) {if(m = this.mup_fontSize())return this.pop(), m-1;continue;}
            if((m = /^\\v\(-?[0-9]{1,3}\)/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[~<>|^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#800')) continue;
            if((m = /^[-+]?[0-9]+\|/.exec(this.str)) && this.hl(m[0], 'dsString;color:#800')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    mup_specialChar: function mup_specialChar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsString;fontWeight:bold')) return this.pop();
            if((m = /^(?:exclamdown|questiondown|sterling|yen|cent|quotedblbase|quotedblleft|``|quotedblright|''|guillemotleft|<<|guillemotright|>>|guildsinglleft|guilsinglright|dagger|daggerdbl|grave|acute|macron|breve|dotaccent|dieresis|ring|cedilla|hungarumlaut|ogonek|caron|emdash|AE|ae|ordfeminine|ordmasculine|Lslash|L\/|lslash|l\/|Oslash|O\/|oslash|o\/|OE|oe|dotlessi|germandbls|ss|Aacute|A'|aacute|a'|Acircumflex|A\^|acircumflex|a\^|Adieresis|A:|adieresis|a:|Agrave|A`|agrave|a`|Aring|Ao|aring|ao|Atilde|A~|atilde|a~|Ccedilla|C,|ccedilla|c,|Eacute|E'|eacute|e'|Ecircumflex|E\^|ecircumflex|e\^|Edieresis|E:|edieresis|e:|Egrave|E`|egrave|e`|Iacute|I'|iacute|i'|Icircumflex|I\^|icircumflex|i\^|Idieresis|i:|idieresis|i:|Igrave|I`|igrave|i`|Ntilde|N~|ntilde|n~|Oacute|O'|oacute|o'|Ocircumflex|O\^|ocircumflex|o\^|Odieresis|O:|odieresis|o:|Ograve|O`|ograve|o`|Otilde|O~|otilde|o~|Scaron|Sv|scaron|sv|Uacute|U'|uacute|u'|Ucircumflex|U\^|ucircumflex|u\^|Udieresis|U:|udieresis|u:|Ugrave|U`|ugrave|u`|Ydieresis|Y:|ydieresis|y:|Zcaron|Zv|zcaron|zv|bullet|space)\b/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^(?:gclef|fclef|cclef|com|cut|flat|dblflat|sharp|dblsharp|nat|4n|2n|1n|dblwhole|xnote|diamond|filldiamond|dwhdiamond|dn2n|dn4n|dn8n|dn16n|dn32n|dn64n|dn128n|dn256n|up2n|up4n|up8n|up16n|up32n|up64n|up128n|up256n|upflag|dnflag|qwhrest|dwhrest|1rest|2rest|4rest|8rest|16rest|32rest|64rest|128rest|256rest|begped|endped|pedal|tr|mor|invmor|turn|invturn|ferm|uferm|acc_gt|acc_hat|acc_uhat|leg|dot|wedge|uwedge|sign|coda|upbow|dnbow|rr|measrpt|copyright|dim|halfdim|triangle|smgclef|smfclef|smcclef|smcom|smcut|smflat|smdblflat|smsharp|smdblsharp|smnat|sm4n|sm2n|sm1n|smdblwhole|smxnote|smdiamond|smfilldiamond|smdwhdiamond|smdn2n|smdn4n|smdn8n|smdn16n|smdn32n|smdn64n|smdn128n|smdn256n|smup2n|smup4n|smup8n|smup16n|smup32n|smup64n|smup128n|smup256n|smupflag|smdnflag|smqwhrest|smdwhrest|sm1rest|sm2rest|sm4rest|sm8rest|sm16rest|sm32rest|sm64rest|sm128rest|sm256rest|smbegped|smendped|smpedal|smtr|smmor|sminvmor|smturn|sminvturn|smferm|smuferm|smacc_gt|smacc_hat|smacc_uhat|smleg|smdot|smwedge|smuwedge|smsign|smcoda|smupbow|smdnbow|smrr|smmeasrpt|smcopyright|smdim|smhalfdim|smtriangle)\b/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[AaEeOo]['`:^~](?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[IiUu]['`:^](?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[Nn]~(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[Yy]:(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[LlOo]\/(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[Cc],(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^(>>|<<|``|'')(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[^)"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_fontName: function mup_fontName(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsString;fontWeight:bold')) return this.pop();
            if((m = /^[ABCHNPT][RBIX](?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^(?:avantgarde|bookman|courier|helvetica|newcentury|palatino|times)\b/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) {if(m = this.mup_fontStyle())return this.pop(), m-1;continue;}
            if((m = /^(PV|previous)(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[^ )"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_fontStyle: function mup_fontStyle(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^(?:rom|bold|ital|boldital)\b/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[^ )"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_fontSize: function mup_fontSize(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsString;fontWeight:bold')) return this.pop();
            if((m = /^[-+]?[0-9]+(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^(PV|previous)(?=\))/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^[^ )"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            return this.pop();
        }
        this.pop();
    },
    mup_macro: function mup_macro(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:define|ifdef|ifndef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:@|endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^(?:else|include|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if((m = /^[A-Z][A-Z0-9_]*(?=\.[xynews]\b)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) {if(m = this.mup_macroLocation())return this.pop(), m-1;continue;}
            if((m = /^[A-Z][A-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsOthers;color:#11F')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#11F');
        }
        this.pop();
    },
    mup_macroLocation: function mup_macroLocation(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^../.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0C4;fontWeight:normal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    alert_normalText: function alert_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
