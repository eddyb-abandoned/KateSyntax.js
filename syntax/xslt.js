KateSyntax.langs.xslt.syntax = {
    default: 'xslt_normalText',
    xslt_normalText: function xslt_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xslt_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.xslt_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.xslt_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xslt_pI())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {if(m = this.xslt_tagname())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_cDATA: function xslt_cDATA(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^]]>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) return this.pop();
            if((m = /^]]&gt;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_pI: function xslt_pI(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_doctype: function xslt_doctype(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsDataType;fontWeight:bold')) {if(m = this.xslt_doctypeInternalSubset())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_doctypeInternalSubset: function xslt_doctypeInternalSubset(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsDataType;fontWeight:bold')) return this.pop();
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.xslt_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xslt_comment())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xslt_pI())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_doctypeMarkupdecl: function xslt_doctypeMarkupdecl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.xslt_doctypeMarkupdeclDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {if(m = this.xslt_doctypeMarkupdeclSQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_doctypeMarkupdeclDQ: function xslt_doctypeMarkupdeclDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_doctypeMarkupdeclSQ: function xslt_doctypeMarkupdeclSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_detectEntRef: function xslt_detectEntRef(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_findPEntityRefs: function xslt_findPEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&qname;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xslt_tagname: function xslt_tagname(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:xsl:value-of|xsl:output|xsl:decimal-format|xsl:apply-templates|xsl:param|xsl:transform|xsl:namespace-alias|xsl:comment|xsl:element|xsl:attribute|xsl:apply-imports|xsl:text|xsl:when|xsl:template|xsl:processing-instruction|xsl:include|xsl:copy-of|xsl:copy|xsl:with-param|xsl:stylesheet|xsl:for-each|xsl:choose|xsl:sort|xsl:otherwise|xsl:key|xsl:variable|xsl:number|xsl:message|xsl:fallback|xsl:strip-space|xsl:import|xsl:preserve-space|xsl:if|xsl:call-template|xsl:attribute-set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;fontStyle:normal;fontWeight:bold')) {if(m = this.xslt_xattributes())return this.pop(), m-1;continue;}
            if((m = /^(?:xsl:perform-sort|xsl:import-schema|xsl:for-each-group|xsl:sequence|xsl:non-matching-substring|xsl:namespace|xsl:next-match|xsl:function|xsl:analyze-string|xsl:output-character|xsl:matching-substring|xsl:result-document|xsl:character-map|xsl:document)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;fontStyle:normal;fontWeight:bold')) {if(m = this.xslt_xattributes())return this.pop(), m-1;continue;}
            if((m = /^\s*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) {if(m = this.xslt_attributes())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    xslt_attributes: function xslt_attributes(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 1;
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.xslt_attrValue())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    xslt_attrValue: function xslt_attrValue(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsError')) return this.pop(), 2;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) return this.pop(), 2;
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_sqstring())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xslt_xattributes: function xslt_xattributes(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 1;
            if((m = /^select\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.xslt_xattrValue())return this.pop(), m-1;continue;}
            if((m = /^test\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.xslt_xattrValue())return this.pop(), m-1;continue;}
            if((m = /^match\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.xslt_xattrValue())return this.pop(), m-1;continue;}
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.xslt_attrValue())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    xslt_xattrValue: function xslt_xattrValue(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsError')) return this.pop(), 2;
            if(this.str[0] == '>' && this.hl('>', 'dsError')) return this.pop(), 2;
            if(this.str[0] == '"' && this.hl('"', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_xpath())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_sqxpath())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xslt_string: function xslt_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_xpath())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) return this.pop(), 1;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsString;color:#800000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    xslt_sqstring: function xslt_sqstring(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_sqxpath())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) return this.pop(), 1;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsString;color:#800000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    xslt_comment: function xslt_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(FIXME|TODO|HACK)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xslt_xpath: function xslt_xpath(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:format-number|position|lang|substring-before|substring|normalize-space|round|translate|starts-with|concat|local-name|key|count|document|system-property|current|boolean|number|contains|name|last|unparsed-entity-uri|sum|generate-id|function-available|element-available|false|substring-after|not|string-length|id|floor|ceiling|namespace-uri|true|string|text)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:zero-or-one|replace|namespace-uri-for-prefix|current-grouping-key|seconds-from-duration|resolve-uri|node-kind|minutes-from-dateTime|implicit-timezone|exactly-one|current-time|current-dateTime|unordered|subtract-dates-yielding-dayTimeDuration|string-join|static-base-uri|months-from-duration|input|exists|default-collation|dateTime|current-group|current-date|collection|timezone-from-time|matches|local-name-from-QName|day-from-date|timezone-from-date|round-half-to-even|month-from-dateTime|month-from-date|hours-from-duration|escape-uri|distinct-values|avg|years-from-duration|unparsed-text|unparsed-entity-public-id|subtract-dateTimes-yielding-dayTimeDuration|subtract-dates-yielding-yearMonthDuration|string-to-codepoints|sequence-node-identical|hours-from-time|hours-from-dateTime|format-time|codepoints-to-string|trace|tokenize|subtract-dateTimes-yielding-yearMonthDuration|subsequence|seconds-from-dateTime|regex-group|one-or-more|node-name|namespace-uri-from-QName|min|idref|format-dateTime|format-date|days-from-duration|compare|base-uri|seconds-from-time|in-scope-prefixes|expanded-QName|adjust-date-to-timezone|year-from-date|resolve-QName|remove|QName|minutes-from-time|max|lower-case|index-of|doc|deep-equal|data|minutes-from-duration|adjust-dateTime-to-timezone|abs|timezone-from-dateTime|reverse|error|ends-with|day-from-dateTime|year-from-dateTime|upper-case|root|normalize-unicode|empty|insert-before|document-uri|adjust-time-to-timezone)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(&axisname;)::/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:italic;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_sqxpathstring())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) return this.pop(), 1;
            if((m = /^@&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;fontStyle:italic;fontWeight:normal')) continue;
            if((m = /^\$&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;fontStyle:italic;fontWeight:normal')) continue;
            if((m = /^&qname;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsError')) continue;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    xslt_sqxpath: function xslt_sqxpath(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:format-number|position|lang|substring-before|substring|normalize-space|round|translate|starts-with|concat|local-name|key|count|document|system-property|current|boolean|number|contains|name|last|unparsed-entity-uri|sum|generate-id|function-available|element-available|false|substring-after|not|string-length|id|floor|ceiling|namespace-uri|true|string|text)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:zero-or-one|replace|namespace-uri-for-prefix|current-grouping-key|seconds-from-duration|resolve-uri|node-kind|minutes-from-dateTime|implicit-timezone|exactly-one|current-time|current-dateTime|unordered|subtract-dates-yielding-dayTimeDuration|string-join|static-base-uri|months-from-duration|input|exists|default-collation|dateTime|current-group|current-date|collection|timezone-from-time|matches|local-name-from-QName|day-from-date|timezone-from-date|round-half-to-even|month-from-dateTime|month-from-date|hours-from-duration|escape-uri|distinct-values|avg|years-from-duration|unparsed-text|unparsed-entity-public-id|subtract-dateTimes-yielding-dayTimeDuration|subtract-dates-yielding-yearMonthDuration|string-to-codepoints|sequence-node-identical|hours-from-time|hours-from-dateTime|format-time|codepoints-to-string|trace|tokenize|subtract-dateTimes-yielding-yearMonthDuration|subsequence|seconds-from-dateTime|regex-group|one-or-more|node-name|namespace-uri-from-QName|min|idref|format-dateTime|format-date|days-from-duration|compare|base-uri|seconds-from-time|in-scope-prefixes|expanded-QName|adjust-date-to-timezone|year-from-date|resolve-QName|remove|QName|minutes-from-time|max|lower-case|index-of|doc|deep-equal|data|minutes-from-duration|adjust-dateTime-to-timezone|abs|timezone-from-dateTime|reverse|error|ends-with|day-from-dateTime|year-from-dateTime|upper-case|root|normalize-unicode|empty|insert-before|document-uri|adjust-time-to-timezone)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(&axisname;)::/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:italic;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.xslt_xpathstring())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) return this.pop(), 1;
            if((m = /^@&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;fontStyle:italic;fontWeight:normal')) continue;
            if((m = /^\$&qname;/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;fontStyle:italic;fontWeight:normal')) continue;
            if((m = /^&qname;/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsError')) continue;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsOthers;color:#008080;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    xslt_sqxpathstring: function xslt_sqxpathstring(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsString;color:#800000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    xslt_xpathstring: function xslt_xpathstring(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsString;color:#800000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    }
};
