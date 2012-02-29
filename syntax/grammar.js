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
        if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {this._macros();continue;}
        if((m = /^(?:try\/rollback|try\/recover|catch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:public|protected|private)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:declaration|destructor|constructor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._singleLineComment();continue;}
        if(this.str[0] == '[' && this.str[1] == ':' && this.hl('[:', 'dsFunction')) {this._codeSegment();continue;}
        if((m = /^\b[A-Z_]+\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b[a-z]+\b(?!=)/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._memberAst();continue;}
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) {this._astDecl();continue;}
        if((m = /^[;[()\]\->|=*#@:?]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._macros = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:ast_extra_members|export_macro|export_macro_header|namespace|parserclass|token|token_stream|parser_declaration_header|parser_bits_header|ast_header|ast_base|parser_base|bin|pre|post|tern|paren|left|right|<|>)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '[' && this.str[1] == ':') return;
        if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singleLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._codeSegment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ':' && this.str[1] == ']' && this.hl(':]', 'dsFunction')) return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._memberAst = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\b[A-Z_]+\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._astDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._astMemberDecl();continue;}
        if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsOthers')) return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._astMemberDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b(member|temporary)\s+variable\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._astMemberType();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._astMemberType = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsOthers')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
