var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
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
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:Event|Site|Date|Round|White|Black|Result|ECO|Annotator|PlyCount|EventDate|EventCountry|SourceDate|WhiteTitle|BlackTitle|FM|IM|GM|WhiteElo|BlackElo|WhiteNA|BlackNA|WhiteType|BlackType|program|human|TimeControl|FEN|Termination|abandoned|adjudication|death|emergency|normal|rules|infraction|time|forfeit|unterminated|Mode|OTB|PM|EM|ICS|TC)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[KQBNRPODCTA]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsComment')) {this._comment_p();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsComment')) {this._comment_c();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^(\$\d*|1\-0|0\-1|1/2\-1/2|\*|#|\+|\?|!|=|x|\+\-|\-\+)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*(\.|\.\.\.)( |$)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment_p = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsComment')) {this._comment_p();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsComment')) {this._comment_c();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment_c = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsComment')) {this._comment_p();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsComment')) {this._comment_c();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
