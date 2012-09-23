KateSyntax.langs.tibasic.syntax = {
    default: 'tibasic_normal',
    tibasic_normal: function tibasic_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:If|Then|Else|For|While|Repeat|End|Pause|Lbl|Goto|IS>|DS<|Menu|prgm|Return|DelVar|GraphStyle|Input|Prompt|Disp|DispGraph|DispTable|Output|getKey|ClrHome|ClrTable|GetCalc|Get|Send|prgm)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:net|eogt|eolt|sqrt|%THETA)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
            if(this.str[0] == 's' && this.str[1] == 't' && this.hl('st', 'dsOthers')) continue;
            if((m = /^\[\w\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tibasic_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tibasic_string: function tibasic_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
