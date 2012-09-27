KateSyntax.langs.r.syntax = {
    default: 'r_level0',
    r_level0: function r_level0(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.r_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.r_string2())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) {if(m = this.r_backquotedsymbol())return this.pop(), m-1;continue;}
            if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000bf')) continue;
            if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.r_parenthesis())return this.pop(), m-1;continue;}
            if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#b00000;font-style:normal;font-weight:bold')) {if(m = this.r_headline())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.r_comment())return this.pop(), m-1;continue;}
            if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^(\+|\-|\*{1,2}|\/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.r_ctx0())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsError')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    r_ctx0: function r_ctx0(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.r_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.r_string2())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) {if(m = this.r_backquotedsymbol())return this.pop(), m-1;continue;}
            if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000bf')) continue;
            if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.r_parenthesis())return this.pop(), m-1;continue;}
            if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#b00000;font-style:normal;font-weight:bold')) {if(m = this.r_headline())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.r_comment())return this.pop(), m-1;continue;}
            if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^(\+|\-|\*{1,2}|\/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.r_ctx0())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if(this.str[0] == ')' && this.hl(')', 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    r_parenthesis: function r_parenthesis(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if((m = /^[a-zA-Z_\.][0-9a-zA-Z_\.]*[\s]*=(?=([^=]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.r_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.r_string2())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) {if(m = this.r_backquotedsymbol())return this.pop(), m-1;continue;}
            if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000bf')) continue;
            if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.r_parenthesis())return this.pop(), m-1;continue;}
            if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#b00000;font-style:normal;font-weight:bold')) {if(m = this.r_headline())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.r_comment())return this.pop(), m-1;continue;}
            if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^(\+|\-|\*{1,2}|\/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.r_ctx0())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    r_string: function r_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    r_string2: function r_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    r_backquotedsymbol: function r_backquotedsymbol(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '`' && this.hl('`', 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    r_operator_rhs: function r_operator_rhs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#b00000;font-style:normal;font-weight:bold')) {if(m = this.r_headline())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.r_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == ' ' && this.hl(' ', 'dsString')) continue;
            if((m = /^(\*|\/|<|>|\!=|=|\||&|:|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            return this.pop();
        }
        this.pop();
    },
    r_headline: function r_headline(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#b00000;font-style:normal;font-weight:bold');
        }
        this.pop();
    },
    r_comment: function r_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    r_commonRules: function r_commonRules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.r_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.r_string2())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString')) {if(m = this.r_backquotedsymbol())return this.pop(), m-1;continue;}
            if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000bf')) continue;
            if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.r_parenthesis())return this.pop(), m-1;continue;}
            if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#b00000;font-style:normal;font-weight:bold')) {if(m = this.r_headline())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.r_comment())return this.pop(), m-1;continue;}
            if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#336366;font-style:normal;font-weight:bold')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^(\+|\-|\*{1,2}|\/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#803f00;font-style:normal;font-weight:normal')) {if(m = this.r_operator_rhs())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.r_ctx0())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
