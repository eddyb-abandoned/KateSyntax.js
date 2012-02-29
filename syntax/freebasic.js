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
        if((m = /^\b(exit (function|sub|for|do|while|type|select))([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(declare (function|sub))([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(while)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(wend)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(do)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(loop)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(select)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(end select)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(for (input|output|binary|random))([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(for)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(next)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(function)([.\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(end function)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(sub)([.\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(end sub)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(type)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(end type)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(if)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(then )[a-zA-Z_\x7f-\xff]./i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(end if)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Declare|Open|For|For Input|For Output|For Binary|For Random|Close|To|Step|Next|As|Break|Exit|If|Then|Else|Until|Select|System|Case|Default|EndSelect|Do|Loop|While|Wend|End|Type|DefType|Dim|Global|Function|Sub|Shared|Protected|Static|Declare|Unsigned|Data|Restore|Read|Goto|Gosub|Return|DEFBYTE|DEFDBL|DEFINT|DEFLNG|DEFSHORT|DEFSNG|DEFSTR|DEFUBYTE|DEFUINT|DEFUSHORT)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Integer|Long|Single|Double|String|Byte PTR|Dword PTR|Qword PTR|Word PTR)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:AAA|AAD|AAM|AAS|ABS|ACOS|ADC|ADD|ALLOCATE|AND|AND|ARPL|ASC|ASIN|ASM|ATAN2|ATN|BEEP|BIN$|BLOAD|BOUND|BREAK|BSAVE|BSF|BSR|BSWAP|BT|BTC|BTR|BTS|BYREF|CALL|CALLOCATE|CALLS|CBW|CBYTE|CDBL|CDQ|CHAIN|CHDIR|CHR$|CINT|CIRCLE|CLC|CLD|CLEAR|CLI|CLNG|CLOSE|CLTS|CMC|CMP|CMPS|CMPSB|CMPSD|CMPSW|CMPXCHG|COLOR|COMMAND$|COMMON|CONST|CONTINUE|COS|CSHORT|CSIGN|CSNG|CUNSG|CURDIR$|CVD|CVI|CVL|CVS|CWD|CWDE|DAA|DAS|DATA|DATE$|DEALLOCATE|DEC|DIM|DIR$|DIV|DRAW|END|ENTER|ENUM|ENVIRON|ENVIRON$|EOF|EQV|ERASE|EXEC|EXEPATH|EXP|FIX|FLIP|FRE|FREEFILE|GET|GETKEY|GETMOUSE|HEX$|HLT|IDIV|IMP|IMUL|IN|INC|INKEY$|INP|INPUT|INPUT$|INS|INSB|INSD|INSTR|INT|INT|INTO|INVD|INVLPG|IRET|IRETD|JA|JAE|JB|JBE|JC|JCXZ|JE|JECXZ|JG|JGE|JL|JLE|JMP|JNA|JNAE|JNB|JNBE|JNC|JNE|JNG|JNGE|JNL|JNLE|JNO|JNP|JNS|JNZ|JO|JP|JPE|JPO|JS|JUMP|JZ|KILL|LAHF|LAR|LBOUND|LCASE$|LDS|LEA|LEAVE|LEAVED|LEAVEW|LEFT$|LEN|LES|LET|LFS|LGDT|LGS|LIB|LIDT|LINE|LLDT|LMSW|LOC|LOCK|LOCK|LODS|LODSB|LODSD|LODSW|LOF|LOG|LOOPD|LOOPDE|LOOPDNE|LOOPDNZ|LOOPDZ|LOOPE|LOOPNE|LOOPNZ|LOOPW|LOOPWE|LOOPWNE|LOOPWNZ|LOOPWZ|LOOPZ|LSET|LSL|LSS|LTR|LTRIM$|MID$|MKD$|MKDIR|MKI$|MKL$|MKS$|MOD|MOV|MOVS|MOVSB|MOVSD|MOVSW|MOVSX|MOVZX|MUL|MULTIKEY|NAME|NEG|NOP|NOT|NOTHING|OCT$|OPTION BASE|OPTION PRIVATE|OR|OUT|OUTS|OUTSB|OUTSD|OUTSW|PAINT|PALETTE|PCOPY|PEEK|PEEKI|PEEKS|PMAP|POINT|POKE|POKEI|POKES|POP|POPA|POPAD|POPF|POPFD|POS|PRESERVE|PRESET|PRINT|PRIVATE|PROCPTR|PSET|PTR|PUBLIC|PUSH|PUSHA|PUSHAD|PUSHF|PUSHFD|PUT|RANDOMIZE|RCL|RCR|REALLOCATE|REDIM|REM|REP|REPE|REPNE|REPNZ|REPZ|RESET|RET|RETURN|RGB|RIGHT$|RMDIR|RND|ROL|ROR|RSET|RTRIM$|RUN|SADD|SAHF|SAL|SAR|SBB|SCAS|SCASB|SCASD|SCASW|SCREEN|SCREENCOPY|SCREENINFO|SCREENLOCK|SCREENPTR|SCREENSET|SCREENUNLOCK|SEEK|SETA|SETAE|SETB|SETBE|SETC|SETDATE|SETE|SETENVIRON|SETG|SETGE|SETL|SETLE|SETNA|SETNAE|SETNB|SETNBE|SETNC|SETNE|SETNG|SETNGE|SETNL|SETNLE|SETNO|SETNP|SETNS|SETNZ|SETO|SETP|SETPE|SETPO|SETS|SETZ|SGDT|SGN|SHARED|SHELL|SHL|SHLD|SHR|SHRD|SIDT|SIN|SLDT|SLEEP|SMSW|SPACE$|SQR|STATIC|STC|STD|STI|STOP|STOS|STOSB|STOSD|STOSW|STR|STR$|STRING$|SWAP|TAN|TEST|TIME$|TIMER|TRIM$|TYPE|UBOUND|UCASE$|UNION|UNLOCK|VAL|VARPTR|VERR|VERW|VIEW|WAIT|WINDOWTITLE|WRITE|XADD|XCHG|XLAT|XLATB|XOR)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\#+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/.exec(this.str)) && this.hl(m[0], 'dsConstant')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^^\s*;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^^\s*;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsComment')) {this._comment1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
