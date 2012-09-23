KateSyntax.langs.mason.syntax = {
    default: 'mason_hTML',
    mason_hTML: function mason_hTML(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\%method[^>]*>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mason_embeddedPerl())return this.pop(), m-1;continue;}
            if((m = /^<%method>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mason_embeddedPerl())return this.pop(), m-1;continue;}
            if((m = /^<%doc>/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.mason_documentation())return this.pop(), m-1;continue;}
            if((m = /^<%perl>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mason_embeddedPerl())return this.pop(), m-1;continue;}
            if((m = /^<%init>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mason_embeddedPerl())return this.pop(), m-1;continue;}
            if((m = /^<%args>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mason_embeddedPerl())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '%' && this.hl('<%', 'dsKeyword')) {if(m = this.mason_embeddedPerl())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '&' && this.hl('<&', 'dsKeyword')) {if(m = this.mason_methodCall())return this.pop(), m-1;continue;}
            if((m = /^%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mason_perlOneLiner())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    mason_embeddedPerl: function mason_embeddedPerl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.str[1] == '>' && this.hl('%>', 'dsKeyword')) return this.pop();
            if((m = /^<\/%perl>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^<\/%method>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^<\/%init>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^<\/%args>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^(?:sub|bless|caller|cmp|print|echo|die|import|lt|le|local|last|!|\|\||eq|ne|use|elsif|my|foreach|wantarray|push|pop|dbmclose|dbmopen|dump|each|ge|gt|split|open|close|eval|chomp|chop|unless|undef|next|unlink|new|and|not|no|ref|redo|require|tied|tie|untie|or|xor|continue|do|else|for|goto|if|return|switch|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#!.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mason_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.mason_string2())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsChar')) {if(m = this.mason_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.mason_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.mason_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == 's' && this.str[1] == '/' && this.hl('s/', 'dsOthers')) {if(m = this.mason_pattern2())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this.mason_pattern())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\$\#?[a-zA-Z_]+[a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s+\:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.mason_commentar1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mason_string: function mason_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\$[a-zA-Z_]*[a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    mason_commentar1: function mason_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mason_commentar2: function mason_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mason_pattern: function mason_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[\/\[\]dDwWsSnrtfb0\$@]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\^[\/\[\]]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mason_pattern2: function mason_pattern2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[\/\[\]dDwWsSnrtfb0\$@]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\^[\/\[\]]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\//.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.mason_pattern3())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mason_pattern3: function mason_pattern3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[\/\[\]dDwWsSnrtfb0\$@]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\^[\/\[\]]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\/g?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mason_something: function mason_something(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '`' && this.hl('`', 'dsChar')) return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    mason_string2: function mason_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsChar')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    mason_perlOneLiner: function mason_perlOneLiner(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:sub|bless|caller|cmp|print|echo|die|import|lt|le|local|last|!|\|\||eq|ne|use|elsif|my|foreach|wantarray|push|pop|dbmclose|dbmopen|dump|each|ge|gt|split|open|close|eval|chomp|chop|unless|undef|next|unlink|new|and|not|no|ref|redo|require|tied|tie|untie|or|xor|continue|do|else|for|goto|if|return|switch|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#!.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '`' && this.hl('`', 'dsChar')) {if(m = this.mason_something())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.mason_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.mason_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == 's' && this.str[1] == '/' && this.hl('s/', 'dsOthers')) {if(m = this.mason_pattern2())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\$\#?[a-zA-Z_]+[a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s+\:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    mason_documentation: function mason_documentation(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/%doc>/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mason_methodCall: function mason_methodCall(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '&' && this.str[1] == '>' && this.hl('&>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    }
};
