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
        if(this.str[0] == '.' && this.hl('.', 'dsFunction')) {this._detectDirective();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectDirective = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:SH|SS|TH)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._directive();continue;}
        if((m = /^(?:HP|IP|LP|P|PD|PP|RE|RS|TP)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._directive();continue;}
        if((m = /^(?:B|BI|BR|I|IB|IR|RB|RI|SM|SB)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._directive();continue;}
        if((m = /^(?:DT)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._directive();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsFunction')) return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._directive = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
