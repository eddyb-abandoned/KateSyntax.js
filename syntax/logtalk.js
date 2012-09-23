KateSyntax.langs.logtalk.syntax = {
    default: 'logtalk_normal',
    logtalk_normal: function logtalk_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*:-/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.logtalk_directive())return this.pop(), m-1;continue;}
            if((m = /^\b(after|before)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(parameter|this|se(lf|nder))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(current_predicate|predicate_property)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(expand_term|term_expansion|phrase)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(abolish|c(reate|urrent))_(object|protocol|category)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(object|protocol|category)_property(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bextends_(object|protocol)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bimplements_protocol(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(instantiates|specializes)_class(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bimports_category(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(current_event|(abolish|define)_events)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(current|set)_logtalk_flag(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\blogtalk_(compile|l(ibrary_path|oad))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(clause|retract(all)?)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\ba(bolish|ssert(a|z))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(ca(ll|tch)|throw)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(fail|true)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b((bag|set)of|f(ind|or)all)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bunify_with_occurs_check(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(functor|arg|copy_term)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(rem|mod|abs|sign)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfloat(_(integer|fractional)_part)?(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(floor|truncate|round|ceiling)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(cos|atan|exp|log|s(in|qrt))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(var|atom(ic)?|integer|float|compound|n(onvar|umber))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(current|set)_(in|out)put(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(open|close)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bflush_output(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bflush_output\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(stream_property|at_end_of_stream|set_stream_position)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(nl|(get|peek|put)_(byte|c(har|ode)))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bnl\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bread(_term)?(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bwrite(q|_(canonical|term))?(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(current_)?op(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(current_)?char_conversion(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\batom_(length|c(hars|o(ncat|des)))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(char_code|sub_atom)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bnumber_c(hars|odes)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(set|current)_prolog_flag(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bhalt\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bhalt(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b[A-Z_]\w*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.logtalk_singleLineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.logtalk_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.logtalk_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.logtalk_atom())return this.pop(), m-1;continue;}
            if((m = /^0'./.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0b[0-1]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0o[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0x[0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+(\.\d+)?([eE]([-+])?\d+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsDataType')) continue;
            if(this.str[0] == '^' && this.str[1] == '^' && this.hl('^^', 'dsDataType')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsDataType')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsDataType')) continue;
            if((m = /^\bonce(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\brepeat\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsDataType')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsDataType')) continue;
            if(this.str[0] == '/' && this.str[1] == '\\' && this.hl('/\\', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '/' && this.hl('\\/', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsDataType')) continue;
            if((m = /^\bis\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^=:=/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^=\\=/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsDataType')) continue;
            if(this.str[0] == '=' && this.str[1] == '<' && this.hl('=<', 'dsDataType')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsDataType')) continue;
            if(this.str[0] == '>' && this.str[1] == '=' && this.hl('>=', 'dsDataType')) continue;
            if((m = /^=\.\./.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '=' && this.hl('\\=', 'dsDataType')) continue;
            if(this.str[0] == '=' && this.str[1] == '=' && this.hl('==', 'dsDataType')) continue;
            if((m = /^\\==/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^@=</.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '@' && this.str[1] == '<' && this.hl('@<', 'dsDataType')) continue;
            if((m = /^@>=/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '@' && this.str[1] == '>' && this.hl('@>', 'dsDataType')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsDataType')) continue;
            if((m = /^[+\-*/]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\b(mod|rem)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '*' && this.str[1] == '*' && this.hl('**', 'dsDataType')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[!;]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '+' && this.hl('\\+', 'dsDataType')) continue;
            if((m = /^[?@]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == ':' && this.str[1] == '-' && this.hl(':-', 'dsNormal')) continue;
            if((m = /^\b[a-z]\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    logtalk_directive: function logtalk_directive(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b(category|object|protocol)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.logtalk_entityrelations())return this.pop(), m-1;continue;}
            if((m = /^\bend_(category|object|protocol)[.]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\bmodule(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\bp(ublic|r(otected|ivate))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\be(ncoding|xport)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\bin(fo|itialization)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\bdynamic[.]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\b(alias|d(ynamic|iscontiguous)|meta_predicate|m(etapredicate|ode|ultifile))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\bop(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if((m = /^\b(calls|use(s|_module))(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    logtalk_entityrelations: function logtalk_entityrelations(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b(extends|i(nstantiates|mp(lements|orts))|specializes)(?=[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == ')' && this.str[1] == '.' && this.hl(').', 'dsNormal')) {if(m = this.logtalk_normal())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    logtalk_singleLineComment: function logtalk_singleLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    logtalk_multilineComment: function logtalk_multilineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    logtalk_string: function logtalk_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    logtalk_atom: function logtalk_atom(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
