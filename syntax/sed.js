var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._beginningOfLine();
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
HL.prototype._beginningOfLine = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^(/)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._firstAddressRegex();continue;}
        if((m = /^\\(\S)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._firstAddressRegex();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._afterFirstAddress();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsOthers')) {this._afterFirstAddress();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._afterCommand();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsFunction')) {this._label();continue;}
        if(this.str[0] == '!' && this.hl('!', 'dsOthers')) {this._command();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {this._sCommand();continue;}
        if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {this._yCommand();continue;}
        if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._afterCommand();continue;}
        if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aICCommand();continue;}
        if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._bTCommand();continue;}
        if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._wRCommand();continue;}
        if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._lCommand();continue;}
        if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._qCommand();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._beginningOfLine();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._firstAddressRegex = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._afterFirstAddress();continue;}
        if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
        if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
        if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._afterFirstAddress = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '!' && this.hl('!', 'dsOthers')) {this._command();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {this._secondAddress();continue;}
        if(this.str[0] == '~' && this.hl('~', 'dsNormal')) {this._step();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {this._sCommand();continue;}
        if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {this._yCommand();continue;}
        if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._afterCommand();continue;}
        if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aICCommand();continue;}
        if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._bTCommand();continue;}
        if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._wRCommand();continue;}
        if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._lCommand();continue;}
        if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._qCommand();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._beginningOfLine();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._afterFirstAddress2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {this._secondAddress();continue;}
        if(this.str[0] == '~' && this.hl('~', 'dsNormal')) {this._step();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {this._sCommand();continue;}
        if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {this._yCommand();continue;}
        if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._afterCommand();continue;}
        if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aICCommand();continue;}
        if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._bTCommand();continue;}
        if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._wRCommand();continue;}
        if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._lCommand();continue;}
        if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._qCommand();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._beginningOfLine();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._secondAddress = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(/)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._secondAddressRegex();continue;}
        if((m = /^\\(\S)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._secondAddressRegex();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._afterSecondAddress();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsOthers')) {this._afterSecondAddress();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._secondAddressRegex = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._afterSecondAddress();continue;}
        if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
        if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
        if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._afterSecondAddress = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '!' && this.hl('!', 'dsOthers')) {this._command();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {this._sCommand();continue;}
        if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {this._yCommand();continue;}
        if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._afterCommand();continue;}
        if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aICCommand();continue;}
        if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._bTCommand();continue;}
        if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._wRCommand();continue;}
        if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._lCommand();continue;}
        if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._qCommand();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._beginningOfLine();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._step = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._command();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._command = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {this._sCommand();continue;}
        if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {this._yCommand();continue;}
        if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._afterCommand();continue;}
        if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aICCommand();continue;}
        if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._bTCommand();continue;}
        if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._wRCommand();continue;}
        if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._lCommand();continue;}
        if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._qCommand();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._beginningOfLine();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(\S)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._sRegex();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sRegex = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(%1)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._sReplacement();continue;}
        if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
        if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
        if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._sReplacement = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._sFlags();continue;}
        if((m = /^\\[0-9LlUuE\\&]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._sFlags = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[gpeIiMm]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == 'w' && this.hl('w', 'dsDataType')) {this._wFlag();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {this._beginningOfLine();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._afterCommand();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._wFlag = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\S+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._sFlags();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._yCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(\S)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._ySourceList();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ySourceList = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(%1)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._yDestList();continue;}
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._yDestList = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._afterCommand();continue;}
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._aICCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._literalText();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._literalText = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers')) {this._literalText();continue;}
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._literalText();continue;}
        if(this.str[0] == '\\' && this.hl('\\', 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._bTCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._afterCommand();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {this._beginningOfLine();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._afterCommand();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._wRCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\S+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._afterCommand();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._afterCommand();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {this._beginningOfLine();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._afterCommand();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._qCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._afterCommand();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {this._beginningOfLine();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._afterCommand();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._label = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._afterCommand();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._afterCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {this._beginningOfLine();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._afterCommand();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._regex = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
        if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
        if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._error = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsError');
    }
};
