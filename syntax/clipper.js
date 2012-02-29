var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
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
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\bfunction\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^^return\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bbegin\s+sequence\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend\s+sequence\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdo\s+case\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bendcase\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bdo\s+while\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\benddo\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfor\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bnext\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belseif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\belse\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bendif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bswitch\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bendswitch\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\.and\.|announce|begin|case|command|define|do|elseif|else|endcase|enddo|endif|error|exit|field|\.f\.|for|function|ifdef|if|include|init|inndef|local|memvar|next|nil|\.not\.|\.or\.|other|parameters|private|procedure|public|request|return|sequence|static|stdout|\.t\.|traslate|undef|while|xcommand|xtranslate)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:accept|all|alternate|append|ascending|average|bell|blank|box|century|clear|close|coclor|color|commit|confirm|console|continue|copy|count|create|cursor|date|decimals|default|deleted|delete|delimiters|descending|device|display|do|eject|epoch|erase|escape|eval|every|exact|extended|file|filter|fixed|form|from|get|gets|go|goto|index|input|intensity|?|??|@|join|keyboard|key|label|list|locate|margin|memory|menu|message|new|on|order|pack|path|pict|printer|prompt|quit|range|read|recall|record|reindex|relation|release|rename|replace|report|rest|restore|run|save|say|scoreboard|seek|select|set|skip|softseek|sort|structure|sum|tag|to|total|typeahead|type|unique|unlock|update|use|valid|wait|when|with|wrap|zap)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:aadd|abs|achoice|aclone|acopy|adel|aeval|afill|ains|alert|alias|alltrim|altd|array|ascan|asize|asort|atail|at|bin2i|bin2l|bin2w|bof|break|browse|cdowchr|chr|cmonth|col|colorselect|ctod|curdir|date|day|dbappend|dbclearall|dbclearfilter|dbclearindex|dbclearrelation|dbcloseall|dbclosearea|dbcommitall|dbcommit|dbcreateindex|dbcreate|dbdelete|dbedit|dbeval|dbfilter|dbf|dbgobottom|dbgoto|dbgotop|dbrecall|dbreindex|dbrelation|dbrlock|dbrlocklist|dbrselect|dbrunlock|dbseek|dbselectarea|dbsetfilter|dbsetindex|dbsetorder|dbsetrelation|dbskip|dbstruct|dbunlockall|dbunlock|dbusearea|deleted|descend|devout|devpos|directory|dispbegin|dispbox|dispcount|dispend|dispout|dispspace|doserror|dow|dtoc|dtos|empty|eof|errorblock|errorinhandler|errorlevel|eval|exp|fclose|fcount|fcreate|ferase|ferror|fieldblock|fieldget|field|fieldname|fieldpos|fieldput|fieldwblock|file|flock|fopen|found|fread|freadstr|frename|fseek|fwrite|getactive|getenv|hardcr|header|i2bin|iif|indexext|indexkey|indexord|inkey|int|isalpha|iscolor|isdigit|islower|isprinter|isupper|l2bin|lastkey|lastrec|left|len|lock|log|lower|ltrim|lupdate|maxcol|max|maxrow|memoedit|memoline|memoread|memory|memotran|memowrit|memvarblock|min|mlcount|mlctopos|mlpos|mod|month|mpostolc|neterr|netname|nextkey|nosnow|ordbagext|ordbagname|ordcreate|orddestroy|ordfor|ordkey|ordlistadd|ordlistclear|ordlistrebuild|ordname|ordnumber|ordsetfocus|os|outerr|outstd|padc|padl|padr|pcol|pcount|proclineprocname|prow|qout|qqout|rat|rddlist|rddname|rddsetdefault|readexit|readinsert|readmodal|readvar|reccount|recno|recsize|replicate|restscreen|right|rlock|round|row|rtrim|savesreen|scroll|seconds|select|setblink|setcancel|setcolor|setcursor|setkey|setmode|setpos|setprc|soundex|space|sqrt|str|strtran|stuff|substr|time|tone|transform|trim|updated|upper|used|val|valtype|version)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^//\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^//\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._lineComment();continue;}
        if((m = /^^\s*\*.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._lineComment();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._blockComment();continue;}
        if((m = /^[!%&()+,\-<:=>[\]\^~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if(this.str[0] == '{|' && this.hl('{|', 'dsOthers')) {this._evalBlock();continue;}
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._lineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO|NOT(IC)?E)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._blockComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(FIXME|TODO|NOT(IC)?E)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^//\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^//\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._lineComment();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._blockComment();continue;}
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._evalBlock = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
