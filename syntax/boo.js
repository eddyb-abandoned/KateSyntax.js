KateSyntax.langs.boo.syntax = {
    default: 'boo_normal',
    boo_normal: function boo_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:import|from|as|namespace)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(?:abstract|virtual|override|static|final|transient|macro|protected|private|public|internal|partial|class|struct|interface|enum|callable|of|def|constructor|destructor|do|get|set|event|return|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:and|assert|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) continue;
            if((m = /^(?:and|break|cast|continue|elif|else|except|ensure|for|given|goto|if|in|is|isa|not|or|otherwise|pass|raise|try|unless|when|while|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:assert|__eval__|__switch__|enumerate|filter|len|typeof|map|max|min|property|using|getter|required|lock|range|zip|checked|unchecked|rawArrayIndexing|normalArrayIndexing|print|array|matrix|yieldAll)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:null|self|super)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:bool|byte|sbyte|double|decimal|single|short|ushort|int|char|uint|long|ulong|object|duck|string|regex|date|timespan)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([0-9]+\.[0-9]*|\.[0-9]+)([eE][0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^([1-9][0-9]*([eE][0-9]+)?|0)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[1-9][0-9]*([eE][0-9.]+)?[Ll]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^0[Xx][0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^0[1-9][0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[rR]'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawTrippleAString())return this.pop(), m-1;continue;}
            if((m = /^[rR]"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawTrippleQString())return this.pop(), m-1;continue;}
            if((m = /^[rR]'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawAString())return this.pop(), m-1;continue;}
            if((m = /^[rR]"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawQString())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\s*u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.boo_trippleAComment())return this.pop(), m-1;continue;}
            if((m = /^\s*u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.boo_trippleQComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.boo_commentSlashSlash())return this.pop(), m-1;continue;}
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_trippleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.boo_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.boo_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#000077')) {if(m = this.boo_parenthesised())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#000077')) return this.pop();
            if((m = /^\[\|/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) {if(m = this.boo_quasiQuotation())return this.pop(), m-1;continue;}
            if((m = /^\|]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) return this.pop();
            if((m = /^[+*/%\|=;\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    boo_parenthesised: function boo_parenthesised(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:import|from|as|namespace)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(?:abstract|virtual|override|static|final|transient|macro|protected|private|public|internal|partial|class|struct|interface|enum|callable|of|def|constructor|destructor|do|get|set|event|return|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:and|assert|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) continue;
            if((m = /^(?:and|break|cast|continue|elif|else|except|ensure|for|given|goto|if|in|is|isa|not|or|otherwise|pass|raise|try|unless|when|while|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:assert|__eval__|__switch__|enumerate|filter|len|typeof|map|max|min|property|using|getter|required|lock|range|zip|checked|unchecked|rawArrayIndexing|normalArrayIndexing|print|array|matrix|yieldAll)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:null|self|super)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:bool|byte|sbyte|double|decimal|single|short|ushort|int|char|uint|long|ulong|object|duck|string|regex|date|timespan)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([0-9]+\.[0-9]*|\.[0-9]+)([eE][0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^([1-9][0-9]*([eE][0-9]+)?|0)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[1-9][0-9]*([eE][0-9.]+)?[Ll]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^0[Xx][0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^0[1-9][0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[rR]'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawTrippleAString())return this.pop(), m-1;continue;}
            if((m = /^[rR]"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawTrippleQString())return this.pop(), m-1;continue;}
            if((m = /^[rR]'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawAString())return this.pop(), m-1;continue;}
            if((m = /^[rR]"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawQString())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\s*u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.boo_trippleAComment())return this.pop(), m-1;continue;}
            if((m = /^\s*u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.boo_trippleQComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.boo_commentSlashSlash())return this.pop(), m-1;continue;}
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_trippleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.boo_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.boo_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#000077')) {if(m = this.boo_parenthesised())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#000077')) return this.pop();
            if((m = /^\[\|/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) {if(m = this.boo_quasiQuotation())return this.pop(), m-1;continue;}
            if((m = /^\|]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) return this.pop();
            if((m = /^[+*/%\|=;\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    boo_quasiQuotation: function boo_quasiQuotation(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:import|from|as|namespace)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(?:abstract|virtual|override|static|final|transient|macro|protected|private|public|internal|partial|class|struct|interface|enum|callable|of|def|constructor|destructor|do|get|set|event|return|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:and|assert|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) continue;
            if((m = /^(?:and|break|cast|continue|elif|else|except|ensure|for|given|goto|if|in|is|isa|not|or|otherwise|pass|raise|try|unless|when|while|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:assert|__eval__|__switch__|enumerate|filter|len|typeof|map|max|min|property|using|getter|required|lock|range|zip|checked|unchecked|rawArrayIndexing|normalArrayIndexing|print|array|matrix|yieldAll)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:null|self|super)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:bool|byte|sbyte|double|decimal|single|short|ushort|int|char|uint|long|ulong|object|duck|string|regex|date|timespan)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) continue;
            if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([0-9]+\.[0-9]*|\.[0-9]+)([eE][0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^([1-9][0-9]*([eE][0-9]+)?|0)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[1-9][0-9]*([eE][0-9.]+)?[Ll]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^0[Xx][0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^0[1-9][0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[rR]'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawTrippleAString())return this.pop(), m-1;continue;}
            if((m = /^[rR]"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawTrippleQString())return this.pop(), m-1;continue;}
            if((m = /^[rR]'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawAString())return this.pop(), m-1;continue;}
            if((m = /^[rR]"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_rawQString())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\s*u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.boo_trippleAComment())return this.pop(), m-1;continue;}
            if((m = /^\s*u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.boo_trippleQComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.boo_commentSlashSlash())return this.pop(), m-1;continue;}
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.boo_trippleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.boo_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.boo_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#000077')) {if(m = this.boo_parenthesised())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#000077')) return this.pop();
            if((m = /^\[\|/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) {if(m = this.boo_quasiQuotation())return this.pop(), m-1;continue;}
            if((m = /^\|]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) return this.pop();
            if((m = /^[+*/%\|=;\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000077')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#000077');
        }
        this.pop();
    },
    boo_trippleAComment: function boo_trippleAComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    boo_trippleQComment: function boo_trippleQComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    boo_trippleAString: function boo_trippleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    boo_rawTrippleAString: function boo_rawTrippleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    boo_trippleQString: function boo_trippleQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    boo_rawTrippleQString: function boo_rawTrippleQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    boo_commentSlashSlash: function boo_commentSlashSlash(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    boo_singleAComment: function boo_singleAComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    boo_singleQComment: function boo_singleQComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    boo_singleAString: function boo_singleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    boo_singleQString: function boo_singleQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    boo_rawAString: function boo_rawAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    boo_rawQString: function boo_rawQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
