KateSyntax.langs.velocity.syntax = {
    default: 'velocity_keyword',
    velocity_keyword: function velocity_keyword(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:#set|#foreach|#end|#if|#else|#elseif|#parse|#macro|#stop|#include)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[[a-zA-Z0-9_]*\])*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^\$\{[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[[a-zA-Z0-9_]*\])*\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^\$!\{[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[[a-zA-Z0-9_]*\])*\}./.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\.\-]*(\[([0-9]*|"[a-zA-Z_]*")|'[a-zA-Z_]*'|\])*(->[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*(\[[a-zA-Z0-9_]*\])*(\[([0-9]*|"[a-zA-Z_]*")|'[a-zA-Z_]*'|\])*)*\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#5555FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff\-]*(\[[a-zA-Z0-9_]*\])*\.[a-zA-Z0-9_\x7f-\xff\-]*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#8AC6FF;font-style:italic;font-weight:normal')) continue;
            if((m = /^[(),[\]]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.str[1] == '#' && this.hl('##', 'dsComment')) {if(m = this.velocity_singlelineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '*' && this.hl('#*', 'dsComment')) {if(m = this.velocity_multilinecomment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    velocity_singlelineComment: function velocity_singlelineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    velocity_multilinecomment: function velocity_multilinecomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '#' && this.hl('*#', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
