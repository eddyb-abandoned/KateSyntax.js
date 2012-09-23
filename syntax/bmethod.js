KateSyntax.langs.bmethod.syntax = {
    default: 'bmethod_normalText',
    bmethod_normalText: function bmethod_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^(?:MACHINE|SETS|CONSTANTS|PROPERTIES|PROMOTES|INCLUDES|USES|SEES|VARIABLES|INVARIANT|INITIALISATION|REFINEMENT|REFINES|CONSTRAINTS|IMPLEMENTATION|IMPORTS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ff0000')) continue;
            if(this.col === 0 && (m = /^(?:OPERATIONS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ff0000')) continue;
            if(this.col === 0 && (m = /^(?:END)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ff0000')) continue;
            if((m = /^(?:NAT|NAT1)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.bmethod_comment())return this.pop(), m-1;continue;}
            if((m = /^(?:THEN|WHEN|ELSE|OR|WHERE|INVARIANT|DO|VARIANT|IN|ELSIF)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000ff')) continue;
            if((m = /^(?:PRE|IF|ANY|LET|CHOICE|CASE|SELECT|VAR|WHILE|BEGIN)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000ff')) continue;
            if((m = /^(?:END)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000ff')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bmethod_comment: function bmethod_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    alert_normalText: function alert_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
