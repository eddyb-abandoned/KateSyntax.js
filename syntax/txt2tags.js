var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._context();
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
HL.prototype._context = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%%date(\(.*\))?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^%.*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^\*\*//(.*)//\*\*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^//\*\*(.*)\*\*///.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^\*\*.*\*\*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^//.*///.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^__.*__/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^--.*--/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^``.*``/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^``` .*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *=[^=].*[^=]=(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *==[^=].*[^=]==(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *===[^=].*[^=]===(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *====[^=].*[^=]====(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *=====[^=].*[^=]=====(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\+[^=].*[^=]\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\+\+[^=].*[^=]\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\+\+\+[^=].*[^=]\+\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\+\+\+\+[^=].*[^=]\+\+\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\+\+\+\+\+[^=].*[^=]\+\+\+\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^ *\|\| .*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\| .*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\: .*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\- .*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^ *\+ .*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^\t.*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^\s*([_=-]{20,})\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        if((m = /^$(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._context();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
