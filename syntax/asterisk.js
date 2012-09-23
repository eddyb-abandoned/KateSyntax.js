KateSyntax.langs.asterisk.syntax = {
    default: 'asterisk_normal',
    asterisk_normal: function asterisk_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\[[A-Za-z0-9_]+\](?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^TIMEOUT\(absolute\)=[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[A-Za-z0-9_]+=\$\{CUT\(params,-,([1-9]|[1-9][0-9]+)\)\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:AGI|Answer|Dial|Hangup|GoTo|GoToIf|GoToIfTime|NoOp|PlayBack|Read|SayDigits|SayNumber|Set|SetCallerPres|System|Wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[A-Za-z_.$][A-Za-z0-9_.$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.asterisk_string())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this.asterisk_commentar2())return this.pop(), m-1;continue;}
            if((m = /^[!#%&*()+,\-<=>?/:[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    asterisk_commentar1: function asterisk_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    asterisk_commentar2: function asterisk_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    asterisk_preprocessor: function asterisk_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    asterisk_string: function asterisk_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.asterisk_someContext())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    asterisk_someContext: function asterisk_someContext(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
