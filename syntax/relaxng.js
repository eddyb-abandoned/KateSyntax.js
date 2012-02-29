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
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._tagname();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectEntRef = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tagname = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:anyName|attribute|choice|data|define|div|element|empty|except|externalRef|grammar|group|include|interleave|list|mixed|name|notAllowed|nsName|oneOrMore|optional|param|parentRef|ref|start|text|value|zeroOrMore)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._attributes();continue;}
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._attributes();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._attributes = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._attrValue();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._attrValue = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsError')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._#pop#pop();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
