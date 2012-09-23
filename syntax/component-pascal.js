KateSyntax.langs['component-pascal'].syntax = {
    default: 'component-pascal_normal',
    'component-pascal_normal': function componentpascal_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\(\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['component-pascal_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this['component-pascal_comment2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this['component-pascal_string1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this['component-pascal_string2']())return this.pop(), m-1;continue;}
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
            if((m = /^\s(\+|\-|OR|\*|\/|DIV|MOD|\&)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'component-pascal_comment1': function componentpascal_comment1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this['component-pascal_commentN']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'component-pascal_comment2': function componentpascal_comment2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this['component-pascal_commentN']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'component-pascal_commentN': function componentpascal_commentN(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {if(m = this['component-pascal_commentN2']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'component-pascal_commentN2': function componentpascal_commentN2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'component-pascal_string1': function componentpascal_string1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'component-pascal_string2': function componentpascal_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
