var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._nosource();
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
HL.prototype._nosource = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^<\s*script\s*language="VBScript"[^>]*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^<\s*script(\s|>)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._scripts();continue;}
        if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._htmltag();continue;}
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._htmlcomment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._aspsource = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^<\s*\/\s*script\s*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) {this._asp_onelinecomment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._doublequotestring();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singlequotestring();continue;}
        if(this.str[0] == '&' && this.hl('&', 'dsKeyword')) continue;
        if(undefined && this.hl(undefined, 'dsString')) continue;
        if((m = /^[0123456789]*\.\.\.[0123456789]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[;()}{:,[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\belseif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belse\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend if\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bexit function\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfunction\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend function\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bexit sub\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bsub\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend sub\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bclass\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend class\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bexit do\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdo(\s+(while))?\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bloop\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bexit while\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bwhile\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bwend\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bexit for\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfor\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bnext\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bselect case\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend select\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:dim|redim|preserve|const|erase|nothing|set|new|me|function|sub|call|class|private|public|with|randomize|open|close|movenext|execute|eof|not|true|false|or|and|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:select|case|end select|if|then|else|elseif|end if|while|do|until|loop|wend|for|each|to|in|next|exit|continue)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:response|write|redirect|end|request|form|querystring|servervariables|cookies|session|server|createobject|abs|array|asc|atn|cbool|cbyte|ccur|cdate|cdbl|chr|cint|clng|cos|csng|cstr|date|dateadd|DateDiff|DatePart|DateSerial|DateValue|Date|Day|Exp|Filter|Fix|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetObject|Hex|Hour|InputBox|InStr|InStrRev|Int|IsArray|IsDate|IsEmpty|IsNull|IsNumeric|IsObject|Join|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Replace|RGB|Right|Rnd|Round|RTrim|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|Sgn|Sin|Space|Split|Sqr|StrComp|StrReverse|String|Tan|Time|Timer|TimeSerial|TimeValue|Trim|TypeName|UBound|UCase|VarType|Weekday|WeekdayName|Year|Add|AddFolders|BuildPath|Clear|Close|Copy|CopyFile|CopyFolder|CreateFolder|CreateTextFile|Delete|DeleteFile|DeleteFolder|DriveExists|Exists|FileExists|FolderExists|GetAbsolutePathName|GetBaseName|GetDrive|GetDriveName|GetExtensionName|GetFile|GetFileName|GetFolder|GetParentFolderName|GetSpecialFolder|GetTempName|Items|item|Keys|Move|MoveFile|MoveFolder|OpenAsTextStream|OpenTextFile|Raise|Read|ReadAll|ReadLine|Remove|RemoveAll|Skip|SkipLine|Write|WriteBlankLines|WriteLine)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._asp_onelinecomment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._doublequotestring = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.str[1] == '"' && this.hl('""', 'dsKeyword')) continue;
        if((m = /^\\[0-7]{1,3}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\\x[0-9A-Fa-f]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singlequotestring = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.str[1] == '\'' && this.hl('\'\'', 'dsKeyword')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._htmltag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._identifiers();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._htmlcomment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._identifiers();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._identifiers = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {this._types1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._types2();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._types1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._types2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._scripts = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._scripts_onelinecomment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._twolinecomment();continue;}
        if((m = /^(?:select|case|end select|if|then|else|elseif|end if|while|do|until|loop|wend|for|each|to|in|next|exit|continue)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:dim|redim|preserve|const|erase|nothing|set|new|me|function|sub|call|class|private|public|with|randomize|open|close|movenext|execute|eof|not|true|false|or|and|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:response|write|redirect|end|request|form|querystring|servervariables|cookies|session|server|createobject|abs|array|asc|atn|cbool|cbyte|ccur|cdate|cdbl|chr|cint|clng|cos|csng|cstr|date|dateadd|DateDiff|DatePart|DateSerial|DateValue|Date|Day|Exp|Filter|Fix|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetObject|Hex|Hour|InputBox|InStr|InStrRev|Int|IsArray|IsDate|IsEmpty|IsNull|IsNumeric|IsObject|Join|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Replace|RGB|Right|Rnd|Round|RTrim|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|Sgn|Sin|Space|Split|Sqr|StrComp|StrReverse|String|Tan|Time|Timer|TimeSerial|TimeValue|Trim|TypeName|UBound|UCase|VarType|Weekday|WeekdayName|Year|Add|AddFolders|BuildPath|Clear|Close|Copy|CopyFile|CopyFolder|CreateFolder|CreateTextFile|Delete|DeleteFile|DeleteFolder|DriveExists|Exists|FileExists|FolderExists|GetAbsolutePathName|GetBaseName|GetDrive|GetDriveName|GetExtensionName|GetFile|GetFileName|GetFolder|GetParentFolderName|GetSpecialFolder|GetTempName|Items|item|Keys|Move|MoveFile|MoveFolder|OpenAsTextStream|OpenTextFile|Raise|Read|ReadAll|ReadLine|Remove|RemoveAll|Skip|SkipLine|Write|WriteBlankLines|WriteLine)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._aspsource();continue;}
        if((m = /^<\s*\/\s*script\s*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._doublequotestring();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singlequotestring();continue;}
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[;()}{:,[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._scripts_onelinecomment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<\s*\/\s*script\s*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._twolinecomment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
