KateSyntax.langs.sieve.syntax = {
    default: 'sieve_normal',
    sieve_normal: function sieve_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:require|if|elsif|else|discard|stop|fileinto|keep|reject|redirect)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^\d+[KMG]?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.sieve_string())return this.pop(), m-1;continue;}
            if((m = /^text:(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.sieve_multilineString())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.sieve_comment())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^:\w+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.sieve_member())return this.pop(), m-1;continue;}
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sieve_string: function sieve_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sieve_multilineString: function sieve_multilineString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sieve_member: function sieve_member(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b[_a-zA-Z]\w*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    sieve_comment: function sieve_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
