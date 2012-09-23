KateSyntax.langs.wml.syntax = {
    default: 'wml_text',
    wml_text: function wml_text(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(_ *)?"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.wml_string())return this.pop(), m-1;continue;}
            if((m = /^ *<</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.wml_luastring())return this.pop(), m-1;continue;}
            if((m = /^(?:#textdomain|#else|#undef|#error|#warning)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.wml_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^(?:#define|#ifdef|#ifndef|#ifhave|#ifnhave|#ifver|#ifnver)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.wml_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^(?:#enddef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.wml_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.wml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {if(m = this.wml_macro())return this.pop(), m-1;continue;}
            if((m = /^\[(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.wml_section())return this.pop(), m-1;continue;}
            if((m = /^\[\//.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.wml_section())return this.pop(), m-1;continue;}
            if(/^(\w|,| )+=/.exec(this.str)) {if(m = this.wml_value())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {if(m = this.wml_variableSubstitution())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    wml_string: function wml_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {if(m = this.wml_macro())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {if(m = this.wml_variableSubstitution())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<\/(span|b|big|i|s|sub|sup|small|tt|u)>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^<(span|b|big|i|s|sub|sup|small|tt|u)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.pango_findAttributes())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    wml_luastring: function wml_luastring(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^>>/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
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
            if((m = /^\belse\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\belseif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:break|do|else|elseif|end|for|if|repeat|return|then|until|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) continue;
            if((m = /^\b\d*\.?\d*(e|e\-|e\+)?\d+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b-?0[xX][0-9a-fA-F]+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*([({'"]|\[\[))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[A-Z_][A-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '!' && this.str[1] == '=' && this.hl('!=', 'dsError')) continue;
            if(this.str[0] == '-' && this.str[1] == '=' && this.hl('-=', 'dsError')) continue;
            if(this.str[0] == '+' && this.str[1] == '=' && this.hl('+=', 'dsError')) continue;
            if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsError')) continue;
            if(this.str[0] == '.' && this.str[1] == '=' && this.hl('.=', 'dsError')) continue;
            if((m = /^[[\]().=~+\-*/\^><#;]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    wml_luamacrostring: function wml_luamacrostring(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^>>/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
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
            if((m = /^\belse\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\belseif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:break|do|else|elseif|end|for|if|repeat|return|then|until|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) continue;
            if((m = /^\b\d*\.?\d*(e|e\-|e\+)?\d+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b-?0[xX][0-9a-fA-F]+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*([({'"]|\[\[))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[A-Z_][A-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '!' && this.str[1] == '=' && this.hl('!=', 'dsError')) continue;
            if(this.str[0] == '-' && this.str[1] == '=' && this.hl('-=', 'dsError')) continue;
            if(this.str[0] == '+' && this.str[1] == '=' && this.hl('+=', 'dsError')) continue;
            if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsError')) continue;
            if(this.str[0] == '.' && this.str[1] == '=' && this.hl('.=', 'dsError')) continue;
            if((m = /^[[\]().=~+\-*/\^><#;]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    wml_comment: function wml_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:wmllint|wmlindent|wmlscope|po)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    wml_macro: function wml_macro(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {if(m = this.wml_macro())return this.pop(), m-1;continue;}
            if((m = /^(_ *)?"/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.wml_macroString())return this.pop(), m-1;continue;}
            if((m = /^ *<</.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.wml_luamacrostring())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsChar')) {if(m = this.wml_macroString2())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsFunction')) return this.pop();
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {if(m = this.wml_variableSubstitution())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    wml_macroString: function wml_macroString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsChar')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {if(m = this.wml_macro())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {if(m = this.wml_variableSubstitution())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<\/(span|b|big|i|s|sub|sup|small|tt|u)>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^<(span|b|big|i|s|sub|sup|small|tt|u)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.pango_findAttributes())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    wml_macroString2: function wml_macroString2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsChar')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {if(m = this.wml_macro())return this.pop(), m-1;continue;}
            if((m = /^(_ *)?"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.wml_string())return this.pop(), m-1;continue;}
            if((m = /^ *<</.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.wml_luastring())return this.pop(), m-1;continue;}
            if((m = /^(?:#textdomain|#else|#undef|#error|#warning)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.wml_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^(?:#define|#ifdef|#ifndef|#ifhave|#ifnhave|#ifver|#ifnver)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.wml_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^(?:#enddef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.wml_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.wml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsFunction')) {if(m = this.wml_macro())return this.pop(), m-1;continue;}
            if((m = /^\[(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.wml_section())return this.pop(), m-1;continue;}
            if((m = /^\[\//.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.wml_section())return this.pop(), m-1;continue;}
            if(/^(\w|,| )+=/.exec(this.str)) {if(m = this.wml_value())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {if(m = this.wml_variableSubstitution())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    wml_section: function wml_section(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return this.pop();
            if(this.str[0] == '\n') return this.pop(), this.wml_error();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    wml_value: function wml_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '=' && this.hl('=', 'dsNormal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    wml_preprocessor: function wml_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    wml_error: function wml_error(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    wml_variableSubstitution: function wml_variableSubstitution(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) return this.pop();
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {if(m = this.wml_variableSubstitution())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsBaseN')) {if(m = this.wml_variableSubscript())return this.pop(), m-1;continue;}
            if(/^[^A-Za-z0-9_\.]/.exec(this.str)) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    },
    wml_variableSubscript: function wml_variableSubscript(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop(), this.wml_error();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    wml_variableSubstitutionRule: function wml_variableSubstitutionRule(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '$' && this.hl('$', 'dsDecVal')) {if(m = this.wml_variableSubstitution())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    },
    pango_start: function pango_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<\/(span|b|big|i|s|sub|sup|small|tt|u)>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^<(span|b|big|i|s|sub|sup|small|tt|u)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.pango_findAttributes())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    pango_findPango: function pango_findPango(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<\/(span|b|big|i|s|sub|sup|small|tt|u)>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^<(span|b|big|i|s|sub|sup|small|tt|u)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.pango_findAttributes())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    pango_findAttributes: function pango_findAttributes(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^gravity=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inGravity())return this.pop(), m-1;continue;}
            if((m = /^gravity_hint=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inGravityHint())return this.pop(), m-1;continue;}
            if((m = /^(font_)?stretch=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inStretch())return this.pop(), m-1;continue;}
            if((m = /^(strikethrough|fallback)=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inBoolean())return this.pop(), m-1;continue;}
            if((m = /^(font_)?style=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inStyle())return this.pop(), m-1;continue;}
            if((m = /^underline=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inUnderline())return this.pop(), m-1;continue;}
            if((m = /^(font_)?variant=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inVariant())return this.pop(), m-1;continue;}
            if((m = /^(font_)?weight=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inWeight())return this.pop(), m-1;continue;}
            if((m = /^(size|font_size|rise|letter_spacing)=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inInt())return this.pop(), m-1;continue;}
            if((m = /^(font|font_desc|font_family|face|lang)=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inString())return this.pop(), m-1;continue;}
            if((m = /^(strikethrough_color|foreground|fgcolor|color|background|bgcolor|underline_color)=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.pango_inColor())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    pango_inGravity: function pango_inGravity(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(south|east|north|west|auto)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inGravityHint: function pango_inGravityHint(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(natural|strong|line)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inStretch: function pango_inStretch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(ultracondensed|extracondensed|condensed|semicondensed|normal|semiexpanded|expanded|extraexpanded|ultraexpanded)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inBoolean: function pango_inBoolean(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(false|true)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inStyle: function pango_inStyle(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(normal|oblique|italic)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inUnderline: function pango_inUnderline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(none|single|double|low|error)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inVariant: function pango_inVariant(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(normal|smallcaps)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inWeight: function pango_inWeight(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'[0-9]*'/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            if((m = /^'(ultralight|light|normal|bold|ultrabold|heavy)'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pango_inColor: function pango_inColor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'((#[0-9a-fA-F]{3}){1,4}|snow|ghost white|GhostWhite|white smoke|WhiteSmoke|gainsboro|floral white|FloralWhite|old lace|OldLace|linen|antique white|AntiqueWhite|papaya whip|PapayaWhip|blanched almond|BlanchedAlmond|bisque|peach puff|PeachPuff|navajo white|NavajoWhite|moccasin|cornsilk|ivory|lemon chiffon|LemonChiffon|seashell|honeydew|mint cream|MintCream|azure|alice blue|AliceBlue|lavender|lavender blush|LavenderBlush|misty rose|MistyRose|white|black|dark slate gray|DarkSlateGray|dark slate grey|DarkSlateGrey|dim gray|DimGray|dim grey|DimGrey|slate gray|SlateGray|slate grey|SlateGrey|light slate gray|LightSlateGray|light slate grey|LightSlateGrey|gray|grey|light grey|LightGrey|light gray|LightGray|midnight blue|MidnightBlue|navy|navy blue|NavyBlue|cornflower blue|CornflowerBlue|dark slate blue|DarkSlateBlue|slate blue|SlateBlue|medium slate blue|MediumSlateBlue|light slate blue|LightSlateBlue|medium blue|MediumBlue|royal blue|RoyalBlue|blue|dodger blue|DodgerBlue|deep sky blue|DeepSkyBlue|sky blue|SkyBlue|light sky blue|LightSkyBlue|steel blue|SteelBlue|light steel blue|LightSteelBlue|light blue|LightBlue|powder blue|PowderBlue|pale turquoise|PaleTurquoise|dark turquoise|DarkTurquoise|medium turquoise|MediumTurquoise|turquoise|cyan|light cyan|LightCyan|cadet blue|CadetBlue|medium aquamarine|MediumAquamarine|aquamarine|dark green|DarkGreen|dark olive green|DarkOliveGreen|dark sea green|DarkSeaGreen|sea green|SeaGreen|medium sea green|MediumSeaGreen|light sea green|LightSeaGreen|pale green|PaleGreen|spring green|SpringGreen|lawn green|LawnGreen|green|chartreuse|medium spring green|MediumSpringGreen|green yellow|GreenYellow|lime green|LimeGreen|yellow green|YellowGreen|forest green|ForestGreen|olive drab|OliveDrab|dark khaki|DarkKhaki|khaki|pale goldenrod|PaleGoldenrod|light goldenrod yellow|LightGoldenrodYellow|light yellow|LightYellow|yellow|gold|light goldenrod|LightGoldenrod|goldenrod|dark goldenrod|DarkGoldenrod|rosy brown|RosyBrown|indian red|IndianRed|saddle brown|SaddleBrown|sienna|peru|burlywood|beige|wheat|sandy brown|SandyBrown|tan|chocolate|firebrick|brown|dark salmon|DarkSalmon|salmon|light salmon|LightSalmon|orange|dark orange|DarkOrange|coral|light coral|LightCoral|tomato|orange red|OrangeRed|red|hot pink|HotPink|deep pink|DeepPink|pink|light pink|LightPink|pale violet red|PaleVioletRed|maroon|medium violet red|MediumVioletRed|violet red|VioletRed|magenta|violet|plum|orchid|medium orchid|MediumOrchid|dark orchid|DarkOrchid|dark violet|DarkViolet|blue violet|BlueViolet|purple|medium purple|MediumPurple|thistle|snow1|snow2|snow3|snow4|seashell1|seashell2|seashell3|seashell4|AntiqueWhite1|AntiqueWhite2|AntiqueWhite3|AntiqueWhite4|bisque1|bisque2|bisque3|bisque4|PeachPuff1|PeachPuff2|PeachPuff3|PeachPuff4|NavajoWhite1|NavajoWhite2|NavajoWhite3|NavajoWhite4|LemonChiffon1|LemonChiffon2|LemonChiffon3|LemonChiffon4|cornsilk1|cornsilk2|cornsilk3|cornsilk4|ivory1|ivory2|ivory3|ivory4|honeydew1|honeydew2|honeydew3|honeydew4|LavenderBlush1|LavenderBlush2|LavenderBlush3|LavenderBlush4|MistyRose1|MistyRose2|MistyRose3|MistyRose4|azure1|azure2|azure3|azure4|SlateBlue1|SlateBlue2|SlateBlue3|SlateBlue4|RoyalBlue1|RoyalBlue2|RoyalBlue3|RoyalBlue4|blue1|blue2|blue3|blue4|DodgerBlue1|DodgerBlue2|DodgerBlue3|DodgerBlue4|SteelBlue1|SteelBlue2|SteelBlue3|SteelBlue4|DeepSkyBlue1|DeepSkyBlue2|DeepSkyBlue3|DeepSkyBlue4|SkyBlue1|SkyBlue2|SkyBlue3|SkyBlue4|LightSkyBlue1|LightSkyBlue2|LightSkyBlue3|LightSkyBlue4|SlateGray1|SlateGray2|SlateGray3|SlateGray4|LightSteelBlue1|LightSteelBlue2|LightSteelBlue3|LightSteelBlue4|LightBlue1|LightBlue2|LightBlue3|LightBlue4|LightCyan1|LightCyan2|LightCyan3|LightCyan4|PaleTurquoise1|PaleTurquoise2|PaleTurquoise3|PaleTurquoise4|CadetBlue1|CadetBlue2|CadetBlue3|CadetBlue4|turquoise1|turquoise2|turquoise3|turquoise4|cyan1|cyan2|cyan3|cyan4|DarkSlateGray1|DarkSlateGray2|DarkSlateGray3|DarkSlateGray4|aquamarine1|aquamarine2|aquamarine3|aquamarine4|DarkSeaGreen1|DarkSeaGreen2|DarkSeaGreen3|DarkSeaGreen4|SeaGreen1|SeaGreen2|SeaGreen3|SeaGreen4|PaleGreen1|PaleGreen2|PaleGreen3|PaleGreen4|SpringGreen1|SpringGreen2|SpringGreen3|SpringGreen4|green1|green2|green3|green4|chartreuse1|chartreuse2|chartreuse3|chartreuse4|OliveDrab1|OliveDrab2|OliveDrab3|OliveDrab4|DarkOliveGreen1|DarkOliveGreen2|DarkOliveGreen3|DarkOliveGreen4|khaki1|khaki2|khaki3|khaki4|LightGoldenrod1|LightGoldenrod2|LightGoldenrod3|LightGoldenrod4|LightYellow1|LightYellow2|LightYellow3|LightYellow4|yellow1|yellow2|yellow3|yellow4|gold1|gold2|gold3|gold4|goldenrod1|goldenrod2|goldenrod3|goldenrod4|DarkGoldenrod1|DarkGoldenrod2|DarkGoldenrod3|DarkGoldenrod4|RosyBrown1|RosyBrown2|RosyBrown3|RosyBrown4|IndianRed1|IndianRed2|IndianRed3|IndianRed4|sienna1|sienna2|sienna3|sienna4|burlywood1|burlywood2|burlywood3|burlywood4|wheat1|wheat2|wheat3|wheat4|tan1|tan2|tan3|tan4|chocolate1|chocolate2|chocolate3|chocolate4|firebrick1|firebrick2|firebrick3|firebrick4|brown1|brown2|brown3|brown4|salmon1|salmon2|salmon3|salmon4|LightSalmon1|LightSalmon2|LightSalmon3|LightSalmon4|orange1|orange2|orange3|orange4|DarkOrange1|DarkOrange2|DarkOrange3|DarkOrange4|coral1|coral2|coral3|coral4|tomato1|tomato2|tomato3|tomato4|OrangeRed1|OrangeRed2|OrangeRed3|OrangeRed4|red1|red2|red3|red4|DeepPink1|DeepPink2|DeepPink3|DeepPink4|HotPink1|HotPink2|HotPink3|HotPink4|pink1|pink2|pink3|pink4|LightPink1|LightPink2|LightPink3|LightPink4|PaleVioletRed1|PaleVioletRed2|PaleVioletRed3|PaleVioletRed4|maroon1|maroon2|maroon3|maroon4|VioletRed1|VioletRed2|VioletRed3|VioletRed4|magenta1|magenta2|magenta3|magenta4|orchid1|orchid2|orchid3|orchid4|plum1|plum2|plum3|plum4|MediumOrchid1|MediumOrchid2|MediumOrchid3|MediumOrchid4|DarkOrchid1|DarkOrchid2|DarkOrchid3|DarkOrchid4|purple1|purple2|purple3|purple4|MediumPurple1|MediumPurple2|MediumPurple3|MediumPurple4|thistle1|thistle2|thistle3|thistle4|gray0|grey0|gray1|grey1|gray2|grey2|gray3|grey3|gray4|grey4|gray5|grey5|gray6|grey6|gray7|grey7|gray8|grey8|gray9|grey9|gray10|grey10|gray11|grey11|gray12|grey12|gray13|grey13|gray14|grey14|gray15|grey15|gray16|grey16|gray17|grey17|gray18|grey18|gray19|grey19|gray20|grey20|gray21|grey21|gray22|grey22|gray23|grey23|gray24|grey24|gray25|grey25|gray26|grey26|gray27|grey27|gray28|grey28|gray29|grey29|gray30|grey30|gray31|grey31|gray32|grey32|gray33|grey33|gray34|grey34|gray35|grey35|gray36|grey36|gray37|grey37|gray38|grey38|gray39|grey39|gray40|grey40|gray41|grey41|gray42|grey42|gray43|grey43|gray44|grey44|gray45|grey45|gray46|grey46|gray47|grey47|gray48|grey48|gray49|grey49|gray50|grey50|gray51|grey51|gray52|grey52|gray53|grey53|gray54|grey54|gray55|grey55|gray56|grey56|gray57|grey57|gray58|grey58|gray59|grey59|gray60|grey60|gray61|grey61|gray62|grey62|gray63|grey63|gray64|grey64|gray65|grey65|gray66|grey66|gray67|grey67|gray68|grey68|gray69|grey69|gray70|grey70|gray71|grey71|gray72|grey72|gray73|grey73|gray74|grey74|gray75|grey75|gray76|grey76|gray77|grey77|gray78|grey78|gray79|grey79|gray80|grey80|gray81|grey81|gray82|grey82|gray83|grey83|gray84|grey84|gray85|grey85|gray86|grey86|gray87|grey87|gray88|grey88|gray89|grey89|gray90|grey90|gray91|grey91|gray92|grey92|gray93|grey93|gray94|grey94|gray95|grey95|gray96|grey96|gray97|grey97|gray98|grey98|gray99|grey99|gray100|grey100|dark grey|DarkGrey|dark gray|DarkGray|dark blue|DarkBlue|dark cyan|DarkCyan|dark magenta|DarkMagenta|dark red|DarkRed|light green|LightGreen)'/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsFloat');
        }
        this.pop();
    },
    pango_inInt: function pango_inInt(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(-?)[0-9]*'/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    },
    pango_inString: function pango_inString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
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
            if((m = /^\belse\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\belseif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:break|do|else|elseif|end|for|if|repeat|return|then|until|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) continue;
            if((m = /^\b\d*\.?\d*(e|e\-|e\+)?\d+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b-?0[xX][0-9a-fA-F]+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*([({'"]|\[\[))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b[A-Z_][A-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;fontStyle:normal;fontWeight:normal')) continue;
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
