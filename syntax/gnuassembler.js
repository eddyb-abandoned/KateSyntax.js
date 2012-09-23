KateSyntax.langs.gnuassembler.syntax = {
    default: 'gnuassembler_normal',
    gnuassembler_normal: function gnuassembler_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[_\w\d-]*\s*:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\.abort|\.align|\.app-file|\.appline|\.ascii|\.asciz|\.att_syntax|\.balign|\.balignl|\.balignw|\.byte|\.code16|\.code32|\.comm|\.common\.s|\.common|\.data|\.dc\.b|\.dc\.d|\.dc\.l|\.dc\.s|\.dc\.w|\.dc\.x|\.dc|\.dcb\.b|\.dcb\.d|\.dcb\.l|\.dcb\.s|\.dcb\.w|\.dcb\.x|\.dcb|\.debug|\.def|\.desc|\.dim|\.double|\.ds\.b|\.ds\.d|\.ds\.l|\.ds\.p|\.ds\.s|\.ds\.w|\.ds\.x|\.ds|\.dsect|\.eject|\.else|\.elsec|\.elseif|\.end|\.endc|\.endef|\.endfunc|\.endif|\.endm|\.endr|\.equ|\.equiv|\.err|\.exitm|\.extend|\.extern|\.fail|\.file|\.fill|\.float|\.format|\.func|\.global|\.globl|\.hidden|\.hword|\.ident|\.if|\.ifc|\.ifdef|\.ifeq|\.ifeqs|\.ifge|\.ifgt|\.ifle|\.iflt|\.ifnc|\.ifndef|\.ifne|\.ifnes|\.ifnotdef|\.include|\.int|\.intel_syntax|\.internal|\.irep|\.irepc|\.irp|\.irpc|\.lcomm|\.lflags|\.line|\.linkonce|\.list|\.llen|\.ln|\.long|\.lsym|\.macro|\.mexit|\.name|\.noformat|\.nolist|\.nopage|noprefix|\.octa|\.offset|\.org|\.p2align|\.p2alignl|\.p2alignw|\.page|\.plen|\.popsection|\.previous|\.print|\.protected|\.psize|\.purgem|\.pushsection|\.quad|\.rodata|\.rep|\.rept|\.rva|\.sbttl|\.scl|\.sect\.s|\.sect|\.section\.s|\.section|\.set|\.short|\.single|\.size|\.skip|\.sleb128|\.space|\.spc|\.stabd|\.stabn|\.stabs|\.string|\.struct|\.subsection|\.symver|\.tag|\.text|\.title|\.ttl|\.type|\.uleb128|\.use|\.val|\.version|\.vtable_entry|\.vtable_inherit|\.weak|\.word|\.xcom|\.xdef|\.xref|\.xstabs|\.zero|\.arm|\.bss|\.code|\.even|\.force_thumb|\.ldouble|\.loc|\.ltorg|\.packed|\.pool|\.req|\.thumb|\.thumb_func|\.thumb_set)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0[bB][01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^0[fFeEdD][-+]?[0-9]*\.?[0-9]*[eE]?[-+]?[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[A-Za-z_.$][A-Za-z0-9_.$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^'(\\x[0-9a-fA-F][0-9a-fA-F]?|\\[0-7]?[0-7]?[0-7]?|\\.|.)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.gnuassembler_string())return this.pop(), m-1;continue;}
            if((m = /^#\s*if(?:def|ndef)?(?=\s+\S)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gnuassembler_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gnuassembler_preprocessor())return this.pop(), m-1;continue;}
            if((m = /^#\s*define.*((?=\\))/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gnuassembler_define())return this.pop(), m-1;continue;}
            if((m = /^#\s*(?:el(?:se|if)|include(?:_next)?|define|undef|line|error|warning|pragma)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gnuassembler_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.gnuassembler_commentar1())return this.pop(), m-1;continue;}
            if((m = /^[@;#]/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.gnuassembler_commentar2())return this.pop(), m-1;continue;}
            if((m = /^[!#%&*()+,\-<=>?/:[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gnuassembler_commentar1: function gnuassembler_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    gnuassembler_commentar2: function gnuassembler_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    gnuassembler_string: function gnuassembler_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.gnuassembler_someContext())return this.pop(), m-1;continue;}
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    gnuassembler_preprocessor: function gnuassembler_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    gnuassembler_define: function gnuassembler_define(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    gnuassembler_someContext: function gnuassembler_someContext(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
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
