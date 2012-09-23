KateSyntax.langs['valgrind-suppression'].syntax = {
    default: 'valgrind-suppression_file',
    'valgrind-suppression_file': function valgrindsuppression_file(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['valgrind-suppression_comment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this['valgrind-suppression_rule']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'valgrind-suppression_rule': function valgrindsuppression_rule(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\}]+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['valgrind-suppression_rule2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'valgrind-suppression_rule2': function valgrindsuppression_rule2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\w+:\w+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['valgrind-suppression_rule3']())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'valgrind-suppression_rule3': function valgrindsuppression_rule3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^fun:|obj:|\.\.\./.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'valgrind-suppression_comment': function valgrindsuppression_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
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
