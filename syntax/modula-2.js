KateSyntax.langs['modula-2'].syntax = {
    default: 'modula-2_normal',
    'modula-2_normal': function modula2_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:AND|ARRAY|ASM|BEGIN|CASE|CONST|DIV|DO|ELSE|ELSIF|END|FOR|IF|IMPLEMENTATION|IN|SET|INCL|EXCL|ABS|BITSET|CAP|CHR|DEC|HALT|HIGH|INC|MAX|MIN|ODD|ORD|PROC|TRUNC|VAL|MOD|NIL|NOT|OF|OR|PROCEDURE|MODULE|DEFINITION|RECORD|REPEAT|THEN|TO|TYPE|UNTIL|LOOP|VAR|WHILE|WITH|EXIT|FALSE|TRUE|BY|FROM|IMPORT|EXPORT|QUALIFIED|RETURN|NEWPROCESS|TRANSFER|IOTRANSFER|FOREIGN)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ASSEMBLER|ALLOCATE|DEALLOCATE|SIZE|Write|WriteString|WriteCard|WriteLn|WriteBf|WriteInt|WriteReal|WriteLongReal|Read|ReadString|ReadCard|ReadInt|ReadReal|ReadLongReal|Open|Close|OpenInput|OpenOutput|Accessible|Erase|EOF|Done|EmptyString|Assign|Append|Length|StrEq|Copy|Concat|pos|Delete|Insert|compare|CAPS|PutBf|GetArgs|GetEnv|ResetClock|UserTime|SystemTime|GetChar|GetInt|GetCard|GetString|GetReal|GetLongReal|PutChar|PutInt|PutCard|PutString|PutReal|PutLongReal|PutLn)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:INTEGER|CARDINAL|SHORTINT|SHORTCARD|LONGINT|LONGREAL|CHAR|BOOLEAN|POINTER|ADDRESS|ADR|REAL|File)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this['modula-2_string1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this['modula-2_string2']())return this.pop(), m-1;continue;}
            if((m = /^\(\*$/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['modula-2_prep1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this['modula-2_comment2']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'modula-2_string1': function modula2_string1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'modula-2_string2': function modula2_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'modula-2_comment2': function modula2_comment2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'modula-2_comment3': function modula2_comment3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'modula-2_prep1': function modula2_prep1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^$\*\)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['modula-2_prep1']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    }
};
