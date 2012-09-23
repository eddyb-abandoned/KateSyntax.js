KateSyntax.langs.awk.syntax = {
    default: 'awk_base',
    awk_base: function awk_base(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b(BEGIN|END)\b/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.awk_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.awk_string())return this.pop(), m-1;continue;}
            if((m = /^(?:if|else|while|do|for|in|continue|break|print|printf|getline|function|return|next|exit)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ARGC|ARGV|CONVFMT|ENVIRON|FILENAME|FNR|FS|NF|NR|OFMT|OFS|ORS|RS|RSTART|RLENGTH|SUBSEP)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:gsub|gensub|index|length|match|split|sprintf|sub|substr|tolower|toupper|atan2|cos|exp|int|log|rand|sin|sqrt|srand|close|fflush|system)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\$[A-Za-z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    awk_string: function awk_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    awk_comment: function awk_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
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
