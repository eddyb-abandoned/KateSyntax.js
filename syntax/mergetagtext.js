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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(this.str[0] == '!{' && this.hl('!{', 'dsComment')) {this._secComment();continue;}
        if(this.str[0] == '!<' && this.hl('!<', 'dsComment')) {this._tagCommentType();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._sectionIdentifier();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._tagType();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._sectionIdentifier = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._secComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsComment')) return;
        if(this.str[0] == '{' && this.hl('{', 'dsComment')) {this._secComment();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._tagType = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._tagID();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._tagID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '=' && this.hl('=', 'dsKeyword')) {this._tagData();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._tagData = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) {this._charLiteral();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[bB][01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^0[oO][0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tagErrors = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tagCommentType = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsComment')) {this._tagCommentID();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._tagCommentID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '=' && this.hl('=', 'dsComment')) {this._tagCommentData();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._tagCommentData = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsComment')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsComment')) {this._commentChar();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsComment')) {this._commentString();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsComment')) return;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentChar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsComment')) return;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._charLiteral = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._charLiteralClosing();continue;}
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._charLiteralClosing();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsChar')) {this._charLiteralClosing();continue;}
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._charLiteralClosing = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsError')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
