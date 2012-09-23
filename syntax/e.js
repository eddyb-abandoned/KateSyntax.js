KateSyntax.langs.e.syntax = {
    default: 'e_out_comment',
    e_out_comment: function e_out_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '<' && this.str[1] == '\'' && this.hl('<\'', 'dsComment')) {if(m = this.e_normal())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    e_normal: function e_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#404000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#404000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.str[1] == '>' && this.hl('\'>', 'dsNormal')) {if(m = this.e_out_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.e_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.e_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.e_string())return this.pop(), m-1;continue;}
            if((m = /^['[&><=:+\\\-*\\|\].,;]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#404000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:FALSE|MAX_INT|MIN_INT|NULL|TRUE|UNDEF|bit|bits|body|bool|byte|byte_array|continue|copy|default|external_pointer|files|file|form|global|index|init|int|it|list|load|long|me|method|module|ntv|of|pat|print|result|source_ref|string|symtab|sys|test|uint|untyped|vec)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:run|init|pre_generate|dut_error|pack|unpack|post_generate|pre_generate|set_config|hex|stop_run|append|size|delete|is_empty|deep_compare|deep_compare_physical|clear|pop0|setup|crc_32)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;fontWeight:bold')) continue;
            if((m = /^(?:chars|define|extend|event|ECHO|DOECHO|import|initialize|non_terminal|struct|unit|script|testgroup|type)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#8080FF;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:C|add|also|and|as|as_a|break|code|compute|computed|delayed|do|else|each|emit|empty|end|exit|finish|for|from|if|in|is|like|log|new|no|not|only|or|out|read|repeat|return|reverse|routine|step|then|to|traceable|untraceable|var|when|while|with|write|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF8080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:before|by|choose|gen|keep|keeping|matches|next|select|sequence|soft|using)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:address|cover|error|events|event|length|kind|ranges|range|sample|text|value|item|transition|illegal)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:always|all|basic|call|cycles|cycle|clock|change|check|expect|fall|first|forever|idle|initial|negedge|others|on|posedge|rise|start|that|time|task|until|verilog|vhdl|wait|within)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    e_comment: function e_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    e_string: function e_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
