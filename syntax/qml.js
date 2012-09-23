KateSyntax.langs.qml.syntax = {
    default: 'qml_normal',
    qml_normal: function qml_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^import\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.qml_import())return this.pop(), m-1;continue;}
            if((m = /^(?:State|PropertyChanges|StateGroup|ParentChange|StateChangeScript|AnchorChanges|PropertyAnimation|NumberAnimation|ColorAnimation|SequentialAnimation|ParallelAnimation|PauseAnimation|PropertyAction|ParentAction|ScriptAction|Transition|SpringFollow|EaseFollow|Behavior|Binding|ListModel|ListElement|VisualItemModel|XmlListModel|XmlRole|DateTimeFormatter|NumberFormatter|Script|Connections|Component|Timer|QtObject|Item|Rectangle|Image|BorderImage|Text|TextInput|TextEdit|MouseArea|FocusScope|Flickable|Flipable|WebView|Loader|Repeater|SystemPalette|GraphicsObjectContainer|LayoutItem|ListView|GridView|PathView|Path|PathLine|PathQuad|PathCubic|PathAttribute|PathPercent|Column|Row|Grid|Scale|Rotation|Blur|Colorize|DropShadow|Opacity|Particles|ParticleMotionLinear|ParticleMotionGravity|ParticleMotionWander|Gradient|GradientStop|MouseRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^signal\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0095ff')) {if(m = this.qml_signal())return this.pop(), m-1;continue;}
            if((m = /^default property\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.qml_property())return this.pop(), m-1;continue;}
            if((m = /^property\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.qml_property())return this.pop(), m-1;continue;}
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
    qml_import: function qml_import(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    qml_property: function qml_property(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^alias\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:string|int|bool|date|color|url|real|double|var|variant)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsNormal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    qml_signal: function qml_signal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.qml_signalParameter())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    qml_signalParameter: function qml_signalParameter(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:string|int|bool|date|color|url|real|double|var|variant)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[)]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
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
