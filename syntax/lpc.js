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
        if((m = /^//\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^//\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment2();continue;}
        if((m = /^(?:private|protected|static|public|nomask|varargs|nosave|virtual)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:void|int|status|string|object|array|mapping|closure|symbol|float|mixed)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:break|continue|return|if|else|for|foreach|do|while|switch|case|inherit|default|variables|functions|publish|nolog)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0b[01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0o[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^#'[^\t ][^\t ,);}\]/]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string1();continue;}
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^(?:FIXME|HACK|NOTE|NOTICE|TODO|WARNING|###)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(?:FIXME|HACK|NOTE|NOTICE|TODO|WARNING|###)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment2();continue;}
        if((m = /^(?:private|protected|static|public|nomask|varargs|nosave|virtual)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:void|int|status|string|object|array|mapping|closure|symbol|float|mixed)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:break|continue|return|if|else|for|foreach|do|while|switch|case|inherit|default|variables|functions|publish|nolog)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._string1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
