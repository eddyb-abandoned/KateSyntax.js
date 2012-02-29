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
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsFunction')) {this._detectDirective();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectComments = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectOthers = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectEscape = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\(\*|n[+-]?)&roffid;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^\\[fF]&roffid;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^\\f([0-9]|\([0-9][0-9]|\[[0-9]+\])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^\\s(\[([1-3][0-9]|[04-9])\]|[04-9]|[+-][0-9]|([+-]?\(|\([+-])[0-9][0-9])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) return;
        if((m = /^\\(\$[0-9*@]|[.:% |^{}_!?@)/,&:~0acdeEprtu])/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if((m = /^\\[AbBDowXZ]&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._argument();continue;}
        if((m = /^\\[gkmMVYz]&roffid;/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if((m = /^\\O([0-4]|\[5[lrci][^]]\])/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if((m = /^\\[hHSvx]&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._measurement();continue;}
        if((m = /^\\[lL]&argsep1;|?/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._measurement();continue;}
        if((m = /^\\R&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._argument();continue;}
        if((m = /^\\C&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._glyphArgument();continue;}
        if((m = /^\\N&argsep2;[0-9]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^\\&roffid;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if(this.str[0] == '\\' && this.hl('\\', 'dsError')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._detectDirective = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:br|sp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._directive();continue;}
        if((m = /^(?:)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._directive();continue;}
        if((m = /^(?:)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._directive();continue;}
        if((m = /^\s*ds\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._dsDirective();continue;}
        if((m = /^\s*de\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._deDirective();continue;}
        if((m = /^\s*da(?=\s+[A-Za-z]+)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._daDirective();continue;}
        if((m = /^\s*di(?=\s+[A-Za-z]+)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._diDirective();continue;}
        if((m = /^\s*[A-Za-z]+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._directive();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._error = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._directive = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._literalSL = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._literalIL = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._argument = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._#pop#pop();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._glyphArgument = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._measurement = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._deDirective = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._deBody = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsFunction')) {this._#pop#pop();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsFunction')) {this._detectDirective();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._diDirective = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._diBody = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\.\s*di\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._#pop#pop();continue;}
        if(this.str[0] == '\\' && this.str[1] == '!' && this.hl('\\!', 'dsChar')) {this._literalSL();continue;}
        if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) {this._literalIL();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsFunction')) {this._detectDirective();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._daDirective = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._daBody = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\.\s*da\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._#pop#pop();continue;}
        if(this.str[0] == '\\' && this.str[1] == '!' && this.hl('\\!', 'dsChar')) {this._literalSL();continue;}
        if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) {this._literalIL();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsFunction')) {this._detectDirective();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._dsDirective = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._dsString();continue;}
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._dsString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\\') {this._detectEscape();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
