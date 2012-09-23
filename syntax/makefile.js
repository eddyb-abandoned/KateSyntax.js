KateSyntax.langs.makefile.syntax = {
    default: 'makefile_normal',
    makefile_normal: function makefile_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:include|define|else|endef|endif|ifdef|ifeq|ifndef|ifneq)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[_\w\d]*\s*(?=:=|=|\+=|\?=)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.makefile_value())return this.pop(), m-1;continue;}
            if((m = /^[_\w\d-]*\s*:/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[.].*:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.makefile_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsChar')) {if(m = this['makefile_varFromNormal{']())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsChar')) {if(m = this['makefile_varFromNormal(']())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsFloat')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsFloat')) continue;
            if((m = /^[+*=%$():\\;]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[@\-]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.makefile_commands())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    makefile_string: function makefile_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    makefile_value: function makefile_value(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsChar')) {if(m = this['makefile_varFromValue{']())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsChar')) {if(m = this['makefile_varFromValue(']())return this.pop(), m-1;continue;}
            if((m = /^@[-_\d\w]*@/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if(this.str[0] == ';' && this.hl(';', 'dsChar')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'makefile_varFromValue(': function makefile_varFromValue(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsChar')) return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    'makefile_varFromValue{': function makefile_varFromValue(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsChar')) return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    'makefile_varFromNormal(': function makefile_varFromNormal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:call|subst|patsubst|strip|findstring|filter|filter-out|sort|word|wordlist|words|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|if|or|and|foreach|value|eval|origin|flavor|shell|error|warning|info)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['makefile_functionCall(']())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsChar')) return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    'makefile_varFromNormal{': function makefile_varFromNormal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:call|subst|patsubst|strip|findstring|filter|filter-out|sort|word|wordlist|words|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|if|or|and|foreach|value|eval|origin|flavor|shell|error|warning|info)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['makefile_functionCall{']())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    'makefile_functionCall(': function makefile_functionCall(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsChar')) {if(m = this['makefile_varFromNormal{']())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsChar')) {if(m = this['makefile_varFromNormal(']())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsChar')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'makefile_functionCall{': function makefile_functionCall(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsChar')) {if(m = this['makefile_varFromNormal{']())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsChar')) {if(m = this['makefile_varFromNormal(']())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsChar')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    makefile_commands: function makefile_commands(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsChar')) {if(m = this['makefile_varFromNormal{']())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '(' && this.hl('$(', 'dsChar')) {if(m = this['makefile_varFromNormal(']())return this.pop(), m-1;continue;}
            if((m = /^[_\w-]*\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
