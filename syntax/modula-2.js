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
        if((m = /^(?:AND|ARRAY|ASM|BEGIN|CASE|CONST|DIV|DO|ELSE|ELSIF|END|FOR|IF|IMPLEMENTATION|IN|SET|INCL|EXCL|ABS|BITSET|CAP|CHR|DEC|HALT|HIGH|INC|MAX|MIN|ODD|ORD|PROC|TRUNC|VAL|MOD|NIL|NOT|OF|OR|PROCEDURE|MODULE|DEFINITION|RECORD|REPEAT|THEN|TO|TYPE|UNTIL|LOOP|VAR|WHILE|WITH|EXIT|FALSE|TRUE|BY|FROM|IMPORT|EXPORT|QUALIFIED|RETURN|NEWPROCESS|TRANSFER|IOTRANSFER|FOREIGN)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ASSEMBLER|ALLOCATE|DEALLOCATE|SIZE|Write|WriteString|WriteCard|WriteLn|WriteBf|WriteInt|WriteReal|WriteLongReal|Read|ReadString|ReadCard|ReadInt|ReadReal|ReadLongReal|Open|Close|OpenInput|OpenOutput|Accessible|Erase|EOF|Done|EmptyString|Assign|Append|Length|StrEq|Copy|Concat|pos|Delete|Insert|compare|CAPS|PutBf|GetArgs|GetEnv|ResetClock|UserTime|SystemTime|GetChar|GetInt|GetCard|GetString|GetReal|GetLongReal|PutChar|PutInt|PutCard|PutString|PutReal|PutLongReal|PutLn)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:INTEGER|CARDINAL|SHORTINT|SHORTCARD|LONGINT|LONGREAL|CHAR|BOOLEAN|POINTER|ADDRESS|ADR|REAL|File)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string1();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string2();continue;}
        if((m = /^\(\*$/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._prep1();continue;}
        if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {this._comment2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._prep1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$\*\)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._prep1();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
