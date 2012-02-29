var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._text();
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
HL.prototype._text = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsOthers')) {this._normal();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsOthers')) {this._normal();continue;}
        if((m = /^\\begin\{code\}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._normals();continue;}
        if((m = /^\\begin\{spec\}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._normals();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{-[^#]/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comments'();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'undefined')) return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._normals = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\end\{code\}/.exec(this.str)) && this.hl(m[0], 'undefined')) return;
        if((m = /^\\end\{spec\}/.exec(this.str)) && this.hl(m[0], 'undefined')) return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._comments' = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-}' && this.hl('-}', 'dsComment')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) {this._uncomments();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._uncomments = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsOthers')) {this._recomments();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsOthers')) {this._recomments();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._recomments = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-}' && this.hl('-}', 'dsComment')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
