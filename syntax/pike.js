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
        if((m = /^(?:break|case|class|continue|default|do|else|for|foreach|if|return|switch|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:array|float|function|int|mapping|mixed|multiset>|object|program|static|string|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:catch|gauge|sscanf|typeof)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^`([\+\-\*/%~&\|^]|[!=<>]=|<<?|>>?|(\[\]|->)=?)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[bB][01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._lineComment();continue;}
        if(this.str[0] == '#!' && this.hl('#!', 'dsComment')) {this._lineComment();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._blockComment();continue;}
        if((m = /^#\s*if\s+0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._outscoped();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsOthers')) {this._preprocessor();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\d[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._lineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO|NOT(IC)?E):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._blockComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(FIXME|TODO|NOT(IC)?E):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._lineComment();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._blockComment();continue;}
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._outscoped = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO|NOT(IC)?E):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._blockComment();continue;}
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*(endif|elif|else)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._outscopedIntern = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._blockComment();continue;}
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
