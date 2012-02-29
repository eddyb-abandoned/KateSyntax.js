var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._main();
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
HL.prototype._main = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:allow|apply|copy|condition|deny|extends|graph|linear|profile|rule|ruleset|search|unsafe)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) {this._ordered();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._unordered();continue;}
        if(this.str[0] == '%{' && this.hl('%{', 'dsBaseN')) {this._header();continue;}
        if(this.str[0] == '%%' && this.hl('%%', 'dsBaseN')) {this._header();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._header = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(this.str[0] == '%}' && this.hl('%}', 'dsBaseN')) return;
        if(this.str[0] == '%%' && this.hl('%%', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ordered = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:allow|apply|copy|condition|deny|extends|graph|linear|profile|rule|ruleset|search|unsafe)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(this.str[0] == '$$' && this.hl('$$', 'dsKeyword')) continue;
        if((m = /^\$-?[_a-zA-Z1-9][_a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) {this._ordered();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._unordered();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._unordered = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:allow|apply|copy|condition|deny|extends|graph|linear|profile|rule|ruleset|search|unsafe)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(this.str[0] == '$$' && this.hl('$$', 'dsKeyword')) continue;
        if((m = /^\$-?[_a-zA-Z1-9][_a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) {this._ordered();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._unordered();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._accessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '$$' && this.hl('$$', 'dsKeyword')) continue;
        if((m = /^\$-?[_a-zA-Z1-9][_a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentStar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentSlash = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\\](?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
