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
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?:\})\b/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^actions/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._actionDefinition();continue;}
        if((m = /^rule/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ruleDefinition();continue;}
        if((m = /^for/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forStatement();continue;}
        if((m = /^if/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ifStatement();continue;}
        if((m = /^while/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ifStatement();continue;}
        if((m = /^include/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^on/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._onPreStment();continue;}
        if((m = /^return/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^case/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._caseCond();continue;}
        if((m = /^(?:local)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varAssign();continue;}
        if((m = /^(?:actions|break|continue|for|in|if|else|include|local|on|return|rule|switch|case|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\{)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._block();continue;}
        if(/^[^\t ]+[\t ]*[\+\?]?=/.exec(this.str)) {this._varAssign();continue;}
        if(/^[^\t ]+[\t ]+on/.exec(this.str)) {this._varAssign();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:;)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\()\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^([^\t ][^\t ]+|[^\{\}\t ])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._rule();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._block = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?:\})\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^actions/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._actionDefinition();continue;}
        if((m = /^rule/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ruleDefinition();continue;}
        if((m = /^for/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forStatement();continue;}
        if((m = /^if/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ifStatement();continue;}
        if((m = /^while/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ifStatement();continue;}
        if((m = /^include/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^on/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._onPreStment();continue;}
        if((m = /^return/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^case/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._caseCond();continue;}
        if((m = /^(?:local)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varAssign();continue;}
        if((m = /^(?:actions|break|continue|for|in|if|else|include|local|on|return|rule|switch|case|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\{)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._block();continue;}
        if(/^[^\t ]+[\t ]*[\+\?]?=/.exec(this.str)) {this._varAssign();continue;}
        if(/^[^\t ]+[\t ]+on/.exec(this.str)) {this._varAssign();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:;)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\()\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^([^\t ][^\t ]+|[^\{\}\t ])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._rule();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._statement = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^actions/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._actionDefinition();continue;}
        if((m = /^rule/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ruleDefinition();continue;}
        if((m = /^for/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._forStatement();continue;}
        if((m = /^if/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ifStatement();continue;}
        if((m = /^while/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._ifStatement();continue;}
        if((m = /^include/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^on/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._onPreStment();continue;}
        if((m = /^return/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^case/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._caseCond();continue;}
        if((m = /^(?:local)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._varAssign();continue;}
        if((m = /^(?:actions|break|continue|for|in|if|else|include|local|on|return|rule|switch|case|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\{)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._block();continue;}
        if(/^[^\t ]+[\t ]*[\+\?]?=/.exec(this.str)) {this._varAssign();continue;}
        if(/^[^\t ]+[\t ]+on/.exec(this.str)) {this._varAssign();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:;)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\()\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^([^\t ][^\t ]+|[^\{\}\t ])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._rule();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rule = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:;)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._caseCond = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._onPreStment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(/^./.exec(this.str)) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._varAssign = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if(/^[^\t ]+[\t ]*[\+\?]?=/.exec(this.str)) {this._assigment();continue;}
        if(/^[^\t ]+[\t ]+on/.exec(this.str)) {this._assigment();continue;}
        if(/^[\+\?]?=/.exec(this.str)) {this._assigment();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^(?:;)\b/.exec(this.str)) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._assigment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^on/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._assigment2();continue;}
        if((m = /^\+=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._assigment2();continue;}
        if((m = /^?=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._assigment2();continue;}
        if(/^(?:;)\b/.exec(this.str)) {this._#pop#pop();continue;}
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._assigment2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?:;)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._subStatement = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^on/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._onPreStment();continue;}
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._subRule();continue;}
        if((m = /^(?:])\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._subRule = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:])\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._actionDefinition = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?:bind)\b/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(?:existing|ignore|piecemeal|quietly|together|updated)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._actionBody();continue;}
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._actionDefinitionFull();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._actionDefinitionFull = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^\{/.exec(this.str)) return;
        if((m = /^(?:bind)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._actionDefinitionBind();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._actionDefinitionBind = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if(/^\{/.exec(this.str)) return;
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._actionBody = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^\}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ruleDefinition = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(/^(?:\{)\b/.exec(this.str)) return;
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._varnameList();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ruleDefinitionFull = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^(?::)\b/.exec(this.str)) {this._varnameList();continue;}
        if(/^(?:\{)\b/.exec(this.str)) return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._varnameList = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^(?::)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._varnameList();continue;}
        if(/^(?:\{)\b/.exec(this.str)) return;
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._forStatement = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^in/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._forList();continue;}
        if((m = /^[^\t ]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._forList = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if(/^(?:\{)\b/.exec(this.str)) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ifStatement = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        if((m = /^=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^!=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^</.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^>/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^in/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^!/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&&/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^||/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\()\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:\))\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^(?:\{)\b/.exec(this.str)) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._preprocess = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\("|\w)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentTitle();continue;}
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if((m = /^(?:\[)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._subStatement();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._variable = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^\)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^\[/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variableRange();continue;}
        if((m = /^:/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variableAttribute();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._variableRange = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._variableAttribute = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if(/^\)/.exec(this.str)) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._error();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentTitle = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._variable();continue;}
        if((m = /^\\"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) {this._error();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._error = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsError');
    }
};
