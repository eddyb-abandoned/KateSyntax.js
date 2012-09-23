KateSyntax.langs.scheme.syntax = {
    default: 'scheme_level0',
    scheme_level0: function scheme_level0(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_default: function scheme_default(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_multiLineComment: function scheme_multiLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^!#\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    scheme_specialNumber: function scheme_specialNumber(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d*(\.\d+)?/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsDecVal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_string: function scheme_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    scheme_function_decl: function scheme_function_decl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*[A-Za-z0-9-+\<\>//\*]*\s*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsFunction')) return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    scheme_level1: function scheme_level1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff8800;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level2())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_level2: function scheme_level2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#888800;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level3())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#ff8800;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_level3: function scheme_level3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#008800;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level4())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#888800;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_level4: function scheme_level4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#000088;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level5())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#008800;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_level5: function scheme_level5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#880088;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level6())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#000088;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    scheme_level6: function scheme_level6(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsNormal;color:#880088;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {if(m = this.scheme_multiLineComment())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean\?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic\?|char-ci>=\?|char-ci>\?|char-ci=\?|char-ci<=\?|char-downcase|char->integer|char>=\?|char>\?|char=\?|char\?|char-lower-case\?|char<\?c|char<=\?|char-numeric\?|char-ready\?|char-upcase|char-upper-case\?|char-whitespace\?|close-input-port|close-output-port|complex\?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object\?|eq\?|equal\?|eqv\?|eval|even\?|exact->inexact|exact\?|exp|expt|floor|force|for-each|gcd|har-ci<\?|if|imag-part|inexact->exact|inexact\?|input-port\?|integer->char|integer\?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list\?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative\?|newline|not|null-environment|null\?|number\?|number->string|numerator|odd\?|open-input-file|open-output-file|or|output-port\?|pair\?|peek-char|port\?|positive\?|procedure\?|quotient|rational\?|rationalize|read-char|read|real\?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=\?|string-ci>\?|string-ci=\?|string-ci<=\?|string-ci<\?|string-copy|string-fill!|string>=\?|string>\?|string->list|string->number|string->symbol|string=\?|string|string\?|string-length|string<=\?|string<\?|string-ref|string-set!|substring|symbol->string|symbol\?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector\?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero\?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) continue;
            if((m = /^(?:define|define\*|define-accessor|define-class|defined\?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#d22811')) {if(m = this.scheme_function_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.scheme_string())return this.pop(), m-1;continue;}
            if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.scheme_specialNumber())return this.pop(), m-1;continue;}
            if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsNormal;color:#ff0000;fontStyle:normal;fontWeight:bold')) {if(m = this.scheme_level1())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
