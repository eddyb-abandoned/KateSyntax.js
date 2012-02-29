var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
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
HL.prototype._normal = function() {
    var m;
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
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#\s*if(?:def|ndef)?(?=\s+\S)/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s*endif/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^#\s*define.*((?=\\))/i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._define();continue;}
        if((m = /^#\s*(?:el(?:se|if)|include(?:_next)?|define|undef|line|error|warning|pragma)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar1();continue;}
        if((m = /^[@;#]/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._commentar2();continue;}
        if((m = /^[!#%&*()+,\-<=>?/:[\]\^{|}~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._someContext();continue;}
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._define = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._someContext = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
