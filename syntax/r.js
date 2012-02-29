var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._level0();
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
HL.prototype._level0 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._backquotedsymbol();continue;}
        if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._parenthesis();continue;}
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._headline();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^(\+|\-|\*{1,2}|/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._ctx0();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsError')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctx0 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._backquotedsymbol();continue;}
        if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._parenthesis();continue;}
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._headline();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^(\+|\-|\*{1,2}|/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._ctx0();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if(this.str[0] == ')' && this.hl(')', 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._parenthesis = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^[a-zA-Z_\.][0-9a-zA-Z_\.]*[\s]*=(?=([^=]|$))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._backquotedsymbol();continue;}
        if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._parenthesis();continue;}
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._headline();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^(\+|\-|\*{1,2}|/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._ctx0();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsError')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._backquotedsymbol = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '`' && this.hl('`', 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._operator_rhs = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._headline();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == ' ' && this.hl(' ', 'dsString')) continue;
        if((m = /^(\*|/|<|>|\!=|=|\||&|:|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._headline = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
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
HL.prototype._commonRules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._backquotedsymbol();continue;}
        if((m = /^(?:for|in|next|break|while|repeat|if|else|switch|function)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:TRUE|FALSE|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_|Inf|NaN)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z_]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\.[a-zA-Z_\.]+[a-zA-Z_\.0-9]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._parenthesis();continue;}
        if((m = /^##/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._headline();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^[<]{1,2}\-/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^\-[>]{1,2}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^=(?!=)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^(\+|\-|\*{1,2}|/|<=?|>=?|={1,2}|\!=?|\|{1,2}|&{1,2}|:{1,3}|\^|@|\$|~)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if((m = /^%[^%]*%/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._operator_rhs();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._ctx0();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
