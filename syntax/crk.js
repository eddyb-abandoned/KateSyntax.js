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
        if((m = /^(?:break|catch|class|continue|else|false|for|if|in|is|null|oper|return|this|true|try|typeof|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^import/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._package();continue;}
        if((m = /^(?:bool|byte|int32|int64|uint32|uint64|float32|float64|int|uint|intz|uintz|float|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singleQuotedString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._backtickString();continue;}
        if(this.str[0] == 'b' && this.str[1] == '\'' && this.hl('b\'', 'dsChar')) {this._char();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar3();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._member();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singleQuotedString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._backtickString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._char = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._subst = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return;
        if((m = /^(?:break|catch|class|continue|else|false|for|if|in|is|null|oper|return|this|true|try|typeof|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^import/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._package();continue;}
        if((m = /^(?:bool|byte|int32|int64|uint32|uint64|float32|float64|int|uint|intz|uintz|float|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singleQuotedString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._backtickString();continue;}
        if(this.str[0] == 'b' && this.str[1] == '\'' && this.hl('b\'', 'dsChar')) {this._char();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar3();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._member();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._shortSubst = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\w(?!\w)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._package = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[\w\\.]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._member = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
