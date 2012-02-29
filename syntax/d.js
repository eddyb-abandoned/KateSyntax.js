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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^[a-zA-Z_]/.exec(this.str)) {this._startingLetter();continue;}
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\u' && this.hl('\u', 'dsString')) {this._unicodeShort();continue;}
        if(this.str[0] == '\U' && this.hl('\U', 'dsString')) {this._unicodeLong();continue;}
        if(this.str[0] == '\&' && this.hl('\&', 'dsString')) {this._hTMLEntity();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) {this._charLiteral();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._bQString();continue;}
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '..' && this.hl('..', 'dsNormal')) continue;
        if((m = /^\.\d[\d_]*([eE][-+]?\d[\d_]*)?[fFL]?i?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {this._properties();continue;}
        if(/^\d/.exec(this.str)) {this._numberLiteral();continue;}
        if((m = /^#line/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._linePragma();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._startingLetter = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^[^a-zA-Z_]/.exec(this.str)) return;
        if((m = /^in\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^out\s*(?=(\(([a-zA-Z_][\w_]*)?\)\s*)?\{)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^scope\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._scope();continue;}
        if((m = /^import\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^function\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^delegate\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:asm|body|break|case|catch|continue|default|do|else|finally|for|foreach|foreach_reverse|goto|if|mixin|return|switch|throw|try|while|with|synchronized)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abstract|align|auto|const|export|final|immutable|inout|invariant|lazy|nothrow|override|package|private|protected|public|pure|ref|static|out|scope)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:false|null|super|this|true|typeid|assert|cast|is|new|delete|in|delegate|function)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:alias|enum|typedef|class|interface|struct|union)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:macro|template)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:module|import)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._moduleName();continue;}
        if((m = /^(?:typeof|void|bool|byte|ubyte|short|ushort|int|uint|long|ulong|cent|ucent|float|double|real|ireal|ifloat|idouble|creal|cfloat|cdouble|char|wchar|dchar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:size_t|ptrdiff_t|hash_t|Error|Exception|Object|TypeInfo|ClassInfo|ModuleInfo|Interface|OffsetTypeInfo|TypeInfo_Typedef|TypeInfo_Enum|TypeInfo_Pointer|TypeInfo_Array|TypeInfo_StaticArray|TypeInfo_AssociativeArray|TypeInfo_Function|TypeInfo_Delegate|TypeInfo_Class|TypeInfo_Interface|TypeInfo_Struct|TypeInfo_Tuple|string|wstring|dstring|bit|TypeInfo_Const|TypeInfo_Invariant)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:extern)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._linkage();continue;}
        if((m = /^(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|__EOF__)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:debug|unittest)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:pragma)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pragma();continue;}
        if((m = /^(?:version)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._version();continue;}
        if((m = /^(?:deprecated|volatile)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == 'r"' && this.hl('r"', 'dsString')) {this._rawString();continue;}
        if(this.str[0] == 'x"' && this.hl('x"', 'dsString')) {this._hexString();continue;}
        if((m = /^(?:)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._properties = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:init|sizeof|alignof|mangleof|stringof|tupleof|offsetof|max|min|infinity|nan|dig|epsilon|mant_dig|max_10_exp|max_exp|min_10_exp|min_exp|re|im|length|ptr|dup|idup|reverse|sort|keys|values|rehash)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._numberLiteral = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^0[xX][\da-fA-F_]*(\.[\da-fA-F_]*)?[pP][-+]?\d[\d_]*[fFL]?i?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^\d[_\d]*(\.(?!\.)[_\d]*([eE][-+]?\d[_\d]*)?[fFL]?i?|[eE][-+]?\d[_\d]*[fFL]?i?|[fF]i?|[fFL]?i)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^0[bB]_*[01][01_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^0[0-7_]+(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^0[xX]_*[\da-fA-F][\da-fA-F_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^\d+[\d_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._linePragma = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^((0([0-7_]+|[bB]_*[01][01_]*|[xX]_*[\da-fA-F][\da-fA-F_]*))|\d+[\d_]*)(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|__EOF__)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if((m = /^.+/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._unicodeShort = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[\da-fA-F]{4}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._unicodeLong = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[\da-fA-F]{8}/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._hTMLEntity = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z]\w+;/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._moduleName = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if(/^[^\s\w.:,=]/.exec(this.str)) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._linkage = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._linkage2();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._linkage2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^C\+\+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^(?:C|D|Windows|Pascal|System)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._version = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) {this._version2();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._version2();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if((m = /^[^\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._version2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:DigitalMars|X86|X86_64|Windows|Win32|Win64|linux|LittleEndian|BigEndian|D_Coverage|D_InlineAsm_X86|unittest|D_Version2|none|all)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^\d+[\d_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._#pop#pop();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._scope = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._scope2();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._scope2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exit|success|failure)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._pragma = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._pragma2();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if((m = /^[^\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._pragma2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:msg|lib)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._rawString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._bQString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '`' && this.hl('`', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._hexString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^[^\sa-fA-F\d"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._charLiteral = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._charLiteralClosing();continue;}
        if((m = /^\\(u[\da-fA-F]{4}|U[\da-fA-F]{8}|&[a-zA-Z]\w+;)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._charLiteralClosing();continue;}
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsError')) {this._charLiteralClosing();continue;}
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
        if(this.str[0] == '"c' && this.hl('"c', 'dsString')) return;
        if(this.str[0] == '"w' && this.hl('"w', 'dsString')) return;
        if(this.str[0] == '"d' && this.hl('"d', 'dsString')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\u' && this.hl('\u', 'dsString')) {this._unicodeShort();continue;}
        if(this.str[0] == '\U' && this.hl('\U', 'dsString')) {this._unicodeLong();continue;}
        if(this.str[0] == '\&' && this.hl('\&', 'dsString')) {this._hTMLEntity();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentRules = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentLine();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentBlock();continue;}
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._regionMarker = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsRegionMarker')) return;
        this.hl(this.str[0], 'dsRegionMarker');
    }
};
HL.prototype._commentLine = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentBlock = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentNested = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._commentNested();continue;}
        if(this.str[0] == '+/' && this.hl('+/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ddocNormal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocLine();continue;}
        if((m = /^/\*{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlock();continue;}
        if((m = /^/\+{2,}(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNested();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ddocLine = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if((m = /^[\w_]+:($|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ddocBlock = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\*+//.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if((m = /^[\w_]+:($|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^-{3,}($|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocBlockCode();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ddocNested = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._ddocNested2();continue;}
        if((m = /^\++//.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '+' && this.hl('+', 'dsComment')) continue;
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if((m = /^[\w_]+:($|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^-{3,}($|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNestedCode();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ddocNested2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\++//.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '/+' && this.hl('/+', 'dsComment')) {this._ddocNested2();continue;}
        if((m = /^\++//.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '+' && this.hl('+', 'dsComment')) continue;
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if((m = /^[\w_]+:($|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^-{3,}($|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ddocNestedCode();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ddocMacro = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return;
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._ddocMacro3();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._ddocMacro2();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._ddocMacro2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._ddocMacro3();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ddocMacro3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._ddocMacro3();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._macroRules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '$(' && this.hl('$(', 'dsOthers')) {this._ddocMacro();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._ddocMacro3();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ddocBlockCode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*+//.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._#pop#pop();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
        if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-{3,}($|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ddocNestedCode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\++//.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._#pop#pop();continue;}
        if(this.str[0] == '+' && this.hl('+', 'dsComment')) continue;
        if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-{3,}($|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
