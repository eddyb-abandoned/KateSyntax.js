KateSyntax.langs.ahdl.syntax = {
    default: 'ahdl_normal',
    ahdl_normal: function ahdl_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\bdefaults\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+defaults\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+if\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\btable\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s+case\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
            if((m = /^(?:assert|bidir|bits|buried|case|clique|connected_pins|constant|defaults|define|design|device|else|elsif|for|function|generate|gnd|help_id|in|include|input|is|machine|node|of|options|others|output|parameters|returns|states|subdesign|then|title|to|tri_state_node|variable|vcc|when|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:carry|cascade|dffe|dff|exp|global|jkffe|jkff|latch|lcell|mcell|memory|opendrn|soft|srffe|srff|tffe|tff|tri|wire|x)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:not|and|nand|or|nor|xor|xnor|mod|div|log2|used|ceil|floor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\b(\d+)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\bb"(0|1|x)+"/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b(o|q)"[0-7*]"/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b(h|x)"[0-9a-f]*"/i.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.ahdl_string())return this.pop(), m-1;continue;}
            if((m = /^--\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^--\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^--.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.ahdl_comment())return this.pop(), m-1;continue;}
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    ahdl_string: function ahdl_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ahdl_comment: function ahdl_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
