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
        if((m = /^^---/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._header();continue;}
        if((m = /^^\.\.\.(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._eOD();continue;}
        if((m = /^^%/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._directive();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '-' && this.hl('-', 'dsKeyword')) {this._dash();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._list();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._hash();continue;}
        if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\??\s*[^"'#-][^:#]*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePre();continue;}
        if((m = /^\??\s*"[^"#]+"\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePre();continue;}
        if((m = /^\??\s*'[^'#]+'\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePre();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._stringx();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._dash = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^null(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(/^./.exec(this.str)) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._header = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._eOD = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._directive = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._attribute = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._attributeInline = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '}') {this._#pop#pop();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._attributePre = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^null(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._list();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._hash();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsNormal')) {this._attributeString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._attributeStringx();continue;}
        if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._attribute();continue;}
        if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._attribute();continue;}
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'undefined')) {this._attribute();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._attributePreInline = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^null/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._list();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._hash();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsNormal')) {this._attributeStringInline();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._attributeStringxInline();continue;}
        if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._attributeInline();continue;}
        if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._attributeInline();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) return;
        if(this.str[0] == '}') return;
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'undefined')) {this._attributeInline();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._list = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return;
        if((m = /^\??\s*[^"'#-][^:#]*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePre();continue;}
        if((m = /^\??\s*"[^"#]+"\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePre();continue;}
        if((m = /^\??\s*'[^'#]+'\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePre();continue;}
        if((m = /^null/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._list();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._hash();continue;}
        if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsNormal')) {this._string();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._stringx();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hash = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^\??\s*[^"'#-][^:#]*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePreInline();continue;}
        if((m = /^\??\s*"[^"#]+"\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePreInline();continue;}
        if((m = /^\??\s*'[^'#]+'\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._attributePreInline();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._attributeString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsNormal')) {this._attributeEnd();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._attributeStringx = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._attributeEnd();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._attributeStringInline = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsNormal')) {this._attributeEndInline();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._attributeStringxInline = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._attributeEndInline();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._attributeEnd = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._attributeEndInline = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '}') {this._#pop#pop#pop();continue;}
        if((m = /^,\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stringx = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) return;
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
