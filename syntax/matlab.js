var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this.__normal();
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
HL.prototype.__normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z]\w*(?=')/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this.__adjoint();continue;}
        if((m = /^(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?[ij]?(?=')/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this.__adjoint();continue;}
        if((m = /^[\)\]}](?=')/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this.__adjoint();continue;}
        if((m = /^\.'(?=')/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this.__adjoint();continue;}
        if((m = /^'[^']*(''[^']*)*'(?=[^']|$)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^'[^']*(''[^']*)*/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:break|case|catch|classdef|continue|else|elseif|end|for|function|global|if|otherwise|parfor|persistent|return|spmd|switch|try|while|methods|properties|events)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^!.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[a-zA-Z]\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?[ij]?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[()[\]{}]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^==/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&&/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^||/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\.\*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\.\^/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\.\//.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\.'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[*+\-/\&|<>~\^=,;:@]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype.__adjoint = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
