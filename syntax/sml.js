KateSyntax.langs.sml.syntax = {
    default: 'sml_normal',
    sml_normal: function sml_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.sml_multilineInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.sml_string())return this.pop(), m-1;continue;}
            if((m = /^(?:abstype|and|andalso|as|case|do|datatype|else|end|eqtype|exception|false|fn|fun|functor|handle|if|in|include|infix|infixr|let|local|nonfix|of|op|open|orelse|raise|rec|sharing|sig|signature|struct|structure|then|true|type|val|where|with|withtype|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unit|int|real|char|string|substring|word|ref|array|vector|bool|list|option|order)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sml_multilineInlineComment: function sml_multilineInlineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    sml_string: function sml_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
