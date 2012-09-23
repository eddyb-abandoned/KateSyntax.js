KateSyntax.langs.relaxng.syntax = {
    default: 'relaxng_normalText',
    relaxng_normalText: function relaxng_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.relaxng_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {if(m = this.relaxng_tagname())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    relaxng_detectEntRef: function relaxng_detectEntRef(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    relaxng_tagname: function relaxng_tagname(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:anyName|attribute|choice|data|define|div|element|empty|except|externalRef|grammar|group|include|interleave|list|mixed|name|notAllowed|nsName|oneOrMore|optional|param|parentRef|ref|start|text|value|zeroOrMore)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.relaxng_attributes())return this.pop(), m-1;continue;}
            if((m = /^\s*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) {if(m = this.relaxng_attributes())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    relaxng_attributes: function relaxng_attributes(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 1;
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.relaxng_attrValue())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    relaxng_attrValue: function relaxng_attrValue(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsError')) return this.pop(), 2;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) return this.pop(), 2;
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.relaxng_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    relaxng_string: function relaxng_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) return this.pop(), 1;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsString;color:#800000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    relaxng_comment: function relaxng_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
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
