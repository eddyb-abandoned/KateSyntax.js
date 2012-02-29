var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
    this.hl('');
    return this.main;
};
HL.prototype.hl = function hl(m,s) {
    this.pos += m.length;
    this.str = this.str.slice(m.length);
    if(this.style == s)
        this.hlText += m;
    else {
        if(this.hlText) {
            if(this.style == 'dsNormal')
                this.main.appendChild(document.createTextNode(this.hlText));
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(this.hlText));
                span.className = this.style;
                this.main.appendChild(span);
            }
        }
        this.style = s;
        this.hlText = m;
    }
    return true;
};
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lineContinue();continue;}
        if((m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dATA();continue;}
        if((m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._findClosingBlockBrace();continue;}
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
        if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
        if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:BEGIN|END|and|begin|break|case|defined?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_2();continue;}
        if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._check_div_2();continue;}
        if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^(?:abort|at_exit|autoload|autoload?|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._check_div_1();continue;}
        if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._check_div_1();continue;}
        if((m = /^^=begin(?:\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._embeddedDocumentation();continue;}
        if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_indented_heredoc();continue;}
        if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_heredoc();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal')) continue;
        if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal')) continue;
        if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) {this._memberAccess();continue;}
        if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._check_div_1();continue;}
        if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._quotedString();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._apostrophedString();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._commandString();continue;}
        if((m = /^?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._generalComment();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) {this._check_div_1();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._regEx1();continue;}
        if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._find_gdl_input();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._check_div_1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._check_div_1_pop = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._check_div_2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2_internal();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._check_div_2_internal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[/%](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._check_div_2_pop = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[/%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2_pop_internal();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._check_div_2_pop_internal = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) {this._#pop#pop#pop();continue;}
        if((m = /^/(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lineContinue = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lineContinue();continue;}
        if((m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dATA();continue;}
        if((m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._findClosingBlockBrace();continue;}
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
        if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
        if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:BEGIN|END|and|begin|break|case|defined?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_2();continue;}
        if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._check_div_2();continue;}
        if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^(?:abort|at_exit|autoload|autoload?|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._check_div_1();continue;}
        if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._check_div_1();continue;}
        if((m = /^^=begin(?:\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._embeddedDocumentation();continue;}
        if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_indented_heredoc();continue;}
        if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_heredoc();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal')) continue;
        if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal')) continue;
        if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) {this._memberAccess();continue;}
        if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._check_div_1();continue;}
        if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._quotedString();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._apostrophedString();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._commandString();continue;}
        if((m = /^?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._generalComment();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) {this._check_div_1();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._regEx1();continue;}
        if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._find_gdl_input();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findClosingBlockBrace = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._check_div_1_pop();continue;}
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lineContinue();continue;}
        if((m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dATA();continue;}
        if((m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._findClosingBlockBrace();continue;}
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
        if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
        if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:BEGIN|END|and|begin|break|case|defined?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_2();continue;}
        if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._check_div_2();continue;}
        if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^(?:abort|at_exit|autoload|autoload?|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._check_div_1();continue;}
        if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._check_div_1();continue;}
        if((m = /^^=begin(?:\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._embeddedDocumentation();continue;}
        if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_indented_heredoc();continue;}
        if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_heredoc();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal')) continue;
        if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal')) continue;
        if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) {this._memberAccess();continue;}
        if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._check_div_1();continue;}
        if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._quotedString();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._apostrophedString();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._commandString();continue;}
        if((m = /^?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._generalComment();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) {this._check_div_1();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._regEx1();continue;}
        if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._find_gdl_input();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._quotedString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\\"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._check_div_1_pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._apostrophedString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\\'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._check_div_1_pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commandString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\\`/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._check_div_1_pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._embeddedDocumentation = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^=end(?:\s.*|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._regEx1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\//.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if((m = /^/[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1_pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._subst = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return;
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._lineContinue();continue;}
        if((m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dATA();continue;}
        if((m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._findClosingBlockBrace();continue;}
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
        if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
        if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:BEGIN|END|and|begin|break|case|defined?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_2();continue;}
        if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._check_div_2();continue;}
        if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^(?:abort|at_exit|autoload|autoload?|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|require_relative|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\$[\d_*`+@;,.~=\!\$:?'/\\\-\&"><]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_1();continue;}
        if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2();continue;}
        if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._check_div_1();continue;}
        if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._check_div_1();continue;}
        if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._check_div_1();continue;}
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._check_div_1();continue;}
        if((m = /^^=begin(?:\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._embeddedDocumentation();continue;}
        if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_indented_heredoc();continue;}
        if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._find_heredoc();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsNormal')) continue;
        if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsNormal')) continue;
        if((m = /^\s[\?\:\%]\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/=\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) {this._memberAccess();continue;}
        if((m = /^:(@{1,2}|\$)?[a-zA-Z_][a-zA-Z0-9_]*[=?!]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._check_div_1();continue;}
        if((m = /^:\[\]=?/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._quotedString();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._apostrophedString();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._commandString();continue;}
        if((m = /^?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._generalComment();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) {this._check_div_1();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._check_div_1();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._regEx1();continue;}
        if((m = /^\s*[%](?=[QqxwW]?[^\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._find_gdl_input();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._check_div_1();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._shortSubst = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\w(?!\w)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._memberAccess = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\.?[_a-z]\w*(\?|\!)?(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._check_div_2_pop();continue;}
        if((m = /^\.?[_a-z]\w*(\?|\!)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[A-Z]+_*(\d|[a-z])\w*(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2_pop();continue;}
        if((m = /^[A-Z]+_*([0-9]|[a-z])\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[_A-Z][_A-Z0-9]*(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._check_div_2_pop();continue;}
        if((m = /^[_A-Z][_A-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
        if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
        if((m = /^[=+\-*/%|&[\]{}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) return;
        if((m = /^[()\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\W/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentLine = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\w\:\:\s/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._rDocLabel();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._generalComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._rDocLabel = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._find_heredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'(\w+)'/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._apostrophed_normal_heredoc();continue;}
        if((m = /^"?(\w+)"?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._normal_heredoc();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_indented_heredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'(\w+)'/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._apostrophed_indented_heredoc();continue;}
        if((m = /^"?(\w+)"?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._indented_heredoc();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._indented_heredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._apostrophed_indented_heredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._normal_heredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._apostrophed_normal_heredoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._heredoc_rules = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_gdl_input = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^w\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_1();continue;}
        if((m = /^w\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_2();continue;}
        if((m = /^w\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_3();continue;}
        if((m = /^w</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_4();continue;}
        if((m = /^w([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_5();continue;}
        if((m = /^W\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_1();continue;}
        if((m = /^W\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_2();continue;}
        if((m = /^W\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_3();continue;}
        if((m = /^W</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_4();continue;}
        if((m = /^W([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_token_array_5();continue;}
        if((m = /^q\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_apostrophed_1();continue;}
        if((m = /^q\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_apostrophed_2();continue;}
        if((m = /^q\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_apostrophed_3();continue;}
        if((m = /^q</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_apostrophed_4();continue;}
        if((m = /^q([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_apostrophed_5();continue;}
        if((m = /^x\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_shell_command_1();continue;}
        if((m = /^x\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_shell_command_2();continue;}
        if((m = /^x\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_shell_command_3();continue;}
        if((m = /^x</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_shell_command_4();continue;}
        if((m = /^x([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_shell_command_5();continue;}
        if((m = /^r\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_regexpr_1();continue;}
        if((m = /^r\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_regexpr_2();continue;}
        if((m = /^r\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_regexpr_3();continue;}
        if((m = /^r</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_regexpr_4();continue;}
        if((m = /^r([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_regexpr_5();continue;}
        if((m = /^Q?\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_dq_string_1();continue;}
        if((m = /^Q?\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_dq_string_2();continue;}
        if((m = /^Q?\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_dq_string_3();continue;}
        if((m = /^Q?</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_dq_string_4();continue;}
        if((m = /^Q?([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._gdl_dq_string_5();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._gdl_dq_string_1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == ')' && this.hl('\)', 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_dq_string_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_1_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_dq_string_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == '}' && this.hl('\}', 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_dq_string_2_nested();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_2_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_dq_string_2_nested();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsString')) return;
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == ']' && this.hl('\]', 'dsString')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_dq_string_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_3_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_dq_string_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsString')) return;
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_4 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == '>' && this.hl('\>', 'dsString')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_dq_string_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_4_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_dq_string_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsString')) return;
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_dq_string_5 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._dq_string_rules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == ')' && this.hl('\)', 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_token_array_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_1_nested = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_token_array_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == '}' && this.hl('\}', 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_token_array_2_nested();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_2_nested = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_token_array_2_nested();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_3 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == ']' && this.hl('\]', 'dsString')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_token_array_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_3_nested = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_token_array_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_4 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == '>' && this.hl('\>', 'dsString')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_token_array_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_4_nested = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_token_array_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_token_array_5 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._token_array_rules = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == ')' && this.hl('\)', 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_apostrophed_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_1_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_apostrophed_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == '}' && this.hl('\}', 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_apostrophed_2_nested();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_2_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_apostrophed_2_nested();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == ']' && this.hl('\]', 'dsString')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_apostrophed_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_3_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_apostrophed_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_4 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '\' && this.str[1] == '>' && this.hl('\>', 'dsString')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_apostrophed_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_4_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_apostrophed_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_apostrophed_5 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._apostrophed_rules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == ')' && this.hl('\)', 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_shell_command_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_1_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._gdl_shell_command_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == '}' && this.hl('\}', 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_shell_command_2_nested();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_2_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._gdl_shell_command_2_nested();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == ']' && this.hl('\]', 'dsString')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_shell_command_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_3_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._gdl_shell_command_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_4 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == '>' && this.hl('\>', 'dsString')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_shell_command_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_4_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsString')) {this._gdl_shell_command_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_shell_command_5 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._shell_command_rules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsString')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._gdl_regexpr_1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == ')' && this.hl('\)', 'dsOthers')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._gdl_regexpr_1_nested();continue;}
        if((m = /^\)[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_1_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._gdl_regexpr_1_nested();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == '}' && this.hl('\}', 'dsOthers')) continue;
        if((m = /^\}[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._gdl_regexpr_2_nested();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_2_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._gdl_regexpr_2_nested();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == ']' && this.hl('\]', 'dsOthers')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._gdl_regexpr_3_nested();continue;}
        if((m = /^\][uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_3_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._gdl_regexpr_3_nested();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_4 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '\' && this.str[1] == '>' && this.hl('\>', 'dsOthers')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsOthers')) {this._gdl_regexpr_4_nested();continue;}
        if((m = /^>[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_4_nested = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsOthers')) {this._gdl_regexpr_4_nested();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._gdl_regexpr_5 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s*%1[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._regexpr_rules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsOthers')) continue;
        if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shortSubst();continue;}
        if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {this._subst();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._dATA = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsNormal');
    }
};
