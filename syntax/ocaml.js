KateSyntax.langs.ocaml.syntax = {
    default: 'ocaml_normal',
    ocaml_normal: function ocaml_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.ocaml_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ocaml_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.ocaml_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ocaml_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
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
    ocaml_multilineComment: function ocaml_multilineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.ocaml_multilineComment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ocaml_stringConstant: function ocaml_stringConstant(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^&ESC;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ocaml_block: function ocaml_block(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.ocaml_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ocaml_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.ocaml_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ocaml_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
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
    ocaml_sig: function ocaml_sig(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.ocaml_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ocaml_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.ocaml_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ocaml_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
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
    ocaml_struct: function ocaml_struct(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.ocaml_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ocaml_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.ocaml_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ocaml_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
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
    ocaml_object: function ocaml_object(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this.ocaml_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.str[1] == '|' && this.hl('[|', 'dsNormal')) continue;
            if(this.str[0] == '|' && this.str[1] == ']' && this.hl('|]', 'dsNormal')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ocaml_moduleEnv())return this.pop(), m-1;continue;}
            if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_block())return this.pop(), m-1;continue;}
            if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_object())return this.pop(), m-1;continue;}
            if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_sig())return this.pop(), m-1;continue;}
            if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ocaml_struct())return this.pop(), m-1;continue;}
            if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.ocaml_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ocaml_stringConstant())return this.pop(), m-1;continue;}
            if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
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
    ocaml_moduleEnv: function ocaml_moduleEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^&MIDENT;\s*\./.exec(this.str)) {if(m = this.ocaml_moduleEnv2())return this.pop(), m-1;continue;}
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    ocaml_moduleEnv2: function ocaml_moduleEnv2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\./.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ocaml_camlp4QuotationConstant: function ocaml_camlp4QuotationConstant(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsString')) return this.pop();
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.ocaml_camlp4QuotationConstant())return this.pop(), m-1;continue;}
            if((m = /^\\(\\|>>|<<)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
