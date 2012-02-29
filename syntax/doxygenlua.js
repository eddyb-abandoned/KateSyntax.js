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
        if((m = /^--\[(=*)\[/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._blockComment();continue;}
        if((m = /^--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._lineComment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^(?:\\arg|\\attention|\\author|\\callgraph|\\code|\\dot|\\else|\\endcode|\\endcond|\\enddot|\\endhtmlonly|\\endif|\\endlatexonly|\\endlink|\\endmanonly|\\endverbatim|\\endxmlonly|\\f\[|\\f]|\\f$|\\hideinitializer|\\htmlonly|\\interface|\\internal|\\invariant|\\~|\\@|\\$|\\\\|\\#|\\latexonly|\\li|\\manonly|\\n|\\nosubgrouping|\\note|\\only|\\post|\\pre|\\remarks|\\return|\\returns|\\sa|\\see|\\showinitializer|\\since|\\test|\\todo|\\verbatim|\\warning|\\xmlonly|@arg|@attention|@author|@callgraph|@code|@dot|@else|@endcode|@endcond|@enddot|@endhtmlonly|@endif|@endlatexonly|@endlink|@endmanonly|@endverbatim|@endxmlonly|@f\[|@f]|@f$|@hideinitializer|@htmlonly|@interface|@internal|@invariant|@~|@@|@$|@\\|@#|@latexonly|@li|@manonly|@n|@nosubgrouping|@note|@only|@post|@pre|@remarks|@return|@returns|@sa|@see|@showinitializer|@since|@test|@todo|@verbatim|@warning|@xmlonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_TagWord();continue;}
        if((m = /^(?:\\param|@param)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_TagParam();continue;}
        if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_TagWordWord();continue;}
        if((m = /^(?:\\addindex|\\brief|\\bug|\\date|\\deprecated|\\fn|\\ingroup|\\line|\\mainpage|\\name|\\overload|\\par|\\short|\\skip|\\skipline|\\typedef|\\until|\\var|@addindex|@brief|@bug|@date|@deprecated|@fn|@ingroup|@line|@mainpage|@name|@overload|@par|@short|@skip|@skipline|@typedef|@until|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_TagString();continue;}
        if((m = /^(?:\\defgroup|\\page|\\paragraph|\\section|\\struct|\\subsection|\\subsubsection|\\union|\\weakgroup|@defgroup|@page|@paragraph|@section|@struct|@subsection|@subsubsection|@union|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_TagWordString();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._sL_htmlcomment();continue;}
        if(this.str[0] == '<<' && this.hl('<<', 'dsComment')) continue;
        if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_htmltag();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._blockComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\]%1\]/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '@{' && this.hl('@{', 'dsRegionMarker')) continue;
        if(this.str[0] == '@}' && this.hl('@}', 'dsRegionMarker')) continue;
        if((m = /^(?:\\arg|\\attention|\\author|\\callgraph|\\code|\\dot|\\else|\\endcode|\\endcond|\\enddot|\\endhtmlonly|\\endif|\\endlatexonly|\\endlink|\\endmanonly|\\endverbatim|\\endxmlonly|\\f\[|\\f]|\\f$|\\hideinitializer|\\htmlonly|\\interface|\\internal|\\invariant|\\~|\\@|\\$|\\\\|\\#|\\latexonly|\\li|\\manonly|\\n|\\nosubgrouping|\\note|\\only|\\post|\\pre|\\remarks|\\return|\\returns|\\sa|\\see|\\showinitializer|\\since|\\test|\\todo|\\verbatim|\\warning|\\xmlonly|@arg|@attention|@author|@callgraph|@code|@dot|@else|@endcode|@endcond|@enddot|@endhtmlonly|@endif|@endlatexonly|@endlink|@endmanonly|@endverbatim|@endxmlonly|@f\[|@f]|@f$|@hideinitializer|@htmlonly|@interface|@internal|@invariant|@~|@@|@$|@\\|@#|@latexonly|@li|@manonly|@n|@nosubgrouping|@note|@only|@post|@pre|@remarks|@return|@returns|@sa|@see|@showinitializer|@since|@test|@todo|@verbatim|@warning|@xmlonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_TagWord();continue;}
        if((m = /^(?:\\param|@param)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_TagParam();continue;}
        if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_TagWordWord();continue;}
        if((m = /^(?:\\addindex|\\brief|\\bug|\\date|\\deprecated|\\fn|\\ingroup|\\line|\\mainpage|\\name|\\overload|\\par|\\short|\\skip|\\skipline|\\typedef|\\until|\\var|@addindex|@brief|@bug|@date|@deprecated|@fn|@ingroup|@line|@mainpage|@name|@overload|@par|@short|@skip|@skipline|@typedef|@until|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_TagString();continue;}
        if((m = /^(?:\\defgroup|\\page|\\paragraph|\\section|\\struct|\\subsection|\\subsubsection|\\union|\\weakgroup|@defgroup|@page|@paragraph|@section|@struct|@subsection|@subsubsection|@union|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_TagWordString();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\(<|>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '<<' && this.hl('<<', 'dsComment')) continue;
        if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_htmltag();continue;}
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._mL_htmlcomment();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_TagWord = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(/^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) return;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_TagParam = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_Tag2ndWord();continue;}
        if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_Tag2ndWord();continue;}
        if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_Tag2ndWord();continue;}
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_TagWordWord = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_Tag2ndWord();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_Tag2ndWord = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') {this._#pop#pop();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_TagString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '*/') return;
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._mL_htmlcomment();continue;}
        if(this.str[0] == '<<' && this.hl('<<', 'dsComment')) continue;
        if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._mL_htmltag();continue;}
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_TagWordString = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_htmltag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if(this.str[0] == '/>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._mL_identifiers();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._mL_htmlcomment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._mL_identifiers = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == ''' && this.hl(''', 'dsDataType')) {this._mL_types1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._mL_types2();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._mL_types1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if(this.str[0] == ''' && this.hl(''', 'dsDataType')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._mL_types2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/') return;
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._sL_TagWord = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(/^(?:\\addtogroup|\\a|\\anchor|\\b|\\c|\\class|\\cond|\\copydoc|\\def|\\dontinclude|\\dotfile|\\e|\\elseif|\\em|\\enum|\\example|\\exception|\\exceptions|\\file|\\htmlinclude|\\if|\\ifnot|\\include|\\link|\\namespace|\\p|\\package|\\ref|\\relatesalso|\\relates|\\retval|\\throw|\\throws|\\verbinclude|\\version|\\xrefitem|@addtogroup|@a|@anchor|@b|@c|@class|@cond|@copydoc|@def|@dontinclude|@dotfile|@e|@elseif|@em|@enum|@example|@exception|@exceptions|@file|@htmlinclude|@if|@ifnot|@include|@link|@namespace|@p|@package|@ref|@relatesalso|@relates|@retval|@throw|@throws|@verbinclude|@version|@xrefitem)\b/.exec(this.str)) return;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._sL_TagParam = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_Tag2ndWord();continue;}
        if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_Tag2ndWord();continue;}
        if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_Tag2ndWord();continue;}
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._sL_TagWordWord = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_Tag2ndWord();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._sL_Tag2ndWord = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._sL_TagString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._sL_htmlcomment();continue;}
        if(this.str[0] == '<<' && this.hl('<<', 'dsComment')) continue;
        if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sL_htmltag();continue;}
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._sL_TagWordString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._sL_htmltag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._sL_identifiers();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._sL_htmlcomment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._sL_identifiers = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == ''' && this.hl(''', 'dsDataType')) {this._sL_types1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._sL_types2();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._sL_types1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsDataType')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._sL_types2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};