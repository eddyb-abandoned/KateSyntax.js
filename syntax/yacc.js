var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._preStart();
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
HL.prototype._preStart = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsBaseN')) {this._cDeclarations();continue;}
        if(/^./.exec(this.str)) {this._declarations();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cDeclarations = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._declarations = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if((m = /^%union/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._unionStart();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsBaseN')) {this._rules();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsBaseN')) {this._cDeclarations();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {this._percentCommand();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._unionStart = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._unionIn();continue;}
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsAlert')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._unionIn = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._unionInIn();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._unionInIn = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._unionInIn();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsBaseN')) {this._userCode();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsNormal')) {this._ruleIn();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ruleIn = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._normalCBloc();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsNormal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) {this._char();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._userCode = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._percentCommand = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        if(/^\W/.exec(this.str)) {this._percentCommandIn();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._percentCommandIn = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) {this._char();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsDataType')) {this._pCType();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._pCType = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentStar();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlash();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentStar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
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
HL.prototype._stringOrChar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) {this._char();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._char = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._normalCBloc = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._normalCBloc();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if(this.str[0] == '$' && this.hl('$', 'dsKeyword')) {this._dol();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._dol = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<[^>]+>/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._dolEnd();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._dolEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
