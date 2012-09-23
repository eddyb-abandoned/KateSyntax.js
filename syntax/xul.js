KateSyntax.langs.xul.syntax = {
    default: 'xul_start',
    xul_start: function xul_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xul_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.xul_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.xul_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_pI())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_element())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_findXML: function xul_findXML(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xul_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.xul_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.xul_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_pI())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_element())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_findEntityRefs: function xul_findEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_findPEntityRefs: function xul_findPEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_comment: function xul_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xul_pI: function xul_pI(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_doctype: function xul_doctype(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsDataType;fontWeight:bold')) {if(m = this.xul_doctypeInternalSubset())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_doctypeInternalSubset: function xul_doctypeInternalSubset(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsDataType;fontWeight:bold')) return this.pop();
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.xul_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xul_comment())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_pI())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_doctypeMarkupdecl: function xul_doctypeMarkupdecl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.xul_doctypeMarkupdeclDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.xul_doctypeMarkupdeclSQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_doctypeMarkupdeclDQ: function xul_doctypeMarkupdeclDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    xul_doctypeMarkupdeclSQ: function xul_doctypeMarkupdeclSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    xul_element: function xul_element(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xul_elContent())return this.pop(), m-1;continue;}
            if((m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.xul_attribute())return this.pop(), m-1;continue;}
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.xul_attribute())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_elContent: function xul_elContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_elEnd())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xul_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.xul_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.xul_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:_-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_pI())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xul_element())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_elEnd: function xul_elEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 2;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_attribute: function xul_attribute(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.xul_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_value: function xul_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.xul_valueDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.xul_valueSQ())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_valueDQ: function xul_valueDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) return this.pop(), 2;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    xul_valueSQ: function xul_valueSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) return this.pop(), 2;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    xul_cDATA: function xul_cDATA(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^]]>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) return this.pop();
            if((m = /^]]&gt;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.xul_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.xul_region_marker())return this.pop(), m-1;continue;}
            if((m = /^(?:if|else|for|in|while|do|continue|break|with|try|catch|finally|switch|case|new|var|function|return|delete|true|false|void|throw|typeof|const|default)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:escape|isFinite|isNaN|Number|parseFloat|parseInt|reload|taint|unescape|untaint|write)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:Anchor|Applet|Area|Array|Boolean|Button|Checkbox|Date|document|window|Image|FileUpload|Form|Frame|Function|Hidden|Link|MimeType|Math|Max|Min|Layer|navigator|Object|Password|Plugin|Radio|RegExp|Reset|Screen|Select|String|Text|Textarea|this|Window)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:abs|acos|asin|atan|atan2|ceil|cos|ctg|E|exp|floor|LN2|LN10|log|LOG2E|LOG10E|PI|pow|round|sin|sqrt|SQRT1_2|SQRT2|tan)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#DBA716;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:onAbort|onBlur|onChange|onClick|onError|onFocus|onLoad|onMouseOut|onMouseOver|onReset|onSelect|onSubmit|onUnload)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#F766D5;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:above|action|alinkColor|alert|anchor|anchors|appCodeName|applets|apply|appName|appVersion|argument|arguments|arity|availHeight|availWidth|back|background|below|bgColor|border|big|blink|blur|bold|border|call|caller|charAt|charCodeAt|checked|clearInterval|clearTimeout|click|clip|close|closed|colorDepth|complete|compile|constructor|confirm|cookie|current|cursor|data|defaultChecked|defaultSelected|defaultStatus|defaultValue|description|disableExternalCapture|domain|elements|embeds|enabledPlugin|enableExternalCapture|encoding|eval|exec|fgColor|filename|find|fixed|focus|fontcolor|fontsize|form|forms|formName|forward|frames|fromCharCode|getDate|getDay|getHours|getMiliseconds|getMinutes|getMonth|getSeconds|getSelection|getTime|getTimezoneOffset|getUTCDate|getUTCDay|getUTCFullYear|getUTCHours|getUTCMilliseconds|getUTCMinutes|getUTCMonth|getUTCSeconds|getYear|global|go|hash|height|history|home|host|hostname|href|hspace|ignoreCase|images|index|indexOf|innerHeight|innerWidth|input|italics|javaEnabled|join|language|lastIndex|lastIndexOf|lastModified|lastParen|layers|layerX|layerY|left|leftContext|length|link|linkColor|links|location|locationbar|load|lowsrc|match|MAX_VALUE|menubar|method|mimeTypes|MIN_VALUE|modifiers|moveAbove|moveBelow|moveBy|moveTo|moveToAbsolute|multiline|name|NaN|NEGATIVE_INFINITY|negative_infinity|next|open|opener|options|outerHeight|outerWidth|pageX|pageY|pageXoffset|pageYoffset|parent|parse|pathname|personalbar|pixelDepth|platform|plugins|pop|port|POSITIVE_INFINITY|positive_infinity|preference|previous|print|prompt|protocol|prototype|push|referrer|refresh|releaseEvents|reload|replace|reset|resizeBy|resizeTo|reverse|rightContext|screenX|screenY|scroll|scrollbar|scrollBy|scrollTo|search|select|selected|selectedIndex|self|setDate|setHours|setMinutes|setMonth|setSeconds|setTime|setTimeout|setUTCDate|setUTCDay|setUTCFullYear|setUTCHours|setUTCMilliseconds|setUTCMinutes|setUTCMonth|setUTCSeconds|setYear|shift|siblingAbove|siblingBelow|small|sort|source|splice|split|src|status|statusbar|strike|sub|submit|substr|substring|suffixes|sup|taintEnabled|target|test|text|title|toGMTString|toLocaleString|toLowerCase|toolbar|toSource|toString|top|toUpperCase|toUTCString|type|URL|unshift|unwatch|userAgent|UTC|value|valueOf|visibility|vlinkColor|vspace|width|watch|which|width|write|writeln|x|y|zIndex)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xul_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xul_string1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.xul_jSComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.xul_multiInlineComment())return this.pop(), m-1;continue;}
            if((m = /^[=?:]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this['xul_(InternalRegexCatch)']())return this.pop(), m-1;continue;}
            if((m = /^\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this['xul_(InternalRegexCatch)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[:!%&+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xul_string: function xul_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xul_string1: function xul_string1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xul_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    xul_jSComment: function xul_jSComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xul_multiInlineComment: function xul_multiInlineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xul_regularExpression: function xul_regularExpression(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/[ig]{0,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 2;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\\[bB]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\\[nrtvfDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsBaseN')) {if(m = this['xul_(charclassCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[?+*()|]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    'xul_(InternalRegexCatch)': function xul_InternalRegexCatch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/(?=;)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.xul_jSComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.xul_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['xul_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    xul_regularExpressionCharacterClass: function xul_regularExpressionCharacterClass(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[\[\]]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsBaseN')) return this.pop(), 1;
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    'xul_(regexCaretFirstCheck)': function xul_regexCaretFirstCheck(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {if(m = this.xul_regularExpression())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            return this.pop(), m = this.xul_regularExpression(), m && m-1;
        }
        this.pop();
    },
    'xul_(charclassCaretFirstCheck)': function xul_charclassCaretFirstCheck(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {if(m = this.xul_regularExpressionCharacterClass())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            return this.pop(), m = this.xul_regularExpressionCharacterClass(), m && m-1;
        }
        this.pop();
    },
    xul_region_marker: function xul_region_marker(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    },
    alert_normalText: function alert_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
