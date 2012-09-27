KateSyntax.langs.fortran.syntax = {
    default: 'fortran_default',
    fortran_default: function fortran_default(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.fortran_string_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fortran_string_2())return this.pop(), m-1;continue;}
            if((m = /^\binteger[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\breal[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\bcomplex[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\bend\s*type\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:double|precision|parameter|save|pointer|public|private|target|allocatable|optional|sequence)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*data\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*real\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.fortran_find_paren())return this.pop(), m-1;continue;}
            if((m = /^\s*real(?![\w\*])/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\bcharacter[*][0-9]+\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.fortran_find_paren())return this.pop(), m-1;continue;}
            if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsDataType')) continue;
            if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#000060;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^\b(read|write|backspace|rewind|end\s*file|close)\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_find_io_paren())return this.pop(), m-1;continue;}
            if((m = /^\bopen\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_find_io_paren())return this.pop(), m-1;continue;}
            if((m = /^\binquire\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_find_io_paren())return this.pop(), m-1;continue;}
            if((m = /^\bformat\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_format_stmnt())return this.pop(), m-1;continue;}
            if((m = /^\bend\s*file\b/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:access|backspace|close|inquire|open|print|read|rewind|write|format)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if((m = /^\.(true|false)\./i.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#800080;font-style:normal;font-weight:bold')) continue;
            if((m = /^\.[A-Za-z]+\./.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000;font-style:normal;font-weight:bold')) continue;
            if((m = /^(==|\/=|<|<=|>|>=)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000;font-style:normal;font-weight:bold')) continue;
            if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.col === 0 && (m = /^(#|cDEC\$|CDEC\$).*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.col === 0 && (m = /^[cC\*].*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^!.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '*' && this.hl('**', 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.str[1] == '/' && this.hl('(/', 'dsKeyword')) continue;
            if(this.str[0] == '/' && this.str[1] == ')' && this.hl('/)', 'dsKeyword')) continue;
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
        this.pop();
    },
    fortran_find_preprocessor: function fortran_find_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^(#|cDEC\$|CDEC\$).*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_op_and_log: function fortran_find_op_and_log(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\.(true|false)\./i.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#800080;font-style:normal;font-weight:bold')) continue;
            if((m = /^\.[A-Za-z]+\./.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000;font-style:normal;font-weight:bold')) continue;
            if((m = /^(==|\/=|<|<=|>|>=)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008000;font-style:normal;font-weight:bold')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_comments: function fortran_find_comments(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^[cC\*].*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^!.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_symbols: function fortran_find_symbols(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '*' && this.hl('**', 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.str[1] == '/' && this.hl('(/', 'dsKeyword')) continue;
            if(this.str[0] == '/' && this.str[1] == ')' && this.hl('/)', 'dsKeyword')) continue;
            if((m = /^[&+\-*/=?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[(),]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_inside_func_paren: function fortran_inside_func_paren(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.fortran_inside_func_paren())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.fortran_string_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fortran_string_2())return this.pop(), m-1;continue;}
            if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#000060;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_io_stmnts: function fortran_find_io_stmnts(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b(read|write|backspace|rewind|end\s*file|close)\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_find_io_paren())return this.pop(), m-1;continue;}
            if((m = /^\bopen\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_find_io_paren())return this.pop(), m-1;continue;}
            if((m = /^\binquire\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_find_io_paren())return this.pop(), m-1;continue;}
            if((m = /^\bformat\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_format_stmnt())return this.pop(), m-1;continue;}
            if((m = /^\bend\s*file\b/i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:access|backspace|close|inquire|open|print|read|rewind|write|format)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_io_paren: function fortran_find_io_paren(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.hl('*', 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {if(m = this.fortran_inside_func_paren())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^(?:unit|end|err|fmt|iostat|status|advance|size|eor)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:unit|iostat|err|file|exist|opened|number|named|name|access|sequential|direct|form|formatted|unformatted|recl|nextrec|blank|position|action|read|write|readwrite|delim|pad)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:unit|iostat|err|file|status|access|form|recl|blank|position|action|delim|pad)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.fortran_string_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fortran_string_2())return this.pop(), m-1;continue;}
            if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#000060;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '*' && this.str[1] == '*' && this.hl('**', 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.str[1] == '/' && this.hl('(/', 'dsKeyword')) continue;
            if(this.str[0] == '/' && this.str[1] == ')' && this.hl('/)', 'dsKeyword')) continue;
            if((m = /^[&+\-*/=?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[(),]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_format_stmnt: function fortran_format_stmnt(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) {if(m = this.fortran_format_stmnt())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^[0-9]*\//i.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if((m = /^[:]/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#006060;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.fortran_string_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fortran_string_2())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.str[1] == '*' && this.hl('**', 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.str[1] == '/' && this.hl('(/', 'dsKeyword')) continue;
            if(this.str[0] == '/' && this.str[1] == ')' && this.hl('/)', 'dsKeyword')) continue;
            if((m = /^[&+\-*/=?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[(),]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_begin_stmnts: function fortran_find_begin_stmnts(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\bmodule\s+procedure\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(subroutine|function|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(program|module|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(then|do)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_end_stmnts: function fortran_find_end_stmnts(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\bend\s*(subroutine|function|block\s*data)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s*(program|module)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s*(do|if)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\s*(select|where|forall|interface)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belse\s*if\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_mid_stmnts: function fortran_find_mid_stmnts(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\belse\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcontains\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_decls: function fortran_find_decls(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\binteger[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\breal[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\bcomplex[\*]\d{1,2}/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\bend\s*type\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:double|precision|parameter|save|pointer|public|private|target|allocatable|optional|sequence)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*data\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*real\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.fortran_find_paren())return this.pop(), m-1;continue;}
            if((m = /^\s*real(?![\w\*])/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\bcharacter[*][0-9]+\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b\s*[(]/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.fortran_find_paren())return this.pop(), m-1;continue;}
            if((m = /^\b(type|integer|complex|character|logical|intent|dimension)\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_paren: function fortran_find_paren(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsDataType')) {if(m = this.fortran_find_paren())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsDataType')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    fortran_find_intrinsics: function fortran_find_intrinsics(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:allocate|break|call|case|common|continue|cycle|deallocate|default|forall|where|elsewhere|equivalence|exit|external|for|go|goto|if|implicit|include|interface|intrinsic|namelist|none|nullify|operator|assignment|pause|procedure|pure|elemental|record|recursive|result|return|select|selectcase|stop|to|use|only|entry|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abs|cabs|dabs|iabs|aimag|aint|dint|anint|dnint|ceiling|cmplx|dcmplx|dimag|floor|nint|idnint|int|idint|ifix|real|float|sngl|dble|dreal|aprime|dconjg|dfloat|ddmim|rand|modulo|conjg|dprod|dim|ddim|idim|max|amax0|amax1|max0|max1|dmax1|min|amin0|amin1|min0|min1|dmin1|mod|amod|dmod|sign|dsign|isign|acos|dacos|asin|dasin|atan|datan|atan2|datan2|cos|ccos|dcos|cosh|dcosh|exp|cexp|dexp|log|alog|dlog|clog|log10|alog10|dlog10|sin|csin|dsin|sinh|dsinh|sqrt|csqrt|dsqrt|tan|dtan|tanh|dtanh|achar|char|iachar|ichar|lge|lgt|lle|llt|adjustl|adjustr|index|len_trim|scan|verify|logical|exponent|fraction|nearest|rrspacing|scale|set_exponent|spacing|btest|iand|ibclr|ibits|ibset|ieor|ior|ishft|ishftc|not|mvbits|merge)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:associated|present|kind|len|digits|epsilon|huge|maxexponent|minexponent|precision|radix|range|tiny|bit_size|allocated|lbound|ubound|shape|size)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#000060;font-style:italic;font-weight:bold')) continue;
            if((m = /^(?:repeat|trim|selected_int_kind|selected_real_kind|transfer|dot_product|matmul|all|any|count|maxval|minval|product|sum|pack|unpack|reshape|spread|cshift|eoshift|transpose|maxloc|minloc)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;color:#600060;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:date_and_time|system_clock|random_number|random_seed)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#600060;font-style:normal;font-weight:bold')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_numbers: function fortran_find_numbers(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-9]*\.[0-9]+([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+\.[0-9]*([de][+-]?[0-9]+)?([_]([0-9]+|[a-z][\w_]*))?(?![a-z])/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+[de][+-]?[0-9]+([_]([0-9]+|[a-z][\w_]*))?/i.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[0-9]+([_]([0-9]+|[a-zA-Z][\w_]*))?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b[bozx](['][0-9a-f]+[']|["][0-9a-f]+["])/i.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fortran_find_strings: function fortran_find_strings(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.fortran_string_1())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.fortran_string_2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    fortran_string_1: function fortran_string_1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^']*'/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^&\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fortran_end_of_string())return this.pop(), m-1;continue;}
            if((m = /^.*(?=&\s*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fortran_end_of_string())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    fortran_string_2: function fortran_string_2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^"]*"/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^&\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.fortran_end_of_string())return this.pop(), m-1;continue;}
            if((m = /^.*(?=&\s*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.fortran_end_of_string())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    fortran_end_of_string: function fortran_end_of_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^&\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsKeyword')) return this.pop();
            if((m = /^(!.*)?(?=$|\n)/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsComment')) continue;
            return this.pop(), 1;
        }
        this.pop();
    }
};
