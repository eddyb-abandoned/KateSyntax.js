KateSyntax.langs.objectivecpp.syntax = {
    default: 'objectivecpp_default',
    objectivecpp_default: function objectivecpp_default(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#\s*if\s+0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.objectivecpp_outscoped())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsOthers')) {if(m = this.objectivecpp_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.objectivecpp_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.objectivecpp_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|continue|default|do|else|enum|extern|for|goto|if|return|sizeof|struct|switch|typedef|union|while|@class|@defs|@encode|@end|@implementation|@interface|@private|@protected|@protocol|@public|@selector|self|super|asm|catch|class|const_cast|delete|dynamic_cast|explicit|export|false|friend|inline|namespace|new|operator|private|protected|public|qobject_cast|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|type_info|typename|using|virtual|and|and_eq|bad_cast|bad_typeid|bitand|bitor|compl|not|not_eq|or|or_eq|xor|xor_eq)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:auto|char|const|double|float|int|long|register|short|signed|static|unsigned|void|volatile|bool|mutable|uchar|uint|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|wchar_t)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.objectivecpp_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.objectivecpp_singleLineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.objectivecpp_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.objectivecpp_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '@' && this.str[1] == '"' && this.hl('@"', 'dsString')) {if(m = this.objectivecpp_string())return this.pop(), m-1;continue;}
            if((m = /^(?:K_DCOP|SLOT|SIGNAL|Q_CLASSINFO|Q_ENUMS|Q_EXPORT|Q_OBJECT|Q_OVERRIDE|Q_PROPERTY|Q_SETS|Q_SIGNALS|Q_SLOTS|Q_FOREACH|Q_DECLARE_FLAGS|Q_INIT_RESOURCE|Q_CLEANUP_RESOURCE|Q_GLOBAL_STATIC|Q_GLOBAL_STATIC_WITH_ARGS|Q_DECLARE_INTERFACE|Q_DECLARE_TYPEINFO|Q_DECLARE_SHARED|Q_DECLARE_FLAGS|Q_DECLARE_OPERATORS_FOR_FLAGS|Q_FOREVER|Q_DECLARE_PRIVATE|Q_DECLARE_PUBLIC|Q_D|Q_Q|Q_DISABLE_COPY|Q_INTERFACES|Q_FLAGS|Q_SCRIPTABLE|Q_INVOKABLE|Q_GADGET|Q_ARG|Q_RETURN_ARG|Q_ASSERT|Q_ASSERT_X|TRUE|FALSE|connect|disconnect|emit|signals|slots|foreach|forever)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.objectivecpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.objectivecpp_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    objectivecpp_string: function objectivecpp_string(m) {
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
    objectivecpp_singleLineComment: function objectivecpp_singleLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    objectivecpp_multiLineComment: function objectivecpp_multiLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    objectivecpp_preprocessor: function objectivecpp_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^define.*((?=\\))/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.objectivecpp_define())return this.pop(), m-1;continue;}
            if((m = /^define.*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.objectivecpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.objectivecpp_multiLineCommentPrep())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    objectivecpp_multiLineCommentPrep: function objectivecpp_multiLineCommentPrep(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop(), 1;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    objectivecpp_regionMarker: function objectivecpp_regionMarker(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    },
    objectivecpp_commentar1: function objectivecpp_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    objectivecpp_commentar2: function objectivecpp_commentar2(m) {
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
    objectivecpp_define: function objectivecpp_define(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    objectivecpp_outscoped: function objectivecpp_outscoped(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.objectivecpp_string())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.objectivecpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.objectivecpp_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.objectivecpp_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*(endif|else|elif)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    objectivecpp_outscopedIntern: function objectivecpp_outscopedIntern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.objectivecpp_string())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.objectivecpp_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.objectivecpp_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.objectivecpp_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_normal: function doxygen_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    doxygen_lineComment: function doxygen_lineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_blockComment: function doxygen_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '@' && this.str[1] == '{' && this.hl('@{', 'dsRegionMarker')) continue;
            if(this.str[0] == '@' && this.str[1] == '}' && this.hl('@}', 'dsRegionMarker')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\\(<|>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWord: function doxygen_mL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagParam: function doxygen_mL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordWord: function doxygen_mL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_Tag2ndWord: function doxygen_mL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop(), 1;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagString: function doxygen_mL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordString: function doxygen_mL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_mL_htmltag: function doxygen_mL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygen_mL_identifiers())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_mL_htmlcomment: function doxygen_mL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_mL_identifiers: function doxygen_mL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygen_mL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygen_mL_types2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_mL_types1: function doxygen_mL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_mL_types2: function doxygen_mL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_TagWord: function doxygen_sL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagParam: function doxygen_sL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordWord: function doxygen_sL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_Tag2ndWord: function doxygen_sL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagString: function doxygen_sL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordString: function doxygen_sL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_htmltag: function doxygen_sL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygen_sL_identifiers())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_sL_htmlcomment: function doxygen_sL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_sL_identifiers: function doxygen_sL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygen_sL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygen_sL_types2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_sL_types1: function doxygen_sL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_types2: function doxygen_sL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_DetectEnv: function doxygen_sL_DetectEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;fontStyle:italic;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_sL_DetectComment: function doxygen_sL_DetectComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_code: function doxygen_code(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]endcode\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_verbatim: function doxygen_verbatim(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]endverbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_formula: function doxygen_formula(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]f\]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_msc: function doxygen_msc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]endmsc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;fontStyle:italic');
        }
        this.pop();
    },
    doxygen_dot: function doxygen_dot(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;fontStyle:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) continue;
            if((m = /^[@\\]enddot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;fontStyle:italic');
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
