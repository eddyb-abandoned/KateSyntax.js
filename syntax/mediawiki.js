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
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^([=]{2,2}[^=]+[=]{2,2}|[=]{3,3}[^=]+[=]{3,3}|[=]{4,4}[^=]+[=]{4,4}|[=]{5,5}[^=]+[=]{5,5})/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[~]{3,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[*#;:\s]*[*#:]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[[](?![[])/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._uRL();continue;}
        if((m = /^(http:|ftp:|mailto:)[\S]*($|[\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[']{2,}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.str[1] == '|' && this.hl('{|', 'dsDecVal')) {this._table();continue;}
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsDecVal')) {this._template();continue;}
        if(this.str[0] == '[' && this.str[1] == '[' && this.hl('[[', 'dsDecVal')) {this._wikiLink();continue;}
        if((m = /^&.*?;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^<nowiki>/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._noWiki();continue;}
        if((m = /^<pre>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pre();continue;}
        if((m = /^[<][^>]+[>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[\s]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._unformatted();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._table = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^([=]{2,2}[^=]+[=]{2,2}|[=]{3,3}[^=]+[=]{3,3}|[=]{4,4}[^=]+[=]{4,4}|[=]{5,5}[^=]+[=]{5,5})/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[*#;:\s]*[*#:]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[[](?![[])/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._uRL();continue;}
        if((m = /^(http:|ftp:|mailto:)[\S]*($|[\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[']{2,}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '|' && this.str[1] == '}' && this.hl('|}', 'dsDecVal')) return;
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsDecVal')) {this._template();continue;}
        if(this.str[0] == '[' && this.str[1] == '[' && this.hl('[[', 'dsDecVal')) {this._wikiLink();continue;}
        if((m = /^&.*?;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^<nowiki>/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._noWiki();continue;}
        if((m = /^<pre>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pre();continue;}
        if((m = /^[<][^>]+[>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[\s]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._unformatted();continue;}
        if((m = /^[~]{3,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[-]{4,}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '!' && this.hl('!', 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._uRL = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsDecVal')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._wikiLink = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsDecVal')) {this._wikiLinkDescription();continue;}
        if(this.str[0] == ']' && this.str[1] == ']' && this.hl(']]', 'dsDecVal')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._wikiLinkDescription = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.str[1] == ']') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._link = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsDecVal')) return;
        if((m = /^['[\]]/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._error();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._error = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._template = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsDecVal')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._noWiki = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<!--[^-]*-->/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<\/nowiki>/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if((m = /^[<][^>]+[>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^<pre>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pre();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._unformatted = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._pre = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<\/pre>/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
