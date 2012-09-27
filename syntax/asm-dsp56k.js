KateSyntax.langs['asm-dsp56k'].syntax = {
    default: 'asm-dsp56k_normalText',
    'asm-dsp56k_normalText': function asmdsp56k_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[xylpXYLP]:/.exec(this.str)) && this.hl(m[0], 'dsOthers;font-weight:bold')) return this.pop();
            if((m = /^(?:x|x0|x1|y|y0|y1|a2|a1|a0|a|a10|ab|b2|b1|b0|b|b10|ba)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:r0|r1|r2|r3|r4|r5|r6|r7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:n0|n1|n2|n3|n4|n5|n6|n7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:m0|m1|m2|m3|m4|m5|m6|m7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:la|lc|pc|ssh|ssl|omr|sr|sp|mr|ccr)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:abs|adc|add|addl|addr|and|andi|asl|asr|bchg|bclr|bset|btst|clr|cmp|cmpm|div|do|enddo|eor|illegal|jcc|jhs|jcs|jls|jec|jeq|jes|jge|jgt|jlc|jle|jls|jlt|jmi|jne|jnr|jpl|jnn|jclr|jmp|jscc|jshs|jscs|jsls|jsec|jseq|jses|jsge|jsgt|jslc|jsle|jsls|jslt|jsmi|jsne|jsnr|jspl|jsnn|jsclr|jset|jsr|jsset|lsl|lsr|lua|mac|macr|move|movec|movem|movep|mpy|mpyr|neg|nop|norm|not|or|ori|rep|reset|rnd|rol|ror|rti|rts|sbc|stop|sub|subl|subr|swi|tcc|ths|tcs|tls|tec|teq|tes|tge|tgt|tlc|tle|tls|tlt|tmi|tne|tnr|tpl|snn|tfr|tst|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;font-weight:bold')) return this.pop();
            if((m = /^(?:endif|endc|else|ifne|if|ifeq|ifle|iflt|ifge|ifgt|include|incbin|printval|pass1val|pass2val|fail|endm|end|org|ds|dsm|list|nolist|macro|dc|equ)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;font-weight:bold')) return this.pop();
            if((m = /^[A-Za-z][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if((m = /^_[A-Za-z_][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if(this.str[0] == ';' && this.hl(';', 'dsComment;font-style:normal')) {if(m = this['asm-dsp56k_comment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment;font-style:normal')) {if(m = this['asm-dsp56k_comment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsDataType')) {if(m = this['asm-dsp56k_constant']())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsBaseN')) {if(m = this['asm-dsp56k_number16']())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsBaseN')) {if(m = this['asm-dsp56k_number2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '@' && this.hl('@', 'dsBaseN')) {if(m = this['asm-dsp56k_number8']())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this['asm-dsp56k_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'asm-dsp56k_comment': function asmdsp56k_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;font-style:normal');
        }
        this.pop();
    },
    'asm-dsp56k_string': function asmdsp56k_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'asm-dsp56k_constant': function asmdsp56k_constant(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-dsp56k_operators']())return this.pop(), m-1;continue;}
            if((m = /^\$[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-dsp56k_operators']())return this.pop(), m-1;continue;}
            if((m = /^@[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-dsp56k_operators']())return this.pop(), m-1;continue;}
            if((m = /^%[01]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-dsp56k_operators']())return this.pop(), m-1;continue;}
            if((m = /^[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this['asm-dsp56k_operators']())return this.pop(), m-1;continue;}
            if((m = /^\.[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this['asm-dsp56k_operators']())return this.pop(), m-1;continue;}
            if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    'asm-dsp56k_operators': function asmdsp56k_operators(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsNormal')) return this.pop();
            if(this.str[0] == '&' && this.hl('&', 'dsNormal')) return this.pop();
            if(this.str[0] == '^' && this.hl('^', 'dsNormal')) return this.pop();
            if(this.str[0] == '*' && this.hl('*', 'dsNormal')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) return this.pop();
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if(this.str[0] == '+' && this.hl('+', 'dsNormal')) return this.pop();
            if(this.str[0] == '-' && this.hl('-', 'dsNormal')) return this.pop();
            if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return this.pop();
            if(this.str[0] == '~' && this.hl('~', 'dsNormal')) return this.pop();
            if(this.str[0] == '!' && this.hl('!', 'dsNormal')) return this.pop();
            if(this.str[0] == '%' && this.hl('%', 'dsNormal')) return this.pop();
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsNormal')) return this.pop();
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsNormal')) return this.pop();
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) return this.pop(), 1;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'asm-dsp56k_number16': function asmdsp56k_number16(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    'asm-dsp56k_number2': function asmdsp56k_number2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    'asm-dsp56k_number8': function asmdsp56k_number8(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    }
};
