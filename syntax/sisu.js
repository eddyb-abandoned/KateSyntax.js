KateSyntax.langs.sisu.syntax = {
    default: 'sisu_normalText',
    sisu_normalText: function sisu_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:class|const)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.sisu_string())return this.pop(), m-1;continue;}
            if((m = /^(0~\S+|@\S+)\s.+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#1c869b;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^:?[A-C1-6]~.+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#ff0000;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^~\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#086800;font-style:normal;font-weight:normal')) {if(m = this.sisu_footnote())return this.pop(), m-1;continue;}
            if((m = /^\^~/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#086800;font-style:normal;font-weight:normal')) {if(m = this.sisu_endnote())return this.pop(), m-1;continue;}
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            if((m = /^<br>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF0000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^\{.+?\}(http:\/\/\S+|image)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(\^|\s)http:\/\/\S+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^!_ .+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_boldline())return this.pop(), m-1;continue;}
            if((m = /^(_[12]|_\*|_[12]\*)\s/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) continue;
            if((m = /^~\^/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#086800;font-style:normal;font-weight:normal')) continue;
            if((m = /^%+\s.+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    sisu_string: function sisu_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    sisu_footnote: function sisu_footnote(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}~/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#086800;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#086800;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    sisu_bold: function sisu_bold(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}\*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold');
        }
        this.pop();
    },
    sisu_emphasis: function sisu_emphasis(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}!/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold');
        }
        this.pop();
    },
    sisu_italic: function sisu_italic(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}\//.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) return this.pop();
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal');
        }
        this.pop();
    },
    sisu_underscore: function sisu_underscore(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}_/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    sisu_superscript: function sisu_superscript(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}\^/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    sisu_subscript: function sisu_subscript(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\},/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    sisu_strike: function sisu_strike(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}-/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^\+\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_insert())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    sisu_insert: function sisu_insert(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}\+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^!\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_emphasis())return this.pop(), m-1;continue;}
            if((m = /^\*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold')) {if(m = this.sisu_bold())return this.pop(), m-1;continue;}
            if((m = /^\/\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:italic;font-weight:normal')) {if(m = this.sisu_italic())return this.pop(), m-1;continue;}
            if((m = /^_\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_underscore())return this.pop(), m-1;continue;}
            if((m = /^\^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_superscript())return this.pop(), m-1;continue;}
            if((m = /^,\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_subscript())return this.pop(), m-1;continue;}
            if((m = /^-\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal')) {if(m = this.sisu_strike())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    sisu_endnote: function sisu_endnote(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#086800;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    sisu_boldline: function sisu_boldline(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:normal;font-weight:bold');
        }
        this.pop();
    },
    sisu_indent: function sisu_indent(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#F00000;font-style:normal;font-weight:normal');
        }
        this.pop();
    }
};
