KateSyntax.langs.xharbour.syntax = {
    default: 'xharbour_topLevel',
    xharbour_topLevel: function xharbour_topLevel(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.xharbour_ml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) {if(m = this.xharbour_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.xharbour_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xharbour_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xharbour_stringc())return this.pop(), m-1;continue;}
            if((m = /^\.and\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) continue;
            if((m = /^\.or\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) continue;
            if((m = /^\.not\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) continue;
            if((m = /^\.f\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) continue;
            if((m = /^\.t\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) continue;
            if((m = /^[:=!]/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
            if((m = /^CLASS[\t ]+/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xharbour_classContext())return this.pop(), m-1;continue;}
            if((m = /^DO[\t ]+CASE[\t ]*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:FOR|IF|SWITCH|WHILE|TRY|BEGIN|PROCEDURE|FUNCTION|METHOD)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:NEXT|END|ENDIF|ENDDO|ENDCASE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^return ?/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:local|global|extern|field|each|as|set|clear|screen|databases|all|close|color|date|else|elseif|in|to|do|loop|catch|exit|box|say|case|switch|self|super|say|get|read|use|select|otherwise|index|alias|like|has|return|static|on|off|nil|\?|class|external)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:INVALID|EXACT|FIXED|DECIMALS|DATEFORMAT|EPOCH|PATH|DEFAULT|EXCLUSIVE|SOFTSEEK|UNIQUE|DELETED|CANCEL|DEBUG|TYPEAHEAD|COLOR|CURSOR|CONSOLE|ALTERNATE|ALTFILE|DEVICE|EXTRA|EXTRAFILE|PRINTER|PRINTFILE|MARGIN|BELL|CONFIRM|ESCAPE|INSERT|EXIT|INTENSITY|SCOREBOARD|DELIMITERS|DELIMCHARS|WRAP|MESSAGE|MCENTER|SCROLLBREAK|EVENTMASK|VIDEOMODE|MBLOCKSIZE|MFILEEXT|STRICTREAD|OPTIMIZE|AUTOPEN|AUTORDER|AUTOSHARE|LANGUAGE|IDLEREPEAT|TRACE|TRACEFILE|TRACESTACK|FILECASE|DIRCASE|DIRSEPARATOR)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:aadd|adel|achoice|aclone|aeval|ains|ascan|asize|adir|afill|atail|asort|array|TAssociativeArray|bin21|bin2l|bin2u|bin2w|i2bin|l2bin|u2bin|w2bin|eval|fieldblock|fieldwblock|inkey|lastkey|mcol|mrow|nextkey|empty|word|descend|__dbdelim|__dbsdf|os|__run|alert|browse|dbedit|outerr|outstd|readkey|readvar|__atprompt|__input|__menuto|__nonoallert|__typefile|__xrestscreen|__xsavescreen|DBAPPEND|DBCLEARFILTER|DBCLOSEALL|DBCLOSEAREA|DBCOMMIT|DBCOMMITALL|DBCREATE|DBDELETE|DBEVAL|DBF|DBFILTER|DBGOBOTTOM|DBGOTO|DBGOTOP|DBRECALL|DBRLOCK|DBRLOCKLIST|DBRUNLOCK|DBSEEK|DBSELECTAREA|DBSETDRIVER|DBSETFILTER|DBSKIP|DBSTRUCT|DBUNLOCK|DBUNLOCKALL|DBUSEAREA|INDEXEXT|INDEXKEY|INDEXORD|ORDBAGEXT|ORDBAGNAME|ORDCONDSET|ORDCREATE|ORDDESTROY|ORDFOR|ORDKEY|ORDLISTADD|ORDLISTCLEAR|ORDLISTREBUILD|ORDNAME|ORDNUMBER|ORDSETFOCUS|RDDLIST|RDDNAME|RDDSETDEFAULT|__DBCONTINUE|__DBZAP|__FLEDIT|__RDDSETDEFAULT|__dbCopyStruct|__dbCopyXStruct|__dbCreate|__dbStructFilter|dbSkipper|CDOW|CMONTH|CTOD|DATE|DAY|DAYS|DOW|DTOC|DTOS|MONTH|YEAR|GETENV|SET|SETMODE|SETTYPEAHEAD|VERSION|__SETCENTURY|__SetFunction|break|errorsys|throw|errornew|HB_SETKEYSAVE|HB_SetKeyCheck|HB_SetKeyGet|SETKEY|__QUIT|__WAIT|file|frename|__dir|col|maxcol|maxrow|row|hb_colorindex|CURDIR|DIRCHANGE|DIRREMOVE|DISKSPACE|FCLOSE|FCREATE|FERASE|FERROR|FOPEN|FREAD|FREADSTR|FSEEK|FWRITE|HB_DISKSPACE|HB_FEOF|ISDISK|MAKEDIR|ABS|EXP|INT|LOG|MAX|MIN|MOD|ROUND|SQRT|HB_ISBYREF|PROCFILE|PROCLINE|PROCNAME|TYPE|VALTYPE|valtoprg|tone|HB_LANGNAME|HB_LANGSELECT|ISAFFIRM|ISNEGATIVE|NATIONMSG|pcount|HB_pvalue|ALLTRIM|ASC|AT|CHR|HARDCR|HB_ANSITOOEM|HB_OEMTOANSI|HB_VALTOSTR|ISALPHA|ISDIGIT|ISLOWER|ISUPPER|LEFT|LEN|LOWER|LTRIM|MEMOTRAN|PADC|PADL|PADR|RAT|REPLICATE|RIGHT|RTRIM|SPACE|STR|STRTRAN|STRZERO|SUBSTR|TRANSFORM|TRIM|UPPER|VAL|devoutpict|elaptime|seconds|secs|time|do|ThreadStart|ThreadStop|ThreadSleep|ThreadKill|ThreadJoin|CreateMutex|DestroyMutex|MutexLock|MutexUnlock|Subscribe|SubscribeNow|Notify|NotifyAll|WaitForThreads|KillAllThreads|InetInit|InetCleanup|InetCreate|InetDestroy|InetConnect|InetServer|InetAccept|InetSetTimeout|InetGetTimeout|InetClearTimeout|InetRecv|InetRecvAll|InetSend|InetSendAll|InetDGram|InetDGramRecv|InetDGramSend|InetAddress|InetPort|InetError|InetErrorDesc|InetGetHosts|InetConnectIP|hb_regex|hb_regexmatch|hb_regexsplit|hb_regexcomp|hb_readini|hb_writeini|hb_random|hb_chechsum|hb_crypt|hb_decrypt|hb_hextonum|hb_numtohex|hb_exec|hb_execfromarray|hb_class|hb_keyput|hb_osnewline)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:#include|#if|#ifdef|#ifndef|#endif|#else|#define)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xharbour_comment: function xharbour_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xharbour_ml_comment: function xharbour_ml_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xharbour_string: function xharbour_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xharbour_stringc: function xharbour_stringc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xharbour_logic: function xharbour_logic(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '.' && this.hl('.', 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN;color:#A01060;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    xharbour_classContext: function xharbour_classContext(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.xharbour_ml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) {if(m = this.xharbour_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.xharbour_comment())return this.pop(), m-1;continue;}
            if((m = /^(?:data|inline|method|classdata|init|from|hidden)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^END(CLASS)? *(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
