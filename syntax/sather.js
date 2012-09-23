KateSyntax.langs.sather.syntax = {
    default: 'sather_normal',
    sather_normal: function sather_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:and|assert|attr|break!|case|class|const|else|elsif|end|exception|external|false|if|include|initial|is|ITER|loop|new|or|post|pre|private|protect|quit|raise|readonly|result|return|ROUT|SAME|self|shared|then|true|typecase|type|until!|value|void|when|while!|yield|abstract|any|bind|fork|guard|immutable|inout|in|lock|once|out|parloop|partial|par|spread|stub)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:$OB|ARRAY|AREF|AVAL|BOOL|CHAR|EXT_OB|FLTDX|FLTD|FLTX|FLTI|FLT|INTI|INT|$REHASH|STR|SYS)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:create|invariant|main|aget|aset|div|is_eq|is_geq|is_gt|is_leq|is_lt|is_neq|minus|mod|negate|not|plus|pow|times)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'.'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.sather_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.sather_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sather_string: function sather_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sather_comment: function sather_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
