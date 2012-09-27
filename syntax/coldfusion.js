KateSyntax.langs.coldfusion.syntax = {
    default: 'coldfusion_normalText',
    coldfusion_normalText: function coldfusion_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!---/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCFComment())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxHTMLComment())return this.pop(), m-1;continue;}
            if((m = /^<[cC][fF][sS][cC][rR][iI][pP][tT]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCFSCRIPTTag())return this.pop(), m-1;continue;}
            if((m = /^<[sS][cC][rR][iI][pP][tT]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxSCRIPTTag())return this.pop(), m-1;continue;}
            if((m = /^<[sS][tT][yY][lL][eE]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800080;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxSTYLETag())return this.pop(), m-1;continue;}
            if(this.str[0] == '&' && this.hl('&', 'dsNormal;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.coldfusion_ctxHTMLEntities())return this.pop(), m-1;continue;}
            if((m = /^<\/?[cC][fF]_/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#cc6666;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCustomTag())return this.pop(), m-1;continue;}
            if((m = /^<\/?[cC][fF][xX]_/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCFXTag())return this.pop(), m-1;continue;}
            if((m = /^<\/?[cC][fF]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCFTag())return this.pop(), m-1;continue;}
            if((m = /^<\/?([tT][aAhHbBfFrRdD])|([cC][aA][pP][tT])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxTableTag())return this.pop(), m-1;continue;}
            if((m = /^<\/?[aA] /.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxAnchorTag())return this.pop(), m-1;continue;}
            if((m = /^<\/?[iI][mM][gG] /.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800080;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxImageTag())return this.pop(), m-1;continue;}
            if((m = /^<!?\/?[a-zA-Z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxTag())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#000000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxCFSCRIPTTag: function coldfusion_ctxCFSCRIPTTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCFSCRIPTBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxSCRIPTTag: function coldfusion_ctxSCRIPTTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxSCRIPTBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxSTYLETag: function coldfusion_ctxSTYLETag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#800080;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxSTYLEBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#800080;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxTag: function coldfusion_ctxTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#000080;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#000080;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxTableTag: function coldfusion_ctxTableTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#008080;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#008080;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxAnchorTag: function coldfusion_ctxAnchorTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#008000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#008000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxImageTag: function coldfusion_ctxImageTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#800080;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#800080;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxCFTag: function coldfusion_ctxCFTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxCustomTag: function coldfusion_ctxCustomTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#cc6666;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#cc6666;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxCFXTag: function coldfusion_ctxCFXTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsNormal;color:#008000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal;color:#008000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxHTMLComment: function coldfusion_ctxHTMLComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!---/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCFComment())return this.pop(), m-1;continue;}
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:normal')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#008000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxCFComment: function coldfusion_ctxCFComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#ff9900;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxCStyleComment: function coldfusion_ctxCStyleComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) return this.pop();
            this.hl(this.str[0], 'dsComment;color:#ff9900;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxOneLineComment: function coldfusion_ctxOneLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#ff9900;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxHTMLEntities: function coldfusion_ctxHTMLEntities(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.hl(';', 'dsNormal;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#000000;font-style:normal;font-weight:bold');
        }
        this.pop();
    },
    coldfusion_ctxCFSCRIPTBlock: function coldfusion_ctxCFSCRIPTBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCStyleComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxOneLineComment())return this.pop(), m-1;continue;}
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#ff00ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#ff00ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^[[()[\\\]=+\-*/\]+]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^[{}]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:break|case|catch|continue|default|do|else|for|function|if|in|return|switch|try|var|while)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000cc;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:Abs|ACos|ArrayAppend|ArrayAvg|ArrayClear|ArrayDeleteAt|ArrayInsertAt|ArrayIsEmpty|ArrayLen|ArrayMax|ArrayMin|ArrayNew|ArrayPrepend|ArrayResize|ArraySet|ArraySort|ArraySum|ArraySwap|ArrayToList|Asc|ASin|Atn|BitAnd|BitMaskClear|BitMaskRead|BitMaskSet|BitNot|BitOr|BitSHLN|BitSHRN|BitXor|Ceiling|Chr|CJustify|Compare|CompareNoCase|Cos|CreateDate|CreateDateTime|CreateObject|CreateODBCDate|CreateODBCDateTime|CreateODBCTime|CreateTime|CreateTimeSpan|CreateUUID|DateAdd|DateCompare|DateConvert|DateDiff|DateFormat|DatePart|Day|DayOfWeek|DayOfWeekAsString|DayOfYear|DaysInMonth|DaysInYear|DE|DecimalFormat|DecrementValue|Decrypt|DeleteClientVariable|DirectoryExists|DollarFormat|Duplicate|Encrypt|Evaluate|Exp|ExpandPath|FileExists|Find|FindNoCase|FindOneOf|FirstDayOfMonth|Fix|FormatBaseN|GetAuthUser|GetBaseTagData|GetBaseTagList|GetBaseTemplatePath|GetClientVariablesList|GetCurrentTemplatePath|GetDirectoryFromPath|GetException|GetFileFromPath|GetFunctionList|GetHttpRequestData|GetHttpTimeString|GetK2ServerDocCount|GetK2ServerDocCountLimit|GetLocale|GetMetaData|GetMetricData|GetPageContext|GetProfileSections|GetProfileString|GetServiceSettings|GetTempDirectory|GetTempFile|GetTemplatePath|GetTickCount|GetTimeZoneInfo|GetToken|Hash|Hour|HTMLCodeFormat|HTMLEditFormat|IIf|IncrementValue|InputBaseN|Insert|Int|IsArray|IsBinary|IsBoolean|IsCustomFunction|IsDate|IsDebugMode|IsDefined|IsK2ServerABroker|IsK2ServerDocCountExceeded|IsK2ServerOnline|IsLeapYear|IsNumeric|IsNumericDate|IsObject|IsQuery|IsSimpleValue|IsStruct|IsUserInRole|IsWDDX|IsXmlDoc|IsXmlElement|IsXmlRoot|JavaCast|JSStringFormat|LCase|Left|Len|ListAppend|ListChangeDelims|ListContains|ListContainsNoCase|ListDeleteAt|ListFind|ListFindNoCase|ListFirst|ListGetAt|ListInsertAt|ListLast|ListLen|ListPrepend|ListQualify|ListRest|ListSetAt|ListSort|ListToArray|ListValueCount|ListValueCountNoCase|LJustify|Log|Log10|LSCurrencyFormat|LSDateFormat|LSEuroCurrencyFormat|LSIsCurrency|LSIsDate|LSIsNumeric|LSNumberFormat|LSParseCurrency|LSParseDateTime|LSParseEuroCurrency|LSParseNumber|LSTimeFormat|LTrim|Max|Mid|Min|Minute|Month|MonthAsString|Now|NumberFormat|ParagraphFormat|ParameterExists|ParseDateTime|Pi|PreserveSingleQuotes|Quarter|QueryAddColumn|QueryAddRow|QueryNew|QuerySetCell|QuotedValueList|Rand|Randomize|RandRange|REFind|REFindNoCase|RemoveChars|RepeatString|Replace|ReplaceList|ReplaceNoCase|REReplace|REReplaceNoCase|Reverse|Right|RJustify|Round|RTrim|Second|SetEncoding|SetLocale|SetProfileString|SetVariable|Sgn|Sin|SpanExcluding|SpanIncluding|Sqr|StripCR|StructAppend|StructClear|StructCopy|StructCount|StructDelete|StructFind|StructFindKey|StructFindValue|StructGet|StructInsert|StructIsEmpty|StructKeyArray|StructKeyExists|StructKeyList|StructNew|StructSort|StructUpdate|Tan|TimeFormat|ToBase64|ToBinary|ToString|Trim|UCase|URLDecode|URLEncodedFormat|URLSessionFormat|Val|ValueList|Week|WriteOutput|XmlChildPos|XmlElemNew|XmlFormat|XmlNew|XmlParse|XmlSearch|XmlTransform|Year|YesNoFormat)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) continue;
            if((m = /^<\/[cC][fF][sS][cC][rR][iI][pP][tT]>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal;color:#000000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxSCRIPTBlock: function coldfusion_ctxSCRIPTBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCStyleComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxOneLineComment())return this.pop(), m-1;continue;}
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#008080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#ff00ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#ff00ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^[[()[\\\]=+\-*/\]+]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^[{}]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:if|else|for|in|while|do|continue|break|with|try|catch|switch|case|new|var|function|return|this|delete|true|false|void|throw|typeof|const|default)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000cc;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:Anchor|Applet|Area|Array|Boolean|Button|Checkbox|Date|Document|Event|FileUpload|Form|Frame|Function|Hidden|History|Image|Layer|Linke|Location|Math|Navigator|Number|Object|Option|Password|Radio|RegExp|Reset|Screen|Select|String|Submit|Text|Textarea|Window)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000cc;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:abs|acos|alert|anchor|apply|asin|atan|atan2|back|blur|call|captureEvents|ceil|charAt|charCodeAt|clearInterval|clearTimeout|click|close|compile|concat|confirm|cos|disableExternalCapture|enableExternalCapture|eval|exec|exp|find|floor|focus|forward|fromCharCode|getDate|getDay|getFullYear|getHours|getMilliseconds|getMinutes|getMonth|getSeconds|getSelection|getTime|getTimezoneOffset|getUTCDate|getUTCDay|getUTCFullYear|getUTCHours|getUTCMilliseconds|getUTCMinutes|getUTCMonth|getUTCSeconds|go|handleEvent|home|indexOf|javaEnabled|join|lastIndexOf|link|load|log|match|max|min|moveAbove|moveBelow|moveBy|moveTo|moveToAbsolute|open|parse|plugins\.refresh|pop|pow|preference|print|prompt|push|random|releaseEvents|reload|replace|reset|resizeBy|resizeTo|reverse|round|routeEvent|scrollBy|scrollTo|search|select|setDate|setFullYear|setHours|setInterval|setMilliseconds|setMinutes|setMonth|setSeconds|setTime|setTimeout|setUTCDate|setUTCFullYear|setUTCHours|setUTCMilliseconds|setUTCMinutes|setUTCMonth|setUTCSeconds|shift|sin|slice|sort|splice|split|sqrt|stop|String formatting|submit|substr|substring|taintEnabled|tan|test|toLocaleString|toLowerCase|toSource|toString|toUpperCase|toUTCString|unshift|unwatch|UTC|valueOf|watch|write|writeln)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) continue;
            if((m = /^<\/[sS][cC][rR][iI][pP][tT]>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal;color:#000000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxSTYLEBlock: function coldfusion_ctxSTYLEBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCStyleComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#000080;font-style:normal;font-weight:bold')) {if(m = this.coldfusion_ctxStyleProperties())return this.pop(), m-1;continue;}
            if((m = /^<\/[sS][tT][yY][lL][eE]>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800080;font-style:normal;font-weight:normal')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal;color:#ff00ff;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxStyleProperties: function coldfusion_ctxStyleProperties(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#000080;font-style:normal;font-weight:bold')) return this.pop();
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment;color:#ff9900;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxCStyleComment())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) {if(m = this.coldfusion_ctxStyleValues())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#000080;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    coldfusion_ctxStyleValues: function coldfusion_ctxStyleValues(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.hl(';', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == ',' && this.hl(',', 'dsNormal;color:#000000;font-style:normal;font-weight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^#([0-9a-fA-F]{3})|([0-9a-fA-F]{6})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^"[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if((m = /^'[^']*'/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#ff0000;font-style:normal;font-weight:normal');
        }
        this.pop();
    }
};
