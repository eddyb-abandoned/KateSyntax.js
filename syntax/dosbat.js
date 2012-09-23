KateSyntax.langs.dosbat.syntax = {
    default: 'dosbat_start',
    dosbat_start: function dosbat_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*[Rr][Ee][Mm](\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.dosbat_comment())return this.pop(), m-1;continue;}
            if((m = /^(?:assoc|break|call|cd|chdir|cls|color|copy|date|del|dir|endlocal|erase|exit|ftype|md|mkdir|move|path|pause|popd|prompt|pushd|rd|ren|rename|rmdir|setlocal|shift|start|time|title|type|ver|verify|vol)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_command())return this.pop(), m-1;continue;}
            if((m = /^(?:at|attrib|break|cacls|chcp|chkdsk|chkntfs|cmd|comp|compact|convert|diskcomp|diskcopy|doskey|fc|find|findstr|format|graftabl|help|label|mode|more|print|recover|replace|sort|subst|tree|xcopy)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_command())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.dosbat_label())return this.pop(), m-1;continue;}
            if((m = /^\b[Ee][Cc][Hh][Oo]\s+[Oo]([Ff][Ff]|[Nn])\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:echo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdEcho())return this.pop(), m-1;continue;}
            if((m = /^(?:if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:for)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdFor())return this.pop(), m-1;continue;}
            if((m = /^(?:goto)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_label())return this.pop(), m-1;continue;}
            if((m = /^(?:set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_path())return this.pop(), m-1;continue;}
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.dosbat_start())return this.pop(), m-1;continue;}
            if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_findMost: function dosbat_findMost(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_path())return this.pop(), m-1;continue;}
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.dosbat_start())return this.pop(), m-1;continue;}
            if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_findStrings: function dosbat_findStrings(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_findSubstitutions: function dosbat_findSubstitutions(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_comment: function dosbat_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    dosbat_string: function dosbat_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    dosbat_command: function dosbat_command(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_path())return this.pop(), m-1;continue;}
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.dosbat_start())return this.pop(), m-1;continue;}
            if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_label: function dosbat_label(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&label;&eos;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.dosbat_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_path: function dosbat_path(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[     \\%/:*?"><|]/.exec(this.str)) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_assign: function dosbat_assign(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_path())return this.pop(), m-1;continue;}
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.dosbat_start())return this.pop(), m-1;continue;}
            if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_cmdSet: function dosbat_cmdSet(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&varname;=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdEcho: function dosbat_cmdEcho(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\^./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_path())return this.pop(), m-1;continue;}
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.dosbat_start())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_cmdFor: function dosbat_cmdFor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%%[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.dosbat_cmdForIn())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == 'D' && this.hl('/D', 'dsNormal')) continue;
            if(this.str[0] == '/' && this.str[1] == 'R' && this.hl('/R', 'dsNormal')) {if(m = this.dosbat_cmdForR())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == 'L' && this.hl('/L', 'dsNormal')) {if(m = this.dosbat_cmdForL())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForIn: function dosbat_cmdForIn(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:in)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdForList())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForList: function dosbat_cmdForList(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.dosbat_cmdForListBody())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForListBody: function dosbat_cmdForListBody(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {if(m = this.dosbat_cmdForDo())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_cmdForDo: function dosbat_cmdForDo(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdForCommands())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForCommands: function dosbat_cmdForCommands(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%%(~([fdpnxsatz]|\$&varname;:)*)?[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s*[Rr][Ee][Mm](\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.dosbat_comment())return this.pop(), m-1;continue;}
            if((m = /^(?:assoc|break|call|cd|chdir|cls|color|copy|date|del|dir|endlocal|erase|exit|ftype|md|mkdir|move|path|pause|popd|prompt|pushd|rd|ren|rename|rmdir|setlocal|shift|start|time|title|type|ver|verify|vol)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_command())return this.pop(), m-1;continue;}
            if((m = /^(?:at|attrib|break|cacls|chcp|chkdsk|chkntfs|cmd|comp|compact|convert|diskcomp|diskcopy|doskey|fc|find|findstr|format|graftabl|help|label|mode|more|print|recover|replace|sort|subst|tree|xcopy)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_command())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.dosbat_label())return this.pop(), m-1;continue;}
            if((m = /^\b[Ee][Cc][Hh][Oo]\s+[Oo]([Ff][Ff]|[Nn])\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:echo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdEcho())return this.pop(), m-1;continue;}
            if((m = /^(?:if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:for)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdFor())return this.pop(), m-1;continue;}
            if((m = /^(?:goto)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_label())return this.pop(), m-1;continue;}
            if((m = /^(?:set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_path())return this.pop(), m-1;continue;}
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.dosbat_start())return this.pop(), m-1;continue;}
            if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.dosbat_cmdForNestedCommands())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_cmdForNestedCommands: function dosbat_cmdForNestedCommands(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if((m = /^%%(~([fdpnxsatz]|\$&varname;:)*)?[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s*[Rr][Ee][Mm](\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.dosbat_comment())return this.pop(), m-1;continue;}
            if((m = /^(?:assoc|break|call|cd|chdir|cls|color|copy|date|del|dir|endlocal|erase|exit|ftype|md|mkdir|move|path|pause|popd|prompt|pushd|rd|ren|rename|rmdir|setlocal|shift|start|time|title|type|ver|verify|vol)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_command())return this.pop(), m-1;continue;}
            if((m = /^(?:at|attrib|break|cacls|chcp|chkdsk|chkntfs|cmd|comp|compact|convert|diskcomp|diskcopy|doskey|fc|find|findstr|format|graftabl|help|label|mode|more|print|recover|replace|sort|subst|tree|xcopy)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_command())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.dosbat_label())return this.pop(), m-1;continue;}
            if((m = /^\b[Ee][Cc][Hh][Oo]\s+[Oo]([Ff][Ff]|[Nn])\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:echo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdEcho())return this.pop(), m-1;continue;}
            if((m = /^(?:if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:for)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdFor())return this.pop(), m-1;continue;}
            if((m = /^(?:goto)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_label())return this.pop(), m-1;continue;}
            if((m = /^(?:set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dosbat_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) continue;
            if((m = /^([%!])[^%\s!]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[%!][a-z0-9]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[/-][A-Za-z0-9][A-Za-z0-9_]*:?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[0-9]*(>>?|<)(&[0-9]+)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[0-9]*(>>?|<)\s*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_path())return this.pop(), m-1;continue;}
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.dosbat_start())return this.pop(), m-1;continue;}
            if((m = /^[.]+&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[A-Za-z][A-Za-z.]*:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&pathpart;+(?=\\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[.]*\\+&pathpart;*&eop;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.dosbat_cmdForNestedCommands())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dosbat_cmdForR: function dosbat_cmdForR(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^([a-z][a-z.]*:)?[.]*\\*&pathpart;*&eop;/i.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%%[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.dosbat_cmdForIn())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForL: function dosbat_cmdForL(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%%[a-z]/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.dosbat_cmdForLIn())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLIn: function dosbat_cmdForLIn(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:in)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dosbat_cmdForLRange())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLRange: function dosbat_cmdForLRange(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.dosbat_cmdForLStart())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLStart: function dosbat_cmdForLStart(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.dosbat_cmdForLStartComma())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLStartComma: function dosbat_cmdForLStartComma(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {if(m = this.dosbat_cmdForLStep())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLStep: function dosbat_cmdForLStep(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.dosbat_cmdForLStepComma())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLStepComma: function dosbat_cmdForLStepComma(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {if(m = this.dosbat_cmdForLEnd())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLEnd: function dosbat_cmdForLEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^-?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.dosbat_cmdForLEndParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    dosbat_cmdForLEndParen: function dosbat_cmdForLEndParen(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {if(m = this.dosbat_cmdForDo())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
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
