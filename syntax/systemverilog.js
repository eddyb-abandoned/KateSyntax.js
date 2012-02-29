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
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^begin\ *:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._blockName();continue;}
        if((m = /^(?:extern)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._externContext();continue;}
        if((m = /^(?:pure)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._externContext();continue;}
        if((m = /^(?:import)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._externContext();continue;}
        if((m = /^(?:typedef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._typedefContext();continue;}
        if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:package)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endpackage)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:macromodule)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:module)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endmodule)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:generate)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endgenerate)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:program)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endprogram)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:class)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endclass)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:function)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endfunction)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:case)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:casex)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:casez)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:randcase)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endcase)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:interface)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endinterface)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:clocking)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endclocking)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:task)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endtask)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:primitive)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endprimitive)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:fork)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:join)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:join_any)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:join_none)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:covergroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endgroup)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:checker)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endchecker)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:property)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endproperty)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:randsequence)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:sequence)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endsequence)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:specify)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endspecify)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:config)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endconfig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:table)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:endtable)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:defparam|deassign)\b/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(?:DPI|DPI-C|import|export|context)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:assert|assume|cover|expect|disable|iff|binsof|intersect|first_match|throughout|within)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:coverpoint|cross|wildcard|bins|ignore_bins|illegal_bins)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:genvar)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:if|else|unique|priority|matches)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:default)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:forever|repeat|while|for|do|foreach|break|continue|return)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:pulsestyle_onevent|pulsestyle_ondetect|noshowcancelled|showcancelled|ifnone)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:initial|final|always|always_comb|always_ff|always_latch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:alias|assign|force|release)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:posedge|negedge|edge|wait|wait_order)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:timeunit|timeprecision|s|ms|ns|us|ns|ps|fs|step)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:new|extends|this|super|protected|local|rand|randc|bind)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:constraint|solve|before|dist|inside|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:virtual|pure|extern|forkjoin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:design|instance|cell|liblist|use)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:library|incdir|include)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:modport)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:sync_accept_on|reject_on|accept_on|sync_reject_on|restrict|let|until|until_with|unique0|eventually|s_until|s_always|s_eventually|s_nexttime|s_until_with|global|untyped|implies|weak|strong|nexttime)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:parameter|localparam|specparam|input|output|inout|ref|byte|shortint|int|integer|longint|time|bit|logic|reg|supply0|supply1|tri|triand|trior|trireg|tri0|tri1|wire|uwire|wand|wor|signed|unsigned|shortreal|real|realtime|type|void|struct|union|tagged|const|var|automatic|static|packed|vectored|scalared|typedef|enum|string|chandle|event|null)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:`__FILE__|`__LINE__|`begin_keywords|`celldefine|`default_nettype|`define|`else|`elsif|`end_keywords|`endcelldefine|`endif|`ifdef|`ifndef|`include|`line|`nounconnected_drive|`pragma|`resetall|`timescale|`unconnected_drive|`undef|`undefineall)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:$finish|$stop|$exit|$realtime|$stime|$time|$printtimescale|$timeformat|$bitstoreal|$realtobits|$bitstoshortreal|$shortrealtobits|$itor|$rtoi|$signed|$unsigned|$cast|$bits|$isunbounded|$typename|$unpacked_dimensions|$dimensions|$left|$right|$low|$high|$increment|$size|$clog2|$asin|$ln|$acos|$log10|$atan|$exp|$atan2|$sqrt|$hypot|$pow|$sinh|$floor|$cosh|$ceil|$tanh|$sin|$asinh|$cos|$acosh|$tan|$atanh|$fatal|$error|$warning|$info|$fatal|$error|$warning|$info|$asserton|$assertoff|$assertkill|$assertpasson|$assertpassoff|$assertfailon|$assertfailoff|$assertnonvacuouson|$assertvacuousoff|$onehot|$onehot0|$isunknown|$sampled|$rose|$fell|$stable|$changed|$past|$countones|$past_gclk|$rose_gclk|$fell_gclk|$stable_gclk|$changed_gclk|$future_gclk|$rising_gclk|$falling_gclk|$steady_gclk|$changing_gclk|$coverage_control|$coverage_get_max|$coverage_get|$coverage_merge|$coverage_save|$get_coverage|$set_coverage_db_name|$load_coverage_db|$random|$dist_chi_square|$dist_erlang|$dist_exponential|$dist_normal|$dist_poisson|$dist_t|$dist_uniform|$q_initialize|$q_add|$q_remove|$q_full|$q_exam|$async$and$array|$async$and$plane|$async$nand$array|$async$nand$plane|$async$or$array|$async$or$plane|$async$nor$array|$async$nor$plane|$sync$and$array|$sync$and$plane|$sync$nand$array|$sync$nand$plane|$sync$or$array|$sync$or$plane|$sync$nor$array|$sync$nor$plane|$system|$display|$write|$displayb|$writeb|$displayh|$writeh|$displayo|$writeo|$strobe|$monitor|$strobeb|$monitorb|$strobeh|$monitorh|$strobeo|$monitoro|$monitoroff|$monitoron|$fclose|$fopen|$fdisplay|$fwrite|$fdisplayb|$fwriteb|$fdisplayh|$fwriteh|$fdisplayo|$fwriteo|$fstrobe|$fmonitor|$fstrobeb|$fmonitorb|$fstrobeh|$fmonitorh|$fstrobeo|$fmonitoro|$swrite|$sformat|$swriteb|$sformatf|$swriteh|$fgetc|$swriteo|$ungetc|$fscanf|$fgets|$fread|$sscanf|$fseek|$rewind|$fflush|$ftell|$feof|$ferror|$readmemb|$readmemh|$writememb|$writememh|$test$plusargs|$value$plusargs|$dumpfile|$dumpvars|$dumpoff|$dumpon|$dumpall|$dumplimit|$dumpflush|$dumpports|$dumpportsoff|$dumpportson|$dumpportsall|$dumpportslimit|$dumpportsflush)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:parameter|localparam|specparam|input|output|inout|ref|byte|shortint|int|integer|longint|time|bit|logic|reg|supply0|supply1|tri|triand|trior|trireg|tri0|tri1|wire|uwire|wand|wor|signed|unsigned|shortreal|real|realtime|type|void|struct|union|tagged|const|var|automatic|static|packed|vectored|scalared|typedef|enum|string|chandle|event|null)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:strong0|strong1|pull0|pull1|weak0|weak1|highz0|highz1|small|medium|large)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:pullup|pulldown|cmos|rcmos|nmos|pmos|rnmos|rpmos|and|nand|or|nor|xor|xnor|not|buf|tran|rtran|tranif0|tranif1|rtranif0|rtranif1|bufif0|bufif1|notif0|notif1)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:randomize|mailbox|semaphore|put|get|try_put|try_get|peek|try_peek|process|state|self|status|kill|await|suspend|resume|size|delete|insert|num|first|last|next|prev|pop_front|pop_back|push_front|push_back|find|find_index|find_first|find_last|find_last_index|min|max|unique_index|reverse|sort|rsort|shuffle|sum|product|List|List_Iterator|neq|eq|data|empty|front|back|start|finish|insert_range|erase|erase_range|set|swap|clear|purge)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[\d_]*'d[\d_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'o[0-7xXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'h[\da-fA-FxXzZ_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[\d_]*'b[01_zZxX]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[^\w$]\.[a-zA-Z]+[\w$]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^[!%&()+,\-<=+/:;>?[\]\^{|}~@]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '`' && this.hl('`', 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^\`[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\$[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#[\d_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._externContext = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:virtual|pure|extern|forkjoin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:DPI|DPI-C|import|export|context)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:new|extends|this|super|protected|local|rand|randc|bind)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:constraint|solve|before|dist|inside|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:function)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:task)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'undefined')) return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._typedefContext = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:class)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:parameter|localparam|specparam|input|output|inout|ref|byte|shortint|int|integer|longint|time|bit|logic|reg|supply0|supply1|tri|triand|trior|trireg|tri0|tri1|wire|uwire|wand|wor|signed|unsigned|shortreal|real|realtime|type|void|struct|union|tagged|const|var|automatic|static|packed|vectored|scalared|typedef|enum|string|chandle|event|null)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:modport)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:sync_accept_on|reject_on|accept_on|sync_reject_on|restrict|let|until|until_with|unique0|eventually|s_until|s_always|s_eventually|s_nexttime|s_until_with|global|untyped|implies|weak|strong|nexttime)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'undefined')) return;
        this.hl(this.str[0], 'undefined');
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
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
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
HL.prototype._blockName = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^ ]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
