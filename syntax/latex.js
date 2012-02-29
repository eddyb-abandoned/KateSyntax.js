var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText();
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
HL.prototype._normalText = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._findBeginEnvironment();continue;}
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._findEndEnvironment();continue;}
        if((m = /^\\(cite|parencite|autocite|Autocite|citetitle)\*(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(cites|Cites|parencites|Parencites|autocites|Autocites|supercites|footcites|Footcites)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._fancyLabel();continue;}
        if((m = /^\\(cite|nocite|Cite|parencite|Parencite|footcite|Footcite|textcite|Textcite|supercite|autocite|Autocite|citeauthor|Citeauthor|citetitle|citeyear|citeurl|nocite|fullcite|footfullcite)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(subref\*?|cref\*?|label|pageref|autoref|ref|vpageref|vref|pagecite|eqref)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(part|chapter|section|subsection|subsubsection|paragraph|subparagraph)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._sectioning();continue;}
        if((m = /^\\(footnote)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._footnoting();continue;}
        if((m = /^\\(renewcommand|providenewcommand|newcommand)\*?(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._newCommand();continue;}
        if((m = /^\\(e|g|x)?def(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._defCommand();continue;}
        if((m = /^<<.*>>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._noWeb();continue;}
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathMode();continue;}
        if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeEquation();continue;}
        if((m = /^\\iffalse/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multilineComment();continue;}
        if((m = /^\\ensuremath\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeEnsure();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._contrSeq();continue;}
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeDisplay();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._mathMode();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._noWeb = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^\s*@\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectioning = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ' ' && this.hl(' ', 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._sectioningInside();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectioningInside = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._sectioningInside();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._sectioningMathMode();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._sectioningContrSeq();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._sectioningMathMode();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectioningContrSeq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[a-zA-Z]+(\+?|\*{0,3})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectioningMathMode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) return;
        if(this.str[0] == '\)' && this.hl('\)', 'dsNormal')) return;
        if(this.str[0] == '\]' && this.hl('\]', 'dsAlert')) continue;
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._sectioningMathContrSeq();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sectioningMathContrSeq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[a-zA-Z]+\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._footnoting = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == ' ' && this.hl(' ', 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._footnotingInside();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._footnotingInside = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._footnotingInside();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._footnotingMathMode();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._footnotingMathMode();continue;}
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._findBeginEnvironment();continue;}
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._findEndEnvironment();continue;}
        if((m = /^\\(cite|parencite|autocite|Autocite|citetitle)\*(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(cites|Cites|parencites|Parencites|autocites|Autocites|supercites|footcites|Footcites)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._fancyLabel();continue;}
        if((m = /^\\(cite|nocite|Cite|parencite|Parencite|footcite|Footcite|textcite|Textcite|supercite|autocite|Autocite|citeauthor|Citeauthor|citetitle|citeyear|citeurl|nocite|fullcite|footfullcite)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(subref\*?|cref\*?|label|pageref|autoref|ref|vpageref|vref|pagecite|eqref)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(part|chapter|section|subsection|subsubsection|paragraph|subparagraph)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._sectioning();continue;}
        if((m = /^\\(footnote)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._footnoting();continue;}
        if((m = /^\\(renewcommand|providenewcommand|newcommand)\*?(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._newCommand();continue;}
        if((m = /^\\(e|g|x)?def(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._defCommand();continue;}
        if((m = /^<<.*>>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._noWeb();continue;}
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathMode();continue;}
        if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeEquation();continue;}
        if((m = /^\\iffalse/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multilineComment();continue;}
        if((m = /^\\ensuremath\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeEnsure();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._contrSeq();continue;}
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeDisplay();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._mathMode();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._footnotingMathMode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) return;
        if(this.str[0] == '\)' && this.hl('\)', 'dsNormal')) return;
        if(this.str[0] == '\]' && this.hl('\]', 'dsAlert')) continue;
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) return;
        if(this.str[0] == '\)' && this.hl('\)', 'dsNormal')) return;
        if(this.str[0] == '\]' && this.hl('\]', 'dsAlert')) continue;
        if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeText();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._mathContrSeq();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._newCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\{\s*\\[a-zA-Z]+\s*\}(\[\d\](\[[^\]]*\])?)?\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commandParameterStart();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsAlert')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._defCommand = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\\[a-zA-Z]+[^\{]*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commandParameterStart();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsAlert')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commandParameterStart = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._commandParameter();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop();continue;}
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commandParameter = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._commandParameter();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._contrSeq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^verb\*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verb();continue;}
        if((m = /^(Verb|verb|lstinline)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verb();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[a-zA-Z@]+(\+?|\*{0,3})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._toEndOfLine = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._verb = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(.)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verbEnd();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._verbEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[^%1\xd7]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._label = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\{\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._labelParameter();continue;}
        if((m = /^\s*\[\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._labelOption();continue;}
        if((m = /^[^\[\{]+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._labelOption = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathMode();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._contrSeq();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._mathMode();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\s*\]\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._labelParameter = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\s*\}\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._fancyLabel = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\{\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._fancyLabelParameter();continue;}
        if((m = /^\s*\[\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._labelOption();continue;}
        if((m = /^\s*\(\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._fancyLabelRoundBrackets();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._fancyLabelParameter = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\s*\}\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._fancyLabelRoundBrackets = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathMode();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._contrSeq();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._mathMode();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\s*\)\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findEndEnvironment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._endEnvironment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._endEnvironment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._endLatexEnv();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return;
        if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._endLatexEnv = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z]+(\*)?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._findBeginEnvironment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._beginEnvironment();continue;}
        if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._beginEnvironment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(lstlisting|(B|L)?Verbatim)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verbatimEnvParam();continue;}
        if((m = /^(verbatim|boxedverbatim)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verbatimEnv();continue;}
        if((m = /^comment/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commentEnv();continue;}
        if((m = /^(alignat|xalignat|xxalignat)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathEnvParam();continue;}
        if((m = /^(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|IEEEeqnarray|IEEEeqnarraybox|smallmatrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathEnv();continue;}
        if((m = /^(tabularx|tabular|supertabular|mpsupertabular|xtabular|mpxtabular|longtable)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._tabEnv();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._latexEnv();continue;}
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return;
        if((m = /^[^a-zA-Z\xd7]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._latexEnv = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop#pop();continue;}
        if((m = /^[a-zA-Z]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._verbatimEnv = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._verbatim();continue;}
        if(/^[a-zA-Z]/.exec(this.str)) return;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._verbatimEnvParam = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}[' && this.hl('}[', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._verbatim();continue;}
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) {this._verbatim();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._verbatim = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\\end(?=\s*\{(verbatim|lstlisting|boxedverbatim|(B|L)?Verbatim)\*?\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verbFindEnd();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._verbFindEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(verbatim|lstlisting|boxedverbatim|(B|L)?Verbatim)\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop#pop#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentEnv = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._blockComment();continue;}
        if(/^[a-zA-Z]/.exec(this.str)) return;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._blockComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\\end(?=\s*\{comment\*?\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._commFindEnd();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commFindEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^comment\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop#pop#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathEnv = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._mathModeEnv();continue;}
        if(/^[a-zA-Z]/.exec(this.str)) return;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathEnvParam = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\}\{[^\}]*\}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeEnv();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._mathModeEnv();continue;}
        if(/^[a-zA-Z]/.exec(this.str)) return;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._envCommon = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeEnv = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._findBeginEnvironment();continue;}
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathFindEnd();continue;}
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\\)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeText();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._mathContrSeq();continue;}
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsAlert')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathFindEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray|IEEEeqnarraybox|smallmatrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix)\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop#pop#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tabEnv = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._tab();continue;}
        if(/^[a-zA-Z]/.exec(this.str)) return;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) {this._#pop#pop#pop();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tab = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '&' && this.hl('&', 'dsNormal')) continue;
        if((m = /^@\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._columnSeparator();continue;}
        if((m = /^\\end(?=\s*\{(tabularx|tabular|supertabular|mpsupertabular|xtabular|mpxtabular|longtable)\*?\})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._tabFindEnd();continue;}
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._findBeginEnvironment();continue;}
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._findEndEnvironment();continue;}
        if((m = /^\\(cite|parencite|autocite|Autocite|citetitle)\*(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(cites|Cites|parencites|Parencites|autocites|Autocites|supercites|footcites|Footcites)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._fancyLabel();continue;}
        if((m = /^\\(cite|nocite|Cite|parencite|Parencite|footcite|Footcite|textcite|Textcite|supercite|autocite|Autocite|citeauthor|Citeauthor|citetitle|citeyear|citeurl|nocite|fullcite|footfullcite)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(subref\*?|cref\*?|label|pageref|autoref|ref|vpageref|vref|pagecite|eqref)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._label();continue;}
        if((m = /^\\(part|chapter|section|subsection|subsubsection|paragraph|subparagraph)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._sectioning();continue;}
        if((m = /^\\(footnote)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._footnoting();continue;}
        if((m = /^\\(renewcommand|providenewcommand|newcommand)\*?(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._newCommand();continue;}
        if((m = /^\\(e|g|x)?def(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._defCommand();continue;}
        if((m = /^<<.*>>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._noWeb();continue;}
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathMode();continue;}
        if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeEquation();continue;}
        if((m = /^\\iffalse/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._multilineComment();continue;}
        if((m = /^\\ensuremath\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeEnsure();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._contrSeq();continue;}
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeDisplay();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._mathMode();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._columnSeparator = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._columnSeparator();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tabFindEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(tabularx|tabular|supertabular|mpsupertabular|xtabular|mpxtabular|longtable)\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop#pop#pop#pop();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathMode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) return;
        if(this.str[0] == '\)' && this.hl('\)', 'dsNormal')) return;
        if(this.str[0] == '\]' && this.hl('\]', 'dsAlert')) continue;
        if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeText();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._mathContrSeq();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeDisplay = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '$' && this.hl('$', 'dsAlert')) continue;
        if(this.str[0] == '\]' && this.hl('\]', 'dsAlert')) continue;
        if(this.str[0] == '\)' && this.hl('\)', 'dsAlert')) continue;
        if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeText();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._mathContrSeq();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeEquation = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\]' && this.hl('\]', 'dsNormal')) return;
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsAlert')) continue;
        if(this.str[0] == '\)' && this.hl('\)', 'dsAlert')) continue;
        if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeText();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._mathContrSeq();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeEnsure = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._mathModeEnsure();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeText();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._mathContrSeq();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeCommon = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathModeText();continue;}
        if(this.str[0] == '\' && this.hl('\', 'dsNormal')) {this._mathContrSeq();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathContrSeq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[a-zA-Z]+\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeText = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._mathModeTextParameterStart();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeTextParameterStart = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^\$.*\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._mathModeTextParameter();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {this._#pop#pop();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathModeTextParameter = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {this._mathModeTextParameter();continue;}
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return;
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._multilineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\fi/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if((m = /^\\else/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^\\KileResetHL/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._normalText();continue;}
        if((m = /^\\KateResetHL/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._normalText();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
