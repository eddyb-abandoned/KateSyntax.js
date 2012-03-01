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
        if((m = /^\{%\s*end[a-z]+\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
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
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^</pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctypeMarkupdecl();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._inBlock = function() {
    var m;
    while(this.pos < this.len) {
        if(/^\{%\s*end[a-z]+\s*%\}/.exec(this.str)) return;
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
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
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^</pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctypeMarkupdecl();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findTemplate = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._templateComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{%\s*endcomment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._templateVar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsFunction')) return;
        if(this.str[0] == '|' && this.hl('|', 'dsOthers')) {this._templateFilter();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsError')) continue;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._templateFilter = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsFunction')) {this._#pop#pop();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsError')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._templateTag = function() {
    var m;
    while(this.pos < this.len) {
        if(/^(?:for|block|if|ifequal|ifnotequal|ifchanged|blocktrans|spaceless|autoescape)\b/.exec(this.str)) {this._foundBlockTag();continue;}
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._inTemplateTag();continue;}
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._foundBlockTag = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(&name;)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._inBlockTag();continue;}
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._inBlockTag = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{%\s*end%1\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._#pop#pop#pop();continue;}
        if(/^\{%\s*end[a-z]+\s*%\}/.exec(this.str)) {this._nonMatchingTag();continue;}
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsFunction')) {this._inBlock();continue;}
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsFunction')) {this._#pop#pop();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
        if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsError')) continue;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._nonMatchingTag = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:endfor|endblock|endif|endifequal|endifnotequal|endifchanged|endblocktrans|endspaceless|endautoescape)\b/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._inTemplateTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsFunction')) {this._#pop#pop();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
        if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsError')) continue;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._singleAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singleQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
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
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elOpen();continue;}
        if((m = /^</pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
        if((m = /^</table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose();continue;}
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
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
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
        if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return;
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
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._doctypeMarkupdeclSQ();continue;}
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
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._elOpen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        if((m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
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
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._cSSContent();continue;}
        if((m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cSSContent = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^</style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose2();continue;}
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._jS = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._jSContent();continue;}
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
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
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._jSCommentClose = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^</script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elClose3();continue;}
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._valueDQ();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._valueSQ();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._valueNQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        if((m = /^/(?!>)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[^/><"'\s]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._valueDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._#pop#pop();continue;}
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._valueSQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._#pop#pop();continue;}
        if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._templateComment();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {this._templateVar();continue;}
        if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {this._templateTag();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
