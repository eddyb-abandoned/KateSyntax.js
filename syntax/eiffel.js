KateSyntax.langs.eiffel.syntax = {
    default: 'eiffel_normal',
    eiffel_normal: function eiffel_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:agent|alias|all|and|as|assign|class|convert|create|creation|debug|deferred|do|else|elseif|end|expanded|export|external|feature|from|frozen|if|implies|indexing|infix|inherit|inspect|is|like|local|loop|not|obsolete|old|once|or|prefix|pure|redefine|reference|rename|rescue|retry|separate|then|undefine)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Current|False|Precursor|Result|True|TUPLE)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:check|ensure|require|variant|invariant)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.eiffel_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.eiffel_documentation())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    eiffel_quotedString: function eiffel_quotedString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    eiffel_documentation: function eiffel_documentation(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
