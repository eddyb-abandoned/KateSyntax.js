var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._keyword();
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
HL.prototype._keyword = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:#set|#foreach|#end|#if|#else|#elseif|#parse|#macro|#stop|#include)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[[a-zA-Z0-9_]*\])*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\$\{[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[[a-zA-Z0-9_]*\])*\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\$!\{[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[[a-zA-Z0-9_]*\])*\}./.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[([0-9]*|"[a-zA-Z_]*")|'[a-zA-Z_]*'|\])*(->[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*(\[[a-zA-Z0-9_]*\])*(\[([0-9]*|"[a-zA-Z_]*")|'[a-zA-Z_]*'|\])*)*\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\-]*(\[[a-zA-Z0-9_]*\])*\.[a-zA-Z0-9_\x7f-\xff\-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[(),[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '#' && this.str[1] == '#' && this.hl('##', 'dsComment')) {this._singlelineComment();continue;}
        if(this.str[0] == '#' && this.str[1] == '*' && this.hl('#*', 'dsComment')) {this._multilinecomment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._singlelineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multilinecomment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '#' && this.hl('*#', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
