KateSyntax.langs.relaxngcompact.syntax = {
    default: 'relaxngcompact_normalText',
    relaxngcompact_normalText: function relaxngcompact_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.relaxngcompact_comments())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.relaxngcompact_string())return this.pop(), m-1;continue;}
            if((m = /^(?:default|datatypes|div|empty|external|grammar|include|inherit|list|mixed|namespace|notAllowed|parent|start|token)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attribute|element)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.relaxngcompact_nodeNames())return this.pop(), m-1;continue;}
            if((m = /^(?:string|text|xsd:anyURI|xsd:base64Binary|xsd:boolean|xsd:byte|xsd:date|xsd:dateTime|xsd:decimal|xsd:double|xsd:duration|xsd:ENTITIES|xsd:ENTITY|xsd:float|xsd:gDay|xsd:gMonth|xsd:gMonthDay|xsd:gYear|xsd:gYearMonth|xsd:hexBinary|xsd:ID|xsd:IDREF|xsd:IDREFS|xsd:int|xsd:integer|xsd:language|xsd:long|xsd:Name|xsd:NCName|xsd:negativeInteger|xsd:NMTOKEN|xsd:NMTOKENS|xsd:nonNegativeInteger|xsd:nonPositiveInteger|xsd:normalizedString|xsd:NOTATION|xsd:positiveInteger|xsd:QName|xsd:short|xsd:string|xsd:time|xsd:token|xsd:unsignedByte|xsd:unsignedInt|xsd:unsignedLong|xsd:unsignedShort)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(/^[\w\.-]+[\s]+=/.exec(this.str)) {if(m = this.relaxngcompact_definitions())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    relaxngcompact_comments: function relaxngcompact_comments(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    relaxngcompact_string: function relaxngcompact_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    relaxngcompact_nodeNames: function relaxngcompact_nodeNames(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{') return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    relaxngcompact_definitions: function relaxngcompact_definitions(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '=') return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    }
};
