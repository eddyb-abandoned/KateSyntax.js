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
        if((m = /^Depends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Recommends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Suggests:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Conflicts:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Provides:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Replaces:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Enhances:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Pre-Depends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Build-Depends:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Build-Depends-Indep:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Build-Conflicts:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Build-Conflicts-Indep:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^Breaks:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._dependencyField();continue;}
        if((m = /^[^ ]*:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._field();continue;}
        if(this.str[0] == ' ' && this.hl(' ', 'dsDataType')) {this._field();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._field = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<.*@.*>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsKeyword')) {this._variable();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._variable = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._dependencyField = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<.*@.*>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsKeyword')) {this._variable();continue;}
        if((m = /^[,\|]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._constrain();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._constrain();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._constrain = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '$' && this.str[1] == '{' && this.hl('${', 'dsKeyword')) {this._variable();continue;}
        if((m = /^[!<=>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) return;
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
