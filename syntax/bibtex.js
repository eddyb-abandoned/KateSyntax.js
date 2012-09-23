KateSyntax.langs.bibtex.syntax = {
    default: 'bibtex_normal',
    bibtex_normal: function bibtex_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:@article|@book|@booklet|@conference|@collection|@electronic|@inbook|@incollection|@inproceedings|@manual|@mastersthesis|@misc|@online|@patent|@periodical|@proceedings|@report|@phdthesis|@set|@thesis|@techreport|@unpublished|@www|@person|@company|@place)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000ff')) {if(m = this.bibtex_entry())return this.pop(), m-1;continue;}
            if((m = /^@string/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.bibtex_stringCommand())return this.pop(), m-1;continue;}
            if((m = /^@preamble/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.bibtex_preambleCommand())return this.pop(), m-1;continue;}
            if((m = /^@comment/i.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    bibtex_preambleCommand: function bibtex_preambleCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.bibtex_curlyBracket())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    bibtex_stringCommand: function bibtex_stringCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.bibtex_curlyBracket())return this.pop(), m-1;continue;}
            if((m = /^&stringVariable;/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.bibtex_curlyBracket())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    bibtex_entry: function bibtex_entry(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if((m = /^&refKeyFormat;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {if(m = this.bibtex_field())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bibtex_field: function bibtex_field(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&fieldFormat;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.bibtex_curlyBracket())return this.pop(), m-1;continue;}
            if(this.str[0] == '}') return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.bibtex_quotedText())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsNormal')) continue;
            if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&stringVariable;/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bibtex_curlyBracket: function bibtex_curlyBracket(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.bibtex_curlyBracket())return this.pop(), m-1;continue;}
            if((m = /^&latexCmd;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^}(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 1;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    bibtex_quotedText: function bibtex_quotedText(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) return this.pop();
            if((m = /^&latexCmd;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
