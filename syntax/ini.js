var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._ini();
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
HL.prototype._ini = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^(?:On|Off|Default|Defaults|Localhost|Null|True|False|Yes|No|Normal|E_ALL|E_ERROR|E_WARNING|E_PARSE|E_NOTICE|E_STRICT|E_CORE_ERROR|E_CORE_WARNING|E_COMPILE_ERROR|E_COMPILE_WARNING|E_USER_ERROR|E_USER_WARNING|E_USER_NOTICE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
