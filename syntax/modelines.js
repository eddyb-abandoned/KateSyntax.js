KateSyntax.langs.modelines.syntax = {
    default: 'modelines_normal',
    modelines_normal: function modelines_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:kate:)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.modelines_modeline())return this.pop(), m-1;continue;}
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    modelines_modeline: function modelines_modeline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:auto-brackets|auto-insert-doxygen|backspace-indents|block-selection|bom|byte-order-marker|folding-markers|icon-border|keep-extra-spaces|line-numbers|newline-at-eof|overwrite-mode|persistent-selection|remove-trailing-space|replace-tabs-save|replace-tabs|replace-trailing-space-save|space-indent|show-tabs|tab-indents|word-wrap|wrap-cursor)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.modelines_booleans())return this.pop(), m-1;continue;}
            if((m = /^(?:auto-center-lines|font-size|indent-width|smart-home|tab-width|undo-steps|word-wrap-column)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.modelines_integrals())return this.pop(), m-1;continue;}
            if((m = /^(?:background-color|bracket-highlight-color|current-line-color|default-dictionary|dynamic-word-wrap|eol|end-of-line|font|hl|icon-bar-color|indent-mode|scheme|selection-color|word-wrap-marker-color)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.modelines_strings())return this.pop(), m-1;continue;}
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    modelines_booleans: function modelines_booleans(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:on|true|1)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:off|false|0)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '&end;' && this.hl('&end;', 'dsFunction')) return this.pop();
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    modelines_integrals: function modelines_integrals(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '&end;' && this.hl('&end;', 'dsFunction')) return this.pop();
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    modelines_strings: function modelines_strings(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[^&end;&space;]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '&end;' && this.hl('&end;', 'dsFunction')) return this.pop();
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
