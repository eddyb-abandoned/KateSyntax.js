KateSyntax.langs.d.syntax = {
    default: 'd_normal',
    d_normal: function d_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^[a-zA-Z_]/.exec(this.str)) {if(m = this.d_startingLetter())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'u' && this.hl('\\u', 'dsString;color:#00aa88')) {if(m = this.d_unicodeShort())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == 'U' && this.hl('\\U', 'dsString;color:#00aa88')) {if(m = this.d_unicodeLong())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '&' && this.hl('\\&', 'dsString;color:#00aa88')) {if(m = this.d_hTMLEntity())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) {if(m = this.d_charLiteral())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.d_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#a100a1')) {if(m = this.d_bQString())return this.pop(), m-1;continue;}
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.d_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.d_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
            if((m = /^\.\d[\d_]*([eE][-+]?\d[\d_]*)?[fFL]?i?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.d_properties())return this.pop(), m-1;continue;}
            if(/^\d/.exec(this.str)) {if(m = this.d_numberLiteral())return this.pop(), m-1;continue;}
            if((m = /^#line/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#00aa00')) {if(m = this.d_linePragma())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_startingLetter: function d_startingLetter(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(/^[^a-zA-Z_]/.exec(this.str)) return this.pop();
            if((m = /^in\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^out\s*(?=(\(([a-zA-Z_][\w_]*)?\)\s*)?\{)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^scope\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.d_scope())return this.pop(), m-1;continue;}
            if((m = /^import\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080')) continue;
            if((m = /^function\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#800000')) continue;
            if((m = /^delegate\s*(?=\()/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#800000')) continue;
            if((m = /^(?:asm|body|break|case|catch|continue|default|do|else|finally|for|foreach|foreach_reverse|goto|if|mixin|return|switch|throw|try|while|with|synchronized)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abstract|align|auto|const|export|final|immutable|inout|invariant|lazy|nothrow|override|package|private|protected|public|pure|ref|static|out|scope)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#800080')) continue;
            if((m = /^(?:false|null|super|this|true|typeid|assert|cast|is|new|delete|in|delegate|function)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080')) continue;
            if((m = /^(?:alias|enum|typedef|class|interface|struct|union)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#800000')) continue;
            if((m = /^(?:macro|template)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) continue;
            if((m = /^(?:module|import)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.d_moduleName())return this.pop(), m-1;continue;}
            if((m = /^(?:typeof|void|bool|byte|ubyte|short|ushort|int|uint|long|ulong|cent|ucent|float|double|real|ireal|ifloat|idouble|creal|cfloat|cdouble|char|wchar|dchar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:size_t|ptrdiff_t|hash_t|Error|Exception|Object|TypeInfo|ClassInfo|ModuleInfo|Interface|OffsetTypeInfo|TypeInfo_Typedef|TypeInfo_Enum|TypeInfo_Pointer|TypeInfo_Array|TypeInfo_StaticArray|TypeInfo_AssociativeArray|TypeInfo_Function|TypeInfo_Delegate|TypeInfo_Class|TypeInfo_Interface|TypeInfo_Struct|TypeInfo_Tuple|string|wstring|dstring|bit|TypeInfo_Const|TypeInfo_Invariant)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontStyle:italic')) continue;
            if((m = /^(?:extern)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808000')) {if(m = this.d_linkage())return this.pop(), m-1;continue;}
            if((m = /^(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|__EOF__)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00aa00')) continue;
            if((m = /^(?:debug|unittest)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ff00ff')) continue;
            if((m = /^(?:pragma)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#00aa00')) {if(m = this.d_pragma())return this.pop(), m-1;continue;}
            if((m = /^(?:version)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808000')) {if(m = this.d_version())return this.pop(), m-1;continue;}
            if((m = /^(?:deprecated|volatile)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#800080;textDecoration:line-through')) continue;
            if(this.str[0] == 'r' && this.str[1] == '"' && this.hl('r"', 'dsString;color:#a100a1')) {if(m = this.d_rawString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'x' && this.str[1] == '"' && this.hl('x"', 'dsString;color:#a10022')) {if(m = this.d_hexString())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_properties: function d_properties(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:init|sizeof|alignof|mangleof|stringof|tupleof|offsetof|max|min|infinity|nan|dig|epsilon|mant_dig|max_10_exp|max_exp|min_10_exp|min_exp|re|im|length|ptr|dup|idup|reverse|sort|keys|values|rehash)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#000080')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    d_numberLiteral: function d_numberLiteral(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^0[xX][\da-fA-F_]*(\.[\da-fA-F_]*)?[pP][-+]?\d[\d_]*[fFL]?i?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^\d[_\d]*(\.(?!\.)[_\d]*([eE][-+]?\d[_\d]*)?[fFL]?i?|[eE][-+]?\d[_\d]*[fFL]?i?|[fF]i?|[fFL]?i)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^0[bB]_*[01][01_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if((m = /^0[0-7_]+(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if((m = /^0[xX]_*[\da-fA-F][\da-fA-F_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if((m = /^\d+[\d_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    d_linePragma: function d_linePragma(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#00aa00')) continue;
            if((m = /^((0([0-7_]+|[bB]_*[01][01_]*|[xX]_*[\da-fA-F][\da-fA-F_]*))|\d+[\d_]*)(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|__EOF__)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00aa00')) continue;
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if((m = /^.+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsKeyword;color:#00aa00');
        }
        this.pop();
    },
    d_unicodeShort: function d_unicodeShort(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\da-fA-F]{4}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#00aa88');
        }
        this.pop();
    },
    d_unicodeLong: function d_unicodeLong(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\da-fA-F]{8}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#00aa88');
        }
        this.pop();
    },
    d_hTMLEntity: function d_hTMLEntity(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z]\w+;/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    d_moduleName: function d_moduleName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008000')) continue;
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if(/^[^\s\w.:,=]/.exec(this.str)) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#008000');
        }
        this.pop();
    },
    d_linkage: function d_linkage(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.d_linkage2())return this.pop(), m-1;continue;}
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    d_linkage2: function d_linkage2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^C\+\+/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^(?:C|D|Windows|Pascal|System)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop(), 1;
            if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_version: function d_version(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsNormal')) {if(m = this.d_version2())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.d_version2())return this.pop(), m-1;continue;}
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if((m = /^[^\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_version2: function d_version2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:DigitalMars|X86|X86_64|Windows|Win32|Win64|linux|LittleEndian|BigEndian|D_Coverage|D_InlineAsm_X86|unittest|D_Version2|none|all)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 1;
            if((m = /^\d+[\d_]*(L[uU]?|[uU]L?)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop(), 1;
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop(), 1;
            if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_scope: function d_scope(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.d_scope2())return this.pop(), m-1;continue;}
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    d_scope2: function d_scope2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:exit|success|failure)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080')) return this.pop(), 1;
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop(), 1;
            if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_pragma: function d_pragma(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#00aa00')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.d_pragma2())return this.pop(), m-1;continue;}
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if((m = /^[^\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            this.hl(this.str[0], 'dsKeyword;color:#00aa00');
        }
        this.pop();
    },
    d_pragma2: function d_pragma2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#00aa00')) continue;
            if((m = /^(?:msg|lib)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 1;
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop(), 1;
            if((m = /^[^)\s\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsKeyword;color:#00aa00');
        }
        this.pop();
    },
    d_rawString: function d_rawString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a100a1')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#a100a1');
        }
        this.pop();
    },
    d_bQString: function d_bQString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#a100a1')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#a100a1');
        }
        this.pop();
    },
    d_hexString: function d_hexString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a10022')) return this.pop();
            if((m = /^[^\sa-fA-F\d"]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a10022');
        }
        this.pop();
    },
    d_charLiteral: function d_charLiteral(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) {if(m = this.d_charLiteralClosing())return this.pop(), m-1;continue;}
            if((m = /^\\(u[\da-fA-F]{4}|U[\da-fA-F]{8}|&[a-zA-Z]\w+;)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) {if(m = this.d_charLiteralClosing())return this.pop(), m-1;continue;}
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.d_charLiteralClosing())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.d_charLiteralClosing())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.d_charLiteralClosing();
            return this.pop();
        }
        this.pop();
    },
    d_charLiteralClosing: function d_charLiteralClosing(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return this.pop(), 1;
            return this.pop(), 1;
        }
        this.pop();
    },
    d_string: function d_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) continue;
            if(this.str[0] == '"' && this.str[1] == 'c' && this.hl('"c', 'dsString')) return this.pop();
            if(this.str[0] == '"' && this.str[1] == 'w' && this.hl('"w', 'dsString')) return this.pop();
            if(this.str[0] == '"' && this.str[1] == 'd' && this.hl('"d', 'dsString')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == 'u' && this.hl('\\u', 'dsString;color:#00aa88')) {if(m = this.d_unicodeShort())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == 'U' && this.hl('\\U', 'dsString;color:#00aa88')) {if(m = this.d_unicodeLong())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '&' && this.hl('\\&', 'dsString;color:#00aa88')) {if(m = this.d_hTMLEntity())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    d_commentRules: function d_commentRules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_regionMarker: function d_regionMarker(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    },
    d_commentLine: function d_commentLine(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    d_commentBlock: function d_commentBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    d_commentNested: function d_commentNested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '+' && this.str[1] == '/' && this.hl('+/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    d_ddocNormal: function d_ddocNormal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    d_ddocLine: function d_ddocLine(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if((m = /^[\w_]+:((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#7f7fff;fontWeight:bold')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#7f7fff');
        }
        this.pop();
    },
    d_ddocBlock: function d_ddocBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^\*+\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if((m = /^[\w_]+:((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#7f7fff;fontWeight:bold')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^-{3,}((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlockCode())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment;color:#7f7fff');
        }
        this.pop();
    },
    d_ddocNested: function d_ddocNested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment;color:#7f7fff')) {if(m = this.d_ddocNested2())return this.pop(), m-1;continue;}
            if((m = /^\++\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '+' && this.hl('+', 'dsComment')) continue;
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if((m = /^[\w_]+:((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#7f7fff;fontWeight:bold')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^-{3,}((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNestedCode())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment;color:#7f7fff');
        }
        this.pop();
    },
    d_ddocNested2: function d_ddocNested2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^\++\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment;color:#7f7fff')) {if(m = this.d_ddocNested2())return this.pop(), m-1;continue;}
            if((m = /^\++\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '+' && this.hl('+', 'dsComment')) continue;
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if((m = /^[\w_]+:((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#7f7fff;fontWeight:bold')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#7f7fff')) continue;
            if((m = /^-{3,}((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNestedCode())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment;color:#7f7fff');
        }
        this.pop();
    },
    d_ddocMacro: function d_ddocMacro(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal')) {if(m = this.d_ddocMacro3())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    d_ddocMacro2: function d_ddocMacro2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) return this.pop(), 1;
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal')) {if(m = this.d_ddocMacro3())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    d_ddocMacro3: function d_ddocMacro3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal')) {if(m = this.d_ddocMacro3())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    d_macroRules: function d_macroRules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers;color:#bf5fbf;fontStyle:normal;fontWeight:bold')) {if(m = this.d_ddocMacro())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal')) {if(m = this.d_ddocMacro3())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal;color:#bf7fff;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    d_ddocBlockCode: function d_ddocBlockCode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontStyle:italic')) continue;
            if((m = /^\*+\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) continue;
            if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontStyle:italic')) continue;
            if((m = /^-{3,}((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontStyle:italic')) continue;
            if(/^[a-zA-Z_]/.exec(this.str)) {if(m = this.d_startingLetter())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'u' && this.hl('\\u', 'dsString;color:#00aa88')) {if(m = this.d_unicodeShort())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == 'U' && this.hl('\\U', 'dsString;color:#00aa88')) {if(m = this.d_unicodeLong())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '&' && this.hl('\\&', 'dsString;color:#00aa88')) {if(m = this.d_hTMLEntity())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) {if(m = this.d_charLiteral())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.d_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#a100a1')) {if(m = this.d_bQString())return this.pop(), m-1;continue;}
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.d_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.d_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
            if((m = /^\.\d[\d_]*([eE][-+]?\d[\d_]*)?[fFL]?i?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.d_properties())return this.pop(), m-1;continue;}
            if(/^\d/.exec(this.str)) {if(m = this.d_numberLiteral())return this.pop(), m-1;continue;}
            if((m = /^#line/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#00aa00')) {if(m = this.d_linePragma())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal;fontStyle:italic');
        }
        this.pop();
    },
    d_ddocNestedCode: function d_ddocNestedCode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontStyle:italic')) continue;
            if((m = /^\++\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop(), 1;
            if(this.str[0] == '+' && this.hl('+', 'dsComment')) continue;
            if((m = /^[^-]-{3,}/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontStyle:italic')) continue;
            if((m = /^-{3,}((?=$|\n)|\s)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;fontStyle:italic')) continue;
            if(/^[a-zA-Z_]/.exec(this.str)) {if(m = this.d_startingLetter())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'u' && this.hl('\\u', 'dsString;color:#00aa88')) {if(m = this.d_unicodeShort())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == 'U' && this.hl('\\U', 'dsString;color:#00aa88')) {if(m = this.d_unicodeLong())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '&' && this.hl('\\&', 'dsString;color:#00aa88')) {if(m = this.d_hTMLEntity())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) {if(m = this.d_charLiteral())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.d_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#a100a1')) {if(m = this.d_bQString())return this.pop(), m-1;continue;}
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.d_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.d_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/{3,}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocLine())return this.pop(), m-1;continue;}
            if((m = /^\/\*{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocBlock())return this.pop(), m-1;continue;}
            if((m = /^\/\+{2,}(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.d_ddocNested())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.d_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.d_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '+' && this.hl('/+', 'dsComment')) {if(m = this.d_commentNested())return this.pop(), m-1;continue;}
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
            if((m = /^\.\d[\d_]*([eE][-+]?\d[\d_]*)?[fFL]?i?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.d_properties())return this.pop(), m-1;continue;}
            if(/^\d/.exec(this.str)) {if(m = this.d_numberLiteral())return this.pop(), m-1;continue;}
            if((m = /^#line/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#00aa00')) {if(m = this.d_linePragma())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal;fontStyle:italic');
        }
        this.pop();
    },
    alert_normalText: function alert_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
