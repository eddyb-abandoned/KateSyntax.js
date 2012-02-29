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
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string_1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_2();continue;}
        if((m = /^\binteger[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\breal[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\bcomplex[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\bend\s*type\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:double|precision|parameter|save|pointer|public|private|target|allocatable|optional|sequence)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*data\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*real\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._find_paren();continue;}
        if((m = /^^\s*real(?![\w\*])/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\bcharacter[*][0-9]+\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._find_paren();continue;}
        if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '::' && this.hl('::', 'dsDataType')) continue;
        if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(read|write|backspace|rewind|end\s*file|close)\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._find_io_paren();continue;}
        if((m = /^\bopen\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._find_io_paren();continue;}
        if((m = /^\binquire\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._find_io_paren();continue;}
        if((m = /^\bformat\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._format_stmnt();continue;}
        if((m = /^\bend\s*file\b/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:access|backspace|close|inquire|open|print|read|rewind|write|format)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\.(true|false)\./i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\.[A-Za-z]+\./.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(==|/=|<|<=|>|>=)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^(#|cDEC\$|CDEC\$).*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^[cC\*].*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^!.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '**' && this.hl('**', 'dsKeyword')) continue;
        if(this.str[0] == '(/' && this.hl('(/', 'dsKeyword')) continue;
        if(this.str[0] == '/)' && this.hl('/)', 'dsKeyword')) continue;
        if((m = /^[&+\-*/=?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[(),]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\bmodule\s+procedure\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(subroutine|function|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(program|module|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(then|do)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s*(subroutine|function|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s*(program|module)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s*(do|if)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s*(select|where|forall|interface)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belse\s*if\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belse\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcontains\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(#|cDEC\$|CDEC\$).*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_op_and_log = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\.(true|false)\./i.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^\.[A-Za-z]+\./.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(==|/=|<|<=|>|>=)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_comments = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[cC\*].*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^!.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_symbols = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '**' && this.hl('**', 'dsKeyword')) continue;
        if(this.str[0] == '(/' && this.hl('(/', 'dsKeyword')) continue;
        if(this.str[0] == '/)' && this.hl('/)', 'dsKeyword')) continue;
        if((m = /^[&+\-*/=?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[(),]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._inside_func_paren = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._inside_func_paren();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string_1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_2();continue;}
        if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_io_stmnts = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\b(read|write|backspace|rewind|end\s*file|close)\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._find_io_paren();continue;}
        if((m = /^\bopen\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._find_io_paren();continue;}
        if((m = /^\binquire\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._find_io_paren();continue;}
        if((m = /^\bformat\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._format_stmnt();continue;}
        if((m = /^\bend\s*file\b/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:access|backspace|close|inquire|open|print|read|rewind|write|format)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_io_paren = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.hl('*', 'dsFunction')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._inside_func_paren();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsFunction')) return;
        if((m = /^(?:unit|end|err|fmt|iostat|status|advance|size|eor)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:unit|iostat|err|file|exist|opened|number|named|name|access|sequential|direct|form|formatted|unformatted|recl|nextrec|blank|position|action|read|write|readwrite|delim|pad)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:unit|iostat|err|file|status|access|form|recl|blank|position|action|delim|pad)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string_1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_2();continue;}
        if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '**' && this.hl('**', 'dsKeyword')) continue;
        if(this.str[0] == '(/' && this.hl('(/', 'dsKeyword')) continue;
        if(this.str[0] == '/)' && this.hl('/)', 'dsKeyword')) continue;
        if((m = /^[&+\-*/=?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[(),]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._format_stmnt = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsFunction')) {this._format_stmnt();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsFunction')) return;
        if((m = /^[0-9]*//i.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[:]/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string_1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_2();continue;}
        if(this.str[0] == '**' && this.hl('**', 'dsKeyword')) continue;
        if(this.str[0] == '(/' && this.hl('(/', 'dsKeyword')) continue;
        if(this.str[0] == '/)' && this.hl('/)', 'dsKeyword')) continue;
        if((m = /^[&+\-*/=?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[(),]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_begin_stmnts = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\bmodule\s+procedure\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(subroutine|function|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(program|module|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(then|do)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_end_stmnts = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\bend\s*(subroutine|function|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s*(program|module)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s*(do|if)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s*(select|where|forall|interface)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belse\s*if\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_mid_stmnts = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\belse\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bcontains\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_decls = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\binteger[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\breal[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\bcomplex[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\bend\s*type\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:double|precision|parameter|save|pointer|public|private|target|allocatable|optional|sequence)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*data\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^^\s*real\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._find_paren();continue;}
        if((m = /^^\s*real(?![\w\*])/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\bcharacter[*][0-9]+\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._find_paren();continue;}
        if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '::' && this.hl('::', 'dsDataType')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_paren = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsDataType')) {this._find_paren();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsDataType')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._find_intrinsics = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_numbers = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._find_strings = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string_1();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string_2();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^']*'/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^&\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._end_of_string();continue;}
        if((m = /^.*(?=&\s*$)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._end_of_string();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string_2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^&\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._end_of_string();continue;}
        if((m = /^.*(?=&\s*$)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._end_of_string();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._end_of_string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^&\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsKeyword')) return;
        if((m = /^(!.*)?(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
