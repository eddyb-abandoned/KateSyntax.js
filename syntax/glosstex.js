var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._comment();
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
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^@entry/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._entry();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._entry = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._label();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._text();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._label = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {this._abbrev();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._text();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._abbrev = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{[^\{\}]*\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {this._full();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._text();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._full = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{[^\{\}]*\}/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._text();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._text = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsNormal');
    }
};
