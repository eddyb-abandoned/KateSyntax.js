var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._base();
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
HL.prototype._base = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^(?:after|append|AppleScript|argv|argc|array|auto_execk|auto_load|auto_mkindex|auto_path|auto_reset|beep|bell|binary|bind|bindtags|bgerror|break|button|canvas|case|catch|cd|checkbutton|clipboard|clock|close|concat|console|continue|dde|destroy|else|elseif|encoding|entry|env|eof|error|errorCode|errorInfo|eval|event|exec|exit|expr|fblocked|fconfigure|fcopy|file|fileevent|flush|focus|font|for|foreach|format|frame|gets|glob|global|grab|grid|history|if|image|incr|info|interp|join|label|lappend|lindex|linsert|list|listbox|llength|load|lower|lrange|lreplace|lsearch|lsort|menu|menubutton|message|namespace|open|option|OptProc|pack|package|parray|pid|place|pkg_mkindex|proc|puts|pwd|radiobutton|raise|read|regexp|registry|regsub|rename|resource|return|scale|scan|scrollbar|seek|selection|send|set|socket|source|split|string|subst|switch|tclLog|tcl_endOfWord|tcl_findLibrary|tcl_library|tcl_patchLevel|tcl_platform|tcl_precision|tcl_rcFileName|tcl_rcRsrcName|tcl_startOfNextWord|tcl_startOfPreviousWord|tcl_traceCompile|tcl_traceExec|tcl_version|tcl_wordBreakAfter|tcl_wordBreakBefore|tell|text|time|tk|tkTabToWindow|tkwait|tk_chooseColor|tk_chooseDirectory|tk_focusFollowMouse|tk_focusNext|tk_focusPrev|tk_getOpenFile|tk_getSaveFile|tk_library|tk_messageBox|tk_optionMenu|tk_patchLevel|tk_popup|tk_strictMotif|tk_version|toplevel|trace|unknown|unset|update|uplevel|upvar|variable|vwait|while|winfo|wm)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:add|args|atime|attributes|body|bytelength|cancel|channels|clicks|cmdcount|commands|compare|complete|convertfrom|convertto|copy|default|delete|dirname|equal|executable|exists|extension|first|forget|format|functions|globals|hostname|idle|ifneeded|index|info|is|isdirectory|isfile|join|last|length|level|library|link|loaded|locals|lstat|map|match|mkdir|mtime|nameofexecutable|names|nativename|normalize|number|owned|patchlevel|pathtype|present|procs|provide|range|readable|readlink|remove|rename|repeat|replace|require|rootname|scan|script|seconds|separator|sharedlibextension|size|split|stat|system|tail|tclversion|tolower|totitle|toupper|trim|trimleft|trimright|type|unknown|variable|vars|vcompare|vdelete|versions|vinfo|volumes|vsatisfies|wordend|wordstart|writable|activate|actual|addtag|append|appname|aspect|atom|atomname|bbox|bind|broadcast|canvasx|canvasy|caret|cells|cget|children|class|clear|client|clone|colormapfull|colormapwindows|command|configure|containing|coords|create|current|curselection|dchars|debug|deiconify|delta|depth|deselect|dlineinfo|dtag|dump|edit|entrycget|entryconfigure|families|find|flash|focus|focusmodel|fpixels|fraction|frame|generate|geometry|get|gettags|grid|group|handle|height|hide|iconbitmap|iconify|iconmask|iconname|iconposition|iconwindow|icursor|id|identify|image|insert|interps|inuse|invoke|ismapped|itemcget|itemconfigure|keys|lower|manager|mark|maxsize|measure|metrics|minsize|move|name|nearest|overrideredirect|own|panecget|paneconfigure|panes|parent|pathname|pixels|pointerx|pointerxy|pointery|positionfrom|post|postcascade|postscript|protocol|proxy|raise|release|reqheight|reqwidth|resizable|rgb|rootx|rooty|scale|scaling|screen|screencells|screendepth|screenheight|screenmmheight|screenmmwidth|screenvisual|screenwidth|search|see|select|selection|server|set|show|sizefrom|stackorder|state|status|tag|title|toplevel|transient|types|unpost|useinputmethods|validate|values|viewable|visual|visualid|visualsavailable|vrootheight|vrootwidth|vrootx|vrooty|width|window|windowingsystem|withdraw|x|xview|y)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\s-\w+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$\{([^\}]|\\\})+\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\$(::|\w)+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^"{2}/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) {this._newCommandLine();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '$' && this.hl('$', 'dsDataType')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._newCommandLine = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if(/^./.exec(this.str)) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
