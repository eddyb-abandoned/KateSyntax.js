var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText();
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
HL.prototype._normalText = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comments();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^(?:default|datatypes|div|empty|external|grammar|include|inherit|list|mixed|namespace|notAllowed|parent|start|token)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:attribute|element)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._nodeNames();continue;}
        if((m = /^(?:string|text|xsd:anyURI|xsd:base64Binary|xsd:boolean|xsd:byte|xsd:date|xsd:dateTime|xsd:decimal|xsd:double|xsd:duration|xsd:ENTITIES|xsd:ENTITY|xsd:float|xsd:gDay|xsd:gMonth|xsd:gMonthDay|xsd:gYear|xsd:gYearMonth|xsd:hexBinary|xsd:ID|xsd:IDREF|xsd:IDREFS|xsd:int|xsd:integer|xsd:language|xsd:long|xsd:Name|xsd:NCName|xsd:negativeInteger|xsd:NMTOKEN|xsd:NMTOKENS|xsd:nonNegativeInteger|xsd:nonPositiveInteger|xsd:normalizedString|xsd:NOTATION|xsd:positiveInteger|xsd:QName|xsd:short|xsd:string|xsd:time|xsd:token|xsd:unsignedByte|xsd:unsignedInt|xsd:unsignedLong|xsd:unsignedShort)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(/^[\w\.-]+[\s]+=/.exec(this.str)) {this._definitions();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comments = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._nodeNames = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{') return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._definitions = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '=') {this._#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsFunction')) return;
        this.hl(this.str[0], 'dsFunction');
    }
};
