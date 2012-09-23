KateSyntax.langs.fstab.syntax = {
    default: 'fstab_device',
    fstab_device: function fstab_device(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsDataType')) {if(m = this.fstab_mount_point())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    fstab_mount_point: function fstab_mount_point(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) {if(m = this.fstab__type())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    fstab__type: function fstab__type(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\S]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsFunction')) {if(m = this.fstab_type())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    fstab_type: function fstab_type(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsKeyword')) {if(m = this.fstab_options())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    fstab_options: function fstab_options(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsDecVal')) {if(m = this.fstab_dump())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    fstab_dump: function fstab_dump(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsDecVal')) {if(m = this.fstab_pass())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    },
    fstab_pass: function fstab_pass(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\s]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsDecVal')) {if(m = this.fstab___error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    },
    fstab___error: function fstab___error(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.fstab_comment())return this.pop(), m-1;continue;}
            if((m = /^[\S]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsError')) {if(m = this.fstab_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    },
    fstab_error: function fstab_error(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), this.fstab_device();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    fstab_comment: function fstab_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
