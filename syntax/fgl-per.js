KateSyntax.langs['fgl-per'].syntax = {
    default: 'fgl-per_normalText1',
    'fgl-per_normalText1': function fglper_normalText1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:by|to|end|not|red|blue|cyan|keys|like|null|size|type|black|color|green|input|today|white|format|record|screen|tables|yellow|default|display|include|magenta|noentry|picture|reverse|through|UPSHIFT|without|autonext|comments|COMPRESS|database|formonly|noupdate|required|WORDWRAP|character|downshift|invisible|underline|attributes|delimiters|instructions)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:char|date|array|float|money|serial|DECIMAL|integer|NUMERIC|VARCHAR|DATETIME|FRACTION|INTERVAL|smallint)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this['fgl-per_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['fgl-per_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsComment')) {if(m = this['fgl-per_comment2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this['fgl-per_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['fgl-per_comment2']())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<=>?[\]\^|~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#if 0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['fgl-per_comment4']())return this.pop(), m-1;continue;}
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['fgl-per_preprocessor']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'fgl-per_string': function fglper_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'fgl-per_comment1': function fglper_comment1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-per_comment2': function fglper_comment2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-per_preprocessor': function fglper_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['fgl-per_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsComment')) {if(m = this['fgl-per_comment2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this['fgl-per_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['fgl-per_comment3']())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    'fgl-per_comment3': function fglper_comment3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-per_normalText2': function fglper_normalText2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'fgl-per_normalText3': function fglper_normalText3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'fgl-per_comment4': function fglper_comment4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^#if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['fgl-per_comment5']())return this.pop(), m-1;continue;}
            if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^#else/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-per_comment5': function fglper_comment5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['fgl-per_comment5']())return this.pop(), m-1;continue;}
            if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
