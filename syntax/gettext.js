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
        if((m = /^^(msgid_plural|msgid|msgstr|msgctxt)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^#\./.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._automaticComment();continue;}
        if((m = /^#:/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._references();continue;}
        if((m = /^#,/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._flags();continue;}
        if((m = /^#|/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._previous();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._translatorComment();continue;}
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^\[\d+\]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._translatorComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNewComment();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOldComment();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._automaticComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNewComment();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOldComment();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._references = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNewComment();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOldComment();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._flags = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^fuzzy/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNewComment();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOldComment();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._stringDiffNewComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\+\}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringDiffOldComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^-\}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&([a-zA-Z0-9_.-]+|#[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNew();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOld();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._stringTag();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrap();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringTag = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNew();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOld();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsString')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrapSub();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringWrap = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(/^./.exec(this.str)) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._stringDiffNew = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\+\}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrapSub();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringDiffOld = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^-\}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrapSub();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringWrapSub = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(/^./.exec(this.str)) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._previous = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(msgctxt|msgid_plural|msgid|msgstr)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringPrevious();continue;}
        if((m = /^\[\d+\]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stringPrevious = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&([a-zA-Z0-9_.-]+|#[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNewPrevious();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOldPrevious();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._stringTagPrevious();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrapPrevious();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringTagPrevious = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffNewPrevious();continue;}
        if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._stringDiffOldPrevious();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsString')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrapSubPrevious();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringDiffNewPrevious = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\+\}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrapSubPrevious();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringDiffOldPrevious = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^-\}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringWrapSubPrevious();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringWrapPrevious = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[^#]/.exec(this.str)) {this._#pop#pop();continue;}
        if((m = /^(#\|)? *"/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(/^./.exec(this.str)) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._stringWrapSubPrevious = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[^#]/.exec(this.str)) {this._#pop#pop#pop();continue;}
        if((m = /^(#\|)? *"/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(/^./.exec(this.str)) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
