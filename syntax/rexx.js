KateSyntax.langs.rexx.syntax = {
    default: 'rexx_normal',
    rexx_normal: function rexx_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:arg|drop|else|end|exit|forever|if|interpret|iterate|leave|nop|options|otherwise|pull|push|queue|return|say|select|syntax|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abbrev|abs|address|bitand|bitor|bitxor|b2x|center|charin|charout|chars|c2d|c2x|compare|condition|copies|datatype|date|delstr|delword|digits|d2c|d2x|errortext|form|format|fuzz|insert|lastpos|left|linein|lineout|lines|max|min|overlay|pos|queued|random|reverse|right|sign|sourceline|space|stream|strip|substr|subword|symbol|time|trace|translate|trunc|value|verify|word|wordindex|wordlength|wordpos|words|xrange|x2b|x2c|x2d)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000090')) continue;
            if((m = /^\bsignal([\s]*(on|off)[\s]*(error|failure|halt|notready|novalue|syntax|lostdigits))*/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcall([\s]*(on|off)[\s]*(error|failure|halt|notready))*/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(trace|address)\s*[_\w\d]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bprocedure([\s]*expose)?/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo([\s]*forever)?/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.rexx_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.rexx_commentar1())return this.pop(), m-1;continue;}
            if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(:])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rexx_string: function rexx_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rexx_commentar1: function rexx_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
