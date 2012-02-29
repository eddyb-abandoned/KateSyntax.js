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
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._pair();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) {this._array();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._pair = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._string_Key();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsNormal')) {this._value();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._string_Key = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return;
        if((m = /^\\(?:["\\/bfnrt]|u[0-9a-fA-f]{4})/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_Value();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._pair();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) {this._array();continue;}
        if(this.str[0] == '}') return;
        if(this.str[0] == ',') return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:null|true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^-?(?:[0-9]|[1-9][0-9]+)(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._string_Value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\\(?:["\\/bfnrt]|u[0-9a-fA-f]{4})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._array = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._pair();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) {this._array();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_Value();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:null|true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^-?(?:[0-9]|[1-9][0-9]+)(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
