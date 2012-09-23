KateSyntax.langs.postscript.syntax = {
    default: 'postscript_normal',
    postscript_normal: function postscript_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:abs|add|aload|anchorsearch|and|arc|arcn|arct|arcto|array|ashow|astore|awidthshow|begin|bind|bitshift|ceiling|charpath|clear|cleartomark|clip|clippath|closepath|concat|concatmatrix|copy|count|counttomark|currentcmykcolor|currentdash|currentdict|currentfile|currentfont|currentgray|currentgstate|currenthsbcolor|currentlinecap|currentlinejoin|currentlinewidth|currentmatrix|currentpoint|currentrgbcolor|currentshared|curveto|cvi|cvlit|cvn|cvr|cvrs|cvs|cvx|def|defineusername|dict|div|dtransform|dup|end|eoclip|eofill|eoviewclip|eq|exch|exec|exit|file|fill|findfont|flattenpath|floor|flush|flushfile|for|forall|ge|get|getinterval|grestore|gsave|gstate|gt|identmatrix|idiv|idtransform|if|ifelse|image|imagemask|index|ineofill|infill|initviewclip|inueofill|inufill|invertmatrix|itransform|known|le|length|lineto|load|loop|lt|makefont|matrix|maxlength|mod|moveto|mul|ne|neg|newpath|not|null|or|pathbbox|pathforall|pop|print|printobject|put|putinterval|rcurveto|read|readhexstring|readline|readstring|rectclip|rectfill|rectstroke|rectviewclip|repeat|restore|rlineto|rmoveto|roll|rotate|round|save|scale|scalefont|search|selectfont|setbbox|setcachedevice|setcachedevice2|setcharwidth|setcmykcolor|setdash|setfont|setgray|setgstate|sethsbcolor|setlinecap|setlinejoin|setlinewidth|setmatrix|setrgbcolor|setshared|shareddict|show|showpage|stop|stopped|store|string|stringwidth|stroke|strokepath|sub|systemdict|token|transform|translate|truncate|type|uappend|ucache|ueofill|ufill|undef|upath|userdict|ustroke|viewclip|viewclippath|where|widthshow|write|writehexstring|writeobject|writestring|wtranslation|xor|xshow|xyshow|yshow|FontDirectory|SharedFontDirectory|Courier|Courier-Bold|Courier-BoldOblique|Courier-Oblique|Helvetica|Helvetica-Bold|Helvetica-BoldOblique|Helvetica-Oblique|Symbol|Times-Bold|Times-BoldItalic|Times-Italic|Times-Roman|execuserobject|currentcolor|currentcolorspace|currentglobal|execform|filter|findresource|globaldict|makepattern|setcolor|setcolorspace|setglobal|setpagedevice|setpattern|ISOLatin1Encoding|StandardEncoding|atan|banddevice|bytesavailable|cachestatus|closefile|colorimage|condition|copypage|cos|countdictstack|countexecstack|cshow|currentblackgeneration|currentcacheparams|currentcolorscreen|currentcolortransfer|currentcontext|currentflat|currenthalftone|currenthalftonephase|currentmiterlimit|currentobjectformat|currentpacking|currentscreen|currentstrokeadjust|currenttransfer|currentundercolorremoval|defaultmatrix|definefont|deletefile|detach|deviceinfo|dictstack|echo|erasepage|errordict|execstack|executeonly|exp|false|filenameforall|fileposition|fork|framedevice|grestoreall|handleerror|initclip|initgraphics|initmatrix|instroke|inustroke|join|kshow|ln|lock|log|mark|monitor|noaccess|notify|nulldevice|packedarray|quit|rand|rcheck|readonly|realtime|renamefile|renderbands|resetfile|reversepath|rootfont|rrand|run|scheck|setblackgeneration|setcachelimit|setcacheparams|setcolorscreen|setcolortransfer|setfileposition|setflat|sethalftone|sethalftonephase|setmiterlimit|setobjectformat|setpacking|setscreen|setstrokeadjust|settransfer|setucacheparams|setundercolorremoval|sin|sqrt|srand|stack|status|statusdict|true|ucachestatus|undefinefont|usertime|ustrokepath|version|vmreclaim|vmstatus|wait|wcheck|xcheck|yield|defineuserobject|undefineuserobject|UserObjects|cleardictstack|setvmthreshold|currentcolorrendering|currentdevparams|currentoverprint|currentpagedevice|currentsystemparams|currentuserparams|defineresource|findencoding|gcheck|glyphshow|languagelevel|product|pstack|resourceforall|resourcestatus|revision|serialnumber|setcolorrendering|setdevparams|setoverprint|setsystemparams|setuserparams|startjob|undefineresource|GlobalFontDirectory|ASCII85Decode|ASCII85Encode|ASCIIHexDecode|ASCIIHexEncode|CCITTFaxDecode|CCITTFaxEncode|DCTDecode|DCTEncode|LZWDecode|LZWEncode|NullEncode|RunLengthDecode|RunLengthEncode|SubFileDecode|CIEBasedA|CIEBasedABC|DeviceCMYK|DeviceGray|DeviceRGB|Indexed|Pattern|Separation|CIEBasedDEF|CIEBasedDEFG|DeviceN)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '%' && this.str[1] == '!' && this.hl('%!', 'dsOthers')) {if(m = this.postscript_header())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.postscript_comment())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.postscript_string())return this.pop(), m-1;continue;}
            if((m = /^\/{1,2}[^\s\(\)\{\}\[\]%/]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    postscript_comment: function postscript_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    postscript_header: function postscript_header(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    postscript_string: function postscript_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
