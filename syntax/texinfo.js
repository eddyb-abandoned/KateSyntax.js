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
        if((m = /^@c(omment)?\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._singleLineComment();continue;}
        if((m = /^@ignore\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^@node\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._nodeFolding();continue;}
        if((m = /^@(menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._folding();continue;}
        if((m = /^@[\w]+(\{([\w]+[\s]*)+\})?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._singleLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multiLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^@end ignore/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._nodeFolding = function() {
    var m;
    while(this.pos < this.len) {
        if(/^@node\b/.exec(this.str)) return;
        if((m = /^@c(omment)?\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._singleLineComment();continue;}
        if((m = /^@ignore\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^@node\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._nodeFolding();continue;}
        if((m = /^@(menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._folding();continue;}
        if((m = /^@[\w]+(\{([\w]+[\s]*)+\})?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._folding = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^@end (menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if((m = /^@c(omment)?\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._singleLineComment();continue;}
        if((m = /^@ignore\b/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^@node\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._nodeFolding();continue;}
        if((m = /^@(menu|smallexample|table|multitable)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._folding();continue;}
        if((m = /^@[\w]+(\{([\w]+[\s]*)+\})?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
