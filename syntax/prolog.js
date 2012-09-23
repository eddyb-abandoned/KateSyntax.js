KateSyntax.langs.prolog.syntax = {
    default: 'prolog_normal',
    prolog_normal: function prolog_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:abstract|align|as|and|class|clauses|constants|database|determ|domains|elsedef|endclass|enddef|erroneous|facts|failure|global|goal|if|ifdef|ifndef|implement|include|language|multi|nocopy|nondeterm|object|or|procedure|protected|predicates|reference|single|static|struct|this)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ABSTRACT|ALIGN|AS|AND|CLASS|CLAUSES|CONSTANTS|DATABASE|DETERM|DOMAINS|ELSEDEF|ENDCLASS|ENDDEF|ERRONEOUS|FACTS|FAILURE|GLOBAL|GOAL|IF|IFDEF|IFNDEF|IMPLEMENT|INCLUDE|LANGUAGE|MULTI|NOCOPY|NONDETERM|OBJECT|OR|PROCEDURE|PROTECTED|PREDICATES|REFERENCE|SINGLE|STATIC|STRUCT|THIS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:mod|div|abs|exp|ln|log|sqrt|round|trunc|val|cos|sin|tan|arctan|random|randominit)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:bgidriver|bgifont|check_determ|code|config|diagnostics|error|errorlevel|heap|gstacksize|nobreak|nowarnings|printermenu|project)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:assert|asserta|assertz|bound|chain_inserta|chain_insertafter|chain_insertz|chain_terms|consult|db_btrees|db_chains|fail|findall|format|free|msgrecv|msgsend|nl|not|readterm|ref_term|retract|retractall|save|term_bin|term_replace|term_str|trap|write|writef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:char|real|string|symbol|byte|sbyte|short|ushort|word|integer|unsigned|dword|long|ulong|binary|ref)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[A-Z_][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[a-z][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.prolog_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.prolog_commentRegion())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.prolog_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.prolog_string2())return this.pop(), m-1;continue;}
            if((m = /^[~!\^*()\-+=[\]|\\:;,./?&<>]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    prolog_comment: function prolog_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    prolog_string: function prolog_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    prolog_string2: function prolog_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    prolog_commentRegion: function prolog_commentRegion(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
