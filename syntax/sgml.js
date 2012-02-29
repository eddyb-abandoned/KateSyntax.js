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
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._attribute();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._attribute = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._value();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._value2();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._value2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
