KateSyntax.langs.modelica.syntax = {
    default: 'modelica_normalText',
    modelica_normalText: function modelica_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\bend\s+(for|while|loop)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bloop\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+(if|when)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+(if|when)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(if|when)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:type)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:block|class|connector|function|model|package|record)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Boolean|enumeration|ExternalObject|Integer|Real|StateSelect|String)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:display|fixed|max|min|nominal|quantity|start|stateSelect|unit|value)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:algorithm|and|annotation|assert|break|connect|constant|constrainedby|discrete|else|elseif|elsewhen|encapsulated|end|equation|expandable|extends|external|false|final|flow|for|if|import|in|inner|input|loop|not|or|outer|output|parameter|partial|protected|public|redeclare|replaceable|return|then|true|when|while|within)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:time|abs|ceil|div|floor|integer|mod|rem|sign|sqrt|sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|exp|log|log10|analysisType|cardinality|change|delay|der|direction|edge|initial|isPresent|noEvent|pre|reinit|sample|semiLinear|smooth|terminal|terminate|ndims|size|scalar|vector|matrix|array|zeros|ones|fill|identity|diagonal|linspace|min|max|sum|product|transpose|outerProduct|symmetric|cross|skew|cat)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[()[\]{}]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[_a-zA-Z]\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.modelica_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.modelica_singleLineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.modelica_multiLineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    modelica_string: function modelica_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    modelica_singleLineComment: function modelica_singleLineComment(m) {
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
    modelica_multiLineComment: function modelica_multiLineComment(m) {
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
