KateSyntax.langs.nemerle.syntax = {
    default: 'nemerle_normal',
    nemerle_normal: function nemerle_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\//.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.nemerle_singleLineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.nemerle_multiLineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.nemerle_normalString())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.str[1] == '"' && this.hl('$"', 'dsString')) {if(m = this.nemerle_stringInterpolation())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#00009f')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#00009f')) continue;
            if((m = /^(?:abstract|def|delegate|event|extern|internal|mutable|override|public|private|protected|sealed|static|volatile|virtual|new)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#28712f')) continue;
            if((m = /^(?:macro|namespace|using|\\\[Record\\])\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(?:array|bool|byte|char|decimal|double|enum|float|int|list|long|object|sbyte|short|string|uint|ulong|ushort|variant|void)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:_|as|assert|base|catch|checked|do|else|false|finally|for|foreach|fun|get|if|ignore|implements|in|is|lock|match|null|out|params|ref|repeat|set|syntax|this|throw|true|try|typeof|unchecked|unless|when|where|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:#define|#elif|#else|#endif|#endregion|#error|#if|#line|#region|#undef|#warning|#pragma)\b/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^(?:class|interface|module|struct|type)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#eeb312;font-weight:bold')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) continue;
            if(this.str[0] == '<' && this.str[1] == '[' && this.hl('<[', 'dsChar')) continue;
            if(this.str[0] == ']' && this.str[1] == '>' && this.hl(']>', 'dsChar')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    nemerle_singleLineComment: function nemerle_singleLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    nemerle_multiLineComment: function nemerle_multiLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\*\//.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    nemerle_normalString: function nemerle_normalString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\{[0-9]+\}/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsBaseN')) continue;
            if((m = /^\\u0008/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000D/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000d/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000A/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000a/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    nemerle_stringInterpolation: function nemerle_stringInterpolation(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\{[0-9]+\}/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\$(\S)+\s/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == 't' && this.hl('\\t', 'dsBaseN')) continue;
            if(this.str[0] == '\\' && this.str[1] == 'n' && this.hl('\\n', 'dsBaseN')) continue;
            if((m = /^\\u0008/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000D/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000d/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000A/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\u000a/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
