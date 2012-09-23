KateSyntax.langs.fsharp.syntax = {
    default: 'fsharp_normal',
    fsharp_normal: function fsharp_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.fsharp_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.fsharp_singlelineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '<' && this.hl('[<', 'dsNormal')) continue;
            if(this.str[0] == '>' && this.str[1] == ']' && this.hl('>]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.fsharp_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.fsharp_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fsharp_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:abstract|and|as|assert|base|class|delegate|dowcast|downto|elif|else|exception|extern|false|for|fun|function|functor|global|if|in|inherit|inline|interfaece|internal|lazy|let|match|member|mutable|namespace|new|not|null|of|or|override|private|public|rec|ref|return|static|then|to|true|try|type|upcast|use|val|void|when|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:bool|byte|sbyte|int16|uint16|int|uint32|int64|uint64|nativeint|unativeint|char|string|decimal|unit|void|float32|single|float|double|bigint|option|seq)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fsharp_singlelineComment: function fsharp_singlelineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    fsharp_multilineComment: function fsharp_multilineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.fsharp_multilineComment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    fsharp_stringConstant: function fsharp_stringConstant(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^&ESC;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    fsharp_block: function fsharp_block(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.fsharp_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.fsharp_singlelineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '<' && this.hl('[<', 'dsNormal')) continue;
            if(this.str[0] == '>' && this.str[1] == ']' && this.hl('>]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.fsharp_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.fsharp_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fsharp_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:abstract|and|as|assert|base|class|delegate|dowcast|downto|elif|else|exception|extern|false|for|fun|function|functor|global|if|in|inherit|inline|interfaece|internal|lazy|let|match|member|mutable|namespace|new|not|null|of|or|override|private|public|rec|ref|return|static|then|to|true|try|type|upcast|use|val|void|when|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:bool|byte|sbyte|int16|uint16|int|uint32|int64|uint64|nativeint|unativeint|char|string|decimal|unit|void|float32|single|float|double|bigint|option|seq)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fsharp_sig: function fsharp_sig(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.fsharp_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.fsharp_singlelineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '<' && this.hl('[<', 'dsNormal')) continue;
            if(this.str[0] == '>' && this.str[1] == ']' && this.hl('>]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.fsharp_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.fsharp_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fsharp_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:abstract|and|as|assert|base|class|delegate|dowcast|downto|elif|else|exception|extern|false|for|fun|function|functor|global|if|in|inherit|inline|interfaece|internal|lazy|let|match|member|mutable|namespace|new|not|null|of|or|override|private|public|rec|ref|return|static|then|to|true|try|type|upcast|use|val|void|when|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:bool|byte|sbyte|int16|uint16|int|uint32|int64|uint64|nativeint|unativeint|char|string|decimal|unit|void|float32|single|float|double|bigint|option|seq)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fsharp_struct: function fsharp_struct(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.fsharp_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.fsharp_singlelineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '<' && this.hl('[<', 'dsNormal')) continue;
            if(this.str[0] == '>' && this.str[1] == ']' && this.hl('>]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.fsharp_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.fsharp_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fsharp_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:abstract|and|as|assert|base|class|delegate|dowcast|downto|elif|else|exception|extern|false|for|fun|function|functor|global|if|in|inherit|inline|interfaece|internal|lazy|let|match|member|mutable|namespace|new|not|null|of|or|override|private|public|rec|ref|return|static|then|to|true|try|type|upcast|use|val|void|when|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:bool|byte|sbyte|int16|uint16|int|uint32|int64|uint64|nativeint|unativeint|char|string|decimal|unit|void|float32|single|float|double|bigint|option|seq)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fsharp_object: function fsharp_object(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.fsharp_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.fsharp_singlelineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '<' && this.hl('[<', 'dsNormal')) continue;
            if(this.str[0] == '>' && this.str[1] == ']' && this.hl('>]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.fsharp_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fsharp_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.fsharp_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fsharp_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:abstract|and|as|assert|base|class|delegate|dowcast|downto|elif|else|exception|extern|false|for|fun|function|functor|global|if|in|inherit|inline|interfaece|internal|lazy|let|match|member|mutable|namespace|new|not|null|of|or|override|private|public|rec|ref|return|static|then|to|true|try|type|upcast|use|val|void|when|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:bool|byte|sbyte|int16|uint16|int|uint32|int64|uint64|nativeint|unativeint|char|string|decimal|unit|void|float32|single|float|double|bigint|option|seq)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fsharp_moduleEnv: function fsharp_moduleEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.fsharp_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    fsharp_moduleEnv2: function fsharp_moduleEnv2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\./.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fsharp_camlp4QuotationConstant: function fsharp_camlp4QuotationConstant(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsString')) return this.pop();
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fsharp_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^\\(\\|>>|<<)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
