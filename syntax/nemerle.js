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
        if((m = /^\/\//.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._singleLineComment();continue;}
        if((m = /^\/\*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multiLineComment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._normalString();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringInterpolation();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:abstract|def|delegate|event|extern|internal|mutable|override|public|private|protected|sealed|static|volatile|virtual|new)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:macro|namespace|using|\\\[Record\\])\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:array|bool|byte|char|decimal|double|enum|float|int|list|long|object|sbyte|short|string|uint|ulong|ushort|variant|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:_|as|assert|base|catch|checked|do|else|false|finally|for|foreach|fun|get|if|ignore|implements|in|is|lock|match|null|out|params|ref|repeat|set|syntax|this|throw|true|try|typeof|unchecked|unless|when|where|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:#define|#elif|#else|#endif|#endregion|#error|#if|#line|#region|#undef|#warning|#pragma)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:class|interface|module|struct|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.str[1] == '[' && this.hl('<[', 'dsChar')) continue;
        if(this.str[0] == ']' && this.str[1] == '>' && this.hl(']>', 'dsChar')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._singleLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\/\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multiLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\*\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._normalString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\{[0-9]+\}/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsBaseN')) continue;
        if((m = /^\\u0008/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000D/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000d/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000A/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000a/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringInterpolation = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\{[0-9]+\}/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\$(\S)+\s/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsBaseN')) continue;
        if((m = /^\\u0008/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000D/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000d/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000A/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\u000a/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
