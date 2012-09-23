KateSyntax.langs.abc.syntax = {
    default: 'abc_normal',
    abc_normal: function abc_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\([23456789]:?[23456789]?:?[23456789]?/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb00bb')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString;fontWeight:bold')) continue;
            if((m = /^!.*?!/.exec(this.str)) && this.hl(m[0], 'dsFloat;color:#00bbaa')) continue;
            if((m = /^\[[ABCGHILMNOQRSTUVZ]:/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.abc_header())return this.pop(), m-1;continue;}
            if((m = /^[ABCGHILMNOPQRSTUVZ]:/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.abc_header2())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == 'X' && this.str[1] == ':' && this.hl('X:', 'dsFloat')) {if(m = this.abc_header())return this.pop(), m-1;continue;}
            if((m = /^[|:[]/.exec(this.str)) && this.hl(m[0], 'dsChar;color:#0000ff')) {if(m = this.abc_bar())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsChar;color:#0000ff')) continue;
            if((m = /^[()]/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) continue;
            if((m = /^[{}]/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) continue;
            if(this.str[0] == 'W' && this.str[1] == ':' && this.hl('W:', 'dsDataType;color:#00bb00')) {if(m = this.abc_lyrics())return this.pop(), m-1;continue;}
            if(this.str[0] == 'w' && this.str[1] == ':' && this.hl('w:', 'dsDataType;color:#00bb00')) {if(m = this.abc_lyrics())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsString;fontStyle:italic')) {if(m = this.abc_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.abc_comment())return this.pop(), m-1;continue;}
            if((m = /^[_|\^]?[_|=|\^][A-Ga-g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#22bb66;fontWeight:bold')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    abc_preprocessor: function abc_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;fontStyle:italic');
        }
        this.pop();
    },
    abc_lyrics: function abc_lyrics(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType;color:#00bb00');
        }
        this.pop();
    },
    abc_part: function abc_part(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFloat');
        }
        this.pop();
    },
    abc_comment: function abc_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    abc_bar: function abc_bar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsChar;color:#0000ff')) return this.pop();
            if((m = /^[A-Ga-gZz]/.exec(this.str)) && this.hl(m[0], 'dsChar;color:#0000ff')) return this.pop();
            if(this.str[0] == ' ' && this.hl(' ', 'dsChar;color:#0000ff')) return this.pop();
            if((m = /^!.*?!/.exec(this.str)) && this.hl(m[0], 'dsFloat;color:#00bbaa')) continue;
            if((m = /^[()]/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) continue;
            if((m = /^:*\|*[1-9]|\/*\|/.exec(this.str)) && this.hl(m[0], 'dsChar;color:#0000ff')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsChar;color:#0000ff');
        }
        this.pop();
    },
    abc_header: function abc_header(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^K:.+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if(this.str[0] == ']' && this.hl(']', 'dsFloat')) return this.pop();
            this.hl(this.str[0], 'dsFloat');
        }
        this.pop();
    },
    abc_header2: function abc_header2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFloat');
        }
        this.pop();
    }
};
