var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._default();
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
HL.prototype._default = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._linecomment();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._multilinecomment();continue;}
        if((m = /^(?:And|ApplyPure|ArrayCreate|ArrayGet|ArraySet|ArraySize|Atom|Berlekamp|BitAnd|BitOr|BitXor|Bodied|CTokenizer|Check|Clear|CommonLispTokenizer|Concat|ConcatStrings|CurrentFile|CurrentLine|CustomEval|CustomEval'Expression|CustomEval'Locals|CustomEval'Result|CustomEval'Stop|DefLoad|DefLoadFunction|DefMacroRuleBase|DefMacroRuleBaseListed|DefaultDirectory|DefaultTokenizer|Delete|DestructiveDelete|DestructiveInsert|DestructiveReplace|DestructiveReverse|DllEnumerate|DllLoad|DllUnload|Equals|Eval|FastArcCos|FastArcSin|FastArcTan|FastAssoc|FastCos|FastExp|FastIsPrime|FastLog|FastPower|FastSin|FastTan|FindFile|FindFunction|FlatCopy|FromBase|FromFile|FromString|FullForm|GarbageCollect|GenericTypeName|GetExtraInfo|GetPrecision|GreaterThan|Head|Hold|HoldArg|If|Infix|Insert|IsAtom|IsBodied|IsBound|IsFunction|IsGeneric|IsInfix|IsInteger|IsList|IsNumber|IsPostfix|IsPrefix|IsString|LazyGlobal|LeftPrecedence|Length|LessThan|LispRead|LispReadListed|List|Listify|Load|Local|LocalSymbols|MacroClear|MacroLocal|MacroRule|MacroRuleBase|MacroRuleBaseListed|MacroRulePattern|MacroSet|MathAbs|MathAdd|MathAnd|MathArcCos|MathArcSin|MathArcTan|MathCeil|MathCos|MathDiv|MathDivide|MathExp|MathFac|MathFloor|MathGcd|MathGetExactBits|MathLibrary|MathLog|MathMod|MathMultiply|MathNot|MathNth|MathOr|MathPi|MathPower|MathSetExactBits|MathSin|MathSqrt|MathSubtract|MathTan|MaxEvalDepth|Not|OpLeftPrecedence|OpPrecedence|OpRightPrecedence|Or|PatchLoad|PatchString|PatternCreate|PatternMatches|Postfix|Precision|Prefix|PrettyPrinter|Prog|Read|ReadToken|Replace|Retract|RightAssociative|RightPrecedence|Rule|RuleBase|RuleBaseArgList|RuleBaseDefined|RuleBaseListed|RulePattern|Secure|Set|SetExtraInfo|SetStringMid|ShiftLeft|ShiftRight|String|StringMid|Subst|SystemCall|Tail|ToBase|ToFile|ToString|TraceRule|TraceStack|Type|UnFence|UnList|Use|Version|While|Write|WriteString|XmlExplodeTag|XmlTokenizer|`|=)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[{[(]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[}\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[+\-*/=`~:!@#$\^&*_|<>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._linecomment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multilinecomment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
