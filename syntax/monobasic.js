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
        if((m = /^(?:Option|Explicit|Strict|Imports|Inherits|As|New|Dim|Redim|Private|Friend|Public|Const|ReadOnly|WriteOnly|Default|Shared|Shadows|Protected|Overloads|Overrides|NotOverridable|NotInheritable|MustInherit|MustOverride|MyBase|MyClass|Me|Delegate|Catch|Finaly|When|Throw|To|Step|Then|Else|True|False|Nothing|Call|ByVal|ByRef|Optional|ParamArray|Return|Declare|WithEvents|Event|RaiseEvent|AddHandler|And|Or|Not|Xor|AndAlso|OrElse|Goto|On|Error|Resume)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Boolean|Char|String|Integer|Long|Double|Object|Exception|Date|DateTime|Int16|Int32|Int64|ParamArray|TimeSpan|Byte|Decimal|IntPtr|Single|Guid)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsComment')) {this._comment();continue;}
        if((m = /^\b(Namespace)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Namespace.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Module)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Module.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Class)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Class.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Interface)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Interface.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Structure)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Structure.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Enum)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Enum.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Property)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Property.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Get)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Get.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Set)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Set.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Sub)([.\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Sub.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^Exit.Sub.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Function)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Function.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^Exit.Function.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Try)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Try.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(If)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.If.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^Select.Case.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.Select.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(For)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Next)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Do)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(Loop)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(While)([\s]|$)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^End.While.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^Exit.While.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^#Region.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^#End.Region.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^#If.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^#End.If.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
