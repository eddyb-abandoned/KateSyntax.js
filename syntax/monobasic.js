KateSyntax.langs.monobasic.syntax = {
    default: 'monobasic_normal',
    monobasic_normal: function monobasic_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:Option|Explicit|Strict|Imports|Inherits|As|New|Dim|Redim|Private|Friend|Public|Const|ReadOnly|WriteOnly|Default|Shared|Shadows|Protected|Overloads|Overrides|NotOverridable|NotInheritable|MustInherit|MustOverride|MyBase|MyClass|Me|Delegate|Catch|Finaly|When|Throw|To|Step|Then|Else|True|False|Nothing|Call|ByVal|ByRef|Optional|ParamArray|Return|Declare|WithEvents|Event|RaiseEvent|AddHandler|And|Or|Not|Xor|AndAlso|OrElse|Goto|On|Error|Resume)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^(?:Boolean|Char|String|Integer|Long|Double|Object|Exception|Date|DateTime|Int16|Int32|Int64|ParamArray|TimeSpan|Byte|Decimal|IntPtr|Single|Guid)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#000080;font-weight:normal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000')) {if(m = this.monobasic_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment;color:#008000')) {if(m = this.monobasic_comment())return this.pop(), m-1;continue;}
            if((m = /^\b(Namespace)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Namespace.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Module)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Module.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Class)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Class.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Interface)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Interface.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Structure)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Structure.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Enum)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Enum.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Property)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Property.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Get)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Get.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Set)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Set.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Sub)([.\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Sub.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^Exit.Sub.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Function)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Function.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^Exit.Function.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Try)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Try.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(If)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.If.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^Select.Case.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.Select.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(For)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Next)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Do)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(Loop)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^\b(While)([\s]|(?=$|\n))/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^End.While.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^Exit.While.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000080;font-weight:normal')) continue;
            if((m = /^#Region.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#008000')) continue;
            if((m = /^#End.Region.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#008000')) continue;
            if((m = /^#If.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#008000')) continue;
            if((m = /^#End.If.*(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#008000')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    monobasic_string: function monobasic_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString;color:#800000')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#800000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#800000')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#800000');
        }
        this.pop();
    },
    monobasic_comment: function monobasic_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#008000');
        }
        this.pop();
    }
};
