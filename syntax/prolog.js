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
        if((m = /^(?:abstract|align|as|and|class|clauses|constants|database|determ|domains|elsedef|endclass|enddef|erroneous|facts|failure|global|goal|if|ifdef|ifndef|implement|include|language|multi|nocopy|nondeterm|object|or|procedure|protected|predicates|reference|single|static|struct|this)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ABSTRACT|ALIGN|AS|AND|CLASS|CLAUSES|CONSTANTS|DATABASE|DETERM|DOMAINS|ELSEDEF|ENDCLASS|ENDDEF|ERRONEOUS|FACTS|FAILURE|GLOBAL|GOAL|IF|IFDEF|IFNDEF|IMPLEMENT|INCLUDE|LANGUAGE|MULTI|NOCOPY|NONDETERM|OBJECT|OR|PROCEDURE|PROTECTED|PREDICATES|REFERENCE|SINGLE|STATIC|STRUCT|THIS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:mod|div|abs|exp|ln|log|sqrt|round|trunc|val|cos|sin|tan|arctan|random|randominit)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bgidriver|bgifont|check_determ|code|config|diagnostics|error|errorlevel|heap|gstacksize|nobreak|nowarnings|printermenu|project)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:assert|asserta|assertz|bound|chain_inserta|chain_insertafter|chain_insertz|chain_terms|consult|db_btrees|db_chains|fail|findall|format|free|msgrecv|msgsend|nl|not|readterm|ref_term|retract|retractall|save|term_bin|term_replace|term_str|trap|write|writef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:char|real|string|symbol|byte|sbyte|short|ushort|word|integer|unsigned|dword|long|ulong|binary|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[A-Z_][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[a-z][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentRegion();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string2();continue;}
        if((m = /^[~!\^*()\-+=[\]|\:;,./?&<>]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentRegion = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
