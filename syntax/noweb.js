var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._rawDocumentation();
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
HL.prototype._rawDocumentation = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^<<.*>>=(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._codeSection();continue;}
        if(this.str[0] == '@[' && this.hl('@[', 'dsNormal')) continue;
        if(this.str[0] == '[[' && this.hl('[[', 'dsRegionMarker')) {this._codeQuote();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._codeQuote = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '@]' && this.hl('@]', 'dsNormal')) continue;
        if((m = /^\]\](?!\])/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) return;
        if((m = /^@<</.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<<.*[^@]>>(?!=)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._codeSection = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^@(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._rawDocumentation();continue;}
        if((m = /^^@(?=[\s%])/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._rawDocumentation();continue;}
        if(/^^<<.*>>=(?=$|\n)/.exec(this.str)) {this._rawDocumentation();continue;}
        if((m = /^@<</.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<<.*[^@]>>(?!=)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectionNames = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^@<</.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<<.*[^@]>>(?!=)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
