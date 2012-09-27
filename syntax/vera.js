KateSyntax.langs.vera.syntax = {
    default: 'vera_normal',
    vera_normal: function vera_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#\s*if\s+0/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vera_outscoped())return this.pop(), m-1;continue;}
            if(this.str[0] == '#') {if(m = this.vera_afterHash())return this.pop(), m-1;continue;}
            if((m = /^(?:after|all|any|around|assoc_index|assoc_size|async|bad_state|bad_trans|before|begin|big_endian|bind|bin_activation|bit_normal|bit_reverse|break|breakpoint|case|casex|casez|class|constraint|continue|coverage|coverage_block|coverage_def|coverage_depth|coverage_goal|coverage_group|coverage_option|coverage_val|cross_num_print_missing|cross_auto_bin_max|cov_comment|default|depth|dist|do|else|end|enum|exhaustive|export|extends|extern|for|foreach|fork|function|hdl_task|hdl_node|hide|if|illegal_self_transition|illegal_state|illegal_transition|in|interface|invisible|join|little_endian|local|m_bad_state|m_bad_trans|m_state|m_trans|negedge|new|newcov|non_rand|none|not|null|or|ordered|packed|port|posedge|proceed|prod|prodget|prodset|program|protected|public|rand|randc|randcase|randseq|repeat|return|rules|sample|sample_event|shadow|soft|state|static|super|task|terminate|this|trans|typedef|unpacked|var|vca|vector|verilog_node|verilog_task|vhdl_node|vhdl_task|virtual|virtuals|visible|void|while|wildcard|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:integer|bit|reg|string|bind_var|event|inout|input|output|ASYNC|CLOCK|NDRIVE|NHOLD|NRX|NRZ|NR0|NR1|NSAMPLE|PDRIVE|PHOLD|PRX|PRZ|PR0|PR1|PSAMPLE)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:gnr|grx|grz|gr0|gr1|nr|rx|rz|r0|r1|snr|srx|srz|sr0|sr1)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:alloc|call_func|call_task|cast_assign|close_conn|cm_coverage|cm_get_coverage|cm_get_limit|coverage_backup_database_file|coverage_save_database|delay|error|error_mode|error_wait|exit|fclose|feof|ferror|fflush|flag|fopen|fprintf|freadb|freadb|freadh|freadstr|get_bind|get_bind_id|get_conn_err|get_cycle|get_env|get_memsize|get_plus_arg|get_systime|get_time|get_time_unit|getstate|initstate|lock_file|mailbox_get|mailbox_put|mailbox_receive|mailbox_send|make_client|make_server|os_command|printf|psprintf|query|query_str|query_x|rand48|random|region_enter|region_exit|rewind|semaphore_get|semaphore_put|setstate|signal_connect|simwave_plot|srandom|sprintf|sscanf|stop|suspend_thread|sync|timeout|trace|trigger|unit_delay|unlock_file|up_connections|urand48|urandom|urandom_range|vera_bit_reverse|vera_crc|vera_pack|vera_pack_big_endian|vera_plot|vera_report_profile|vera_unpack|vera_unpack_big_endian|vsv_call_func|vsv_call_task|vsv_close_conn|vsv_get_conn_err|vsv_make_client|vsv_make_server|vsv_up_connections|vsv_wait_for_done|vsv_wait_for_input|wait_child|wait_var|Configure|DisableTrigger|DoAction|EnableCount|EnableTrigger|Event|GetAssert|GetCount|GetFirstAssert|GetName|GetNextAssert|Wait|atobin|atohex|atoi|atooct|backref|bittostr|capacity|compare|constraint_mode|delete|empty|find|find_index|first|first_index|get_at_least|get_auto_bin|get_cov_weight|get_coverage_goal|get_cross_bin_max|get_status|get_status_msg|getc|hash|icompare|insert|inst_get_at_least|inst_get_auto_bin_max|inst_get_collect|inst_get_cov_weight|inst_get_coverage_goal|inst_getcross_bin_max|inst_query|inst_set_at_least|inst_set_auto_bin_max|inst_set_bin_activiation|inst_set_collect|inst_set_cov_weight|inst_set_coverage_goal|inst_set_cross_bin_max|itoa|last|last_index|len|load|match|max|max_index|min|min_index|object_compare|object_copy|object_print|pack|pick_index|pop_back|pop_front|post_pack|post_randomize|post_unpack|postmatch|pre_pack|pre_randomize|prematch|push_back|push_front|putc|query|query_str|rand_mode|randomize|reserve|reverse|rsort|search|set_at_least|set_auto_bin_max|set_bin_activiation|set_cov_weight|set_coverage_goal|set_cross_bin_max|set_name|size|sort|substr|sum|thismatch|tolower|toupper|unique_index|unpack|new|object_compare|post_boundary|post_pack|post_randomize|post_unpack|pre-randomize|pre_boundary|pre_pack|pre_unpack|ALL|ANY|BAD_STATE|BAD_TRANS|CALL|CHECK|CHGEDGE|CLEAR|COPY_NO_WAIT|COPY_WAIT|CROSS|CROSS_TRANS|DEBUG|DELETE|EC_ARRAYX|EC_CODE_END|EC_CONFLICT|EC_EVNTIMOUT|EC_EXPECT|EC_FULLEXPECT|EC_MBXTMOUT|EC_NEXPECT|EC_RETURN|EC_RGNTMOUT|EC_SCONFLICT|EC_SEMTMOUT|EC_SEXPECT|EC_SFULLEXPECT|EC_SNEXTPECT|EC_USERSET|EQ|EVENT|FAIL|FIRST|FORK|GE|GOAL|GT|HAND_SHAKE|HI|HIGH|HNUM|LE|LIC_EXIT|LIC_PRERR|LIC_PRWARN|LIC_WAIT|LO|LOAD|LOW|LT|MAILBOX|MAX_COM|NAME|NE|NEGEDGE|NEXT|NO_OVERLAP|NO_OVERLAP_STATE|NO_OVERLAP_TRANS|NO_VARS|NO_WAIT|NUM|NUM_BIN|NUM_DET|OFF|OK|OK_LAST|ON|ONE_BLAST|ONE_SHOT|ORDER|PAST_IT|PERCENT|POSEDGE|PROGRAM|RAWIN|REGION|REPORT|SAMPLE|SAVE|SEMAPHORE|SET|SILENT|STATE|STR|STR_ERR_OUT_OF_RANGE|STR_ERR_REGEXP_SYNTAX|SUM|TRANS|VERBOSE|WAIT|stderr|stdin|stdout)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vera_string())return this.pop(), m-1;continue;}
            if((m = /^[\d_]*'d[\d_]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[\d_]*'o[0-7xXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^[\d_]*'h[\da-fA-FxXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^[\d_]*'b[01_zZxX]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.vera_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.vera_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&()+,\-/.*<=>?[\]{|}~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vera_string: function vera_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    vera_commentar1: function vera_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    vera_commentar2: function vera_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    vera_afterHash: function vera_afterHash(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#\s*if(?:def|ndef)?(?=\s+\S)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vera_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vera_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*define.*((?=\\))/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vera_define())return this.pop(), m-1;continue;}
            if((m = /^#\s*(?:el(?:se|if)|include(?:_next)?|define|undef|line|error|warning|pragma)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vera_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s+[0-9]+/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.vera_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    vera_preprocessor: function vera_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.vera_commentarPreprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.vera_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    vera_define: function vera_define(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    vera_commentarPreprocessor: function vera_commentarPreprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    vera_outscoped: function vera_outscoped(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vera_string())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.vera_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.vera_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.vera_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*el(?:se|if)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    vera_outscopedIntern: function vera_outscopedIntern(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vera_string())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.vera_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.vera_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.vera_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_normal: function doxygen_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    doxygen_lineComment: function doxygen_lineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;font-style:normal;font-weight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_blockComment: function doxygen_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '@' && this.str[1] == '{' && this.hl('@{', 'dsRegionMarker')) continue;
            if(this.str[0] == '@' && this.str[1] == '}' && this.hl('@}', 'dsRegionMarker')) continue;
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:\\arg|@arg|\\author|@author|\\authors|@authors|\\brief|@brief|\\bug|@bug|\\callgraph|@callgraph|\\callergraph|@callergraph|\\date|@date|\\deprecated|@deprecated|\\details|@details|\\else|@else|\\endcond|@endcond|\\endhtmlonly|@endhtmlonly|\\endif|@endif|\\enditernal|@enditernal|\\endlatexonly|@endlatexonly|\\endlink|@endlink|\\endmanonly|@endmanonly|\\endrtfonly|@endrtfonly|\\endxmlonly|@endxmlonly|\\f\[|@f\[|\\f]|@f]|\\f$|@f$|\\hideinitializer|@hideinitializer|\\htmlonly|@htmlonly|\\internal|@internal|\\invariant|@invariant|\\latexonly|@latexonly|\\li|@li|\\manonly|@manonly|\\n|@n|\\nosubgrouping|@nosubgrouping|\\only|@only|\\post|@post|\\pre|@pre|\\private|@pivate|\\privatesection|@pivatesection|\\protected|@protected|\\protectedsection|@protectedsection|\\public|@public|\\publicsection|@publicsection|\\remarks|@remarks|\\return|@return|\\returns|@returns|\\result|@result|\\rtfonly|@rtfonly|\\sa|@sa|\\see|@see|\\short|@short|\\showinitializer|@showinitializer|\\since|@since|\\tableofcontents|@tableofcontents|\\test|@test|\\version|@version|\\xmlonly|@xmlonly|\\#|@#|\\$|@$|\\%|@%|\\&|@&|\\>|@>|\\<|@<|\\"|@"|\\::|@::|\\@|@@|\\\\|@\\|\\~|@~)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\param|@param|\\tparam|@tparam)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagParam())return this.pop(), m-1;continue;}
            if((m = /^(?:\\image|@image)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagWordWord())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addindex|@addindex|\\copyright|@copyright|\\fn|@fn|\\ingroup|@ingroup|\\line|@line|\\mainpage|@mainpage|\\name|@name|\\overload|@overload|\\par|@par|\\skip|@skip|\\skipline|@skipline|\\typedef|@typedef|\\until|@until|\\var|@var)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagString())return this.pop(), m-1;continue;}
            if((m = /^(?:\\addtogroup|@addtogroup|\\category|@category|\\class|@class|\\dotfile|@dotfile|\\defgroup|@defgroup|\\interface|@interface|\\headerfile|@headerfile|\\mscfile|@mscfile|\\page|@page|\\paragraph|@paragraph|\\protocol|@prtocol|\\ref|@ref|\\section|@section|\\snippet|@snippet|\\struct|@struct|\\subpage|@subpage|\\subsection|@subsection|\\subsubsection|@subsubsection|\\union|@union|\\weakgroup|@weakgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_TagWordString())return this.pop(), m-1;continue;}
            if((m = /^[@\\][^@\\ \t]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#458C61;font-style:normal;font-weight:bold')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\\(<|>)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWord: function doxygen_mL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagParam: function doxygen_mL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordWord: function doxygen_mL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_Tag2ndWord: function doxygen_mL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop(), 1;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagString: function doxygen_mL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_mL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_mL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_TagWordString: function doxygen_mL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_mL_htmltag: function doxygen_mL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygen_mL_identifiers())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_mL_htmlcomment: function doxygen_mL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_mL_identifiers: function doxygen_mL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygen_mL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygen_mL_types2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_mL_types1: function doxygen_mL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_mL_types2: function doxygen_mL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_TagWord: function doxygen_sL_TagWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(/^(?:\\a|@a|\\anchor|@anchor|\\b|@b|\\c|@c|\\cond|@cond|\\copybrief|@copybrief|\\copydetails|@copydetails|\\copydoc|@copydoc|\\def|@def|\\dir|@dir|\\dontinclude|@dontinclude|\\e|@e|\\elseif|@elseif|\\em|@em|\\enum|@enum|\\example|@example|\\exception|@exception|\\exceptions|@exceptions|\\extends|@extends|\\file|@file|\\htmlinclude|@htmlinclude|\\if|@if|\\ifnot|@ifnot|\\implements|@implements|\\include|@include|\\includelineno|@includelineno|\\link|@link|\\memberof|@memberof|\\namespace|@namespace|\\p|@p|\\package|@package|\\property|@property|\\relatedalso|@relatedalso|\\relatesalso|@relatesalso|\\related|@related|\\relates|@relates|\\retval|@retval|\\throw|@throw|\\throws|@throws|\\verbinclude|@verbinclude|\\version|@version|\\xrefitem|@xrefitem)\b/.exec(this.str)) return this.pop();
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagParam: function doxygen_sL_TagParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\[in]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\[in,out]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordWord: function doxygen_sL_TagWordWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_Tag2ndWord())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_Tag2ndWord: function doxygen_sL_Tag2ndWord(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop(), 1;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagString: function doxygen_sL_TagString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.doxygen_sL_htmlcomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^<\/?[a-zA-Z_:][a-zA-Z0-9._:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.doxygen_sL_htmltag())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0000')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_TagWordString: function doxygen_sL_TagWordString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\S(?=&wordsep;)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_htmltag: function doxygen_sL_htmltag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.doxygen_sL_identifiers())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_sL_htmlcomment: function doxygen_sL_htmlcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_sL_identifiers: function doxygen_sL_identifiers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*#?[a-zA-Z0-9]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) {if(m = this.doxygen_sL_types1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.doxygen_sL_types2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    doxygen_sL_types1: function doxygen_sL_types1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_types2: function doxygen_sL_types2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    doxygen_sL_DetectEnv: function doxygen_sL_DetectEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[@\\]code\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_code())return this.pop(), m-1;continue;}
            if((m = /^[@\\]verbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_verbatim())return this.pop(), m-1;continue;}
            if((m = /^[@\\]f\[/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_formula())return this.pop(), m-1;continue;}
            if((m = /^[@\\]msc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_msc())return this.pop(), m-1;continue;}
            if((m = /^[@\\]dot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) {if(m = this.doxygen_dot())return this.pop(), m-1;continue;}
            if((m = /^(?:\\note|@note)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#81ca2d;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\warning|@warning)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca9219;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\attention|@attention)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#e85848;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:\\todo|@todo)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) continue;
            if((m = /^&[A-Za-z]+;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4086C0;font-style:italic;font-weight:bold')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_sL_DetectComment: function doxygen_sL_DetectComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff;font-style:italic');
        }
        this.pop();
    },
    doxygen_code: function doxygen_code(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]endcode\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_verbatim: function doxygen_verbatim(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]endverbatim\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    doxygen_formula: function doxygen_formula(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]f\]/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;font-style:italic');
        }
        this.pop();
    },
    doxygen_msc: function doxygen_msc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]endmsc\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;font-style:italic');
        }
        this.pop();
    },
    doxygen_dot: function doxygen_dot(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#0000ff;font-style:italic')) return this.pop(), 1;
            if(this.str[0] == '*' && this.hl('*', 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) continue;
            if((m = /^[@\\]enddot\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#ca60ca;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#00A000;font-style:italic');
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
