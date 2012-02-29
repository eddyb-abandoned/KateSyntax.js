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
        if((m = /^(?:@article|@book|@booklet|@conference|@collection|@electronic|@inbook|@incollection|@inproceedings|@manual|@mastersthesis|@misc|@online|@patent|@periodical|@proceedings|@report|@phdthesis|@set|@thesis|@techreport|@unpublished|@www|@person|@company|@place)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._entry();continue;}
        if((m = /^@string/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._stringCommand();continue;}
        if((m = /^@preamble/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._preambleCommand();continue;}
        if((m = /^@comment/i.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preambleCommand = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._curlyBracket();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stringCommand = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._curlyBracket();continue;}
        if((m = /^&stringVariable;/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._curlyBracket();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._entry = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if((m = /^&refKeyFormat;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {this._field();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._field = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&fieldFormat;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._curlyBracket();continue;}
        if(this.str[0] == '}') return;
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._quotedText();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsNormal')) continue;
        if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&stringVariable;/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._curlyBracket = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._curlyBracket();continue;}
        if((m = /^&latexCmd;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^}(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._quotedText = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) return;
        if((m = /^&latexCmd;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
