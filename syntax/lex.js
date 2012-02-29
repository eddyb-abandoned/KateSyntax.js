var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._preStart();
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
HL.prototype._preStart = function() {
    var m;
    while(this.pos < this.len) {
        if(/^./.exec(this.str)) {this._definitions();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._definitions = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._indentedC();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsBaseN')) {this._lexCBloc();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsBaseN')) {this._rules();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsKeyword')) {this._percentCommand();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        if((m = /^[A-Za-z_]\w*\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._definitionRegExpr();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rules = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._indentedC();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsBaseN')) {this._lexCBloc();continue;}
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsBaseN')) {this._userCode();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._userCode = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._percentCommand = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._definitionRegExpr = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._regExpr (();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._regExpr [();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._regExpr {();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._regExprQ();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^.*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ruleRegExpr = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._startConditionsScope();continue;}
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._regExpr (();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._regExpr [();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._regExpr {();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._regExprQ();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._action();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._regExpr ( = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._regExpr (();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._regExpr [();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._regExpr {();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._regExprQ();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._regExpr [ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsString')) return;
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._regExpr { = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsString')) return;
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._regExprQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._regExprBase = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._regExpr (();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsString')) {this._regExpr [();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsString')) {this._regExpr {();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._regExprQ();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._startConditionsScope = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\}/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ruleRegExpr();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._action = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\|\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsBaseN')) {this._lexRuleCBloc();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectC = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^\s/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._indentedC();continue;}
        if(this.str[0] == '%' && this.str[1] == '{' && this.hl('%{', 'dsBaseN')) {this._lexCBloc();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._indentedC = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lexCBloc = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lexRuleCBloc = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._normalCBloc = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._normalCBloc();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._actionC = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._normalCBloc();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsAlert')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
