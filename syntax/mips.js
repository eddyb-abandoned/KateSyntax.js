KateSyntax.langs.mips.syntax = {
    default: 'mips_normal',
    mips_normal: function mips_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:abs\.d|abs\.s|add|add\.d|add\.s|addi|addiu|addu|and|andi|bc0f|bc0t|bc1f|bc1t|bc2f|bc2t|bc3f|bc3t|beq|bgez|bgezal|bgtz|blez|bltz|bltzal|bne|break|c\.eq\.d|c\.eq\.s|c\.seq\.s|c\.seq\.d|c\.ueq\.s|c\.ueq\.d|c\.olt\.d|c\.olt\.s|c\.ole\.d|c\.ole\.s|c\.ult\.d|c\.ult\.s|c\.ule\.d|c\.ule\.s|c\.le\.d|c\.le\.s|c\.lt\.d|c\.lt\.s|c\.un\.s|c\.un\.d|cvt\.d\.s|cvt\.d\.w|cvt\.s\.d|cvt\.s\.w|cvt\.w\.d|cvt\.w\.s|div\.d|div\.s|j|jal|jalr|jr|lb|lbu|lh|lhu|lui|lw|lwc0|lwc1|lwc2|lwc3|lwl|lwr|mfc0|mfc1|mfc2|mfc3|mfhi|mflo|mtc0|mtc1|mtc2|mtc3|mthi|mtlo|mul\.d|mul\.s|mult|multu|nor|or|ori|rfe|sb|sh|sw|swcl|swl|swr|sll|sllv|slt|slti|sltiu|sra|srav|srl|srlv|sub|sub\.d|sub\.s|subu|sw|swc0|swc1|swc2|swc3|swl|swr|syscall|xor|xori)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:abs|b|beqz|bge|bgeu|bgt|bgtu|ble|bleu|blt|bltu|bnez|div|divu|l\.d|l\.s|la|ld|li|li\.d|li\.s|mfc0\.d|mfc1\.d|mfc2\.d|mfc3\.d|mov\.d|mov\.s|move|mul|mulo|mulou|neg|neg\.d|neg\.s|negu|nop|not|rem|remu|rol|ror|s\.d|s\.s|sd|seq|sge|sgeu|sgt|sgtu|sle|sleu|sne|ulh|ulhu|ulw|ush|usw)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:$0|$1|$2|$3|$4|$5|$6|$7|$8|$9|$10|$11|$12|$13|$14|$15|$16|$17|$18|$19|$20|$21|$22|$23|$24|$25|$26|$27|$28|$29|$30|$31|$zero|$t0|$t1|$t2|$t3|$t4|$t5|$t6|$t7|$t8|$t9)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#0000ff')) continue;
            if((m = /^(?:$v0|$v1|$a0|$a1|$a2|$a3|$k0|$k1|$at|$gp|$sp|$fp|$s0|$s1|$s2|$s3|$s4|$s5|$s6|$s7|$ra)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:$f0|$f1|$f2|$f3|$f4|$f5|$f6|$f7|$f8|$f9|$f10|$f11|$f12|$f13|$f14|$f15|$f16|$f17|$f18|$f19|$f20|$f21|$f22|$f23|$f24|$f25|$f26|$f27|$f28|$f29|$f30|$f31)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^(?:\.data|\.kdata|\.ktext|\.text)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\.align|\.ascii|\.asciiz|\.byte|\.double|\.extern|\.float|\.globl|\.half|\.sdata|\.set|\.space|\.word)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^[\w_\.]+:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.mips_string())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mips_string: function mips_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
