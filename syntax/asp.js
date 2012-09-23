KateSyntax.langs.asp.syntax = {
    default: 'asp_nosource',
    asp_nosource: function asp_nosource(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^<\s*script\s*language="VBScript"[^>]*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^<\s*script(\s|>)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) {if(m = this.asp_scripts())return this.pop(), m-1;continue;}
            if((m = /^<\s*\/?\s*[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) {if(m = this.asp_htmltag())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.asp_htmlcomment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    asp_aspsource: function asp_aspsource(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^<\s*\/\s*script\s*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) {if(m = this.asp_asp_onelinecomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.asp_doublequotestring())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.asp_singlequotestring())return this.pop(), m-1;continue;}
            if(this.str[0] == '&' && this.hl('&', 'dsKeyword')) continue;
            if(undefined && this.hl(undefined, 'dsString')) continue;
            if((m = /^[0123456789]*\.\.\.[0123456789]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[;()}{:,[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\belseif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\belse\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bend if\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bexit function\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfunction\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend function\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bexit sub\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bsub\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend sub\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend class\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bexit do\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bdo(\s+(while))?\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bloop\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bexit while\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bwhile\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bwend\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bexit for\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bfor\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bnext\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bselect case\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\bend select\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:dim|redim|preserve|const|erase|nothing|set|new|me|function|sub|call|class|private|public|with|randomize|open|close|movenext|execute|eof|not|true|false|or|and|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:select|case|end select|if|then|else|elseif|end if|while|do|until|loop|wend|for|each|to|in|next|exit|continue)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:response|write|redirect|end|request|form|querystring|servervariables|cookies|session|server|createobject|abs|array|asc|atn|cbool|cbyte|ccur|cdate|cdbl|chr|cint|clng|cos|csng|cstr|date|dateadd|DateDiff|DatePart|DateSerial|DateValue|Date|Day|Exp|Filter|Fix|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetObject|Hex|Hour|InputBox|InStr|InStrRev|Int|IsArray|IsDate|IsEmpty|IsNull|IsNumeric|IsObject|Join|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Replace|RGB|Right|Rnd|Round|RTrim|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|Sgn|Sin|Space|Split|Sqr|StrComp|StrReverse|String|Tan|Time|Timer|TimeSerial|TimeValue|Trim|TypeName|UBound|UCase|VarType|Weekday|WeekdayName|Year|Add|AddFolders|BuildPath|Clear|Close|Copy|CopyFile|CopyFolder|CreateFolder|CreateTextFile|Delete|DeleteFile|DeleteFolder|DriveExists|Exists|FileExists|FolderExists|GetAbsolutePathName|GetBaseName|GetDrive|GetDriveName|GetExtensionName|GetFile|GetFileName|GetFolder|GetParentFolderName|GetSpecialFolder|GetTempName|Items|item|Keys|Move|MoveFile|MoveFolder|OpenAsTextStream|OpenTextFile|Raise|Read|ReadAll|ReadLine|Remove|RemoveAll|Skip|SkipLine|Write|WriteBlankLines|WriteLine)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    asp_asp_onelinecomment: function asp_asp_onelinecomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    asp_doublequotestring: function asp_doublequotestring(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.str[1] == '"' && this.hl('""', 'dsKeyword;color:#0F0F8F;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\\[0-7]{1,3}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0F8F;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\\x[0-9A-Fa-f]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0F8F;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    asp_singlequotestring: function asp_singlequotestring(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.str[1] == '\'' && this.hl('\'\'', 'dsKeyword;color:#0F0F8F;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    asp_htmltag: function asp_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.asp_identifiers())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    asp_htmlcomment: function asp_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.asp_identifiers())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    asp_identifiers: function asp_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsString')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.asp_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.asp_types2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    asp_types1: function asp_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    asp_types2: function asp_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    asp_scripts: function asp_scripts(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.asp_scripts_onelinecomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.asp_twolinecomment())return this.pop(), m-1;continue;}
            if((m = /^(?:select|case|end select|if|then|else|elseif|end if|while|do|until|loop|wend|for|each|to|in|next|exit|continue)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#A1A100;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:dim|redim|preserve|const|erase|nothing|set|new|me|function|sub|call|class|private|public|with|randomize|open|close|movenext|execute|eof|not|true|false|or|and|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:response|write|redirect|end|request|form|querystring|servervariables|cookies|session|server|createobject|abs|array|asc|atn|cbool|cbyte|ccur|cdate|cdbl|chr|cint|clng|cos|csng|cstr|date|dateadd|DateDiff|DatePart|DateSerial|DateValue|Date|Day|Exp|Filter|Fix|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetObject|Hex|Hour|InputBox|InStr|InStrRev|Int|IsArray|IsDate|IsEmpty|IsNull|IsNumeric|IsObject|Join|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Replace|RGB|Right|Rnd|Round|RTrim|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|Sgn|Sin|Space|Split|Sqr|StrComp|StrReverse|String|Tan|Time|Timer|TimeSerial|TimeValue|Trim|TypeName|UBound|UCase|VarType|Weekday|WeekdayName|Year|Add|AddFolders|BuildPath|Clear|Close|Copy|CopyFile|CopyFolder|CreateFolder|CreateTextFile|Delete|DeleteFile|DeleteFolder|DriveExists|Exists|FileExists|FolderExists|GetAbsolutePathName|GetBaseName|GetDrive|GetDriveName|GetExtensionName|GetFile|GetFileName|GetFolder|GetParentFolderName|GetSpecialFolder|GetTempName|Items|item|Keys|Move|MoveFile|MoveFolder|OpenAsTextStream|OpenTextFile|Raise|Read|ReadAll|ReadLine|Remove|RemoveAll|Skip|SkipLine|Write|WriteBlankLines|WriteLine)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^<%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.asp_aspsource())return this.pop(), m-1;continue;}
            if((m = /^<\s*\/\s*script\s*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.asp_doublequotestring())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.asp_singlequotestring())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[;()}{:,[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    asp_scripts_onelinecomment: function asp_scripts_onelinecomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\s*\/\s*script\s*>/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0F0000;fontStyle:normal;fontWeight:bold')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    asp_twolinecomment: function asp_twolinecomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
