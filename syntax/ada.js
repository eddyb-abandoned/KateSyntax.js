var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._default();
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
HL.prototype._default = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\brecord\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s+record\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcase\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s+case\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s+if\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bloop\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s+loop\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bselect\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s+select\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bbegin\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^--  BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^--  END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|in|interface|is|limited|mod|new|not|null|of|or|others|out|overriding|package|pragma|private|procedure|protected|raise|range|rem|record|renames|requeue|return|reverse|separate|subtype|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:all_calls_remote|assert|assertion_policy|asynchronous|atomic|atomic_components|attach_handler|controlled|convention|detect_blocking|discard_names|elaborate|elaborate_all|elaborate_body|export|import|inline|inspection_point|interrupt_handler|interrupt_priority|linker_options|list|locking_policy|no_return|normalize_scalars|optimize|pack|page|partition_elaboration_policy|preelaborable_initialization|preelaborate|priority|priority_specific_dispatching|profile|pure|queuing_policy|relative_deadline|remote_call_interface|remote_types|restrictions|reviewable|shared_passive|storage_size|suppress|task_dispatching_policy|unchecked_union|unsuppress|volatile|volatile_components)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:boolean|char|float|integer|long_float|long_integer|long_long_float|long_long_integer|short_float|short_integer|string|wide_string|wide_char|wide_wide_char|wide_wide_string)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'.'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {this._comment();continue;}
        if((m = /^[:!%&()+,\-/.*<=>|]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._regionMarker = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsRegionMarker');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
