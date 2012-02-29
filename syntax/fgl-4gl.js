var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText1();
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
HL.prototype._normalText1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:at|by|go|if|in|is|no|of|on|or|to|up|add|ALL|and|ANY|avg|day|end|ESC|for|key|let|log|max|mdy|min|not|put|red|row|run|set|sum|top|blue|BOLD|call|case|cyan|desc|DROP|else|exit|file|form|FREE|from|goto|help|HIDE|HOLD|HOUR|into|last|left|like|line|load|LOCK|main|menu|MODE|name|NEED|next|null|open|page|PIPE|quit|READ|rows|show|skip|sort|STEP|STOP|TEMP|text|then|thru|true|user|WAIT|when|with|WORK|WRAP|year|after|alter|ascii|BEGIN|blink|clear|close|count|DEFER|DIRTY|error|every|false|fetch|field|first|flush|green|GROUP|index|input|label|lines|month|order|outer|pause|print|right|share|sleep|space|start|TABLE|today|union|UNITS|using|where|WHILE|white|ACCEPT|before|border|bottom|column|commit|create|cursor|define|delete|enable|ESCAPE|exists|finish|format|HAVING|header|insert|length|locate|margin|MINUTE|MODIFY|normal|option|output|PAGENO|prompt|record|report|return|revoke|SCREEN|scroll|SECOND|select|spaces|status|UNIQUE|UNLOAD|update|values|window|yellow|between|clipped|cluster|columns|command|comment|connect|CURRENT|declare|display|execute|foreach|globals|infield|MAGENTA|matches|message|options|prepare|printer|program|reverse|trailer|upshift|waiting|without|ABSOLUTE|continue|database|defaults|DISTINCT|EXTERNAL|function|INT_FLAG|NOTFOUND|previous|ROLLBACK|whenever|wordwrap|attribute|committed|construct|delimiter|downshift|exclusive|INTERRUPT|ISOLATION|otherwise|quit_flag|returning|attributes|CONSTRAINT|initialize|statistics|fgl_lastkey|formhandler|fgl_lastkey\(\))\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:char|date|array|float|money|serial|DECIMAL|integer|NUMERIC|VARCHAR|DATETIME|FRACTION|INTERVAL|smallint)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment1();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsComment')) {this._comment2();continue;}
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment1();continue;}
        if((m = /^[!%&()+,\-<=>?[\]\^|~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#if 0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._comment4();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsComment')) return;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment1();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsComment')) {this._comment2();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment3();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._comment3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsComment')) return;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._normalText2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._normalText3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment4 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^#if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment5();continue;}
        if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^#else/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment5 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment5();continue;}
        if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
