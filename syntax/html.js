var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._start();
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
HL.prototype._start = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._cDATA();continue;}
        if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctype();continue;}
        if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cSS();continue;}
        if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._jS();continue;}
        if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^</pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctypeMarkupdecl();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findHTML = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._cDATA();continue;}
        if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctype();continue;}
        if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._cSS();continue;}
        if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._jS();continue;}
        if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^</pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctypeMarkupdecl();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findEntityRefs = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findPEntityRefs = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findAttributes = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findDTDRules = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctypeMarkupdecl();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._cDATA = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^]]>/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^]]&gt;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._pI = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '?>' && this.hl('?>', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._doctype = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsDataType')) return;
        if(this.str[0] == '[' && this.hl('[', 'dsDataType')) {this._doctypeInternalSubset();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._doctypeInternalSubset = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsDataType')) return;
        if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctypeMarkupdecl();continue;}
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._doctypeMarkupdecl = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsDataType')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._doctypeMarkupdeclDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._doctypeMarkupdeclSQ();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._doctypeMarkupdeclDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._doctypeMarkupdeclSQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._elOpen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        if((m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._elClose = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._elClose2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._elClose3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop#pop#pop();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cSS = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._cSSContent();continue;}
        if((m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cSSContent = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^</style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._jS = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._jSContent();continue;}
        if((m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._jSContent = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^</script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose2();continue;}
        if((m = /^//(?=.*</script\b)/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._jSCommentClose();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._jSCommentClose = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^</script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose3();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._valueDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._valueSQ();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._valueNQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^/(?!>)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[^/><"'\s]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._valueDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._#pop#pop();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._valueSQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._#pop#pop();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
