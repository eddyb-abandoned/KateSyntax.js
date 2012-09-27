KateSyntax.langs.doxygenlua.syntax = {
    default: 'doxygenlua_normal',
    doxygenlua_normal: function doxygenlua_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^--\[(=*)\[/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_blockComment())return this.pop(), m-1;continue;}
            if((m = /^--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_lineComment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    doxygenlua_lineComment: function doxygenlua_lineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^(?:\\arg|\\attention|\\author|\\callgraph|\\code|\\dot|\\else|\\endcode|\\endcond|\\enddot|\\endhtmlonly|\\endif|\\endlatexonly|\\endlink|\\endmanonly|\\endverbatim|\\endxmlonly|\\f\[|\\f]|\\f$|\\hideinitializer|\\htmlonly|\\interface|\\internal|\\invariant|\\~|\\@|\\$|\\\\|\\#|\\latexonly|\\li|\\manonly|\\n|\\nosubgrouping|\\note|\\only|\\post|\\pre|\\remarks|\\return|\\returns|\\sa|\\see|\\showinitializer|\\since|\\test|\\todo|\\verbatim|\\warning|\\xmlonly|@arg|@attention|@author|@callgraph|@code|@dot|@else|@endcode|@endcond|@enddot|@endhtmlonly|@endif|@endlatexonly|@endlink|@endmanonly|@endverbatim|@endxmlonly|@f\[|@f]|@f$|@hideinitializer|@htmlonly|@interface|@internal|@invariant|@~|@@|@$|@\\|@#|@latexonly|@li|@manonly|@n|@nosubgrouping|@note|@only|@post|@pre|@remarks|@return|@returns|@sa|@see|@showinitializer|@since|@test|@todo|@verbatim|@warning|@xmlonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|\\brief|\\bug|\\date|\\deprecated|\\fn|\\ingroup|\\line|\\mainpage|\\name|\\overload|\\par|\\short|\\skip|\\skipline|\\typedef|\\until|\\var|@addindex|@brief|@bug|@date|@deprecated|@fn|@ingroup|@line|@mainpage|@name|@overload|@par|@short|@skip|@skipline|@typedef|@until|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\defgroup|\\page|\\paragraph|\\section|\\struct|\\subsection|\\subsubsection|\\union|\\weakgroup|@defgroup|@page|@paragraph|@section|@struct|@subsection|@subsubsection|@union|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment')) continue;
            if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.doxygenlua_sL_htmltag())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_blockComment: function doxygenlua_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\]%1\]/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '@' && this.str[1] == '{' && this.hl('@{', 'dsRegionMarker')) continue;
            if(this.str[0] == '@' && this.str[1] == '}' && this.hl('@}', 'dsRegionMarker')) continue;
            if((m = /^(?:\\arg|\\attention|\\author|\\callgraph|\\code|\\dot|\\else|\\endcode|\\endcond|\\enddot|\\endhtmlonly|\\endif|\\endlatexonly|\\endlink|\\endmanonly|\\endverbatim|\\endxmlonly|\\f\[|\\f]|\\f$|\\hideinitializer|\\htmlonly|\\interface|\\internal|\\invariant|\\~|\\@|\\$|\\\\|\\#|\\latexonly|\\li|\\manonly|\\n|\\nosubgrouping|\\note|\\only|\\post|\\pre|\\remarks|\\return|\\returns|\\sa|\\see|\\showinitializer|\\since|\\test|\\todo|\\verbatim|\\warning|\\xmlonly|@arg|@attention|@author|@callgraph|@code|@dot|@else|@endcode|@endcond|@enddot|@endhtmlonly|@endif|@endlatexonly|@endlink|@endmanonly|@endverbatim|@endxmlonly|@f\[|@f]|@f$|@hideinitializer|@htmlonly|@interface|@internal|@invariant|@~|@@|@$|@\\|@#|@latexonly|@li|@manonly|@n|@nosubgrouping|@note|@only|@post|@pre|@remarks|@return|@returns|@sa|@see|@showinitializer|@since|@test|@todo|@verbatim|@warning|@xmlonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|\\brief|\\bug|\\date|\\deprecated|\\fn|\\ingroup|\\line|\\mainpage|\\name|\\overload|\\par|\\short|\\skip|\\skipline|\\typedef|\\until|\\var|@addindex|@brief|@bug|@date|@deprecated|@fn|@ingroup|@line|@mainpage|@name|@overload|@par|@short|@skip|@skipline|@typedef|@until|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\defgroup|\\page|\\paragraph|\\section|\\struct|\\subsection|\\subsubsection|\\union|\\weakgroup|@defgroup|@page|@paragraph|@section|@struct|@subsection|@subsubsection|@union|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\(<|>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment')) continue;
            if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.doxygenlua_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_mL_htmlcomment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_TagWord: function doxygenlua_mL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(/^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_TagParam: function doxygenlua_mL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_TagWordWord: function doxygenlua_mL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_Tag2ndWord: function doxygenlua_mL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop(), 1;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_TagString: function doxygenlua_mL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_mL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment')) continue;
            if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.doxygenlua_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_TagWordString: function doxygenlua_mL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_htmltag: function doxygenlua_mL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygenlua_mL_identifiers())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygenlua_mL_htmlcomment: function doxygenlua_mL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_mL_identifiers: function doxygenlua_mL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygenlua_mL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygenlua_mL_types2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygenlua_mL_types1: function doxygenlua_mL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygenlua_mL_types2: function doxygenlua_mL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygenlua_sL_TagWord: function doxygenlua_sL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(/^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_sL_TagParam: function doxygenlua_sL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_sL_TagWordWord: function doxygenlua_sL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) {if(m = this.doxygenlua_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_sL_Tag2ndWord: function doxygenlua_sL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_sL_TagString: function doxygenlua_sL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment')) continue;
            if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.doxygenlua_sL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_sL_TagWordString: function doxygenlua_sL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_sL_htmltag: function doxygenlua_sL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygenlua_sL_identifiers())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygenlua_sL_htmlcomment: function doxygenlua_sL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygenlua_sL_identifiers: function doxygenlua_sL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygenlua_sL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygenlua_sL_types2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygenlua_sL_types1: function doxygenlua_sL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygenlua_sL_types2: function doxygenlua_sL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
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
