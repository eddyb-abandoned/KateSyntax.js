var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._iNIT();
    this.hl('');
    return this.main;
};
HL.prototype.hl = function hl(m,s) {
    this.pos += m.length;
    this.str = this.str.slice(m.length);
    if(this.style == s)
        this.hlText += m;
    else {
        if(this.hlText) {
            if(this.style == 'dsNormal')
                this.main.appendChild(document.createTextNode(this.hlText));
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(this.hlText));
                span.className = this.style;
                this.main.appendChild(span);
            }
        }
        this.style = s;
        this.hlText = m;
    }
    return true;
};
HL.prototype._iNIT = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^ ]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._head();continue;}
        if((m = /^<.*@.*>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^ \-\-/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^  \*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^closes:[\s]*((bug\s*)?#\s*\d+)(\s*, *(bug\s*)?#\s*\d+)*/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._head = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._version();continue;}
        if((m = /^[,;=]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:urgency)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:oldstable|oldstable-security|oldstable-proposed-updates|stable|stable-security|testing|testing-security|testing-proposed-updates|frozen|unstable|experimental|UNRELEASED|sarge-backports|sarge-volatile|etch-backports|etch-volatile|lenny-backports|lenny-backports-sloppy|lenny-volatile|squeeze-backports|squeeze-volatile|dapper|dapper-security|dapper-proposed|dapper-updates|dapper-backports|dapper-commercial|edgy|edgy-security|edgy-proposed|edgy-updates|edgy-backports|edgy-commercial|feisty|feisty-security|feisty-proposed|feisty-updates|feisty-backports|feisty-commercial|gutsy|gutsy-security|gutsy-proposed|gutsy-updates|gutsy-backports|gutsy-partner|hardy|hardy-security|hardy-proposed|hardy-updates|hardy-backports|hardy-partner|intrepid|intrepid-security|intrepid-proposed|intrepid-updates|intrepid-backports|intrepid-partner|jaunty|jaunty-security|jaunty-proposed|jaunty-updates|jaunty-backports|jaunty-partner|karmic|karmic-security|karmic-proposed|karmic-updates|karmic-backports|lucid|lucid-security|lucid-proposed|lucid-updates|lucid-backports|maverick|maverick-security|maverick-proposed|maverick-updates|maverick-backports|natty|natty-security|natty-proposed|natty-updates|natty-backports|oneiric|oneiric-security|oneiric-proposed|oneiric-updates|oneiric-backports|precise|precise-security|precise-proposed|precise-updates|precise-backports)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:low|medium|high|emergency|bug|critical)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._version = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
