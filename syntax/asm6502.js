KateSyntax.langs.asm6502.syntax = {
    default: 'asm6502_base',
    asm6502_base: function asm6502_base(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#define.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^#include .*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^\.byte/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.byt/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.word/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.asc/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.dsb/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.fopt/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.text/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.data/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.bss/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.zero/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\.align/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\$[A-Za-z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^,x(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^,y(?=$|\n)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^#/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^TAX/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^ADC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^AND/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^ASL/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BCC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BCS/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BEQ/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BIT/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BMI/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BNE/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BPL/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BRK/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BVC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^BVS/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^CLC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^CLD/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^CLI/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^CLV/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^CMP/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^CPX/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^CPY/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^DEC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^DEX/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^DEY/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^EOR/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^INC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^INX/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^INY/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^JMP/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^JSR/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^LDA/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^LDX/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^LDY/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^LSR/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^NOP/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^ORA/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^PHA/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^PHP/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^PLA/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^PLP/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^ROL/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^ROR/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^RTI/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^RTS/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^SBC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^SEC/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^SED/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^SEI/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^STA/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^STX/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^STY/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^TAY/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^TSX/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^TXA/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^TXS/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^TYA/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\*=/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[\-+<>=;]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.asm6502_commentar2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    asm6502_commentar2: function asm6502_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
