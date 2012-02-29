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
        if((m = /^#\s*if\s+0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._outscoped();continue;}
        if(this.str[0] == '#') {this._afterHash();continue;}
        if((m = /^(?:after|all|any|around|assoc_index|assoc_size|async|bad_state|bad_trans|before|begin|big_endian|bind|bin_activation|bit_normal|bit_reverse|break|breakpoint|case|casex|casez|class|constraint|continue|coverage|coverage_block|coverage_def|coverage_depth|coverage_goal|coverage_group|coverage_option|coverage_val|cross_num_print_missing|cross_auto_bin_max|cov_comment|default|depth|dist|do|else|end|enum|exhaustive|export|extends|extern|for|foreach|fork|function|hdl_task|hdl_node|hide|if|illegal_self_transition|illegal_state|illegal_transition|in|interface|invisible|join|little_endian|local|m_bad_state|m_bad_trans|m_state|m_trans|negedge|new|newcov|non_rand|none|not|null|or|ordered|packed|port|posedge|proceed|prod|prodget|prodset|program|protected|public|rand|randc|randcase|randseq|repeat|return|rules|sample|sample_event|shadow|soft|state|static|super|task|terminate|this|trans|typedef|unpacked|var|vca|vector|verilog_node|verilog_task|vhdl_node|vhdl_task|virtual|virtuals|visible|void|while|wildcard|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:integer|bit|reg|string|bind_var|event|inout|input|output|ASYNC|CLOCK|NDRIVE|NHOLD|NRX|NRZ|NR0|NR1|NSAMPLE|PDRIVE|PHOLD|PRX|PRZ|PR0|PR1|PSAMPLE)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:gnr|grx|grz|gr0|gr1|nr|rx|rz|r0|r1|snr|srx|srz|sr0|sr1)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:alloc|call_func|call_task|cast_assign|close_conn|cm_coverage|cm_get_coverage|cm_get_limit|coverage_backup_database_file|coverage_save_database|delay|error|error_mode|error_wait|exit|fclose|feof|ferror|fflush|flag|fopen|fprintf|freadb|freadb|freadh|freadstr|get_bind|get_bind_id|get_conn_err|get_cycle|get_env|get_memsize|get_plus_arg|get_systime|get_time|get_time_unit|getstate|initstate|lock_file|mailbox_get|mailbox_put|mailbox_receive|mailbox_send|make_client|make_server|os_command|printf|psprintf|query|query_str|query_x|rand48|random|region_enter|region_exit|rewind|semaphore_get|semaphore_put|setstate|signal_connect|simwave_plot|srandom|sprintf|sscanf|stop|suspend_thread|sync|timeout|trace|trigger|unit_delay|unlock_file|up_connections|urand48|urandom|urandom_range|vera_bit_reverse|vera_crc|vera_pack|vera_pack_big_endian|vera_plot|vera_report_profile|vera_unpack|vera_unpack_big_endian|vsv_call_func|vsv_call_task|vsv_close_conn|vsv_get_conn_err|vsv_make_client|vsv_make_server|vsv_up_connections|vsv_wait_for_done|vsv_wait_for_input|wait_child|wait_var|Configure|DisableTrigger|DoAction|EnableCount|EnableTrigger|Event|GetAssert|GetCount|GetFirstAssert|GetName|GetNextAssert|Wait|atobin|atohex|atoi|atooct|backref|bittostr|capacity|compare|constraint_mode|delete|empty|find|find_index|first|first_index|get_at_least|get_auto_bin|get_cov_weight|get_coverage_goal|get_cross_bin_max|get_status|get_status_msg|getc|hash|icompare|insert|inst_get_at_least|inst_get_auto_bin_max|inst_get_collect|inst_get_cov_weight|inst_get_coverage_goal|inst_getcross_bin_max|inst_query|inst_set_at_least|inst_set_auto_bin_max|inst_set_bin_activiation|inst_set_collect|inst_set_cov_weight|inst_set_coverage_goal|inst_set_cross_bin_max|itoa|last|last_index|len|load|match|max|max_index|min|min_index|object_compare|object_copy|object_print|pack|pick_index|pop_back|pop_front|post_pack|post_randomize|post_unpack|postmatch|pre_pack|pre_randomize|prematch|push_back|push_front|putc|query|query_str|rand_mode|randomize|reserve|reverse|rsort|search|set_at_least|set_auto_bin_max|set_bin_activiation|set_cov_weight|set_coverage_goal|set_cross_bin_max|set_name|size|sort|substr|sum|thismatch|tolower|toupper|unique_index|unpack|new|object_compare|post_boundary|post_pack|post_randomize|post_unpack|pre-randomize|pre_boundary|pre_pack|pre_unpack|ALL|ANY|BAD_STATE|BAD_TRANS|CALL|CHECK|CHGEDGE|CLEAR|COPY_NO_WAIT|COPY_WAIT|CROSS|CROSS_TRANS|DEBUG|DELETE|EC_ARRAYX|EC_CODE_END|EC_CONFLICT|EC_EVNTIMOUT|EC_EXPECT|EC_FULLEXPECT|EC_MBXTMOUT|EC_NEXPECT|EC_RETURN|EC_RGNTMOUT|EC_SCONFLICT|EC_SEMTMOUT|EC_SEXPECT|EC_SFULLEXPECT|EC_SNEXTPECT|EC_USERSET|EQ|EVENT|FAIL|FIRST|FORK|GE|GOAL|GT|HAND_SHAKE|HI|HIGH|HNUM|LE|LIC_EXIT|LIC_PRERR|LIC_PRWARN|LIC_WAIT|LO|LOAD|LOW|LT|MAILBOX|MAX_COM|NAME|NE|NEGEDGE|NEXT|NO_OVERLAP|NO_OVERLAP_STATE|NO_OVERLAP_TRANS|NO_VARS|NO_WAIT|NUM|NUM_BIN|NUM_DET|OFF|OK|OK_LAST|ON|ONE_BLAST|ONE_SHOT|ORDER|PAST_IT|PERCENT|POSEDGE|PROGRAM|RAWIN|REGION|REPORT|SAMPLE|SAVE|SEMAPHORE|SET|SILENT|STATE|STR|STR_ERR_OUT_OF_RANGE|STR_ERR_REGEXP_SYNTAX|SUM|TRANS|VERBOSE|WAIT|stderr|stdin|stdout)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[\d_]*'d[\d_]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[\d_]*'o[0-7xXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'h[\da-fA-FxXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'b[01_zZxX]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._afterHash = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#\s*if(?:def|ndef)?(?=\s+\S)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s*endif/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s*define.*((?=\\))/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._define();continue;}
        if((m = /^#\s*(?:el(?:se|if)|include(?:_next)?|define|undef|line|error|warning|pragma)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s+[0-9]+/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsError')) return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentarPreprocessor();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._define = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._commentarPreprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._outscoped = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*el(?:se|if)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._outscopedIntern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
