KateSyntax.langs.sed.syntax = {
    default: 'sed_beginningOfLine',
    sed_beginningOfLine: function sed_beginningOfLine(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.sed_comment())return this.pop(), m-1;continue;}
            if((m = /^(\/)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_firstAddressRegex())return this.pop(), m-1;continue;}
            if((m = /^\\(\S)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_firstAddressRegex())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.sed_afterFirstAddress())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsOthers;color:#808;font-weight:bold')) {if(m = this.sed_afterFirstAddress())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsFunction')) {if(m = this.sed_label())return this.pop(), m-1;continue;}
            if(this.str[0] == '!' && this.hl('!', 'dsOthers;color:#808;font-weight:bold')) {if(m = this.sed_command())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {if(m = this.sed_sCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {if(m = this.sed_yCommand())return this.pop(), m-1;continue;}
            if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_aICCommand())return this.pop(), m-1;continue;}
            if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_bTCommand())return this.pop(), m-1;continue;}
            if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_wRCommand())return this.pop(), m-1;continue;}
            if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_lCommand())return this.pop(), m-1;continue;}
            if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_qCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_firstAddressRegex: function sed_firstAddressRegex(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_afterFirstAddress())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
            if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sed_afterFirstAddress: function sed_afterFirstAddress(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '!' && this.hl('!', 'dsOthers;color:#808;font-weight:bold')) {if(m = this.sed_command())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {if(m = this.sed_secondAddress())return this.pop(), m-1;continue;}
            if(this.str[0] == '~' && this.hl('~', 'dsNormal')) {if(m = this.sed_step())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {if(m = this.sed_sCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {if(m = this.sed_yCommand())return this.pop(), m-1;continue;}
            if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_aICCommand())return this.pop(), m-1;continue;}
            if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_bTCommand())return this.pop(), m-1;continue;}
            if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_wRCommand())return this.pop(), m-1;continue;}
            if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_lCommand())return this.pop(), m-1;continue;}
            if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_qCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_afterFirstAddress2: function sed_afterFirstAddress2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {if(m = this.sed_secondAddress())return this.pop(), m-1;continue;}
            if(this.str[0] == '~' && this.hl('~', 'dsNormal')) {if(m = this.sed_step())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {if(m = this.sed_sCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {if(m = this.sed_yCommand())return this.pop(), m-1;continue;}
            if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_aICCommand())return this.pop(), m-1;continue;}
            if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_bTCommand())return this.pop(), m-1;continue;}
            if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_wRCommand())return this.pop(), m-1;continue;}
            if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_lCommand())return this.pop(), m-1;continue;}
            if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_qCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_secondAddress: function sed_secondAddress(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(\/)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_secondAddressRegex())return this.pop(), m-1;continue;}
            if((m = /^\\(\S)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_secondAddressRegex())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.sed_afterSecondAddress())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsOthers;color:#808;font-weight:bold')) {if(m = this.sed_afterSecondAddress())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_secondAddressRegex: function sed_secondAddressRegex(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_afterSecondAddress())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
            if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sed_afterSecondAddress: function sed_afterSecondAddress(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '!' && this.hl('!', 'dsOthers;color:#808;font-weight:bold')) {if(m = this.sed_command())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {if(m = this.sed_sCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {if(m = this.sed_yCommand())return this.pop(), m-1;continue;}
            if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_aICCommand())return this.pop(), m-1;continue;}
            if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_bTCommand())return this.pop(), m-1;continue;}
            if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_wRCommand())return this.pop(), m-1;continue;}
            if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_lCommand())return this.pop(), m-1;continue;}
            if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_qCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_step: function sed_step(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.sed_command())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_command: function sed_command(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == 's' && this.hl('s', 'dsKeyword')) {if(m = this.sed_sCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == 'y' && this.hl('y', 'dsKeyword')) {if(m = this.sed_yCommand())return this.pop(), m-1;continue;}
            if((m = /^[dpnDNPhHgGxFvz=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[aic]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_aICCommand())return this.pop(), m-1;continue;}
            if((m = /^[bTt]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_bTCommand())return this.pop(), m-1;continue;}
            if((m = /^[WwrR]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_wRCommand())return this.pop(), m-1;continue;}
            if((m = /^[lL]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_lCommand())return this.pop(), m-1;continue;}
            if((m = /^[qQ]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.sed_qCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_sCommand: function sed_sCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(\S)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_sRegex())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_sRegex: function sed_sRegex(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(%1)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_sReplacement())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
            if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sed_sReplacement: function sed_sReplacement(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_sFlags())return this.pop(), m-1;continue;}
            if((m = /^\\[0-9LlUuE\\&]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sed_sFlags: function sed_sFlags(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[gpeIiMm]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == 'w' && this.hl('w', 'dsDataType')) {if(m = this.sed_wFlag())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.sed_comment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_wFlag: function sed_wFlag(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\S+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.sed_sFlags())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_yCommand: function sed_yCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(\S)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_ySourceList())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_ySourceList: function sed_ySourceList(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(%1)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_yDestList())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sed_yDestList: function sed_yDestList(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00F')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sed_aICCommand: function sed_aICCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#000;font-weight:bold')) {if(m = this.sed_literalText())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_literalText: function sed_literalText(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#0A0;font-style:italic')) {if(m = this.sed_literalText())return this.pop(), m-1;continue;}
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#000;font-weight:bold')) {if(m = this.sed_literalText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsOthers;color:#080;font-style:italic');
        }
        this.pop();
    },
    sed_bTCommand: function sed_bTCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.sed_comment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_wRCommand: function sed_wRCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\S+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_lCommand: function sed_lCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.sed_comment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_qCommand: function sed_qCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.sed_comment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_label: function sed_label(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_afterCommand: function sed_afterCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {if(m = this.sed_beginningOfLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.sed_afterCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.sed_comment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.sed_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sed_regex: function sed_regex(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '(' && this.hl('\\(', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '|' && this.hl('\\|', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '{' && this.hl('\\{', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '[' && this.hl('\\[', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '.' && this.hl('\\.', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '*' && this.hl('\\*', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '^' && this.hl('\\^', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '$' && this.hl('\\$', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '0' && this.hl('\\0', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '1' && this.hl('\\1', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '2' && this.hl('\\2', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '3' && this.hl('\\3', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '4' && this.hl('\\4', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '5' && this.hl('\\5', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '6' && this.hl('\\6', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '7' && this.hl('\\7', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '8' && this.hl('\\8', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '9' && this.hl('\\9', 'dsChar')) continue;
            if(this.str[0] == '*' && this.hl('*', 'dsChar')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop(), this.sed_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sed_comment: function sed_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    sed_error: function sed_error(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), this.sed_beginningOfLine();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    }
};
