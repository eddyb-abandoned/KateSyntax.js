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
        if((m = /^[A-Za-z0-9_.$]+:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:adc|add|adiw|and|andi|asr|bclr|bld|brbc|brbs|brcc|brcs|break|breq|brge|brhc|brhs|brid|brie|brlo|brlt|brmi|brne|brpl|brsh|brtc|brts|brvc|brvs|bset|bst|call|cbi|cbr|clc|clh|cli|cln|clr|cls|clt|clv|clz|com|cp|cpc|cpi|cpse|dec|eicall|eijmp|elpm|eor|fmul|fmuls|fmulsu|icall|ijmp|in|inc|jmp|ld|ldd|ldi|lds|lpm|lsl|lsr|mov|movw|mul|muls|mulsu|neg|nop|or|ori|out|pop|push|rcall|ret|reti|rjmp|rol|ror|sbc|sbr|sbrc|sbrs|sec|seh|sbi|sbci|sbic|sbis|sbiw|sei|sen|ser|ses|set|sev|sez|sleep|spm|st|std|sts|sub|subi|swap|tst|wdr)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0[bB][01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^0[fFeEdD][-+]?[0-9]*\.?[0-9]*[eE]?[-+]?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[A-Za-z_.$][A-Za-z0-9_.$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'(\\x[0-9a-fA-F][0-9a-fA-F]?|\\[0-7]?[0-7]?[0-7]?|\\.|.)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '@' && this.hl('@', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsComment')) {this._commentar2();continue;}
        if((m = /^[!#%&*()+,\-<=>?/:[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._someContext();continue;}
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._someContext = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
