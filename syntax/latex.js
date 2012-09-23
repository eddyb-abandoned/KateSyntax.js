KateSyntax.langs.latex.syntax = {
    default: 'latex_normalText',
    latex_normalText: function latex_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_findBeginEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_findEndEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\\(cite|parencite|autocite|Autocite|citetitle)\*(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(cites|Cites|parencites|Parencites|autocites|Autocites|supercites|footcites|Footcites)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_fancyLabel())return this.pop(), m-1;continue;}
            if((m = /^\\(cite|nocite|Cite|parencite|Parencite|footcite|Footcite|textcite|Textcite|supercite|autocite|Autocite|citeauthor|Citeauthor|citetitle|citeyear|citeurl|nocite|fullcite|footfullcite)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(subref\*?|cref\*?|label|pageref|autoref|ref|vpageref|vref|pagecite|eqref)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(part|chapter|section|subsection|subsubsection|paragraph|subparagraph)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_sectioning())return this.pop(), m-1;continue;}
            if((m = /^\\(footnote)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_footnoting())return this.pop(), m-1;continue;}
            if((m = /^\\(renewcommand|providenewcommand|newcommand)\*?(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_newCommand())return this.pop(), m-1;continue;}
            if((m = /^\\(e|g|x)?def(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_defCommand())return this.pop(), m-1;continue;}
            if((m = /^<<.*>>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_noWeb())return this.pop(), m-1;continue;}
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeEquation())return this.pop(), m-1;continue;}
            if((m = /^\\iffalse/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.latex_multilineComment())return this.pop(), m-1;continue;}
            if((m = /^\\ensuremath\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeEnsure())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_contrSeq())return this.pop(), m-1;continue;}
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeDisplay())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_noWeb: function latex_noWeb(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*@\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_sectioning: function latex_sectioning(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ' ' && this.hl(' ', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_sectioningInside())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    latex_sectioningInside: function latex_sectioningInside(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_sectioningInside())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:bold')) {if(m = this.latex_sectioningMathMode())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#800000;fontStyle:normal;fontWeight:bold')) {if(m = this.latex_sectioningContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:bold')) {if(m = this.latex_sectioningMathMode())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#000000;fontStyle:normal;fontWeight:bold');
        }
        this.pop();
    },
    latex_sectioningContrSeq: function latex_sectioningContrSeq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^[a-zA-Z]+(\+?|\*{0,3})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_sectioningMathMode: function latex_sectioningMathMode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsAlert')) continue;
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:bold')) {if(m = this.latex_sectioningMathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:bold');
        }
        this.pop();
    },
    latex_sectioningMathContrSeq: function latex_sectioningMathContrSeq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^[a-zA-Z]+\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:bold');
        }
        this.pop();
    },
    latex_footnoting: function latex_footnoting(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == ' ' && this.hl(' ', 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_footnotingInside())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    latex_footnotingInside: function latex_footnotingInside(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_footnotingInside())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_footnotingMathMode())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_footnotingMathMode())return this.pop(), m-1;continue;}
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_findBeginEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_findEndEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\\(cite|parencite|autocite|Autocite|citetitle)\*(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(cites|Cites|parencites|Parencites|autocites|Autocites|supercites|footcites|Footcites)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_fancyLabel())return this.pop(), m-1;continue;}
            if((m = /^\\(cite|nocite|Cite|parencite|Parencite|footcite|Footcite|textcite|Textcite|supercite|autocite|Autocite|citeauthor|Citeauthor|citetitle|citeyear|citeurl|nocite|fullcite|footfullcite)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(subref\*?|cref\*?|label|pageref|autoref|ref|vpageref|vref|pagecite|eqref)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(part|chapter|section|subsection|subsubsection|paragraph|subparagraph)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_sectioning())return this.pop(), m-1;continue;}
            if((m = /^\\(footnote)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_footnoting())return this.pop(), m-1;continue;}
            if((m = /^\\(renewcommand|providenewcommand|newcommand)\*?(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_newCommand())return this.pop(), m-1;continue;}
            if((m = /^\\(e|g|x)?def(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_defCommand())return this.pop(), m-1;continue;}
            if((m = /^<<.*>>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_noWeb())return this.pop(), m-1;continue;}
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeEquation())return this.pop(), m-1;continue;}
            if((m = /^\\iffalse/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.latex_multilineComment())return this.pop(), m-1;continue;}
            if((m = /^\\ensuremath\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeEnsure())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_contrSeq())return this.pop(), m-1;continue;}
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeDisplay())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_footnotingMathMode: function latex_footnotingMathMode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsAlert')) continue;
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsAlert')) continue;
            if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_newCommand: function latex_newCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\{\s*\\[a-zA-Z]+\s*\}(\[\d\](\[[^\]]*\])?)?\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_commandParameterStart())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsAlert')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    latex_defCommand: function latex_defCommand(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\\[a-zA-Z]+[^\{]*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_commandParameterStart())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsAlert')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    latex_commandParameterStart: function latex_commandParameterStart(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_commandParameter())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 1;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_commandParameter: function latex_commandParameter(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_commandParameter())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_contrSeq: function latex_contrSeq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^verb\*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_verb())return this.pop(), m-1;continue;}
            if((m = /^(Verb|verb|lstinline)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_verb())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^[a-zA-Z@]+(\+?|\*{0,3})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_toEndOfLine: function latex_toEndOfLine(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_verb: function latex_verb(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(.)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_verbEnd())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal;color:#a08000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_verbEnd: function latex_verbEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 2;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^[^%1\xd7]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal;color:#a08000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\n') return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal;color:#a08000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_label: function latex_label(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\{\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_labelParameter())return this.pop(), m-1;continue;}
            if((m = /^\s*\[\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_labelOption())return this.pop(), m-1;continue;}
            if((m = /^[^\[\{]+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_labelOption: function latex_labelOption(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_contrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\s*\]\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_labelParameter: function latex_labelParameter(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\s*\}\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_fancyLabel: function latex_fancyLabel(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\{\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_fancyLabelParameter())return this.pop(), m-1;continue;}
            if((m = /^\s*\[\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_labelOption())return this.pop(), m-1;continue;}
            if((m = /^\s*\(\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_fancyLabelRoundBrackets())return this.pop(), m-1;continue;}
            return this.pop();
        }
        this.pop();
    },
    latex_fancyLabelParameter: function latex_fancyLabelParameter(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\s*\}\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_fancyLabelRoundBrackets: function latex_fancyLabelRoundBrackets(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_contrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\s*\)\s*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_findEndEnvironment: function latex_findEndEnvironment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_endEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_endEnvironment: function latex_endEnvironment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_endLatexEnv())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop();
            if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_endLatexEnv: function latex_endLatexEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 2;
            if((m = /^[a-zA-Z]+(\*)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_findBeginEnvironment: function latex_findBeginEnvironment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_beginEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_beginEnvironment: function latex_beginEnvironment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(lstlisting|(B|L)?Verbatim)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_verbatimEnvParam())return this.pop(), m-1;continue;}
            if((m = /^(verbatim|boxedverbatim)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_verbatimEnv())return this.pop(), m-1;continue;}
            if((m = /^comment/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_commentEnv())return this.pop(), m-1;continue;}
            if((m = /^(alignat|xalignat|xxalignat)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathEnvParam())return this.pop(), m-1;continue;}
            if((m = /^(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|IEEEeqnarray|IEEEeqnarraybox|smallmatrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathEnv())return this.pop(), m-1;continue;}
            if((m = /^(tabularx|tabular|supertabular|mpsupertabular|xtabular|mpxtabular|longtable)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_tabEnv())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^[a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_latexEnv())return this.pop(), m-1;continue;}
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop();
            if((m = /^[^a-zA-Z\xd7]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_latexEnv: function latex_latexEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 2;
            if((m = /^[a-zA-Z]+/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\s+/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_verbatimEnv: function latex_verbatimEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.latex_verbatim())return this.pop(), m-1;continue;}
            if(/^[a-zA-Z]/.exec(this.str)) return this.pop();
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            return this.pop(), 2;
        }
        this.pop();
    },
    latex_verbatimEnvParam: function latex_verbatimEnvParam(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.str[1] == '[' && this.hl('}[', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.latex_verbatim())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsNormal')) {if(m = this.latex_verbatim())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_verbatim: function latex_verbatim(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\\end(?=\s*\{(verbatim|lstlisting|boxedverbatim|(B|L)?Verbatim)\*?\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_verbFindEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal;color:#a08000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_verbFindEnd: function latex_verbFindEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(verbatim|lstlisting|boxedverbatim|(B|L)?Verbatim)\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 4;
            return this.pop();
        }
        this.pop();
    },
    latex_commentEnv: function latex_commentEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.latex_blockComment())return this.pop(), m-1;continue;}
            if(/^[a-zA-Z]/.exec(this.str)) return this.pop();
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            return this.pop(), 2;
        }
        this.pop();
    },
    latex_blockComment: function latex_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\\end(?=\s*\{comment\*?\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_commFindEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    latex_commFindEnd: function latex_commFindEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^comment\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 4;
            return this.pop();
        }
        this.pop();
    },
    latex_mathEnv: function latex_mathEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.latex_mathModeEnv())return this.pop(), m-1;continue;}
            if(/^[a-zA-Z]/.exec(this.str)) return this.pop();
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathEnvParam: function latex_mathEnvParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\}\{[^\}]*\}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_mathModeEnv())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.latex_mathModeEnv())return this.pop(), m-1;continue;}
            if(/^[a-zA-Z]/.exec(this.str)) return this.pop();
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_envCommon: function latex_envCommon(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathModeEnv: function latex_mathModeEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_findBeginEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathFindEnd())return this.pop(), m-1;continue;}
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\\)/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\]/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathContrSeq())return this.pop(), m-1;continue;}
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsAlert')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathFindEnd: function latex_mathFindEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray|IEEEeqnarraybox|smallmatrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix)\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 4;
            return this.pop();
        }
        this.pop();
    },
    latex_tabEnv: function latex_tabEnv(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) {if(m = this.latex_tab())return this.pop(), m-1;continue;}
            if(/^[a-zA-Z]/.exec(this.str)) return this.pop();
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\*(?=\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\*[^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            if((m = /^[^a-zA-Z\xd7][^\}]*/.exec(this.str)) && this.hl(m[0], 'dsAlert')) return this.pop(), 2;
            return this.pop(), 2;
        }
        this.pop();
    },
    latex_tab: function latex_tab(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '&' && this.hl('&', 'dsNormal;color:#002793;fontWeight:bold')) continue;
            if((m = /^@\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#002793')) {if(m = this.latex_columnSeparator())return this.pop(), m-1;continue;}
            if((m = /^\\end(?=\s*\{(tabularx|tabular|supertabular|mpsupertabular|xtabular|mpxtabular|longtable)\*?\})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_tabFindEnd())return this.pop(), m-1;continue;}
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_findBeginEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_findEndEnvironment())return this.pop(), m-1;continue;}
            if((m = /^\\(cite|parencite|autocite|Autocite|citetitle)\*(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(cites|Cites|parencites|Parencites|autocites|Autocites|supercites|footcites|Footcites)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_fancyLabel())return this.pop(), m-1;continue;}
            if((m = /^\\(cite|nocite|Cite|parencite|Parencite|footcite|Footcite|textcite|Textcite|supercite|autocite|Autocite|citeauthor|Citeauthor|citetitle|citeyear|citeurl|nocite|fullcite|footfullcite)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(subref\*?|cref\*?|label|pageref|autoref|ref|vpageref|vref|pagecite|eqref)(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_label())return this.pop(), m-1;continue;}
            if((m = /^\\(part|chapter|section|subsection|subsubsection|paragraph|subparagraph)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#F00000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_sectioning())return this.pop(), m-1;continue;}
            if((m = /^\\(footnote)\*?\s*(?=[\{\[])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_footnoting())return this.pop(), m-1;continue;}
            if((m = /^\\(renewcommand|providenewcommand|newcommand)\*?(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_newCommand())return this.pop(), m-1;continue;}
            if((m = /^\\(e|g|x)?def(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_defCommand())return this.pop(), m-1;continue;}
            if((m = /^<<.*>>=/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.latex_noWeb())return this.pop(), m-1;continue;}
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if((m = /^\\\[/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeEquation())return this.pop(), m-1;continue;}
            if((m = /^\\iffalse/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.latex_multilineComment())return this.pop(), m-1;continue;}
            if((m = /^\\ensuremath\{/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeEnsure())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#800000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_contrSeq())return this.pop(), m-1;continue;}
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeDisplay())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathMode())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_columnSeparator: function latex_columnSeparator(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#002793')) {if(m = this.latex_columnSeparator())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#002793')) return this.pop();
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#002793')) continue;
            this.hl(this.str[0], 'dsNormal;color:#002793');
        }
        this.pop();
    },
    latex_tabFindEnd: function latex_tabFindEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*\{/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(tabularx|tabular|supertabular|mpsupertabular|xtabular|mpxtabular|longtable)\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000D0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 4;
            return this.pop();
        }
        this.pop();
    },
    latex_mathMode: function latex_mathMode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsAlert')) continue;
            if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathModeDisplay: function latex_mathModeDisplay(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '$' && this.hl('$', 'dsAlert')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsAlert')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsAlert')) continue;
            if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathModeEquation: function latex_mathModeEquation(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsAlert')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsAlert')) continue;
            if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathModeEnsure: function latex_mathModeEnsure(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeEnsure())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathModeCommon: function latex_mathModeCommon(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\(begin|end)\s*\{(equation|displaymath|eqnarray|subeqnarray|math|multline|gather|align|flalign|alignat|xalignat|xxalignat|IEEEeqnarray)\*?\}/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\begin(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\end(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\\(text|intertext|mbox)\s*(?=\{)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathModeText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) {if(m = this.latex_mathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            if((m = /^%\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^%\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathContrSeq: function latex_mathContrSeq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^[a-zA-Z]+\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#606000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    latex_mathModeText: function latex_mathModeText(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_mathModeTextParameterStart())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_mathModeTextParameterStart: function latex_mathModeTextParameterStart(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if((m = /^\$.*\$/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_mathModeTextParameter())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop(), 1;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_mathModeTextParameter: function latex_mathModeTextParameter(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.latex_mathModeTextParameter())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#FF00C4;fontWeight:bold;textDecoration:underline')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.latex_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    latex_multilineComment: function latex_multilineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\fi/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^\\else/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    latex_comment: function latex_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\\KileResetHL/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.latex_normalText())return this.pop(), m-1;continue;}
            if((m = /^\\KateResetHL/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.latex_normalText())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
