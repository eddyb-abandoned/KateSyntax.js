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
        if((m = /^&inlinestart;\*\*[^\s].*\*\*&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&inlinestart;\*[^\s].*\*&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&inlinestart;``[^\s].*``&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^&inlinestart;\|[^\s].*\|&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^&inlinestart;_`[^\s].*`&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^&inlinestart;\[[^\s].*\]&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&inlinestart;\[[^\s].*\]_&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^&inlinestart;`[^\s].*(`|`_)&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\w+_(\s|$)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsFunction')) {this._field();continue;}
        if((m = /^^\s*\.\. \[(\d+|#|\*|#[&SimpleReferenceNameChars;]+)\]\s/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*\.\. \[[&SimpleReferenceNameChars;]+\]\s/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*(\.\. (__:|_[&SimpleReferenceNameChars; ]+:(\s|$))|__ )/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*\.\. [\w-_\.]+::(\s|$)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*\.\. \|[&SimpleReferenceNameChars; ]+\|\s+[&SimpleReferenceNameChars;]+::\s/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._field = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ':' && this.hl(':', 'dsFunction')) return;
        if(this.str[0] == '\\' && this.str[1] == ':' && this.hl('\\:', 'dsFunction')) continue;
        this.hl(this.str[0], 'dsFunction');
    }
};
