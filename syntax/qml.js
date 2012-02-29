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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^import\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._import();continue;}
        if((m = /^(?:State|PropertyChanges|StateGroup|ParentChange|StateChangeScript|AnchorChanges|PropertyAnimation|NumberAnimation|ColorAnimation|SequentialAnimation|ParallelAnimation|PauseAnimation|PropertyAction|ParentAction|ScriptAction|Transition|SpringFollow|EaseFollow|Behavior|Binding|ListModel|ListElement|VisualItemModel|XmlListModel|XmlRole|DateTimeFormatter|NumberFormatter|Script|Connections|Component|Timer|QtObject|Item|Rectangle|Image|BorderImage|Text|TextInput|TextEdit|MouseArea|FocusScope|Flickable|Flipable|WebView|Loader|Repeater|SystemPalette|GraphicsObjectContainer|LayoutItem|ListView|GridView|PathView|Path|PathLine|PathQuad|PathCubic|PathAttribute|PathPercent|Column|Row|Grid|Scale|Rotation|Blur|Colorize|DropShadow|Opacity|Particles|ParticleMotionLinear|ParticleMotionGravity|ParticleMotionWander|Gradient|GradientStop|MouseRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^signal\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._signal();continue;}
        if((m = /^default property\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._property();continue;}
        if((m = /^property\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._property();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._import = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._property = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^alias\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:string|int|bool|date|color|url|real|double|var|variant)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._signal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._signalParameter();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._signalParameter = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:string|int|bool|date|color|url|real|double|var|variant)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[)]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
