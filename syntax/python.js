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
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._checkForString();continue;}
        if((m = /^(?:import|from|as)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:class|def|del|global|lambda|nonlocal)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:and|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exec|print)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:assert|break|continue|elif|else|except|finally|for|if|pass|raise|return|try|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:__future__|__import__|__name__|abs|all|any|apply|basestring|bin|bool|buffer|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:None|self|True|False|NotImplemented|Ellipsis|__debug__|__file__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:SIGNAL|SLOT|connect)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:ArithmeticError|AssertionError|AttributeError|BaseException|DeprecationWarning|EnvironmentError|EOFError|Exception|FloatingPointError|FutureWarning|GeneratorExit|IOError|ImportError|ImportWarning|IndexError|KeyError|KeyboardInterrupt|LookupError|MemoryError|NameError|NotImplementedError|OSError|OverflowError|PendingDeprecationWarning|ReferenceError|RuntimeError|RuntimeWarning|StandardError|StopIteration|SyntaxError|SyntaxWarning|SystemError|SystemExit|TypeError|UnboundLocalError|UserWarning|UnicodeError|UnicodeWarning|UnicodeEncodeError|UnicodeDecodeError|UnicodeTranslateError|ValueError|Warning|WindowsError|ZeroDivisionError)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:__new__|__init__|__del__|__repr__|__str__|__lt__|__le__|__eq__|__ne__|__gt__|__ge__|__cmp__|__rcmp__|__hash__|__nonzero__|__unicode__|__getattr__|__setattr__|__delattr__|__getattribute__|__get__|__set__|__delete__|__call__|__len__|__getitem__|__setitem__|__delitem__|__iter__|__reversed__|__contains__|__getslice__|__setslice__|__delslice__|__add__|__sub__|__mul__|__floordiv__|__mod__|__divmod__|__pow__|__lshift__|__rshift__|__and__|__xor__|__or__|__div__|__truediv__|__radd__|__rsub__|__rmul__|__rdiv__|__rtruediv__|__rfloordiv__|__rmod__|__rdivmod__|__rpow__|__rlshift__|__rrshift__|__rand__|__rxor__|__ror__|__iadd__|__isub__|__imul__|__idiv__|__itruediv__|__ifloordiv__|__imod__|__ipow__|__ilshift__|__irshift__|__iand__|__ixor__|__ior__|__neg__|__pos__|__abs__|__invert__|__complex__|__int__|__long__|__float__|__oct__|__hex__|__index__|__coerce__|__enter__|__exit__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^r'''/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleAString();continue;}
        if((m = /^r"""/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleQString();continue;}
        if((m = /^r'/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawAString();continue;}
        if((m = /^r"/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawQString();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._hashComment();continue;}
        if((m = /^u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleAComment();continue;}
        if((m = /^u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleQComment();continue;}
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^u'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if((m = /^u"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == 'u' && this.str[1] == '\'' && this.hl('u\'', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == 'u' && this.str[1] == '"' && this.hl('u"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._parenthesised();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^[+*/%\|=;\!<>!\^&~\-]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^@[_a-zA-Z][\._a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._checkForString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^u'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if((m = /^u"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._parenthesised = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._checkForString();continue;}
        if((m = /^(?:import|from|as)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^(?:class|def|del|global|lambda|nonlocal)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:and|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exec|print)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:assert|break|continue|elif|else|except|finally|for|if|pass|raise|return|try|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:__future__|__import__|__name__|abs|all|any|apply|basestring|bin|bool|buffer|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:None|self|True|False|NotImplemented|Ellipsis|__debug__|__file__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:SIGNAL|SLOT|connect)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:ArithmeticError|AssertionError|AttributeError|BaseException|DeprecationWarning|EnvironmentError|EOFError|Exception|FloatingPointError|FutureWarning|GeneratorExit|IOError|ImportError|ImportWarning|IndexError|KeyError|KeyboardInterrupt|LookupError|MemoryError|NameError|NotImplementedError|OSError|OverflowError|PendingDeprecationWarning|ReferenceError|RuntimeError|RuntimeWarning|StandardError|StopIteration|SyntaxError|SyntaxWarning|SystemError|SystemExit|TypeError|UnboundLocalError|UserWarning|UnicodeError|UnicodeWarning|UnicodeEncodeError|UnicodeDecodeError|UnicodeTranslateError|ValueError|Warning|WindowsError|ZeroDivisionError)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:__new__|__init__|__del__|__repr__|__str__|__lt__|__le__|__eq__|__ne__|__gt__|__ge__|__cmp__|__rcmp__|__hash__|__nonzero__|__unicode__|__getattr__|__setattr__|__delattr__|__getattribute__|__get__|__set__|__delete__|__call__|__len__|__getitem__|__setitem__|__delitem__|__iter__|__reversed__|__contains__|__getslice__|__setslice__|__delslice__|__add__|__sub__|__mul__|__floordiv__|__mod__|__divmod__|__pow__|__lshift__|__rshift__|__and__|__xor__|__or__|__div__|__truediv__|__radd__|__rsub__|__rmul__|__rdiv__|__rtruediv__|__rfloordiv__|__rmod__|__rdivmod__|__rpow__|__rlshift__|__rrshift__|__rand__|__rxor__|__ror__|__iadd__|__isub__|__imul__|__idiv__|__itruediv__|__ifloordiv__|__imod__|__ipow__|__ilshift__|__irshift__|__iand__|__ixor__|__ior__|__neg__|__pos__|__abs__|__invert__|__complex__|__int__|__long__|__float__|__oct__|__hex__|__index__|__coerce__|__enter__|__exit__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^r'''/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleAString();continue;}
        if((m = /^r"""/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawTrippleQString();continue;}
        if((m = /^r'/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawAString();continue;}
        if((m = /^r"/i.exec(this.str)) && this.hl(m[0], 'dsString')) {this._rawQString();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._hashComment();continue;}
        if((m = /^u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleAComment();continue;}
        if((m = /^u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._trippleQComment();continue;}
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^u'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleAString();continue;}
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if((m = /^u"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._trippleQString();continue;}
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == 'u' && this.str[1] == '\'' && this.hl('u\'', 'dsString')) {this._singleAString();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == 'u' && this.str[1] == '"' && this.hl('u"', 'dsString')) {this._singleQString();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._parenthesised();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^[+*/%\|=;\!<>!\^&~\-]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^@[_a-zA-Z][\._a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hashComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._trippleAComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._trippleQComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._singleAComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._singleQComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._stringformat = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._trippleAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawTrippleAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._trippleQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawTrippleQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singleAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singleQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawAString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._rawQString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
