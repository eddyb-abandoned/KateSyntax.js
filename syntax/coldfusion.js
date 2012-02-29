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
        if((m = /^<!---/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ctxCFComment();continue;}
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ctxHTMLComment();continue;}
        if((m = /^<[cC][fF][sS][cC][rR][iI][pP][tT]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxCFSCRIPTTag();continue;}
        if((m = /^<[sS][cC][rR][iI][pP][tT]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxSCRIPTTag();continue;}
        if((m = /^<[sS][tT][yY][lL][eE]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxSTYLETag();continue;}
        if(this.str[0] == '&' && this.hl('&', 'dsNormal')) {this._ctxHTMLEntities();continue;}
        if((m = /^<\/?[cC][fF]_/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxCustomTag();continue;}
        if((m = /^<\/?[cC][fF][xX]_/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxCFXTag();continue;}
        if((m = /^<\/?[cC][fF]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxCFTag();continue;}
        if((m = /^<\/?([tT][aAhHbBfFrRdD])|([cC][aA][pP][tT])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxTableTag();continue;}
        if((m = /^<\/?[aA] /.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxAnchorTag();continue;}
        if((m = /^<\/?[iI][mM][gG] /.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxImageTag();continue;}
        if((m = /^<!?\/?[a-zA-Z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._ctxTag();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxCFSCRIPTTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) {this._ctxCFSCRIPTBlock();continue;}
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxSCRIPTTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) {this._ctxSCRIPTBlock();continue;}
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxSTYLETag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) {this._ctxSTYLEBlock();continue;}
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxTableTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxAnchorTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxImageTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxCFTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxCustomTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxCFXTag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsNormal')) return;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxHTMLComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<!---/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._ctxCFComment();continue;}
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ctxCFComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ctxCStyleComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ctxOneLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ctxHTMLEntities = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxCFSCRIPTBlock = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._ctxCStyleComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._ctxOneLineComment();continue;}
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[[()[\\]=+\-*/\]+]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[{}]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:break|case|catch|continue|default|do|else|for|function|if|in|return|switch|try|var|while)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:Abs|ACos|ArrayAppend|ArrayAvg|ArrayClear|ArrayDeleteAt|ArrayInsertAt|ArrayIsEmpty|ArrayLen|ArrayMax|ArrayMin|ArrayNew|ArrayPrepend|ArrayResize|ArraySet|ArraySort|ArraySum|ArraySwap|ArrayToList|Asc|ASin|Atn|BitAnd|BitMaskClear|BitMaskRead|BitMaskSet|BitNot|BitOr|BitSHLN|BitSHRN|BitXor|Ceiling|Chr|CJustify|Compare|CompareNoCase|Cos|CreateDate|CreateDateTime|CreateObject|CreateODBCDate|CreateODBCDateTime|CreateODBCTime|CreateTime|CreateTimeSpan|CreateUUID|DateAdd|DateCompare|DateConvert|DateDiff|DateFormat|DatePart|Day|DayOfWeek|DayOfWeekAsString|DayOfYear|DaysInMonth|DaysInYear|DE|DecimalFormat|DecrementValue|Decrypt|DeleteClientVariable|DirectoryExists|DollarFormat|Duplicate|Encrypt|Evaluate|Exp|ExpandPath|FileExists|Find|FindNoCase|FindOneOf|FirstDayOfMonth|Fix|FormatBaseN|GetAuthUser|GetBaseTagData|GetBaseTagList|GetBaseTemplatePath|GetClientVariablesList|GetCurrentTemplatePath|GetDirectoryFromPath|GetException|GetFileFromPath|GetFunctionList|GetHttpRequestData|GetHttpTimeString|GetK2ServerDocCount|GetK2ServerDocCountLimit|GetLocale|GetMetaData|GetMetricData|GetPageContext|GetProfileSections|GetProfileString|GetServiceSettings|GetTempDirectory|GetTempFile|GetTemplatePath|GetTickCount|GetTimeZoneInfo|GetToken|Hash|Hour|HTMLCodeFormat|HTMLEditFormat|IIf|IncrementValue|InputBaseN|Insert|Int|IsArray|IsBinary|IsBoolean|IsCustomFunction|IsDate|IsDebugMode|IsDefined|IsK2ServerABroker|IsK2ServerDocCountExceeded|IsK2ServerOnline|IsLeapYear|IsNumeric|IsNumericDate|IsObject|IsQuery|IsSimpleValue|IsStruct|IsUserInRole|IsWDDX|IsXmlDoc|IsXmlElement|IsXmlRoot|JavaCast|JSStringFormat|LCase|Left|Len|ListAppend|ListChangeDelims|ListContains|ListContainsNoCase|ListDeleteAt|ListFind|ListFindNoCase|ListFirst|ListGetAt|ListInsertAt|ListLast|ListLen|ListPrepend|ListQualify|ListRest|ListSetAt|ListSort|ListToArray|ListValueCount|ListValueCountNoCase|LJustify|Log|Log10|LSCurrencyFormat|LSDateFormat|LSEuroCurrencyFormat|LSIsCurrency|LSIsDate|LSIsNumeric|LSNumberFormat|LSParseCurrency|LSParseDateTime|LSParseEuroCurrency|LSParseNumber|LSTimeFormat|LTrim|Max|Mid|Min|Minute|Month|MonthAsString|Now|NumberFormat|ParagraphFormat|ParameterExists|ParseDateTime|Pi|PreserveSingleQuotes|Quarter|QueryAddColumn|QueryAddRow|QueryNew|QuerySetCell|QuotedValueList|Rand|Randomize|RandRange|REFind|REFindNoCase|RemoveChars|RepeatString|Replace|ReplaceList|ReplaceNoCase|REReplace|REReplaceNoCase|Reverse|Right|RJustify|Round|RTrim|Second|SetEncoding|SetLocale|SetProfileString|SetVariable|Sgn|Sin|SpanExcluding|SpanIncluding|Sqr|StripCR|StructAppend|StructClear|StructCopy|StructCount|StructDelete|StructFind|StructFindKey|StructFindValue|StructGet|StructInsert|StructIsEmpty|StructKeyArray|StructKeyExists|StructKeyList|StructNew|StructSort|StructUpdate|Tan|TimeFormat|ToBase64|ToBinary|ToString|Trim|UCase|URLDecode|URLEncodedFormat|URLSessionFormat|Val|ValueList|Week|WriteOutput|XmlChildPos|XmlElemNew|XmlFormat|XmlNew|XmlParse|XmlSearch|XmlTransform|Year|YesNoFormat)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^</[cC][fF][sS][cC][rR][iI][pP][tT]>/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxSCRIPTBlock = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._ctxCStyleComment();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._ctxOneLineComment();continue;}
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[[()[\\]=+\-*/\]+]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[{}]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:if|else|for|in|while|do|continue|break|with|try|catch|switch|case|new|var|function|return|this|delete|true|false|void|throw|typeof|const|default)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:Anchor|Applet|Area|Array|Boolean|Button|Checkbox|Date|Document|Event|FileUpload|Form|Frame|Function|Hidden|History|Image|Layer|Linke|Location|Math|Navigator|Number|Object|Option|Password|Radio|RegExp|Reset|Screen|Select|String|Submit|Text|Textarea|Window)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:abs|acos|alert|anchor|apply|asin|atan|atan2|back|blur|call|captureEvents|ceil|charAt|charCodeAt|clearInterval|clearTimeout|click|close|compile|concat|confirm|cos|disableExternalCapture|enableExternalCapture|eval|exec|exp|find|floor|focus|forward|fromCharCode|getDate|getDay|getFullYear|getHours|getMilliseconds|getMinutes|getMonth|getSeconds|getSelection|getTime|getTimezoneOffset|getUTCDate|getUTCDay|getUTCFullYear|getUTCHours|getUTCMilliseconds|getUTCMinutes|getUTCMonth|getUTCSeconds|go|handleEvent|home|indexOf|javaEnabled|join|lastIndexOf|link|load|log|match|max|min|moveAbove|moveBelow|moveBy|moveTo|moveToAbsolute|open|parse|plugins\.refresh|pop|pow|preference|print|prompt|push|random|releaseEvents|reload|replace|reset|resizeBy|resizeTo|reverse|round|routeEvent|scrollBy|scrollTo|search|select|setDate|setFullYear|setHours|setInterval|setMilliseconds|setMinutes|setMonth|setSeconds|setTime|setTimeout|setUTCDate|setUTCFullYear|setUTCHours|setUTCMilliseconds|setUTCMinutes|setUTCMonth|setUTCSeconds|shift|sin|slice|sort|splice|split|sqrt|stop|String formatting|submit|substr|substring|taintEnabled|tan|test|toLocaleString|toLowerCase|toSource|toString|toUpperCase|toUTCString|unshift|unwatch|UTC|valueOf|watch|write|writeln)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^</[sS][cC][rR][iI][pP][tT]>/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxSTYLEBlock = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._ctxCStyleComment();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._ctxStyleProperties();continue;}
        if((m = /^</[sS][tT][yY][lL][eE]>/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxStyleProperties = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._ctxCStyleComment();continue;}
        if(this.str[0] == ':' && this.hl(':', 'dsNormal')) {this._ctxStyleValues();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ctxStyleValues = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ';' && this.hl(';', 'dsNormal')) return;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#([0-9a-fA-F]{3})|([0-9a-fA-F]{6})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
