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
        if((m = /^(?:import|from|as|namespace)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:abstract|virtual|override|static|final|transient|macro|protected|private|public|internal|partial|class|struct|interface|enum|callable|of|def|constructor|destructor|do|get|set|event|return|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:and|assert|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:and|break|cast|continue|elif|else|except|ensure|for|given|goto|if|in|is|isa|not|or|otherwise|pass|raise|try|unless|when|while|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:assert|__eval__|__switch__|enumerate|filter|len|typeof|map|max|min|property|using|getter|required|lock|range|zip|checked|unchecked|rawArrayIndexing|normalArrayIndexing|print|array|matrix|yieldAll)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:null|self|super)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:bool|byte|sbyte|double|decimal|single|short|ushort|int|char|uint|long|ulong|object|duck|string|regex|date|timespan)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^([0-9]+\.[0-9]*|\.[0-9]+)([eE][0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^([1-9][0-9]*([eE][0-9]+)?|0)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[1-9][0-9]*([eE][0-9.]+)?[Ll]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^0[Xx][0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^0[1-9][0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[rR]'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleAString();continue;}
        if((m = /^[rR]"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleQString();continue;}
        if((m = /^[rR]'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawAString();continue;}
        if((m = /^[rR]"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawQString();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^^\s*u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleAComment();continue;}
        if((m = /^^\s*u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleQComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlashSlash();continue;}
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._parenthesised();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^\[|/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._quasiQuotation();continue;}
        if((m = /^|]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[+*/%\|=;\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._parenthesised = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:import|from|as|namespace)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:abstract|virtual|override|static|final|transient|macro|protected|private|public|internal|partial|class|struct|interface|enum|callable|of|def|constructor|destructor|do|get|set|event|return|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:and|assert|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:and|break|cast|continue|elif|else|except|ensure|for|given|goto|if|in|is|isa|not|or|otherwise|pass|raise|try|unless|when|while|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:assert|__eval__|__switch__|enumerate|filter|len|typeof|map|max|min|property|using|getter|required|lock|range|zip|checked|unchecked|rawArrayIndexing|normalArrayIndexing|print|array|matrix|yieldAll)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:null|self|super)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:bool|byte|sbyte|double|decimal|single|short|ushort|int|char|uint|long|ulong|object|duck|string|regex|date|timespan)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^([0-9]+\.[0-9]*|\.[0-9]+)([eE][0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^([1-9][0-9]*([eE][0-9]+)?|0)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[1-9][0-9]*([eE][0-9.]+)?[Ll]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^0[Xx][0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^0[1-9][0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[rR]'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleAString();continue;}
        if((m = /^[rR]"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleQString();continue;}
        if((m = /^[rR]'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawAString();continue;}
        if((m = /^[rR]"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawQString();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^^\s*u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleAComment();continue;}
        if((m = /^^\s*u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleQComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlashSlash();continue;}
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._parenthesised();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^\[|/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._quasiQuotation();continue;}
        if((m = /^|]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[+*/%\|=;\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._quasiQuotation = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:import|from|as|namespace)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:abstract|virtual|override|static|final|transient|macro|protected|private|public|internal|partial|class|struct|interface|enum|callable|of|def|constructor|destructor|do|get|set|event|return|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:and|assert|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:and|break|cast|continue|elif|else|except|ensure|for|given|goto|if|in|is|isa|not|or|otherwise|pass|raise|try|unless|when|while|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:assert|__eval__|__switch__|enumerate|filter|len|typeof|map|max|min|property|using|getter|required|lock|range|zip|checked|unchecked|rawArrayIndexing|normalArrayIndexing|print|array|matrix|yieldAll)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:null|self|super)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:bool|byte|sbyte|double|decimal|single|short|ushort|int|char|uint|long|ulong|object|duck|string|regex|date|timespan)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^([0-9]+\.[0-9]*|\.[0-9]+)([eE][0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^([1-9][0-9]*([eE][0-9]+)?|0)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[1-9][0-9]*([eE][0-9.]+)?[Ll]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^0[Xx][0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^0[1-9][0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[rR]'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleAString();continue;}
        if((m = /^[rR]"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleQString();continue;}
        if((m = /^[rR]'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawAString();continue;}
        if((m = /^[rR]"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawQString();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^^\s*u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleAComment();continue;}
        if((m = /^^\s*u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleQComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSlashSlash();continue;}
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._parenthesised();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^\[|/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._quasiQuotation();continue;}
        if((m = /^|]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[+*/%\|=;\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._trippleAComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._trippleQComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._trippleAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawTrippleAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._trippleQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawTrippleQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentSlashSlash = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._singleAComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._singleQComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._singleAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singleQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%\([a-zA-Z0-9_]+\)[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
