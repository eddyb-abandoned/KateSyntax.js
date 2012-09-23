KateSyntax.langs.ini.syntax = {
    default: 'ini_ini',
    ini_ini: function ini_ini(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.ini_value())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsComment')) {if(m = this.ini_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.ini_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    ini_value: function ini_value(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:On|Off|Default|Defaults|Localhost|Null|True|False|Yes|No|Normal|E_ALL|E_ERROR|E_WARNING|E_PARSE|E_NOTICE|E_STRICT|E_CORE_ERROR|E_CORE_WARNING|E_COMPILE_ERROR|E_COMPILE_WARNING|E_USER_ERROR|E_USER_WARNING|E_USER_NOTICE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    ini_comment: function ini_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    alert_normalText: function alert_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
