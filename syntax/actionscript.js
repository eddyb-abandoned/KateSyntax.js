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
        if((m = /^(?:_accProps|_focusrect|_global|_highquality|_level|_parent|_quality|_root|_soundbuftime|maxscroll|scroll|this)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:asfunction|call|chr|clearInterval|duplicateMovieClip|escape|eval|fscommand|getProperty|getTimer|getURL|getVersion|gotoAndPlay|gotoAndStop|ifFrameLoaded|int|isFinite|isNaN|length|loadMovie|loadMovieNum|loadVariables|loadVariablesNum|mbchr|mblength|mbord|mbsubstring|nextFrame|nextScene|on|onClipEvent|ord|parseFloat|parseInt|play|prevFrame|prevScene|print|printAsBitmap|printAsBitmapNum|printNum|random|removeMovieClip|setInterval|setProperty|showRedrawRegions|startDrag|stop|stopAllSounds|stopDrag|substring|targetPath|tellTarget|toggleHighQuality|trace|typeof|unescape|unloadMovie|unloadMovieNum|updateAfterEvent)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:Accessibility|Accordion|Alert|Binding|Button|Camera|CellRenderer|CheckBox|Collection|Color|ComboBox|ComponentMixins|ContextMenu|ContextMenuItem|CustomActions|CustomFormatter|CustomValidator|DataGrid|DataHolder|DataProvider|DataSet|DataType|Date|DateChooser|DateField|Delta|DeltaItem|DeltaPacket|DepthManager|EndPoint|Error|FaultEvent|FocusManager|Form|Function|Iterator|Key|Label|List|LoadVars|Loader|LocalConnection|Log|Math|Media|Menu|MenuBar|Microphone|Mouse|MovieClip|MovieClipLoader|NetConnection|NetStream|Number|NumericStepper|PendingCall|PopUpManager|PrintJob|ProgressBar|RDBMSResolver|RadioButton|RelayResponder|SOAPCall|Screen|ScrollPane|Selection|SharedObject|Slide|Sound|Stage|StyleManager|System|TextArea|TextField|TextFormat|TextInput|TextSnapshot|TransferObject|Tree|TreeDataProvider|TypedValue|UIComponent|UIEventDispatcher|UIObject|Video|WebService|WebServiceConnector|Window|XML|XMLConnector|XUpdateResolver)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:add|and|break|case|catch|class|continue|default|delete|do|dynamic|else|eq|extends|finally|for|function|ge|get|gt|if|implements|import|in|instanceof|interface|intrinsic|le|lt|ne|new|not|or|private|public|return|set|static|switch|throw|try|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:false|Infinity|-Infinity|NaN|newline|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:Array|Boolean|Number|Object|String|Void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^//\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^//\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\.{3,3}\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(import\s+static)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._staticImports();continue;}
        if((m = /^\b(package|import)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._imports();continue;}
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*(/\*\s*\d+\s*\*/\s*)?[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._member();continue;}
        if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._member = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\b[_a-zA-Z]\w*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._staticImports = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._imports = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
