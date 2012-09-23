KateSyntax.langs.opal.syntax = {
    default: 'opal_normal',
    opal_normal: function opal_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:ALL|AND|ANDIF|ANY|AS|ASSERT|AXM|COMPLETELY|DATA|DEF|DERIVE|DFD|DISCRIMINATORS|ELSE|EX|EXTERNAL|FI|FIX|FUN|IF|IMPLEMENTATION|IMPLIES|IMPORT|IN|INHERIT|INJECTIONS|INTERFACE|INTERNAL|LAW|LAZY|LEFTASSOC|LET|MODULE|NOT|ONLY|OR|ORIF|OTHERWISE|POST|PRE|PRED|PRIORITY|PROPERTIES|REALIZES|REQUIRE|RIGHTASSOC|SELECTORS|SIGNATURE|SORT|SPC|SPEC|SPECIFICATION|STRUCTURE|THE|THEN|THEORY|THM|TYPE|UNIQ|WHERE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000ff')) continue;
            if((m = /^(?:aEntry|agent|align|anchor|ans|arg|arg1|arg2|array|arrowWhere|bag|bitmap|bool|bstree|byte|callback|canvasEditor|capStyle|channel|char|childstat|codom|codomFrom|codomTo|color|colorModel|com|composeOp|config|configCom|cursor|dArray|data|data1|data11|data2|data21|data3|data31|data4|data41|dataFrom|dataTo|defaultPrio|denotation|device|dist|distOut|dom|domFrom|domTo|drawing|dyn|emitter|env|event|eventInfo|file|filemode|filestat|filetype|first|first1|first2|first3|fission|fmt|font|from|from1|from2|funct|group|groupid|heap|iconfig|image|in|inData|index|inode|input|int|inter|interdom|interpreter|iseq|items|joinStyle|justifyHow|long|manager|managerRequest|map|mapEntry|mark|mid|modifier|nat|natMap|OBJECT|option|orient|out|outData|output|packOp|pair|parser|permission|point|positionRequest|process|procstat|quad|range|real|regulator|rel|relief|res|res1|res2|result|role|sap|script|scroller|scrollView|scrollWindow|searchOpt|second|seekMode|selector|semaphor|seq|seqEntry|set|setEntry|short|sigaction|sighandler|sigmask|signal|size|sizeRequest|some|sreal|state|stateId|stateRequest|string|subrel|tag|textEditor|time|to|tree|triple|union|user|userid|version|view|void|wconfig|wconfigCom|wday|widget|window|wrapStyle)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#0000ff')) continue;
            if((m = /^(?:true|false|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|64|128|256|512|1024|10000|100000|1000000)\b/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.opal_string())return this.pop(), m-1;continue;}
            if((m = /^(?:\^--(?=$|\n)|\^--[^-]|[^-]--[^-]|[^-]--(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.opal_singLineCom())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsOthers')) {if(m = this.opal_multLineCom())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    opal_string: function opal_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    opal_singLineCom: function opal_singLineCom(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    opal_multLineCom: function opal_multLineCom(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsOthers')) return this.pop();
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsOthers')) {if(m = this.opal_multLineCom())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    }
};
