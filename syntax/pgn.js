KateSyntax.langs.pgn.syntax = {
    default: 'pgn_normal',
    pgn_normal: function pgn_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:Event|Site|Date|Round|White|Black|Result|ECO|Annotator|PlyCount|EventDate|EventCountry|SourceDate|WhiteTitle|BlackTitle|FM|IM|GM|WhiteElo|BlackElo|WhiteNA|BlackNA|WhiteType|BlackType|program|human|TimeControl|FEN|Termination|abandoned|adjudication|death|emergency|normal|rules|infraction|time|forfeit|unterminated|Mode|OTB|PM|EM|ICS|TC)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) continue;
            if((m = /^[KQBNRPODCTA]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0095FF;fontStyle:normal;fontWeight:bold')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsComment')) {if(m = this.pgn_comment_p())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsComment;fontWeight:bold')) {if(m = this.pgn_comment_c())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;fontWeight:normal')) {if(m = this.pgn_string())return this.pop(), m-1;continue;}
            if((m = /^(\$\d*|1\-0|0\-1|1\/2\-1\/2|\*|#|\+|\?|!|=|x|\+\-|\-\+)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#00bb00')) continue;
            if((m = /^\d*(\.|\.\.\.)( |(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#bb00bb')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    pgn_comment_p: function pgn_comment_p(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;fontWeight:normal')) {if(m = this.pgn_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsComment')) {if(m = this.pgn_comment_p())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsComment;fontWeight:bold')) {if(m = this.pgn_comment_c())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    pgn_comment_c: function pgn_comment_c(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;fontWeight:normal')) {if(m = this.pgn_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsComment')) {if(m = this.pgn_comment_p())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsComment;fontWeight:bold')) {if(m = this.pgn_comment_c())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsComment;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;fontWeight:bold');
        }
        this.pop();
    },
    pgn_string: function pgn_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;fontWeight:normal')) return this.pop();
            this.hl(this.str[0], 'dsString;fontWeight:normal');
        }
        this.pop();
    }
};
