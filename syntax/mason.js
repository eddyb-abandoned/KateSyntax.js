var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._hTML();
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
HL.prototype._hTML = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<\%method[^>]*>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._embeddedPerl();continue;}
        if((m = /^<%method>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._embeddedPerl();continue;}
        if((m = /^<%doc>/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._documentation();continue;}
        if((m = /^<%perl>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._embeddedPerl();continue;}
        if(this.str[0] == '<' && this.str[1] == '%' && this.hl('<%', 'dsKeyword')) {this._embeddedPerl();continue;}
        if(this.str[0] == '<' && this.str[1] == '&' && this.hl('<&', 'dsKeyword')) {this._methodCall();continue;}
        if((m = /^^%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._perlOneLiner();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._embeddedPerl = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '>' && this.hl('%>', 'dsKeyword')) return;
        if((m = /^<\/%perl>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^<\/%method>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:sub|bless|caller|cmp|print|echo|die|import|lt|le|local|last|!||||eq|ne|use|elsif|my|foreach|wantarray|push|pop|dbmclose|dbmopen|dump|each|ge|gt|split|open|close|eval|chomp|chop|unless|undef|next|unlink|new|and|not|no|ref|redo|require|tied|tie|untie|or|xor|continue|do|else|for|goto|if|return|switch|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^^#!.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsChar')) {this._string();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == 's' && this.str[1] == '/' && this.hl('s/', 'dsOthers')) {this._pattern2();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._pattern();continue;}
        if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\$\#?[a-zA-Z_]+[a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\s+\:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentar1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\$[a-zA-Z_]*[a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[\/\[\]dDwWsSnrtfb0\$@]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\^[\/\[\]]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[\/\[\]dDwWsSnrtfb0\$@]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\^[\/\[\]]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\//.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._pattern3();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern3 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[\/\[\]dDwWsSnrtfb0\$@]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\^[\/\[\]]?/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\/g?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._something = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '`' && this.hl('`', 'dsChar')) return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsChar')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._perlOneLiner = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:sub|bless|caller|cmp|print|echo|die|import|lt|le|local|last|!||||eq|ne|use|elsif|my|foreach|wantarray|push|pop|dbmclose|dbmopen|dump|each|ge|gt|split|open|close|eval|chomp|chop|unless|undef|next|unlink|new|and|not|no|ref|redo|require|tied|tie|untie|or|xor|continue|do|else|for|goto|if|return|switch|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^^#!.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '`' && this.hl('`', 'dsChar')) {this._something();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == 's' && this.str[1] == '/' && this.hl('s/', 'dsOthers')) {this._pattern2();continue;}
        if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\$\#?[a-zA-Z_]+[a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\s+\:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._documentation = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<\/%doc>/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._methodCall = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '&' && this.str[1] == '>' && this.hl('&>', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
