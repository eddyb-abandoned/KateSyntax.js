KateSyntax.langs.asn1.syntax = {
    default: 'asn1_normalText',
    asn1_normalText: function asn1_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:DEFINITIONS|BEGIN|END|EXPORTS|IMPORTS|FROM|APPLICATION|PRIVATE|UNIVERSAL|DEFAULT|OPTIONAL|FALSE|TRUE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:BOOLEAN|INTEGER|OCTET STRING|NULL|REAL|ENUMERATED|SEQUENCE|SET|CHOICE|OF|VisibleString|StringStore)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this.asn1_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    asn1_comment: function asn1_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
