KateSyntax.langs.debiancontrol.syntax = {
    default: 'debiancontrol_iNIT',
    debiancontrol_iNIT: function debiancontrol_iNIT(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^Depends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Recommends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Suggests:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Conflicts:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Provides:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Replaces:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Enhances:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Pre-Depends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Build-Depends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Build-Depends-Indep:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Build-Conflicts:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Build-Conflicts-Indep:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if((m = /^Breaks:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_dependencyField())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[^ ]*:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.debiancontrol_field())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == ' ' && this.hl(' ', 'dsDataType')) {if(m = this.debiancontrol_field())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    debiancontrol_field: function debiancontrol_field(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<.*@.*>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsKeyword')) {if(m = this.debiancontrol_variable())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    debiancontrol_variable: function debiancontrol_variable(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    debiancontrol_dependencyField: function debiancontrol_dependencyField(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<.*@.*>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsKeyword')) {if(m = this.debiancontrol_variable())return this.pop(), m-1;continue;}
            if((m = /^[,\|]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.debiancontrol_constrain())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {if(m = this.debiancontrol_constrain())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    debiancontrol_constrain: function debiancontrol_constrain(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsKeyword')) {if(m = this.debiancontrol_variable())return this.pop(), m-1;continue;}
            if((m = /^[!<=>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    }
};
