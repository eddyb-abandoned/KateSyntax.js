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
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^(?:sensitive)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:dont_initialize|gen_unique_name|name|next_trigger|sc_assert_fail|sc_copyright|sc_cycle|sc_initialize|sc_simulation_time|sc_start|sc_stop|sc_get_default_time_unit|sc_get_default_time_resolution|sc_time_stamp|sc_version|timed_out|wait|sc_trace|sc_create_vcd_trace_file|sc_close_vcd_trace_file)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:SC_MODULE|SC_CTOR|SC_METHOD|SC_THREAD)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:sc_time_unit|sc_clock|sc_int|sc_uint|sc_bigint|sc_biguint|sc_logic|sc_lv|sc_bit|sc_bv|sc_fixed|sc_ufixed|sc_fixed_fast|sc_ufixed_fast|sc_fix|sc_ufix|sc_buffer|sc_fifo|sc_mutex|sc_semaphore|sc_signal|sc_signal_resolved|sc_signal_rv|sc_fifo_in_if|sc_fifo_out_if|sc_mutex_if|sc_semaphore_if|sc_signal_in_if|sc_signal_inout_if|sc_master|sc_inmaster|sc_outmaster|sc_inout_master|sc_indexed|sc_slave|sc_inslave|sc_outslave|sc_inoutslave|sc_in|sc_out|sc_inout|sc_noHandshake|sc_fullHandshake|sc_memfullHandshake|sc_enable_Handshake|sc_memenHandshake|sc_link_mp|sc_trace_file)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
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
