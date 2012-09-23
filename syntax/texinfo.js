KateSyntax.langs.texinfo.syntax = {
    default: 'texinfo_normalText',
    texinfo_normalText: function texinfo_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^@c(omment)?\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.texinfo_singleLineComment())return this.pop(), m-1;continue;}
            if((m = /^@ignore\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.texinfo_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^@node\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.texinfo_nodeFolding())return this.pop(), m-1;continue;}
            if((m = /^@(menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.texinfo_folding())return this.pop(), m-1;continue;}
            if((m = /^@[\w]+(\{([\w]+[\s]*)+\})?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    texinfo_singleLineComment: function texinfo_singleLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    texinfo_multiLineComment: function texinfo_multiLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^@end ignore/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    texinfo_nodeFolding: function texinfo_nodeFolding(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^@node\b/.exec(this.str)) return this.pop();
            if((m = /^@c(omment)?\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.texinfo_singleLineComment())return this.pop(), m-1;continue;}
            if((m = /^@ignore\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.texinfo_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^@node\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.texinfo_nodeFolding())return this.pop(), m-1;continue;}
            if((m = /^@(menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.texinfo_folding())return this.pop(), m-1;continue;}
            if((m = /^@[\w]+(\{([\w]+[\s]*)+\})?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    texinfo_folding: function texinfo_folding(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^@end (menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if((m = /^@c(omment)?\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.texinfo_singleLineComment())return this.pop(), m-1;continue;}
            if((m = /^@ignore\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.texinfo_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^@node\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.texinfo_nodeFolding())return this.pop(), m-1;continue;}
            if((m = /^@(menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.texinfo_folding())return this.pop(), m-1;continue;}
            if((m = /^@[\w]+(\{([\w]+[\s]*)+\})?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
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
