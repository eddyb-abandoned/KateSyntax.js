KateSyntax.langs.yacas.syntax = {
    default: 'yacas_default',
    yacas_default: function yacas_default(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.yacas_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.yacas_linecomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.yacas_multilinecomment())return this.pop(), m-1;continue;}
            if((m = /^(?:And|ApplyPure|ArrayCreate|ArrayGet|ArraySet|ArraySize|Atom|Berlekamp|BitAnd|BitOr|BitXor|Bodied|CTokenizer|Check|Clear|CommonLispTokenizer|Concat|ConcatStrings|CurrentFile|CurrentLine|CustomEval|CustomEval'Expression|CustomEval'Locals|CustomEval'Result|CustomEval'Stop|DefLoad|DefLoadFunction|DefMacroRuleBase|DefMacroRuleBaseListed|DefaultDirectory|DefaultTokenizer|Delete|DestructiveDelete|DestructiveInsert|DestructiveReplace|DestructiveReverse|DllEnumerate|DllLoad|DllUnload|Equals|Eval|FastArcCos|FastArcSin|FastArcTan|FastAssoc|FastCos|FastExp|FastIsPrime|FastLog|FastPower|FastSin|FastTan|FindFile|FindFunction|FlatCopy|FromBase|FromFile|FromString|FullForm|GarbageCollect|GenericTypeName|GetExtraInfo|GetPrecision|GreaterThan|Head|Hold|HoldArg|If|Infix|Insert|IsAtom|IsBodied|IsBound|IsFunction|IsGeneric|IsInfix|IsInteger|IsList|IsNumber|IsPostfix|IsPrefix|IsString|LazyGlobal|LeftPrecedence|Length|LessThan|LispRead|LispReadListed|List|Listify|Load|Local|LocalSymbols|MacroClear|MacroLocal|MacroRule|MacroRuleBase|MacroRuleBaseListed|MacroRulePattern|MacroSet|MathAbs|MathAdd|MathAnd|MathArcCos|MathArcSin|MathArcTan|MathCeil|MathCos|MathDiv|MathDivide|MathExp|MathFac|MathFloor|MathGcd|MathGetExactBits|MathLibrary|MathLog|MathMod|MathMultiply|MathNot|MathNth|MathOr|MathPi|MathPower|MathSetExactBits|MathSin|MathSqrt|MathSubtract|MathTan|MaxEvalDepth|Not|OpLeftPrecedence|OpPrecedence|OpRightPrecedence|Or|PatchLoad|PatchString|PatternCreate|PatternMatches|Postfix|Precision|Prefix|PrettyPrinter|Prog|Read|ReadToken|Replace|Retract|RightAssociative|RightPrecedence|Rule|RuleBase|RuleBaseArgList|RuleBaseDefined|RuleBaseListed|RulePattern|Secure|Set|SetExtraInfo|SetStringMid|ShiftLeft|ShiftRight|String|StringMid|Subst|SystemCall|Tail|ToBase|ToFile|ToString|TraceRule|TraceStack|Type|UnFence|UnList|Use|Version|While|Write|WriteString|XmlExplodeTag|XmlTokenizer|`|=)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[{[(]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[}\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[+\-*/=`~:!@#$\^&*_|<>]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yacas_string: function yacas_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    yacas_linecomment: function yacas_linecomment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    yacas_multilinecomment: function yacas_multilinecomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(FIXME|TODO)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
