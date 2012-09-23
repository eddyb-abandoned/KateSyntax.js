KateSyntax.langs['asm-avr'].syntax = {
    default: 'asm-avr_normal',
    'asm-avr_normal': function asmavr_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[A-Za-z0-9_.$]+:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:adc|add|adiw|and|andi|asr|bclr|bld|brbc|brbs|brcc|brcs|break|breq|brge|brhc|brhs|brid|brie|brlo|brlt|brmi|brne|brpl|brsh|brtc|brts|brvc|brvs|bset|bst|call|cbi|cbr|clc|clh|cli|cln|clr|cls|clt|clv|clz|com|cp|cpc|cpi|cpse|dec|eicall|eijmp|elpm|eor|fmul|fmuls|fmulsu|icall|ijmp|in|inc|jmp|ld|ldd|ldi|lds|lpm|lsl|lsr|mov|movw|mul|muls|mulsu|neg|nop|or|ori|out|pop|push|rcall|ret|reti|rjmp|rol|ror|sbc|sbr|sbrc|sbrs|sec|seh|sbi|sbci|sbic|sbis|sbiw|sei|sen|ser|ses|set|sev|sez|sleep|spm|st|std|sts|sub|subi|swap|tst|wdr)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0[bB][01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0[fFeEdD][-+]?[0-9]*\.?[0-9]*[eE]?[-+]?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[A-Za-z_.$][A-Za-z0-9_.$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^'(\\x[0-9a-fA-F][0-9a-fA-F]?|\\[0-7]?[0-7]?[0-7]?|\\.|.)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this['asm-avr_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['asm-avr_commentar1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '@' && this.hl('@', 'dsComment')) {if(m = this['asm-avr_commentar2']())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this['asm-avr_commentar2']())return this.pop(), m-1;continue;}
            if((m = /^[!#%&*()+,\-<=>?/:[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['asm-avr_preprocessor']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'asm-avr_commentar1': function asmavr_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'asm-avr_commentar2': function asmavr_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'asm-avr_preprocessor': function asmavr_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    'asm-avr_string': function asmavr_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this['asm-avr_someContext']())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'asm-avr_someContext': function asmavr_someContext(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
