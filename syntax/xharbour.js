var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._topLevel();
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
HL.prototype._topLevel = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._ml_comment();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringc();continue;}
        if((m = /^\.and\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\.or\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\.not\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\.f\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\.t\./i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[:=!]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsKeyword')) continue;
        if((m = /^CLASS[\t ]+/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._classContext();continue;}
        if((m = /^DO[\t ]+CASE[\t ]*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:FOR|IF|SWITCH|WHILE|TRY|BEGIN|PROCEDURE|FUNCTION|METHOD)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:NEXT|END|ENDIF|ENDDO|ENDCASE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^return ?/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:local|global|extern|field|each|as|set|clear|screen|databases|all|close|color|date|else|elseif|in|to|do|loop|catch|exit|box|say|case|switch|self|super|say|get|read|use|select|otherwise|index|alias|like|has|return|static|on|off|nil|?|class|external)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:INVALID|EXACT|FIXED|DECIMALS|DATEFORMAT|EPOCH|PATH|DEFAULT|EXCLUSIVE|SOFTSEEK|UNIQUE|DELETED|CANCEL|DEBUG|TYPEAHEAD|COLOR|CURSOR|CONSOLE|ALTERNATE|ALTFILE|DEVICE|EXTRA|EXTRAFILE|PRINTER|PRINTFILE|MARGIN|BELL|CONFIRM|ESCAPE|INSERT|EXIT|INTENSITY|SCOREBOARD|DELIMITERS|DELIMCHARS|WRAP|MESSAGE|MCENTER|SCROLLBREAK|EVENTMASK|VIDEOMODE|MBLOCKSIZE|MFILEEXT|STRICTREAD|OPTIMIZE|AUTOPEN|AUTORDER|AUTOSHARE|LANGUAGE|IDLEREPEAT|TRACE|TRACEFILE|TRACESTACK|FILECASE|DIRCASE|DIRSEPARATOR)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:aadd|adel|achoice|aclone|aeval|ains|ascan|asize|adir|afill|atail|asort|array|TAssociativeArray|bin21|bin2l|bin2u|bin2w|i2bin|l2bin|u2bin|w2bin|eval|fieldblock|fieldwblock|inkey|lastkey|mcol|mrow|nextkey|empty|word|descend|__dbdelim|__dbsdf|os|__run|alert|browse|dbedit|outerr|outstd|readkey|readvar|__atprompt|__input|__menuto|__nonoallert|__typefile|__xrestscreen|__xsavescreen|DBAPPEND|DBCLEARFILTER|DBCLOSEALL|DBCLOSEAREA|DBCOMMIT|DBCOMMITALL|DBCREATE|DBDELETE|DBEVAL|DBF|DBFILTER|DBGOBOTTOM|DBGOTO|DBGOTOP|DBRECALL|DBRLOCK|DBRLOCKLIST|DBRUNLOCK|DBSEEK|DBSELECTAREA|DBSETDRIVER|DBSETFILTER|DBSKIP|DBSTRUCT|DBUNLOCK|DBUNLOCKALL|DBUSEAREA|INDEXEXT|INDEXKEY|INDEXORD|ORDBAGEXT|ORDBAGNAME|ORDCONDSET|ORDCREATE|ORDDESTROY|ORDFOR|ORDKEY|ORDLISTADD|ORDLISTCLEAR|ORDLISTREBUILD|ORDNAME|ORDNUMBER|ORDSETFOCUS|RDDLIST|RDDNAME|RDDSETDEFAULT|__DBCONTINUE|__DBZAP|__FLEDIT|__RDDSETDEFAULT|__dbCopyStruct|__dbCopyXStruct|__dbCreate|__dbStructFilter|dbSkipper|CDOW|CMONTH|CTOD|DATE|DAY|DAYS|DOW|DTOC|DTOS|MONTH|YEAR|GETENV|SET|SETMODE|SETTYPEAHEAD|VERSION|__SETCENTURY|__SetFunction|break|errorsys|throw|errornew|HB_SETKEYSAVE|HB_SetKeyCheck|HB_SetKeyGet|SETKEY|__QUIT|__WAIT|file|frename|__dir|col|maxcol|maxrow|row|hb_colorindex|CURDIR|DIRCHANGE|DIRREMOVE|DISKSPACE|FCLOSE|FCREATE|FERASE|FERROR|FOPEN|FREAD|FREADSTR|FSEEK|FWRITE|HB_DISKSPACE|HB_FEOF|ISDISK|MAKEDIR|ABS|EXP|INT|LOG|MAX|MIN|MOD|ROUND|SQRT|HB_ISBYREF|PROCFILE|PROCLINE|PROCNAME|TYPE|VALTYPE|valtoprg|tone|HB_LANGNAME|HB_LANGSELECT|ISAFFIRM|ISNEGATIVE|NATIONMSG|pcount|HB_pvalue|ALLTRIM|ASC|AT|CHR|HARDCR|HB_ANSITOOEM|HB_OEMTOANSI|HB_VALTOSTR|ISALPHA|ISDIGIT|ISLOWER|ISUPPER|LEFT|LEN|LOWER|LTRIM|MEMOTRAN|PADC|PADL|PADR|RAT|REPLICATE|RIGHT|RTRIM|SPACE|STR|STRTRAN|STRZERO|SUBSTR|TRANSFORM|TRIM|UPPER|VAL|devoutpict|elaptime|seconds|secs|time|do|ThreadStart|ThreadStop|ThreadSleep|ThreadKill|ThreadJoin|CreateMutex|DestroyMutex|MutexLock|MutexUnlock|Subscribe|SubscribeNow|Notify|NotifyAll|WaitForThreads|KillAllThreads|InetInit|InetCleanup|InetCreate|InetDestroy|InetConnect|InetServer|InetAccept|InetSetTimeout|InetGetTimeout|InetClearTimeout|InetRecv|InetRecvAll|InetSend|InetSendAll|InetDGram|InetDGramRecv|InetDGramSend|InetAddress|InetPort|InetError|InetErrorDesc|InetGetHosts|InetConnectIP|hb_regex|hb_regexmatch|hb_regexsplit|hb_regexcomp|hb_readini|hb_writeini|hb_random|hb_chechsum|hb_crypt|hb_decrypt|hb_hextonum|hb_numtohex|hb_exec|hb_execfromarray|hb_class|hb_keyput|hb_osnewline)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:#include|#if|#ifdef|#ifndef|#endif|#else|#define)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
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
HL.prototype._ml_comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringc = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._logic = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '.' && this.hl('.', 'dsBaseN')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._classContext = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._ml_comment();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment();continue;}
        if((m = /^(?:data|inline|method|classdata|init|from|hidden)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^END(CLASS)? *(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
