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
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:return|break|continue|throw|for|while|until|loop|if|else|unless|switch|when|then|and|or|in|of|by|is|isnt|not|typeof|delete|where|super|try|catch|finally|try|catch|finally|constructor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:class|extends|new|instanceof)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._class();continue;}
        if((m = /^(?:false|true|yes|no|on|off|undefined|null|NaN|Infinity)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:case|default|function|var|void|with|const|let|enum|export|import|native|__hasProp|__extends|__slice|__bind|__indexOf)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^(?:Object|Number|Boolean|Array|String|RegExp|Function|Date|Math|eval|setInterval|clearInterval|setTimeout|clearTimeout|isFinite|isNaN|parseFloat|parseInt|escape|unescape|console|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:window|document|navigator|location|history|screen|alert|prompt)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:process|GLOBAL|require|exports)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(@[_$a-zA-Z][$\w]+|\bthis)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(\((\'[^']*'|"[^"]*"|[^()])*\))?\s*(-|=)>/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[_$a-z][$\w]+\b/i.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._heredoc();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._richHeredoc();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._richString();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsAlert')) {this._javascript();continue;}
        if((m = /^###/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multilineComment();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^////.exec(this.str)) && this.hl(m[0], 'dsString')) {this._multilineRegex();continue;}
        if((m = /^/([^/\\\r\n]|\\.)*/[mig]{0,3}/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[():!%&+,\-/.*<=>?[\]|~\^;{}]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._multilineRegex = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^///[mig]{0,3}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._class = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[@$:.\w\[\]]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multilineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^###/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._richString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsChar')) {this._embedding();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._heredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._richHeredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsChar')) {this._embedding();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._embedding = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsChar')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._javascript = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '`' && this.hl('`', 'dsAlert')) return;
        this.hl(this.str[0], 'dsAlert');
    }
};
