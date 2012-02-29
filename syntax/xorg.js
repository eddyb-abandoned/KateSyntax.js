var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._xorg();
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
HL.prototype._xorg = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^Section/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._section();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._section = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._sectionContent();continue;}
        if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._sectionContent();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectionContent = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^EndSection/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._#pop#pop();continue;}
        if((m = /^EndSubSection/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._#pop#pop();continue;}
        if((m = /^SubSection/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._section();continue;}
        if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._keyword();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._keyword = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[\w\d]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsKeyword')) {this._comment();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
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
