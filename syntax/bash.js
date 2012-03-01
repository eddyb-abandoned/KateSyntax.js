var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._start();
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
HL.prototype._start = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findAll = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findMost = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findComments = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._findCommentsParen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentParen();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commentParen();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentParen = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^)](?=\))/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._findCommentsBackq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentBackq();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commentBackq();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentBackq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^`](?=`)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._findCommands = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findOthers = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findStrings = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findSubstitutions = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findTests = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._exprDblParen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsKeyword')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._exprSubParen();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._exprDblParenSubst = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.str[1] == ')' && this.hl('))', 'dsOthers')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._exprSubParen();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._exprSubParen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._exprSubParen();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._exprBracket = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s\](?=($|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\](?=($|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._exprSubParen();continue;}
        if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._exprDblBracket = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s\]\](?=($|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\]\](?=($|[\s;|&]))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._exprSubParen();continue;}
        if((m = /^-[abcdefghkprstuwxOGLSNozn](?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^-([no]t|ef)(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^([!=]=?|[><])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^-(eq|ne|[gl][te])(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._group = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._subShell = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._assign = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._assignArray();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[\w:,+_./-]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._assignArray = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return;
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._subscript();continue;}
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._assign();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._assignSubscr = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._subscript();continue;}
        if(this.str[0] == '+' && this.str[1] == '=' && this.hl('+=', 'dsOthers')) {this._assign();continue;}
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._assign();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._subscript = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._functionDef = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+&funcname;(\s*\(\))?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._varName = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^-[A-Za-z0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._subscript();continue;}
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._assign();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[^]})|;`&><]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._processSubst = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentParen();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commentParen();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stringSQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\\[`"\\$\n]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringEsc = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        if((m = /^\\[abefnrtv\\']/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\([0-7]{1,3}|x[A-Fa-f0-9]{1,2}|c.)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._varBrace = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return;
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._subscript();continue;}
        if((m = /^(:?[-=?+]|##?|%%?)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varAlt();continue;}
        if((m = /^//?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varSubst();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._varSub();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._varAlt = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._varSubst = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._varSubst2();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._varSubst2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._varSub = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._varSub2();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop();continue;}
        if((m = /^&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[0-9]+(?=[:}])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._varSub2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) {this._#pop#pop#pop();continue;}
        if((m = /^&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[0-9](?=[:}])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._substFile = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentParen();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commentParen();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._substCommand = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentParen();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commentParen();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._substBackq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._commentBackq();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commentBackq();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._case = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\sin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._caseIn();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._caseIn = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\besac(?=$|[\s;)])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {this._caseExpr();continue;}
        if((m = /^[(|]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._caseExpr = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsKeyword')) return;
        if(/^esac(?=$|[\s;)])/.exec(this.str)) return;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hereDoc = function() {
    var m;
    while(this.pos < this.len) {
        if(/^(<<-\s*"(&word;)")/.exec(this.str)) {this._hereDocIQ();continue;}
        if(/^(<<-\s*'(&word;)')/.exec(this.str)) {this._hereDocIQ();continue;}
        if(/^(<<-\s*\\(&word;))/.exec(this.str)) {this._hereDocIQ();continue;}
        if(/^(<<-\s*(&word;))/.exec(this.str)) {this._hereDocINQ();continue;}
        if(/^(<<\s*"(&word;)")/.exec(this.str)) {this._hereDocQ();continue;}
        if(/^(<<\s*'(&word;)')/.exec(this.str)) {this._hereDocQ();continue;}
        if(/^(<<\s*\\(&word;))/.exec(this.str)) {this._hereDocQ();continue;}
        if(/^(<<\s*(&word;))/.exec(this.str)) {this._hereDocNQ();continue;}
        if((m = /^<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hereDocRemainder = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[\s;](?=#)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._comment();continue;}
        if(this.str[0] == '(' && this.str[1] == '(' && this.hl('((', 'dsKeyword')) {this._exprDblParen();continue;}
        if((m = /^\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\s\[\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprDblBracket();continue;}
        if((m = /^\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\s\[&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._exprBracket();continue;}
        if((m = /^\{&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._group();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._subShell();continue;}
        if((m = /^\bdo&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdone&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif&eos;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase&noword;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case();continue;}
        if((m = /^-[A-Za-z0-9][A-Za-z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^--[a-z][A-Za-z0-9_-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\b&varname;\+?=/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assign();continue;}
        if((m = /^\b&varname;(?=\[.+\]\+?=)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._assignSubscr();continue;}
        if((m = /^:\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\bfunction\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionDef();continue;}
        if((m = /^(?:else|for|function|in|select|until|while|elif|then|set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.(?=\s)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::|source|alias|bg|bind|break|builtin|cd|caller|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|suspend|test|time|times|trap|type|ulimit|umask|unalias|wait)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:arch|awk|bash|bunzip2|bzcat|bzcmp|bzdiff|bzegrep|bzfgrep|bzgrep|bzip2|bzip2recover|bzless|bzmore|cat|chattr|chgrp|chmod|chown|chvt|cp|date|dd|deallocvt|df|dir|dircolors|dmesg|dnsdomainname|domainname|du|dumpkeys|echo|ed|egrep|false|fgconsole|fgrep|fuser|gawk|getkeycodes|gocr|grep|groff|groups|gunzip|gzexe|gzip|hostname|igawk|install|kbd_mode|kbdrate|killall|last|lastb|link|ln|loadkeys|loadunimap|login|ls|lsattr|lsmod|lsmod\.old|lzcat|lzcmp|lzdiff|lzegrep|lzfgrep|lzgrep|lzless|lzcat|lzma|lzmainfo|lzmore|mapscrn|mesg|mkdir|mkfifo|mknod|mktemp|more|mount|mv|nano|netstat|nisdomainname|nroff|openvt|pgawk|pidof|ping|ps|pstree|pwd|rbash|readlink|red|resizecons|rm|rmdir|run-parts|sash|sed|setfont|setkeycodes|setleds|setmetamode|setserial|sh|showkey|shred|sleep|ssed|stat|stty|su|sync|tar|tempfile|touch|troff|true|umount|uname|unicode_start|unicode_stop|unlink|unlzma|unxz|utmpdump|uuidgen|vdir|wall|wc|xz|xzcat|ypdomainname|zcat|zcmp|zdiff|zegrep|zfgrep|zforce|zgrep|zless|zmore|znew|zsh|aclocal|aconnect|aplay|apm|apmsleep|apropos|ar|arecord|as|as86|autoconf|autoheader|automake|awk|basename|bc|bison|c\+\+|cal|cat|cc|cdda2wav|cdparanoia|cdrdao|cd-read|cdrecord|chfn|chgrp|chmod|chown|chroot|chsh|clear|cmp|co|col|comm|cp|cpio|cpp|cut|dc|dd|df|diff|diff3|dir|dircolors|directomatic|dirname|du|env|expr|fbset|file|find|flex|flex\+\+|fmt|free|ftp|funzip|fuser|g\+\+|gawk|gc|gcc|gdb|getent|getopt|gettext|gettextize|gimp|gimp-remote|gimptool|gmake|gs|head|hexdump|id|install|join|kill|killall|ld|ld86|ldd|less|lex|ln|locate|lockfile|logname|lp|lpr|ls|lynx|m4|make|man|mkdir|mknod|msgfmt|mv|namei|nasm|nawk|nice|nl|nm|nm86|nmap|nohup|nop|od|passwd|patch|pcregrep|pcretest|perl|perror|pidof|pr|printf|procmail|prune|ps2ascii|ps2epsi|ps2frag|ps2pdf|ps2ps|psbook|psmerge|psnup|psresize|psselect|pstops|rcs|rev|rm|scp|sed|seq|setterm|shred|size|size86|skill|slogin|snice|sort|sox|split|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|stat|strings|strip|sudo|suidperl|sum|tac|tail|tee|test|tr|uniq|unlink|unzip|updatedb|updmap|uptime|users|vmstat|w|wc|wget|whatis|whereis|which|who|whoami|write|xargs|yacc|yes|zip|zsoelim|dcop|kdialog|kfile|xhost|xmodmap|xset)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:export|unset|declare|typeset|local|read|readonly)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varName();continue;}
        if((m = /^\d*<<</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^<</.exec(this.str)) {this._hereDoc();continue;}
        if((m = /^[<>]\(/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._processSubst();continue;}
        if((m = /^([0-9]*(>{1,2}|<)(&[0-9]+-?)?|&>|>&|[0-9]*<>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^([|&])\1?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&funcname;\s*\(\)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '\'' && this.hl('\\\\'', 'dsDataType')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsDataType')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._stringSQ();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == '$' && this.str[1] == '\'' && this.hl('$\'', 'dsString')) {this._stringEsc();continue;}
        if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {this._stringDQ();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\[][;\\$`{}()|&<>* ]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{(?!(\s|$))\S*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&pathpart;*(?=/)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^~\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^/&pathpart;*(?=([\s/):;$`'"]|$))/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hereDocQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._hereDocRemainder();continue;}
        if((m = /^^%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hereDocNQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._hereDocRemainder();continue;}
        if((m = /^^%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hereDocIQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._hereDocRemainder();continue;}
        if((m = /^^\t*%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hereDocINQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._hereDocRemainder();continue;}
        if((m = /^^\t*%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\$&varname;\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._subscript();continue;}
        if((m = /^\$&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[*@#?$!_0-9-]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{[*@#?$!_0-9-]\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{#&varname;(\[[*@]\])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{!&varname;(\[[*@]\]|[*@])?\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{&varname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^\$\{[*@#?$!_0-9-](?=[:#%/=?+-])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._varBrace();continue;}
        if((m = /^$\(\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._exprDblParenSubst();continue;}
        if((m = /^$\(</.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._substFile();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._substCommand();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsKeyword')) {this._substBackq();continue;}
        if((m = /^\\[`$\\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
