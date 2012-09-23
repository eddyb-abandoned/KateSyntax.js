KateSyntax.langs.matlab.syntax = {
    default: 'matlab__normal',
    matlab__normal: function matlab__normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z]\w*(?=')/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.matlab__adjoint())return this.pop(), m-1;continue;}
            if((m = /^(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?[ij]?(?=')/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.matlab__adjoint())return this.pop(), m-1;continue;}
            if((m = /^[\)\]}](?=')/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.matlab__adjoint())return this.pop(), m-1;continue;}
            if((m = /^\.'(?=')/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.matlab__adjoint())return this.pop(), m-1;continue;}
            if((m = /^'[^']*(''[^']*)*'(?=[^']|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsString;color:#b20000')) continue;
            if((m = /^'[^']*(''[^']*)*/.exec(this.str)) && this.hl(m[0], 'dsChar;color:#a020f0')) continue;
            if((m = /^(?:break|case|catch|classdef|continue|else|elseif|end|for|function|global|if|otherwise|parfor|persistent|return|spmd|switch|try|while|methods|properties|events)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff')) continue;
            if((m = /^%.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#009900')) continue;
            if((m = /^!.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#b28c00')) continue;
            if((m = /^[a-zA-Z]\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?[ij]?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[()[\]{}]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^==/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^~=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&&/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\|\|/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\.\*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\.\^/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\.\//.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\.'/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[*+\-/\\&|<>~\^=,;:@]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    matlab__adjoint: function matlab__adjoint(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
