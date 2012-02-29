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
        if((m = /^(?:abs|add|aload|anchorsearch|and|arc|arcn|arct|arcto|array|ashow|astore|awidthshow|begin|bind|bitshift|ceiling|charpath|clear|cleartomark|clip|clippath|closepath|concat|concatmatrix|copy|count|counttomark|currentcmykcolor|currentdash|currentdict|currentfile|currentfont|currentgray|currentgstate|currenthsbcolor|currentlinecap|currentlinejoin|currentlinewidth|currentmatrix|currentpoint|currentrgbcolor|currentshared|curveto|cvi|cvlit|cvn|cvr|cvrs|cvs|cvx|def|defineusername|dict|div|dtransform|dup|end|eoclip|eofill|eoviewclip|eq|exch|exec|exit|file|fill|findfont|flattenpath|floor|flush|flushfile|for|forall|ge|get|getinterval|grestore|gsave|gstate|gt|identmatrix|idiv|idtransform|if|ifelse|image|imagemask|index|ineofill|infill|initviewclip|inueofill|inufill|invertmatrix|itransform|known|le|length|lineto|load|loop|lt|makefont|matrix|maxlength|mod|moveto|mul|ne|neg|newpath|not|null|or|pathbbox|pathforall|pop|print|printobject|put|putinterval|rcurveto|read|readhexstring|readline|readstring|rectclip|rectfill|rectstroke|rectviewclip|repeat|restore|rlineto|rmoveto|roll|rotate|round|save|scale|scalefont|search|selectfont|setbbox|setcachedevice|setcachedevice2|setcharwidth|setcmykcolor|setdash|setfont|setgray|setgstate|sethsbcolor|setlinecap|setlinejoin|setlinewidth|setmatrix|setrgbcolor|setshared|shareddict|show|showpage|stop|stopped|store|string|stringwidth|stroke|strokepath|sub|systemdict|token|transform|translate|truncate|type|uappend|ucache|ueofill|ufill|undef|upath|userdict|ustroke|viewclip|viewclippath|where|widthshow|write|writehexstring|writeobject|writestring|wtranslation|xor|xshow|xyshow|yshow|FontDirectory|SharedFontDirectory|Courier|Courier-Bold|Courier-BoldOblique|Courier-Oblique|Helvetica|Helvetica-Bold|Helvetica-BoldOblique|Helvetica-Oblique|Symbol|Times-Bold|Times-BoldItalic|Times-Italic|Times-Roman|execuserobject|currentcolor|currentcolorspace|currentglobal|execform|filter|findresource|globaldict|makepattern|setcolor|setcolorspace|setglobal|setpagedevice|setpattern|ISOLatin1Encoding|StandardEncoding|atan|banddevice|bytesavailable|cachestatus|closefile|colorimage|condition|copypage|cos|countdictstack|countexecstack|cshow|currentblackgeneration|currentcacheparams|currentcolorscreen|currentcolortransfer|currentcontext|currentflat|currenthalftone|currenthalftonephase|currentmiterlimit|currentobjectformat|currentpacking|currentscreen|currentstrokeadjust|currenttransfer|currentundercolorremoval|defaultmatrix|definefont|deletefile|detach|deviceinfo|dictstack|echo|erasepage|errordict|execstack|executeonly|exp|false|filenameforall|fileposition|fork|framedevice|grestoreall|handleerror|initclip|initgraphics|initmatrix|instroke|inustroke|join|kshow|ln|lock|log|mark|monitor|noaccess|notify|nulldevice|packedarray|quit|rand|rcheck|readonly|realtime|renamefile|renderbands|resetfile|reversepath|rootfont|rrand|run|scheck|setblackgeneration|setcachelimit|setcacheparams|setcolorscreen|setcolortransfer|setfileposition|setflat|sethalftone|sethalftonephase|setmiterlimit|setobjectformat|setpacking|setscreen|setstrokeadjust|settransfer|setucacheparams|setundercolorremoval|sin|sqrt|srand|stack|status|statusdict|true|ucachestatus|undefinefont|usertime|ustrokepath|version|vmreclaim|vmstatus|wait|wcheck|xcheck|yield|defineuserobject|undefineuserobject|UserObjects|cleardictstack|setvmthreshold|currentcolorrendering|currentdevparams|currentoverprint|currentpagedevice|currentsystemparams|currentuserparams|defineresource|findencoding|gcheck|glyphshow|languagelevel|product|pstack|resourceforall|resourcestatus|revision|serialnumber|setcolorrendering|setdevparams|setoverprint|setsystemparams|setuserparams|startjob|undefineresource|GlobalFontDirectory|ASCII85Decode|ASCII85Encode|ASCIIHexDecode|ASCIIHexEncode|CCITTFaxDecode|CCITTFaxEncode|DCTDecode|DCTEncode|LZWDecode|LZWEncode|NullEncode|RunLengthDecode|RunLengthEncode|SubFileDecode|CIEBasedA|CIEBasedABC|DeviceCMYK|DeviceGray|DeviceRGB|Indexed|Pattern|Separation|CIEBasedDEF|CIEBasedDEFG|DeviceN)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '%!' && this.hl('%!', 'dsOthers')) {this._header();continue;}
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsString')) {this._string();continue;}
        if((m = /^\/{1,2}[^\s\(\)\{\}\[\]%/]*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
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
HL.prototype._header = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
