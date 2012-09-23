KateSyntax.langs.verilog.syntax = {
    default: 'verilog_normal',
    verilog_normal: function verilog_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^begin\ *:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.verilog_blockName())return this.pop(), m-1;continue;}
            if((m = /^fork\ *:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.verilog_blockName())return this.pop(), m-1;continue;}
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
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.verilog_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.verilog_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.verilog_commentar2())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<=+/:;>?[\]\^{|}~@]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && this.str[0] == '`' && this.hl('`', 'dsOthers')) {if(m = this.verilog_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^\`[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\$[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#[\d_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    verilog_string: function verilog_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.verilog_someContext())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    verilog_commentar1: function verilog_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    verilog_commentar2: function verilog_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    verilog_preprocessor: function verilog_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.verilog_someContext())return this.pop(), m-1;continue;}
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.verilog_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.verilog_commentarPreprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    verilog_commentarPreprocessor: function verilog_commentarPreprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    verilog_someContext: function verilog_someContext(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    verilog_someContext2: function verilog_someContext2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^#endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    verilog_blockName: function verilog_blockName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    verilog_port: function verilog_port(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
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
