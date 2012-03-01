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
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {this._cDATA();continue;}
        if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._doctype();continue;}
        if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._tagname();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
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
        if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._pI();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._doctypeMarkupdecl = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsDataType')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {this._doctypeMarkupdeclDQ();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {this._doctypeMarkupdeclSQ();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._doctypeMarkupdeclDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'undefined')) return;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._doctypeMarkupdeclSQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'undefined')) return;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._detectEntRef = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findPEntityRefs = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tagname = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:xsl:value-of|xsl:output|xsl:decimal-format|xsl:apply-templates|xsl:param|xsl:transform|xsl:namespace-alias|xsl:comment|xsl:element|xsl:attribute|xsl:apply-imports|xsl:text|xsl:when|xsl:template|xsl:processing-instruction|xsl:include|xsl:copy-of|xsl:copy|xsl:with-param|xsl:stylesheet|xsl:for-each|xsl:choose|xsl:sort|xsl:otherwise|xsl:key|xsl:variable|xsl:number|xsl:message|xsl:fallback|xsl:strip-space|xsl:import|xsl:preserve-space|xsl:if|xsl:call-template|xsl:attribute-set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._xattributes();continue;}
        if((m = /^(?:xsl:perform-sort|xsl:import-schema|xsl:for-each-group|xsl:sequence|xsl:non-matching-substring|xsl:namespace|xsl:next-match|xsl:function|xsl:analyze-string|xsl:output-character|xsl:matching-substring|xsl:result-document|xsl:character-map|xsl:document)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._xattributes();continue;}
        if((m = /^\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._attributes();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return;
        this.hl(this.str[0], 'dsKeyword');
    }
};
HL.prototype._attributes = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._attrValue();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._attrValue = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsError')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._sqstring();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._xattributes = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._#pop#pop();continue;}
        if((m = /^select\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._xattrValue();continue;}
        if((m = /^test\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._xattrValue();continue;}
        if((m = /^match\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._xattrValue();continue;}
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._attrValue();continue;}
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._xattrValue = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsError')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsError')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsOthers')) {this._xpath();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsOthers')) {this._sqxpath();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._xpath();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._#pop#pop();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._sqstring = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._sqxpath();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._#pop#pop();continue;}
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^(FIXME|TODO|HACK)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._xpath = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:format-number|position|lang|substring-before|substring|normalize-space|round|translate|starts-with|concat|local-name|key|count|document|system-property|current|boolean|number|contains|name|last|unparsed-entity-uri|sum|generate-id|function-available|element-available|false|substring-after|not|string-length|id|floor|ceiling|namespace-uri|true|string|text)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:zero-or-one|replace|namespace-uri-for-prefix|current-grouping-key|seconds-from-duration|resolve-uri|node-kind|minutes-from-dateTime|implicit-timezone|exactly-one|current-time|current-dateTime|unordered|subtract-dates-yielding-dayTimeDuration|string-join|static-base-uri|months-from-duration|input|exists|default-collation|dateTime|current-group|current-date|collection|timezone-from-time|matches|local-name-from-QName|day-from-date|timezone-from-date|round-half-to-even|month-from-dateTime|month-from-date|hours-from-duration|escape-uri|distinct-values|avg|years-from-duration|unparsed-text|unparsed-entity-public-id|subtract-dateTimes-yielding-dayTimeDuration|subtract-dates-yielding-yearMonthDuration|string-to-codepoints|sequence-node-identical|hours-from-time|hours-from-dateTime|format-time|codepoints-to-string|trace|tokenize|subtract-dateTimes-yielding-yearMonthDuration|subsequence|seconds-from-dateTime|regex-group|one-or-more|node-name|namespace-uri-from-QName|min|idref|format-dateTime|format-date|days-from-duration|compare|base-uri|seconds-from-time|in-scope-prefixes|expanded-QName|adjust-date-to-timezone|year-from-date|resolve-QName|remove|QName|minutes-from-time|max|lower-case|index-of|doc|deep-equal|data|minutes-from-duration|adjust-dateTime-to-timezone|abs|timezone-from-dateTime|reverse|error|ends-with|day-from-dateTime|year-from-dateTime|upper-case|root|normalize-unicode|empty|insert-before|document-uri|adjust-time-to-timezone)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(&axisname;)::/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._sqxpathstring();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsOthers')) {this._#pop#pop();continue;}
        if((m = /^@&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\$&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&qname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsError')) continue;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._sqxpath = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:format-number|position|lang|substring-before|substring|normalize-space|round|translate|starts-with|concat|local-name|key|count|document|system-property|current|boolean|number|contains|name|last|unparsed-entity-uri|sum|generate-id|function-available|element-available|false|substring-after|not|string-length|id|floor|ceiling|namespace-uri|true|string|text)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:zero-or-one|replace|namespace-uri-for-prefix|current-grouping-key|seconds-from-duration|resolve-uri|node-kind|minutes-from-dateTime|implicit-timezone|exactly-one|current-time|current-dateTime|unordered|subtract-dates-yielding-dayTimeDuration|string-join|static-base-uri|months-from-duration|input|exists|default-collation|dateTime|current-group|current-date|collection|timezone-from-time|matches|local-name-from-QName|day-from-date|timezone-from-date|round-half-to-even|month-from-dateTime|month-from-date|hours-from-duration|escape-uri|distinct-values|avg|years-from-duration|unparsed-text|unparsed-entity-public-id|subtract-dateTimes-yielding-dayTimeDuration|subtract-dates-yielding-yearMonthDuration|string-to-codepoints|sequence-node-identical|hours-from-time|hours-from-dateTime|format-time|codepoints-to-string|trace|tokenize|subtract-dateTimes-yielding-yearMonthDuration|subsequence|seconds-from-dateTime|regex-group|one-or-more|node-name|namespace-uri-from-QName|min|idref|format-dateTime|format-date|days-from-duration|compare|base-uri|seconds-from-time|in-scope-prefixes|expanded-QName|adjust-date-to-timezone|year-from-date|resolve-QName|remove|QName|minutes-from-time|max|lower-case|index-of|doc|deep-equal|data|minutes-from-duration|adjust-dateTime-to-timezone|abs|timezone-from-dateTime|reverse|error|ends-with|day-from-dateTime|year-from-dateTime|upper-case|root|normalize-unicode|empty|insert-before|document-uri|adjust-time-to-timezone)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(&axisname;)::/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._xpathstring();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsOthers')) {this._#pop#pop();continue;}
        if((m = /^@&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\$&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&qname;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsError')) continue;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._sqxpathstring = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._xpathstring = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
