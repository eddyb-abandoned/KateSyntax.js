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
        if((m = /^#if(\s+\w+)?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^#(else|elseif|end|error)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^(?:break|case|cast|catch|class|continue|default|else|enum|extends|false|for|function|if|implements|in|inline|interface|new|null|override|private|public|return|static|super|switch|this|throw|trace|true|try|typedef|untyped|var|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:package|import)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._moduleName();continue;}
        if((m = /^(?:Array|Void|Bool|Int|UInt|Float|Dynamic|String|List|Error|Unknown|Type)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._rawString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
        if((m = /^[\d][\d]*(\.(?!\.)[\d]*([eE][-+]?[\d]+)?)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^\.[\d][\d]*([eE][-+]?[\d]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^0[xX][\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._moduleName = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if((m = /^[^\s\w.:,]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rawString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\(u[\da-fA-F]{4}|U[\da-fA-F]{8}|&[a-zA-Z]\w+;)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentLine = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentBlock = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
