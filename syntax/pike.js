KateSyntax.langs.pike.syntax = {
    default: 'pike_normal',
    pike_normal: function pike_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:break|case|class|continue|default|do|else|for|foreach|if|return|switch|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:array|float|function|int|mapping|mixed|multiset>|object|program|static|string|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:catch|gauge|sscanf|typeof)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^`([\+\-\*/%~&\|^]|[!=<>]=|<<?|>>?|(\[\]|->)=?)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[bB][01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.pike_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.pike_lineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.pike_lineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.pike_blockComment())return this.pop(), m-1;continue;}
            if((m = /^#\s*if\s+0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pike_outscoped())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsOthers')) {if(m = this.pike_preprocessor())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    pike_string: function pike_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\d[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pike_lineComment: function pike_lineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO|NOT(IC)?E):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    pike_blockComment: function pike_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(FIXME|TODO|NOT(IC)?E):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    pike_preprocessor: function pike_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.pike_lineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.pike_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    pike_outscoped: function pike_outscoped(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO|NOT(IC)?E):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.pike_blockComment())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.pike_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*(endif|elif|else)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    pike_outscopedIntern: function pike_outscopedIntern(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.pike_blockComment())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.pike_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
