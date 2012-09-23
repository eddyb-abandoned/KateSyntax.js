KateSyntax.langs.diff.syntax = {
    default: 'diff_normal',
    diff_normal: function diff_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^&chunk;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.diff_chunk())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\*+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.diff_rChunk())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^Only in .*:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^diff.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.diff_rFile())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^====.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^(\*\*\*|\-\-\-).*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.diff_file())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsNormal')) {if(m = this.diff_changedOld())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_findDiff: function diff_findDiff(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_file: function diff_file(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsKeyword');
        }
        this.pop();
    },
    diff_chunk: function diff_chunk(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^&chunk;/.exec(this.str)) return this.pop();
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsString;color:#FF0000')) {if(m = this.diff_changedOld())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_chunkInFile: function diff_chunkInFile(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^&chunk;/.exec(this.str)) return this.pop();
            if(this.col === 0 && (m = /^&index;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.col === 0 && /^&file;/.exec(this.str)) return this.pop();
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsString;color:#FF0000')) {if(m = this.diff_changedOld())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_rFile: function diff_rFile(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && /^(diff|Only in .*:).*(?=$|\n)/.exec(this.str)) return this.pop();
            if(this.col === 0 && (m = /^&file;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^\*+(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.diff_rChunkInFile())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_rChunk: function diff_rChunk(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\*\*\* .* \*\*\*\*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^\-\-\- .* \-\-\-\-(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.diff_rChunkNew())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^&chunk;/.exec(this.str)) return this.pop();
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsString;color:#FF0000')) {if(m = this.diff_changedOld())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_rChunkInFile: function diff_rChunkInFile(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^\*\*\* .* \*\*\*\*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^\-\-\- .* \-\-\-\-(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.diff_rChunkInFileNew())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^&chunk;/.exec(this.str)) return this.pop();
            if(this.col === 0 && (m = /^&index;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.col === 0 && /^&file;/.exec(this.str)) return this.pop();
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsString;color:#FF0000')) {if(m = this.diff_changedOld())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_rChunkNew: function diff_rChunkNew(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && /^&chunk;/.exec(this.str)) return this.pop(), 1;
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsOthers;color:#0000FF')) {if(m = this.diff_changedNew())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_rChunkInFileNew: function diff_rChunkInFileNew(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && /^&chunk;/.exec(this.str)) return this.pop(), 1;
            if(this.col === 0 && /^&file;/.exec(this.str)) return this.pop(), 1;
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsOthers;color:#0000FF')) {if(m = this.diff_changedNew())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^\-\-\-.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^&csep;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.col === 0 && (m = /^[+>]/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF')) {if(m = this.diff_added())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\-<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000')) {if(m = this.diff_removed())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    diff_removed: function diff_removed(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#FF0000');
        }
        this.pop();
    },
    diff_added: function diff_added(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#0000FF');
        }
        this.pop();
    },
    diff_changedOld: function diff_changedOld(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#FF0000');
        }
        this.pop();
    },
    diff_changedNew: function diff_changedNew(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#0000FF');
        }
        this.pop();
    }
};
