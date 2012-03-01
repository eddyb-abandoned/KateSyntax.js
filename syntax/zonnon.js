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
        if((m = /^(?:accept|activity|array|as|await|begin|by|case|const|definition|div|do|else|elsif|end|exception|exit|for|if|implementation|implements|import|in|is|loop|mod|module|new|nil|object|of|on|operator|or|procedure|protocol|record|refines|repeat|return|self|termination|then|to|type|until|var|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:boolean|cardinal|char|fixed|integer|real|set|string)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:barrier|immutable|locked|private|protected|public|ref|sealed|shared|value)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:abs|assert|cap|copy|copyvalue|dec|excl|false|halt|inc|len|low|max|min|odd|pred|read|readln|reason|size|succ|true|write|writeln)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string1();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '(' && this.str[1] == '*' && this.hl('(*', 'dsComment')) {this._comment1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == ')' && this.hl('*)', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
