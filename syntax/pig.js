KateSyntax.langs.pig.syntax = {
    default: 'pig_normal',
    pig_normal: function pig_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:load|store|filter|foreach|order|arrange|distinct|cogroup|join|cross|union|onschema|split|into|if|all|any|as|by|using|inner|outer|parallel|group|continuously|window|tuples|generate|eval|define|returns|input|output|ship|cache|stream|through|seconds|minutes|hours|asc|desc|null|left|right|full)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:and|is|not|or|eq|neq|gt|lt|gte|lte|matches)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-weight:bold')) continue;
            if((m = /^(?:chararray|bytearray|int|long|float|double|tuple|bag|map)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:cat|cd|cp|copyFromLocal|copyToLocal|define|dump|illustrate|describe|explain|exec|help|kill|ls|mv|mkdir|pwd|quit|register|import|rm|set)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#BA8200;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:flatten|sum|count|min|max|avg|arity|tokenize|diff|size|concat|BinStorage|PigStorage|TextLoader|PigDump|IsEmpty)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[%](declare|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;font-weight:bold')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.pig_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.pig_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.pig_dashComment())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[$][a-zA-Z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#25A000')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    pig_parameterVariable: function pig_parameterVariable(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[$][a-zA-Z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#25A000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    pig_singleAString: function pig_singleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[$][a-zA-Z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#25A000')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    pig_dashComment: function pig_dashComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    pig_multilineComment: function pig_multilineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    alert_indent_normalText: function alert_indent_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
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
