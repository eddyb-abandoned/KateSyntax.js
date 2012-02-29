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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^begin\ *:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._blockName();continue;}
        if((m = /^fork\ *:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._blockName();continue;}
        if((m = /^(?:begin|fork|module|case|casex|casez|task|function|generate)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:end|join|endmodule|endcase|endtask|endfunction|endgenerate)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:macromodule|table|endtable|specify|specparam|endspecify|defparam|default|if|ifnone|else|forever|while|for|wait|repeat|disable|assign|deassign|force|release|always|initial|edge|posedge|negedge|config|endconfig|library|design|liblist|cell|use|instance)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:input|output|inout|wire|tri|tri0|tri1|wand|wor|triand|trior|supply0|supply1|reg|integer|real|realtime|time|vectored|scalared|trireg|parameter|event|signed|automatic|genvar|localparam)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:strong0|strong1|pull0|pull1|weak0|weak1|highz0|highz1|small|medium|large)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:pullup|pulldown|cmos|rcmos|nmos|pmos|rnmos|rpmos|and|nand|or|nor|xor|xnor|not|buf|tran|rtran|tranif0|tranif1|rtranif0|rtranif1|bufif0|bufif1|notif0|notif1)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\d_]*'d[\d_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'o[0-7xXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'h[\da-fA-FxXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'b[01_zZxX]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z0-9_, \t]+\s*:/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^[!%&()+,\-<=+/:;>?[\]\^{|}~@]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '`' && this.hl('`', 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^\`[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#[\d_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._someContext();continue;}
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._someContext();continue;}
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentarPreprocessor();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._commentarPreprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._someContext = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._someContext2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._blockName = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._port = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
