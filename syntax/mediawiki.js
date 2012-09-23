KateSyntax.langs.mediawiki.syntax = {
    default: 'mediawiki_normal',
    mediawiki_normal: function mediawiki_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.mediawiki_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^([=]{2,2}[^=]+[=]{2,2}|[=]{3,3}[^=]+[=]{3,3}|[=]{4,4}[^=]+[=]{4,4}|[=]{5,5}[^=]+[=]{5,5})/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[~]{3,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if(this.col === 0 && (m = /^[*#;:\s]*[*#:]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if((m = /^[[](?![[])/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_uRL())return this.pop(), m-1;continue;}
            if((m = /^(http:|ftp:|mailto:)[\S]*((?=$|\n)|[\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[']{2,}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if(this.col === 0 && this.str[0] == '{' && this.str[1] == '|' && this.hl('{|', 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_table())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_template())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.str[1] == '[' && this.hl('[[', 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_wikiLink())return this.pop(), m-1;continue;}
            if((m = /^&.*?;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^<nowiki>/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_noWiki())return this.pop(), m-1;continue;}
            if((m = /^<pre>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mediawiki_pre())return this.pop(), m-1;continue;}
            if((m = /^[<][^>]+[>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^[\s]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.mediawiki_unformatted())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mediawiki_table: function mediawiki_table(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.mediawiki_comment())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^([=]{2,2}[^=]+[=]{2,2}|[=]{3,3}[^=]+[=]{3,3}|[=]{4,4}[^=]+[=]{4,4}|[=]{5,5}[^=]+[=]{5,5})/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^[*#;:\s]*[*#:]+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if((m = /^[[](?![[])/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_uRL())return this.pop(), m-1;continue;}
            if((m = /^(http:|ftp:|mailto:)[\S]*((?=$|\n)|[\s])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^[']{2,}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if(this.col === 0 && this.str[0] == '|' && this.str[1] == '}' && this.hl('|}', 'dsDecVal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal;fontWeight:bold')) continue;
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_template())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.str[1] == '[' && this.hl('[[', 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_wikiLink())return this.pop(), m-1;continue;}
            if((m = /^&.*?;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^<nowiki>/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_noWiki())return this.pop(), m-1;continue;}
            if((m = /^<pre>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mediawiki_pre())return this.pop(), m-1;continue;}
            if((m = /^[<][^>]+[>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^[\s]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.mediawiki_unformatted())return this.pop(), m-1;continue;}
            if((m = /^[~]{3,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if((m = /^[-]{4,}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if(this.col === 0 && this.str[0] == '!' && this.hl('!', 'dsDecVal;fontWeight:bold')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mediawiki_comment: function mediawiki_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    mediawiki_uRL: function mediawiki_uRL(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsDecVal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mediawiki_wikiLink: function mediawiki_wikiLink(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsDecVal;fontWeight:bold')) {if(m = this.mediawiki_wikiLinkDescription())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.str[1] == ']' && this.hl(']]', 'dsDecVal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mediawiki_wikiLinkDescription: function mediawiki_wikiLinkDescription(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.str[1] == ']') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mediawiki_link: function mediawiki_link(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsDecVal;fontWeight:bold')) return this.pop();
            if((m = /^['[\]]/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.mediawiki_error())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mediawiki_error: function mediawiki_error(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    mediawiki_template: function mediawiki_template(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsDecVal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    mediawiki_noWiki: function mediawiki_noWiki(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!--[^-]*-->/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<\/nowiki>/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) return this.pop();
            if((m = /^[<][^>]+[>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^<pre>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.mediawiki_pre())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mediawiki_unformatted: function mediawiki_unformatted(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    mediawiki_pre: function mediawiki_pre(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/pre>/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
