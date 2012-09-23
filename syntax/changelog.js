KateSyntax.langs.changelog.syntax = {
    default: 'changelog_normal',
    changelog_normal: function changelog_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.hl('*', 'dsDecVal')) {if(m = this.changelog_entry())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\d\d\d\d\s*-\s*\d\d\s*-\s*\d\d\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.changelog_line())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    changelog_line: function changelog_line(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(\w\s*)+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^<.*>\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    changelog_entry: function changelog_entry(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^.*:/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
