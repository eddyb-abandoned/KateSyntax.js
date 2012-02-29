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
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._cDATA();continue;}
        if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctype();continue;}
        if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._element();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findXML = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._cDATA();continue;}
        if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctype();continue;}
        if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._element();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
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
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
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
        if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
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
HL.prototype._element = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._elContent();continue;}
        if((m = /^^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._attribute();continue;}
        if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._attribute();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._elContent = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^</&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._elEnd();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._cDATA();continue;}
        if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctype();continue;}
        if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._element();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._elEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._attribute = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {this._value();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._valueDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._valueSQ();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._valueDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._#pop#pop#pop();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._valueSQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._#pop#pop#pop();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._cDATA = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^]]>/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^]]&gt;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._region_marker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._region_marker();continue;}
        if((m = /^(?:if|else|for|in|while|do|continue|break|with|try|catch|finally|switch|case|new|var|function|return|delete|true|false|void|throw|typeof|const|default)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:escape|isFinite|isNaN|Number|parseFloat|parseInt|reload|taint|unescape|untaint|write)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:Anchor|Applet|Area|Array|Boolean|Button|Checkbox|Date|document|window|Image|FileUpload|Form|Frame|Function|Hidden|Link|MimeType|Math|Max|Min|Layer|navigator|Object|Password|Plugin|Radio|RegExp|Reset|Screen|Select|String|Text|Textarea|this|Window)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abs|acos|asin|atan|atan2|ceil|cos|ctg|E|exp|floor|LN2|LN10|log|LOG2E|LOG10E|PI|pow|round|sin|sqrt|SQRT1_2|SQRT2|tan)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:onAbort|onBlur|onChange|onClick|onError|onFocus|onLoad|onMouseOut|onMouseOver|onReset|onSelect|onSubmit|onUnload)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:above|action|alinkColor|alert|anchor|anchors|appCodeName|applets|apply|appName|appVersion|argument|arguments|arity|availHeight|availWidth|back|background|below|bgColor|border|big|blink|blur|bold|border|call|caller|charAt|charCodeAt|checked|clearInterval|clearTimeout|click|clip|close|closed|colorDepth|complete|compile|constructor|confirm|cookie|current|cursor|data|defaultChecked|defaultSelected|defaultStatus|defaultValue|description|disableExternalCapture|domain|elements|embeds|enabledPlugin|enableExternalCapture|encoding|eval|exec|fgColor|filename|find|fixed|focus|fontcolor|fontsize|form|forms|formName|forward|frames|fromCharCode|getDate|getDay|getHours|getMiliseconds|getMinutes|getMonth|getSeconds|getSelection|getTime|getTimezoneOffset|getUTCDate|getUTCDay|getUTCFullYear|getUTCHours|getUTCMilliseconds|getUTCMinutes|getUTCMonth|getUTCSeconds|getYear|global|go|hash|height|history|home|host|hostname|href|hspace|ignoreCase|images|index|indexOf|innerHeight|innerWidth|input|italics|javaEnabled|join|language|lastIndex|lastIndexOf|lastModified|lastParen|layers|layerX|layerY|left|leftContext|length|link|linkColor|links|location|locationbar|load|lowsrc|match|MAX_VALUE|menubar|method|mimeTypes|MIN_VALUE|modifiers|moveAbove|moveBelow|moveBy|moveTo|moveToAbsolute|multiline|name|NaN|NEGATIVE_INFINITY|negative_infinity|next|open|opener|options|outerHeight|outerWidth|pageX|pageY|pageXoffset|pageYoffset|parent|parse|pathname|personalbar|pixelDepth|platform|plugins|pop|port|POSITIVE_INFINITY|positive_infinity|preference|previous|print|prompt|protocol|prototype|push|referrer|refresh|releaseEvents|reload|replace|reset|resizeBy|resizeTo|reverse|rightContext|screenX|screenY|scroll|scrollbar|scrollBy|scrollTo|search|select|selected|selectedIndex|self|setDate|setHours|setMinutes|setMonth|setSeconds|setTime|setTimeout|setUTCDate|setUTCDay|setUTCFullYear|setUTCHours|setUTCMilliseconds|setUTCMinutes|setUTCMonth|setUTCSeconds|setYear|shift|siblingAbove|siblingBelow|small|sort|source|splice|split|src|status|statusbar|strike|sub|submit|substr|substring|suffixes|sup|taintEnabled|target|test|text|title|toGMTString|toLocaleString|toLowerCase|toolbar|toSource|toString|top|toUpperCase|toUTCString|type|URL|unshift|unwatch|userAgent|UTC|value|valueOf|visibility|vlinkColor|vspace|width|watch|which|width|write|writeln|x|y|zIndex)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string1();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._jSComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._multiInlineComment();continue;}
        if((m = /^[=?:]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._(InternalRegexCatch)();continue;}
        if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._(InternalRegexCatch)();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^[:!%&+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsChar')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._jSComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multiInlineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._regularExpression = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^/[ig]{0,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._#pop#pop#pop();continue;}
        if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\\[bB]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\\[nrtvfDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsBaseN')) {this._(charclassCaretFirstCheck)();continue;}
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\$(?=/)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^[?+*()|]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._(InternalRegexCatch) = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^//(?=;)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._jSComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._multiInlineComment();continue;}
        if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {this._(regexCaretFirstCheck)();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._regularExpressionCharacterClass = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[\[\]]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsBaseN')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._(regexCaretFirstCheck) = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {this._regularExpression();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._(charclassCaretFirstCheck) = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {this._regularExpressionCharacterClass();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFloat');
    }
};
HL.prototype._region_marker = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsRegionMarker');
    }
};
