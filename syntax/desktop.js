KateSyntax.langs.desktop.syntax = {
    default: 'desktop_normal',
    desktop_normal: function desktop_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\[.*\](?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\[.*\]/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.desktop_value())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.desktop_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsNormal')) {if(m = this.desktop_value())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    desktop_value: function desktop_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    desktop_comment: function desktop_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
