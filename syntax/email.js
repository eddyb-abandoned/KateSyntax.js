KateSyntax.langs.email.syntax = {
    default: 'email_headder',
    email_headder: function email_headder(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[Tt]o:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsAlert;color:darkgreen;fontWeight:bold')) continue;
            if((m = /^[Ff]rom:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsAlert;color:darkgreen;fontWeight:bold')) continue;
            if((m = /^[Cc][Cc]:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsAlert;color:darkgreen;fontWeight:bold')) continue;
            if((m = /^[Bb][Cc][Cc]:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsAlert;color:darkgreen;fontWeight:bold')) continue;
            if((m = /^[Ss]ubject:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsAlert;color:darkgreen;fontWeight:bold')) continue;
            if((m = /^[Dd]ate:.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsAlert;color:darkgreen;fontWeight:bold')) continue;
            if((m = /^[Ss]ender:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]eply-[Tt]o:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Mm]essage-[Ii][Dd]:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Ii]n-[Rr]eply-[Tt]o:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]eferences:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Cc]omments:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Kk]eywors:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Dd]ate:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Ff]rom:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Ss]ender:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Tt]o:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Cc][Cc]:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Bb][Cc][Cc]:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Mm]essage-[Ii][Dd]:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]esent-[Rr]eply-[Tt]o:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]eturn-[Pp]ath:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Rr]eceived:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:darkgreen')) continue;
            if((m = /^[Xx]-[Mm]ozilla-[Ss]tatus:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Xx]-[Mm]ozilla-[Ss]tatus2:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Ee]nverlope-[Tt]o:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Dd]elivery-[Dd]ate:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Xx]-[Oo]riginating-[Ii][Pp]:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Xx]-[Oo]riginating-[Ee]mail:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Xx]-[Ss]ender:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Mm]ime-[Vv]ersion:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Cc]ontent-[Tt]ype:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Xx]-[Mm]ailing-[Ll]ist:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Xx]-[Ll]oop:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Ll]ist-[Pp]ost:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Ll]ist-[Hh]elp:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Ll]ist-[Uu]nsubscribe:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Pp]recedence:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Cc]ontent-[Tt]ransfer-[Ee]ncoding:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Cc]ontent-[Tt]ype:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Xx]-[Bb]ulkmail:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Pp]recedence:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[Cc]ontent-[Dd]isposition:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:gold')) continue;
            if((m = /^[0-9a-zA-Z-.]+:/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:red')) continue;
            if((m = /^[a-zA-Z0-9.\-]+\@[a-zA-Z0-9.\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:blue')) continue;
            if((m = /^[a-zA-Z0-9.\-]*\s*<[a-zA-Z0-9.\-]+\@[a-zA-Z0-9.\-]+>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:blue')) continue;
            if((m = /^"[a-zA-Z0-9. \-]+"\s*<[a-zA-Z0-9.\-]+\@[a-zA-Z0-9.\-]+>/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:blue')) continue;
            if((m = /^".*"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^'.*'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[|>]\s*[|>]\s*[|>]\s*[|>]\s*[|>]\s*[|>].*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:yellow;fontWeight:bold')) continue;
            if((m = /^[|>]\s*[|>]\s*[|>]\s*[|>]\s*[|>].*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:magenta;fontWeight:bold')) continue;
            if((m = /^[|>]\s*[|>]\s*[|>]\s*[|>].*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:cyan;fontWeight:bold')) continue;
            if((m = /^[|>]\s*[|>]\s*[|>].*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:blue;fontWeight:bold')) continue;
            if((m = /^[|>]\s*[|>].*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:green;fontWeight:bold')) continue;
            if((m = /^[|>].*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:red;fontWeight:bold')) continue;
            if((m = /^([A-Za-z0-9+/][A-Za-z0-9+/][A-Za-z0-9+/][A-Za-z0-9+/]){10,20}(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^[A-Za-z0-9+=/]+=(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^(- )?--(--.*)?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
