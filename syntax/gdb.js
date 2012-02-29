var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._apache();
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
HL.prototype._apache = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._stackframe();continue;}
        if((m = /^\[KCrash Handler]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^Thread/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._thread();continue;}
        if((m = /^\[Current thread/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._thread();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._oneliners = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\[KCrash Handler]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^Thread/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._thread();continue;}
        if((m = /^\[Current thread/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._thread();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stackframe = function() {
    var m;
    while(this.pos < this.len) {
        if(/^((?:[^ ]|<.+>)+::)?([^ :]+)\s*\(/.exec(this.str)) {this._identifier();continue;}
        if((m = /^at/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._file();continue;}
        if((m = /^from/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._file();continue;}
        if((m = /^\[KCrash Handler]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^Thread/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._thread();continue;}
        if((m = /^\[Current thread/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._thread();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._identifier = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^%2/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\b0x0\b/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._file = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ':' && this.hl(':', 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._thread = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
