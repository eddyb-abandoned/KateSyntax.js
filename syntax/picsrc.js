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
        if((m = /^(?:__BADRAM|__CONFIG|__IDLOCS|__MAXRAM|cblock|constant|da|data|db|de|dt|dw|endc|endm|equ|error|errorlevel|exitm|fill|list|local|macro|messg|noexpand|nolist|org|page|processor|radix|res|set|space|subtitle|title|variable|end|CBLOCK|CONSTANT|DA|DATA|DB|DE|DT|DW|ENDC|ENDM|EQU|ERROR|ERRORLEVEL|EXITM|FILL|LIST|LOCAL|MACRO|MESSG|NOEXPAND|NOLIST|ORG|PAGE|PROCESSOR|RADIX|RES|SET|SPACE|SUBTITLE|TITLE|VARIABLE|END)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:addlw|addwf|addwfc|andlw|andwf|bc|bcf|bn|bnc|bnov|bnz|bov|bra|bsf|btg|bz|btfsc|btfss|call|clrf|clrw|clrwdt|comf|cpfseq|cpfslt|cpfsgt|daw|decf|dcfsnz|decfsz|goto|incf|incfsz|infsnz|iorlw|iorwf|lfsr|movf|movff|movlb|movlw|movwf|mullw|mulwf|negf|nop|option|pop|push|rcall|reset|retfie|retlw|return|rlcf|rlf|rlncf|rrcf|rrf|rrncf|setf|sleep|subfwb|sublw|subwf|subwfb|swapf|tblrd|tblwt|tstfsz|xorlw|xorwf|ADDLW|ADDWF|ADDWFC|ANDLW|ANDWF|BC|BCF|BN|BNC|BNOV|BNZ|BOV|BRA|BSF|BTG|BZ|BTFSC|BTFSS|CALL|CLRF|CLRW|CLRWDT|COMF|CPFSEQ|CPFSLT|CPFSGT|DAW|DCFSNZ|DECF|DECFSZ|GOTO|INCF|INCFSZ|INFSNZ|IORLW|IORWF|LFSR|MOVF|MOVFF|MOVLB|MOVLW|MOVWF|MULLW|MULWF|NEGF|NOP|OPTION|POP|PUSH|RCALL|RESET|RETFIE|RETLW|RETURN|RLCF|RLF|RLNCF|RRCF|RRF|RRNCF|SETF|SLEEP|SUBFWB|SUBLW|SUBWF|SUBWFB|SWAPF|TBLRD|TBLWT|TSTFSZ|XORLW|XORWF)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:A|ACCESS|BANKED|W|F)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:if|else|idef|ifndef|endif|while|include|endw|\{|\})\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:addcf|b|clrc|clrz|setc|setz|movfw|skpc|skpz|skpnc|skpnz|subcf|tstf|ADDCF|B|CLRC|CLRZ|SETC|SETZ|MOVFW|SKPC|SKPZ|SKPNC|SKPNZ|SUBCF|TSTF)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^([ \t,][0-9A-F]+H[ \t,])/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^([ \t,][0-9A-F]+H)(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^([ \t,][0-9]+D)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^([ \t,][0-7]+O)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^([ \t,][0-1]+B)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == 'A' && this.str[1] == ''' && this.hl('A'', 'dsChar')) {this._aSCIIChar();continue;}
        if(this.str[0] == 'a' && this.str[1] == ''' && this.hl('a'', 'dsChar')) {this._aSCIIChar();continue;}
        if(this.str[0] == 'B' && this.str[1] == ''' && this.hl('B'', 'dsBaseN')) {this._binaryDigits();continue;}
        if(this.str[0] == 'b' && this.str[1] == ''' && this.hl('b'', 'dsBaseN')) {this._binaryDigits();continue;}
        if(this.str[0] == 'H' && this.str[1] == ''' && this.hl('H'', 'dsBaseN')) {this._hexDigits();continue;}
        if(this.str[0] == 'h' && this.str[1] == ''' && this.hl('h'', 'dsBaseN')) {this._hexDigits();continue;}
        if(this.str[0] == 'O' && this.str[1] == ''' && this.hl('O'', 'dsBaseN')) {this._octDigits();continue;}
        if(this.str[0] == 'o' && this.str[1] == ''' && this.hl('o'', 'dsBaseN')) {this._octDigits();continue;}
        if(this.str[0] == 'D' && this.str[1] == ''' && this.hl('D'', 'dsBaseN')) {this._decimalDigits();continue;}
        if(this.str[0] == 'd' && this.str[1] == ''' && this.hl('d'', 'dsBaseN')) {this._decimalDigits();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsComment')) {this._comment();continue;}
        if((m = /^[\-/*%+=><&|\^!~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#define/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^#undefine/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^#v/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(INPUT|OUTPUT|PARAMETERS|AUTHOR|EMAIL)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._decimalDigits = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) return;
        if((m = /^\D/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._quotedNumError();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._binaryDigits = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) return;
        if((m = /^[^0-1]/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._quotedNumError();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._hexDigits = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) return;
        if((m = /^[^0-9A-Fa-f]/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._quotedNumError();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._octDigits = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) return;
        if((m = /^[^0-7]/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._quotedNumError();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._aSCIIChar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) return;
        if((m = /^.[^']/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._quotedNumError();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._quotedNumError = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsError')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
