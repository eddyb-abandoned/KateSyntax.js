KateSyntax.langs.debianchangelog.syntax = {
    default: 'debianchangelog_iNIT',
    debianchangelog_iNIT: function debianchangelog_iNIT(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^[^ ]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsKeyword')) {if(m = this.debianchangelog_head())return this.pop(), m-1;continue;}
            if((m = /^<.*@.*>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.col === 0 && (m = /^ \-\-/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^  \*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^closes:[\s]*((bug\s*)?#\s*\d+)(\s*, *(bug\s*)?#\s*\d+)*/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    debianchangelog_head: function debianchangelog_head(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.debianchangelog_version())return this.pop(), m-1;continue;}
            if((m = /^[,;=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:urgency)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:oldstable|oldstable-security|oldstable-proposed-updates|stable|stable-security|testing|testing-security|testing-proposed-updates|frozen|unstable|experimental|UNRELEASED|sarge-backports|sarge-volatile|etch-backports|etch-volatile|lenny-backports|lenny-backports-sloppy|lenny-volatile|squeeze-backports|squeeze-volatile|dapper|dapper-security|dapper-proposed|dapper-updates|dapper-backports|dapper-commercial|edgy|edgy-security|edgy-proposed|edgy-updates|edgy-backports|edgy-commercial|feisty|feisty-security|feisty-proposed|feisty-updates|feisty-backports|feisty-commercial|gutsy|gutsy-security|gutsy-proposed|gutsy-updates|gutsy-backports|gutsy-partner|hardy|hardy-security|hardy-proposed|hardy-updates|hardy-backports|hardy-partner|intrepid|intrepid-security|intrepid-proposed|intrepid-updates|intrepid-backports|intrepid-partner|jaunty|jaunty-security|jaunty-proposed|jaunty-updates|jaunty-backports|jaunty-partner|karmic|karmic-security|karmic-proposed|karmic-updates|karmic-backports|lucid|lucid-security|lucid-proposed|lucid-updates|lucid-backports|maverick|maverick-security|maverick-proposed|maverick-updates|maverick-backports|natty|natty-security|natty-proposed|natty-updates|natty-backports|oneiric|oneiric-security|oneiric-proposed|oneiric-updates|oneiric-backports|precise|precise-security|precise-proposed|precise-updates|precise-backports)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:low|medium|high|emergency|bug|critical)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    debianchangelog_version: function debianchangelog_version(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    }
};
