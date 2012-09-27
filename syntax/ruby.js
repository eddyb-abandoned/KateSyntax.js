KateSyntax.langs.ruby.syntax = {
    default: 'ruby_normal',
    ruby_normal: function ruby_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_lineContinue())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_findClosingBlockBrace())return this.pop(), m-1;continue;}
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(else|elsif|rescue|ensure)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^=begin(?:\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ruby_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ruby_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.ruby_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.ruby_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.ruby_generalComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.ruby_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_find_gdl_input())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_check_div_1: function ruby_check_div_1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    ruby_check_div_1_pop: function ruby_check_div_1_pop(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) return this.pop(), 1;
            return this.pop(), 1;
        }
        this.pop();
    },
    ruby_check_div_2: function ruby_check_div_2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) return this.pop();
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_check_div_2_internal())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    ruby_check_div_2_internal: function ruby_check_div_2_internal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[/%](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) return this.pop(), 1;
            return this.pop(), 1;
        }
        this.pop();
    },
    ruby_check_div_2_pop: function ruby_check_div_2_pop(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) return this.pop(), 1;
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_check_div_2_pop_internal())return this.pop(), m-1;continue;}
            return this.pop(), 1;
        }
        this.pop();
    },
    ruby_check_div_2_pop_internal: function ruby_check_div_2_pop_internal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.hl('%', 'dsNormal;color:#FF9FEC')) return this.pop(), 2;
            if((m = /^\/(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) return this.pop(), 2;
            return this.pop(), 2;
        }
        this.pop();
    },
    ruby_lineContinue: function ruby_lineContinue(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_lineContinue())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_findClosingBlockBrace())return this.pop(), m-1;continue;}
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(else|elsif|rescue|ensure)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^=begin(?:\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ruby_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ruby_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.ruby_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.ruby_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.ruby_generalComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.ruby_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_find_gdl_input())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_findClosingBlockBrace: function ruby_findClosingBlockBrace(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1_pop())return this.pop(), m-1;continue;}
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_lineContinue())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_findClosingBlockBrace())return this.pop(), m-1;continue;}
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(else|elsif|rescue|ensure)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^=begin(?:\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ruby_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ruby_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.ruby_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.ruby_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.ruby_generalComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.ruby_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_find_gdl_input())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_quotedString: function ruby_quotedString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\\"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ruby_check_div_1_pop())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_apostrophedString: function ruby_apostrophedString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\\'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.ruby_check_div_1_pop())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_commandString: function ruby_commandString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\\`/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.ruby_check_div_1_pop())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_embeddedDocumentation: function ruby_embeddedDocumentation(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^=end(?:\s.*|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ruby_regEx1: function ruby_regEx1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\//.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if((m = /^\/[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4A5704')) {if(m = this.ruby_check_div_1_pop())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_subst: function ruby_subst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop();
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_lineContinue())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_findClosingBlockBrace())return this.pop(), m-1;continue;}
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(else|elsif|rescue|ensure)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;font-weight:bold')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;font-weight:bold')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^=begin(?:\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ruby_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ruby_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.ruby_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.ruby_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.ruby_generalComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#FF9FEC')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.ruby_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_find_gdl_input())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {if(m = this.ruby_check_div_1())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.ruby_check_div_2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_shortSubst: function ruby_shortSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\w(?!\w)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ruby_memberAccess: function ruby_memberAccess(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\.?[_a-z]\w*(\?|\!)?(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) {if(m = this.ruby_check_div_2_pop())return this.pop(), m-1;continue;}
            if((m = /^\.?[_a-z]\w*(\?|\!)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) continue;
            if((m = /^[A-Z]+_*(\d|[a-z])\w*(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.ruby_check_div_2_pop())return this.pop(), m-1;continue;}
            if((m = /^[A-Z]+_*([0-9]|[a-z])\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[_A-Z][_A-Z0-9]*(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188')) {if(m = this.ruby_check_div_2_pop())return this.pop(), m-1;continue;}
            if((m = /^[_A-Z][_A-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal;color:#FF9FEC')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
            if((m = /^[=+\-*/%|&[\]{}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF9FEC')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) return this.pop();
            if((m = /^[()\\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if((m = /^\W/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_commentLine: function ruby_commentLine(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\w\:\:\s/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.ruby_rDocLabel())return this.pop(), m-1;continue;}
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ruby_generalComment: function ruby_generalComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    ruby_rDocLabel: function ruby_rDocLabel(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ruby_find_heredoc: function ruby_find_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(\w+)'/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_apostrophed_normal_heredoc())return this.pop(), m-1;continue;}
            if((m = /^"?(\w+)"?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_normal_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_find_indented_heredoc: function ruby_find_indented_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(\w+)'/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_apostrophed_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^"?(\w+)"?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.ruby_indented_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_indented_heredoc: function ruby_indented_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ruby_apostrophed_indented_heredoc: function ruby_apostrophed_indented_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ruby_normal_heredoc: function ruby_normal_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ruby_apostrophed_normal_heredoc: function ruby_apostrophed_normal_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    ruby_heredoc_rules: function ruby_heredoc_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_find_gdl_input: function ruby_find_gdl_input(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^w\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_1())return this.pop(), m-1;continue;}
            if((m = /^w\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_2())return this.pop(), m-1;continue;}
            if((m = /^w\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_3())return this.pop(), m-1;continue;}
            if((m = /^w</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_4())return this.pop(), m-1;continue;}
            if((m = /^w([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_5())return this.pop(), m-1;continue;}
            if((m = /^W\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_1())return this.pop(), m-1;continue;}
            if((m = /^W\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_2())return this.pop(), m-1;continue;}
            if((m = /^W\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_3())return this.pop(), m-1;continue;}
            if((m = /^W</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_4())return this.pop(), m-1;continue;}
            if((m = /^W([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_token_array_5())return this.pop(), m-1;continue;}
            if((m = /^q\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_apostrophed_1())return this.pop(), m-1;continue;}
            if((m = /^q\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_apostrophed_2())return this.pop(), m-1;continue;}
            if((m = /^q\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_apostrophed_3())return this.pop(), m-1;continue;}
            if((m = /^q</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_apostrophed_4())return this.pop(), m-1;continue;}
            if((m = /^q([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_apostrophed_5())return this.pop(), m-1;continue;}
            if((m = /^x\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_shell_command_1())return this.pop(), m-1;continue;}
            if((m = /^x\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_shell_command_2())return this.pop(), m-1;continue;}
            if((m = /^x\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_shell_command_3())return this.pop(), m-1;continue;}
            if((m = /^x</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_shell_command_4())return this.pop(), m-1;continue;}
            if((m = /^x([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_shell_command_5())return this.pop(), m-1;continue;}
            if((m = /^r\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_regexpr_1())return this.pop(), m-1;continue;}
            if((m = /^r\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_regexpr_2())return this.pop(), m-1;continue;}
            if((m = /^r\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_regexpr_3())return this.pop(), m-1;continue;}
            if((m = /^r</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_regexpr_4())return this.pop(), m-1;continue;}
            if((m = /^r([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_regexpr_5())return this.pop(), m-1;continue;}
            if((m = /^Q?\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_dq_string_1())return this.pop(), m-1;continue;}
            if((m = /^Q?\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_dq_string_2())return this.pop(), m-1;continue;}
            if((m = /^Q?\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_dq_string_3())return this.pop(), m-1;continue;}
            if((m = /^Q?</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_dq_string_4())return this.pop(), m-1;continue;}
            if((m = /^Q?([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_gdl_dq_string_5())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ruby_gdl_dq_string_1: function ruby_gdl_dq_string_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.ruby_gdl_dq_string_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_1_nested: function ruby_gdl_dq_string_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.ruby_gdl_dq_string_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_2: function ruby_gdl_dq_string_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.ruby_gdl_dq_string_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_2_nested: function ruby_gdl_dq_string_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.ruby_gdl_dq_string_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_3: function ruby_gdl_dq_string_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.ruby_gdl_dq_string_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_3_nested: function ruby_gdl_dq_string_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.ruby_gdl_dq_string_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_4: function ruby_gdl_dq_string_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.ruby_gdl_dq_string_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_4_nested: function ruby_gdl_dq_string_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.ruby_gdl_dq_string_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_dq_string_5: function ruby_gdl_dq_string_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_dq_string_rules: function ruby_dq_string_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_1: function ruby_gdl_token_array_1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.ruby_gdl_token_array_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_1_nested: function ruby_gdl_token_array_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.ruby_gdl_token_array_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_2: function ruby_gdl_token_array_2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.ruby_gdl_token_array_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_2_nested: function ruby_gdl_token_array_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.ruby_gdl_token_array_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_3: function ruby_gdl_token_array_3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.ruby_gdl_token_array_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_3_nested: function ruby_gdl_token_array_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.ruby_gdl_token_array_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_4: function ruby_gdl_token_array_4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.ruby_gdl_token_array_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_4_nested: function ruby_gdl_token_array_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.ruby_gdl_token_array_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_token_array_5: function ruby_gdl_token_array_5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_token_array_rules: function ruby_token_array_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_1: function ruby_gdl_apostrophed_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_1_nested: function ruby_gdl_apostrophed_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_2: function ruby_gdl_apostrophed_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_2_nested: function ruby_gdl_apostrophed_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_3: function ruby_gdl_apostrophed_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_3_nested: function ruby_gdl_apostrophed_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_4: function ruby_gdl_apostrophed_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_4_nested: function ruby_gdl_apostrophed_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#DD4A4A')) {if(m = this.ruby_gdl_apostrophed_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_apostrophed_5: function ruby_gdl_apostrophed_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#DD4A4A')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_apostrophed_rules: function ruby_apostrophed_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    ruby_gdl_shell_command_1: function ruby_gdl_shell_command_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_1_nested: function ruby_gdl_shell_command_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_2: function ruby_gdl_shell_command_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_2_nested: function ruby_gdl_shell_command_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_3: function ruby_gdl_shell_command_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_3_nested: function ruby_gdl_shell_command_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_4: function ruby_gdl_shell_command_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_4_nested: function ruby_gdl_shell_command_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#AA3000')) {if(m = this.ruby_gdl_shell_command_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_shell_command_5: function ruby_gdl_shell_command_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#AA3000')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_shell_command_rules: function ruby_shell_command_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    ruby_gdl_regexpr_1: function ruby_gdl_regexpr_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsOthers;color:#4A5704')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_1_nested())return this.pop(), m-1;continue;}
            if((m = /^\)[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_1_nested: function ruby_gdl_regexpr_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_2: function ruby_gdl_regexpr_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsOthers;color:#4A5704')) continue;
            if((m = /^\}[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_2_nested: function ruby_gdl_regexpr_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_3: function ruby_gdl_regexpr_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsOthers;color:#4A5704')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_3_nested())return this.pop(), m-1;continue;}
            if((m = /^\][uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_3_nested: function ruby_gdl_regexpr_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_4: function ruby_gdl_regexpr_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsOthers;color:#4A5704')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_4_nested())return this.pop(), m-1;continue;}
            if((m = /^>[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_4_nested: function ruby_gdl_regexpr_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsOthers;color:#4A5704')) {if(m = this.ruby_gdl_regexpr_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_gdl_regexpr_5: function ruby_gdl_regexpr_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4A5704')) continue;
            if((m = /^\s*%1[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_regexpr_rules: function ruby_regexpr_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.ruby_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.ruby_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    ruby_dATA: function ruby_dATA(m) {
        this.push();
        while(this.pos < this.len) {
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
