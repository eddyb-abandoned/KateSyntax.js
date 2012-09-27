KateSyntax.langs.lua.syntax = {
    default: 'lua_normal',
    lua_normal: function lua_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^--\[(=*)\[/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_blockComment())return this.pop(), m-1;continue;}
            if((m = /^--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygenlua_lineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:table\.foreach|table\.foreachi|foreach|foreachi)\b/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--\[(=*)\[/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.lua_blockComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.lua_comment())return this.pop(), m-1;continue;}
            if((m = /^\[(=*)\[/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.lua_string_block())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.lua_string_single())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.lua_string_double())return this.pop(), m-1;continue;}
            if((m = /^(?:string\.byte|string\.char|string\.find|string\.len|string\.lower|string\.rep|string\.sub|string\.upper|string\.format|string\.gfind|string\.gsub|table\.concat|table\.getn|table\.sort|table\.insert|table\.remove|table\.setn|math\.abs|math\.sin|math\.cos|math\.tan|math\.asin|math\.acos|math\.atan|math\.atan2|math\.ceil|math\.floor|math\.mod|math\.frexp|math\.ldexp|math\.squrt|math\.min|math\.max|math\.log|math\.log10|math\.exp|math\.deg|math\.rad|math\.random|math\.randomseed|io\.close|io\.flush|io\.input|io\.lines|io\.open|io\.output|io\.read|io\.stderr|io\.stdin|io\.stdout|io\.tmpfile|io\.write|os\.clock|os\.date|os\.difftime|os\.execute|os\.exit|os\.getenv|os\.remove|os\.rename|os\.setlocale|os\.time|os\.tmpname|debug\.getinfo|debug\.getlocal|debug\.setlocal|debug\.sethook|debug\.gethook|assert|collectgarbage|dofile|error|next|print|rawget|rawset|tonumber|tostring|type|_ALERT|_ERRORMESSAGE|call|getmetatable|gcinfo|ipairs|loadfile|loadstring|pairs|pcall|require|LUA_PATH|setmetatable|_LOADED|_VERSION|gettagmethod|globals|newtag|setglobal|settag|settagmethod|setlinehook|getglobals|copytagmethods|dostring|getglobal|tag|setglobals|unpack|exit|readfrom|writeto|appendto|read|write|getinfo|getlocal|setlocal|setcallhook|tinsert|tremove|flush|seek|setlocale|execute|remove|rename|tmpname|getenv|getn|sort|table\.foreach|table\.foreachi|foreach|foreachi|abs|sin|cos|tan|asin|acos|atan|atan2|ceil|floor|mod|frexp|ldexp|squrt|min|max|log|log10|exp|deg|rad|random|randomseed|strlen|strsub|strlower|strupper|strchar|strrep|ascii|strbyte|format|strfind|gsub|openfile|closefile|date|clock|cgilua|cgilua\.lp\.translate|cgilua\.contentheader|cgilua\.script_file|cgilua\.header|cgilua\.script_path|cgilua\.htmlheader|cgilua\.script_pdir|cgilua\.redirect|cgilua\.script_vdir|cgilua\.mkabsoluteurl|cgilua\.script_vpath|cgilua\.mkurlpath|cgilua\.servervariable|cgilua\.put|cgilua\.urlpath|cgilua\.handlelp|cgilua\.errorlog|cgilua\.lp\.compile|cgilua\.seterrorhandler|cgilua\.lp\.include|cgilua\.seterroroutput|cgilua\.lp\.setcompatmode|cgilua\.addclosefunction|cgilua\.lp\.setoutfunc|cgilua\.addopenfunction|cgilua\.addscripthandler|cgilua\.addscripthandler|cgilua\.buildprocesshandler|cgilua\.setmaxfilesize|cgilua\.setmaxinput|cgilua\.urlcode\.encodetable|cgilua\.urlcode\.escape|cgilua\.urlcode\.parsequery|cgilua\.urlcode\.unescape|cgilua\.urlcode\.insertfield|cgilua\.setoutfunc|cgilua\.addopenfunction|cgilua\.doif|cgilua\.doscript|cgilua\.pack|cgilua\.splitpath|cgilua\.cookies\.get|cgilua\.cookies\.set|cgilua\.cookies\.sethtml|cgilua\.cookies\.delete|cgilua\.serialize|cgilua\.session\.close|cgilua\.session\.data|cgilua\.session\.load|cgilua\.session\.new|cgilua\.session\.open|cgilua\.session\.save|cgilua\.session\.setsessiondir|cgilua\.session\.delete|cgilua\.session|cgilua\.cookies|numrows|connect|close|fetch|getcolnames|getcoltypes|commit|rollback|setautocommit|lfs|lfs\.attributes|lfs\.chdir|lfs\.currentdir|lfs\.dir|lfs\.lock|lfs\.mkdir|lfs\.rmdir|lfs\.touch|lfs\.unlock|zip|zip\.open|zip\.openfile|files|seek|close|lines)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:and|function|in|local|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:nil|false|true)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;font-style:normal;font-weight:normal')) continue;
            if((m = /^\belseif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;font-style:normal;font-weight:normal')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;font-style:normal;font-weight:normal')) continue;
            if((m = /^\bif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;font-style:normal;font-weight:normal')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:break|do|else|elseif|end|for|if|repeat|return|then|until|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) continue;
            if((m = /^\b\d*\.?\d*(e|e\-|e\+)?\d+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b-?0[xX][0-9a-fA-F]+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*([({'"]|\[\[))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[A-Z_][A-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '!' && this.str[1] == '=' && this.hl('!=', 'dsError')) continue;
            if(this.str[0] == '-' && this.str[1] == '=' && this.hl('-=', 'dsError')) continue;
            if(this.str[0] == '+' && this.str[1] == '=' && this.hl('+=', 'dsError')) continue;
            if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsError')) continue;
            if(this.str[0] == '.' && this.str[1] == '=' && this.hl('.=', 'dsError')) continue;
            if((m = /^[[\]().=~+\-*/\^><#;]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    lua_comment: function lua_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsAlert')) continue;
            if((m = /^(?:TODO|FIXME|NOTE)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lua_blockComment: function lua_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\]%1\]/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsAlert')) continue;
            if((m = /^(?:TODO|FIXME|NOTE)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    lua_string_single: function lua_string_single(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\(a|b|f|n|r|t|v|\\|"|\'|[|])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop(), this.lua_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    lua_string_double: function lua_string_double(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[abfnrtv'"\\\[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop(), this.lua_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    lua_string_block: function lua_string_block(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\(a|b|f|n|r|t|v|\\|"|\'|[|])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\]%1\]/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    lua_error: function lua_error(m) {
        this.push();
        while(this.pos < this.len) {
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
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
    }
};
