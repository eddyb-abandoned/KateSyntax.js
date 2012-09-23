KateSyntax.langs.gettext.syntax = {
    default: 'gettext_normal',
    gettext_normal: function gettext_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(msgid_plural|msgid|msgstr|msgctxt)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000')) continue;
            if((m = /^#\./.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff')) {if(m = this.gettext_automaticComment())return this.pop(), m-1;continue;}
            if((m = /^#:/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff')) {if(m = this.gettext_references())return this.pop(), m-1;continue;}
            if((m = /^#,/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff')) {if(m = this.gettext_flags())return this.pop(), m-1;continue;}
            if((m = /^#\|/.exec(this.str)) && this.hl(m[0], 'dsString;color:#008080;fontStyle:italic')) {if(m = this.gettext_previous())return this.pop(), m-1;continue;}
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#888888')) {if(m = this.gettext_translatorComment())return this.pop(), m-1;continue;}
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#ff00ff')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#ff0000')) {if(m = this.gettext_string())return this.pop(), m-1;continue;}
            if((m = /^\[\d+\]/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#0000ff')) continue;
            this.hl(this.str[0], 'dsNormal;color:#000000');
        }
        this.pop();
    },
    gettext_translatorComment: function gettext_translatorComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) {if(m = this.gettext_stringDiffNewComment())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) {if(m = this.gettext_stringDiffOldComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#888888');
        }
        this.pop();
    },
    gettext_automaticComment: function gettext_automaticComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) {if(m = this.gettext_stringDiffNewComment())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) {if(m = this.gettext_stringDiffOldComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff');
        }
        this.pop();
    },
    gettext_references: function gettext_references(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) {if(m = this.gettext_stringDiffNewComment())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) {if(m = this.gettext_stringDiffOldComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff');
        }
        this.pop();
    },
    gettext_flags: function gettext_flags(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^fuzzy/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#800080;fontWeight:bold')) continue;
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) {if(m = this.gettext_stringDiffNewComment())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) {if(m = this.gettext_stringDiffOldComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#0000ff');
        }
        this.pop();
    },
    gettext_stringDiffNewComment: function gettext_stringDiffNewComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\+\}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#0080f8;fontStyle:italic');
        }
        this.pop();
    },
    gettext_stringDiffOldComment: function gettext_stringDiffOldComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-\}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#f00080;fontStyle:italic');
        }
        this.pop();
    },
    gettext_string: function gettext_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#ff00ff')) continue;
            if((m = /^&([a-zA-Z0-9_.-]+|#[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsString;color:#ff0040;fontWeight:bold')) continue;
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8')) {if(m = this.gettext_stringDiffNew())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080')) {if(m = this.gettext_stringDiffOld())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#c00000;fontWeight:bold')) {if(m = this.gettext_stringTag())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#ff0000')) {if(m = this.gettext_stringWrap())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#ff0000');
        }
        this.pop();
    },
    gettext_stringTag: function gettext_stringTag(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#ff00ff')) continue;
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8')) {if(m = this.gettext_stringDiffNew())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080')) {if(m = this.gettext_stringDiffOld())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString;color:#c00000;fontWeight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#ff0000')) {if(m = this.gettext_stringWrapSub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#c00000;fontWeight:bold');
        }
        this.pop();
    },
    gettext_stringWrap: function gettext_stringWrap(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#ff0000')) return this.pop();
            if(/^./.exec(this.str)) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gettext_stringDiffNew: function gettext_stringDiffNew(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#ff00ff')) continue;
            if((m = /^\+\}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#ff0000')) {if(m = this.gettext_stringWrapSub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#0080f8;textDecoration:underline');
        }
        this.pop();
    },
    gettext_stringDiffOld: function gettext_stringDiffOld(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#ff00ff')) continue;
            if((m = /^-\}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#ff0000')) {if(m = this.gettext_stringWrapSub())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#f00080;textDecoration:underline');
        }
        this.pop();
    },
    gettext_stringWrapSub: function gettext_stringWrapSub(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#ff0000')) return this.pop();
            if(/^./.exec(this.str)) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gettext_previous: function gettext_previous(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(msgctxt|msgid_plural|msgid|msgstr)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#006060;fontStyle:italic')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#00c040;fontStyle:italic')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#008080;fontStyle:italic')) {if(m = this.gettext_stringPrevious())return this.pop(), m-1;continue;}
            if((m = /^\[\d+\]/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#000000;fontStyle:italic')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#000000');
        }
        this.pop();
    },
    gettext_stringPrevious: function gettext_stringPrevious(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#00c040;fontStyle:italic')) continue;
            if((m = /^&([a-zA-Z0-9_.-]+|#[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsString;color:#40c080;fontStyle:italic;fontWeight:bold')) continue;
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) {if(m = this.gettext_stringDiffNewPrevious())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) {if(m = this.gettext_stringDiffOldPrevious())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#006060;fontStyle:italic;fontWeight:bold')) {if(m = this.gettext_stringTagPrevious())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#008080;fontStyle:italic')) {if(m = this.gettext_stringWrapPrevious())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#008080;fontStyle:italic');
        }
        this.pop();
    },
    gettext_stringTagPrevious: function gettext_stringTagPrevious(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#ff00ff')) continue;
            if((m = /^\{\+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) {if(m = this.gettext_stringDiffNewPrevious())return this.pop(), m-1;continue;}
            if((m = /^\{-/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) {if(m = this.gettext_stringDiffOldPrevious())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString;color:#006060;fontStyle:italic;fontWeight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#008080;fontStyle:italic')) {if(m = this.gettext_stringWrapSubPrevious())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#006060;fontStyle:italic;fontWeight:bold');
        }
        this.pop();
    },
    gettext_stringDiffNewPrevious: function gettext_stringDiffNewPrevious(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#00c040;fontStyle:italic')) continue;
            if((m = /^\+\}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0080f8;fontStyle:italic')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#008080;fontStyle:italic')) {if(m = this.gettext_stringWrapSubPrevious())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#0080f8;fontStyle:italic');
        }
        this.pop();
    },
    gettext_stringDiffOldPrevious: function gettext_stringDiffOldPrevious(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar;color:#00c040;fontStyle:italic')) continue;
            if((m = /^-\}/.exec(this.str)) && this.hl(m[0], 'dsString;color:#f00080;fontStyle:italic')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#008080;fontStyle:italic')) {if(m = this.gettext_stringWrapSubPrevious())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#f00080;fontStyle:italic');
        }
        this.pop();
    },
    gettext_stringWrapPrevious: function gettext_stringWrapPrevious(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[^#]/.exec(this.str)) return this.pop(), 1;
            if((m = /^(#\|)? *"/.exec(this.str)) && this.hl(m[0], 'dsString;color:#008080;fontStyle:italic')) return this.pop();
            if(/^./.exec(this.str)) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gettext_stringWrapSubPrevious: function gettext_stringWrapSubPrevious(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[^#]/.exec(this.str)) return this.pop(), 2;
            if((m = /^(#\|)? *"/.exec(this.str)) && this.hl(m[0], 'dsString;color:#008080;fontStyle:italic')) return this.pop();
            if(/^./.exec(this.str)) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
