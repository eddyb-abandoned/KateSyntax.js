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
        if((m = /^(?:arg|drop|else|end|exit|forever|if|interpret|iterate|leave|nop|options|otherwise|pull|push|queue|return|say|select|syntax|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abbrev|abs|address|bitand|bitor|bitxor|b2x|center|charin|charout|chars|c2d|c2x|compare|condition|copies|datatype|date|delstr|delword|digits|d2c|d2x|errortext|form|format|fuzz|insert|lastpos|left|linein|lineout|lines|max|min|overlay|pos|queued|random|reverse|right|sign|sourceline|space|stream|strip|substr|subword|symbol|time|trace|translate|trunc|value|verify|word|wordindex|wordlength|wordpos|words|xrange|x2b|x2c|x2d)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\bsignal([\s]*(on|off)[\s]*(error|failure|halt|notready|novalue|syntax|lostdigits))*/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcall([\s]*(on|off)[\s]*(error|failure|halt|notready))*/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(trace|address)\s*[_\w\d]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bprocedure([\s]*expose)?/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdo([\s]*forever)?/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar1();continue;}
        if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(:])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
