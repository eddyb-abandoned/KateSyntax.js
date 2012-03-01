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
        if((m = /^^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^__DATA__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._data_handle();continue;}
        if((m = /^__END__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bsub\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sub_name_def();continue;}
        if((m = /^(?:if|unless|else|elsif|while|until|for|each|foreach|next|last|break|continue|return|my|our|local|state|BEGIN|END|package|sub|do|given|when|default|__END__|__DATA__|__FILE__|__LINE__|__PACKAGE__)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:=|!=|~=|\+=|-=|\*=|\/=|\*\*=||=|||=|\/\/=|&=|&&=|?=|\+|-|\*|%||||\/\/|&&|||&|<|<<|>|>>|\^|->|=>|\.|,|;|::|\\|and|or|not|eq|ne|lt|gt|le|ge|cmp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abs|accept|alarm|atan2|bind|binmode|bless|caller|chdir|chmod|chomp|chop|chown|chr|chroot|close|closedir|connect|cos|crypt|dbmclose|dbmopen|defined|delete|die|dump|endgrent|endhostent|endnetent|endprotoent|endpwent|endservent|eof|eval|exec|exists|exit|exp|fcntl|fileno|flock|fork|format|formline|getc|getgrent|getgrgid|getgrnam|gethostbyaddr|gethostbyname|gethostent|getlogin|getnetbyaddr|getnetbyname|getnetent|getpeername|getpgrp|getppid|getpriority|getprotobyname|getprotobynumber|getprotoent|getpwent|getpwnam|getpwuid|getservbyname|getservbyport|getservent|getsockname|getsockopt|glob|gmtime|goto|grep|hex|import|index|int|ioctl|join|keys|kill|last|lc|lcfirst|length|link|listen|localtime|lock|log|lstat|map|mkdir|msgctl|msgget|msgrcv|msgsnd|no|oct|open|opendir|ord|pack|package|pipe|pop|pos|print|printf|prototype|push|quotemeta|rand|read|readdir|readline|readlink|recv|redo|ref|rename|require|reset|return|reverse|rewinddir|rindex|rmdir|scalar|seek|seekdir|select|semctl|semget|semop|send|setgrent|sethostent|setnetent|setpgrp|setpriority|setprotoent|setpwent|setservent|setsockopt|shift|shmctl|shmget|shmread|shmwrite|shutdown|sin|sleep|socket|socketpair|sort|splice|split|sprintf|sqrt|srand|stat|study|sub|substr|symlink|syscall|sysread|sysseek|system|syswrite|tell|telldir|tie|time|times|truncate|uc|ucfirst|umask|undef|unlink|unpack|unshift|untie|use|utime|values|vec|wait|waitpid|wantarray|warn|write)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:strict|english|warnings|vars|subs|utf8|sigtrap|locale|open|less|integer|filetest|constant|bytes|diagnostics)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\=(?:head[1-6]|over|back|item|for|begin|end|pod)(\s|$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._pod();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._slash_safe_escape();continue;}
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._slash_safe_escape();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._slash_safe_escape();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._slash_safe_escape();continue;}
        if((m = /^\\(["'])[^\1]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '&' && this.str[1] == '\'' && this.hl('&\'', 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsKeyword')) {this._ip_string();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) {this._string();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._backticked();continue;}
        if(/^(?:[$@]\S|%[\w{]|\*[^\d\*{\$@%=(])/.exec(this.str)) {this._find_variable();continue;}
        if((m = /^<[A-Z0-9_]+>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\s*<<(?=\w+|\s*["'])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._find_here_document();continue;}
        if((m = /^\s*\}\s*/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s*[)\]]\s*/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\w+::/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._sub_name_def();continue;}
        if((m = /^\w+[=]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\bq(?=[qwx]?\s*[^\w\s])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._find_quoted();continue;}
        if((m = /^\bs(?=\s*[^\w\s\]})])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._find_subst();continue;}
        if((m = /^\b(?:tr|y)\s*(?=[^\w\s\]})])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._tr();continue;}
        if((m = /^\b(?:m|qr)(?=\s*[^\w\s\]})])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._find_pattern();continue;}
        if((m = /^[\w_]+\s*//.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[<>"':]//.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '/' && this.hl('/', 'dsKeyword')) {this._pattern_slash();continue;}
        if((m = /^-[rwxoRWXOeszfdlpSbctugkTBMAC]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_quoted = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^x\s*(')/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._string_6();continue;}
        if((m = /^[qx]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._find_qqx();continue;}
        if(this.str[0] == 'w' && this.hl('w', 'dsKeyword')) {this._find_qw();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._string_2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._string_3();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._string_4();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._string_5();continue;}
        if((m = /^([^a-zA-Z0-9_\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._string_6();continue;}
        if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_qqx = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._ip_string_2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._ip_string_3();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._ip_string_4();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._ip_string_5();continue;}
        if((m = /^([^a-zA-Z0-9_\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ip_string_6();continue;}
        if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_qw = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._quote_word_paren();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._quote_word_brace();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._quote_word_bracket();continue;}
        if((m = /^([^a-zA-Z0-9_\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._quote_word();continue;}
        if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ipstring_internal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ip_string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsKeyword')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ip_string_2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\(.*?\)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ip_string_3 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{.*?\}/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ip_string_4 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ip_string_5 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ip_string_6 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '1' && this.hl('1', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if((m = /^\(.*?\)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_3 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if((m = /^\{.*?\}/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_4 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_5 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '<' && this.hl('\\<', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_6 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
        if((m = /^\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '1' && this.hl('1', 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._find_subst = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._subst_curlybrace_pattern();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subst_paren_pattern();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._subst_bracket_pattern();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) {this._subst_sq_pattern();continue;}
        if((m = /^([^\w\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._subst_slash_pattern();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._subst_curlybrace_pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._subst_curlybrace_middle();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._subst_curlybrace_middle = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._subst_curlybrace_replace();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._subst_curlybrace_replace = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._subst_curlybrace_replace_recursive();continue;}
        if((m = /^\}[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._subst_curlybrace_replace_recursive = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._subst_curlybrace_replace_recursive();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._subst_paren_pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._subst_paren_replace();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._subst_paren_replace = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) continue;
        if((m = /^\)[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._subst_bracket_pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) {this._subst_bracket_replace();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._subst_bracket_replace = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) continue;
        if((m = /^\][cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._subst_slash_pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\$(?=%1)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(%1)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._subst_slash_replace();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._subst_slash_replace = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._subst_sq_pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) {this._subst_sq_replace();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._subst_sq_replace = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._tr = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^([^)]*\)\s*\(?:[^)]*\)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^{[^}]*\}\s*\{[^}]*\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^\[[^}]*\]\s*\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^([^a-zA-Z0-9_\s[\]{}()]).*\1.*\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._find_pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._pattern_brace();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._pattern_paren();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._pattern_bracket();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) {this._pattern_sq();continue;}
        if((m = /^([^\w\s])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pattern();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern_slash = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\$(?=/)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^/[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\$(?=%1)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%1[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\$(?=\%1)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern_brace = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern_bracket = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\][cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern_paren = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\)[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pattern_sq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._regex_pattern_internal_rules_1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._regex_pattern_internal_rules_2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._regex_pattern_internal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._regex_pattern_internal_ip = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[$@][^]\s{}()|>']/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {this._pat_ext();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._pat_char_class();continue;}
        if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._pat_ext = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\#[^)]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^[:=!><]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if(this.str[0] == ')' && this.hl(')', 'dsChar')) return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._pat_char_class = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsBaseN')) continue;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsBaseN')) continue;
        if((m = /^\[:^?[a-z]+:\]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._find_variable = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^[@\$](?:[\+\-_]\B|ARGV\b|INC\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^[%\$](?:INC\b|ENV\b|SIG\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^\$\$[\$\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^\$[#_][\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^\$+::/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^\$[^a-zA-Z0-9\s{][A-Z]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^[\$@%]\{[\w_]+\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^[$@%]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^\*[a-zA-Z_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect();continue;}
        if((m = /^\*[^a-zA-Z0-9\s{][A-Z]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[$@%*]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._find_variable_unsafe = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^[@\$](?:[\+\-_]\B|ARGV\b|INC\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^[%\$](?:INC\b|ENV\b|SIG\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^\$\$[\$\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^\$[#_][\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^\$+::/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^\$[^a-zA-Z0-9\s{][A-Z]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\$@%]\{[\w_]+\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^[\$@%]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^\*\w+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._var_detect_unsafe();continue;}
        if((m = /^[$@%*]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._var_detect = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsNormal')) continue;
        if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsNormal')) continue;
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsNormal')) continue;
        if((m = /^\s*\}\s*/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\s*[)\]]?\s*/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^(?:if|unless|else|elsif|while|until|for|each|foreach|next|last|break|continue|return|my|our|local|state|BEGIN|END|package|sub|do|given|when|default|__END__|__DATA__|__FILE__|__LINE__|__PACKAGE__)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._var_detect_unsafe = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsNormal')) continue;
        if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsNormal')) continue;
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._var_detect_rules = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsNormal')) continue;
        if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsNormal')) continue;
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._quote_word = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '1' && this.hl('1', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._quote_word_paren = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._quote_word_brace = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._quote_word_bracket = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_here_document = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(\w+)\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._here_document();continue;}
        if((m = /^\s*"([^"]+)"\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._here_document();continue;}
        if((m = /^\s*`([^`]+)`\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._here_document();continue;}
        if((m = /^\s*'([^']+)'\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._here_document_dumb();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._here_document = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\=\s*<<\s*["']?([A-Z0-9_\-]+)["']?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._here_document();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._here_document_dumb = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._data_handle = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\=(?:head[1-6]|over|back|item|for|begin|end|pod)\s+.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._pod();continue;}
        if((m = /^__END__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._normal();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._end_handle = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^\=(?:head[1-6]|over|back|item|for|begin|end|pod)\s*.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._pod();continue;}
        if((m = /^__DATA__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._data_handle();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._backticked = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {this._find_variable_unsafe();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._slash_safe_escape = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\}\s*/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\s*[)\]]?\s*/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^(?:if|unless|else|elsif|while|until|for|each|foreach|next|last|break|continue|return|my|our|local|state|BEGIN|END|package|sub|do|given|when|default|__END__|__DATA__|__FILE__|__LINE__|__PACKAGE__)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._package_qualified_blank = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sub_name_def = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(/^\$\S/.exec(this.str)) {this._find_variable();continue;}
        if((m = /^\s*\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._sub_arg_definition();continue;}
        if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sub_arg_definition = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[*$@%]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[&\[\];]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {this._slash_safe_escape();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._pod = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\=(?:head[1-6]|over|back|item|for|begin|end|pod)\s*.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\=cut.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
