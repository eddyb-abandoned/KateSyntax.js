var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._section();
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
HL.prototype._section = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\*I [a-zA-Z0-9]* /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\*\*\*\**E.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\*\*\*\**M.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\*\*\*\* BIBLIOTHECA.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\*M [a-zA-Z0-9]* /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\*X TYP .*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\*X DESC .*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\*X .*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
