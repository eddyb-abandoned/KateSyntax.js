KateSyntax.langs.ilerpg.syntax = {
    default: 'ilerpg_default',
    ilerpg_default: function ilerpg_default(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[PpOoIiHhFfDdCc ]?\*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ilerpg_comments())return this.pop(), m-1;continue;}
            if((m = /^[PpOoIiHhFfDdCc ]?\//.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ilerpg_directives())return this.pop(), m-1;continue;}
            if((m = /^[OoIiHhFf]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_anyCode())return this.pop(), m-1;continue;}
            if((m = /^[Dd]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_d())return this.pop(), m-1;continue;}
            if((m = /^[Pp]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_p())return this.pop(), m-1;continue;}
            if((m = /^[Cc]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_cControlLevel())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_cControlLevel: function ilerpg_cControlLevel(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cIndicators())return this.pop(), m-1;continue;}
            if((m = /^[L|l][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cIndicators())return this.pop(), m-1;continue;}
            if((m = /^[O|o|L|l|S|s][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cIndicators())return this.pop(), m-1;continue;}
            if((m = /^[A|a][N|n]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cIndicators())return this.pop(), m-1;continue;}
            if((m = /^[L|l|S|s][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cIndicators())return this.pop(), m-1;continue;}
            if((m = /^.{2}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {if(m = this.ilerpg_cIndicators())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_cIndicators: function ilerpg_cIndicators(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {3}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][0-9]{2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][K|k][A-N|p-y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][K|k][P-Y|p-y]}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][L|l][1-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][L|l|M|m][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][R|r][T|t]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][U|u][1-8]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][O|o][A-G|a-g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][O|o][V|v]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^[\ |N|n][H|h][1-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if((m = /^.{3}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {if(m = this.ilerpg_cFactor1())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_cFactor1: function ilerpg_cFactor1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^.{14}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_findOC())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_findOC: function ilerpg_findOC(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:DO|IN|OR)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_nonEvalOC2())return this.pop(), m-1;continue;}
            if((m = /^(?:ACQ|ADD|AND|CAB|CAS|CAT|DIV|DOU|END|MVR|OUT|REL|SUB|TAG)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_nonEvalOC3())return this.pop(), m-1;continue;}
            if((m = /^(?:CALL|COMP|DUMP|ELSE|EXSR|FEOD|GOTO|IFGT|IFLT|IFEQ|IFNE|IFGE|IFLE|ITER|KFLD|MOVE|MULT|NEXT|OPEN|ORGT|ORLT|OREQ|ORNE|ORGE|ORLE|PARM|POST|READ|SCAN|SQRT|TEST|TIME)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_nonEvalOC4())return this.pop(), m-1;continue;}
            if((m = /^(?:ALLOC|ANDGT|ANDLT|ANDEQ|ANDNE|ANDGE|ANDLE|BEGSR|BITON|CABGT|CABLT|CABEQ|CABNE|CABGE|CABLE|CALLB|CALLP|CASGT|CASLT|CASEQ|CASNE|CASGE|CASLE|CHAIN|CHECK|CLEAR|CLOSE|CHECK|CLEAR|CLOSE|DOWGT|DOWLT|DOWEQ|DOWNE|DOWGE|DOWLE|DOUGT|DOULT|DOUEQ|DOUNE|DOUGE|DOULE|DSPLY|ENDCS|ENDDO|ENDIF|ENDSL|ENDSR|EXFMT|FORCE|KLIST|LEAVE|MHHZO|MHLZO|MLHZO|MLLZO|MOVEA|MOVEL|OCCUR|OTHER|PLIST|READC|READE|READP|RESET|ROLBK|SETGT|SETLL|SETON|SHTDN|SORTA|SUBST|TESTB|TESTN|TESTZ|WRITE|XFOOT|XLATE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_nonEvalOC5())return this.pop(), m-1;continue;}
            if((m = /^(?:ADDDUR|BITOFF|CHECKR|COMMIT|DEFINE|DELETE|EXCEPT|EXTRCT|LOOKUP|READPE|RETURN|SELECT|SETOFF|SUBDUR|UNLOCK|UPDATE|WHENGT|WHENLT|WHENEQ|WHENNR|WHENGE|WHENLE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_nonEvalOC6())return this.pop(), m-1;continue;}
            if((m = /^(?:DEALLOC|REALLOC)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_nonEvalOC7())return this.pop(), m-1;continue;}
            if((m = /^[Z|z]-([A|a][D|d]{2}|[S|s][U|u][B|b])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_nonEvalOC5())return this.pop(), m-1;continue;}
            if((m = /^(?:IF)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_evalOC2())return this.pop(), m-1;continue;}
            if((m = /^(?:DOW|DOU|FOR)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_evalOC3())return this.pop(), m-1;continue;}
            if((m = /^(?:WHEN|EVAL)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_evalOC4())return this.pop(), m-1;continue;}
            if((m = /^(?:EVALR)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_evalOC5())return this.pop(), m-1;continue;}
            if((m = /^(?:RETURN)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_evalOC6())return this.pop(), m-1;continue;}
            if((m = /^[O|o][N|n]-([E|e][R|r]{2}|[O|o][R|r])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ilerpg_evalOC8())return this.pop(), m-1;continue;}
            if((m = /^\ {10}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if((m = /^.{10}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), 3;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_nonEvalOC2: function ilerpg_nonEvalOC2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {8}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_nonEvalOC3: function ilerpg_nonEvalOC3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {7}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_nonEvalOC4: function ilerpg_nonEvalOC4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {6}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_nonEvalOC5: function ilerpg_nonEvalOC5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {5}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_nonEvalOC6: function ilerpg_nonEvalOC6(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {4}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_nonEvalOC7: function ilerpg_nonEvalOC7(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {3}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_cFactor2: function ilerpg_cFactor2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {if(m = this.ilerpg_biffs())return this.pop(), m-1;continue;}
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_evalOC2: function ilerpg_evalOC2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {8}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cExFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_evalOC3: function ilerpg_evalOC3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {7}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cExFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_evalOC4: function ilerpg_evalOC4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {6}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cExFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_evalOC5: function ilerpg_evalOC5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {5}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cExFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_evalOC6: function ilerpg_evalOC6(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {4}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cExFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_evalOC8: function ilerpg_evalOC8(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\ {2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ilerpg_cExFactor2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_cExFactor2: function ilerpg_cExFactor2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {if(m = this.ilerpg_biffs())return this.pop(), m-1;continue;}
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_evalOCCont: function ilerpg_evalOCCont(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {if(m = this.ilerpg_biffs())return this.pop(), m-1;continue;}
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_comments: function ilerpg_comments(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\(*(FIXME|TODO)\)*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CD853F;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^\(*(NOTE:)\)*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CD853F;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^-|=/.exec(this.str)) && this.hl(m[0], 'dsComment;fontWeight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ilerpg_stringConstants: function ilerpg_stringConstants(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    ilerpg_directives: function ilerpg_directives(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[F|f][R|r][E|e][E|e]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ilerpg_free())return this.pop(), m-1;continue;}
            if((m = /^[E|e][X|x][E|e][C|c]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ilerpg_exec())return this.pop(), m-1;continue;}
            if((m = /^(?:FREE|END-FREE|TITLE|EJECT|SPACE|COPY|INCLUDE|DEFINE|UNDEFINE|IF|ELSE|EXEC|END-EXEC|ELSEIF|ENDIF|EOF)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ilerpg_directives2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_directives2: function ilerpg_directives2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:NOT|DEFINED)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ilerpg_directives3())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_directives3: function ilerpg_directives3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:DEFINED)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop(), this.ilerpg_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_free: function ilerpg_free(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[POIHFDC ]?\/[E|e][N|n][D|d]-[F|f][R|r][E|e][E|e]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {if(m = this.ilerpg_biffs())return this.pop(), m-1;continue;}
            if((m = /^\/\//.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ilerpg_comments())return this.pop(), m-1;continue;}
            if((m = /^(?:ACQ|BEGSR|CALLP|CHAIN|CLEAR|CLOSE|COMMIT|DEALLOC|DELETE|DOU|DOW|DSPLY|DUMP|ELSE|ELSEIF|ENDDO|ENDFOR|ENDIF|ENDMON|ENDSL|ENDSR|EVAL|EVALR|EXCEPT|EXFMT|EXSR|FEOD|FOR|FORCE|IF|IN|ITER|LEAVE|LEAVESR|MONITOR|NEXT|ON-ERROR|OPEN|OTHER|OUT|POST|READ|READC|READE|READP|READPE|REL|RESET|RETURN|ROLBK|SELECT|SETGT|SETLL|SORTA|TEST|UNLOCK|UPDATE|WHEN|WRITE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_exec: function ilerpg_exec(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[POIHFDC ]?\/[E|e][N|n][D|d]-[E|e][X|x][E|e][C|c]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_biffs: function ilerpg_biffs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:ABS|ADDR|ALLOC|BITAND|BITNOT|BITOR|BITXOR|CHAR|CHECK|CHECKR|DATE|DAYS|DEC|DECH|DECPOS|DIFF|DIV|EDITC|EDITFLT|EDITW|ELEM|EOF|EQUAL|ERROR|FIELDS|FLOAT|FOUND|GRAPH|HOURS|INT|INTH|KDS|LEN|LOOKUP|LOOKUPLT|LOOKUPLE|LOOKUPGT|LOOKUPGE|MINUTES|MONTHS|MSECONDS|NULLIND|OCCUR|OPEN|PADDR|PARMS|REALLOC|REM|REPLACE|SCAN|SECONDS|SHTDN|SIZE|SQRT|STATUS|STR|SUBARR|SUBDT|SUBST|THIS|TIME|TIMESTAMP|TLOOKUP|TLOOKUPLT|TLOOKUPLE|TLOOKUPGT|TLOOKUPGE|TRIM|TRIML|TRIMR|UCS2|UNS|UNSH|XFOOT|XLATE|YEARS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    ilerpg_commonCode: function ilerpg_commonCode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_indicators: function ilerpg_indicators(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_reservedWords: function ilerpg_reservedWords(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_anyCode: function ilerpg_anyCode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_d: function ilerpg_d(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:EXTPROC|EXTPGM|OPDESC|DATFMT|DIM|LIKEDS|LIKEREC|LIKE|PROCPTR|TIMFMT|VARYING|ASCEND|CONST|NOOPT|OPTIONS|VALUE|QUALIFIED|INZ|BASED)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\*[N|n][O|o][P|p][A|a][S|s]{2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[O|o][M|m][I|i][T|t]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][A|a][R|r][S|s][I|i][Z|z][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[R|r][I|i][G|g][H|h][T|t][A|a][D|d][J|j]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][T|t][R|r][I|i][N|n][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[T|t][R|r][I|i][M|m]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {if(m = this.ilerpg_biffs())return this.pop(), m-1;continue;}
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ilerpg_p: function ilerpg_p(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:EXTPROC|EXTPGM|OPDESC|DATFMT|DIM|LIKEDS|LIKEREC|LIKE|PROCPTR|TIMFMT|VARYING|ASCEND|CONST|NOOPT|OPTIONS|VALUE|QUALIFIED|INZ|BASED)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\*[N|n][O|o][P|p][A|a][S|s]{2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[O|o][M|m][I|i][T|t]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][A|a][R|r][S|s][I|i][Z|z][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[R|r][I|i][G|g][H|h][T|t][A|a][D|d][J|j]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][T|t][R|r][I|i][N|n][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[T|t][R|r][I|i][M|m]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {if(m = this.ilerpg_biffs())return this.pop(), m-1;continue;}
            if((m = /^[\*|U|u][D|d][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][M|m][O|o][N|n][T|t][H|h]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][Y|y][E|e][A|a][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\*|U|u][D|d][A|a][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\ [P|p][A|a][G|g][E|e][1-7]?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([A|a][A|l]{2}[X|x|G|g]?|[B|b][L|l][A|a][N|n][K|k][S|s]?|[O|o][N|n]|[O|o][F|f]{2}|[N|n][U|u][L|l]{2}|[Z|z][E|e][R|r][O|o][S|s]?|[H|h][I|i][V|v][A|a][L|l]|[L|l][O|o][V|v][A|a][L|l]|[P|p][S|s]{2}[R|r]|[E|e][N|n][D|d]|[S|s][T|t][A|a][R|r][T|t])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC2222;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[D|d][M|m][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][U|u][R|r]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[H|h][M|m][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][S|s][O|o]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][I|i][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[J|j][O|o][B|b]([R|r][U|u][N|n])?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*([L|l][O|o][N|n][G|g])?[J|j][U|u][L|l]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[M|m][D|d][Y|y]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[S|s][Y|y][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[U|u][S|s][A|a]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[Y|y][M|m][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[A|a][L|l][T|t][S|s][E|e][Q|q]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[E|e][Q|q][U|u][A|a][T|t][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][I|i][L|l][E|e]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[F|f][T|t][R|r][A|a][N|n][S|s]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][L|l][E|e][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][B|b][N|n][D|d][R|r][P|p][G|g]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[C|c][R|r][T|t][R|r][P|p][G|g][M|m][O|o][D|d]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[V|v][0-9][R|r][0-9][M|m][0-9]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#BB1133;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[0-9][0-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?1[P|p]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[H|h|L|l][1-9]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[L|l|M|m][R|r]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[O|o][A-G|a-g|V|v]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[U|u][1-8]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[K|k][A-N|a-n|P-Y|p-y]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[I|i][N|n]\(?[R|r][T|t]\)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#CC0000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal;color:#DD0022;fontStyle:normal;fontWeight:normal')) {if(m = this.ilerpg_stringConstants())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[Xx]'[0-9a-fA-F]{2,}'/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
