KateSyntax.langs.lpc.syntax = {
    default: 'lpc_normal',
    lpc_normal: function lpc_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\/\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.lpc_comment1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.lpc_comment2())return this.pop(), m-1;continue;}
            if((m = /^(?:private|protected|static|public|nomask|varargs|nosave|virtual)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:void|int|status|string|object|array|mapping|closure|symbol|float|mixed)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:break|continue|return|if|else|for|foreach|do|while|switch|case|inherit|default|variables|functions|publish|nolog)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && this.str[0] == '#' && this.hl('#', 'dsOthers')) {if(m = this.lpc_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0b[01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0o[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^#'[^\t ][^\t ,);}\]/]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lpc_string1())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lpc_comment1: function lpc_comment1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:FIXME|HACK|NOTE|NOTICE|TODO|WARNING|###)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lpc_comment2: function lpc_comment2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:FIXME|HACK|NOTE|NOTICE|TODO|WARNING|###)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lpc_preprocessor: function lpc_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.lpc_comment1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.lpc_comment2())return this.pop(), m-1;continue;}
            if((m = /^(?:private|protected|static|public|nomask|varargs|nosave|virtual)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:void|int|status|string|object|array|mapping|closure|symbol|float|mixed)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:break|continue|return|if|else|for|foreach|do|while|switch|case|inherit|default|variables|functions|publish|nolog)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lpc_string2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    lpc_string1: function lpc_string1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    lpc_string2: function lpc_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
