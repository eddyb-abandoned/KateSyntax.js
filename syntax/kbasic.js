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
        if((m = /^(?:For|Next|Do|Loop|While|Wend|Until|If|Else|End|Function|Goto|Sub|Implements|In|Sub|Private|Public|Global|As|Dim|Set|Let|Get|To|Property|True|False|Or|Not|Xor|And|Then|Exit|Put|Open|Close|Seek|Print|Input|Output|Repeat|Load|Unload|Declare|Option|Explicit)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Integer|Long|Byte|Boolean|Variant|Single|Double|Currency|String|Object|Control)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == 'quot;' && this.hl('quot;', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
