KateSyntax.langs.mandoc.syntax = {
    default: 'mandoc_normal',
    mandoc_normal: function mandoc_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == '.' && this.hl('.', 'dsFunction')) {if(m = this.mandoc_detectDirective())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mandoc_detectDirective: function mandoc_detectDirective(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:SH|SS|TH)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mandoc_directive())return this.pop(), m-1;continue;}
            if((m = /^(?:HP|IP|LP|P|PD|PP|RE|RS|TP)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.mandoc_directive())return this.pop(), m-1;continue;}
            if((m = /^(?:B|BI|BR|I|IB|IR|RB|RI|SM|SB)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mandoc_directive())return this.pop(), m-1;continue;}
            if((m = /^(?:DT)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.mandoc_directive())return this.pop(), m-1;continue;}
            if((m = /^(?:br|sp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.roff_directive())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*ds\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_dsDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*de\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_deDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*da(?=\s+[A-Za-z]+)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_daDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*di(?=\s+[A-Za-z]+)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_diDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*[A-Za-z]+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_directive())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    mandoc_directive: function mandoc_directive(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_normal: function roff_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == '.' && this.hl('.', 'dsFunction')) {if(m = this.roff_detectDirective())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_detectComments: function roff_detectComments(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_detectOthers: function roff_detectOthers(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_detectEscape: function roff_detectEscape(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\(\*|n[+-]?)&roffid;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^\\[fF]&roffid;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^\\f([0-9]|\([0-9][0-9]|\[[0-9]+\])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^\\s(\[([1-3][0-9]|[04-9])\]|[04-9]|[+-][0-9]|([+-]?\(|\([+-])[0-9][0-9])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) return this.pop();
            if((m = /^\\(\$[0-9*@]|[.:% |^{}_!?@)/,&:~0acdeEprtu])/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if((m = /^\\[AbBDowXZ]&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.roff_argument())return this.pop(), m-1;continue;}
            if((m = /^\\[gkmMVYz]&roffid;/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if((m = /^\\O([0-4]|\[5[lrci][^\]]\])/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if((m = /^\\[hHSvx]&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.roff_measurement())return this.pop(), m-1;continue;}
            if((m = /^\\[lL]&argsep1;\|?/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.roff_measurement())return this.pop(), m-1;continue;}
            if((m = /^\\R&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.roff_argument())return this.pop(), m-1;continue;}
            if((m = /^\\C&argsep1;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.roff_glyphArgument())return this.pop(), m-1;continue;}
            if((m = /^\\N&argsep2;[0-9]+\1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^\\&roffid;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if(this.str[0] == '\\' && this.hl('\\', 'dsError')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    roff_detectDirective: function roff_detectDirective(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:br|sp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.roff_directive())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*ds\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_dsDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*de\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_deDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*da(?=\s+[A-Za-z]+)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_daDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*di(?=\s+[A-Za-z]+)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_diDirective())return this.pop(), m-1;continue;}
            if(this.col === 1 && (m = /^\s*[A-Za-z]+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.roff_directive())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    roff_comment: function roff_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    roff_error: function roff_error(m) {
        this.push();
        while(this.pos < this.len) {
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    roff_directive: function roff_directive(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_string: function roff_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_literalSL: function roff_literalSL(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_literalIL: function roff_literalIL(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) return this.pop();
            if(this.str[0] == '\n') return this.pop(), this.roff_error();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_argument: function roff_argument(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop(), 1;
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.roff_error();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_glyphArgument: function roff_glyphArgument(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop(), this.roff_error();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    roff_measurement: function roff_measurement(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop(), this.roff_error();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    roff_deDirective: function roff_deDirective(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), this.roff_deBody();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_deBody: function roff_deBody(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsFunction')) return this.pop(), 1;
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == '.' && this.hl('.', 'dsFunction')) {if(m = this.roff_detectDirective())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_diDirective: function roff_diDirective(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), this.roff_diBody();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_diBody: function roff_diBody(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.\s*di\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop(), 1;
            if(this.str[0] == '\\' && this.str[1] == '!' && this.hl('\\!', 'dsChar')) {if(m = this.roff_literalSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) {if(m = this.roff_literalIL())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == '.' && this.hl('.', 'dsFunction')) {if(m = this.roff_detectDirective())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_daDirective: function roff_daDirective(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), this.roff_daBody();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_daBody: function roff_daBody(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.\s*da\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop(), 1;
            if(this.str[0] == '\\' && this.str[1] == '!' && this.hl('\\!', 'dsChar')) {if(m = this.roff_literalSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '?' && this.hl('\\?', 'dsChar')) {if(m = this.roff_literalIL())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == '.' && this.hl('.', 'dsFunction')) {if(m = this.roff_detectDirective())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    roff_dsDirective: function roff_dsDirective(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_dsString())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    roff_dsString: function roff_dsString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\.\s*\\"/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsComment')) {if(m = this.roff_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\') {if(m = this.roff_detectEscape())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.roff_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
