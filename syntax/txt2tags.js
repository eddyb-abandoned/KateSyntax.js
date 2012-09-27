KateSyntax.langs.txt2tags.syntax = {
    default: 'txt2tags_context',
    txt2tags_context: function txt2tags_context(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%%date(\(.*\))?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF0000;font-style:italic')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^%.*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#666666;font-style:italic')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^\*\*\/\/(.*)\/\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-style:italic;font-weight:bold')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^\/\/\*\*(.*)\*\*\/\//.exec(this.str)) && this.hl(m[0], 'dsNormal;font-style:italic;font-weight:bold')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^\*\*.*\*\*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#445675;font-weight:bold')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^\/\/.*\/\//.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#653A39;font-style:italic')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^__.*__/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#386742;text-decoration:underline')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^--.*--/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#644A9B;text-decoration:line-through')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^``.*``/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#006600')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^``` .*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#006600')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *=[^=].*[^=]=(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *==[^=].*[^=]==(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *===[^=].*[^=]===(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *====[^=].*[^=]====(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *=====[^=].*[^=]=====(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\+[^=].*[^=]\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\+\+[^=].*[^=]\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\+\+\+[^=].*[^=]\+\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\+\+\+\+[^=].*[^=]\+\+\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\+\+\+\+\+[^=].*[^=]\+\+\+\+\+(\[.*\])?\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#990000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^\[.*?]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0930DE')) continue;
            if(this.col === 0 && (m = /^ *\|\| .*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF0000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\| .*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#FF0000')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\: .*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#E300EE')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\- .*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#E300EE')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *\+ .*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#E300EE')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^\t.*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:brown')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if((m = /^\s*([_=-]{20,})\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#C0C0C0')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^(?=$|\n)(?=$|\n)/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) {if(m = this.txt2tags_context())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
