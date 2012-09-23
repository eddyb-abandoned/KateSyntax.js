KateSyntax.langs.cue.syntax = {
    default: 'cue_normal',
    cue_normal: function cue_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:CATALOG|CDTEXTFILE|FILE|FLAGS|INDEX|ISRC|PERFORMER|PREGAP|POSTGAP|REM|SONGWRITER|TITLE|TRACK)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:AIFF|WAVE|MP3|BINARY|MOTOTOLA)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000')) continue;
            if((m = /^(?:AUDIO|CDG|CDI|MODE1|MODE2|RAW)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) continue;
            if((m = /^(?:4CH|DCP|PRE|SCMS)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008000')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.cue_string())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this.cue_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cue_string: function cue_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    cue_comment: function cue_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
