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
        if((m = /^\(\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment1();continue;}
        if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {this._comment2();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string1();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._string2();continue;}
        if((m = /^PROCEDURE\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^ABSTRACT;|EMPTY;|END\s*[A-Za-z][A-Za-z0-9_]*\;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^RECORD/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^END/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^NEW/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:BEGIN|BY|CASE|CLOSE|CONST|DO|ELSE|ELSIF|END|FOR|IF|IMPORT|LOOP|MODULE|NEW|OF|OUT|PROCEDURE|REPEAT|THEN|TO|TYPE|UNTIL|VAR|WHILE|WITH)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ASSERT|EXIT|HALT|RETURN)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ANYPTR|ANYREC|ARRAY|BOOLEAN|SHORTCHAR|CHAR|BYTE|SHORTINT|INTEGER|LONGINT|POINTER|RECORD|SHORTREAL|REAL|SET)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:ABSTRACT|EMPTY|EXTENSIBLE|LIMITED)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:ABS|ASH|BITS|CAP|CHR|DEC|ENTIER|EXCL|INC|INCL|LEN|LONG|MAX|MIN|ODD|ORD|SHORT|SIZE)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:FALSE|INF|NIL|TRUE)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\s[\+|\-]{0,1}[0-9]([0-9]*|[0-9A-F]*(H|L))/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\s[0-9][0-9A-F]*X/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[A-Za-z][A-Za-z0-9_]*\*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[A-Za-z][A-Za-z0-9_]*\-/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s(=|#|<|<=|>|>=|IN\s|IS)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s(\+|\-|OR|\*|/|DIV|MOD|\&)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return;
        if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {this._commentN();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return;
        if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {this._commentN();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentN = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return;
        if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {this._commentN2();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentN2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
