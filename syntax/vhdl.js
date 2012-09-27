KateSyntax.langs.vhdl.syntax = {
    default: 'vhdl_start',
    vhdl_start: function vhdl_start(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if(/^architecture\s+(&varname;)/i.exec(this.str)) {if(m = this.vhdl_architecture_main())return this.pop(), m-1;continue;}
            if((m = /^entity/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_entity())return this.pop(), m-1;continue;}
            if(/^&bos;(package\s+(&varname;)\s+is)&eos;/i.exec(this.str)) {if(m = this.vhdl_package())return this.pop(), m-1;continue;}
            if(/^&bos;(package\s+body\s+(&varname;)\s+is)&eos;/i.exec(this.str)) {if(m = this.vhdl_packagebody())return this.pop(), m-1;continue;}
            if((m = /^(?:file|library|use)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_package: function vhdl_package(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%2/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^&bos;end(\s+package)?(\s+%3)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop();
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_packagebody: function vhdl_packagebody(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%2/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^&bos;end(\s+package)?(\s+%3)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop();
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_architecture_main: function vhdl_architecture_main(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^architecture\s+(&varname;)\s+of\s+(&varname;)\s+is/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_arch_decl())return this.pop(), m-1;continue;}
            if((m = /^&bos;end(\s+architecture)?(\s+%1)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^&bos;end(\s+architecture)?(\s+&varname;)\s*;/i.exec(this.str)) && this.hl(m[0], 'dsError;color:#f00;font-weight:bold')) return this.pop(), 1;
            if(/^&bos;((&varname;)\s*:\s*)(if|for).*\s+generate&eos;/i.exec(this.str)) {if(m = this.vhdl_generate1())return this.pop(), m-1;continue;}
            if(/^&bos;((&varname;)\s*:\s*)?process&eos;/i.exec(this.str)) {if(m = this.vhdl_process1())return this.pop(), m-1;continue;}
            if(/^\b(&varname;)\s*:\s*(&varname;)/i.exec(this.str)) {if(m = this.vhdl_instance())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_arch_decl: function vhdl_arch_decl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^(?:signal|variable|constant|type)\b/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^component/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_entity())return this.pop(), m-1;continue;}
            if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop();
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_detect_arch_parts: function vhdl_detect_arch_parts(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^&bos;((&varname;)\s*:\s*)(if|for).*\s+generate&eos;/i.exec(this.str)) {if(m = this.vhdl_generate1())return this.pop(), m-1;continue;}
            if(/^&bos;((&varname;)\s*:\s*)?process&eos;/i.exec(this.str)) {if(m = this.vhdl_process1())return this.pop(), m-1;continue;}
            if(/^\b(&varname;)\s*:\s*(&varname;)/i.exec(this.str)) {if(m = this.vhdl_instance())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_generate1: function vhdl_generate1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^&bos;generate&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_generate2())return this.pop(), m-1;continue;}
            if((m = /^&bos;%3&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^for/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^if/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_generate2: function vhdl_generate2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^&bos;end\s+generate(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if(/^&bos;((&varname;)\s*:\s*)(if|for).*\s+generate&eos;/i.exec(this.str)) {if(m = this.vhdl_generate1())return this.pop(), m-1;continue;}
            if(/^&bos;((&varname;)\s*:\s*)?process&eos;/i.exec(this.str)) {if(m = this.vhdl_process1())return this.pop(), m-1;continue;}
            if(/^\b(&varname;)\s*:\s*(&varname;)/i.exec(this.str)) {if(m = this.vhdl_instance())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_process1: function vhdl_process1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^end\s+process(\s+%3)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#09A')) return this.pop();
            if((m = /^end\s+process(\s+&varname;)?/i.exec(this.str)) && this.hl(m[0], 'dsError;color:#f00;font-weight:bold')) return this.pop();
            if((m = /^process/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#09A')) continue;
            if((m = /^begin/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#09A')) continue;
            if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_if_start())return this.pop(), m-1;continue;}
            if(/^&bos;(case)&eos;/i.exec(this.str)) {if(m = this.vhdl_case1())return this.pop(), m-1;continue;}
            if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_forOrWhile())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_proc_rules: function vhdl_proc_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_if_start())return this.pop(), m-1;continue;}
            if(/^&bos;(case)&eos;/i.exec(this.str)) {if(m = this.vhdl_case1())return this.pop(), m-1;continue;}
            if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_forOrWhile())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_instance: function vhdl_instance(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^\b%1\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^\b%2\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if(this.str[0] == ')' && this.str[1] == ';' && this.hl(');', 'dsNormal')) return this.pop();
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_forOrWhile: function vhdl_forOrWhile(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&bos;end\s+loop(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop();
            if((m = /^(?:loop)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_if_start())return this.pop(), m-1;continue;}
            if(/^&bos;(case)&eos;/i.exec(this.str)) {if(m = this.vhdl_case1())return this.pop(), m-1;continue;}
            if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_forOrWhile())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_if_start: function vhdl_if_start(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^then/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_if())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_if: function vhdl_if(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^&bos;end\s+if(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_if_start())return this.pop(), m-1;continue;}
            if(/^&bos;(case)&eos;/i.exec(this.str)) {if(m = this.vhdl_case1())return this.pop(), m-1;continue;}
            if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_forOrWhile())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:if|else|elsif|then)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_case1: function vhdl_case1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^is/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.vhdl_case2())return this.pop(), m-1;continue;}
            if((m = /^(?:case|when)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_case2: function vhdl_case2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^&bos;end\s+case(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^when/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_caseWhen())return this.pop(), m-1;continue;}
            if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_if_start())return this.pop(), m-1;continue;}
            if(/^&bos;(case)&eos;/i.exec(this.str)) {if(m = this.vhdl_case1())return this.pop(), m-1;continue;}
            if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_forOrWhile())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_caseWhen: function vhdl_caseWhen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if(/^&bos;when&eos;/i.exec(this.str)) return this.pop();
            if(/^&bos;end\s+case(\s+&varname;)?\s*;/i.exec(this.str)) return this.pop();
            if((m = /^&bos;&varname;(?=\s*:(?!=))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) continue;
            if((m = /^&bos;(if)&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_if_start())return this.pop(), m-1;continue;}
            if(/^&bos;(case)&eos;/i.exec(this.str)) {if(m = this.vhdl_case1())return this.pop(), m-1;continue;}
            if((m = /^&bos;&label;((for|while)\s+.+\s+)?loop&eos;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) {if(m = this.vhdl_forOrWhile())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_entity: function vhdl_entity(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^(&varname;)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#b60;font-weight:bold')) {if(m = this.vhdl_entity_main())return this.pop(), m-1;continue;}
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_entity_main: function vhdl_entity_main(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if((m = /^&bos;end(\s+(entity|component))?(\s+%1)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) return this.pop(), 1;
            if((m = /^&bos;end(\s+(entity|component))?(\s+&varname;)?\s*;/i.exec(this.str)) && this.hl(m[0], 'dsError;color:#f00;font-weight:bold')) return this.pop(), 1;
            if((m = /^generic/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^port/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#238')) continue;
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_preDetection: function vhdl_preDetection(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_generalDetection: function vhdl_generalDetection(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vhdl_comment: function vhdl_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    vhdl_string: function vhdl_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    vhdl_attribute: function vhdl_attribute(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsBaseN')) {if(m = this.vhdl_quotInAtt())return this.pop(), m-1;continue;}
            if(this.str[0] == ' ' && this.hl(' ', 'dsNormal')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) return this.pop();
            if((m = /^[()=<>]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    vhdl_quotInAtt: function vhdl_quotInAtt(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsBaseN')) return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    vhdl_signal: function vhdl_signal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.vhdl_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vhdl_string())return this.pop(), m-1;continue;}
            if((m = /^[[&><=:+\\\-*\\/|\].,]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsBaseN')) {if(m = this.vhdl_attribute())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsNormal')) return this.pop();
            if((m = /^(?:bit|bit_vector|character|boolean|boolean_vector|integer|integer_vector|real|real_vector|time|time_vector|delay_length|string|severity_level|positive|natural|file_open_kind|file_open_status|signed|unsigned|unresolved_unsigned|unresolved_signed|line|text|side|width|std_logic|std_logic_vector|std_ulogic|std_ulogic_vector|x01|x01z|ux01|ux01z|qsim_state|qsim_state_vector|qsim_12state|qsim_12state_vector|qsim_strength|mux_bit|mux_vector|reg_bit|reg_vector|wor_bit|wor_vector)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:signal|variable|constant|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vhdl_signal())return this.pop(), m-1;continue;}
            if((m = /^(?:to|downto|others)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:access|after|alias|all|array|assert|assume|assume_guarantee|attribute|begin|block|body|bus|component|constant|context|cover|default|disconnect|downto|end|exit|fairness|file|force|function|generate|generic|group|guarded|impure|inertial|is|label|linkage|literal|map|new|next|null|of|on|open|others|parameter|port|postponed|procedure|process|property|protected|pure|range|record|register|reject|release|report|return|select|sequence|severity|signal|shared|strong|subtype|to|transport|type|unaffected|units|until|variable|vmode|vprop|vunit|wait|when|with|note|warning|error|failure|in|inout|out|buffer|and|abs|or|xor|xnor|not|mod|nand|nor|rem|rol|ror|sla|sra|sll|srl)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
