var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText();
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
HL.prototype._normalText = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:d0|d1|d2|d3|d4|d5|d6|d7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:a0|a1|a2|a3|a4|a5|a6|a7|sp)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:ccr|sr|pc|zpc|ssp|usp|msp|isp|dfc|cacr|caar|vbr|crp|srp|urp|tc|tt0|tt1|mmusr|itt0|itt1|dtt0|dtt1|buscr|pcr|ic|bc)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:fp0|fp1|fp2|fp3|fp4|fp5|fp6|fp7|fpcr>|fpsr|fpiar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return;
        if((m = /^(?:fabs|facos|fadd|fasin|fatanh|fatan|fbeq|fbf|fbge|fbgle|fbgl|fbgt|fble|fblt|fbne|fbnge|fbngle|fbngl|fbngt|fbnle|fbnlt|fboge|fbogl|fbogt|fbole|fbolt|fbor|fbseq|fbsf|fbsne|fbst|fbt|fbueq|fbuge|fbugt|fbule|fbult|fbun|fcmp|fcosh|fcos|fdabs|fdadd|fdbeq|fdbf|fdbge|fdbgle|fdbgl|fdbgt|fdble|fdblt|fdbne|fdbnge|fdbngle|fdbngl|fdbngt|fdbnle|fdbnlt|fdboge|fdbogl|fdbogt|fdbole|fdbolt|fdbor|fdbseq|fdbsf|fdbsne|fdbst|fdbt|fdbueq|fdbuge|fdbugt|fdbule|fdbult|fdbun|fddiv|fdiv|fdmove|fdmul|fdneg|fdsqrt|fdsub|fetox|fetoxm1|fgetexp|fgetman|fint|fintrz|flog10|flog2|flogn|flognp1|fmod|fmovecr|fmove|fmovem|fmul|fneg|fnop|frem|frestore|fsabs|fsadd|fsave|fscale|fsdiv|fseq|fsf|fsge|fsgldiv|fsgle|fsgl|fsglmul|fsgt|fsincos|fsinh|fsin|fsle|fslt|fsmove|fsmul|fsneg|fsne|fsnge|fsngle|fsngl|fsngt|fsnle|fsnlt|fsoge|fsogl|fsogt|fsole|fsolt|fsor|fsqrt|fsseq|fssf|fssne|fssqrt|fsst|fssub|fst|fsub|fsueq|fsuge|fsugt|fsule|fsult|fsun|ftanh|ftan|ftentox|ftrapeq|ftrapf|ftrapge|ftrapgle|ftrapgl|ftrapgt|ftraple|ftraplt|ftrapne|ftrapnge|ftrapngle|ftrapngl|ftrapngt|ftrapnle|ftrapnlt|ftrapoge|ftrapogl|ftrapogt|ftrapole|ftrapolt|ftrapor|ftrapseq|ftrapsf|ftrapsne|ftrapst|ftrapt|ftrapueq|ftrapuge|ftrapugt|ftrapule|ftrapult|ftrapun|ftst|ftwotox)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:fabs|facos|fadd|fasin|fatanh|fatan|fbeq|fbf|fbge|fbgle|fbgl|fbgt|fble|fblt|fbne|fbnge|fbngle|fbngl|fbngt|fbnle|fbnlt|fboge|fbogl|fbogt|fbole|fbolt|fbor|fbseq|fbsf|fbsne|fbst|fbt|fbueq|fbuge|fbugt|fbule|fbult|fbun|fcmp|fcosh|fcos|fdabs|fdadd|fdbeq|fdbf|fdbge|fdbgle|fdbgl|fdbgt|fdble|fdblt|fdbne|fdbnge|fdbngle|fdbngl|fdbngt|fdbnle|fdbnlt|fdboge|fdbogl|fdbogt|fdbole|fdbolt|fdbor|fdbseq|fdbsf|fdbsne|fdbst|fdbt|fdbueq|fdbuge|fdbugt|fdbule|fdbult|fdbun|fddiv|fdiv|fdmove|fdmul|fdneg|fdsqrt|fdsub|fetox|fetoxm1|fgetexp|fgetman|fint|fintrz|flog10|flog2|flogn|flognp1|fmod|fmovecr|fmove|fmovem|fmul|fneg|fnop|frem|frestore|fsabs|fsadd|fsave|fscale|fsdiv|fseq|fsf|fsge|fsgldiv|fsgle|fsgl|fsglmul|fsgt|fsincos|fsinh|fsin|fsle|fslt|fsmove|fsmul|fsneg|fsne|fsnge|fsngle|fsngl|fsngt|fsnle|fsnlt|fsoge|fsogl|fsogt|fsole|fsolt|fsor|fsqrt|fsseq|fssf|fssne|fssqrt|fsst|fssub|fst|fsub|fsueq|fsuge|fsugt|fsule|fsult|fsun|ftanh|ftan|ftentox|ftrapeq|ftrapf|ftrapge|ftrapgle|ftrapgl|ftrapgt|ftraple|ftraplt|ftrapne|ftrapnge|ftrapngle|ftrapngl|ftrapngt|ftrapnle|ftrapnlt|ftrapoge|ftrapogl|ftrapogt|ftrapole|ftrapolt|ftrapor|ftrapseq|ftrapsf|ftrapsne|ftrapst|ftrapt|ftrapueq|ftrapuge|ftrapugt|ftrapule|ftrapult|ftrapun|ftst|ftwotox)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^(?:align|blk|bss|clrfo|clrso|cnop|code|cseg|data|dc|dcb|ds|dseg|else|end|endc|endif|endm|endr|equ|even|fo|idnt|if|ifeq|ifne|ifgt|ifge|iflt|ifle|ifd|ifnd|ifc|ifnc|incbin|incdir|include|macro|org|public|rept|rs|rsreset|rsset|section|set|setfo|setso|so|text|ttl|xdef|xref|sdreg|cpu32|far|fpu|machine|mc68000|mc68010|mc68020|mc68030|mc68040|mc68060|mcf5200|mcf5206|mcf5307|mcf5407|near|opt|equr|equrl|fequr|fequrl|freg|reg)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return;
        if((m = /^^[A-Za-z_][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if((m = /^^\.[A-Za-z_][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if((m = /^\.b[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\.w[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\.l[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\.s[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\.d[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\.p[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\.q[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^\.x[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == ';' && this.hl(';', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsDataType')) {this._constant();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsBaseN')) {this._number16();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsBaseN')) {this._number2();continue;}
        if(this.str[0] == '@' && this.hl('@', 'dsBaseN')) {this._number8();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._string();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._constant = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^\$[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^@[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^%[01]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._operators();continue;}
        if((m = /^[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._operators();continue;}
        if((m = /^\.[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._operators();continue;}
        if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) return;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsDataType')) return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._operators = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsNormal')) return;
        if(this.str[0] == '&' && this.hl('&', 'dsNormal')) return;
        if(this.str[0] == '^' && this.hl('^', 'dsNormal')) return;
        if(this.str[0] == '*' && this.hl('*', 'dsNormal')) return;
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) return;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return;
        if(this.str[0] == '+' && this.hl('+', 'dsNormal')) return;
        if(this.str[0] == '-' && this.hl('-', 'dsNormal')) return;
        if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return;
        if(this.str[0] == '~' && this.hl('~', 'dsNormal')) return;
        if(this.str[0] == '!' && this.hl('!', 'dsNormal')) return;
        if(this.str[0] == '%' && this.hl('%', 'dsNormal')) return;
        if(this.str[0] == '<<' && this.hl('<<', 'dsNormal')) return;
        if(this.str[0] == '>>' && this.hl('>>', 'dsNormal')) return;
        if(this.str[0] == ',' && this.hl(',', 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._number16 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._number2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
HL.prototype._number8 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsBaseN')) return;
        this.hl(this.str[0], 'dsBaseN');
    }
};
