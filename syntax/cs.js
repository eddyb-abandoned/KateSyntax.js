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
        if((m = /^(?:abstract|as|base|break|case|catch|class|checked|continue|default|delegate|do|else|enum|event|explicit|extern|false|for|foreach|finally|fixed|goto|if|implicit|in|interface|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|struct|switch|this|throw|true|try|typeof|unchecked|unsafe|using|virtual|while|#if|#else|#elif|#endif|#define|#undef|#warning|#error|#line)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bool|byte|char|const|decimal|double|float|int|long|object|uint|ushort|ulong|sbyte|short|string|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\bpartial(?=\s+(class|struct|interface|void))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bvar(?=\s+\w+\s*=\s*\w+)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\byield(?=\s+(return|break))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(set|get)(?=\s*[;{])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bglobal(?=\s*::\s*\w+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^#region.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^#endregion.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._member();continue;}
        if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._member = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
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
