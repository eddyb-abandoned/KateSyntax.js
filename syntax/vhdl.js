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
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if(/^architecture\s+(&varname;)/i.exec(this.str)) {this._architecture_main();continue;}
        if((m = /^entity/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._entity();continue;}
        if(/^&bos;(package\s+(&varname;)\s+is)&eos;/i.exec(this.str)) {this._package();continue;}
        if(/^&bos;(package\s+body\s+(&varname;)\s+is)&eos;/i.exec(this.str)) {this._packagebody();continue;}
        if((m = /^(?:file|library|use)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._package = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%2/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;end(\s+package)?(\s+%3)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._packagebody = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%2/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;end(\s+package)?(\s+%3)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._architecture_main = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^architecture\s+(&varname;)\s+of\s+(&varname;)\s+is/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._arch_decl();continue;}
        if((m = /^&bos;end(\s+architecture)?(\s+%1)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^&bos;end(\s+architecture)?(\s+&varname;)\s*;/i.exec(this.str)) && this.hl(m[0], 'dsError')) {this._#pop#pop();continue;}
        if(/^&bos;((&varname;)\s*:\s*)(if|for).*\s+generate&eos;/i.exec(this.str)) {this._generate1();continue;}
        if(/^&bos;((&varname;)\s*:\s*)?process&eos;/i.exec(this.str)) {this._process1();continue;}
        if(/^\b(&varname;)\s*:\s*(&varname;)/i.exec(this.str)) {this._instance();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._arch_decl = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^(?:signal|variable|constant|type)\b/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^component/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._entity();continue;}
        if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detect_arch_parts = function() {
    var m;
    while(this.pos < this.len) {
        if(/^&bos;((&varname;)\s*:\s*)(if|for).*\s+generate&eos;/i.exec(this.str)) {this._generate1();continue;}
        if(/^&bos;((&varname;)\s*:\s*)?process&eos;/i.exec(this.str)) {this._process1();continue;}
        if(/^\b(&varname;)\s*:\s*(&varname;)/i.exec(this.str)) {this._instance();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._generate1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^&bos;generate&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._generate2();continue;}
        if((m = /^&bos;%3&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^for/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^if/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._generate2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;end\s+generate(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if(/^&bos;((&varname;)\s*:\s*)(if|for).*\s+generate&eos;/i.exec(this.str)) {this._generate1();continue;}
        if(/^&bos;((&varname;)\s*:\s*)?process&eos;/i.exec(this.str)) {this._process1();continue;}
        if(/^\b(&varname;)\s*:\s*(&varname;)/i.exec(this.str)) {this._instance();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._process1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^end\s+process(\s+%3)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^end\s+process(\s+&varname;)?/i.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if((m = /^process/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._if_start();continue;}
        if(/^&bos;(case)&eos;/i.exec(this.str)) {this._case1();continue;}
        if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forOrWhile();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._proc_rules = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._if_start();continue;}
        if(/^&bos;(case)&eos;/i.exec(this.str)) {this._case1();continue;}
        if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forOrWhile();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._instance = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^\b%1\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == ')' && this.str[1] == ';' && this.hl(');', 'dsNormal')) return;
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._forOrWhile = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&bos;end\s+loop(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:loop)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._if_start();continue;}
        if(/^&bos;(case)&eos;/i.exec(this.str)) {this._case1();continue;}
        if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forOrWhile();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._if_start = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^then/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._if();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._if = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^&bos;end\s+if(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._if_start();continue;}
        if(/^&bos;(case)&eos;/i.exec(this.str)) {this._case1();continue;}
        if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forOrWhile();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:if|else|elsif|then)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._case1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^is/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._case2();continue;}
        if((m = /^(?:case|when)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._case2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^&bos;end\s+case(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^when/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._caseWhen();continue;}
        if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._if_start();continue;}
        if(/^&bos;(case)&eos;/i.exec(this.str)) {this._case1();continue;}
        if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forOrWhile();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._caseWhen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if(/^&bos;when&eos;/i.exec(this.str)) return;
        if(/^&bos;end\s+case(\s+&varname;)?\s*;/i.exec(this.str)) return;
        if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._if_start();continue;}
        if(/^&bos;(case)&eos;/i.exec(this.str)) {this._case1();continue;}
        if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forOrWhile();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._entity = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^(&varname;)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._entity_main();continue;}
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._entity_main = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if((m = /^&bos;end(\s+(entity|component))?(\s+%1)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^&bos;end(\s+(entity|component))?(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsError')) {this._#pop#pop();continue;}
        if((m = /^generic/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^port/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._preDetection = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._generalDetection = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
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
HL.prototype._attribute = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsBaseN')) {this._quotInAtt();continue;}
        if(this.str[0] == ' ' && this.hl(' ', 'dsNormal')) return;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) return;
        if((m = /^[()=<>]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._quotInAtt = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._signal = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[&><=:+\\-*\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsBaseN')) {this._attribute();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) return;
        if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._signal();continue;}
        if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
