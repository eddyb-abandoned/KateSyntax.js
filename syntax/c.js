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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#\s*if\s+0\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._outscoped();continue;}
        if(this.str[0] == '#') {this._afterHash();continue;}
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^(?:break|case|continue|default|do|else|enum|extern|for|goto|if|inline|return|sizeof|struct|switch|typedef|union|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:auto|char|const|double|float|int|long|register|restrict|short|signed|static|unsigned|void|volatile|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|wchar_t|_Imaginary|_Complex|_Bool)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._regionMarker = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsRegionMarker')) return;
        this.hl(this.str[0], 'dsRegionMarker');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._afterHash = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#\s*if(?:def|ndef)?(?=\s+\S)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s*endif/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s*define.*((?=\\))/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._define();continue;}
        if((m = /^#\s*(?:el(?:se|if)|include(?:_next)?|define|undef|line|error|warning|pragma)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s+[0-9]+/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsError')) return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentarPreprocessor();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._define = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._commentarPreprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._outscoped = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*el(?:se|if)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._outscopedIntern = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
