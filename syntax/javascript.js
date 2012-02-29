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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._region_marker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._region_marker();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b[\w\.]+\b\s*(?=:)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:if|else|for|in|while|do|continue|break|with|try|catch|finally|switch|case|new|var|function|return|delete|true|false|void|throw|typeof|const|default)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:escape|isFinite|isNaN|Number|parseFloat|parseInt|reload|taint|unescape|untaint|write)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:Anchor|Applet|Area|Array|Boolean|Button|Checkbox|Date|document|window|Image|FileUpload|Form|Frame|Function|Hidden|Link|MimeType|Math|Max|Min|Layer|navigator|Object|Password|Plugin|Radio|RegExp|Reset|Screen|Select|String|Text|Textarea|this|Window)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abs|acos|asin|atan|atan2|ceil|cos|ctg|E|exp|floor|LN2|LN10|log|LOG2E|LOG10E|PI|pow|round|sin|sqrt|SQRT1_2|SQRT2|tan)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:onAbort|onBlur|onChange|onClick|onError|onFocus|onLoad|onMouseOut|onMouseOver|onReset|onSelect|onSubmit|onUnload)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {this._objectMember();continue;}
        if((m = /^\b[\w\.]+(?=\.)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._objectMember();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) {this._string1();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._multiInlineComment();continue;}
        if((m = /^[=?:]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._(InternalRegexCatch)();continue;}
        if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._(InternalRegexCatch)();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[:!%&+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multiInlineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._regularExpression = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^/[ig]{0,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop#pop();continue;}
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\\[bB]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\\[nrtvfDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsBaseN')) {this._(charclassCaretFirstCheck)();continue;}
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\$(?=/)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[?+*()|]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._(InternalRegexCatch) = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^//(?=;)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._multiInlineComment();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._(regexCaretFirstCheck)();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._regularExpressionCharacterClass = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[\[\]]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsBaseN')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._(regexCaretFirstCheck) = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {this._regularExpression();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._(charclassCaretFirstCheck) = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {this._regularExpressionCharacterClass();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._region_marker = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsRegionMarker');
    }
};
HL.prototype._objectMember = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(/^[(){}:!%&+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
