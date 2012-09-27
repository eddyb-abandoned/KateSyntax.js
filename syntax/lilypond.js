KateSyntax.langs.lilypond.syntax = {
    default: 'lilypond_lilypond',
    lilypond_lilypond: function lilypond_lilypond(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^\b[a-z]+\s*=/i.exec(this.str)) {if(m = this.lilypond_assignment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_music: function lilypond_music(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_default: function lilypond_default(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_basic: function lilypond_basic(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_musiccommand: function lilypond_musiccommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\(&dynamics;)&b;/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) continue;
            if((m = /^\\[<!>]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) continue;
            if((m = /^\\(&scripts;)&b;/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) continue;
            if((m = /^\\[()]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^\\[\][]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword')) continue;
            if((m = /^\\note(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_notemode())return this.pop(), m-1;continue;}
            if((m = /^\\drum(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_drummode())return this.pop(), m-1;continue;}
            if((m = /^\\chord(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_chordmode())return this.pop(), m-1;continue;}
            if((m = /^\\figure(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_figuremode())return this.pop(), m-1;continue;}
            if((m = /^\\(lyric(mode|s)|addlyrics)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) {if(m = this.lilypond_lyricmode())return this.pop(), m-1;continue;}
            if((m = /^\\lyricsto&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) {if(m = this.lilypond_lyricsto())return this.pop(), m-1;continue;}
            if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) {if(m = this.lilypond_markup())return this.pop(), m-1;continue;}
            if((m = /^\\(header|paper|layout|midi|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_section())return this.pop(), m-1;continue;}
            if((m = /^\\(new|context|change)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_context())return this.pop(), m-1;continue;}
            if((m = /^\\(un)?set\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_set())return this.pop(), m-1;continue;}
            if((m = /^\\(override(Property)?|revert)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_override())return this.pop(), m-1;continue;}
            if((m = /^\\skip&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) {if(m = this.lilypond_duration())return this.pop(), m-1;continue;}
            if((m = /^\\tempo&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) {if(m = this.lilypond_tempo())return this.pop(), m-1;continue;}
            if((m = /^\\(&keywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\\(&commands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) continue;
            if((m = /^\\(&toplevelvars;)&b;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(&deprecatedkeywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\\(&deprecatedcommands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\\(translator|newcontext)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_context())return this.pop(), m-1;continue;}
            if((m = /^\\property&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_override())return this.pop(), m-1;continue;}
            if((m = /^\\[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.hl('\\', 'dsError')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_command: function lilypond_command(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword')) continue;
            if((m = /^\\note(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_notemode())return this.pop(), m-1;continue;}
            if((m = /^\\drum(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_drummode())return this.pop(), m-1;continue;}
            if((m = /^\\chord(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_chordmode())return this.pop(), m-1;continue;}
            if((m = /^\\figure(mode|s)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) {if(m = this.lilypond_figuremode())return this.pop(), m-1;continue;}
            if((m = /^\\(lyric(mode|s)|addlyrics)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) {if(m = this.lilypond_lyricmode())return this.pop(), m-1;continue;}
            if((m = /^\\lyricsto&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) {if(m = this.lilypond_lyricsto())return this.pop(), m-1;continue;}
            if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) {if(m = this.lilypond_markup())return this.pop(), m-1;continue;}
            if((m = /^\\(header|paper|layout|midi|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_section())return this.pop(), m-1;continue;}
            if((m = /^\\(new|context|change)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_context())return this.pop(), m-1;continue;}
            if((m = /^\\(un)?set\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_set())return this.pop(), m-1;continue;}
            if((m = /^\\(override(Property)?|revert)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_override())return this.pop(), m-1;continue;}
            if((m = /^\\skip&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) {if(m = this.lilypond_duration())return this.pop(), m-1;continue;}
            if((m = /^\\tempo&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) {if(m = this.lilypond_tempo())return this.pop(), m-1;continue;}
            if((m = /^\\(&keywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\\(&commands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) continue;
            if((m = /^\\(&toplevelvars;)&b;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(&deprecatedkeywords;)&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\\(&deprecatedcommands;)&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\\(translator|newcontext)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_context())return this.pop(), m-1;continue;}
            if((m = /^\\property&b;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.lilypond_override())return this.pop(), m-1;continue;}
            if((m = /^\\[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.hl('\\', 'dsError')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_assignment: function lilypond_assignment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b(&toplevelvars;)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^[a-z]+/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_pitch: function lilypond_pitch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^=\s*('+|,+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[!?]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_duration: function lilypond_duration(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_chord: function lilypond_chord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chordend())return this.pop(), m-1;continue;}
            if((m = /^&pitch;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_chordpitch())return this.pop(), m-1;continue;}
            if((m = /^[<{}srR]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_chordpitch: function lilypond_chordpitch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^=\s*('+|,+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_chordend: function lilypond_chordend(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop(), 1;
            return this.pop(), 1;
        }
        this.pop();
    },
    lilypond_commentline: function lilypond_commentline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lilypond_commentblock: function lilypond_commentblock(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lilypond_string: function lilypond_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    lilypond_connect: function lilypond_connect(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[.\-+|>\^_12345]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_scheme: function lilypond_scheme(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            return this.pop(), m = this.lilypond_scheme2(), m && m-1;
        }
        this.pop();
    },
    lilypond_scheme2: function lilypond_scheme2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsFloat;font-weight:bold')) {if(m = this.lilypond_scheme3())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsFloat')) {if(m = this.lilypond_schemerules())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsFloat')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_schemestring())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this.lilypond_schemecommentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsFloat')) {if(m = this.lilypond_schemequote())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.lilypond_schemecommentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsFloat;font-weight:bold')) {if(m = this.lilypond_schemelily())return this.pop(), m-1;continue;}
            if((m = /^(?:AbsoluteDynamicEvent|AnnotateOutputEvent|ApplyContext|ApplyOutputEvent|ArpeggioEvent|ArticulationEvent|AutoChangeMusic|BarCheck|BassFigureEvent|BeamEvent|BeamForbidEvent|BendAfterEvent|BreathingEvent|ClusterNoteEvent|ContextChange|ContextSpeccedMusic|CrescendoEvent|DecrescendoEvent|Event|EventChord|ExtenderEvent|FingeringEvent|GlissandoEvent|GraceMusic|HarmonicEvent|HyphenEvent|KeyChangeEvent|LabelEvent|LaissezVibrerEvent|LigatureEvent|LineBreakEvent|LyricCombineMusic|LyricEvent|MarkEvent|MultiMeasureRestEvent|MultiMeasureRestMusic|MultiMeasureTextEvent|Music|NoteEvent|NoteGroupingEvent|OverrideProperty|PageBreakEvent|PageTurnEvent|PartCombineMusic|PercentEvent|PercentRepeatedMusic|PesOrFlexaEvent|PhrasingSlurEvent|PropertySet|PropertyUnset|QuoteMusic|RelativeOctaveCheck|RelativeOctaveMusic|RepeatTieEvent|RepeatedMusic|RestEvent|RevertProperty|ScriptEvent|SequentialMusic|SimultaneousMusic|SkipEvent|SkipMusic|SlurEvent|SoloOneEvent|SoloTwoEvent|SostenutoEvent|SpacingSectionEvent|SpanEvent|StaffSpanEvent|StringNumberEvent|StrokeFingerEvent|SustainEvent|TextScriptEvent|TextSpanEvent|TieEvent|TimeScaledMusic|TransposedMusic|TremoloEvent|TremoloRepeatedMusic|TremoloSpanEvent|TrillSpanEvent|TupletSpanEvent|UnaCordaEvent|UnfoldedRepeatedMusic|UnisonoEvent|UnrelativableMusic|VoiceSeparator|VoltaRepeatedMusic)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^[-+]?(\d+(\.\d+)?|\.\d+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^#(t|f|b[-+]?[01.]+|o[-+]?[0-7.]+|d[-+]?[0-9.]+|x[-+]?[0-9a-f.]+)/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[+-](inf|nan)\.0/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(/^[^\S\n]+/.exec(this.str)) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsFloat');
        }
        this.pop();
    },
    lilypond_scheme3: function lilypond_scheme3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsFloat;font-weight:bold')) return this.pop(), 2;
            if(this.str[0] == '(' && this.hl('(', 'dsFloat')) {if(m = this.lilypond_schemerules())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsFloat')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_schemestring())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this.lilypond_schemecommentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsFloat')) {if(m = this.lilypond_schemequote())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.lilypond_schemecommentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsFloat;font-weight:bold')) {if(m = this.lilypond_schemelily())return this.pop(), m-1;continue;}
            if((m = /^(?:AbsoluteDynamicEvent|AnnotateOutputEvent|ApplyContext|ApplyOutputEvent|ArpeggioEvent|ArticulationEvent|AutoChangeMusic|BarCheck|BassFigureEvent|BeamEvent|BeamForbidEvent|BendAfterEvent|BreathingEvent|ClusterNoteEvent|ContextChange|ContextSpeccedMusic|CrescendoEvent|DecrescendoEvent|Event|EventChord|ExtenderEvent|FingeringEvent|GlissandoEvent|GraceMusic|HarmonicEvent|HyphenEvent|KeyChangeEvent|LabelEvent|LaissezVibrerEvent|LigatureEvent|LineBreakEvent|LyricCombineMusic|LyricEvent|MarkEvent|MultiMeasureRestEvent|MultiMeasureRestMusic|MultiMeasureTextEvent|Music|NoteEvent|NoteGroupingEvent|OverrideProperty|PageBreakEvent|PageTurnEvent|PartCombineMusic|PercentEvent|PercentRepeatedMusic|PesOrFlexaEvent|PhrasingSlurEvent|PropertySet|PropertyUnset|QuoteMusic|RelativeOctaveCheck|RelativeOctaveMusic|RepeatTieEvent|RepeatedMusic|RestEvent|RevertProperty|ScriptEvent|SequentialMusic|SimultaneousMusic|SkipEvent|SkipMusic|SlurEvent|SoloOneEvent|SoloTwoEvent|SostenutoEvent|SpacingSectionEvent|SpanEvent|StaffSpanEvent|StringNumberEvent|StrokeFingerEvent|SustainEvent|TextScriptEvent|TextSpanEvent|TieEvent|TimeScaledMusic|TransposedMusic|TremoloEvent|TremoloRepeatedMusic|TremoloSpanEvent|TrillSpanEvent|TupletSpanEvent|UnaCordaEvent|UnfoldedRepeatedMusic|UnisonoEvent|UnrelativableMusic|VoiceSeparator|VoltaRepeatedMusic)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^[-+]?(\d+(\.\d+)?|\.\d+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^#(t|f|b[-+]?[01.]+|o[-+]?[0-7.]+|d[-+]?[0-9.]+|x[-+]?[0-9a-f.]+)/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[+-](inf|nan)\.0/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            this.hl(this.str[0], 'dsFloat');
        }
        this.pop();
    },
    lilypond_schemerules: function lilypond_schemerules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsFloat')) {if(m = this.lilypond_schemerules())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsFloat')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_schemestring())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this.lilypond_schemecommentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsFloat')) {if(m = this.lilypond_schemequote())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.lilypond_schemecommentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsFloat;font-weight:bold')) {if(m = this.lilypond_schemelily())return this.pop(), m-1;continue;}
            if((m = /^(?:AbsoluteDynamicEvent|AnnotateOutputEvent|ApplyContext|ApplyOutputEvent|ArpeggioEvent|ArticulationEvent|AutoChangeMusic|BarCheck|BassFigureEvent|BeamEvent|BeamForbidEvent|BendAfterEvent|BreathingEvent|ClusterNoteEvent|ContextChange|ContextSpeccedMusic|CrescendoEvent|DecrescendoEvent|Event|EventChord|ExtenderEvent|FingeringEvent|GlissandoEvent|GraceMusic|HarmonicEvent|HyphenEvent|KeyChangeEvent|LabelEvent|LaissezVibrerEvent|LigatureEvent|LineBreakEvent|LyricCombineMusic|LyricEvent|MarkEvent|MultiMeasureRestEvent|MultiMeasureRestMusic|MultiMeasureTextEvent|Music|NoteEvent|NoteGroupingEvent|OverrideProperty|PageBreakEvent|PageTurnEvent|PartCombineMusic|PercentEvent|PercentRepeatedMusic|PesOrFlexaEvent|PhrasingSlurEvent|PropertySet|PropertyUnset|QuoteMusic|RelativeOctaveCheck|RelativeOctaveMusic|RepeatTieEvent|RepeatedMusic|RestEvent|RevertProperty|ScriptEvent|SequentialMusic|SimultaneousMusic|SkipEvent|SkipMusic|SlurEvent|SoloOneEvent|SoloTwoEvent|SostenutoEvent|SpacingSectionEvent|SpanEvent|StaffSpanEvent|StringNumberEvent|StrokeFingerEvent|SustainEvent|TextScriptEvent|TextSpanEvent|TieEvent|TimeScaledMusic|TransposedMusic|TremoloEvent|TremoloRepeatedMusic|TremoloSpanEvent|TrillSpanEvent|TupletSpanEvent|UnaCordaEvent|UnfoldedRepeatedMusic|UnisonoEvent|UnrelativableMusic|VoiceSeparator|VoltaRepeatedMusic)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^[-+]?(\d+(\.\d+)?|\.\d+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^#(t|f|b[-+]?[01.]+|o[-+]?[0-7.]+|d[-+]?[0-9.]+|x[-+]?[0-9a-f.]+)/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[+-](inf|nan)\.0/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            this.hl(this.str[0], 'dsFloat');
        }
        this.pop();
    },
    lilypond_schemequote: function lilypond_schemequote(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&schemefunc;/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_schemelily: function lilypond_schemelily(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.str[1] == '}' && this.hl('#}', 'dsFloat;font-weight:bold')) return this.pop();
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^\b[a-z]+\s*=/i.exec(this.str)) {if(m = this.lilypond_assignment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_schemecommentline: function lilypond_schemecommentline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lilypond_schemecommentblock: function lilypond_schemecommentblock(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '!' && this.str[1] == '#' && this.hl('!#', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lilypond_schemesub: function lilypond_schemesub(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&schemename;/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_schemestring: function lilypond_schemestring(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\[0fnrtav\\"]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    lilypond_notemode: function lilypond_notemode(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_notemode2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_notemode2: function lilypond_notemode2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_noterules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_noterules: function lilypond_noterules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_noterules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_drummode: function lilypond_drummode(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_drummode2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_drummode2: function lilypond_drummode2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_drumrules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^<(?!<)/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.lilypond_drumchord())return this.pop(), m-1;continue;}
            if((m = /^(?:acousticbassdrum|acousticsnare|agh|agl|bassdrum|bd|bda|boh|bohm|boho|bol|bolm|bolo|cab|cabasa|cb|cgh|cghm|cgho|cgl|cglm|cglo|chinesecymbal|cl|claves|closedhihat|cowbell|crashcymbal|crashcymbala|crashcymbalb|cuim|cuio|cymc|cymca|cymcb|cymch|cymr|cymra|cymrb|cyms|da|db|dc|dd|de|electricsnare|fivedown|fiveup|fourdown|fourup|gui|guil|guiro|guis|halfopenhihat|handclap|hc|hh|hhc|hhho|hho|hhp|hiagogo|hibongo|hiconga|highfloortom|hightom|hihat|himidtom|hisidestick|hitimbale|hiwoodblock|loagogo|lobongo|loconga|longguiro|longwhistle|losidestick|lotimbale|lowfloortom|lowmidtom|lowoodblock|lowtom|mar|maracas|mutecuica|mutehibongo|mutehiconga|mutelobongo|muteloconga|mutetriangle|onedown|oneup|opencuica|openhibongo|openhiconga|openhihat|openlobongo|openloconga|opentriangle|pedalhihat|rb|ridebell|ridecymbal|ridecymbala|ridecymbalb|shortguiro|shortwhistle|sidestick|sn|sna|snare|sne|splashcymbal|ss|ssh|ssl|tamb|tambourine|tamtam|threedown|threeup|timh|timl|tomfh|tomfl|tomh|toml|tommh|tomml|tri|triangle|trim|trio|tt|twodown|twoup|ua|ub|uc|ud|ue|vibraslap|vibs|wbh|wbl|whl|whs)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0094e4')) {if(m = this.lilypond_duration())return this.pop(), m-1;continue;}
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_drumrules: function lilypond_drumrules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_drumrules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^<(?!<)/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.lilypond_drumchord())return this.pop(), m-1;continue;}
            if((m = /^(?:acousticbassdrum|acousticsnare|agh|agl|bassdrum|bd|bda|boh|bohm|boho|bol|bolm|bolo|cab|cabasa|cb|cgh|cghm|cgho|cgl|cglm|cglo|chinesecymbal|cl|claves|closedhihat|cowbell|crashcymbal|crashcymbala|crashcymbalb|cuim|cuio|cymc|cymca|cymcb|cymch|cymr|cymra|cymrb|cyms|da|db|dc|dd|de|electricsnare|fivedown|fiveup|fourdown|fourup|gui|guil|guiro|guis|halfopenhihat|handclap|hc|hh|hhc|hhho|hho|hhp|hiagogo|hibongo|hiconga|highfloortom|hightom|hihat|himidtom|hisidestick|hitimbale|hiwoodblock|loagogo|lobongo|loconga|longguiro|longwhistle|losidestick|lotimbale|lowfloortom|lowmidtom|lowoodblock|lowtom|mar|maracas|mutecuica|mutehibongo|mutehiconga|mutelobongo|muteloconga|mutetriangle|onedown|oneup|opencuica|openhibongo|openhiconga|openhihat|openlobongo|openloconga|opentriangle|pedalhihat|rb|ridebell|ridecymbal|ridecymbala|ridecymbalb|shortguiro|shortwhistle|sidestick|sn|sna|snare|sne|splashcymbal|ss|ssh|ssl|tamb|tambourine|tamtam|threedown|threeup|timh|timl|tomfh|tomfl|tomh|toml|tommh|tomml|tri|triangle|trim|trio|tt|twodown|twoup|ua|ub|uc|ud|ue|vibraslap|vibs|wbh|wbl|whl|whs)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0094e4')) {if(m = this.lilypond_duration())return this.pop(), m-1;continue;}
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_drumchord: function lilypond_drumchord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:acousticbassdrum|acousticsnare|agh|agl|bassdrum|bd|bda|boh|bohm|boho|bol|bolm|bolo|cab|cabasa|cb|cgh|cghm|cgho|cgl|cglm|cglo|chinesecymbal|cl|claves|closedhihat|cowbell|crashcymbal|crashcymbala|crashcymbalb|cuim|cuio|cymc|cymca|cymcb|cymch|cymr|cymra|cymrb|cyms|da|db|dc|dd|de|electricsnare|fivedown|fiveup|fourdown|fourup|gui|guil|guiro|guis|halfopenhihat|handclap|hc|hh|hhc|hhho|hho|hhp|hiagogo|hibongo|hiconga|highfloortom|hightom|hihat|himidtom|hisidestick|hitimbale|hiwoodblock|loagogo|lobongo|loconga|longguiro|longwhistle|losidestick|lotimbale|lowfloortom|lowmidtom|lowoodblock|lowtom|mar|maracas|mutecuica|mutehibongo|mutehiconga|mutelobongo|muteloconga|mutetriangle|onedown|oneup|opencuica|openhibongo|openhiconga|openhihat|openlobongo|openloconga|opentriangle|pedalhihat|rb|ridebell|ridecymbal|ridecymbala|ridecymbalb|shortguiro|shortwhistle|sidestick|sn|sna|snare|sne|splashcymbal|ss|ssh|ssl|tamb|tambourine|tamtam|threedown|threeup|timh|timl|tomfh|tomfl|tomh|toml|tommh|tomml|tri|triangle|trim|trio|tt|twodown|twoup|ua|ub|uc|ud|ue|vibraslap|vibs|wbh|wbl|whl|whs)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0094e4')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chordend())return this.pop(), m-1;continue;}
            if((m = /^&pitch;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_chordpitch())return this.pop(), m-1;continue;}
            if((m = /^[<{}srR]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_chordmode: function lilypond_chordmode(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_chordmode2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_chordmode2: function lilypond_chordmode2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_chordrules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^:?([\.^]?\d+[-+]?|(m|dim|aug|maj|sus)&b;)*(\/\+?&pitch;)?/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal;color:#0094e4')) continue;
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_chordrules: function lilypond_chordrules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_chordrules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^:?([\.^]?\d+[-+]?|(m|dim|aug|maj|sus)&b;)*(\/\+?&pitch;)?/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal;color:#0094e4')) continue;
            if((m = /^[()~]/.exec(this.str)) && this.hl(m[0], 'dsChar;font-weight:bold')) continue;
            if((m = /^[[\]]/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[\-_\^]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ee5000;font-weight:bold')) {if(m = this.lilypond_connect())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.lilypond_musiccommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chord())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            if((m = /^[a-z]+\d+\.*[,']+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(&rest;|&pitch;)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_pitch())return this.pop(), m-1;continue;}
            if((m = /^:\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_figuremode: function lilypond_figuremode(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_figuremode2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0094e4')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_figuremode2: function lilypond_figuremode2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_figurerules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_figure())return this.pop(), m-1;continue;}
            if((m = /^&rest;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_duration())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_figurerules: function lilypond_figurerules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_figurerules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '<' && this.hl('<', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_figure())return this.pop(), m-1;continue;}
            if((m = /^&rest;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_duration())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_figure: function lilypond_figure(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;font-weight:bold')) {if(m = this.lilypond_chordend())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) {if(m = this.lilypond_markup())return this.pop(), m-1;continue;}
            if((m = /^\\skip&b;/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) {if(m = this.lilypond_duration())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_lyricmode: function lilypond_lyricmode(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_lyricmode2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_lyricmode2: function lilypond_lyricmode2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_lyricrules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^(\w+-{2,}|\w+_{2,}|-{2,}\w+|_{2,}\w+)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(--|__|_)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if((m = /^\S+\}/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#007010');
        }
        this.pop();
    },
    lilypond_lyricsto: function lilypond_lyricsto(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^"(\\["\\]|[^"\\])+"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.lilypond_lyricsto2())return this.pop(), m-1;continue;}
            if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.lilypond_lyricsto2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_lyricsto2: function lilypond_lyricsto2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_lyricsto3())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop(), 1;
        }
        this.pop();
    },
    lilypond_lyricsto3: function lilypond_lyricsto3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 2;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_lyricrules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^(\w+-{2,}|\w+_{2,}|-{2,}\w+|_{2,}\w+)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(--|__|_)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if((m = /^\S+\}/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#007010');
        }
        this.pop();
    },
    lilypond_lyricrules: function lilypond_lyricrules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_lyricrules())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^(\w+-{2,}|\w+_{2,}|-{2,}\w+|_{2,}\w+)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^&duration;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(--|__|_)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#007010')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            if((m = /^\S+\}/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#007010');
        }
        this.pop();
    },
    lilypond_markup: function lilypond_markup(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_markup2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\\score\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) {if(m = this.lilypond_notemode())return this.pop(), m-1;continue;}
            if((m = /^\\(&markupwithtextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) continue;
            if((m = /^\\(&markupnotextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if((m = /^[^"\s\\#%{}$]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_markup2: function lilypond_markup2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_markuprules())return this.pop(), m-1;continue;}
            if((m = /^\\score\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) {if(m = this.lilypond_notemode())return this.pop(), m-1;continue;}
            if((m = /^\\(&markupnotextargs;|&markupwithtextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) continue;
            if((m = /^\\(&deprecatedmarkup;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) continue;
            if((m = /^\\[A-Za-z]+(-[A-Za-z]+)*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_markuprules: function lilypond_markuprules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_markuprules())return this.pop(), m-1;continue;}
            if((m = /^\\score\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) {if(m = this.lilypond_notemode())return this.pop(), m-1;continue;}
            if((m = /^\\(&markupnotextargs;|&markupwithtextargs;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) continue;
            if((m = /^\\(&deprecatedmarkup;)&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) continue;
            if((m = /^\\[A-Za-z]+(-[A-Za-z]+)*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_section: function lilypond_section(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_section2())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            return this.pop();
        }
        this.pop();
    },
    lilypond_section2: function lilypond_section2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_sectionrules())return this.pop(), m-1;continue;}
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
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
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_sectionrules: function lilypond_sectionrules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_sectionrules())return this.pop(), m-1;continue;}
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
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
            if(this.str[0] == '\\') {if(m = this.lilypond_command())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lilypond_context: function lilypond_context(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.lilypond_context2())return this.pop(), m-1;continue;}
            if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.lilypond_context2())return this.pop(), m-1;continue;}
            if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.lilypond_context2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.lilypond_section2())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    lilypond_context2: function lilypond_context2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^=(\s*[A-Za-z]+)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 1;
            return this.pop(), 1;
        }
        this.pop();
    },
    lilypond_set: function lilypond_set(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
            if((m = /^(?:aDueText|alignAboveContext|alignBassFigureAccidentals|alignBelowContext|allowBeamBreak|associatedVoice|autoAccidentals|autoBeamCheck|autoBeamSettings|autoBeaming|autoCautionaries|automaticBars|barAlways|barCheckSynchronize|barNumberVisibility|baseMoment|bassFigureFormatFunction|bassStaffProperties|beamExceptions|beatGrouping|beatLength|beatStructure|chordChanges|chordNameExceptions|chordNameExceptionsFull|chordNameExceptionsPartial|chordNameFunction|chordNameSeparator|chordNoteNamer|chordPrefixSpacer|chordRootNamer|clefGlyph|clefOctavation|clefPosition|connectArpeggios|countPercentRepeats|createKeyOnClefChange|createSpacing|crescendoSpanner|crescendoText|currentBarNumber|decrescendoSpanner|decrescendoText|defaultBarType|doubleSlurs|doubleRepeatType|drumPitchTable|drumStyleTable|dynamicAbsoluteVolumeFunction|explicitClefVisibility|explicitKeySignatureVisibility|extendersOverRests|extraNatural|figuredBassAlterationDirection|figuredBassCenterContinuations|figuredBassFormatter|figuredBassPlusDirection|fingeringOrientations|firstClef|followVoice|fontSize|forbidBreak|forceClef|gridInterval|hairpinToBarline|harmonicAccidentals|highStringOne|ignoreBarChecks|ignoreFiguredBassRest|ignoreMelismata|implicitBassFigures|implicitTimeSignatureVisibility|instrumentCueName|instrumentEqualizer|instrumentName|instrumentTransposition|internalBarNumber|keepAliveInterfaces|keyAlterationOrder|keySignature|lyricMelismaAlignment|majorSevenSymbol|markFormatter|maximumFretStretch|measureLength|measurePosition|melismaBusyProperties|metronomeMarkFormatter|middleCClefPosition|middleCOffset|middleCPosition|midiInstrument|midiMaximumVolume|midiMinimumVolume|minimumFret|minimumPageTurnLength|minimumRepeatLengthForPageTurn|noteToFretFunction|ottavation|output|pedalSostenutoStrings|pedalSostenutoStyle|pedalSustainStrings|pedalSustainStyle|pedalUnaCordaStrings|pedalUnaCordaStyle|printKeyCancellation|printOctaveNames|printPartCombineTexts|proportionalNotationDuration|recordEventSequence|rehearsalMark|repeatCommands|restNumberThreshold|scriptDefinitions|shapeNoteStyles|shortInstrumentName|shortVocalName|skipBars|skipTypesetting|soloIIText|soloText|squashedPosition|staffLineLayoutFunction|stanza|stemLeftBeamCount|stemRightBeamCount|stringNumberOrientations|stringOneTopmost|stringTunings|strokeFingerOrientations|subdivideBeams|suggestAccidentals|systemStartDelimiter|systemStartDelimiterHierarchy|tablatureFormat|tempoUnitCount|tempoUnitDuration|tempoWholesPerMinute|tieWaitForNote|timeSignatureFraction|timing|tonic|topLevelAlignment|trebleStaffProperties|tremoloFlags|tupletFullLength|tupletFullLengthNote|tupletSpannerDuration|useBassFigureExtenders|verticallySpacedContexts|vocalName|voltaOnThisStaff|voltaSpannerDuration|whichBar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:barNumberAlignSymbol|centralCPosition|extraVerticalExtent|fingerHorizontalDirection|instr|instrument|keyAccidentalOrder|minimumVerticalExtent|rehearsalMarkAlignSymbol|soloADue|tupletNumberFormatFunction|vocNam)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_override: function lilypond_override(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:ChoirStaff|ChordNames|CueVoice|Devnull|DrumStaff|DrumVoice|Dynamics|FiguredBass|FretBoards|Global|GrandStaff|GregorianTranscriptionStaff|GregorianTranscriptionVoice|Lyrics|MensuralStaff|MensuralVoice|NoteNames|PianoStaff|RhythmicStaff|Score|Staff|StaffGroup|TabStaff|TabVoice|Timing|VaticanaStaff|VaticanaVoice|Voice)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^(?:InnerChoirStaff|InnerStaffGroup)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
            if((m = /^(?:Accidental|AccidentalCautionary|AccidentalPlacement|AccidentalSuggestion|Ambitus|AmbitusAccidental|AmbitusLine|AmbitusNoteHead|Arpeggio|BalloonTextItem|BarLine|BarNumber|BassFigure|BassFigureAlignment|BassFigureAlignmentPositioning|BassFigureBracket|BassFigureContinuation|BassFigureLine|Beam|BendAfter|BreakAlignGroup|BreakAlignment|BreathingSign|ChordName|Clef|ClusterSpanner|ClusterSpannerBeacon|CombineTextScript|Custos|DotColumn|Dots|DoublePercentRepeat|DoublePercentRepeatCounter|DynamicLineSpanner|DynamicText|DynamicTextSpanner|Episema|Fingering|FretBoard|Glissando|GraceSpacing|GridLine|GridPoint|Hairpin|HarmonicParenthesesItem|HorizontalBracket|InstrumentName|InstrumentSwitch|KeyCancellation|KeySignature|LaissezVibrerTie|LaissezVibrerTieColumn|LedgerLineSpanner|LeftEdge|LigatureBracket|LyricExtender|LyricHyphen|LyricSpace|LyricText|MeasureGrouping|MelodyItem|MensuralLigature|MetronomeMark|MultiMeasureRest|MultiMeasureRestNumber|MultiMeasureRestText|NonMusicalPaperColumn|NoteCollision|NoteColumn|NoteHead|NoteName|NoteSpacing|OctavateEight|OttavaBracket|PaperColumn|ParenthesesItem|PercentRepeat|PercentRepeatCounter|PhrasingSlur|PianoPedalBracket|RehearsalMark|RepeatSlash|RepeatTie|RepeatTieColumn|Rest|RestCollision|Script|ScriptColumn|ScriptRow|SeparationItem|Slur|SostenutoPedal|SostenutoPedalLineSpanner|SpacingSpanner|SpanBar|StaffGrouper|StaffSpacing|StaffSymbol|StanzaNumber|Stem|StemTremolo|StringNumber|StrokeFinger|SustainPedal|SustainPedalLineSpanner|System|SystemStartBar|SystemStartBrace|SystemStartBracket|SystemStartSquare|TabNoteHead|TextScript|TextSpanner|Tie|TieColumn|TimeSignature|TrillPitchAccidental|TrillPitchGroup|TrillPitchHead|TrillSpanner|TupletBracket|TupletNumber|UnaCordaPedal|UnaCordaPedalLineSpanner|VaticanaLigature|VerticalAlignment|VerticalAxisGroup|VoiceFollower|VoltaBracket|VoltaBracketSpanner)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^[A-Za-z]+(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^[A-Za-z]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    lilypond_tempo: function lilypond_tempo(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\markup(lines)?&b;/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#009817')) {if(m = this.lilypond_markup())return this.pop(), m-1;continue;}
            if((m = /^\d+\.*\s*=\s*\d+/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsComment')) {if(m = this.lilypond_commentblock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.lilypond_commentline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lilypond_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsFloat')) {if(m = this.lilypond_scheme())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal;font-weight:bold')) {if(m = this.lilypond_schemesub())return this.pop(), m-1;continue;}
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
