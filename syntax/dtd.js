KateSyntax.langs.dtd.syntax = {
    default: 'dtd_normal',
    dtd_normal: function dtd_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.dtd_comment())return this.pop(), m-1;continue;}
            if((m = /^<\?xml/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.dtd_pI())return this.pop(), m-1;continue;}
            if((m = /^<!ELEMENT/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.dtd_declaration())return this.pop(), m-1;continue;}
            if((m = /^<!ATTLIST/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.dtd_declaration())return this.pop(), m-1;continue;}
            if((m = /^<!NOTATION/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.dtd_declaration())return this.pop(), m-1;continue;}
            if((m = /^<!ENTITY/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.dtd_declaration())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dtd_comment: function dtd_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    dtd_pI: function dtd_pI(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dtd_declaration: function dtd_declaration(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.dtd_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.dtd_inlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;font-weight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dtd_string())return this.pop(), m-1;continue;}
            if((m = /^(-|O)\s(-|O)/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) continue;
            if((m = /^[(|),]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(%|&)&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[?*+\-&]/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
            if((m = /^%\s/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) continue;
            if((m = /^(?:EMPTY|ANY|CDATA|ID|IDREF|IDREFS|NMTOKEN|NMTOKENS|ENTITY|ENTITIES|NOTATION|PUBLIC|SYSTEM|NDATA)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:#PCDATA|#REQUIRED|#IMPLIED|#FIXED)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b&nmtoken;\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dtd_string: function dtd_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^%&nmtoken;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    dtd_inlineComment: function dtd_inlineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) return this.pop();
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
