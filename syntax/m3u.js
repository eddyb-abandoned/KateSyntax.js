var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._m3U();
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
HL.prototype._m3U = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#EXTM3U/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^#EXTINF/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._findEXTINF();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findEXTINF = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^:\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^,.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
