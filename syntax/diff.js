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
        if((m = /^&chunk;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._chunk();continue;}
        if((m = /^\*+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._rChunk();continue;}
        if((m = /^Only in .*:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^diff.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rFile();continue;}
        if((m = /^====.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(\*\*\*|\-\-\-).*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._file();continue;}
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        if(this.str[0] == '!' && this.hl('!', 'dsNormal')) {this._changedOld();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findDiff = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._file = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._chunk = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        if(/^&chunk;/.exec(this.str)) return;
        if(this.str[0] == '!' && this.hl('!', 'dsString')) {this._changedOld();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._chunkInFile = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        if(/^&chunk;/.exec(this.str)) return;
        if((m = /^&index;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(/^&file;/.exec(this.str)) return;
        if(this.str[0] == '!' && this.hl('!', 'dsString')) {this._changedOld();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rFile = function() {
    var m;
    while(this.pos < this.len) {
        if(/^(diff|Only in .*:).*(?=$|\n)/.exec(this.str)) return;
        if((m = /^&file;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\*+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._rChunkInFile();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rChunk = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\*\*\* .* \*\*\*\*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\-\-\- .* \-\-\-\-(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._rChunkNew();continue;}
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        if(/^&chunk;/.exec(this.str)) return;
        if(this.str[0] == '!' && this.hl('!', 'dsString')) {this._changedOld();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rChunkInFile = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\*\*\* .* \*\*\*\*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\-\-\- .* \-\-\-\-(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._rChunkInFileNew();continue;}
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        if(/^&chunk;/.exec(this.str)) return;
        if((m = /^&index;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(/^&file;/.exec(this.str)) return;
        if(this.str[0] == '!' && this.hl('!', 'dsString')) {this._changedOld();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rChunkNew = function() {
    var m;
    while(this.pos < this.len) {
        if(/^&chunk;/.exec(this.str)) {this._#pop#pop();continue;}
        if(this.str[0] == '!' && this.hl('!', 'dsOthers')) {this._changedNew();continue;}
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rChunkInFileNew = function() {
    var m;
    while(this.pos < this.len) {
        if(/^&chunk;/.exec(this.str)) {this._#pop#pop();continue;}
        if(/^&file;/.exec(this.str)) {this._#pop#pop();continue;}
        if(this.str[0] == '!' && this.hl('!', 'dsOthers')) {this._changedNew();continue;}
        if((m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._added();continue;}
        if((m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._removed();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._removed = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._added = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._changedOld = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._changedNew = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
