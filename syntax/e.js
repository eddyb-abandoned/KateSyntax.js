var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._out_comment();
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
HL.prototype._out_comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '<' && this.str[1] == ''' && this.hl('<'', 'dsComment')) {this._normal();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == ''' && this.str[1] == '>' && this.hl(''>', 'dsNormal')) {this._out_comment();continue;}
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^['[&><=:+\\-*\|\].,;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:FALSE|MAX_INT|MIN_INT|NULL|TRUE|UNDEF|bit|bits|body|bool|byte|byte_array|continue|copy|default|external_pointer|files|file|form|global|index|init|int|it|list|load|long|me|method|module|ntv|of|pat|print|result|source_ref|string|symtab|sys|test|uint|untyped|vec)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:run|init|pre_generate|dut_error|pack|unpack|post_generate|pre_generate|set_config|hex|stop_run|append|size|delete|is_empty|deep_compare|deep_compare_physical|clear|pop0|setup|crc_32)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:chars|define|extend|event|ECHO|DOECHO|import|initialize|non_terminal|struct|unit|script|testgroup|type)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:C|add|also|and|as|as_a|break|code|compute|computed|delayed|do|else|each|emit|empty|end|exit|finish|for|from|if|in|is|like|log|new|no|not|only|or|out|read|repeat|return|reverse|routine|step|then|to|traceable|untraceable|var|when|while|with|write|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:before|by|choose|gen|keep|keeping|matches|next|select|sequence|soft|using)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:address|cover|error|events|event|length|kind|ranges|range|sample|text|value|item|transition|illegal)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:always|all|basic|call|cycles|cycle|clock|change|check|expect|fall|first|forever|idle|initial|negedge|others|on|posedge|rise|start|that|time|task|until|verilog|vhdl|wait|within)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
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
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
