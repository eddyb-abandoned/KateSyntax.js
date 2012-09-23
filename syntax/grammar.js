KateSyntax.langs.grammar.syntax = {
    default: 'grammar_normal',
    grammar_normal: function grammar_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {if(m = this.grammar_macros())return this.pop(), m-1;continue;}
            if((m = /^(?:try\/rollback|try\/recover|catch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:public|protected|private)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:declaration|destructor|constructor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.grammar_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.grammar_singleLineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.str[1] == ':' && this.hl('[:', 'dsFunction')) {if(m = this.grammar_codeSegment())return this.pop(), m-1;continue;}
            if((m = /^\b[A-Z_]+\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b[a-z]+\b(?!=)/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.grammar_memberAst())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) {if(m = this.grammar_astDecl())return this.pop(), m-1;continue;}
            if((m = /^[;[()\]\->|=*#@:?]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    grammar_macros: function grammar_macros(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:ast_extra_members|export_macro|export_macro_header|namespace|parserclass|token|token_stream|parser_declaration_header|parser_bits_header|ast_header|ast_base|parser_base|bin|pre|post|tern|paren|left|right|<|>)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '[' && this.str[1] == ':') return this.pop();
            if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsKeyword')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    grammar_string: function grammar_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    grammar_singleLineComment: function grammar_singleLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    grammar_codeSegment: function grammar_codeSegment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.str[1] == ']' && this.hl(':]', 'dsFunction')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#\s*if\s+0\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.cpp_outscoped())return this.pop(), m-1;continue;}
            if(this.str[0] == '#') {if(m = this.cpp_afterHash())return this.pop(), m-1;continue;}
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.cpp_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.cpp_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^(?:asm|break|case|catch|class|constexpr|const_cast|continue|decltype|default|delete|do|dynamic_cast|else|enum|explicit|export|extern|false|final|friend|for|goto|if|inline|namespace|new|noexcept|nullptr|operator|override|private|protected|public|qobject_cast|reinterpret_cast|return|sizeof|static_assert|static_cast|struct|switch|template|this|throw|true|try|typedef|typeid|type_info|typename|union|using|virtual|while|and|and_eq|bad_cast|bad_typeid|bitand|bitor|compl|not|not_eq|or|or_eq|xor|xor_eq)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:K_DCOP|Q_ARG|Q_ASSERT|Q_ASSERT_X|Q_CHECK_PTR|Q_CLASSINFO|Q_CLEANUP_RESOURCE|Q_D|Q_DECLARE_FLAGS|Q_DECLARE_FLAGS|Q_DECLARE_INTERFACE|Q_DECLARE_METATYPE|Q_DECLARE_OPERATORS_FOR_FLAGS|Q_DECLARE_PRIVATE|Q_DECLARE_PUBLIC|Q_DECLARE_SHARED|Q_DECLARE_TYPEINFO|Q_DISABLE_COPY|Q_EMIT|Q_ENUMS|Q_EXPORT|Q_FLAGS|Q_FOREACH|Q_FOREVER|Q_GADGET|Q_GLOBAL_STATIC|Q_GLOBAL_STATIC_WITH_ARGS|Q_INIT_RESOURCE|Q_INTERFACES|Q_INVOKABLE|Q_NOREPLY|Q_OBJECT|Q_OVERRIDE|Q_PRIVATE_SLOT|Q_PROPERTY|Q_Q|Q_RETURN_ARG|Q_SCRIPTABLE|Q_SETS|Q_SIGNALS|Q_SLOTS|Q_UNUSED|SIGNAL|SLOT|TRUE|FALSE|connect|disconnect|emit|signals|slots|foreach|forever|qint8|qint16|qint32|qint64|qlonglong|qptrdiff|qreal|quint8|quint16|quint32|quint64|quintptr|qulonglong)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:auto|bool|char|char16_t|char32_t|const|double|float|int|long|mutable|register|short|signed|static|unsigned|void|volatile|uchar|uint|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|wchar_t)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.cpp_string())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.cpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cpp_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    grammar_memberAst: function grammar_memberAst(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\b[A-Z_]+\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    grammar_astDecl: function grammar_astDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.grammar_astMemberDecl())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    grammar_astMemberDecl: function grammar_astMemberDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b(member|temporary)\s+variable\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.grammar_astMemberType())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    grammar_astMemberType: function grammar_astMemberType(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == ';' && this.hl(';', 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cpp_normal: function cpp_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#\s*if\s+0\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.cpp_outscoped())return this.pop(), m-1;continue;}
            if(this.str[0] == '#') {if(m = this.cpp_afterHash())return this.pop(), m-1;continue;}
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.cpp_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.cpp_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^(?:asm|break|case|catch|class|constexpr|const_cast|continue|decltype|default|delete|do|dynamic_cast|else|enum|explicit|export|extern|false|final|friend|for|goto|if|inline|namespace|new|noexcept|nullptr|operator|override|private|protected|public|qobject_cast|reinterpret_cast|return|sizeof|static_assert|static_cast|struct|switch|template|this|throw|true|try|typedef|typeid|type_info|typename|union|using|virtual|while|and|and_eq|bad_cast|bad_typeid|bitand|bitor|compl|not|not_eq|or|or_eq|xor|xor_eq)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:K_DCOP|Q_ARG|Q_ASSERT|Q_ASSERT_X|Q_CHECK_PTR|Q_CLASSINFO|Q_CLEANUP_RESOURCE|Q_D|Q_DECLARE_FLAGS|Q_DECLARE_FLAGS|Q_DECLARE_INTERFACE|Q_DECLARE_METATYPE|Q_DECLARE_OPERATORS_FOR_FLAGS|Q_DECLARE_PRIVATE|Q_DECLARE_PUBLIC|Q_DECLARE_SHARED|Q_DECLARE_TYPEINFO|Q_DISABLE_COPY|Q_EMIT|Q_ENUMS|Q_EXPORT|Q_FLAGS|Q_FOREACH|Q_FOREVER|Q_GADGET|Q_GLOBAL_STATIC|Q_GLOBAL_STATIC_WITH_ARGS|Q_INIT_RESOURCE|Q_INTERFACES|Q_INVOKABLE|Q_NOREPLY|Q_OBJECT|Q_OVERRIDE|Q_PRIVATE_SLOT|Q_PROPERTY|Q_Q|Q_RETURN_ARG|Q_SCRIPTABLE|Q_SETS|Q_SIGNALS|Q_SLOTS|Q_UNUSED|SIGNAL|SLOT|TRUE|FALSE|connect|disconnect|emit|signals|slots|foreach|forever|qint8|qint16|qint32|qint64|qlonglong|qptrdiff|qreal|quint8|quint16|quint32|quint64|quintptr|qulonglong)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:auto|bool|char|char16_t|char32_t|const|double|float|int|long|mutable|register|short|signed|static|unsigned|void|volatile|uchar|uint|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|wchar_t)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.cpp_string())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.cpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cpp_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cpp_string: function cpp_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    cpp_regionMarker: function cpp_regionMarker(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    },
    cpp_commentar1: function cpp_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cpp_commentar2: function cpp_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cpp_afterHash: function cpp_afterHash(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#\s*if(?:def|ndef)?(?=\s+\S)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.cpp_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.cpp_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*define.*((?=\\))/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.cpp_define())return this.pop(), m-1;continue;}
            if((m = /^#\s*(?:el(?:se|if)|include(?:_next)?|define|undef|line|error|warning|pragma)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.cpp_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s+[0-9]+/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.cpp_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    cpp_preprocessor: function cpp_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cpp_commentarPreprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.cpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    cpp_define: function cpp_define(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    cpp_commentarPreprocessor: function cpp_commentarPreprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cpp_outscoped: function cpp_outscoped(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.cpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cpp_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.cpp_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*el(?:se|if)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cpp_outscopedIntern: function cpp_outscopedIntern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.cpp_string())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.cpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cpp_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.cpp_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
