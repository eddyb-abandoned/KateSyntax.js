KateSyntax.langs.mab.syntax = {
    default: 'mab_section',
    mab_section: function mab_section(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\*I [a-zA-Z0-9]* /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#330066;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\*\*\*\**E.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#993322;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\*\*\*\**M.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#339922;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\*\*\*\* BIBLIOTHECA.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#FF3322;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\*M [a-zA-Z0-9]* /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#003366;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\*X TYP .*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#3333FF;font-style:italic;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\*X DESC .*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#BB3333;font-style:italic;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^\*X .*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#999999;font-style:italic;font-weight:bold')) continue;
            this.hl(this.str[0], 'dsNormal;color:#FF0022;font-style:normal;font-weight:bold');
        }
        this.pop();
    }
};
