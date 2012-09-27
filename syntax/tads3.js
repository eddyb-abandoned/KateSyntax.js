KateSyntax.langs.tads3.syntax = {
    default: 'tads3_normal',
    tads3_normal: function tads3_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:abort|and|argcount|break|case|catch|class|construct|continue|default|definingobj|delegated|dictionary|do|else|enum|exit|export|extern|finalize|finally|for|foreach|function|goto|grammar|if|in|inherited|intrinsic|is|local|modify|new|nil|not|object|or|property|propertyset|replace|replaced|return|self|static|switch|targetobj|targetprop|template|throw|token|transient|true|try|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tads3_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tads3_valString())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.tads3_shortComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.tads3_longComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tads3_preprocessor())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tads3_string: function tads3_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'r' && this.hl('\\r', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'b' && this.hl('\\b', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'v' && this.hl('\\v', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == ' ' && this.hl('\\ ', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsNormal;color:#000000;font-style:italic;font-weight:normal')) {if(m = this.tads3_embedded())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword;color:#0F0F8F;font-style:italic;font-weight:normal')) {if(m = this.tads3_htmltag())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    tads3_valString: function tads3_valString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'r' && this.hl('\\r', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'b' && this.hl('\\b', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'v' && this.hl('\\v', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == ' ' && this.hl('\\ ', 'dsKeyword;color:#0F0F8F;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword;color:#0F0F8F;font-style:italic;font-weight:normal')) {if(m = this.tads3_htmltag())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    tads3_shortComment: function tads3_shortComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    tads3_longComment: function tads3_longComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    tads3_preprocessor: function tads3_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.tads3_shortComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.tads3_longCommentPreprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    tads3_longCommentPreprocessor: function tads3_longCommentPreprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    tads3_embedded: function tads3_embedded(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsNormal;color:#000000;font-style:italic;font-weight:normal')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#000000;font-style:italic;font-weight:normal');
        }
        this.pop();
    },
    tads3_htmltag: function tads3_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#0F0F8F;font-style:italic;font-weight:normal')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#0F0F8F;font-style:italic;font-weight:normal')) return this.pop();
            this.hl(this.str[0], 'dsKeyword;color:#0F0F8F;font-style:italic;font-weight:normal');
        }
        this.pop();
    }
};
