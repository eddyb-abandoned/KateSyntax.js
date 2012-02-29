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
        if((m = /^\/\*\*\//.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._javadocFSar();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findJavadoc = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\/\*\*\//.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._javadocFSar();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._javadocFSar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(!|\?)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._javadocar();continue;}
        if((m = /^(\.\s*$)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._javadocar();continue;}
        if((m = /^(\.\s)(?![\da-z])/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._javadocar();continue;}
        if((m = /^\**\s*(?=@(author|deprecated|exception|param|return|see|serial|serialData|serialField|since|throws|version)(\s|$))/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._javadocar();continue;}
        if((m = /^\{@code /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@code    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@docRoot\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{@inheritDoc\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{@link /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@link    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@linkplain /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@linkplain    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@literal /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@literal    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@value\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{@value /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@value    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._javadocar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) {this._#pop#pop();continue;}
        if((m = /^\*+(?!/)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^@author /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@deprecated /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@exception /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._javadocParam();continue;}
        if((m = /^@param /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._javadocParam();continue;}
        if((m = /^@return /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@see /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._seeTag();continue;}
        if((m = /^@serial /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@serialData /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@serialField /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@since /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@throws /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._javadocParam();continue;}
        if((m = /^@version /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@author    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@deprecated    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@exception    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._javadocParam();continue;}
        if((m = /^@param    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._javadocParam();continue;}
        if((m = /^@return    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@see    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._seeTag();continue;}
        if((m = /^@serial    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@serialData    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@serialField    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@since    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^@throws    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._javadocParam();continue;}
        if((m = /^@version    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{@code /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@code    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@docRoot\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{@inheritDoc\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{@link /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@link    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@linkplain /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@linkplain    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@literal /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@literal    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._literalTagar();continue;}
        if((m = /^\{@value\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\{@value /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        if((m = /^\{@value    /.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._inlineTagar();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._javadocParam = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\S*(?=\*/)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\S*(\s|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._inlineTagar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._literalTagar = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._seeTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
