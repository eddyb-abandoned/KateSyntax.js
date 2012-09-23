KateSyntax.langs.freebasic.syntax = {
    default: 'freebasic_normal',
    freebasic_normal: function freebasic_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b(exit (function|sub|for|do|while|type|select))([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(declare (function|sub))([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(while)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(wend)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(do)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(loop)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(select)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(end select)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(for (input|output|binary|random))([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(for)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(next)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(function)([.\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(end function)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(sub)([.\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(end sub)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(type)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(end type)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(if)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(then )[a-zA-Z_\x7f-\xff]./i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(end if)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Declare|Open|For|For Input|For Output|For Binary|For Random|Close|To|Step|Next|As|Break|Exit|If|Then|Else|Until|Select|System|Case|Default|EndSelect|Do|Loop|While|Wend|End|Type|DefType|Dim|Global|Function|Sub|Shared|Protected|Static|Declare|Unsigned|Data|Restore|Read|Goto|Gosub|Return|DEFBYTE|DEFDBL|DEFINT|DEFLNG|DEFSHORT|DEFSNG|DEFSTR|DEFUBYTE|DEFUINT|DEFUSHORT)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Integer|Long|Single|Double|String|Byte PTR|Dword PTR|Qword PTR|Word PTR)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:AAA|AAD|AAM|AAS|ABS|ACOS|ADC|ADD|ALLOCATE|AND|AND|ARPL|ASC|ASIN|ASM|ATAN2|ATN|BEEP|BIN$|BLOAD|BOUND|BREAK|BSAVE|BSF|BSR|BSWAP|BT|BTC|BTR|BTS|BYREF|CALL|CALLOCATE|CALLS|CBW|CBYTE|CDBL|CDQ|CHAIN|CHDIR|CHR$|CINT|CIRCLE|CLC|CLD|CLEAR|CLI|CLNG|CLOSE|CLTS|CMC|CMP|CMPS|CMPSB|CMPSD|CMPSW|CMPXCHG|COLOR|COMMAND$|COMMON|CONST|CONTINUE|COS|CSHORT|CSIGN|CSNG|CUNSG|CURDIR$|CVD|CVI|CVL|CVS|CWD|CWDE|DAA|DAS|DATA|DATE$|DEALLOCATE|DEC|DIM|DIR$|DIV|DRAW|END|ENTER|ENUM|ENVIRON|ENVIRON$|EOF|EQV|ERASE|EXEC|EXEPATH|EXP|FIX|FLIP|FRE|FREEFILE|GET|GETKEY|GETMOUSE|HEX$|HLT|IDIV|IMP|IMUL|IN|INC|INKEY$|INP|INPUT|INPUT$|INS|INSB|INSD|INSTR|INT|INT|INTO|INVD|INVLPG|IRET|IRETD|JA|JAE|JB|JBE|JC|JCXZ|JE|JECXZ|JG|JGE|JL|JLE|JMP|JNA|JNAE|JNB|JNBE|JNC|JNE|JNG|JNGE|JNL|JNLE|JNO|JNP|JNS|JNZ|JO|JP|JPE|JPO|JS|JUMP|JZ|KILL|LAHF|LAR|LBOUND|LCASE$|LDS|LEA|LEAVE|LEAVED|LEAVEW|LEFT$|LEN|LES|LET|LFS|LGDT|LGS|LIB|LIDT|LINE|LLDT|LMSW|LOC|LOCK|LOCK|LODS|LODSB|LODSD|LODSW|LOF|LOG|LOOPD|LOOPDE|LOOPDNE|LOOPDNZ|LOOPDZ|LOOPE|LOOPNE|LOOPNZ|LOOPW|LOOPWE|LOOPWNE|LOOPWNZ|LOOPWZ|LOOPZ|LSET|LSL|LSS|LTR|LTRIM$|MID$|MKD$|MKDIR|MKI$|MKL$|MKS$|MOD|MOV|MOVS|MOVSB|MOVSD|MOVSW|MOVSX|MOVZX|MUL|MULTIKEY|NAME|NEG|NOP|NOT|NOTHING|OCT$|OPTION BASE|OPTION PRIVATE|OR|OUT|OUTS|OUTSB|OUTSD|OUTSW|PAINT|PALETTE|PCOPY|PEEK|PEEKI|PEEKS|PMAP|POINT|POKE|POKEI|POKES|POP|POPA|POPAD|POPF|POPFD|POS|PRESERVE|PRESET|PRINT|PRIVATE|PROCPTR|PSET|PTR|PUBLIC|PUSH|PUSHA|PUSHAD|PUSHF|PUSHFD|PUT|RANDOMIZE|RCL|RCR|REALLOCATE|REDIM|REM|REP|REPE|REPNE|REPNZ|REPZ|RESET|RET|RETURN|RGB|RIGHT$|RMDIR|RND|ROL|ROR|RSET|RTRIM$|RUN|SADD|SAHF|SAL|SAR|SBB|SCAS|SCASB|SCASD|SCASW|SCREEN|SCREENCOPY|SCREENINFO|SCREENLOCK|SCREENPTR|SCREENSET|SCREENUNLOCK|SEEK|SETA|SETAE|SETB|SETBE|SETC|SETDATE|SETE|SETENVIRON|SETG|SETGE|SETL|SETLE|SETNA|SETNAE|SETNB|SETNBE|SETNC|SETNE|SETNG|SETNGE|SETNL|SETNLE|SETNO|SETNP|SETNS|SETNZ|SETO|SETP|SETPE|SETPO|SETS|SETZ|SGDT|SGN|SHARED|SHELL|SHL|SHLD|SHR|SHRD|SIDT|SIN|SLDT|SLEEP|SMSW|SPACE$|SQR|STATIC|STC|STD|STI|STOP|STOS|STOSB|STOSD|STOSW|STR|STR$|STRING$|SWAP|TAN|TEST|TIME$|TIMER|TRIM$|TYPE|UBOUND|UCASE$|UNION|UNLOCK|VAL|VARPTR|VERR|VERW|VIEW|WAIT|WINDOWTITLE|WRITE|XADD|XCHG|XLAT|XLATB|XOR)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\#+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/.exec(this.str)) && this.hl(m[0], 'dsConstant')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.freebasic_string())return this.pop(), m-1;continue;}
            if((m = /^\s*;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\s*;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) {if(m = this.freebasic_comment1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    freebasic_string: function freebasic_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    freebasic_comment1: function freebasic_comment1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
