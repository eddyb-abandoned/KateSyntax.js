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
        if((m = /^\([23456789]:?[23456789]?:?[23456789]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^!.*?!/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\[[ABCGHILMNOQRSTUVZ]:/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._header();continue;}
        if((m = /^[ABCGHILMNOPQRSTUVZ]:/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._header2();continue;}
        if(this.str[0] == 'X' && this.str[1] == ':' && this.hl('X:', 'dsFloat')) {this._header();continue;}
        if((m = /^[|:[]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._bar();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
        if((m = /^[()]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[{}]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == 'W' && this.str[1] == ':' && this.hl('W:', 'dsDataType')) {this._lyrics();continue;}
        if(this.str[0] == 'w' && this.str[1] == ':' && this.hl('w:', 'dsDataType')) {this._lyrics();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsString')) {this._preprocessor();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^[_|\^]?[_|=|\^][A-Ga-g]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._lyrics = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._part = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._bar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsChar')) return;
        if((m = /^[A-Ga-gZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if(this.str[0] == ' ' && this.hl(' ', 'dsChar')) return;
        if((m = /^!.*?!/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[()]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^:*\|*[1-9]|/*\|/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._header = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^K:.+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if(this.str[0] == ']' && this.hl(']', 'dsFloat')) return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._header2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
