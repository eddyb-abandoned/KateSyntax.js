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
        if((m = /^(?:For|Do|Endfor|Repeat|Endrep|While|Endwhile|Until|Case|Endcase|If|Endif|Else|Endelse|Then|Begin|End|Function|Goto|Pro|Eq|Ge|Gt|Le|Lt|Ne|Mod|Or|Xor|Not|And|Then|Return|Common|Of|On_ioerror|Switch|Endswitch)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Fix|Long|Long64|uint|Byte|Float|Double|complex|dcomplex|complexarr|dcomplexarr|String|Intarr|lonarr|lon64arr|uintarr|ulong|ulonarr|ulon64arr|Bytarr|Bytscl|Fltarr|Dblarr|Strarr|Objarr|Indgen|Findgen|Dindgen|Dcindgen|cindgen|lindgen|bindgen|sindgen|uindgen|ul64indgen|l64indgen|ulindgen|Replicate|Ptrarr)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:ABS|ACOS|ADAPT_HIST_EQUAL|ALOG|ALOG10|ARG_PRESENT|ASIN|ASSOC|ATAN|AXIS|BESELI|BESELJ|BESELY|BLAS_AXPY|BREAKPOINT|BROYDEN|BYTEORDER|CALL_EXTERNAL|CALL_FUNCTION|CALL_METHOD|CALL_PROCEDURE|CATCH|CEIL|CHECK_MATH|CHOLDC|CHOLSOL|COLOR_CONVERT|COLOR_QUAN|COMPILE_OPT|COMPUTE_MESH_NORMALS|CONJ|CONSTRAINED_MIN|CONTOUR|CONVERT_COORD|CONVOL|CORRELATE|COS|COSH|CREATE_STRUCT|CURSOR|DEFINE_KEY|DEFSYSV|DELVAR|DEVICE|DFPMIN|DIALOG_MESSAGE|DIALOG_PICKFILE|DIALOG_PRINTERSETUP|DIALOG_PRINTJOB|DILATE|DLM_LOAD|DRAW_ROI|ELMHES|EMPTY|ENABLE_SYSRTN|ERASE|ERODE|ERRORF|EXECUTE|EXIT|EXP|EXPAND_PATH|EXPINT|FINDFILE|FINITE|FLOOR|FORMAT_AXIS_VALUES|FORWARD_FUNCTION|FSTAT|FULSTR|FZ_ROOTS|GAUSSINT|GET_KBRD|GETENV|GRID_TPS|GRID3|HEAP_GC|HELP|HISTOGRAM|HQR|IMAGE_STATISTICS|IMAGINARY|INTERPOLATE|INVERT|ISHFT|ISOCONTOUR|ISOSURFACE|JOURNAL|KEYWORD_SET|LABEL_REGION|LINBCG|LINKIMAGE|LMGR|LNGAMMA|LNP_TEST|LOADCT|LOCALE_GET|LSODE|LUDC|LUMPROVE|LUSOL|MACHAR|MAKE_ARRAY|MAP_PROJ_INFO|MAX|MEDIAN|MESH_CLIP|MESH_DECIMATE|MESH_ISSOLID|MESH_MERGE|MESH_NUMTRIANGLES|MESH_SMOOTH|MESH_SURFACEAREA|MESH_VALIDATE|MESH_VOLUME|MESSAGE|MIN|N_ELEMENTS|N_PARAMS|N_TAGS|NEWTON|OBJ_CLASS|OBJ_DESTROY|OBJ_ISA|OBJ_NEW|OBJ_VALID|ON_ERROR|OPLOT|PARTICLE_TRACE|PLOT|PLOTS|POLY_2D|POLYFILL|POLYFILLV|POLYSHADE|POWELL|PROFILER|PTR_FREE|PTR_NEW|PTR_VALID|QROMB|QROMO|QSIMP|RANDOMN|RANDOMU|REBIN|REFORM|RETALL|RETURN|RIEMANN|RK4|ROBERTS|ROTATE|ROUND|SET_PLOT|SET_SHADING|SETENV|SHADE_SURF|SHADE_VOLUME|SHIFT|SIN|SINH|SIZE|SMOOTH|SOBEL|SORT|SPL_INIT|SPL_INTERP|SPRSAB|SPRSAX|SPRSIN|SQRT|STOP|STRCMP|STRCOMPRESS|STREGEX|STRJOIN|STRLEN|STRLOWCASE|STRMATCH|STRMESSAGE|STRMID|STRPOS|STRPUT|STRTRIM|STRUCT_ASSIGN|STRUCT_HIDE|STRUPCASE|SURFACE|SVDC|SVSOL|SYSTIME|TAG_NAMES|TAN|TANH|TEMPORARY|TETRA_CLIP|TETRA_SURFACE|TETRA_VOLUME|THIN|THREED|TOTAL|TRANSPOSE|TRIANGULATE|TRIGRID|TRIQL|TRIRED|TRISOL|TV|TVCRS|TVLCT|TVRD|TVSCLU|USERSYM|VALUE_LOCATE|VOIGT|VOXEL_PROJ|WAIT|WATERSHED|WDELETE|WHERE|WIDGET_BASE|WIDGET_BUTTON|WIDGET_CONTROL|WIDGET_DRAW|WIDGET_DROPLIST|WIDGET_EVENT|WIDGET_INFO|WIDGET_LABEL|WIDGET_LIST|WIDGET_SLIDER|WIDGET_TABLE|WIDGET_TEXT|WINDOW|WSET|WSHOW|WTN|XYOUTS)\b/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^(?:Open|FLUSH|IOCTL|RESTORE|SAVE|POINT_LUN|Openr|Openw|Openu|Close|Free_lun|get_lun|assoc|catch|cd|spawn|eof|print|printf|prints|read|readf|reads|writu)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^'.*?'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '(' && this.hl('(', 'dsDecVal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsDecVal')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsChar')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsChar')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsDecVal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsDecVal')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsChar')) continue;
        if(this.str[0] == '@' && this.hl('@', 'dsChar')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsChar')) continue;
        if(this.str[0] == ';' && this.hl(';', 'dsChar')) {this._comment();continue;}
        if(this.str[0] == '!' && this.hl('!', 'dsChar')) {this._systemvarcontext();continue;}
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
HL.prototype._systemvarcontext = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '(' && this.hl('(', 'dsDecVal')) return;
        if(this.str[0] == '.' && this.hl('.', 'dsChar')) return;
        if(this.str[0] == ' ' && this.hl(' ', 'dsDecVal')) return;
        if((m = /^(?:dpi|dtor|map|pi|radeg|values|err|error_state|error|err_string|except|mouse|msg_prefix|syserror|syserr_string|warn|dir|dlm_path|edit_input|help_path|journal|more|path|prompt|quiet|version|c|d|order|p|x|y|z|stime)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsChar')) return;
        this.hl(this.str[0], 'dsChar');
    }
};
