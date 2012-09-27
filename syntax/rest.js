KateSyntax.langs.rest.syntax = {
    default: 'rest_normal',
    rest_normal: function rest_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&inlinestart;\*\*[^\s].*\*\*&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-weight:bold')) continue;
            if((m = /^&inlinestart;\*[^\s].*\*&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-style:italic')) continue;
            if((m = /^&inlinestart;``[^\s].*``&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^&inlinestart;\|[^\s].*\|&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^&inlinestart;_`[^\s].*`&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^&inlinestart;\[[^\s].*\]&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&inlinestart;\[[^\s].*\]_&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^&inlinestart;`[^\s].*(`|`_)&inlineend;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\w+_(\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsFunction')) {if(m = this.rest_field())return this.pop(), m-1;continue;}
            if((m = /^\s*\.\. \[(\d+|#|\*|#[&SimpleReferenceNameChars;]+)\]\s/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*\.\. \[[&SimpleReferenceNameChars;]+\]\s/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*(\.\. (__:|_[&SimpleReferenceNameChars; ]+:(\s|(?=$|\n)))|__ )/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*\.\. [\w-_\.]+::(\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\s*\.\. \|[&SimpleReferenceNameChars; ]+\|\s+[&SimpleReferenceNameChars;]+::\s/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rest_field: function rest_field(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsFunction')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ':' && this.hl('\\:', 'dsFunction')) continue;
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    }
};
