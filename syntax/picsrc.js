KateSyntax.langs.picsrc.syntax = {
    default: 'picsrc_normal',
    picsrc_normal: function picsrc_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:__BADRAM|__CONFIG|__IDLOCS|__MAXRAM|cblock|constant|da|data|db|de|dt|dw|endc|endm|equ|error|errorlevel|exitm|fill|list|local|macro|messg|noexpand|nolist|org|page|processor|radix|res|set|space|subtitle|title|variable|end|CBLOCK|CONSTANT|DA|DATA|DB|DE|DT|DW|ENDC|ENDM|EQU|ERROR|ERRORLEVEL|EXITM|FILL|LIST|LOCAL|MACRO|MESSG|NOEXPAND|NOLIST|ORG|PAGE|PROCESSOR|RADIX|RES|SET|SPACE|SUBTITLE|TITLE|VARIABLE|END)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:addlw|addwf|addwfc|andlw|andwf|bc|bcf|bn|bnc|bnov|bnz|bov|bra|bsf|btg|bz|btfsc|btfss|call|clrf|clrw|clrwdt|comf|cpfseq|cpfslt|cpfsgt|daw|decf|dcfsnz|decfsz|goto|incf|incfsz|infsnz|iorlw|iorwf|lfsr|movf|movff|movlb|movlw|movwf|mullw|mulwf|negf|nop|option|pop|push|rcall|reset|retfie|retlw|return|rlcf|rlf|rlncf|rrcf|rrf|rrncf|setf|sleep|subfwb|sublw|subwf|subwfb|swapf|tblrd|tblwt|tstfsz|xorlw|xorwf|ADDLW|ADDWF|ADDWFC|ANDLW|ANDWF|BC|BCF|BN|BNC|BNOV|BNZ|BOV|BRA|BSF|BTG|BZ|BTFSC|BTFSS|CALL|CLRF|CLRW|CLRWDT|COMF|CPFSEQ|CPFSLT|CPFSGT|DAW|DCFSNZ|DECF|DECFSZ|GOTO|INCF|INCFSZ|INFSNZ|IORLW|IORWF|LFSR|MOVF|MOVFF|MOVLB|MOVLW|MOVWF|MULLW|MULWF|NEGF|NOP|OPTION|POP|PUSH|RCALL|RESET|RETFIE|RETLW|RETURN|RLCF|RLF|RLNCF|RRCF|RRF|RRNCF|SETF|SLEEP|SUBFWB|SUBLW|SUBWF|SUBWFB|SWAPF|TBLRD|TBLWT|TSTFSZ|XORLW|XORWF)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:A|ACCESS|BANKED|W|F)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080;fontStyle:italic;fontWeight:normal')) continue;
            if((m = /^(?:if|else|idef|ifndef|endif|while|include|endw|\{|\})\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:addcf|b|clrc|clrz|setc|setz|movfw|skpc|skpz|skpnc|skpnz|subcf|tstf|ADDCF|B|CLRC|CLRZ|SETC|SETZ|MOVFW|SKPC|SKPZ|SKPNC|SKPNZ|SUBCF|TSTF)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000000;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^([ \t,][0-9A-F]+H[ \t,])/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^([ \t,][0-9A-F]+H)(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^([ \t,][0-9]+D)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^([ \t,][0-7]+O)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^([ \t,][0-1]+B)/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == 'A' && this.str[1] == '\'' && this.hl('A\'', 'dsChar')) {if(m = this.picsrc_aSCIIChar())return this.pop(), m-1;continue;}
            if(this.str[0] == 'a' && this.str[1] == '\'' && this.hl('a\'', 'dsChar')) {if(m = this.picsrc_aSCIIChar())return this.pop(), m-1;continue;}
            if(this.str[0] == 'B' && this.str[1] == '\'' && this.hl('B\'', 'dsBaseN')) {if(m = this.picsrc_binaryDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == 'b' && this.str[1] == '\'' && this.hl('b\'', 'dsBaseN')) {if(m = this.picsrc_binaryDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == 'H' && this.str[1] == '\'' && this.hl('H\'', 'dsBaseN')) {if(m = this.picsrc_hexDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == 'h' && this.str[1] == '\'' && this.hl('h\'', 'dsBaseN')) {if(m = this.picsrc_hexDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == 'O' && this.str[1] == '\'' && this.hl('O\'', 'dsBaseN')) {if(m = this.picsrc_octDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == 'o' && this.str[1] == '\'' && this.hl('o\'', 'dsBaseN')) {if(m = this.picsrc_octDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == 'D' && this.str[1] == '\'' && this.hl('D\'', 'dsBaseN')) {if(m = this.picsrc_decimalDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == 'd' && this.str[1] == '\'' && this.hl('d\'', 'dsBaseN')) {if(m = this.picsrc_decimalDigits())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.picsrc_string())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this.picsrc_comment())return this.pop(), m-1;continue;}
            if((m = /^[\-/*%+=><&|\^!~]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^#define/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^#undefine/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^#v/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    picsrc_string: function picsrc_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    picsrc_comment: function picsrc_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(INPUT|OUTPUT|PARAMETERS|AUTHOR|EMAIL)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    picsrc_decimalDigits: function picsrc_decimalDigits(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) return this.pop();
            if((m = /^\D/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.picsrc_quotedNumError())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    picsrc_binaryDigits: function picsrc_binaryDigits(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) return this.pop();
            if((m = /^[^0-1]/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.picsrc_quotedNumError())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    picsrc_hexDigits: function picsrc_hexDigits(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) return this.pop();
            if((m = /^[^0-9A-Fa-f]/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.picsrc_quotedNumError())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    picsrc_octDigits: function picsrc_octDigits(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) return this.pop();
            if((m = /^[^0-7]/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.picsrc_quotedNumError())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    picsrc_aSCIIChar: function picsrc_aSCIIChar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return this.pop();
            if((m = /^.[^']/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.picsrc_quotedNumError())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    picsrc_quotedNumError: function picsrc_quotedNumError(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsError')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    }
};
