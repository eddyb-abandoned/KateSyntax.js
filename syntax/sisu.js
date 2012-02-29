var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText();
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
HL.prototype._normalText = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:class|const)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^^(0~\S+|@\S+)\s.+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^^:?[A-C1-6]~.+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^~\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._footnote();continue;}
        if((m = /^\^~/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._endnote();continue;}
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        if((m = /^<br>/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\{.+?\}(http:\/\/\S+|image)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(^|\s)http:\/\/\S+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^^!_ .+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._boldline();continue;}
        if((m = /^^(_[12]|_\*|_[12]\*)\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\^/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^^%+\s.+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._footnote = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}~/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._bold = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}\*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._emphasis = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}!/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._italic = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}\//.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._underscore = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}_/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._superscript = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}\^/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._subscript = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\},/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._strike = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}-/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._insert();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._insert = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}\+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._emphasis();continue;}
        if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._bold();continue;}
        if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._italic();continue;}
        if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._underscore();continue;}
        if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._superscript();continue;}
        if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subscript();continue;}
        if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._strike();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._endnote = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._boldline = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._indent = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
