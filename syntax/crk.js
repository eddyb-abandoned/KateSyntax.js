KateSyntax.langs.crk.syntax = {
    default: 'crk_normal',
    crk_normal: function crk_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:break|catch|class|continue|else|false|for|if|in|is|null|oper|return|this|true|try|typeof|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^import/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.crk_package())return this.pop(), m-1;continue;}
            if((m = /^(?:bool|byte|int16|int32|int64|uint16|uint32|uint64|float32|float64|int|uint|intz|uintz|float|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.crk_singleQuotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.crk_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) {if(m = this.crk_backtickString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'b' && this.str[1] == '\'' && this.hl('b\'', 'dsChar')) {if(m = this.crk_char())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.crk_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.crk_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.crk_commentar3())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.crk_member())return this.pop(), m-1;continue;}
            if((m = /^@\w+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    crk_string: function crk_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    crk_singleQuotedString: function crk_singleQuotedString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    crk_backtickString: function crk_backtickString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsOthers')) {if(m = this.crk_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsOthers')) {if(m = this.crk_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    crk_char: function crk_char(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    crk_braces: function crk_braces(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if((m = /^(?:break|catch|class|continue|else|false|for|if|in|is|null|oper|return|this|true|try|typeof|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^import/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.crk_package())return this.pop(), m-1;continue;}
            if((m = /^(?:bool|byte|int16|int32|int64|uint16|uint32|uint64|float32|float64|int|uint|intz|uintz|float|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.crk_singleQuotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.crk_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) {if(m = this.crk_backtickString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'b' && this.str[1] == '\'' && this.hl('b\'', 'dsChar')) {if(m = this.crk_char())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.crk_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.crk_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.crk_commentar3())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.crk_member())return this.pop(), m-1;continue;}
            if((m = /^@\w+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    crk_subst: function crk_subst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.crk_braces())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if((m = /^(?:break|catch|class|continue|else|false|for|if|in|is|null|oper|return|this|true|try|typeof|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^import/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.crk_package())return this.pop(), m-1;continue;}
            if((m = /^(?:bool|byte|int16|int32|int64|uint16|uint32|uint64|float32|float64|int|uint|intz|uintz|float|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.crk_singleQuotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.crk_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) {if(m = this.crk_backtickString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'b' && this.str[1] == '\'' && this.hl('b\'', 'dsChar')) {if(m = this.crk_char())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.crk_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.crk_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.crk_commentar3())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.crk_member())return this.pop(), m-1;continue;}
            if((m = /^@\w+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    crk_shortSubst: function crk_shortSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\w(?!\w)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    crk_package: function crk_package(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\w\\.]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    crk_member: function crk_member(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    crk_commentar1: function crk_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    crk_commentar2: function crk_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    crk_commentar3: function crk_commentar3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_normal: function doxygen_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
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
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;font-style:normal;font-weight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_blockComment: function doxygen_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '@' && this.str[1] == '{' && this.hl('@{', 'dsRegionMarker')) continue;
            if(this.str[0] == '@' && this.str[1] == '}' && this.hl('@}', 'dsRegionMarker')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;font-style:normal;font-weight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\\(<|>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWord: function doxygen_mL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagParam: function doxygen_mL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordWord: function doxygen_mL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_Tag2ndWord: function doxygen_mL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop(), 1;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagString: function doxygen_mL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordString: function doxygen_mL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_htmltag: function doxygen_mL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
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
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagParam: function doxygen_sL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordWord: function doxygen_sL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_Tag2ndWord: function doxygen_sL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagString: function doxygen_sL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordString: function doxygen_sL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_htmltag: function doxygen_sL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
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
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;font-style:italic;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_DetectComment: function doxygen_sL_DetectComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_code: function doxygen_code(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]endcode\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_verbatim: function doxygen_verbatim(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]endverbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_formula: function doxygen_formula(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]f\]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;font-style:italic');
        }
        this.pop();
    },
    doxygen_msc: function doxygen_msc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]endmsc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;font-style:italic');
        }
        this.pop();
    },
    doxygen_dot: function doxygen_dot(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]enddot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;font-style:italic');
        }
        this.pop();
    }
};
