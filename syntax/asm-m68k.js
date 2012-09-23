KateSyntax.langs['asm-m68k'].syntax = {
    default: 'asm-m68k_normalText',
    'asm-m68k_normalText': function asmm68k_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:d0|d1|d2|d3|d4|d5|d6|d7)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:a0|a1|a2|a3|a4|a5|a6|a7|sp)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:ccr|sr|pc|zpc|ssp|usp|msp|isp|dfc|cacr|caar|vbr|crp|srp|urp|tc|tt0|tt1|mmusr|itt0|itt1|dtt0|dtt1|buscr|pcr|ic|bc)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:fp0|fp1|fp2|fp3|fp4|fp5|fp6|fp7|fpcr>|fpsr|fpiar)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^(?:fabs|facos|fadd|fasin|fatanh|fatan|fbeq|fbf|fbge|fbgle|fbgl|fbgt|fble|fblt|fbne|fbnge|fbngle|fbngl|fbngt|fbnle|fbnlt|fboge|fbogl|fbogt|fbole|fbolt|fbor|fbseq|fbsf|fbsne|fbst|fbt|fbueq|fbuge|fbugt|fbule|fbult|fbun|fcmp|fcosh|fcos|fdabs|fdadd|fdbeq|fdbf|fdbge|fdbgle|fdbgl|fdbgt|fdble|fdblt|fdbne|fdbnge|fdbngle|fdbngl|fdbngt|fdbnle|fdbnlt|fdboge|fdbogl|fdbogt|fdbole|fdbolt|fdbor|fdbseq|fdbsf|fdbsne|fdbst|fdbt|fdbueq|fdbuge|fdbugt|fdbule|fdbult|fdbun|fddiv|fdiv|fdmove|fdmul|fdneg|fdsqrt|fdsub|fetox|fetoxm1|fgetexp|fgetman|fint|fintrz|flog10|flog2|flogn|flognp1|fmod|fmovecr|fmove|fmovem|fmul|fneg|fnop|frem|frestore|fsabs|fsadd|fsave|fscale|fsdiv|fseq|fsf|fsge|fsgldiv|fsgle|fsgl|fsglmul|fsgt|fsincos|fsinh|fsin|fsle|fslt|fsmove|fsmul|fsneg|fsne|fsnge|fsngle|fsngl|fsngt|fsnle|fsnlt|fsoge|fsogl|fsogt|fsole|fsolt|fsor|fsqrt|fsseq|fssf|fssne|fssqrt|fsst|fssub|fst|fsub|fsueq|fsuge|fsugt|fsule|fsult|fsun|ftanh|ftan|ftentox|ftrapeq|ftrapf|ftrapge|ftrapgle|ftrapgl|ftrapgt|ftraple|ftraplt|ftrapne|ftrapnge|ftrapngle|ftrapngl|ftrapngt|ftrapnle|ftrapnlt|ftrapoge|ftrapogl|ftrapogt|ftrapole|ftrapolt|ftrapor|ftrapseq|ftrapsf|ftrapsne|ftrapst|ftrapt|ftrapueq|ftrapuge|ftrapugt|ftrapule|ftrapult|ftrapun|ftst|ftwotox)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^(?:fabs|facos|fadd|fasin|fatanh|fatan|fbeq|fbf|fbge|fbgle|fbgl|fbgt|fble|fblt|fbne|fbnge|fbngle|fbngl|fbngt|fbnle|fbnlt|fboge|fbogl|fbogt|fbole|fbolt|fbor|fbseq|fbsf|fbsne|fbst|fbt|fbueq|fbuge|fbugt|fbule|fbult|fbun|fcmp|fcosh|fcos|fdabs|fdadd|fdbeq|fdbf|fdbge|fdbgle|fdbgl|fdbgt|fdble|fdblt|fdbne|fdbnge|fdbngle|fdbngl|fdbngt|fdbnle|fdbnlt|fdboge|fdbogl|fdbogt|fdbole|fdbolt|fdbor|fdbseq|fdbsf|fdbsne|fdbst|fdbt|fdbueq|fdbuge|fdbugt|fdbule|fdbult|fdbun|fddiv|fdiv|fdmove|fdmul|fdneg|fdsqrt|fdsub|fetox|fetoxm1|fgetexp|fgetman|fint|fintrz|flog10|flog2|flogn|flognp1|fmod|fmovecr|fmove|fmovem|fmul|fneg|fnop|frem|frestore|fsabs|fsadd|fsave|fscale|fsdiv|fseq|fsf|fsge|fsgldiv|fsgle|fsgl|fsglmul|fsgt|fsincos|fsinh|fsin|fsle|fslt|fsmove|fsmul|fsneg|fsne|fsnge|fsngle|fsngl|fsngt|fsnle|fsnlt|fsoge|fsogl|fsogt|fsole|fsolt|fsor|fsqrt|fsseq|fssf|fssne|fssqrt|fsst|fssub|fst|fsub|fsueq|fsuge|fsugt|fsule|fsult|fsun|ftanh|ftan|ftentox|ftrapeq|ftrapf|ftrapge|ftrapgle|ftrapgl|ftrapgt|ftraple|ftraplt|ftrapne|ftrapnge|ftrapngle|ftrapngl|ftrapngt|ftrapnle|ftrapnlt|ftrapoge|ftrapogl|ftrapogt|ftrapole|ftrapolt|ftrapor|ftrapseq|ftrapsf|ftrapsne|ftrapst|ftrapt|ftrapueq|ftrapuge|ftrapugt|ftrapule|ftrapult|ftrapun|ftst|ftwotox)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^(?:align|blk|bss|clrfo|clrso|cnop|code|cseg|data|dc|dcb|ds|dseg|else|end|endc|endif|endm|endr|equ|even|fo|idnt|if|ifeq|ifne|ifgt|ifge|iflt|ifle|ifd|ifnd|ifc|ifnc|incbin|incdir|include|macro|org|public|rept|rs|rsreset|rsset|section|set|setfo|setso|so|text|ttl|xdef|xref|sdreg|cpu32|far|fpu|machine|mc68000|mc68010|mc68020|mc68030|mc68040|mc68060|mcf5200|mcf5206|mcf5307|mcf5407|near|opt|equr|equrl|fequr|fequrl|freg|reg)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;fontWeight:bold')) return this.pop();
            if((m = /^[A-Za-z_][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if((m = /^\.[A-Za-z_][A-Za-z_.0-9]*:?/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if((m = /^\.b[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^\.w[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^\.l[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^\.s[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^\.d[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^\.p[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^\.q[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if((m = /^\.x[\s,]/i.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontWeight:bold')) return this.pop();
            if(this.str[0] == ';' && this.hl(';', 'dsComment;fontStyle:normal')) {if(m = this['asm-m68k_comment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment;fontStyle:normal')) {if(m = this['asm-m68k_comment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsDataType')) {if(m = this['asm-m68k_constant']())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsBaseN')) {if(m = this['asm-m68k_number16']())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsBaseN')) {if(m = this['asm-m68k_number2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '@' && this.hl('@', 'dsBaseN')) {if(m = this['asm-m68k_number8']())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return this.pop();
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this['asm-m68k_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'asm-m68k_comment': function asmm68k_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;fontStyle:normal');
        }
        this.pop();
    },
    'asm-m68k_string': function asmm68k_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^["']/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'asm-m68k_constant': function asmm68k_constant(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-m68k_operators']())return this.pop(), m-1;continue;}
            if((m = /^\$[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-m68k_operators']())return this.pop(), m-1;continue;}
            if((m = /^@[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-m68k_operators']())return this.pop(), m-1;continue;}
            if((m = /^%[01]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this['asm-m68k_operators']())return this.pop(), m-1;continue;}
            if((m = /^[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this['asm-m68k_operators']())return this.pop(), m-1;continue;}
            if((m = /^\.[A-Za-z_][A-Za-z_.0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this['asm-m68k_operators']())return this.pop(), m-1;continue;}
            if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    'asm-m68k_operators': function asmm68k_operators(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsNormal')) return this.pop();
            if(this.str[0] == '&' && this.hl('&', 'dsNormal')) return this.pop();
            if(this.str[0] == '^' && this.hl('^', 'dsNormal')) return this.pop();
            if(this.str[0] == '*' && this.hl('*', 'dsNormal')) return this.pop();
            if(this.str[0] == '(' && this.hl('(', 'dsNormal')) return this.pop();
            if(this.str[0] == ')' && this.hl(')', 'dsNormal')) return this.pop();
            if(this.str[0] == '+' && this.hl('+', 'dsNormal')) return this.pop();
            if(this.str[0] == '-' && this.hl('-', 'dsNormal')) return this.pop();
            if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return this.pop();
            if(this.str[0] == '~' && this.hl('~', 'dsNormal')) return this.pop();
            if(this.str[0] == '!' && this.hl('!', 'dsNormal')) return this.pop();
            if(this.str[0] == '%' && this.hl('%', 'dsNormal')) return this.pop();
            if(this.str[0] == '<' && this.str[1] == '<' && this.hl('<<', 'dsNormal')) return this.pop();
            if(this.str[0] == '>' && this.str[1] == '>' && this.hl('>>', 'dsNormal')) return this.pop();
            if(this.str[0] == ',' && this.hl(',', 'dsNormal')) return this.pop(), 1;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'asm-m68k_number16': function asmm68k_number16(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[A-Fa-f0-9]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    'asm-m68k_number2': function asmm68k_number2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    'asm-m68k_number8': function asmm68k_number8(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    }
};
