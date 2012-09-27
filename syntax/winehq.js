KateSyntax.langs.winehq.syntax = {
    default: 'winehq_normal',
    winehq_normal: function winehq_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^WINE REGISTRY Version.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00AAAA;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^#\s*<\s*wineconf\s*>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00AAAA;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^#\s*<\s*\/\s*wineconf\s*>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00AAAA;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\[.*\](?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\s*"\s*[a-zA-Z0-9_.:*]*\s*"/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsNormal')) {if(m = this.winehq_value())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    winehq_value: function winehq_value(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*".*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:bold')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
