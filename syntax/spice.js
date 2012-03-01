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
        if((m = /^\B\.\w+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[$*]/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
