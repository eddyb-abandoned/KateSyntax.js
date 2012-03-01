var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._code();
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
HL.prototype._code = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\{-#.*#-\}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\{-[^#]?/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comments();continue;}
        if((m = /^--[^\-!#\$%&\*\+/<=>\?\@\^\|~\.:].*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._comment();continue;}
        if((m = /^(?:as|case|class|data|deriving|do|else|hiding|if|import|in|infixl|infixr|instance|let|module|newtype|of|primitive|qualified|then|type|where)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:FilePath|IOError|abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:Bool|Char|Double|Either|FilePath|Float|Int|Integer|IO|IOError|Maybe|Ordering|Ratio|Rational|ReadS|ShowS|String|ByteString)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:False|True|Left|Right|Just|Nothing|EQ|LT|GT)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Bounded|Enum|Eq|Floating|Fractional|Functor|Integral|Ix|Monad|Num|Ord|Read|Real|RealFloat|RealFrac|Show)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(::|=>|\->|<\-)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[∷⇒→←∀∃]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s*[a-z][a-zA-Z0-9_']*\s*(?=::[^\-!#\$%&\*\+/<=>\?\@\^\|~\.:])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\s*(\([\-!#\$%&\*\+/<=>\?\@\^\|~\.:]*\))*\s*(?=::[^\-!#\$%&\*\+/<=>\?\@\^\|~\.:])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^([A-Z][a-zA-Z0-9_']*\.)*[a-z][a-zA-Z0-9_']*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^([A-Z][a-zA-Z0-0_']*\.)*[\-!#\$%&\*\+/<=>\?\@\^\|~\.:]+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^([A-Z][a-zA-Z0-9_']*\.)*[A-Z][a-zA-Z0-9_']*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) {this._char();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsOthers')) {this._infix();continue;}
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsOthers')) continue;
        if((m = /^[‥]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comments = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '-' && this.str[1] == '}' && this.hl('-}', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._char = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '\'' && this.hl('\'', 'dsChar')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._infix = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '`' && this.hl('`', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
