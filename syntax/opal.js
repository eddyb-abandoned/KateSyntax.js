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
        if((m = /^(?:ALL|AND|ANDIF|ANY|AS|ASSERT|AXM|COMPLETELY|DATA|DEF|DERIVE|DFD|DISCRIMINATORS|ELSE|EX|EXTERNAL|FI|FIX|FUN|IF|IMPLEMENTATION|IMPLIES|IMPORT|IN|INHERIT|INJECTIONS|INTERFACE|INTERNAL|LAW|LAZY|LEFTASSOC|LET|MODULE|NOT|ONLY|OR|ORIF|OTHERWISE|POST|PRE|PRED|PRIORITY|PROPERTIES|REALIZES|REQUIRE|RIGHTASSOC|SELECTORS|SIGNATURE|SORT|SPC|SPEC|SPECIFICATION|STRUCTURE|THE|THEN|THEORY|THM|TYPE|UNIQ|WHERE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:aEntry|agent|align|anchor|ans|arg|arg1|arg2|array|arrowWhere|bag|bitmap|bool|bstree|byte|callback|canvasEditor|capStyle|channel|char|childstat|codom|codomFrom|codomTo|color|colorModel|com|composeOp|config|configCom|cursor|dArray|data|data1|data11|data2|data21|data3|data31|data4|data41|dataFrom|dataTo|defaultPrio|denotation|device|dist|distOut|dom|domFrom|domTo|drawing|dyn|emitter|env|event|eventInfo|file|filemode|filestat|filetype|first|first1|first2|first3|fission|fmt|font|from|from1|from2|funct|group|groupid|heap|iconfig|image|in|inData|index|inode|input|int|inter|interdom|interpreter|iseq|items|joinStyle|justifyHow|long|manager|managerRequest|map|mapEntry|mark|mid|modifier|nat|natMap|OBJECT|option|orient|out|outData|output|packOp|pair|parser|permission|point|positionRequest|process|procstat|quad|range|real|regulator|rel|relief|res|res1|res2|result|role|sap|script|scroller|scrollView|scrollWindow|searchOpt|second|seekMode|selector|semaphor|seq|seqEntry|set|setEntry|short|sigaction|sighandler|sigmask|signal|size|sizeRequest|some|sreal|state|stateId|stateRequest|string|subrel|tag|textEditor|time|to|tree|triple|union|user|userid|version|view|void|wconfig|wconfigCom|wday|widget|window|wrapStyle)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:true|false|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|64|128|256|512|1024|10000|100000|1000000)\b/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^(?:^--$|^--[^-]|[^-]--[^-]|[^-]--$)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._singLineCom();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsOthers')) {this._multLineCom();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\"' && this.hl('\"', 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singLineCom = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._multLineCom = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsOthers')) return;
        if(this.str[0] == '/*' && this.hl('/*', 'dsOthers')) {this._multLineCom();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
