var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._start();
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
HL.prototype._start = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^\s*[Rr][Ee][Mm](\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^(?:assoc|break|call|cd|chdir|cls|color|copy|date|del|dir|endlocal|erase|exit|ftype|md|mkdir|move|path|pause|popd|prompt|pushd|rd|ren|rename|rmdir|setlocal|shift|start|time|title|type|ver|verify|vol)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._command();continue;}
        if((m = /^(?:at|attrib|break|cacls|chcp|chkdsk|chkntfs|cmd|comp|compact|convert|diskcomp|diskcopy|doskey|fc|find|findstr|format|graftabl|help|label|mode|more|print|recover|replace|sort|subst|tree|xcopy)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._command();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._label();continue;}
        if((m = /^\b[Ee][Cc][Hh][Oo]\s+[Oo]([Ff][Ff]|[Nn])\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:echo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdEcho();continue;}
        if((m = /^(?:if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdIf();continue;}
        if((m = /^(?:for)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdFor();continue;}
        if((m = /^(?:goto)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._label();continue;}
        if((m = /^(?:set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdSet();continue;}
        if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._path();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._start();continue;}
        if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findMost = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._path();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._start();continue;}
        if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findStrings = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findSubstitutions = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '"' && this.hl('\"', 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._command = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._path();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._start();continue;}
        if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._label = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&label;&eos;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._comment();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._path = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[     \%/:*?"><|]/.exec(this.str)) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._assign = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._path();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._start();continue;}
        if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cmdSet = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&varname;=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdEcho = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\^./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._path();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._start();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cmdFor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%%[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._cmdForIn();continue;}
        if(this.str[0] == '/' && this.str[1] == 'D' && this.hl('/D', 'dsNormal')) continue;
        if(this.str[0] == '/' && this.str[1] == 'R' && this.hl('/R', 'dsNormal')) {this._cmdForR();continue;}
        if(this.str[0] == '/' && this.str[1] == 'L' && this.hl('/L', 'dsNormal')) {this._cmdForL();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForIn = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:in)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdForList();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForList = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._cmdForListBody();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForListBody = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {this._cmdForDo();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cmdForDo = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdForCommands();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForCommands = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%%(~([fdpnxsatz]|\$&varname;:)*)?[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^^\s*[Rr][Ee][Mm](\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^(?:assoc|break|call|cd|chdir|cls|color|copy|date|del|dir|endlocal|erase|exit|ftype|md|mkdir|move|path|pause|popd|prompt|pushd|rd|ren|rename|rmdir|setlocal|shift|start|time|title|type|ver|verify|vol)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._command();continue;}
        if((m = /^(?:at|attrib|break|cacls|chcp|chkdsk|chkntfs|cmd|comp|compact|convert|diskcomp|diskcopy|doskey|fc|find|findstr|format|graftabl|help|label|mode|more|print|recover|replace|sort|subst|tree|xcopy)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._command();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._label();continue;}
        if((m = /^\b[Ee][Cc][Hh][Oo]\s+[Oo]([Ff][Ff]|[Nn])\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:echo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdEcho();continue;}
        if((m = /^(?:if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdIf();continue;}
        if((m = /^(?:for)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdFor();continue;}
        if((m = /^(?:goto)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._label();continue;}
        if((m = /^(?:set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdSet();continue;}
        if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._path();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._start();continue;}
        if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._cmdForNestedCommands();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cmdForNestedCommands = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        if((m = /^%%(~([fdpnxsatz]|\$&varname;:)*)?[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^^\s*[Rr][Ee][Mm](\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^(?:assoc|break|call|cd|chdir|cls|color|copy|date|del|dir|endlocal|erase|exit|ftype|md|mkdir|move|path|pause|popd|prompt|pushd|rd|ren|rename|rmdir|setlocal|shift|start|time|title|type|ver|verify|vol)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._command();continue;}
        if((m = /^(?:at|attrib|break|cacls|chcp|chkdsk|chkntfs|cmd|comp|compact|convert|diskcomp|diskcopy|doskey|fc|find|findstr|format|graftabl|help|label|mode|more|print|recover|replace|sort|subst|tree|xcopy)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._command();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._label();continue;}
        if((m = /^\b[Ee][Cc][Hh][Oo]\s+[Oo]([Ff][Ff]|[Nn])\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:echo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdEcho();continue;}
        if((m = /^(?:if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdIf();continue;}
        if((m = /^(?:for)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdFor();continue;}
        if((m = /^(?:goto)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._label();continue;}
        if((m = /^(?:set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdSet();continue;}
        if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
        if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._path();continue;}
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._start();continue;}
        if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._cmdForNestedCommands();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cmdForR = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^([a-z][a-z.]*:)?[.]*\\*&pathpart;*&eop;/i.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%%[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._cmdForIn();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForL = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%%[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._cmdForLIn();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLIn = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:in)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cmdForLRange();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLRange = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._cmdForLStart();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLStart = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._cmdForLStartComma();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLStartComma = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {this._cmdForLStep();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLStep = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._cmdForLStepComma();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLStepComma = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {this._cmdForLEnd();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._cmdForLEndParen();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._cmdForLEndParen = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {this._cmdForDo();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
