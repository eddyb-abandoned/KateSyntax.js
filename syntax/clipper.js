KateSyntax.langs.clipper.syntax = {
    default: 'clipper_normal',
    clipper_normal: function clipper_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\bfunction\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^return\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
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
            if((m = /^(?:accept|all|alternate|append|ascending|average|bell|blank|box|century|clear|close|coclor|color|commit|confirm|console|continue|copy|count|create|cursor|date|decimals|default|deleted|delete|delimiters|descending|device|display|do|eject|epoch|erase|escape|eval|every|exact|extended|file|filter|fixed|form|from|get|gets|go|goto|index|input|intensity|\?|\?\?|@|join|keyboard|key|label|list|locate|margin|memory|menu|message|new|on|order|pack|path|pict|printer|prompt|quit|range|read|recall|record|reindex|relation|release|rename|replace|report|rest|restore|run|save|say|scoreboard|seek|select|set|skip|softseek|sort|structure|sum|tag|to|total|typeahead|type|unique|unlock|update|use|valid|wait|when|with|wrap|zap)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:aadd|abs|achoice|aclone|acopy|adel|aeval|afill|ains|alert|alias|alltrim|altd|array|ascan|asize|asort|atail|at|bin2i|bin2l|bin2w|bof|break|browse|cdowchr|chr|cmonth|col|colorselect|ctod|curdir|date|day|dbappend|dbclearall|dbclearfilter|dbclearindex|dbclearrelation|dbcloseall|dbclosearea|dbcommitall|dbcommit|dbcreateindex|dbcreate|dbdelete|dbedit|dbeval|dbfilter|dbf|dbgobottom|dbgoto|dbgotop|dbrecall|dbreindex|dbrelation|dbrlock|dbrlocklist|dbrselect|dbrunlock|dbseek|dbselectarea|dbsetfilter|dbsetindex|dbsetorder|dbsetrelation|dbskip|dbstruct|dbunlockall|dbunlock|dbusearea|deleted|descend|devout|devpos|directory|dispbegin|dispbox|dispcount|dispend|dispout|dispspace|doserror|dow|dtoc|dtos|empty|eof|errorblock|errorinhandler|errorlevel|eval|exp|fclose|fcount|fcreate|ferase|ferror|fieldblock|fieldget|field|fieldname|fieldpos|fieldput|fieldwblock|file|flock|fopen|found|fread|freadstr|frename|fseek|fwrite|getactive|getenv|hardcr|header|i2bin|iif|indexext|indexkey|indexord|inkey|int|isalpha|iscolor|isdigit|islower|isprinter|isupper|l2bin|lastkey|lastrec|left|len|lock|log|lower|ltrim|lupdate|maxcol|max|maxrow|memoedit|memoline|memoread|memory|memotran|memowrit|memvarblock|min|mlcount|mlctopos|mlpos|mod|month|mpostolc|neterr|netname|nextkey|nosnow|ordbagext|ordbagname|ordcreate|orddestroy|ordfor|ordkey|ordlistadd|ordlistclear|ordlistrebuild|ordname|ordnumber|ordsetfocus|os|outerr|outstd|padc|padl|padr|pcol|pcount|proclineprocname|prow|qout|qqout|rat|rddlist|rddname|rddsetdefault|readexit|readinsert|readmodal|readvar|reccount|recno|recsize|replicate|restscreen|right|rlock|round|row|rtrim|savesreen|scroll|seconds|select|setblink|setcancel|setcolor|setcursor|setkey|setmode|setpos|setprc|soundex|space|sqrt|str|strtran|stuff|substr|time|tone|transform|trim|updated|upper|used|val|valtype|version)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.clipper_string())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.clipper_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\s*\*.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.clipper_lineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.clipper_blockComment())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<:=>[\]\^~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.clipper_preprocessor())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '|' && this.hl('{|', 'dsOthers')) {if(m = this.clipper_evalBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.clipper_string2())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    clipper_string: function clipper_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    clipper_lineComment: function clipper_lineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO|NOT(IC)?E)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    clipper_blockComment: function clipper_blockComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(FIXME|TODO|NOT(IC)?E)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    clipper_preprocessor: function clipper_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^<.*?>/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\/\/\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.clipper_lineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.clipper_blockComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    clipper_evalBlock: function clipper_evalBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    clipper_string2: function clipper_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
