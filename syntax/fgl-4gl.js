KateSyntax.langs['fgl-4gl'].syntax = {
    default: 'fgl-4gl_normalText1',
    'fgl-4gl_normalText1': function fgl4gl_normalText1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:at|by|go|if|in|is|no|of|on|or|to|up|add|ALL|and|ANY|avg|day|end|ESC|for|key|let|log|max|mdy|min|not|put|red|row|run|set|sum|top|blue|BOLD|call|case|cyan|desc|DROP|else|exit|file|form|FREE|from|goto|help|HIDE|HOLD|HOUR|into|last|left|like|line|load|LOCK|main|menu|MODE|name|NEED|next|null|open|page|PIPE|quit|READ|rows|show|skip|sort|STEP|STOP|TEMP|text|then|thru|true|user|WAIT|when|with|WORK|WRAP|year|after|alter|ascii|BEGIN|blink|clear|close|count|DEFER|DIRTY|error|every|false|fetch|field|first|flush|green|GROUP|index|input|label|lines|month|order|outer|pause|print|right|share|sleep|space|start|TABLE|today|union|UNITS|using|where|WHILE|white|ACCEPT|before|border|bottom|column|commit|create|cursor|define|delete|enable|ESCAPE|exists|finish|format|HAVING|header|insert|length|locate|margin|MINUTE|MODIFY|normal|option|output|PAGENO|prompt|record|report|return|revoke|SCREEN|scroll|SECOND|select|spaces|status|UNIQUE|UNLOAD|update|values|window|yellow|between|clipped|cluster|columns|command|comment|connect|CURRENT|declare|display|execute|foreach|globals|infield|MAGENTA|matches|message|options|prepare|printer|program|reverse|trailer|upshift|waiting|without|ABSOLUTE|continue|database|defaults|DISTINCT|EXTERNAL|function|INT_FLAG|NOTFOUND|previous|ROLLBACK|whenever|wordwrap|attribute|committed|construct|delimiter|downshift|exclusive|INTERRUPT|ISOLATION|otherwise|quit_flag|returning|attributes|CONSTRAINT|initialize|statistics|fgl_lastkey|formhandler|fgl_lastkey\(\))\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:char|date|array|float|money|serial|DECIMAL|integer|NUMERIC|VARCHAR|DATETIME|FRACTION|INTERVAL|smallint)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this['fgl-4gl_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['fgl-4gl_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsComment')) {if(m = this['fgl-4gl_comment2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this['fgl-4gl_comment1']())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<=>?[\]\^|~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#if 0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['fgl-4gl_comment4']())return this.pop(), m-1;continue;}
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['fgl-4gl_preprocessor']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'fgl-4gl_string': function fgl4gl_string(m) {
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
    'fgl-4gl_comment1': function fgl4gl_comment1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-4gl_comment2': function fgl4gl_comment2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-4gl_preprocessor': function fgl4gl_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['fgl-4gl_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsComment')) {if(m = this['fgl-4gl_comment2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this['fgl-4gl_comment1']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['fgl-4gl_comment3']())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    'fgl-4gl_comment3': function fgl4gl_comment3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-4gl_normalText2': function fgl4gl_normalText2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'fgl-4gl_normalText3': function fgl4gl_normalText3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'fgl-4gl_comment4': function fgl4gl_comment4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^#if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['fgl-4gl_comment5']())return this.pop(), m-1;continue;}
            if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^#else/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'fgl-4gl_comment5': function fgl4gl_comment5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['fgl-4gl_comment5']())return this.pop(), m-1;continue;}
            if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
