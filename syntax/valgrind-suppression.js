var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._file();
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
HL.prototype._file = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._rule();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rule = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^[^\}]+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule2();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rule2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\w+:\w+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._rule3();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rule3 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^fun:|obj:|\.\.\./.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
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
