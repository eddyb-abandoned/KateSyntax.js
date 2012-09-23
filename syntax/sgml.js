KateSyntax.langs.sgml.syntax = {
    default: 'sgml_normalText',
    sgml_normalText: function sgml_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.sgml_comment())return this.pop(), m-1;continue;}
            if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sgml_attribute())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sgml_attribute: function sgml_attribute(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.sgml_value())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    sgml_value: function sgml_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.sgml_value2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    sgml_value2: function sgml_value2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    sgml_comment: function sgml_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
