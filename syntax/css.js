var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._base();
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
HL.prototype._base = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._media();continue;}
        if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._import();continue;}
        if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._ruleSet();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._selAttr();continue;}
        if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\.([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^:lang\([\w_-]+\)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsDecVal')) {this._selPseudo();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findRuleSets = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._media();continue;}
        if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._import();continue;}
        if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._ruleSet();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._selAttr();continue;}
        if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\.([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^:lang\([\w_-]+\)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsDecVal')) {this._selPseudo();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findValues = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findStrings = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findComments = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._media = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsDecVal')) {this._media2();continue;}
        if((m = /^(?:all|aural|braille|embossed|handheld|print|projection|screen|tty|tv)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == ',' && this.hl(',', 'dsDecVal')) continue;
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        if((m = /^\S+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._media2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsDecVal')) {this._#pop#pop();continue;}
        if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._media();continue;}
        if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._import();continue;}
        if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {this._ruleSet();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) {this._selAttr();continue;}
        if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\.([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^:lang\([\w_-]+\)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsDecVal')) {this._selPseudo();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._selAttr = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) return;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._selPseudo = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:hover|link|visited|active|focus|first-child|last-child|only-child|first-of-type|last-of-type|only-of-type|first-letter|first-line|before|after|selection|root|empty|target|enabled|disabled|checked|indeterminate|nth-child|nth-last-child|nth-of-type|nth-last-of-type|not)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._import = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ';' && this.hl(';', 'dsDecVal')) return;
        if((m = /^(?:all|aural|braille|embossed|handheld|print|projection|screen|tty|tv)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._ruleSet = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return;
        if((m = /^(?:azimuth|background|background-attachment|background-color|background-image|background-position|background-repeat|border|border-bottom|border-bottom-color|border-bottom-style|border-bottom-width|border-collapse|border-color|border-left|border-left-color|border-left-style|border-left-width|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-style|border-top-width|border-width|bottom|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue|cue-after|cue-before|cursor|direction|display|elevation|empty-cells|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|height|left|letter-spacing|line-height|list-style|list-style-image|list-style-keyword|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|marker-offset|max-height|max-width|min-height|min-width|orphans|outline|outline-color|outline-style|outline-width|overflow|padding|padding-bottom|padding-left|padding-right|padding-top|page|page-break-after|page-break-before|page-break-inside|pause|pause-after|pause-before|pitch|pitch-range|play-during|position|quotes|richness|right|size|speak|speak-header|speak-numeral|speak-punctuation|speech-rate|stress|table-layout|text-align|text-decoration|text-decoration-color|text-indent|text-shadow|text-transform|top|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index|border-bottom-image|border-bottom-left-image|border-bottom-left-radius|border-bottom-right-image|border-bottom-right-radius|border-corner-image|border-image|border-left-image|border-radius|border-right-image|border-top-image|border-top-left-image|border-top-left-radius|border-top-right-image|border-top-right-radius|box-shadow|box-sizing|opacity|outline-offset|overflow-x|overflow-y|text-overflow|text-shadow|-moz-border-bottom-colors|-moz-border-left-colors|-moz-border-radius|-moz-border-right-colors|-moz-border-top-colors|-moz-box-flex|-o-background-size|-o-text-overflow|-khtml-background-size|konq_bgpos_x|konq_bgpos_y|-webkit-background-size|font-family|font-size|font-stretch|font-style|font-variant|font-weight|unicode-range|units-per-em|src|panose-1|stemv|stemh|slope|cap-height|x-height|ascent|descent|widths|bbox|definition-src|baseline|centerline|mathline|topline)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^-?[A-Za-z_-]+(?=\s*:)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._rule();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rule = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ':' && this.hl(':', 'dsKeyword')) {this._rule2();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rule2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ';' && this.hl(';', 'dsKeyword')) {this._#pop#pop();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) {this._#pop#pop#pop();continue;}
        if((m = /^(?:inherit|none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|xx-small|x-small|small|medium|large|x-large|xx-large|smaller|larger|italic|oblique|small-caps|normal|bold|bolder|lighter|light|100|200|300|400|500|600|700|800|900|transparent|repeat|repeat-x|repeat-y|no-repeat|baseline|sub|super|top|text-top|middle|bottom|text-bottom|left|right|center|justify|konq-center|disc|circle|square|box|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-alpha|lower-latin|upper-alpha|upper-latin|hebrew|armenian|georgian|cjk-ideographic|hiragana|katakana|hiragana-iroha|katakana-iroha|inline|inline-block|block|list-item|run-in|compact|marker|table|inline-table|table-row-group|table-header-group|table-footer-group|table-row|table-column-group|table-column|table-cell|table-caption|auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help|above|absolute|always|avoid|below|bidi-override|blink|both|capitalize|caption|clip|close-quote|collapse|condensed|crop|cross|ellipsis|ellipsis-word|embed|expanded|extra-condensed|extra-expanded|fixed|hand|hide|higher|icon|inside|invert|landscape|level|line-through|loud|lower|lowercase|ltr|menu|message-box|mix|narrower|no-close-quote|no-open-quote|nowrap|open-quote|outside|overline|portrait|pre|pre-line|pre-wrap|relative|rtl|scroll|semi-condensed|semi-expanded|separate|show|small-caption|static|static-position|status-bar|thick|thin|ultra-condensed|ultra-expanded|underline|uppercase|visible|wider|break|serif|sans-serif|cursive|fantasy|monospace|border-box|content-box|-moz-box)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:aqua|black|blue|cyan|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#([0-9A-Fa-f]{3}){1,4}\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:url|attr|rect|rgb|rgba|hsl|hsla|counter|counters|local|format|expression)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._propParen();continue;}
        if((m = /^!important\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._propParen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsDataType')) {this._propParen2();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._propParen2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsDataType')) {this._#pop#pop();continue;}
        if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringDQ();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._stringSQ();continue;}
        if((m = /^/\*BEGIN.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^/\*END.*\*//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stringDQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^\\["']/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._stringSQ = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if((m = /^\\["']/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._insideString = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\["']/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
