KateSyntax.langs.ansforth94.syntax = {
    default: 'ansforth94_normal',
    ansforth94_normal: function ansforth94_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(\^|\s+)[\(]((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_comment())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(CHAR|[[]CHAR[\]])((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_char())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(BEGIN|DO|IF)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\^|\s+)([;]|LOOP|[+]LOOP|THEN|REPEAT|UNTIL)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\^|\s+)([:])((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_word())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)([']|CREATE|POSTPONE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_word())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)ELSE((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\^|\s+)([.]"|ABORT"|S")((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_string())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(WORD)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_parseString())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(CONSTANT)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_constant())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(VARIABLE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_variable())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)[\\]((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_singleComment())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)([?]DO|CASE|OF)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\^|\s+)(AGAIN|ENDCASE|ENDOF)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\^|\s+)(MARKER|[[]COMPILE[\]])((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_word())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(C")((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_string())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(PARSE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_parseString())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)([\.][\(])((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_displayString())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(TO)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_variable())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(VALUE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_variable())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(2CONSTANT)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_constant())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(2VARIABLE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_variable())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(FCONSTANT)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_constant())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(FVARIABLE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_variable())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(LOCALS\|)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_local())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(SEE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_word())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(CODE)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ansforth94_word())return this.pop(), m-1;continue;}
            if((m = /^(\^|\s+)(FORGET)((?=$|\n)|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ff0000')) {if(m = this.ansforth94_word())return this.pop(), m-1;continue;}
            if((m = /^(?:!|#|#>|#S|'|\(|\*|\*\/|\*\/MOD|\+|\+!|\+LOOP|,|-|\.|\."|\/|\/MOD|0<|0=|1\+|1-|2!|2\*|2\/|2@|2DROP|2DUP|2OVER|2SWAP|:|;|<|<#|=|>|>BODY|>IN|>NUMBER|>R|\?DUP|@|ABORT|ABORT"|ABS|ACCEPT|ALIGN|ALIGNED|ALLOT|AND|BASE|BEGIN|BL|C!|C,|C@|CELL\+|CELLS|CHAR|CHAR\+|CHARS|CONSTANT|COUNT|CR|CREATE|DECIMAL|DEPTH|DO|DOES>|DROP|DUP|ELSE|EMIT|ENVIRONMENT\?|EVALUATE|EXECUTE|EXIT|FILL|FIND|FM\/MOD|HERE|HOLD|I|IF|IMMEDIATE|INVERT|J|KEY|LEAVE|LITERAL|LOOP|LSHIFT|M\*|MAX|MIN|MOD|MOVE|NEGATE|OR|OVER|POSTPONE|QUIT|R>|R@|RECURSE|REPEAT|ROT|RSHIFT|S"|S>D|SIGN|SM\/REM|SOURCE|SPACE|SPACES|STATE|SWAP|THEN|TYPE|U\.|U<|UM\*|UM\/MOD|UNLOOP|UNTIL|VARIABLE|WHILE|WORD|XOR|\[|\[']|\[CHAR]|])\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\.\(|\.R|0<>|0>|2>R|2R>|2R@|:NONAME|<>|\?DO|AGAIN|C"|CASE|COMPILE,|ENDCASE|ENDOF|ERASE|FALSE|HEX|MARKER|NIP|OF|PAD|PARSE|PICK|REFILL|RESTORE-INPUT|ROLL|SAVE-INPUT|SOURCE-ID|TO|TRUE|TUCK|U\.R|U>|UNUSED|VALUE|WITHIN|\[COMPILE]|\\)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:#TIB|CONVERT|EXPECT|QUERY|SPAN|TIB)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ff0000')) continue;
            if((m = /^(?:BLK|BLOCK|BUFFER|EVALUATE|FLUSH|LOAD|SAVE-BUFFERS|UPDATE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:EMPTY-BUFFERS|LIST|REFILL|SCR|THRU|\\)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:2CONSTANT|2LITERAL|2VARIABLE|D\+|D-|D\.|D\.R|D0<|D0=|D2\*|D2\/|D<|D=|D>S|DABS|DMAX|DMIN|DNEGATE|M\*\/|M\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:2ROT|DU<)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:CATCH|THROW)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ABORT|ABORT")\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:AT-XY|KEY\?|PAGE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:EKEY|EKEY>CHAR|EKEY\?|EMIT\?|MS|TIME&DATE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\(|BIN|CLOSE-FILE|CREATE-FILE|DELETE-FILE|FILE-POSITION|FILE-SIZE|INCLUDE-FILE|INCLUDED|OPEN-FILE|R\/O|R\/W|READ-FILE|READ-LINE|REPOSITION-FILE|RESIZE-FILE|S"|SOURCE-ID|W\/O|WRITE-FILE|WRITE-LINE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:FILE-STATUS|FLUSH-FILE|REFILL|RENAME-FILE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:>FLOAT|D>F|F!|F\*|F\+|F-|F\/|F0<|F0=|F<|F>D|F@|FALIGN|FALIGNED|FCONSTANT|FDEPTH|FDROP|FDUP|FLITERAL|FLOAT\+|FLOATS|FLOOR|FMAX|FMIN|FNEGATE|FOVER|FROT|FROUND|FSWAP|FVARIABLE|REPRESENT)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:DF!|DF@|DFALIGN|DFALIGNED|DFLOAT\+|DFLOATS|F\*\*|F\.|FABS|FACOS|FACOSH|FALOG|FASIN|FASINH|FATAN|FATAN2|FATANH|FCOS|FCOSH|FE\.|FEXP|FEXPM1|FLN|FLNP1|FLOG|FS\.|FSIN|FSINCOS|FSINH|FSQRT|FTAN|FTANH|F~|PRECISION|SET-PRECISION|SF!|SF@|SFALIGN|SFALIGNED|SFLOAT\+|SFLOATS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\(LOCAL\)|TO)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:LOCALS\|)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ALLOCATE|FREE|RESIZE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\.S|\?|DUMP|SEE|WORDS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:;CODE|AHEAD|ASSEMBLER|BYE|CODE|CS-PICK|CS-ROLL|EDITOR|STATE|\[ELSE]|\[IF]|\[THEN])\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:FORGET)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ff0000')) continue;
            if((m = /^(?:DEFINITIONS|FIND|FORTH-WORDLIST|GET-CURRENT|GET-ORDER|SEARCH-WORDLIST|SET-CURRENT|SET-ORDER|WORDLIST)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ALSO|FORTH|ONLY|ORDER|PREVIOUS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:-TRAILING|\/STRING|BLANK|CMOVE|CMOVE>|COMPARE|SEARCH|SLITERAL)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\^|\s+)([-]?[0-9]+)((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(\^|\s+)([-]?[0-9]+[.][0-9]*)((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(\^|\s+)([+]|[-])?([0-9]+[.]?[0-9]*)(E|e)([+]|[-])?([0-9]*)((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ansforth94_comment: function ansforth94_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if((m = /^(\^|\s+)(FIXME|TODO|NOTE)((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ansforth94_singleComment: function ansforth94_singleComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(\^|\s+)(FIXME|TODO|NOTE)((?=$|\n)|\s+)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ansforth94_displayString: function ansforth94_displayString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ansforth94_string: function ansforth94_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ansforth94_parseString: function ansforth94_parseString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ' ' && this.hl(' ', 'dsKeyword')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ansforth94_word: function ansforth94_word(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ' ' && this.hl(' ', 'dsFunction')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    ansforth94_char: function ansforth94_char(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ' ' && this.hl(' ', 'dsChar')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    ansforth94_constant: function ansforth94_constant(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ' ' && this.hl(' ', 'dsDataType')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    ansforth94_variable: function ansforth94_variable(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ' ' && this.hl(' ', 'dsDataType')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    ansforth94_local: function ansforth94_local(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    }
};
