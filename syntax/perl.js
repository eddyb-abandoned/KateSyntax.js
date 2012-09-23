KateSyntax.langs.perl.syntax = {
    default: 'perl_normal',
    perl_normal: function perl_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^__DATA__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_data_handle())return this.pop(), m-1;continue;}
            if((m = /^__END__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bsub\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_sub_name_def())return this.pop(), m-1;continue;}
            if((m = /^(?:if|unless|else|elsif|while|until|for|each|foreach|next|last|break|continue|return|my|our|local|state|BEGIN|END|package|sub|do|given|when|default|__END__|__DATA__|__FILE__|__LINE__|__PACKAGE__)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:=|!=|~=|\+=|-=|\*=|\/=|\*\*=|\|=|\|\|=|\/\/=|&=|&&=|\?=|\+|-|\*|%|\|\||\/\/|&&|\||&|<|<<|>|>>|\^|->|=>|\.|,|;|::|\\|and|or|not|eq|ne|lt|gt|le|ge|cmp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) continue;
            if((m = /^(?:abs|accept|alarm|atan2|bind|binmode|bless|caller|chdir|chmod|chomp|chop|chown|chr|chroot|close|closedir|connect|cos|crypt|dbmclose|dbmopen|defined|delete|die|dump|endgrent|endhostent|endnetent|endprotoent|endpwent|endservent|eof|eval|exec|exists|exit|exp|fcntl|fileno|flock|fork|format|formline|getc|getgrent|getgrgid|getgrnam|gethostbyaddr|gethostbyname|gethostent|getlogin|getnetbyaddr|getnetbyname|getnetent|getpeername|getpgrp|getppid|getpriority|getprotobyname|getprotobynumber|getprotoent|getpwent|getpwnam|getpwuid|getservbyname|getservbyport|getservent|getsockname|getsockopt|glob|gmtime|goto|grep|hex|import|index|int|ioctl|join|keys|kill|last|lc|lcfirst|length|link|listen|localtime|lock|log|lstat|map|mkdir|msgctl|msgget|msgrcv|msgsnd|no|oct|open|opendir|ord|pack|package|pipe|pop|pos|print|printf|prototype|push|quotemeta|rand|read|readdir|readline|readlink|recv|redo|ref|rename|require|reset|return|reverse|rewinddir|rindex|rmdir|scalar|seek|seekdir|select|semctl|semget|semop|send|setgrent|sethostent|setnetent|setpgrp|setpriority|setprotoent|setpwent|setservent|setsockopt|shift|shmctl|shmget|shmread|shmwrite|shutdown|sin|sleep|socket|socketpair|sort|splice|split|sprintf|sqrt|srand|stat|study|sub|substr|symlink|syscall|sysread|sysseek|system|syswrite|tell|telldir|tie|time|times|truncate|uc|ucfirst|umask|undef|unlink|unpack|unshift|untie|use|utime|values|vec|wait|waitpid|wantarray|warn|write)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:strict|english|warnings|vars|subs|utf8|sigtrap|locale|open|less|integer|filetest|constant|bytes|diagnostics)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^\=(?:head[1-6]|over|back|item|for|begin|end|pod)(\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.perl_pod())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.perl_comment())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.perl_slash_safe_escape())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.perl_slash_safe_escape())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.perl_slash_safe_escape())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.perl_slash_safe_escape())return this.pop(), m-1;continue;}
            if((m = /^\\(["'])[^\1]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '&' && this.str[1] == '\'' && this.hl('&\'', 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsKeyword;color:#008000')) {if(m = this.perl_ip_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) {if(m = this.perl_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword;color:#008000')) {if(m = this.perl_backticked())return this.pop(), m-1;continue;}
            if(/^(?:[$@]\S|%[\w{]|\*[^\d\*{\$@%=(])/.exec(this.str)) {if(m = this.perl_find_variable())return this.pop(), m-1;continue;}
            if((m = /^<[A-Z0-9_]+>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\s*<<(?=\w+|\s*["'])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_find_here_document())return this.pop(), m-1;continue;}
            if((m = /^\s*\}\s*\/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\s*[)\]]\s*\/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\w+::/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.perl_sub_name_def())return this.pop(), m-1;continue;}
            if((m = /^\w+[=]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\bq(?=[qwx]?\s*[^\w\s])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_find_quoted())return this.pop(), m-1;continue;}
            if((m = /^\bs(?=\s*[^\w\s\]})])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_find_subst())return this.pop(), m-1;continue;}
            if((m = /^\b(?:tr|y)\s*(?=[^\w\s\]})])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_tr())return this.pop(), m-1;continue;}
            if((m = /^\b(?:m|qr)(?=\s*[^\w\s\]})])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_find_pattern())return this.pop(), m-1;continue;}
            if((m = /^[\w_]+\s*\//.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[<>"':]\//.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '/' && this.hl('/', 'dsKeyword;color:#008000')) {if(m = this.perl_pattern_slash())return this.pop(), m-1;continue;}
            if((m = /^-[rwxoRWXOeszfdlpSbctugkTBMAC]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_find_quoted: function perl_find_quoted(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^x\s*(')/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_string_6())return this.pop(), m-1;continue;}
            if((m = /^[qx]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_find_qqx())return this.pop(), m-1;continue;}
            if(this.str[0] == 'w' && this.hl('w', 'dsKeyword;color:#008000')) {if(m = this.perl_find_qw())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword;color:#008000')) {if(m = this.perl_string_2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword;color:#008000')) {if(m = this.perl_string_3())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword;color:#008000')) {if(m = this.perl_string_4())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword;color:#008000')) {if(m = this.perl_string_5())return this.pop(), m-1;continue;}
            if((m = /^([^a-zA-Z0-9_\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_string_6())return this.pop(), m-1;continue;}
            if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_find_qqx: function perl_find_qqx(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword;color:#008000')) {if(m = this.perl_ip_string_2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword;color:#008000')) {if(m = this.perl_ip_string_3())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword;color:#008000')) {if(m = this.perl_ip_string_4())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword;color:#008000')) {if(m = this.perl_ip_string_5())return this.pop(), m-1;continue;}
            if((m = /^([^a-zA-Z0-9_\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_ip_string_6())return this.pop(), m-1;continue;}
            if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_find_qw: function perl_find_qw(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword;color:#008000')) {if(m = this.perl_quote_word_paren())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword;color:#008000')) {if(m = this.perl_quote_word_brace())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword;color:#008000')) {if(m = this.perl_quote_word_bracket())return this.pop(), m-1;continue;}
            if((m = /^([^a-zA-Z0-9_\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_quote_word())return this.pop(), m-1;continue;}
            if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_ipstring_internal: function perl_ipstring_internal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_ip_string: function perl_ip_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsKeyword;color:#008000')) return this.pop();
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_ip_string_2: function perl_ip_string_2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\(.*?\)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword;color:#008000')) return this.pop(), 2;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_ip_string_3: function perl_ip_string_3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{.*?\}/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#008000')) return this.pop(), 2;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_ip_string_4: function perl_ip_string_4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword;color:#008000')) return this.pop(), 2;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_ip_string_5: function perl_ip_string_5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#008000')) return this.pop(), 2;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_ip_string_6: function perl_ip_string_6(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '1' && this.hl('1', 'dsKeyword;color:#008000')) return this.pop(), 2;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_string: function perl_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    perl_string_2: function perl_string_2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if((m = /^\(.*?\)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword;color:#008000')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    perl_string_3: function perl_string_3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if((m = /^\{.*?\}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#008000')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    perl_string_4: function perl_string_4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword;color:#008000')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    perl_string_5: function perl_string_5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '<' && this.hl('\\<', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#008000')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    perl_string_6: function perl_string_6(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if((m = /^\%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '1' && this.hl('1', 'dsKeyword;color:#008000')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    perl_find_subst: function perl_find_subst(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_curlybrace_pattern())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_paren_pattern())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_bracket_pattern())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_sq_pattern())return this.pop(), m-1;continue;}
            if((m = /^([^\w\s[\]{}()])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_subst_slash_pattern())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_subst_curlybrace_pattern: function perl_subst_curlybrace_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_curlybrace_middle())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_subst_curlybrace_middle: function perl_subst_curlybrace_middle(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_curlybrace_replace())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_subst_curlybrace_replace: function perl_subst_curlybrace_replace(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.perl_subst_curlybrace_replace_recursive())return this.pop(), m-1;continue;}
            if((m = /^\}[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 3;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_subst_curlybrace_replace_recursive: function perl_subst_curlybrace_replace_recursive(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.perl_subst_curlybrace_replace_recursive())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_subst_paren_pattern: function perl_subst_paren_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_paren_replace())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_subst_paren_replace: function perl_subst_paren_replace(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword;color:#008000')) continue;
            if((m = /^\)[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 2;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_subst_bracket_pattern: function perl_subst_bracket_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_bracket_replace())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_subst_bracket_replace: function perl_subst_bracket_replace(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword;color:#008000')) continue;
            if((m = /^\][cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 2;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_subst_slash_pattern: function perl_subst_slash_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$(?=%1)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(%1)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_subst_slash_replace())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_subst_slash_replace: function perl_subst_slash_replace(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 2;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_subst_sq_pattern: function perl_subst_sq_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) {if(m = this.perl_subst_sq_replace())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_subst_sq_replace: function perl_subst_sq_replace(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'[cegimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 2;
            this.hl(this.str[0], 'dsString;color:#FF6C6C;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    perl_tr: function perl_tr(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\([^)]*\)\s*\(?:[^)]*\)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^\{[^}]*\}\s*\{[^}]*\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^\[[^\]]*\]\s*\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^([^a-zA-Z0-9_\s[\]{}()]).*\1.*\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    perl_find_pattern: function perl_find_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+#.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword;color:#008000')) {if(m = this.perl_pattern_brace())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword;color:#008000')) {if(m = this.perl_pattern_paren())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword;color:#008000')) {if(m = this.perl_pattern_bracket())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) {if(m = this.perl_pattern_sq())return this.pop(), m-1;continue;}
            if((m = /^([^\w\s])/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) {if(m = this.perl_pattern())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_pattern_slash: function perl_pattern_slash(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\/[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_pattern: function perl_pattern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$(?=%1)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%1[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 1;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\$(?=\%1)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_pattern_brace: function perl_pattern_brace(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 1;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_pattern_bracket: function perl_pattern_bracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\][cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 1;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_pattern_paren: function perl_pattern_paren(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\)[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 1;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_pattern_sq: function perl_pattern_sq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'[cgimosx]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop(), 1;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_regex_pattern_internal_rules_1: function perl_regex_pattern_internal_rules_1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_regex_pattern_internal_rules_2: function perl_regex_pattern_internal_rules_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_regex_pattern_internal: function perl_regex_pattern_internal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_regex_pattern_internal_ip: function perl_regex_pattern_internal_ip(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\\[anDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\[ABbEGLlNUuQdQZz]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\[\d]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[$@][^\]\s{}()|>']/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '?' && this.hl('(?', 'dsChar')) {if(m = this.perl_pat_ext())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.perl_pat_char_class())return this.pop(), m-1;continue;}
            if((m = /^[()?^*+|]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
            if((m = /^\s{3,}#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    perl_pat_ext: function perl_pat_ext(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\#[^)]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^[:=!><]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if(this.str[0] == ')' && this.hl(')', 'dsChar')) return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    perl_pat_char_class: function perl_pat_char_class(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '^' && this.hl('^', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsBaseN')) continue;
            if((m = /^\[:\^?[a-z]+:\]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsChar')) return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    perl_find_variable: function perl_find_variable(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^[@\$](?:[\+\-_]\B|ARGV\b|INC\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^[%\$](?:INC\b|ENV\b|SIG\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^\$\$[\$\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^\$[#_][\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^\$+::/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^\$[^a-zA-Z0-9\s{][A-Z]?/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^[\$@%]\{[\w_]+\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^[$@%]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^\*[a-zA-Z_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect())return this.pop(), m-1;continue;}
            if((m = /^\*[^a-zA-Z0-9\s{][A-Z]?/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[$@%*]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    perl_find_variable_unsafe: function perl_find_variable_unsafe(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^[@\$](?:[\+\-_]\B|ARGV\b|INC\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^[%\$](?:INC\b|ENV\b|SIG\b)/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^\$\$[\$\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^\$[#_][\w_]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^\$+::/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^\$[^a-zA-Z0-9\s{][A-Z]?/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[\$@%]\{[\w_]+\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^[\$@%]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^\*\w+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.perl_var_detect_unsafe())return this.pop(), m-1;continue;}
            if((m = /^[$@%*]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    perl_var_detect: function perl_var_detect(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsNormal')) continue;
            if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsNormal')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsNormal')) continue;
            if((m = /^\s*\}\s*\/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if((m = /^\s*[)\]]?\s*\/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if((m = /^(?:if|unless|else|elsif|while|until|for|each|foreach|next|last|break|continue|return|my|our|local|state|BEGIN|END|package|sub|do|given|when|default|__END__|__DATA__|__FILE__|__LINE__|__PACKAGE__)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            return this.pop(), 1;
        }
        this.pop();
    },
    perl_var_detect_unsafe: function perl_var_detect_unsafe(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsNormal')) continue;
            if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsNormal')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsNormal')) continue;
            return this.pop(), 1;
        }
        this.pop();
    },
    perl_var_detect_rules: function perl_var_detect_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsKeyword;color:#008000')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsNormal')) continue;
            if(this.str[0] == '+' && this.str[1] == '+' && this.hl('++', 'dsNormal')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    perl_quote_word: function perl_quote_word(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '1' && this.hl('1', 'dsKeyword;color:#008000')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_quote_word_paren: function perl_quote_word_paren(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword;color:#008000')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_quote_word_brace: function perl_quote_word_brace(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#008000')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_quote_word_bracket: function perl_quote_word_bracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsNormal')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword;color:#008000')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_find_here_document: function perl_find_here_document(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(\w+)\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_here_document())return this.pop(), m-1;continue;}
            if((m = /^\s*"([^"]+)"\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_here_document())return this.pop(), m-1;continue;}
            if((m = /^\s*`([^`]+)`\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_here_document())return this.pop(), m-1;continue;}
            if((m = /^\s*'([^']+)'\s*;?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_here_document_dumb())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_here_document: function perl_here_document(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.col === 0 && (m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^\=\s*<<\s*["']?([A-Z0-9_\-]+)["']?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_here_document())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_here_document_dumb: function perl_here_document_dumb(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_data_handle: function perl_data_handle(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\=(?:head[1-6]|over|back|item|for|begin|end|pod)\s+.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.perl_pod())return this.pop(), m-1;continue;}
            if((m = /^__END__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_normal())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_end_handle: function perl_end_handle(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\=(?:head[1-6]|over|back|item|for|begin|end|pod)\s*.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.perl_pod())return this.pop(), m-1;continue;}
            if((m = /^__DATA__/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.perl_data_handle())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    perl_backticked: function perl_backticked(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\[UuLlEtnaefr]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(/^(?:[\$@]\S|%[\w{])/.exec(this.str)) {if(m = this.perl_find_variable_unsafe())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword;color:#008000')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    perl_slash_safe_escape: function perl_slash_safe_escape(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\}\s*\/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if((m = /^\s*[)\]]?\s*\/{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if((m = /^(?:if|unless|else|elsif|while|until|for|each|foreach|next|last|break|continue|return|my|our|local|state|BEGIN|END|package|sub|do|given|when|default|__END__|__DATA__|__FILE__|__LINE__|__PACKAGE__)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    perl_package_qualified_blank: function perl_package_qualified_blank(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\w_]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    perl_sub_name_def: function perl_sub_name_def(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(/^\$\S/.exec(this.str)) {if(m = this.perl_find_variable())return this.pop(), m-1;continue;}
            if((m = /^\s*\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.perl_sub_arg_definition())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    perl_sub_arg_definition: function perl_sub_arg_definition(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[*$@%]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[&\\[\];]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) {if(m = this.perl_slash_safe_escape())return this.pop(), m-1;continue;}
            return this.pop(), 1;
        }
        this.pop();
    },
    perl_pod: function perl_pod(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^\=(?:head[1-6]|over|back|item|for|begin|end|pod)\s*.*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^\=cut.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    perl_comment: function perl_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
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
