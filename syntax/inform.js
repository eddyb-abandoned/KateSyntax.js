KateSyntax.langs.inform.syntax = {
    default: 'inform_topLevel',
    inform_topLevel: function inform_topLevel(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if((m = /^[[]\s*[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.inform_funcdef())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^ *object | *class /i.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) {if(m = this.inform_classDecl())return this.pop(), m-1;continue;}
            if((m = /^(?:Ifdef|Ifndef|Iftrue|Iffalse|Ifnot|Endif|End|Abbreviate|Array|Attribute|Constant|Default|Extend|Global|Ifnot|Iftrue|Iffalse|Import|Include|Link|Lowstring|Message|Property|Release|Replace|Serial|Switches|Statusline|score|System_file|Verb)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[a-zA-Z_]+\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_normal: function inform_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_word())return this.pop(), m-1;continue;}
            if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:if|for|else|box|break|continue|do|until|font|give|inversion|jump|on|to|move|new_line|objectloop|print|print_ret|quit|read|remove|restore|return|rtrue|rfalse|save|spaces|spring|style|switch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Pronouns|Quit|Restore|Save|Verify|Restart|ScriptOn|ScriptOff|NotifyOn|NotifyOff|Places|Objects|Score|FullScore|Version|LMode1|LMode2|LMode3|Inv|Inv|InvTall|InvWide|Take|Drop|Empty|Enter|Exit|GetOff|Go|GoIn|Look|Examine|Search|Give|Show|Unlock|Lock|SwitchOn|SwitchOff|Open|Close|Disrobe|Wear|Eat|LetGo|Receive|Insert|PutOn|Transfer|Empty|EmptyT|GetOff|GoIn|Listen|Taste|Touch|Pull|Push|Wave|Turn|PushDir|ThrowAt|ThrownAt|JumpOn|Drink|Attack|Tie|Fill|Swing|Blow|Rub|Set|SetTo|Buy|Climb|Squeeze|Climb|Burn|Cut|Dig|Consult|Tell|Answer|Ask|AskFor|Kiss|Sleep|Sing|WaveHands|Swim|Sorry|Sing|Strong|Mild|Smell|Pray|Jump|Think|VagueGo|Yes|No|Sing)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#E06060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:metaclass|parent|child|children|Achieved|AddToScope|allowpushdir|CDefArt|ChangeDefault|DefArt|DoMenu|EnglishNumber|HasLightSource|InDefArt|Locale|LoopOverScope|NextWord|NextWordStopped|NounDomain|ObjectIsUntouchable|OffersLight|PlaceInScope|PlayerTo|PrintShortName|ScopeWithin|SetTime|StartDaemon|StartTimer|StopDaemon|StopTimer|TestScope|TryNumber|UnsignedCompare|WordAddress|WordLenght|WriteListFrom|YesOrNo|ZRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:String|Routine|bold|roman|underline|fixed|nothing|true|false|on|off|sender|self|location|score|action|actor|noun|second|the_time|consult_from|consult_words|wn|actors_location|buffer|player)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#7020F0;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:has|hasn't|in|notin|provides|ofclass|or)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^##[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#E06060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^@[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#3015F0;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if((m = /^[%&()+\-<=>{|}~]/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_propDefValRules: function inform_propDefValRules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_word())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {if(m = this.inform_prop_func_def())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_funcdef: function inform_funcdef(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_word())return this.pop(), m-1;continue;}
            if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:if|for|else|box|break|continue|do|until|font|give|inversion|jump|on|to|move|new_line|objectloop|print|print_ret|quit|read|remove|restore|return|rtrue|rfalse|save|spaces|spring|style|switch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Pronouns|Quit|Restore|Save|Verify|Restart|ScriptOn|ScriptOff|NotifyOn|NotifyOff|Places|Objects|Score|FullScore|Version|LMode1|LMode2|LMode3|Inv|Inv|InvTall|InvWide|Take|Drop|Empty|Enter|Exit|GetOff|Go|GoIn|Look|Examine|Search|Give|Show|Unlock|Lock|SwitchOn|SwitchOff|Open|Close|Disrobe|Wear|Eat|LetGo|Receive|Insert|PutOn|Transfer|Empty|EmptyT|GetOff|GoIn|Listen|Taste|Touch|Pull|Push|Wave|Turn|PushDir|ThrowAt|ThrownAt|JumpOn|Drink|Attack|Tie|Fill|Swing|Blow|Rub|Set|SetTo|Buy|Climb|Squeeze|Climb|Burn|Cut|Dig|Consult|Tell|Answer|Ask|AskFor|Kiss|Sleep|Sing|WaveHands|Swim|Sorry|Sing|Strong|Mild|Smell|Pray|Jump|Think|VagueGo|Yes|No|Sing)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#E06060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:metaclass|parent|child|children|Achieved|AddToScope|allowpushdir|CDefArt|ChangeDefault|DefArt|DoMenu|EnglishNumber|HasLightSource|InDefArt|Locale|LoopOverScope|NextWord|NextWordStopped|NounDomain|ObjectIsUntouchable|OffersLight|PlaceInScope|PlayerTo|PrintShortName|ScopeWithin|SetTime|StartDaemon|StartTimer|StopDaemon|StopTimer|TestScope|TryNumber|UnsignedCompare|WordAddress|WordLenght|WriteListFrom|YesOrNo|ZRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:String|Routine|bold|roman|underline|fixed|nothing|true|false|on|off|sender|self|location|score|action|actor|noun|second|the_time|consult_from|consult_words|wn|actors_location|buffer|player)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#7020F0;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:has|hasn't|in|notin|provides|ofclass|or)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^##[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#E06060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^@[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#3015F0;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if((m = /^[%&()+\-<=>{|}~]/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == ']' && this.str[1] == ';' && this.hl('];', 'dsFunction')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_classDecl: function inform_classDecl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_word())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {if(m = this.inform_prop_func_def())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '\n') return this.pop(), this.inform_classDecl_1();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_classDecl_1: function inform_classDecl_1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[\t ]*has /i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.inform_has_decl())return this.pop(), m-1;continue;}
            if((m = /^(?:with|private|has)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.inform_prop_def())return this.pop(), m-1;continue;}
            if(this.str[0] == ';' && this.hl(';', 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_word: function inform_word(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString;color:#007000;fontStyle:italic;fontWeight:normal');
        }
        this.pop();
    },
    inform_string: function inform_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#007000;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    inform_prop_func_def: function inform_prop_func_def(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsFunction')) return this.pop();
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_word())return this.pop(), m-1;continue;}
            if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:if|for|else|box|break|continue|do|until|font|give|inversion|jump|on|to|move|new_line|objectloop|print|print_ret|quit|read|remove|restore|return|rtrue|rfalse|save|spaces|spring|style|switch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Pronouns|Quit|Restore|Save|Verify|Restart|ScriptOn|ScriptOff|NotifyOn|NotifyOff|Places|Objects|Score|FullScore|Version|LMode1|LMode2|LMode3|Inv|Inv|InvTall|InvWide|Take|Drop|Empty|Enter|Exit|GetOff|Go|GoIn|Look|Examine|Search|Give|Show|Unlock|Lock|SwitchOn|SwitchOff|Open|Close|Disrobe|Wear|Eat|LetGo|Receive|Insert|PutOn|Transfer|Empty|EmptyT|GetOff|GoIn|Listen|Taste|Touch|Pull|Push|Wave|Turn|PushDir|ThrowAt|ThrownAt|JumpOn|Drink|Attack|Tie|Fill|Swing|Blow|Rub|Set|SetTo|Buy|Climb|Squeeze|Climb|Burn|Cut|Dig|Consult|Tell|Answer|Ask|AskFor|Kiss|Sleep|Sing|WaveHands|Swim|Sorry|Sing|Strong|Mild|Smell|Pray|Jump|Think|VagueGo|Yes|No|Sing)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#E06060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^(?:metaclass|parent|child|children|Achieved|AddToScope|allowpushdir|CDefArt|ChangeDefault|DefArt|DoMenu|EnglishNumber|HasLightSource|InDefArt|Locale|LoopOverScope|NextWord|NextWordStopped|NounDomain|ObjectIsUntouchable|OffersLight|PlaceInScope|PlayerTo|PrintShortName|ScopeWithin|SetTime|StartDaemon|StartTimer|StopDaemon|StopTimer|TestScope|TryNumber|UnsignedCompare|WordAddress|WordLenght|WriteListFrom|YesOrNo|ZRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:String|Routine|bold|roman|underline|fixed|nothing|true|false|on|off|sender|self|location|score|action|actor|noun|second|the_time|consult_from|consult_words|wn|actors_location|buffer|player)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#7020F0;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:has|hasn't|in|notin|provides|ofclass|or)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^##[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#E06060;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^@[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#3015F0;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if((m = /^[%&()+\-<=>{|}~]/.exec(this.str)) && this.hl(m[0], 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_prop_def: function inform_prop_def(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ',' && this.hl(',', 'dsFunction')) return this.pop();
            if(this.str[0] == ';' && this.hl(';', 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) return this.pop(), 2;
            if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {if(m = this.inform_prop_func_def())return this.pop(), m-1;continue;}
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_word())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {if(m = this.inform_prop_func_def())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_has_decl: function inform_has_decl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.hl(';', 'dsOthers;color:#109010;fontStyle:normal;fontWeight:bold')) return this.pop(), 2;
            if(this.str[0] == '!' && this.hl('!', 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#007000;fontStyle:normal;fontWeight:normal')) {if(m = this.inform_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#007000;fontStyle:italic;fontWeight:normal')) {if(m = this.inform_word())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {if(m = this.inform_prop_func_def())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsBaseN;color:#A01060;fontStyle:normal;fontWeight:normal')) return this.pop();
            if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal;color:#5050C0;fontStyle:normal;fontWeight:normal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    inform_comment: function inform_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#707070;fontStyle:italic;fontWeight:normal');
        }
        this.pop();
    }
};
