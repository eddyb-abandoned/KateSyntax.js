KateSyntax.langs.kbasic.syntax = {
    default: 'kbasic_normal',
    kbasic_normal: function kbasic_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:For|Next|Do|Loop|While|Wend|Until|If|Else|End|Function|Goto|Sub|Implements|In|Sub|Private|Public|Global|As|Dim|Set|Let|Get|To|Property|True|False|Or|Not|Xor|And|Then|Exit|Put|Open|Close|Seek|Print|Input|Output|Repeat|Load|Unload|Declare|Option|Explicit)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Integer|Long|Byte|Boolean|Variant|Single|Double|Currency|String|Object|Control)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == 'quot;' && this.hl('quot;', 'dsString')) {if(m = this.kbasic_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) {if(m = this.kbasic_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    kbasic_comment: function kbasic_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    kbasic_string: function kbasic_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
