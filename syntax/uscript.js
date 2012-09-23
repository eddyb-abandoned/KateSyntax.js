KateSyntax.langs.uscript.syntax = {
    default: 'uscript_normal',
    uscript_normal: function uscript_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:break|continue|if|else|switch|while|for|do|foreach|true|false|null|new|instanceof|state|auto|exec|function|defaultproperties|native|noexport|var|out|local|event|return|static|Static|synchronized|transient|volatile|final|throws|extends|expands|public|protected|private|abstract|case|default|final|simulated|Dot|nativereplication|replication|unreliable|reliable|ignores|localized|latent|singular|Cross|config|enum|struct|operator|preoperator|postoperator|iterator|coerce|optional|const|editconst|array|export|editinline|editinlinenew|editinlineuse|cpptext|placeable|virtual|hidecategories|super|global|none|self)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:boolean|char|byte|short|int|long|float|double|void|Pawn|sound|ipaddr|ELightType|actor|ammo|bool|vector|rotator|name|string|object|plane|staticmesh|package|color|coords|material|class)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\/\/BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.uscript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.uscript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.uscript_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.uscript_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^[!%&()+,\-<=>?[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#exec/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.uscript_preprocessor())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    uscript_string: function uscript_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    uscript_commentar1: function uscript_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    uscript_commentar2: function uscript_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    uscript_preprocessor: function uscript_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.uscript_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.uscript_commentar2())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    }
};
