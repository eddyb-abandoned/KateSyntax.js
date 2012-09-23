KateSyntax.langs.xmldebug.syntax = {
    default: 'xmldebug_0Prolog',
    xmldebug_0Prolog: function xmldebug_0Prolog(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\?xml(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_1XMLDeclVersion())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_1XMLDeclVersion: function xmldebug_1XMLDeclVersion(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*version\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_2XMLDeclVersionEq())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_2XMLDeclVersionEq: function xmldebug_2XMLDeclVersionEq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_3XMLDeclVersion())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '\n') return this.pop(), this.xmldebug_5XMLDeclEncodingEq();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_3XMLDeclVersion: function xmldebug_3XMLDeclVersion(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*("[A-Za-z0-9:._-]*"|'[A-Za-z0-9:._-]*')(?!e)\s*/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_4XMLDeclEncoding())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_4XMLDeclEncoding: function xmldebug_4XMLDeclEncoding(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*encoding\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_5XMLDeclEncodingEq())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\?>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_11MiscAfterXMLDecl())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_5XMLDeclEncodingEq: function xmldebug_5XMLDeclEncodingEq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_6XMLDeclEncoding())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_6XMLDeclEncoding: function xmldebug_6XMLDeclEncoding(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*("[A-Za-z][A-Za-z0-9._-]*"|'[A-Za-z][A-Za-z0-9._-]*')(?!s)\s*/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_7XMLDeclStandalone())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_7XMLDeclStandalone: function xmldebug_7XMLDeclStandalone(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*standalone\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_8XMLDeclStandaloneEq())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\?>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_11MiscAfterXMLDecl())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_8XMLDeclStandaloneEq: function xmldebug_8XMLDeclStandaloneEq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_9XMLDeclStandalone())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_9XMLDeclStandalone: function xmldebug_9XMLDeclStandalone(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*"(yes|no)"|'(yes|no)'\s*/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_10XMLDeclStandalone())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_10XMLDeclStandalone: function xmldebug_10XMLDeclStandalone(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\?>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_11MiscAfterXMLDecl())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_11MiscAfterXMLDecl: function xmldebug_11MiscAfterXMLDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\s*<!--\s*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xmldebug_12CommentAfterXMLDecl())return this.pop(), m-1;continue;}
            if((m = /^\s*<\?xml-stylesheet(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_13PIAfterXMLDecl())return this.pop(), m-1;continue;}
            if((m = /^\s*<\??[xX][mM][lL]/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_13PIAfterXMLDecl())return this.pop(), m-1;continue;}
            if((m = /^\s*<\?[a-zA-Z_][a-zA-Z0-9_-]*(:[a-zA-Z0-9_-]*)?(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_13PIAfterXMLDecl())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_14DoctypeDeclName())return this.pop(), m-1;continue;}
            if((m = /^<[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^<\/[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_85ETag())return this.pop(), m-1;continue;}
            if((m = /^<\/(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_85ETag())return this.pop(), m-1;continue;}
            if((m = /^<\/(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_85ETag())return this.pop(), m-1;continue;}
            if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_86CDSect())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xmldebug_87CommentInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?xml-stylesheet(\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsError')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if(this.str[0] == '&' && this.hl('&', 'dsError')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if((m = /^\]\]>/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_12CommentAfterXMLDecl: function xmldebug_12CommentAfterXMLDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xmldebug_13PIAfterXMLDecl: function xmldebug_13PIAfterXMLDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xmldebug_14DoctypeDeclName: function xmldebug_14DoctypeDeclName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_15DoctypeDeclExternalID())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_15DoctypeDeclExternalID: function xmldebug_15DoctypeDeclExternalID(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^PUBLIC(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_16DoctypeDeclPublicID())return this.pop(), m-1;continue;}
            if((m = /^SYSTEM(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_19DoctypeDeclSystemID())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_16DoctypeDeclPublicID: function xmldebug_16DoctypeDeclPublicID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_17DoctypeDeclPublicIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_18DoctypeDeclPublicIDQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_17DoctypeDeclPublicIDQq: function xmldebug_17DoctypeDeclPublicIDQq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {if(m = this.xmldebug_19DoctypeDeclSystemID())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_18DoctypeDeclPublicIDQ: function xmldebug_18DoctypeDeclPublicIDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {if(m = this.xmldebug_19DoctypeDeclSystemID())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_19DoctypeDeclSystemID: function xmldebug_19DoctypeDeclSystemID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_20DoctypeDeclSystemIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_21DoctypeDeclSystemIDQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_20DoctypeDeclSystemIDQq: function xmldebug_20DoctypeDeclSystemIDQq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_22DoctypeDeclISOrEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_21DoctypeDeclSystemIDQ: function xmldebug_21DoctypeDeclSystemIDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_22DoctypeDeclISOrEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_22DoctypeDeclISOrEnd: function xmldebug_22DoctypeDeclISOrEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_23DoctypeDeclIS: function xmldebug_23DoctypeDeclIS(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^<!ELEMENT(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_24Elementdecl())return this.pop(), m-1;continue;}
            if((m = /^<!ATTLIST(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_38AttlistDecl())return this.pop(), m-1;continue;}
            if((m = /^<!ENTITY(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_50EntityDecl())return this.pop(), m-1;continue;}
            if((m = /^<!NOTATION(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_71NotationDeclName())return this.pop(), m-1;continue;}
            if((m = /^\s*<!--\s*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xmldebug_77CommentInsideIS())return this.pop(), m-1;continue;}
            if((m = /^\s*<\?xml-stylesheet(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_78PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^\s*<\??[xX][mM][lL]/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_78PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^\s*<\?[a-zA-Z_][a-zA-Z0-9_-]*(:[a-zA-Z0-9_-]*)?(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_78PIInsideIS())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.str[1] == '>' && this.hl(']>', 'dsKeyword')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_24Elementdecl: function xmldebug_24Elementdecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_25Contentspec())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_25Contentspec: function xmldebug_25Contentspec(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(EMPTY|ANY)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_37ElementEnd())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsDataType')) {if(m = this.xmldebug_26MixedOrChildren())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_26MixedOrChildren: function xmldebug_26MixedOrChildren(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#PCDATA/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_27MixedShort())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.xmldebug_30ChildrenUnknown())return this.pop(), m-1;continue;}
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_30ChildrenUnknown())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_27MixedShort: function xmldebug_27MixedShort(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.xmldebug_28MixedLong())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {if(m = this.xmldebug_37ElementEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_28MixedLong: function xmldebug_28MixedLong(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_29MixedLongEndOrContinue())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_29MixedLongEndOrContinue: function xmldebug_29MixedLongEndOrContinue(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return this.pop();
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == ')' && this.str[1] == '*' && this.hl(')*', 'dsKeyword')) {if(m = this.xmldebug_37ElementEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_30ChildrenUnknown: function xmldebug_30ChildrenUnknown(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.xmldebug_33ChildrenChoice())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {if(m = this.xmldebug_35ChildrenSeq())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_31ChildrenUnknownOrEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_31ChildrenUnknownOrEnd: function xmldebug_31ChildrenUnknownOrEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.xmldebug_33ChildrenChoice())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {if(m = this.xmldebug_35ChildrenSeq())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_32ChildrenUnknownName: function xmldebug_32ChildrenUnknownName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_30ChildrenUnknown())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) continue;
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_33ChildrenChoice: function xmldebug_33ChildrenChoice(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_34ChildrenChoiceOrEnd())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.xmldebug_32ChildrenUnknownName())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_34ChildrenChoiceOrEnd: function xmldebug_34ChildrenChoiceOrEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return this.pop();
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_31ChildrenUnknownOrEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_35ChildrenSeq: function xmldebug_35ChildrenSeq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_36ChildrenSeqOrEnd())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.xmldebug_32ChildrenUnknownName())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_36ChildrenSeqOrEnd: function xmldebug_36ChildrenSeqOrEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) return this.pop();
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_31ChildrenUnknownOrEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_37ElementEnd: function xmldebug_37ElementEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_38AttlistDecl: function xmldebug_38AttlistDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_39AttDef())return this.pop(), m-1;continue;}
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_39AttDef: function xmldebug_39AttDef(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_40AttType())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_40AttType: function xmldebug_40AttType(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_46DefaultDecl())return this.pop(), m-1;continue;}
            if((m = /^NOTATION(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_41NotationStart())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.xmldebug_42Notation())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_41NotationStart: function xmldebug_41NotationStart(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {if(m = this.xmldebug_42Notation())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_42Notation: function xmldebug_42Notation(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_43NotationOrEnd())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_43NotationOrEnd: function xmldebug_43NotationOrEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return this.pop();
            if((m = /^\)(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_46DefaultDecl())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_44Enumeration: function xmldebug_44Enumeration(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(\w|[_:.-])+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_45EnumerationOrEnd: function xmldebug_45EnumerationOrEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {if(m = this.xmldebug_44Enumeration())return this.pop(), m-1;continue;}
            if((m = /^\)(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_46DefaultDecl())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_46DefaultDecl: function xmldebug_46DefaultDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(#REQUIRED|#IMPLIED)(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_39AttDef())return this.pop(), m-1;continue;}
            if((m = /^#FIXED(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_47DefaultDeclAttValue())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_48DefaultDeclAttValueQq())return this.pop(), m-1;continue;}
            if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_49DefaultDeclAttValueQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_47DefaultDeclAttValue: function xmldebug_47DefaultDeclAttValue(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_48DefaultDeclAttValueQq())return this.pop(), m-1;continue;}
            if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_49DefaultDeclAttValueQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_48DefaultDeclAttValueQq: function xmldebug_48DefaultDeclAttValueQq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_39AttDef())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_49DefaultDeclAttValueQ: function xmldebug_49DefaultDeclAttValueQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_39AttDef())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_50EntityDecl: function xmldebug_50EntityDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_52GEDeclEntityValueOrExternalID())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsChar')) {if(m = this.xmldebug_61PEDecl())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_51Unused: function xmldebug_51Unused(m) {
        this.push();
        while(this.pos < this.len) {
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_52GEDeclEntityValueOrExternalID: function xmldebug_52GEDeclEntityValueOrExternalID(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_53GEDeclEntityValueQq())return this.pop(), m-1;continue;}
            if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_54GEDeclEntityValueQ())return this.pop(), m-1;continue;}
            if((m = /^PUBLIC(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_55GEDeclPublicID())return this.pop(), m-1;continue;}
            if((m = /^SYSTEM(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_58GEDeclSystemID())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_53GEDeclEntityValueQq: function xmldebug_53GEDeclEntityValueQq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[&%](?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsError')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_69GEDeclEndOrNDATA())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_54GEDeclEntityValueQ: function xmldebug_54GEDeclEntityValueQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[&%](?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsError')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_69GEDeclEndOrNDATA())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_55GEDeclPublicID: function xmldebug_55GEDeclPublicID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_56GEDeclPublicIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_57GEDeclPublicIDQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_56GEDeclPublicIDQq: function xmldebug_56GEDeclPublicIDQq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {if(m = this.xmldebug_58GEDeclSystemID())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_57GEDeclPublicIDQ: function xmldebug_57GEDeclPublicIDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {if(m = this.xmldebug_58GEDeclSystemID())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_58GEDeclSystemID: function xmldebug_58GEDeclSystemID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_59GEDeclSystemIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_60GEDeclSystemIDQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_59GEDeclSystemIDQq: function xmldebug_59GEDeclSystemIDQq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_69GEDeclEndOrNDATA())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_60GEDeclSystemIDQ: function xmldebug_60GEDeclSystemIDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_69GEDeclEndOrNDATA())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_61PEDecl: function xmldebug_61PEDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_62PEDeclEntityValueOrExternalID())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_62PEDeclEntityValueOrExternalID: function xmldebug_62PEDeclEntityValueOrExternalID(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_53GEDeclEntityValueQq())return this.pop(), m-1;continue;}
            if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_54GEDeclEntityValueQ())return this.pop(), m-1;continue;}
            if((m = /^PUBLIC(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_63PEDeclPublicID())return this.pop(), m-1;continue;}
            if((m = /^SYSTEM(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_66PEDeclSystemID())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_63PEDeclPublicID: function xmldebug_63PEDeclPublicID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_64PEDeclPublicIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_65PEDeclPublicIDQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_64PEDeclPublicIDQq: function xmldebug_64PEDeclPublicIDQq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {if(m = this.xmldebug_66PEDeclSystemID())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_65PEDeclPublicIDQ: function xmldebug_65PEDeclPublicIDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {if(m = this.xmldebug_66PEDeclSystemID())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_66PEDeclSystemID: function xmldebug_66PEDeclSystemID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_67PEDeclSystemIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_68PEDeclSystemIDQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_67PEDeclSystemIDQq: function xmldebug_67PEDeclSystemIDQq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_37ElementEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_68PEDeclSystemIDQ: function xmldebug_68PEDeclSystemIDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_37ElementEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_69GEDeclEndOrNDATA: function xmldebug_69GEDeclEndOrNDATA(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if((m = /^NDATA(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_70GEDeclNDATA())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_70GEDeclNDATA: function xmldebug_70GEDeclNDATA(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_37ElementEnd())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_71NotationDeclName: function xmldebug_71NotationDeclName(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_72NotationDeclExternalID())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_72NotationDeclExternalID: function xmldebug_72NotationDeclExternalID(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^PUBLIC(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_73NotationDeclPublicID())return this.pop(), m-1;continue;}
            if((m = /^SYSTEM(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_66PEDeclSystemID())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_73NotationDeclPublicID: function xmldebug_73NotationDeclPublicID(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_74NotationDeclPublicIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_75NotationDeclPublicIDQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_74NotationDeclPublicIDQq: function xmldebug_74NotationDeclPublicIDQq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {if(m = this.xmldebug_76NotationDeclSystemIDOrEnd())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_75NotationDeclPublicIDQ: function xmldebug_75NotationDeclPublicIDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {if(m = this.xmldebug_76NotationDeclSystemIDOrEnd())return this.pop(), m-1;continue;}
            if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_76NotationDeclSystemIDOrEnd: function xmldebug_76NotationDeclSystemIDOrEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_67PEDeclSystemIDQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_68PEDeclSystemIDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_77CommentInsideIS: function xmldebug_77CommentInsideIS(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xmldebug_78PIInsideIS: function xmldebug_78PIInsideIS(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) {if(m = this.xmldebug_23DoctypeDeclIS())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xmldebug_79Outside: function xmldebug_79Outside(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^<\/[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_85ETag())return this.pop(), m-1;continue;}
            if((m = /^<\/(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_85ETag())return this.pop(), m-1;continue;}
            if((m = /^<\/(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_85ETag())return this.pop(), m-1;continue;}
            if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_86CDSect())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xmldebug_87CommentInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?xml-stylesheet(\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_88PIInsideIS())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
            if((m = /^\]\]>/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xmldebug_80STag: function xmldebug_80STag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if((m = /^(xmlns:(\w|[_.-])*|xmlns|xml:(lang|base|space))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_81STagAttribute())return this.pop(), m-1;continue;}
            if((m = /^[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_81STagAttribute())return this.pop(), m-1;continue;}
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.xmldebug_81STagAttribute())return this.pop(), m-1;continue;}
            if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_81STagAttribute())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_81STagAttribute: function xmldebug_81STagAttribute(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '=' && this.hl('=', 'dsDataType')) {if(m = this.xmldebug_82STagAttributeValue())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_82STagAttributeValue: function xmldebug_82STagAttributeValue(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.xmldebug_83STagValueQq())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.xmldebug_84STagValueQ())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_83STagValueQq: function xmldebug_83STagValueQq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if((m = /^"(?=(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:]))/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^"(?=>|\/>|\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_84STagValueQ: function xmldebug_84STagValueQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
            if((m = /^'(?=(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:]))/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            if((m = /^'(?=>|\/>|\s|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsString')) {if(m = this.xmldebug_80STag())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    xmldebug_85ETag: function xmldebug_85ETag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    xmldebug_86CDSect: function xmldebug_86CDSect(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\]\]>/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    xmldebug_87CommentInsideIS: function xmldebug_87CommentInsideIS(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    xmldebug_88PIInsideIS: function xmldebug_88PIInsideIS(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) {if(m = this.xmldebug_79Outside())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
