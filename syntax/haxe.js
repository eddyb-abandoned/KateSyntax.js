KateSyntax.langs.haxe.syntax = {
    default: 'haxe_normal',
    haxe_normal: function haxe_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#if(\s+\w+)?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^#(else|elseif|end|error)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if((m = /^(?:break|case|cast|catch|class|continue|default|else|enum|extends|false|for|function|if|implements|in|inline|interface|new|null|override|private|public|return|static|super|switch|this|throw|trace|true|try|typedef|untyped|var|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:package|import)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000ff')) {if(m = this.haxe_moduleName())return this.pop(), m-1;continue;}
            if((m = /^(?:Array|Void|Bool|Int|UInt|Float|Dynamic|String|List|Error|Unknown|Type)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.haxe_rawString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.haxe_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.haxe_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.haxe_commentBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsNormal')) continue;
            if((m = /^[\d][\d]*(\.(?!\.)[\d]*([eE][-+]?[\d]+)?)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^\.[\d][\d]*([eE][-+]?[\d]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^0[xX][\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    haxe_moduleName: function haxe_moduleName(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.haxe_commentLine())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.haxe_commentBlock())return this.pop(), m-1;continue;}
            if((m = /^[^\s\w.:,]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000ff')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#0000ff');
        }
        this.pop();
    },
    haxe_rawString: function haxe_rawString(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    haxe_string: function haxe_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) continue;
            if((m = /^\\(u[\da-fA-F]{4}|U[\da-fA-F]{8}|&[a-zA-Z]\w+;)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#00aa88')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    haxe_commentLine: function haxe_commentLine(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    haxe_commentBlock: function haxe_commentBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
