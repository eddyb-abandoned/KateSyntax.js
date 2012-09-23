KateSyntax.langs.spice.syntax = {
    default: 'spice_normal',
    spice_normal: function spice_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\B\.\w+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[$*]/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.spice_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.spice_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.spice_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    spice_commentar1: function spice_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    spice_string: function spice_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
