var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
    this.hl('');
    return this.main;
};
HL.prototype.hl = function hl(m,s) {
    this.pos += m.length;
    this.str = this.str.slice(m.length);
    if(this.style == s)
        this.hlText += m;
    else {
        if(this.hlText) {
            if(this.style == 'dsNormal')
                this.main.appendChild(document.createTextNode(this.hlText));
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(this.hlText));
                span.className = this.style;
                this.main.appendChild(span);
            }
        }
        this.style = s;
        this.hlText = m;
    }
    return true;
};
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(^|\s+)[\(]($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._comment();continue;}
        if((m = /^(^|\s+)(CHAR|[[]CHAR[]])($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._char();continue;}
        if((m = /^(^|\s+)(BEGIN|DO|IF)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(^|\s+)([;]|LOOP|[+]LOOP|THEN|REPEAT|UNTIL)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(^|\s+)([:])($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._word();continue;}
        if((m = /^(^|\s+)([']|CREATE|POSTPONE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._word();continue;}
        if((m = /^(^|\s+)ELSE($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(^|\s+)([.]"|ABORT"|S")($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._string();continue;}
        if((m = /^(^|\s+)(WORD)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._parseString();continue;}
        if((m = /^(^|\s+)(CONSTANT)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._constant();continue;}
        if((m = /^(^|\s+)(VARIABLE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._variable();continue;}
        if((m = /^(^|\s+)[\\]($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._singleComment();continue;}
        if((m = /^(^|\s+)([?]DO|CASE|OF)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(^|\s+)(AGAIN|ENDCASE|ENDOF)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(^|\s+)(MARKER|[[]COMPILE[]])($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._word();continue;}
        if((m = /^(^|\s+)(C")($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._string();continue;}
        if((m = /^(^|\s+)(PARSE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._parseString();continue;}
        if((m = /^(^|\s+)([\.][\(])($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._displayString();continue;}
        if((m = /^(^|\s+)(TO)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._variable();continue;}
        if((m = /^(^|\s+)(VALUE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._variable();continue;}
        if((m = /^(^|\s+)(2CONSTANT)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._constant();continue;}
        if((m = /^(^|\s+)(2VARIABLE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._variable();continue;}
        if((m = /^(^|\s+)(FCONSTANT)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._constant();continue;}
        if((m = /^(^|\s+)(FVARIABLE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._variable();continue;}
        if((m = /^(^|\s+)(LOCALS\|)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._local();continue;}
        if((m = /^(^|\s+)(SEE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._word();continue;}
        if((m = /^(^|\s+)(CODE)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._word();continue;}
        if((m = /^(^|\s+)(FORGET)($|\s+)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._word();continue;}
        if((m = /^(?:!|#|#>|#S|'|\(|\*|\*\/|\*\/MOD|\+|\+!|\+LOOP|,|-|\.|\."|\/|\/MOD|0<|0=|1\+|1-|2!|2\*|2\/|2@|2DROP|2DUP|2OVER|2SWAP|:|;|<|<#|=|>|>BODY|>IN|>NUMBER|>R|?DUP|@|ABORT|ABORT"|ABS|ACCEPT|ALIGN|ALIGNED|ALLOT|AND|BASE|BEGIN|BL|C!|C,|C@|CELL\+|CELLS|CHAR|CHAR\+|CHARS|CONSTANT|COUNT|CR|CREATE|DECIMAL|DEPTH|DO|DOES>|DROP|DUP|ELSE|EMIT|ENVIRONMENT?|EVALUATE|EXECUTE|EXIT|FILL|FIND|FM\/MOD|HERE|HOLD|I|IF|IMMEDIATE|INVERT|J|KEY|LEAVE|LITERAL|LOOP|LSHIFT|M\*|MAX|MIN|MOD|MOVE|NEGATE|OR|OVER|POSTPONE|QUIT|R>|R@|RECURSE|REPEAT|ROT|RSHIFT|S"|S>D|SIGN|SM\/REM|SOURCE|SPACE|SPACES|STATE|SWAP|THEN|TYPE|U\.|U<|UM\*|UM\/MOD|UNLOOP|UNTIL|VARIABLE|WHILE|WORD|XOR|\[|\[']|\[CHAR]|])\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\.\(|\.R|0<>|0>|2>R|2R>|2R@|:NONAME|<>|?DO|AGAIN|C"|CASE|COMPILE,|ENDCASE|ENDOF|ERASE|FALSE|HEX|MARKER|NIP|OF|PAD|PARSE|PICK|REFILL|RESTORE-INPUT|ROLL|SAVE-INPUT|SOURCE-ID|TO|TRUE|TUCK|U\.R|U>|UNUSED|VALUE|WITHIN|\[COMPILE]|\\)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:#TIB|CONVERT|EXPECT|QUERY|SPAN|TIB)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:BLK|BLOCK|BUFFER|EVALUATE|FLUSH|LOAD|SAVE-BUFFERS|UPDATE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:EMPTY-BUFFERS|LIST|REFILL|SCR|THRU|\\)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:2CONSTANT|2LITERAL|2VARIABLE|D\+|D-|D\.|D\.R|D0<|D0=|D2\*|D2\/|D<|D=|D>S|DABS|DMAX|DMIN|DNEGATE|M\*\/|M\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:2ROT|DU<)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:CATCH|THROW)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ABORT|ABORT")\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:AT-XY|KEY?|PAGE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:EKEY|EKEY>CHAR|EKEY?|EMIT?|MS|TIME&DATE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\(|BIN|CLOSE-FILE|CREATE-FILE|DELETE-FILE|FILE-POSITION|FILE-SIZE|INCLUDE-FILE|INCLUDED|OPEN-FILE|R\/O|R\/W|READ-FILE|READ-LINE|REPOSITION-FILE|RESIZE-FILE|S"|SOURCE-ID|W\/O|WRITE-FILE|WRITE-LINE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:FILE-STATUS|FLUSH-FILE|REFILL|RENAME-FILE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:>FLOAT|D>F|F!|F\*|F\+|F-|F\/|F0<|F0=|F<|F>D|F@|FALIGN|FALIGNED|FCONSTANT|FDEPTH|FDROP|FDUP|FLITERAL|FLOAT\+|FLOATS|FLOOR|FMAX|FMIN|FNEGATE|FOVER|FROT|FROUND|FSWAP|FVARIABLE|REPRESENT)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:DF!|DF@|DFALIGN|DFALIGNED|DFLOAT\+|DFLOATS|F\*\*|F\.|FABS|FACOS|FACOSH|FALOG|FASIN|FASINH|FATAN|FATAN2|FATANH|FCOS|FCOSH|FE\.|FEXP|FEXPM1|FLN|FLNP1|FLOG|FS\.|FSIN|FSINCOS|FSINH|FSQRT|FTAN|FTANH|F~|PRECISION|SET-PRECISION|SF!|SF@|SFALIGN|SFALIGNED|SFLOAT\+|SFLOATS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\(LOCAL\)|TO)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:LOCALS|)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ALLOCATE|FREE|RESIZE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\.S|?|DUMP|SEE|WORDS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:;CODE|AHEAD|ASSEMBLER|BYE|CODE|CS-PICK|CS-ROLL|EDITOR|STATE|\[ELSE]|\[IF]|\[THEN])\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:FORGET)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:DEFINITIONS|FIND|FORTH-WORDLIST|GET-CURRENT|GET-ORDER|SEARCH-WORDLIST|SET-CURRENT|SET-ORDER|WORDLIST)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ALSO|FORTH|ONLY|ORDER|PREVIOUS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:-TRAILING|\/STRING|BLANK|CMOVE|CMOVE>|COMPARE|SEARCH|SLITERAL)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(^|\s+)([-]?[0-9]+)($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(^|\s+)([-]?[0-9]+[.][0-9]*)($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(^|\s+)([+]|[-])?([0-9]+[.]?[0-9]*)(E|e)([+]|[-])?([0-9]*)($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        if((m = /^(^|\s+)(FIXME|TODO|NOTE)($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._singleComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(^|\s+)(FIXME|TODO|NOTE)($|\s+)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._displayString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._parseString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ' ' && this.hl(' ', 'dsKeyword')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._word = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ' ' && this.hl(' ', 'dsFunction')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsFunction')) return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._char = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ' ' && this.hl(' ', 'dsChar')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsChar')) return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._constant = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ' ' && this.hl(' ', 'dsDataType')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._variable = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ' ' && this.hl(' ', 'dsDataType')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._local = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
