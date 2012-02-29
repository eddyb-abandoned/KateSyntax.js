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
        if((m = /^(?:include|define|else|endef|endif|ifdef|ifeq|ifndef|ifneq)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[_\w\d]*\s*(?=:=|=|\+=|\?=)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._value();continue;}
        if((m = /^[_\w\d-]*\s*:/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^^[.].*:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '${' && this.hl('${', 'dsChar')) {this._varFromNormal{();continue;}
        if(this.str[0] == '$(' && this.hl('$(', 'dsChar')) {this._varFromNormal(();continue;}
        if(this.str[0] == '\#' && this.hl('\#', 'dsFloat')) continue;
        if(this.str[0] == '\\' && this.hl('\\', 'dsFloat')) continue;
        if((m = /^[+*=%$():\;]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^[@\-]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._commands();continue;}
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '${' && this.hl('${', 'dsChar')) {this._varFromValue{();continue;}
        if(this.str[0] == '$(' && this.hl('$(', 'dsChar')) {this._varFromValue(();continue;}
        if((m = /^@[-_\d\w]*@/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if(this.str[0] == ';' && this.hl(';', 'dsChar')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._varFromValue( = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsChar')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._varFromValue{ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsChar')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._varFromNormal( = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:call|subst|patsubst|strip|findstring|filter|filter-out|sort|word|wordlist|words|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|if|or|and|foreach|value|eval|origin|flavor|shell|error|warning|info)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionCall(();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsChar')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._varFromNormal{ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:call|subst|patsubst|strip|findstring|filter|filter-out|sort|word|wordlist|words|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|if|or|and|foreach|value|eval|origin|flavor|shell|error|warning|info)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._functionCall{();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsComment')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._functionCall( = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '${' && this.hl('${', 'dsChar')) {this._varFromNormal{();continue;}
        if(this.str[0] == '$(' && this.hl('$(', 'dsChar')) {this._varFromNormal(();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsChar')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._functionCall{ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '${' && this.hl('${', 'dsChar')) {this._varFromNormal{();continue;}
        if(this.str[0] == '$(' && this.hl('$(', 'dsChar')) {this._varFromNormal(();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsChar')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commands = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '${' && this.hl('${', 'dsChar')) {this._varFromNormal{();continue;}
        if(this.str[0] == '$(' && this.hl('$(', 'dsChar')) {this._varFromNormal(();continue;}
        if((m = /^[_\w-]*\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
