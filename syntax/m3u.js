KateSyntax.langs.m3u.syntax = {
    default: 'm3u_m3U',
    m3u_m3U: function m3u_m3U(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^#EXTM3U/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^#EXTINF/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.m3u_findEXTINF())return this.pop(), m-1;continue;}
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    m3u_findEXTINF: function m3u_findEXTINF(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^:\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^,.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
