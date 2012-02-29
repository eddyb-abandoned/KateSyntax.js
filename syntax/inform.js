var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._topLevel();
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
HL.prototype._topLevel = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[[]\s*[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._funcdef();continue;}
        if((m = /^ *object | *class /i.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._classDecl();continue;}
        if((m = /^(?:Ifdef|Ifndef|Iftrue|Iffalse|Ifnot|Endif|End|Abbreviate|Array|Attribute|Constant|Default|Extend|Global|Ifnot|Iftrue|Iffalse|Import|Include|Link|Lowstring|Message|Property|Release|Replace|Serial|Switches|Statusline|score|System_file|Verb)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^[a-zA-Z_]+\d*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._word();continue;}
        if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:if|for|else|box|break|continue|do|until|font|give|inversion|jump|on|to|move|new_line|objectloop|print|print_ret|quit|read|remove|restore|return|rtrue|rfalse|save|spaces|spring|style|switch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Pronouns|Quit|Restore|Save|Verify|Restart|ScriptOn|ScriptOff|NotifyOn|NotifyOff|Places|Objects|Score|FullScore|Version|LMode1|LMode2|LMode3|Inv|Inv|InvTall|InvWide|Take|Drop|Empty|Enter|Exit|GetOff|Go|GoIn|Look|Examine|Search|Give|Show|Unlock|Lock|SwitchOn|SwitchOff|Open|Close|Disrobe|Wear|Eat|LetGo|Receive|Insert|PutOn|Transfer|Empty|EmptyT|GetOff|GoIn|Listen|Taste|Touch|Pull|Push|Wave|Turn|PushDir|ThrowAt|ThrownAt|JumpOn|Drink|Attack|Tie|Fill|Swing|Blow|Rub|Set|SetTo|Buy|Climb|Squeeze|Climb|Burn|Cut|Dig|Consult|Tell|Answer|Ask|AskFor|Kiss|Sleep|Sing|WaveHands|Swim|Sorry|Sing|Strong|Mild|Smell|Pray|Jump|Think|VagueGo|Yes|No|Sing)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:metaclass|parent|child|children|Achieved|AddToScope|allowpushdir|CDefArt|ChangeDefault|DefArt|DoMenu|EnglishNumber|HasLightSource|InDefArt|Locale|LoopOverScope|NextWord|NextWordStopped|NounDomain|ObjectIsUntouchable|OffersLight|PlaceInScope|PlayerTo|PrintShortName|ScopeWithin|SetTime|StartDaemon|StartTimer|StopDaemon|StopTimer|TestScope|TryNumber|UnsignedCompare|WordAddress|WordLenght|WriteListFrom|YesOrNo|ZRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:String|Routine|bold|roman|underline|fixed|nothing|true|false|on|off|sender|self|location|score|action|actor|noun|second|the_time|consult_from|consult_words|wn|actors_location|buffer|player)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:has|hasn't|in|notin|provides|ofclass|or)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^##[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^@[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if((m = /^[%&()+\-<=>{|}~]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._propDefValRules = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._word();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {this._prop_func_def();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsBaseN')) return;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._funcdef = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._word();continue;}
        if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:if|for|else|box|break|continue|do|until|font|give|inversion|jump|on|to|move|new_line|objectloop|print|print_ret|quit|read|remove|restore|return|rtrue|rfalse|save|spaces|spring|style|switch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Pronouns|Quit|Restore|Save|Verify|Restart|ScriptOn|ScriptOff|NotifyOn|NotifyOff|Places|Objects|Score|FullScore|Version|LMode1|LMode2|LMode3|Inv|Inv|InvTall|InvWide|Take|Drop|Empty|Enter|Exit|GetOff|Go|GoIn|Look|Examine|Search|Give|Show|Unlock|Lock|SwitchOn|SwitchOff|Open|Close|Disrobe|Wear|Eat|LetGo|Receive|Insert|PutOn|Transfer|Empty|EmptyT|GetOff|GoIn|Listen|Taste|Touch|Pull|Push|Wave|Turn|PushDir|ThrowAt|ThrownAt|JumpOn|Drink|Attack|Tie|Fill|Swing|Blow|Rub|Set|SetTo|Buy|Climb|Squeeze|Climb|Burn|Cut|Dig|Consult|Tell|Answer|Ask|AskFor|Kiss|Sleep|Sing|WaveHands|Swim|Sorry|Sing|Strong|Mild|Smell|Pray|Jump|Think|VagueGo|Yes|No|Sing)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:metaclass|parent|child|children|Achieved|AddToScope|allowpushdir|CDefArt|ChangeDefault|DefArt|DoMenu|EnglishNumber|HasLightSource|InDefArt|Locale|LoopOverScope|NextWord|NextWordStopped|NounDomain|ObjectIsUntouchable|OffersLight|PlaceInScope|PlayerTo|PrintShortName|ScopeWithin|SetTime|StartDaemon|StartTimer|StopDaemon|StopTimer|TestScope|TryNumber|UnsignedCompare|WordAddress|WordLenght|WriteListFrom|YesOrNo|ZRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:String|Routine|bold|roman|underline|fixed|nothing|true|false|on|off|sender|self|location|score|action|actor|noun|second|the_time|consult_from|consult_words|wn|actors_location|buffer|player)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:has|hasn't|in|notin|provides|ofclass|or)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^##[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^@[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if((m = /^[%&()+\-<=>{|}~]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if(this.str[0] == '];' && this.hl('];', 'dsFunction')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._classDecl = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._word();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {this._prop_func_def();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsBaseN')) return;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) {this._classDecl_1();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._classDecl_1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^^[\t ]*has /i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._has_decl();continue;}
        if((m = /^(?:with|private|has)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._prop_def();continue;}
        if(this.str[0] == ';' && this.hl(';', 'dsOthers')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._word = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._prop_func_def = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsFunction')) return;
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._word();continue;}
        if((m = /^(?:#ifdef|#else|#ifndef|#endif)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^--?>/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:if|for|else|box|break|continue|do|until|font|give|inversion|jump|on|to|move|new_line|objectloop|print|print_ret|quit|read|remove|restore|return|rtrue|rfalse|save|spaces|spring|style|switch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Pronouns|Quit|Restore|Save|Verify|Restart|ScriptOn|ScriptOff|NotifyOn|NotifyOff|Places|Objects|Score|FullScore|Version|LMode1|LMode2|LMode3|Inv|Inv|InvTall|InvWide|Take|Drop|Empty|Enter|Exit|GetOff|Go|GoIn|Look|Examine|Search|Give|Show|Unlock|Lock|SwitchOn|SwitchOff|Open|Close|Disrobe|Wear|Eat|LetGo|Receive|Insert|PutOn|Transfer|Empty|EmptyT|GetOff|GoIn|Listen|Taste|Touch|Pull|Push|Wave|Turn|PushDir|ThrowAt|ThrownAt|JumpOn|Drink|Attack|Tie|Fill|Swing|Blow|Rub|Set|SetTo|Buy|Climb|Squeeze|Climb|Burn|Cut|Dig|Consult|Tell|Answer|Ask|AskFor|Kiss|Sleep|Sing|WaveHands|Swim|Sorry|Sing|Strong|Mild|Smell|Pray|Jump|Think|VagueGo|Yes|No|Sing)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:metaclass|parent|child|children|Achieved|AddToScope|allowpushdir|CDefArt|ChangeDefault|DefArt|DoMenu|EnglishNumber|HasLightSource|InDefArt|Locale|LoopOverScope|NextWord|NextWordStopped|NounDomain|ObjectIsUntouchable|OffersLight|PlaceInScope|PlayerTo|PrintShortName|ScopeWithin|SetTime|StartDaemon|StartTimer|StopDaemon|StopTimer|TestScope|TryNumber|UnsignedCompare|WordAddress|WordLenght|WriteListFrom|YesOrNo|ZRegion)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:String|Routine|bold|roman|underline|fixed|nothing|true|false|on|off|sender|self|location|score|action|actor|noun|second|the_time|consult_from|consult_words|wn|actors_location|buffer|player)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:has|hasn't|in|notin|provides|ofclass|or)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^##[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^@[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z_]+\w*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
        if((m = /^[%&()+\-<=>{|}~]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._prop_def = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ',' && this.hl(',', 'dsFunction')) return;
        if(this.str[0] == ';' && this.hl(';', 'dsOthers')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {this._prop_func_def();continue;}
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._word();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {this._prop_func_def();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsBaseN')) return;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._has_decl = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ';' && this.hl(';', 'dsOthers')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '!' && this.hl('!', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._word();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsFunction')) {this._prop_func_def();continue;}
        if(this.str[0] == ',' && this.hl(',', 'dsBaseN')) return;
        if((m = /^\$[0-9a-fA-F]{1,4}/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
