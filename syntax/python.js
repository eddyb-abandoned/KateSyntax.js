KateSyntax.langs.python.syntax = {
    default: 'python_normal',
    python_normal: function python_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.python_checkForString())return this.pop(), m-1;continue;}
            if((m = /^(?:import|from|as)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(?:class|def|del|global|lambda|nonlocal)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:and|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-weight:bold')) continue;
            if((m = /^(?:exec|print)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:assert|break|continue|elif|else|except|finally|for|if|pass|raise|return|try|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:__future__|__import__|__name__|abs|all|any|apply|basestring|bin|bool|buffer|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:None|self|True|False|NotImplemented|Ellipsis|__debug__|__file__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:SIGNAL|SLOT|connect)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:ArithmeticError|AssertionError|AttributeError|BaseException|DeprecationWarning|EnvironmentError|EOFError|Exception|FloatingPointError|FutureWarning|GeneratorExit|IOError|ImportError|ImportWarning|IndexError|KeyError|KeyboardInterrupt|LookupError|MemoryError|NameError|NotImplementedError|OSError|OverflowError|PendingDeprecationWarning|ReferenceError|RuntimeError|RuntimeWarning|StandardError|StopIteration|SyntaxError|SyntaxWarning|SystemError|SystemExit|TypeError|UnboundLocalError|UserWarning|UnicodeError|UnicodeWarning|UnicodeEncodeError|UnicodeDecodeError|UnicodeTranslateError|ValueError|Warning|WindowsError|ZeroDivisionError)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#054d00;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:__new__|__init__|__del__|__repr__|__str__|__lt__|__le__|__eq__|__ne__|__gt__|__ge__|__cmp__|__rcmp__|__hash__|__nonzero__|__unicode__|__getattr__|__setattr__|__delattr__|__getattribute__|__get__|__set__|__delete__|__call__|__len__|__getitem__|__setitem__|__delitem__|__iter__|__reversed__|__contains__|__getslice__|__setslice__|__delslice__|__add__|__sub__|__mul__|__floordiv__|__mod__|__divmod__|__pow__|__lshift__|__rshift__|__and__|__xor__|__or__|__div__|__truediv__|__radd__|__rsub__|__rmul__|__rdiv__|__rtruediv__|__rfloordiv__|__rmod__|__rdivmod__|__rpow__|__rlshift__|__rrshift__|__rand__|__rxor__|__ror__|__iadd__|__isub__|__imul__|__idiv__|__itruediv__|__ifloordiv__|__imod__|__ipow__|__ilshift__|__irshift__|__iand__|__ixor__|__ior__|__neg__|__pos__|__abs__|__invert__|__complex__|__int__|__long__|__float__|__oct__|__hex__|__index__|__coerce__|__enter__|__exit__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#000e52;font-style:normal;font-weight:bold')) continue;
            if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^r'''/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawTrippleAString())return this.pop(), m-1;continue;}
            if((m = /^r"""/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawTrippleQString())return this.pop(), m-1;continue;}
            if((m = /^r'/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawAString())return this.pop(), m-1;continue;}
            if((m = /^r"/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.python_hashComment())return this.pop(), m-1;continue;}
            if((m = /^u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.python_trippleAComment())return this.pop(), m-1;continue;}
            if((m = /^u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.python_trippleQComment())return this.pop(), m-1;continue;}
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^u'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleQString())return this.pop(), m-1;continue;}
            if((m = /^u"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.python_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'u' && this.str[1] == '\'' && this.hl('u\'', 'dsString')) {if(m = this.python_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.python_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'u' && this.str[1] == '"' && this.hl('u"', 'dsString')) {if(m = this.python_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.python_parenthesised())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if((m = /^[+*/%\\|=;\\!<>!\^&~\-]/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-weight:bold')) continue;
            if((m = /^@[_a-zA-Z][\._a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#8f6b32;font-style:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    python_checkForString: function python_checkForString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^u'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleQString())return this.pop(), m-1;continue;}
            if((m = /^u"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleQString())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    python_parenthesised: function python_parenthesised(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.python_checkForString())return this.pop(), m-1;continue;}
            if((m = /^(?:import|from|as)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(?:class|def|del|global|lambda|nonlocal)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:and|in|is|not|or)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-weight:bold')) continue;
            if((m = /^(?:exec|print)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:assert|break|continue|elif|else|except|finally|for|if|pass|raise|return|try|while|with|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:__future__|__import__|__name__|abs|all|any|apply|basestring|bin|bool|buffer|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:None|self|True|False|NotImplemented|Ellipsis|__debug__|__file__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:SIGNAL|SLOT|connect)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0095ff;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:ArithmeticError|AssertionError|AttributeError|BaseException|DeprecationWarning|EnvironmentError|EOFError|Exception|FloatingPointError|FutureWarning|GeneratorExit|IOError|ImportError|ImportWarning|IndexError|KeyError|KeyboardInterrupt|LookupError|MemoryError|NameError|NotImplementedError|OSError|OverflowError|PendingDeprecationWarning|ReferenceError|RuntimeError|RuntimeWarning|StandardError|StopIteration|SyntaxError|SyntaxWarning|SystemError|SystemExit|TypeError|UnboundLocalError|UserWarning|UnicodeError|UnicodeWarning|UnicodeEncodeError|UnicodeDecodeError|UnicodeTranslateError|ValueError|Warning|WindowsError|ZeroDivisionError)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#054d00;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:__new__|__init__|__del__|__repr__|__str__|__lt__|__le__|__eq__|__ne__|__gt__|__ge__|__cmp__|__rcmp__|__hash__|__nonzero__|__unicode__|__getattr__|__setattr__|__delattr__|__getattribute__|__get__|__set__|__delete__|__call__|__len__|__getitem__|__setitem__|__delitem__|__iter__|__reversed__|__contains__|__getslice__|__setslice__|__delslice__|__add__|__sub__|__mul__|__floordiv__|__mod__|__divmod__|__pow__|__lshift__|__rshift__|__and__|__xor__|__or__|__div__|__truediv__|__radd__|__rsub__|__rmul__|__rdiv__|__rtruediv__|__rfloordiv__|__rmod__|__rdivmod__|__rpow__|__rlshift__|__rrshift__|__rand__|__rxor__|__ror__|__iadd__|__isub__|__imul__|__idiv__|__itruediv__|__ifloordiv__|__imod__|__ipow__|__ilshift__|__irshift__|__iand__|__ixor__|__ior__|__neg__|__pos__|__abs__|__invert__|__complex__|__int__|__long__|__float__|__oct__|__hex__|__index__|__coerce__|__enter__|__exit__)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#000e52;font-style:normal;font-weight:bold')) continue;
            if((m = /^[a-zA-Z_][a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^ ((([0-9]*\.[0-9]+|[0-9]+\.)|([0-9]+|([0-9]*\.[0-9]+|[0-9]+\.))[eE](\+|-)?[0-9]+)|[0-9]+)[jJ]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^r'''/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawTrippleAString())return this.pop(), m-1;continue;}
            if((m = /^r"""/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawTrippleQString())return this.pop(), m-1;continue;}
            if((m = /^r'/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawAString())return this.pop(), m-1;continue;}
            if((m = /^r"/i.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_rawQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.python_hashComment())return this.pop(), m-1;continue;}
            if((m = /^u?'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.python_trippleAComment())return this.pop(), m-1;continue;}
            if((m = /^u?"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.python_trippleQComment())return this.pop(), m-1;continue;}
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^u'''/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleAString())return this.pop(), m-1;continue;}
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleQString())return this.pop(), m-1;continue;}
            if((m = /^u"""/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.python_trippleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.python_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'u' && this.str[1] == '\'' && this.hl('u\'', 'dsString')) {if(m = this.python_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.python_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == 'u' && this.str[1] == '"' && this.hl('u"', 'dsString')) {if(m = this.python_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.python_parenthesised())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if((m = /^[+*/%\\|=;\\!<>!\^&~\-]/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-weight:bold')) continue;
            if((m = /^@[_a-zA-Z][\._a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#8f6b32;font-style:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    python_hashComment: function python_hashComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    python_trippleAComment: function python_trippleAComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    python_trippleQComment: function python_trippleQComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    python_singleAComment: function python_singleAComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    python_singleQComment: function python_singleQComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    python_stringformat: function python_stringformat(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            this.hl(this.str[0], 'dsOthers;color:#0057ae');
        }
        this.pop();
    },
    python_trippleAString: function python_trippleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    python_rawTrippleAString: function python_rawTrippleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if((m = /^'''/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    python_trippleQString: function python_trippleQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    python_rawTrippleQString: function python_rawTrippleQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if((m = /^"""/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    python_singleAString: function python_singleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    python_singleQString: function python_singleQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    python_rawAString: function python_rawAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    python_rawQString: function python_rawQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^%((\([a-zA-Z0-9_]+\))?[#0\- +]?([1-9][0-9]*|\*)?(\.([1-9][0-9]*|\*))?[hlL]?[crsdiouxXeEfFgG%]|prog|default)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0057ae')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
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
    }
};
