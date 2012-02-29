var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._level0();
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
HL.prototype._level0 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._default = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._multiLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^!#\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._specialNumber = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d*(\.\d+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '\' && this.str[1] == '"' && this.hl('\"', 'dsChar')) continue;
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._function_decl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*[A-Za-z0-9-+\<\>//\*]*\s*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._level1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level2();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._level2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level3();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._level3 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level4();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._level4 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level5();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._level5 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level6();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._level6 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#' && this.str[1] == '!' && this.hl('#!', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^(?:abs|acos|and|angle|append|applymap|asin|assoc|assq|assv|atan|begin|boolean?|break|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call\/cc|call-with-current-continuation|call-with-input-file|call-with-output-file|call-with-values|car|case|catch|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|char-alphabetic?|char-ci>=?|char-ci>?|char-ci=?|char-ci<=?|char-downcase|char->integer|char>=?|char>?|char=?|char?|char-lower-case?|char<?c|char<=?|char-numeric?|char-ready?|char-upcase|char-upper-case?|char-whitespace?|close-input-port|close-output-port|complex?|cond|cons|continue|cos|current-input-port|current-output-port|denominator|display|do|dynamic-wind|else|eof-object?|eq?|equal?|eqv?|eval|even?|exact->inexact|exact?|exp|expt|floor|force|for-each|gcd|har-ci<?|if|imag-part|inexact->exact|inexact?|input-port?|integer->char|integer?|interaction-environment|lambda|lcm|length|let|let\*|letrec|letrec-syntax|let-syntax|list->string|list|list?|list-ref|list-tail|load|log|magnitude|make-polar|make-rectangular|make-string|make-vector|max|member|memq|memv|min|modulo|negative?|newline|not|null-environment|null?|number?|number->string|numerator|odd?|open-input-file|open-output-file|or|output-port?|pair?|peek-char|port?|positive?|procedure?|quotient|rational?|rationalize|read-char|read|real?|real-part|remainder|reverse|round|scheme-report-environment|set-car!|set-cdr!|sin|sqrt|string-append|string-ci>=?|string-ci>?|string-ci=?|string-ci<=?|string-ci<?|string-copy|string-fill!|string>=?|string>?|string->list|string->number|string->symbol|string=?|string|string?|string-length|string<=?|string<?|string-ref|string-set!|substring|symbol->string|symbol?|syntax-rules|tan|transcript-off|transcript-on|truncate|values|vector-fill!|vector->listlist->vector|vector|vector?|vector-length|vector-ref|vector-set!|while|with-input-from-file|with-output-to-file|write-char|write|zero?)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<=|<|=|=>|>=|>|-|\/|\*,\*|\*\)|\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:define|define\*|define-accessor|define-class|defined?|define-generic|define-macro|define-method|define-module|define-private|define-public|define\*-public|define-reader-ctor|define-syntax|define-syntax-macro|defmacro|defmacro\*|defmacro\*-public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^(?:#\\nul|#\\soh|#\\stx|#\\etx|#\\eot|#\\enq|#\\ack|#\\bel|#\\bs|#\\ht|#\\nl|#\\vt|#\\np|#\\cr|#\\so|#\\si|#\\dle|#\\dc1|#\\dc2|#\\dc3|#\\dc4|#\\nak|#\\syn|#\\etb|#\\can|#\\em|#\\sub|#\\esc|#\\fs|#\\gs|#\\rs|#\\us|#\\space|#\\sp|#\\newline|#\\nl|#\\tab|#\\ht|#\\backspace|#\\bs|#\\return|#\\cr|#\\page|#\\np|#\\null|#\\nul)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) {this._level1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
