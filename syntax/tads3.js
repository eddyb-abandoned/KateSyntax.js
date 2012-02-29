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
        if((m = /^(?:abort|and|argcount|break|case|catch|class|construct|continue|default|definingobj|delegated|dictionary|do|else|enum|exit|export|extern|finalize|finally|for|foreach|function|goto|grammar|if|in|inherited|intrinsic|is|local|modify|new|nil|not|object|or|property|propertyset|replace|replaced|return|self|static|switch|targetobj|targetprop|template|throw|token|transient|true|try|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._valString();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._shortComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._longComment();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '"' && this.hl('\"', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'n' && this.hl('\n', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'r' && this.hl('\r', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 't' && this.hl('\t', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'b' && this.hl('\b', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == '^' && this.hl('\^', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'v' && this.hl('\v', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == ' ' && this.hl('\ ', 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsNormal')) {this._embedded();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._htmltag();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._valString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == ''' && this.hl('\'', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'n' && this.hl('\n', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'r' && this.hl('\r', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 't' && this.hl('\t', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'b' && this.hl('\b', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == '^' && this.hl('\^', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == 'v' && this.hl('\v', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == ' ' && this.hl('\ ', 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._htmltag();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._shortComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._longComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._shortComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._longCommentPreprocessor();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._longCommentPreprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._embedded = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._htmltag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
