KateSyntax.langs.mergetagtext.syntax = {
    default: 'mergetagtext_normal',
    mergetagtext_normal: function mergetagtext_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.str[0] == '!' && this.str[1] == '{' && this.hl('!{', 'dsComment;color:#404040;font-style:normal')) {if(m = this.mergetagtext_secComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '!' && this.str[1] == '<' && this.hl('!<', 'dsComment;color:#404040;font-style:normal')) {if(m = this.mergetagtext_tagCommentType())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.mergetagtext_sectionIdentifier())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword;color:#008040')) {if(m = this.mergetagtext_tagType())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    mergetagtext_sectionIdentifier: function mergetagtext_sectionIdentifier(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mergetagtext_secComment: function mergetagtext_secComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsComment;color:#404040;font-style:normal')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsComment;color:#404040;font-style:normal')) {if(m = this.mergetagtext_secComment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mergetagtext_tagType: function mergetagtext_tagType(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword;color:#008040')) {if(m = this.mergetagtext_tagID())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    mergetagtext_tagID: function mergetagtext_tagID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '=' && this.hl('=', 'dsKeyword;color:#008040')) {if(m = this.mergetagtext_tagData())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mergetagtext_tagData: function mergetagtext_tagData(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#008040')) return this.pop(), 2;
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) {if(m = this.mergetagtext_charLiteral())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mergetagtext_string())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[bB][01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if((m = /^0[oO][0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mergetagtext_tagErrors: function mergetagtext_tagErrors(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mergetagtext_tagCommentType: function mergetagtext_tagCommentType(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsComment;color:#404040;font-style:normal')) {if(m = this.mergetagtext_tagCommentID())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mergetagtext_tagCommentID: function mergetagtext_tagCommentID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '=' && this.hl('=', 'dsComment;color:#404040;font-style:normal')) {if(m = this.mergetagtext_tagCommentData())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mergetagtext_tagCommentData: function mergetagtext_tagCommentData(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsComment;color:#404040;font-style:normal')) return this.pop(), 2;
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) {if(m = this.mergetagtext_commentChar())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) {if(m = this.mergetagtext_commentString())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '|' && this.hl('|', 'dsError')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsError')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mergetagtext_commentString: function mergetagtext_commentString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) return this.pop();
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mergetagtext_commentChar: function mergetagtext_commentChar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) return this.pop();
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mergetagtext_charLiteral: function mergetagtext_charLiteral(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) {if(m = this.mergetagtext_charLiteralClosing())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.mergetagtext_charLiteralClosing())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.mergetagtext_charLiteralClosing();
            return this.pop();
        }
        this.pop();
    },
    mergetagtext_charLiteralClosing: function mergetagtext_charLiteralClosing(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return this.pop(), 1;
            return this.pop(), 1;
        }
        this.pop();
    },
    mergetagtext_string: function mergetagtext_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
