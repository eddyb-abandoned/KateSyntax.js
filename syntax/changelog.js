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
        if(this.str[0] == '*' && this.hl('*', 'dsDecVal')) {this._entry();continue;}
        if((m = /^\d\d\d\d\s*-\s*\d\d\s*-\s*\d\d\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._line();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._line = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(\w\s*)+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^<.*>\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._entry = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^.*:/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
