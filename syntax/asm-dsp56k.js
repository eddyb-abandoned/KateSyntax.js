var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText();
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
HL.prototype._normalText = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[xylpXYLP]:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^(?:x|x0|x1|y|y0|y1|a2|a1|a0|a|a10|ab|b2|b1|b0|b|b10|ba)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:r0|r1|r2|r3|r4|r5|r6|r7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:n0|n1|n2|n3|n4|n5|n6|n7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:m0|m1|m2|m3|m4|m5|m6|m7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:la|lc|pc|ssh|ssl|omr|sr|sp|mr|ccr)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:abs|adc|add|addl|addr|and|andi|asl|asr|bchg|bclr|bset|btst|clr|cmp|cmpm|div|do|enddo|eor|illegal|jcc|jhs|jcs|jls|jec|jeq|jes|jge|jgt|jlc|jle|jls|jlt|jmi|jne|jnr|jpl|jnn|jclr|jmp|jscc|jshs|jscs|jsls|jsec|jseq|jses|jsge|jsgt|jslc|jsle|jsls|jslt|jsmi|jsne|jsnr|jspl|jsnn|jsclr|jset|jsr|jsset|lsl|lsr|lua|mac|macr|move|movec|movem|movep|mpy|mpyr|neg|nop|norm|not|or|ori|rep|reset|rnd|rol|ror|rti|rts|sbc|stop|sub|subl|subr|swi|tcc|ths|tcs|tls|tec|teq|tes|tge|tgt|tlc|tle|tls|tlt|tmi|tne|tnr|tpl|snn|tfr|tst|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:endif|endc|else|ifne|if|ifeq|ifle|iflt|ifge|ifgt|include|incbin|printval|pass1val|pass2val|fail|endm|end|org|ds|dsm|list|nolist|macro|dc|equ)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^^[A-Za-z][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if((m = /^^_[A-Za-z_][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == ';' && this.hl(';', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsDataType')) {this._constant();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsBaseN')) {this._number16();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsBaseN')) {this._number2();continue;}
        if(this.str[0] == '@' && this.hl('@', 'dsBaseN')) {this._number8();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._constant = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^\$[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^@[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^%[01]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._operators();continue;}
        if((m = /^\.[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._operators();continue;}
        if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._operators = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsNormal')) return;
        if(this.str[0] == '&' && this.hl('&', 'dsNormal')) return;
        if(this.str[0] == '^' && this.hl('^', 'dsNormal')) return;
        if(this.str[0] == '*' && this.hl('*', 'dsNormal')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) return;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if(this.str[0] == '+' && this.hl('+', 'dsNormal')) return;
        if(this.str[0] == '-' && this.hl('-', 'dsNormal')) return;
        if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return;
        if(this.str[0] == '~' && this.hl('~', 'dsNormal')) return;
        if(this.str[0] == '!' && this.hl('!', 'dsNormal')) return;
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) return;
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsNormal')) return;
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsNormal')) return;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._number16 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._number2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._number8 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
