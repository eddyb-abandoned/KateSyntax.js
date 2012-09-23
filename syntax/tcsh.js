KateSyntax.langs.tcsh.syntax = {
    default: 'tcsh_start',
    tcsh_start: function tcsh_start(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_findAll: function tcsh_findAll(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_findMost: function tcsh_findMost(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_findComments: function tcsh_findComments(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_comment: function tcsh_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    tcsh_findCommentsParen: function tcsh_findCommentsParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_commentParen: function tcsh_commentParen(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^)](?=\))/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    tcsh_findCommentsBackq: function tcsh_findCommentsBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_commentBackq())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_commentBackq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_commentBackq: function tcsh_commentBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^`](?=`)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    tcsh_findCommands: function tcsh_findCommands(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_findOthers: function tcsh_findOthers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_findStrings: function tcsh_findStrings(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_findSubstitutions: function tcsh_findSubstitutions(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_findTests: function tcsh_findTests(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-[rwxXeozsfdlbcpSugktRLDIFNZ](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-[AMCUG]:?(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-P[0-7]{,3}:?(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([|&=><])\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[|^&><+\-*/%!~]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]~|[!><]=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_exprDblParen: function tcsh_exprDblParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.tcsh_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_exprDblParenSubst: function tcsh_exprDblParenSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsOthers')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.tcsh_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_exprSubParen: function tcsh_exprSubParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.tcsh_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_exprBracket: function tcsh_exprBracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.tcsh_exprSubParen())return this.pop(), m-1;continue;}
            if((m = /^-[rwxXeozsfdlbcpSugktRLDIFNZ](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-[AMCUG]:?(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-P[0-7]{,3}:?(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([|&=><])\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[|^&><+\-*/%!~]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]~|[!><]=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_exprDblBracket: function tcsh_exprDblBracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s\]\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^\]\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.tcsh_exprSubParen())return this.pop(), m-1;continue;}
            if((m = /^-[rwxXeozsfdlbcpSugktRLDIFNZ](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-[AMCUG]:?(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-P[0-7]{,3}:?(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([|&=><])\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[|^&><+\-*/%!~]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]~|[!><]=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_group: function tcsh_group(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_subShell: function tcsh_subShell(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_assign: function tcsh_assign(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.tcsh_assignArray())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[\w:,+_./-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    tcsh_assignArray: function tcsh_assignArray(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.tcsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_assignSubscr: function tcsh_assignSubscr(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.tcsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    tcsh_subscript: function tcsh_subscript(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    tcsh_functionDef: function tcsh_functionDef(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+&funcname;(\s*\(\))?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    tcsh_cmdSetEnv: function tcsh_cmdSetEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\s' && this.hl('\s', 'dsOthers')) {if(m = this.tcsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    tcsh_varName: function tcsh_varName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-[A-Za-z0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.tcsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\]})|;`&><]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    tcsh_processSubst: function tcsh_processSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_stringSQ: function tcsh_stringSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    tcsh_stringDQ: function tcsh_stringDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\[`"\\$\n]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    tcsh_stringEsc: function tcsh_stringEsc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if((m = /^\\[abefnrtv\\']/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\([0-7]{1,3}|x[A-Fa-f0-9]{1,2}|c.)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    tcsh_varBrace: function tcsh_varBrace(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    tcsh_substFile: function tcsh_substFile(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_substCommand: function tcsh_substCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_substBackq: function tcsh_substBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_commentBackq())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_commentBackq())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_switch: function tcsh_switch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\scase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switchCase())return this.pop(), m-1;continue;}
            if((m = /^\sdefault\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switchDefault())return this.pop(), m-1;continue;}
            if((m = /^\bendsw(?=(?=$|\n)|[\s;)])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_switchCase: function tcsh_switchCase(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsKeyword')) {if(m = this.tcsh_switchExpr())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_switchDefault: function tcsh_switchDefault(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsKeyword')) {if(m = this.tcsh_switchExpr())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_switchExpr: function tcsh_switchExpr(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\sbreaksw\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if(/^\scase\b/.exec(this.str)) return this.pop(), 1;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_hereDoc: function tcsh_hereDoc(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^(<<-\s*"(&word;)")/.exec(this.str)) {if(m = this.tcsh_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*'(&word;)')/.exec(this.str)) {if(m = this.tcsh_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*\\(&word;))/.exec(this.str)) {if(m = this.tcsh_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*(&word;))/.exec(this.str)) {if(m = this.tcsh_hereDocINQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*"(&word;)")/.exec(this.str)) {if(m = this.tcsh_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*'(&word;)')/.exec(this.str)) {if(m = this.tcsh_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*\\(&word;))/.exec(this.str)) {if(m = this.tcsh_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*(&word;))/.exec(this.str)) {if(m = this.tcsh_hereDocNQ())return this.pop(), m-1;continue;}
            if((m = /^<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_hereDocRemainder: function tcsh_hereDocRemainder(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.tcsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.tcsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.tcsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s+if&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendif&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bswitch&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_switch())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b@\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['tcsh_cmd@']())return this.pop(), m-1;continue;}
            if((m = /^\bset\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSet())return this.pop(), m-1;continue;}
            if((m = /^\bsetenv\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_cmdSetEnv())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|\.|then)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?::|alias|alloc|bg|bindkey|break|builtins|bye|cd|chdir|complete|continue|dirs|echo|echotc|eval|exec|exit|fg|filetest|glob|hashstat|history|hup|inlib|jobs|kill|limit|log|login|logout|ls-F|migrate|newgrp|nice|nohup|notify|onintr|popd|printenv|pushd|rehash|repeat|sched|settc|setty|shift|source|stop|suspend|telltc|time|umask|unalias|uncomplete|unhash|unlimit|ver|wait|watchlog|where|which)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|utmpdump|uuidgen|vdir|wall|wc|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:unset|unsetenv)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_varName())return this.pop(), m-1;continue;}
            if((m = /^(<<?|>>?&?!?)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.tcsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.tcsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.tcsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[;"\\'$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_hereDocQ: function tcsh_hereDocQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%2[\s;]*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_hereDocNQ: function tcsh_hereDocNQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%2[\s;]*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_hereDocIQ: function tcsh_hereDocIQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\s*%2[\s;]*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    tcsh_hereDocINQ: function tcsh_hereDocINQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.tcsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\s*%2[\s;]*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;\*?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.tcsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.tcsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
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
