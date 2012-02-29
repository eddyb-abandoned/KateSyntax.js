var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._device();
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
HL.prototype._device = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsKeyword')) {this._comment();continue;}
        if((m = /^[\s]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mount_point();continue;}
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._mount_point = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsDataType')) {this._comment();continue;}
        if((m = /^[\s]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this.__type();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) {this._device();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype.__type = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._comment();continue;}
        if((m = /^[\S]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._type();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._device();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._type = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsFunction')) {this._comment();continue;}
        if((m = /^[\s]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._options();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsFunction')) {this._device();continue;}
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._options = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsKeyword')) {this._comment();continue;}
        if((m = /^[\s]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dump();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsKeyword')) {this._device();continue;}
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._dump = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsDecVal')) {this._comment();continue;}
        if((m = /^[\s]*/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._pass();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDecVal')) {this._device();continue;}
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._pass = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsDecVal')) {this._comment();continue;}
        if((m = /^[\s]*/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this.___error();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDecVal')) {this._device();continue;}
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype.___error = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsDecVal')) {this._comment();continue;}
        if((m = /^[\S]*/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._error();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDecVal')) {this._device();continue;}
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._error = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsError')) {this._device();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
