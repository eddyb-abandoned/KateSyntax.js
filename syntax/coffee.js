KateSyntax.langs.coffee.syntax = {
    default: 'coffee_normal',
    coffee_normal: function coffee_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^(?:return|break|continue|throw|for|while|until|loop|if|else|unless|switch|when|then|and|or|in|of|by|is|isnt|not|typeof|delete|where|super|try|catch|finally|try|catch|finally|constructor)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|extends|new|instanceof)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.coffee_class())return this.pop(), m-1;continue;}
            if((m = /^(?:false|true|yes|no|on|off|undefined|null|NaN|Infinity)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:case|default|function|var|void|with|const|let|enum|export|import|native|__hasProp|__extends|__slice|__bind|__indexOf)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^(?:Object|Number|Boolean|Array|String|RegExp|Function|Date|Math|eval|setInterval|clearInterval|setTimeout|clearTimeout|isFinite|isNaN|parseFloat|parseInt|escape|unescape|console|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:window|document|navigator|location|history|screen|alert|prompt)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:process|GLOBAL|require|exports)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(@[_$a-zA-Z][$\w]*|\bthis)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(\((\'[^']*'|"[^"]*"|[^()])*\))?\s*(-|=)>/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^[_$a-z][$\w]*\b/i.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.coffee_heredoc())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.coffee_richHeredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.coffee_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.coffee_richString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsAlert;fontStyle:italic')) {if(m = this.coffee_javascript())return this.pop(), m-1;continue;}
            if((m = /^###/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.coffee_multilineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.coffee_comment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\//.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.coffee_multilineRegex())return this.pop(), m-1;continue;}
            if((m = /^\/([^/\\\r\n]|\\.)*\/[mig]{0,3}/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[():!%&+,\-/.*<=>?[\]|~\^;{}]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    coffee_multilineRegex: function coffee_multilineRegex(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.coffee_comment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\/[mig]{0,3}/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    coffee_class: function coffee_class(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[@$:.\w\[\]]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    coffee_comment: function coffee_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    coffee_multilineComment: function coffee_multilineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^###/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    coffee_string: function coffee_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    coffee_richString: function coffee_richString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsChar')) {if(m = this.coffee_embedding())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    coffee_heredoc: function coffee_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    coffee_richHeredoc: function coffee_richHeredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsChar')) {if(m = this.coffee_embedding())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    coffee_embedding: function coffee_embedding(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsChar')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    coffee_javascript: function coffee_javascript(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '`' && this.hl('`', 'dsAlert;fontStyle:italic')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsAlert;fontStyle:italic');
        }
        this.pop();
    },
    alert_indent_normalText: function alert_indent_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javascript_normal: function javascript_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javascript_objectMember: function javascript_objectMember(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '/' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '*') return this.pop();
            if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    javascript_noRegExp: function javascript_noRegExp(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '*') return this.pop();
            if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    javascript_conditionalExpression: function javascript_conditionalExpression(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javascript_object: function javascript_object(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[a-zA-Z_$][\w$]*\s*(?=:)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javascript_string: function javascript_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    javascript_stringSQ: function javascript_stringSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    javascript_comment: function javascript_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    javascript_multiInlineComment: function javascript_multiInlineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    javascript_regularExpression: function javascript_regularExpression(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\w*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\\[bB]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\\[nrtvfDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsBaseN')) {if(m = this['javascript_(charclassCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[?+*()|]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    javascript_regularExpressionCharacterClass: function javascript_regularExpressionCharacterClass(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[\[\]]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsBaseN')) return this.pop(), 1;
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    'javascript_(regexCaretFirstCheck)': function javascript_regexCaretFirstCheck(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {if(m = this.javascript_regularExpression())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            return this.pop(), m = this.javascript_regularExpression(), m && m-1;
        }
        this.pop();
    },
    'javascript_(charclassCaretFirstCheck)': function javascript_charclassCaretFirstCheck(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {if(m = this.javascript_regularExpressionCharacterClass())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            return this.pop(), m = this.javascript_regularExpressionCharacterClass(), m && m-1;
        }
        this.pop();
    },
    javascript_region_marker: function javascript_region_marker(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    }
};
