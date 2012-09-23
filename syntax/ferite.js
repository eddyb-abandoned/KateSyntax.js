KateSyntax.langs.ferite.syntax = {
    default: 'ferite_default',
    ferite_default: function ferite_default(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:break|case|continue|else|for|if|do|function|namespace|while|class|new|uses|global|return|self|super|null|iferr|fix)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:number|void|string|array|object|final|static)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ferite_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.ferite_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.ferite_multilineComment())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#if 0/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ferite_undeffed())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == '#' && this.hl('#', 'dsOthers')) {if(m = this.ferite_preprocessor())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ferite_string: function ferite_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ferite_comment: function ferite_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ferite_multilineComment: function ferite_multilineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ferite_preprocessor: function ferite_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.ferite_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.ferite_multilineComment2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ferite_multilineComment2: function ferite_multilineComment2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ferite_unknown: function ferite_unknown(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ferite_unknown2: function ferite_unknown2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ferite_undeffed: function ferite_undeffed(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.col === 0 && (m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
