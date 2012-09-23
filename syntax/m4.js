KateSyntax.langs.m4.syntax = {
    default: 'm4_normalText',
    m4_normalText: function m4_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:__file__|__line__|__program__|builtin|changecom|changequote|changeword|debugfile|debugmode|decr|define|defn|divert|divnum|dnl|dumpdef|errprint|esyscmd|eval|format|ifdef|ifelse|include|incr|index|indir|len|m4exit|m4wrap|maketemp|mkstemp|patsubst|popdef|pushdef|regexp|shift|sinclude|substr|syscmd|sysval|traceon|traceoff|translit|undefine|undivert)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:m4___file__|m4___line__|m4___program__|m4_builtin|m4_changecom|m4_changequote|m4_changeword|m4_debugfile|m4_debugmode|m4_decr|m4_define|m4_defn|m4_divert|m4_divnum|m4_dnl|m4_dumpdef|m4_errprint|m4_esyscmd|m4_eval|m4_format|m4_ifdef|m4_ifelse|m4_include|m4_incr|m4_index|m4_indir|m4_len|m4_m4exit|m4_m4wrap|m4_maketemp|m4_mkstemp|m4_patsubst|m4_popdef|m4_pushdef|m4_regexp|m4_shift|m4_sinclude|m4_substr|m4_syscmd|m4_sysval|m4_traceon|m4_traceoff|m4_translit|m4_undefine|m4_undivert)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:__gnu__|__os2__|os2|__unix__|unix|__windows__|windows)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:m4___gnu__|m4___os2__|m4_os2|m4___unix__|m4_unix|m4___windows__|m4_windows)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[a-zA-Z_]\w+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\$([1-9]\d*|0|\#|\*|\@|\{([1-9]\d*|0)\})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^([1-9]\d*|0|0x[0-9abcdefABCDEF]+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsChar')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsChar')) {if(m = this.m4_inparenthesis())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsChar')) return this.pop();
            if((m = /^[+*/%\|=\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    m4_inparenthesis: function m4_inparenthesis(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:__file__|__line__|__program__|builtin|changecom|changequote|changeword|debugfile|debugmode|decr|define|defn|divert|divnum|dnl|dumpdef|errprint|esyscmd|eval|format|ifdef|ifelse|include|incr|index|indir|len|m4exit|m4wrap|maketemp|mkstemp|patsubst|popdef|pushdef|regexp|shift|sinclude|substr|syscmd|sysval|traceon|traceoff|translit|undefine|undivert)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:m4___file__|m4___line__|m4___program__|m4_builtin|m4_changecom|m4_changequote|m4_changeword|m4_debugfile|m4_debugmode|m4_decr|m4_define|m4_defn|m4_divert|m4_divnum|m4_dnl|m4_dumpdef|m4_errprint|m4_esyscmd|m4_eval|m4_format|m4_ifdef|m4_ifelse|m4_include|m4_incr|m4_index|m4_indir|m4_len|m4_m4exit|m4_m4wrap|m4_maketemp|m4_mkstemp|m4_patsubst|m4_popdef|m4_pushdef|m4_regexp|m4_shift|m4_sinclude|m4_substr|m4_syscmd|m4_sysval|m4_traceon|m4_traceoff|m4_translit|m4_undefine|m4_undivert)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:__gnu__|__os2__|os2|__unix__|unix|__windows__|windows)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:m4___gnu__|m4___os2__|m4_os2|m4___unix__|m4_unix|m4___windows__|m4_windows)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[a-zA-Z_]\w+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\$([1-9]\d*|0|\#|\*|\@|\{([1-9]\d*|0)\})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^([1-9]\d*|0|0x[0-9abcdefABCDEF]+)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsChar')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsChar')) {if(m = this.m4_inparenthesis())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsChar')) return this.pop();
            if((m = /^[+*/%\|=\!<>!^&~-]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
