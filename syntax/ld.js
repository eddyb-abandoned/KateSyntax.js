KateSyntax.langs.ld.syntax = {
    default: 'ld_normal',
    ld_normal: function ld_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:AT|ENTRY|INPUT|GROUP|OUTPUT|OUTPUT_ARCH|OUTPUT_FORMAT|SEARCH_DIR|STARTUP|TARGET)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ABSOLUTE|ADDR|ALIGN|DATA_SEGMENT_ALIGN|DATA_SEGMENT_END|DATA_SEGMENT_RELRO_END|DEFINED|LOADADDR|MAX|MIN|NEXT|SIZEOF|SIZEOF_HEADERS)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:SECTIONS|MEMORY)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\.[\-_0-9a-zA-Z]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(COMMON|\/DISCARD\/)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.ld_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ld_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ld_comment: function ld_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ld_string: function ld_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
