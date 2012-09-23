KateSyntax.langs.zsh.syntax = {
    default: 'zsh_start',
    zsh_start: function zsh_start(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_findAll: function zsh_findAll(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_findMost: function zsh_findMost(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_findComments: function zsh_findComments(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_comment: function zsh_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    zsh_findCommentsParen: function zsh_findCommentsParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_commentParen: function zsh_commentParen(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^)](?=\))/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    zsh_findCommentsBackq: function zsh_findCommentsBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_commentBackq())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_commentBackq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_commentBackq: function zsh_commentBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^`](?=`)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    zsh_findCommands: function zsh_findCommands(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_findOthers: function zsh_findOthers(m) {
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
    zsh_findStrings: function zsh_findStrings(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_findSubstitutions: function zsh_findSubstitutions(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_findTests: function zsh_findTests(m) {
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
    zsh_exprDblParen: function zsh_exprDblParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.zsh_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_exprDblParenSubst: function zsh_exprDblParenSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsOthers')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.zsh_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_exprSubParen: function zsh_exprSubParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.zsh_exprSubParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_exprBracket: function zsh_exprBracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) return this.pop();
            if(this.col === 0 && (m = /^\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.zsh_exprSubParen())return this.pop(), m-1;continue;}
            if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_exprDblBracket: function zsh_exprDblBracket(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s\]\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^\]\](?=((?=$|\n)|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.zsh_exprSubParen())return this.pop(), m-1;continue;}
            if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_group: function zsh_group(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_subShell: function zsh_subShell(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_assign: function zsh_assign(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.zsh_assignArray())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_assignArray: function zsh_assignArray(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_assignSubscr: function zsh_assignSubscr(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '+' && this.str[1] == '=' && this.hl('+=', 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_subscript: function zsh_subscript(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_functionDef: function zsh_functionDef(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+&funcname;(\s*\(\))?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    zsh_varName: function zsh_varName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-[A-Za-z0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_processSubst: function zsh_processSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword;color:#238')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_stringSQ: function zsh_stringSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    zsh_stringDQ: function zsh_stringDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\[`"\\$\n]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    zsh_stringEsc: function zsh_stringEsc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if((m = /^\\[abefnrtv\\']/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\\([0-7]{1,3}|x[A-Fa-f0-9]{1,2}|c.)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    zsh_varBrace: function zsh_varBrace(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^(:?[-=?+]|##?|%%?)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varAlt())return this.pop(), m-1;continue;}
            if((m = /^\/\/?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.zsh_varSub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    zsh_varAlt: function zsh_varAlt(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_varSubst: function zsh_varSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this.zsh_varSubst2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_varSubst2: function zsh_varSubst2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 2;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_varSub: function zsh_varSub(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.zsh_varSub2())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if((m = /^&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[0-9]+(?=[:}])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    zsh_varSub2: function zsh_varSub2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 2;
            if((m = /^&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[0-9](?=[:}])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    zsh_substFile: function zsh_substFile(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword;color:#238')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_substCommand: function zsh_substCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_commentParen())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_substBackq: function zsh_substBackq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_commentBackq())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_commentBackq())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_case: function zsh_case(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\sin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_caseIn())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_caseIn: function zsh_caseIn(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\besac(?=(?=$|\n)|[\s;)])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {if(m = this.zsh_caseExpr())return this.pop(), m-1;continue;}
            if((m = /^[(|]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_caseExpr: function zsh_caseExpr(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsKeyword')) return this.pop();
            if(/^esac(?=(?=$|\n)|[\s;)])/.exec(this.str)) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_hereDoc: function zsh_hereDoc(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^(<<-\s*"(&word;)")/.exec(this.str)) {if(m = this.zsh_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*'(&word;)')/.exec(this.str)) {if(m = this.zsh_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*\\(&word;))/.exec(this.str)) {if(m = this.zsh_hereDocIQ())return this.pop(), m-1;continue;}
            if(/^(<<-\s*(&word;))/.exec(this.str)) {if(m = this.zsh_hereDocINQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*"(&word;)")/.exec(this.str)) {if(m = this.zsh_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*'(&word;)')/.exec(this.str)) {if(m = this.zsh_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*\\(&word;))/.exec(this.str)) {if(m = this.zsh_hereDocQ())return this.pop(), m-1;continue;}
            if(/^(<<\s*(&word;))/.exec(this.str)) {if(m = this.zsh_hereDocNQ())return this.pop(), m-1;continue;}
            if((m = /^<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_hereDocRemainder: function zsh_hereDocRemainder(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.zsh_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {if(m = this.zsh_exprDblParen())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_exprDblBracket())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_exprBracket())return this.pop(), m-1;continue;}
            if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_group())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.zsh_subShell())return this.pop(), m-1;continue;}
            if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_case())return this.pop(), m-1;continue;}
            if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assign())return this.pop(), m-1;continue;}
            if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_assignSubscr())return this.pop(), m-1;continue;}
            if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.zsh_functionDef())return this.pop(), m-1;continue;}
            if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:-|\.|:|alias|autoload|bg|bindkey|break|builtin|bye|cap|cd|chdir|clone|command|comparguments|compcall|compctl|compdescribe|compfiles|compgroups|compquote|comptags|comptry|compvalues|continue|dirs|disable|disown|echo|echotc|echoti|emulate|enable|eval|exec|exit|false|fc|fg|functions|getcap|getopts|hash|history|jobs|kill|let|limit|log|logout|noglob|popd|print|printf|pushd|pushln|pwd|r|rehash|return|sched|set|setcap|setopt|shift|source|stat|suspend|test|times|trap|true|ttyctl|type|ulimit|umask|unalias|unfunction|unhash|unlimit|unset|unsetopt|vared|wait|whence|where|which|zcompile|zformat|zftp|zle|zmodload|zparseopts|zprof|zpty|zregexparse|zsocket|zstyle|ztcp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) continue;
            if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#c0c')) continue;
            if((m = /^(?:declare|export|float|getln|integer|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808')) {if(m = this.zsh_varName())return this.pop(), m-1;continue;}
            if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(/^<</.exec(this.str)) {if(m = this.zsh_hereDoc())return this.pop(), m-1;continue;}
            if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_processSubst())return this.pop(), m-1;continue;}
            if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.zsh_stringSQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {if(m = this.zsh_stringEsc())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.zsh_stringDQ())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
    zsh_hereDocQ: function zsh_hereDocQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_hereDocNQ: function zsh_hereDocNQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
            if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_hereDocIQ: function zsh_hereDocIQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\t*%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    zsh_hereDocINQ: function zsh_hereDocINQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_hereDocRemainder())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\t*%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_subscript())return this.pop(), m-1;continue;}
            if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_varBrace())return this.pop(), m-1;continue;}
            if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_exprDblParenSubst())return this.pop(), m-1;continue;}
            if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.zsh_substFile())return this.pop(), m-1;continue;}
            if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.zsh_substCommand())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {if(m = this.zsh_substBackq())return this.pop(), m-1;continue;}
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
