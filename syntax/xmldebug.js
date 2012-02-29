var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._0Prolog();
    this.hl('');
    return this.main;
};
HL.prototype.hl = function hl(m,s) {
    this.pos += m.length;
    this.str = this.str.slice(m.length);
    if(this.style == s)
        this.hlText += m;
    else {
        if(this.hlText) {
            if(this.style == 'dsNormal')
                this.main.appendChild(document.createTextNode(this.hlText));
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(this.hlText));
                span.className = this.style;
                this.main.appendChild(span);
            }
        }
        this.style = s;
        this.hlText = m;
    }
    return true;
};
HL.prototype._0Prolog = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<\?xml(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._1XMLDeclVersion();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._1XMLDeclVersion = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*version\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._2XMLDeclVersionEq();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._2XMLDeclVersionEq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._3XMLDeclVersion();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._3XMLDeclVersion = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*("[A-Za-z0-9:._-]*"|'[A-Za-z0-9:._-]*')(?!e)\s*/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._4XMLDeclEncoding();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._4XMLDeclEncoding = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*encoding\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._5XMLDeclEncodingEq();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\?>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._11MiscAfterXMLDecl();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._5XMLDeclEncodingEq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._6XMLDeclEncoding();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._6XMLDeclEncoding = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*("[A-Za-z][A-Za-z0-9._-]*"|'[A-Za-z][A-Za-z0-9._-]*')(?!s)\s*/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._7XMLDeclStandalone();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._7XMLDeclStandalone = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*standalone\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._8XMLDeclStandaloneEq();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\?>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._11MiscAfterXMLDecl();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._8XMLDeclStandaloneEq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*=\s*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._9XMLDeclStandalone();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._9XMLDeclStandalone = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*"(yes|no)"|'(yes|no)'\s*/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._10XMLDeclStandalone();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._10XMLDeclStandalone = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\?>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._11MiscAfterXMLDecl();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._11MiscAfterXMLDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s*<!--\s*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._12CommentAfterXMLDecl();continue;}
        if((m = /^\s*<\?xml-stylesheet(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._13PIAfterXMLDecl();continue;}
        if((m = /^\s*<\??[xX][mM][lL]/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._13PIAfterXMLDecl();continue;}
        if((m = /^\s*<\?[a-zA-Z_][a-zA-Z0-9_-]*(:[a-zA-Z0-9_-]*)?(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._13PIAfterXMLDecl();continue;}
        if((m = /^<!DOCTYPE(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._14DoctypeDeclName();continue;}
        if((m = /^<[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._80STag();continue;}
        if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._80STag();continue;}
        if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._80STag();continue;}
        if((m = /^</[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._85ETag();continue;}
        if((m = /^</(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._85ETag();continue;}
        if((m = /^</(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._85ETag();continue;}
        if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._79Outside();continue;}
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._79Outside();continue;}
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._86CDSect();continue;}
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._87CommentInsideIS();continue;}
        if((m = /^<\?xml-stylesheet(\s|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._88PIInsideIS();continue;}
        if((m = /^<\?[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._88PIInsideIS();continue;}
        if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._88PIInsideIS();continue;}
        if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._88PIInsideIS();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsError')) {this._79Outside();continue;}
        if(this.str[0] == '&' && this.hl('&', 'dsError')) {this._79Outside();continue;}
        if((m = /^\]\]>/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._79Outside();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._12CommentAfterXMLDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._13PIAfterXMLDecl = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._14DoctypeDeclName = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._15DoctypeDeclExternalID();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._15DoctypeDeclExternalID = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^PUBLIC(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._16DoctypeDeclPublicID();continue;}
        if((m = /^SYSTEM(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._19DoctypeDeclSystemID();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._16DoctypeDeclPublicID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._17DoctypeDeclPublicIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._18DoctypeDeclPublicIDQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._17DoctypeDeclPublicIDQq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {this._19DoctypeDeclSystemID();continue;}
        if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._18DoctypeDeclPublicIDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {this._19DoctypeDeclSystemID();continue;}
        if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._19DoctypeDeclSystemID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._20DoctypeDeclSystemIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._21DoctypeDeclSystemIDQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._20DoctypeDeclSystemIDQq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._22DoctypeDeclISOrEnd();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._21DoctypeDeclSystemIDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._22DoctypeDeclISOrEnd();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._22DoctypeDeclISOrEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._79Outside();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._23DoctypeDeclIS = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^<!ELEMENT(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._24Elementdecl();continue;}
        if((m = /^<!ATTLIST(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._38AttlistDecl();continue;}
        if((m = /^<!ENTITY(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._50EntityDecl();continue;}
        if((m = /^<!NOTATION(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._71NotationDeclName();continue;}
        if((m = /^\s*<!--\s*/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._77CommentInsideIS();continue;}
        if((m = /^\s*<\?xml-stylesheet(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._78PIInsideIS();continue;}
        if((m = /^\s*<\??[xX][mM][lL]/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._78PIInsideIS();continue;}
        if((m = /^\s*<\?[a-zA-Z_][a-zA-Z0-9_-]*(:[a-zA-Z0-9_-]*)?(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._78PIInsideIS();continue;}
        if(this.str[0] == ']' && this.str[1] == '>' && this.hl(']>', 'dsKeyword')) {this._79Outside();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._24Elementdecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._25Contentspec();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._25Contentspec = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(EMPTY|ANY)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._37ElementEnd();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsDataType')) {this._26MixedOrChildren();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._26MixedOrChildren = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#PCDATA/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._27MixedShort();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._30ChildrenUnknown();continue;}
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._30ChildrenUnknown();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._27MixedShort = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._28MixedLong();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsKeyword')) {this._37ElementEnd();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._28MixedLong = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._29MixedLongEndOrContinue();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._29MixedLongEndOrContinue = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == ')' && this.str[1] == '*' && this.hl(')*', 'dsKeyword')) {this._37ElementEnd();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._30ChildrenUnknown = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._33ChildrenChoice();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {this._35ChildrenSeq();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._31ChildrenUnknownOrEnd();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._31ChildrenUnknownOrEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._33ChildrenChoice();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) {this._35ChildrenSeq();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._32ChildrenUnknownName = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._30ChildrenUnknown();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) continue;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._33ChildrenChoice = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._34ChildrenChoiceOrEnd();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._32ChildrenUnknownName();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._34ChildrenChoiceOrEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._31ChildrenUnknownOrEnd();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._35ChildrenSeq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._36ChildrenSeqOrEnd();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._32ChildrenUnknownName();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._36ChildrenSeqOrEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) return;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\)[\?\*\+]?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._31ChildrenUnknownOrEnd();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._37ElementEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._38AttlistDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._39AttDef();continue;}
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._39AttDef = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._40AttType();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._40AttType = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._46DefaultDecl();continue;}
        if((m = /^NOTATION(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._41NotationStart();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._42Notation();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._41NotationStart = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsKeyword')) {this._42Notation();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._42Notation = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._43NotationOrEnd();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._43NotationOrEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) return;
        if((m = /^\)(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._46DefaultDecl();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._44Enumeration = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(\w|[_:.-])+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._45EnumerationOrEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|' && this.hl('|', 'dsKeyword')) {this._44Enumeration();continue;}
        if((m = /^\)(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._46DefaultDecl();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._46DefaultDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(#REQUIRED|#IMPLIED)(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._39AttDef();continue;}
        if((m = /^#FIXED(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._47DefaultDeclAttValue();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._48DefaultDeclAttValueQq();continue;}
        if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._49DefaultDeclAttValueQ();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._47DefaultDeclAttValue = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._48DefaultDeclAttValueQq();continue;}
        if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._49DefaultDeclAttValueQ();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._48DefaultDeclAttValueQq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._39AttDef();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._49DefaultDeclAttValueQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._39AttDef();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._50EntityDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._52GEDeclEntityValueOrExternalID();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsChar')) {this._61PEDecl();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._51Unused = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._52GEDeclEntityValueOrExternalID = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._53GEDeclEntityValueQq();continue;}
        if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._54GEDeclEntityValueQ();continue;}
        if((m = /^PUBLIC(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._55GEDeclPublicID();continue;}
        if((m = /^SYSTEM(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._58GEDeclSystemID();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._53GEDeclEntityValueQq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[&%](?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsError')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._69GEDeclEndOrNDATA();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._54GEDeclEntityValueQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[&%](?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsError')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._69GEDeclEndOrNDATA();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._55GEDeclPublicID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._56GEDeclPublicIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._57GEDeclPublicIDQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._56GEDeclPublicIDQq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {this._58GEDeclSystemID();continue;}
        if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._57GEDeclPublicIDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {this._58GEDeclSystemID();continue;}
        if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._58GEDeclSystemID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._59GEDeclSystemIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._60GEDeclSystemIDQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._59GEDeclSystemIDQq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._69GEDeclEndOrNDATA();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._60GEDeclSystemIDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._69GEDeclEndOrNDATA();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._61PEDecl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._62PEDeclEntityValueOrExternalID();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._62PEDeclEntityValueOrExternalID = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^"/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._53GEDeclEntityValueQq();continue;}
        if((m = /^'/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._54GEDeclEntityValueQ();continue;}
        if((m = /^PUBLIC(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._63PEDeclPublicID();continue;}
        if((m = /^SYSTEM(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._66PEDeclSystemID();continue;}
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._63PEDeclPublicID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._64PEDeclPublicIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._65PEDeclPublicIDQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._64PEDeclPublicIDQq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {this._66PEDeclSystemID();continue;}
        if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._65PEDeclPublicIDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {this._66PEDeclSystemID();continue;}
        if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._66PEDeclSystemID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._67PEDeclSystemIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._68PEDeclSystemIDQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._67PEDeclSystemIDQq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._37ElementEnd();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._68PEDeclSystemIDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._37ElementEnd();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._69GEDeclEndOrNDATA = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        if((m = /^NDATA(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._70GEDeclNDATA();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._70GEDeclNDATA = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._37ElementEnd();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._71NotationDeclName = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._72NotationDeclExternalID();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._72NotationDeclExternalID = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^PUBLIC(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._73NotationDeclPublicID();continue;}
        if((m = /^SYSTEM(\s+|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._66PEDeclSystemID();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._73NotationDeclPublicID = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._74NotationDeclPublicIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._75NotationDeclPublicIDQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._74NotationDeclPublicIDQq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"(\s+|$)' && this.hl('"(\s+|$)', 'dsString')) {this._76NotationDeclSystemIDOrEnd();continue;}
        if((m = /^[ 
a-zA-Z0-9'()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._75NotationDeclPublicIDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''(\s+|$)' && this.hl(''(\s+|$)', 'dsString')) {this._76NotationDeclSystemIDOrEnd();continue;}
        if((m = /^[ 
a-zA-Z0-9()+,./:=?;!*#@$_%-]/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._76NotationDeclSystemIDOrEnd = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._67PEDeclSystemIDQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._68PEDeclSystemIDQ();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._77CommentInsideIS = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._23DoctypeDeclIS();continue;}
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._23DoctypeDeclIS();continue;}
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._78PIInsideIS = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) {this._23DoctypeDeclIS();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._79Outside = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^<[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._80STag();continue;}
        if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._80STag();continue;}
        if((m = /^<(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._80STag();continue;}
        if((m = /^</[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._85ETag();continue;}
        if((m = /^</(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._85ETag();continue;}
        if((m = /^</(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._85ETag();continue;}
        if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._86CDSect();continue;}
        if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._87CommentInsideIS();continue;}
        if((m = /^<\?xml-stylesheet(\s|$)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._88PIInsideIS();continue;}
        if((m = /^<\?[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._88PIInsideIS();continue;}
        if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._88PIInsideIS();continue;}
        if((m = /^<\?(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._88PIInsideIS();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
        if((m = /^\]\]>/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._80STag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) {this._79Outside();continue;}
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._79Outside();continue;}
        if((m = /^(xmlns:(\w|[_.-])*|xmlns|xml:(lang|base|space))/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._81STagAttribute();continue;}
        if((m = /^[xX][mM][lL](\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._81STagAttribute();continue;}
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|_)(\w|[_.-])*(:(\w|[_.-])+)?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._81STagAttribute();continue;}
        if((m = /^(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[:_])(\w|[:_.-])*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._81STagAttribute();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._81STagAttribute = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '=' && this.hl('=', 'dsDataType')) {this._82STagAttributeValue();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._82STagAttributeValue = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._83STagValueQq();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._84STagValueQ();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._83STagValueQq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if((m = /^"(?=(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:]))/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._80STag();continue;}
        if((m = /^"(?=>|/>|\s|$)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._80STag();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._84STagValueQ = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:])(\w|[_:.-])*;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^&#(x[0-9a-fA-F]+|[0-9]+);/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsError')) continue;
        if(this.str[0] == '<' && this.hl('<', 'dsError')) continue;
        if((m = /^'(?=(?![٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௧-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩]|\d)(\w|[_:]))/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._80STag();continue;}
        if((m = /^'(?=>|/>|\s|$)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._80STag();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._85ETag = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {this._79Outside();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._86CDSect = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\]\]>/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._79Outside();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._87CommentInsideIS = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^--->/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._79Outside();continue;}
        if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._79Outside();continue;}
        if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._88PIInsideIS = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) {this._79Outside();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
