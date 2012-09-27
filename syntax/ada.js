KateSyntax.langs.ada.syntax = {
    default: 'ada_default',
    ada_default: function ada_default(m) {
        this.push();
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
            if((m = /^--  BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.ada_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^--  END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.ada_regionMarker())return this.pop(), m-1;continue;}
            if((m = /^(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|in|interface|is|limited|mod|new|not|null|of|or|others|out|overriding|package|pragma|private|procedure|protected|raise|range|rem|record|renames|requeue|return|reverse|separate|subtype|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:all_calls_remote|assert|assertion_policy|asynchronous|atomic|atomic_components|attach_handler|controlled|convention|detect_blocking|discard_names|elaborate|elaborate_all|elaborate_body|export|import|inline|inspection_point|interrupt_handler|interrupt_priority|linker_options|list|locking_policy|no_return|normalize_scalars|optimize|pack|page|partition_elaboration_policy|preelaborable_initialization|preelaborate|priority|priority_specific_dispatching|profile|pure|queuing_policy|relative_deadline|remote_call_interface|remote_types|restrictions|reviewable|shared_passive|storage_size|suppress|task_dispatching_policy|unchecked_union|unsuppress|volatile|volatile_components)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:boolean|char|float|integer|long_float|long_integer|long_long_float|long_long_integer|short_float|short_integer|string|wide_string|wide_char|wide_wide_char|wide_wide_string)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'.'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ada_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.ada_comment())return this.pop(), m-1;continue;}
            if((m = /^[:!%&()+,\-/.*<=>|]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ada_regionMarker: function ada_regionMarker(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    },
    ada_string: function ada_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ada_comment: function ada_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
