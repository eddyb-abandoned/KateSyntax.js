KateSyntax.langs.zonnon.syntax = {
    default: 'zonnon_normal',
    zonnon_normal: function zonnon_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:accept|activity|array|as|await|begin|by|case|const|definition|div|do|else|elsif|end|exception|exit|for|if|implementation|implements|import|in|is|loop|mod|module|new|nil|object|of|on|operator|or|procedure|protocol|record|refines|repeat|return|self|termination|then|to|type|until|var|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:boolean|cardinal|char|fixed|integer|real|set|string)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:barrier|immutable|locked|private|protected|public|ref|sealed|shared|value)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:abs|assert|cap|copy|copyvalue|dec|excl|false|halt|inc|len|low|max|min|odd|pred|read|readln|reason|size|succ|true|write|writeln)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;font-style:italic')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zonnon_string1())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zonnon_string2())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.zonnon_comment1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zonnon_string1: function zonnon_string1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    zonnon_string2: function zonnon_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    zonnon_comment1: function zonnon_comment1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
