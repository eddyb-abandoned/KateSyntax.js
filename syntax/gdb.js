KateSyntax.langs.gdb.syntax = {
    default: 'gdb_apache',
    gdb_apache: function gdb_apache(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsNormal')) {if(m = this.gdb_stackframe())return this.pop(), m-1;continue;}
            if((m = /^\[KCrash Handler]/.exec(this.str)) && this.hl(m[0], 'dsError;fontWeight:bold;textDecoration:none')) continue;
            if((m = /^Thread/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.gdb_thread())return this.pop(), m-1;continue;}
            if((m = /^\[Current thread/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.gdb_thread())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdb_oneliners: function gdb_oneliners(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\[KCrash Handler]/.exec(this.str)) && this.hl(m[0], 'dsError;fontWeight:bold;textDecoration:none')) continue;
            if((m = /^Thread/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.gdb_thread())return this.pop(), m-1;continue;}
            if((m = /^\[Current thread/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.gdb_thread())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdb_stackframe: function gdb_stackframe(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^((?:[^ ]|<.+>)+::)?([^ :]+)\s*\(/.exec(this.str)) {if(m = this.gdb_identifier())return this.pop(), m-1;continue;}
            if((m = /^at/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.gdb_file())return this.pop(), m-1;continue;}
            if((m = /^from/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.gdb_file())return this.pop(), m-1;continue;}
            if((m = /^\[KCrash Handler]/.exec(this.str)) && this.hl(m[0], 'dsError;fontWeight:bold;textDecoration:none')) continue;
            if((m = /^Thread/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.gdb_thread())return this.pop(), m-1;continue;}
            if((m = /^\[Current thread/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.gdb_thread())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdb_identifier: function gdb_identifier(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^%2/.exec(this.str)) && this.hl(m[0], 'dsFunction;fontWeight:bold')) continue;
            if((m = /^\b0x0\b/.exec(this.str)) && this.hl(m[0], 'dsError;fontWeight:bold;textDecoration:none')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdb_file: function gdb_file(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsNormal')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    gdb_thread: function gdb_thread(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    }
};
