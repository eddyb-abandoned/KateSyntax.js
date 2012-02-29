var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._text();
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
HL.prototype._text = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(_ *)?"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^ *<</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._luastring();continue;}
        if((m = /^(?:#textdomain|#else|#undef|#error|#warning)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^(?:#define|#ifdef|#ifndef|#ifhave|#ifnhave|#ifver|#ifnver)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^(?:#enddef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {this._macro();continue;}
        if((m = /^\[(?!/)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._section();continue;}
        if((m = /^\[//.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._section();continue;}
        if(/^(\w|,| )+=/.exec(this.str)) {this._value();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {this._variableSubstitution();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {this._macro();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {this._variableSubstitution();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._luastring = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^>>/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._luamacrostring = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^>>/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:wmllint|wmlindent|wmlscope|po)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._macro = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {this._macro();continue;}
        if((m = /^(_ *)?"/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._macroString();continue;}
        if((m = /^ *<</.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._luamacrostring();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsChar')) {this._macroString2();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsFunction')) return;
        if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {this._variableSubstitution();continue;}
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._macroString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsChar')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {this._macro();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {this._variableSubstitution();continue;}
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._macroString2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsChar')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {this._macro();continue;}
        if((m = /^(_ *)?"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^ *<</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._luastring();continue;}
        if((m = /^(?:#textdomain|#else|#undef|#error|#warning)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^(?:#define|#ifdef|#ifndef|#ifhave|#ifnhave|#ifver|#ifnver)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^(?:#enddef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {this._macro();continue;}
        if((m = /^\[(?!/)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._section();continue;}
        if((m = /^\[//.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._section();continue;}
        if(/^(\w|,| )+=/.exec(this.str)) {this._value();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {this._variableSubstitution();continue;}
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._section = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsKeyword')) {this._error();continue;}
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._error = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsError')) return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._variableSubstitution = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) return;
        if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {this._variableSubstitution();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsBaseN')) {this._variableSubscript();continue;}
        if(/^[^A-Za-z0-9_\.]/.exec(this.str)) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDecVal')) return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._variableSubscript = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsBaseN')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsBaseN')) {this._error();continue;}
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._variableSubstitutionRule = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {this._variableSubstitution();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDecVal')) return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
