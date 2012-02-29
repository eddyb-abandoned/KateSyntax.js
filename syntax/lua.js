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
        if((m = /^(?:table\.foreach|table\.foreachi|foreach|foreachi)\b/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--\[(=*)\[/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._blockComment();continue;}
        if(this.str[0] == '--' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if((m = /^\[(=*)\[/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string_block();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string_single();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_double();continue;}
        if((m = /^(?:string\.byte|string\.char|string\.find|string\.len|string\.lower|string\.rep|string\.sub|string\.upper|string\.format|string\.gfind|string\.gsub|table\.concat|table\.getn|table\.sort|table\.insert|table\.remove|table\.setn|math\.abs|math\.sin|math\.cos|math\.tan|math\.asin|math\.acos|math\.atan|math\.atan2|math\.ceil|math\.floor|math\.mod|math\.frexp|math\.ldexp|math\.squrt|math\.min|math\.max|math\.log|math\.log10|math\.exp|math\.deg|math\.rad|math\.random|math\.randomseed|io\.close|io\.flush|io\.input|io\.lines|io\.open|io\.output|io\.read|io\.stderr|io\.stdin|io\.stdout|io\.tmpfile|io\.write|os\.clock|os\.date|os\.difftime|os\.execute|os\.exit|os\.getenv|os\.remove|os\.rename|os\.setlocale|os\.time|os\.tmpname|debug\.getinfo|debug\.getlocal|debug\.setlocal|debug\.sethook|debug\.gethook|assert|collectgarbage|dofile|error|next|print|rawget|rawset|tonumber|tostring|type|_ALERT|_ERRORMESSAGE|call|getmetatable|gcinfo|ipairs|loadfile|loadstring|pairs|pcall|require|LUA_PATH|setmetatable|_LOADED|_VERSION|gettagmethod|globals|newtag|setglobal|settag|settagmethod|setlinehook|getglobals|copytagmethods|dostring|getglobal|tag|setglobals|unpack|exit|readfrom|writeto|appendto|read|write|getinfo|getlocal|setlocal|setcallhook|tinsert|tremove|flush|seek|setlocale|execute|remove|rename|tmpname|getenv|getn|sort|table\.foreach|table\.foreachi|foreach|foreachi|abs|sin|cos|tan|asin|acos|atan|atan2|ceil|floor|mod|frexp|ldexp|squrt|min|max|log|log10|exp|deg|rad|random|randomseed|strlen|strsub|strlower|strupper|strchar|strrep|ascii|strbyte|format|strfind|gsub|openfile|closefile|date|clock|cgilua|cgilua\.lp\.translate|cgilua\.contentheader|cgilua\.script_file|cgilua\.header|cgilua\.script_path|cgilua\.htmlheader|cgilua\.script_pdir|cgilua\.redirect|cgilua\.script_vdir|cgilua\.mkabsoluteurl|cgilua\.script_vpath|cgilua\.mkurlpath|cgilua\.servervariable|cgilua\.put|cgilua\.urlpath|cgilua\.handlelp|cgilua\.errorlog|cgilua\.lp\.compile|cgilua\.seterrorhandler|cgilua\.lp\.include|cgilua\.seterroroutput|cgilua\.lp\.setcompatmode|cgilua\.addclosefunction|cgilua\.lp\.setoutfunc|cgilua\.addopenfunction|cgilua\.addscripthandler|cgilua\.addscripthandler|cgilua\.buildprocesshandler|cgilua\.setmaxfilesize|cgilua\.setmaxinput|cgilua\.urlcode\.encodetable|cgilua\.urlcode\.escape|cgilua\.urlcode\.parsequery|cgilua\.urlcode\.unescape|cgilua\.urlcode\.insertfield|cgilua\.setoutfunc|cgilua\.addopenfunction|cgilua\.doif|cgilua\.doscript|cgilua\.pack|cgilua\.splitpath|cgilua\.cookies\.get|cgilua\.cookies\.set|cgilua\.cookies\.sethtml|cgilua\.cookies\.delete|cgilua\.serialize|cgilua\.session\.close|cgilua\.session\.data|cgilua\.session\.load|cgilua\.session\.new|cgilua\.session\.open|cgilua\.session\.save|cgilua\.session\.setsessiondir|cgilua\.session\.delete|cgilua\.session|cgilua\.cookies|numrows|connect|close|fetch|getcolnames|getcoltypes|commit|rollback|setautocommit|lfs|lfs\.attributes|lfs\.chdir|lfs\.currentdir|lfs\.dir|lfs\.lock|lfs\.mkdir|lfs\.rmdir|lfs\.touch|lfs\.unlock|zip|zip\.open|zip\.openfile|files|seek|close|lines)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:and|function|in|local|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:nil|false|true)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belse\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belseif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:break|do|else|elseif|end|for|if|repeat|return|then|until|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) continue;
        if((m = /^\b\d*\.?\d*(e|e\-|e\+)?\d+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b-?0[xX][0-9a-fA-F]+\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*([({'"]|\[\[))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b[A-Z_][A-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b[a-zA-Z_][a-zA-Z0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '!=' && this.hl('!=', 'dsError')) continue;
        if(this.str[0] == '-=' && this.hl('-=', 'dsError')) continue;
        if(this.str[0] == '+=' && this.hl('+=', 'dsError')) continue;
        if(this.str[0] == '++' && this.hl('++', 'dsError')) continue;
        if(this.str[0] == '.=' && this.hl('.=', 'dsError')) continue;
        if((m = /^[[\]().=~+\-*/\^><#;]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '--' && this.hl('--', 'dsAlert')) continue;
        if((m = /^(?:TODO|FIXME|NOTE)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._blockComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\]%1\]/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '--' && this.hl('--', 'dsAlert')) continue;
        if((m = /^(?:TODO|FIXME|NOTE)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string_single = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\(a|b|f|n|r|t|v|\\|"|\'|[|])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) {this._error();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_double = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[abfnrtv'"\\\[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) {this._error();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_block = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\(a|b|f|n|r|t|v|\\|"|\'|[|])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\]%1\]/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._error = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsError');
    }
};
