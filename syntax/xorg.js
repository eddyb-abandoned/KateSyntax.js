KateSyntax.langs.xorg.syntax = {
    default: 'xorg_xorg',
    xorg_xorg: function xorg_xorg(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^Section/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.xorg_section())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.xorg_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xorg_section: function xorg_section(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xorg_sectionContent())return this.pop(), m-1;continue;}
            if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xorg_sectionContent())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.xorg_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xorg_sectionContent: function xorg_sectionContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^EndSection/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop(), 1;
            if((m = /^EndSubSection/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop(), 1;
            if((m = /^SubSection/i.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.xorg_section())return this.pop(), m-1;continue;}
            if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xorg_keyword())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.xorg_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xorg_keyword: function xorg_keyword(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[\w\d]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.xorg_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    xorg_comment: function xorg_comment(m) {
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
