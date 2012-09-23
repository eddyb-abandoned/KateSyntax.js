KateSyntax.langs.bash.syntax = {
    default: 'bash_start',
    bash_start: function bash_start(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_findAll: function bash_findAll(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_findMost: function bash_findMost(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_findComments: function bash_findComments(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_comment: function bash_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    bash_findCommentsParen: function bash_findCommentsParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_commentParen: function bash_commentParen(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^)](?=\))/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    bash_findCommentsBackq: function bash_findCommentsBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_commentBackq())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_commentBackq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_commentBackq: function bash_commentBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^`](?=`)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    bash_findCommands: function bash_findCommands(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_findOthers: function bash_findOthers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_findStrings: function bash_findStrings(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_findSubstitutions: function bash_findSubstitutions(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_findTests: function bash_findTests(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_exprDblParen: function bash_exprDblParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.bash_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_exprDblParenSubst: function bash_exprDblParenSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsOthers')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.bash_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_exprSubParen: function bash_exprSubParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.bash_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_exprBracket: function bash_exprBracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) return this.pop();
            if(this.col === 0 && (m = /^\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.bash_exprSubParen())return this.pop(), m-1;continue;}
            if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_exprDblBracket: function bash_exprDblBracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s\]\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^\]\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.bash_exprSubParen())return this.pop(), m-1;continue;}
            if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_group: function bash_group(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_subShell: function bash_subShell(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_assign: function bash_assign(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.bash_assignArray())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[\w:,+_./-]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    bash_assignArray: function bash_assignArray(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_assignSubscr: function bash_assignSubscr(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '+' && this.str[1] == '=' && this.hl('+=', 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    bash_subscript: function bash_subscript(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    bash_functionDef: function bash_functionDef(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+&funcname;(\s*\(\))?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    bash_varName: function bash_varName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-[A-Za-z0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\]})|;`&><]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    bash_processSubst: function bash_processSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword;color:#238')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_stringSQ: function bash_stringSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    bash_stringDQ: function bash_stringDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\[`"\\$\n]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    bash_stringEsc: function bash_stringEsc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if((m = /^\\[abefnrtv\\']/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\([0-7]{1,3}|x[A-Fa-f0-9]{1,2}|c.)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    bash_varBrace: function bash_varBrace(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^(:?[-=?+]|##?|%%?)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varAlt())return this.pop(), m-1;continue;}
            if((m = /^\/\/?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.bash_varSub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    bash_varAlt: function bash_varAlt(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_varSubst: function bash_varSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this.bash_varSubst2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_varSubst2: function bash_varSubst2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 2;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_varSub: function bash_varSub(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.bash_varSub2())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if((m = /^&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[0-9]+(?=[:}])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    bash_varSub2: function bash_varSub2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 2;
            if((m = /^&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[0-9](?=[:}])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    bash_substFile: function bash_substFile(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword;color:#238')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_substCommand: function bash_substCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_substBackq: function bash_substBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_commentBackq())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_commentBackq())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_case: function bash_case(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\sin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_caseIn())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_caseIn: function bash_caseIn(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\besac(?=(?=$|\n)|[\s;)])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {if(m = this.bash_caseExpr())return this.pop(), m-1;continue;}
            if((m = /^[(|]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_caseExpr: function bash_caseExpr(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsKeyword')) return this.pop();
            if(/^esac(?=(?=$|\n)|[\s;)])/.exec(this.str)) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_hereDoc: function bash_hereDoc(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^(<<-\s*"(&word;)")/.exec(this.str)) {if(m = this.bash_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*'(&word;)')/.exec(this.str)) {if(m = this.bash_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*\\(&word;))/.exec(this.str)) {if(m = this.bash_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*(&word;))/.exec(this.str)) {if(m = this.bash_hereDocINQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*"(&word;)")/.exec(this.str)) {if(m = this.bash_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*'(&word;)')/.exec(this.str)) {if(m = this.bash_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*\\(&word;))/.exec(this.str)) {if(m = this.bash_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*(&word;))/.exec(this.str)) {if(m = this.bash_hereDocNQ())return this.pop(), m-1;continue;}
            if((m = /^<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_hereDocRemainder: function bash_hereDocRemainder(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.bash_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.bash_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.bash_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.bash_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.bash_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.bash_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.bash_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.bash_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.bash_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\[\][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\{(?!(\s|(?=$|\n)))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&pathpart;*(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/&pathpart;*(?=([\s/):;$`'"]|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_hereDocQ: function bash_hereDocQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_hereDocNQ: function bash_hereDocNQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_hereDocIQ: function bash_hereDocIQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\t*%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bash_hereDocINQ: function bash_hereDocINQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\t*%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.bash_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.bash_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.bash_substBackq())return this.pop(), m-1;continue;}
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
