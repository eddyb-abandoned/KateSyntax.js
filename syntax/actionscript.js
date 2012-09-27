KateSyntax.langs.actionscript.syntax = {
    default: 'actionscript_normal',
    actionscript_normal: function actionscript_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\*\*\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) continue;
            if((m = /^\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocFSar())return this.pop(), m-1;continue;}
            if((m = /^(?:_accProps|_focusrect|_global|_highquality|_level|_parent|_quality|_root|_soundbuftime|maxscroll|scroll|this)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000033;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:asfunction|call|chr|clearInterval|duplicateMovieClip|escape|eval|fscommand|getProperty|getTimer|getURL|getVersion|gotoAndPlay|gotoAndStop|ifFrameLoaded|int|isFinite|isNaN|length|loadMovie|loadMovieNum|loadVariables|loadVariablesNum|mbchr|mblength|mbord|mbsubstring|nextFrame|nextScene|on|onClipEvent|ord|parseFloat|parseInt|play|prevFrame|prevScene|print|printAsBitmap|printAsBitmapNum|printNum|random|removeMovieClip|setInterval|setProperty|showRedrawRegions|startDrag|stop|stopAllSounds|stopDrag|substring|targetPath|tellTarget|toggleHighQuality|trace|typeof|unescape|unloadMovie|unloadMovieNum|updateAfterEvent)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#006666;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:Accessibility|Accordion|Alert|Binding|Button|Camera|CellRenderer|CheckBox|Collection|Color|ComboBox|ComponentMixins|ContextMenu|ContextMenuItem|CustomActions|CustomFormatter|CustomValidator|DataGrid|DataHolder|DataProvider|DataSet|DataType|Date|DateChooser|DateField|Delta|DeltaItem|DeltaPacket|DepthManager|EndPoint|Error|FaultEvent|FocusManager|Form|Function|Iterator|Key|Label|List|LoadVars|Loader|LocalConnection|Log|Math|Media|Menu|MenuBar|Microphone|Mouse|MovieClip|MovieClipLoader|NetConnection|NetStream|Number|NumericStepper|PendingCall|PopUpManager|PrintJob|ProgressBar|RDBMSResolver|RadioButton|RelayResponder|SOAPCall|Screen|ScrollPane|Selection|SharedObject|Slide|Sound|Stage|StyleManager|System|TextArea|TextField|TextFormat|TextInput|TextSnapshot|TransferObject|Tree|TreeDataProvider|TypedValue|UIComponent|UIEventDispatcher|UIObject|Video|WebService|WebServiceConnector|Window|XML|XMLConnector|XUpdateResolver)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#660066;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:add|and|break|case|catch|class|continue|default|delete|do|dynamic|else|eq|extends|finally|for|function|ge|get|gt|if|implements|import|in|instanceof|interface|intrinsic|le|lt|ne|new|not|or|private|public|return|set|static|switch|throw|try|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:false|Infinity|-Infinity|NaN|newline|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#003300;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:Array|Boolean|Number|Object|String|Void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\/\/\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\/\/\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.actionscript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.actionscript_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.actionscript_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^\.{3,3}\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(import\s+static)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.actionscript_staticImports())return this.pop(), m-1;continue;}
            if((m = /^\b(package|import)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.actionscript_imports())return this.pop(), m-1;continue;}
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*(\/\*\s*\d+\s*\*\/\s*)?[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.actionscript_member())return this.pop(), m-1;continue;}
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    actionscript_string: function actionscript_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    actionscript_member: function actionscript_member(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b[_a-zA-Z]\w*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    actionscript_staticImports: function actionscript_staticImports(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*.*(?=$|\n)/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsKeyword;color:#800080;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    actionscript_imports: function actionscript_imports(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*.*(?=$|\n)/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsKeyword;color:#808000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    actionscript_commentar1: function actionscript_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    actionscript_commentar2: function actionscript_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    javadoc_start: function javadoc_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\*\*\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) continue;
            if((m = /^\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocFSar())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javadoc_findJavadoc: function javadoc_findJavadoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\*\*\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) continue;
            if((m = /^\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocFSar())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javadoc_javadocFSar: function javadoc_javadocFSar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^(!|\?)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^(\.\s*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^(\.\s)(?![\da-z])/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^\**\s*(?=@(author|deprecated|exception|param|return|see|serial|serialData|serialField|since|throws|version)(\s|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^\{@code /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@code    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@docRoot\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{@inheritDoc\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{@link /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@link    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{@value /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) {if(m = this.html_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold');
        }
        this.pop();
    },
    javadoc_javadocar: function javadoc_javadocar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;font-style:normal;font-weight:bold')) return this.pop(), 1;
            if((m = /^\*+(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;font-style:normal;font-weight:bold')) continue;
            if((m = /^@author /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@deprecated /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@exception /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@param /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@return /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@see /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_seeTag())return this.pop(), m-1;continue;}
            if((m = /^@serial /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@serialData /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@serialField /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@since /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@throws /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@version /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@author    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@deprecated    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@exception    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@param    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@return    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@see    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_seeTag())return this.pop(), m-1;continue;}
            if((m = /^@serial    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@serialData    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@serialField    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@since    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^@throws    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@version    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:bold')) continue;
            if((m = /^\{@code /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@code    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@docRoot\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{@inheritDoc\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{@link /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@link    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{@value /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) {if(m = this.html_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsComment;color:#008000');
        }
        this.pop();
    },
    javadoc_javadocParam: function javadoc_javadocParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000')) continue;
            if((m = /^\S*(?=\*\/)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;font-style:italic;font-weight:normal')) return this.pop(), 1;
            if((m = /^\S*(\s|(?=$|\n))/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsKeyword;color:#008080;font-style:italic;font-weight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#008000');
        }
        this.pop();
    },
    javadoc_inlineTagar: function javadoc_inlineTagar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;font-style:normal;font-weight:bold')) return this.pop(), 2;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) {if(m = this.html_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    javadoc_literalTagar: function javadoc_literalTagar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#808080;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;font-style:normal;font-weight:bold')) return this.pop(), 2;
            this.hl(this.str[0], 'dsKeyword;color:#808080;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    javadoc_seeTag: function javadoc_seeTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;font-style:normal;font-weight:bold')) return this.pop(), 2;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) {if(m = this.html_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsKeyword;color:#008080;font-style:italic;font-weight:normal');
        }
        this.pop();
    }
};
