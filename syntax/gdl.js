var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._default();
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
HL.prototype._default = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._ccomment();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._cppcomment();continue;}
        if((m = /^focus/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(graph|edge|node|region|backedge|(left|right|)(bent|)nearedge):/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^loc *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^colorentry/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._centry();continue;}
        if((m = /^arrow_?mode *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._arrowmode();continue;}
        if((m = /^(foldnode.|node.|)(text|border|)color *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._colorid();continue;}
        if((m = /^(foldedge.|edge.|)(arrow|backarrow|)color *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._colorid();continue;}
        if((m = /^(foldedge.|edge.|)(arrow|backarrow)style *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._arrow();continue;}
        if((m = /^(foldedge.|edge.|)linestyle *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lineid();continue;}
        if((m = /^(foldnode.|node.|)borderstyle *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lineid();continue;}
        if((m = /^view *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._fishid();continue;}
        if((m = /^(foldnode.|node.|)shape/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._shapeid();continue;}
        if((m = /^(source|target)(name|)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lquote();continue;}
        if((m = /^title *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lquote();continue;}
        if((m = /^(foldnode.|node.|foldedge.|edge.|)label *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lquote();continue;}
        if((m = /^(foldnode.|node.|foldedge.|edge.|)fontname *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._fontlq();continue;}
        if((m = /^infoname(1|2|3) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lquote();continue;}
        if((m = /^(foldnode.|node.|)info(1|2|3) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lquote();continue;}
        if((m = /^spreadlevel *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^(foldnode.|node.|)(level|vertical_?order) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._nodelevel();continue;}
        if((m = /^(foldnode.|node.|foldedge.|edge.|)horizontal_?order *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^stat(e|us) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._stateid();continue;}
        if((m = /^layout_?algorithm *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._algid();continue;}
        if((m = /^crossing_?optimization *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^crossing_?phase2 *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^(dirty_edge_|display_edge_|displayedge|late_edge_|subgraph_?)labels *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^s?manhatt(a|e)n_?edges *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^(nodes|near_?edges|edges|splines) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^classname/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._classname();continue;}
        if((m = /^orientation *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._orient();continue;}
        if((m = /^node_alignment *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._nodealign();continue;}
        if((m = /^(foldnode.|node.|)textmode *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._textmode();continue;}
        if((m = /^equal_y_dist *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^equal_?ydist *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^crossing_?weight *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._weight();continue;}
        if((m = /^(fast_?|)icons *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^fine_?tuning *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^(f?straight_?|priority_)phase *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^ignore_?singles *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^(in|out|)port_?sharing *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^linear_?segments *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^(foldnode.|node.|)(height|width|borderwidth|stretch|shrink) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^(foldedge.|edge.|)(arrowsize|backarrowsize|thickness|class|priority) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^anchor *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^iconcolors *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^hidden *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^energetic *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._boolean();continue;}
        if((m = /^layout_(up|down|near|spline)factor *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^border +(x|y) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^splinefactor *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^(gravity|tempfactor|treefactor) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._floatval();continue;}
        if((m = /^(xspace|xbase|xmax|xraster|x) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^(yspace|ybase|ymax|yraster|y) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^(xlraster|xlspace) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^magnetic_force(1|2) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^magnetic_field(1|2) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._magnor();continue;}
        if((m = /^(a|b|c|fd|p|r|s)(max) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^(c|p|r)(min) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^(?:attraction|repulsion|randomfactor|randomimpulse|randomrounds|tempscheme|temptreshold|tempmin|tempmax)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._intval();continue;}
        if((m = /^scaling *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._scaling();continue;}
        if((m = /^useraction(name|cmd)(1|2|3|4) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._lquote();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._default();continue;}
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
        if((m = /^\\(n|a|t|b)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\fi(0|1|2)[0-9][0-9]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\f(u|I|b|B|n|[0-9][0-9])/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._scaling = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^maxspect/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._ccomment = function() {
    var m;
    while(this.pos < this.len) {
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._cppcomment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) {this._default();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._colorid = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:white|blue|red|green|yellow|magenta|cyan|darkgrey|darkgray|darkblue|darkred|darkgreen|darkyellow|darkmagenta|darkcyan|gold|lightgrey|lightgray|lightblue|lightred|lightgreen|lightyellow|lightmagenta|lightcyan|lilac|turquoise|aquamarine|khaki|purple|yellowgreen|pink|orange|orchid|black)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        if((m = /^[0-9][0-9]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._shapeid = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:box|triangle|circle|ellipse|hexagon|rhomb|rhomboid|trapeze|uptrapeze|trapezoid|uptrapezoid|lparallelogram|rparallelogram)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lquote = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stateid = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:unfolded|folded|boxed|clustered|wrapped|exclusive|white)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._algid = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:normal|tree|forcedir|dfs|minbackward|maxdepth|maxdepthslow|mindepth|mindepthslow|minindegree|minoutdegree|maxindegree|maxoutdegree|maxdegree|mindegree)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._fishid = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:pfish|cfish|fpfish|fcfish|dpfish|dcfish)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._boolean = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(yes|no)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._lineid = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:solid|continuous|dashed|dotted|double|triple|invisible)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._intval = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._longint();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._longint = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._longint();continue;}
        if((m = /^\ /.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._centry = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-9][0-9]?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._cecolon();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._rgb = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-9][0-9]?[0-9]? +[0-9][0-9]?[0-9]? +[0-9][0-9]?[0-9]?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._floatval = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._fontlq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._fontbase();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._fontbase = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^((tim|ncen)(R|B|I|BI)|(cour|helv)(R|B|O|BO)|symb)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._fontsize();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._fontsize = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(08|10|12|14|18|24)(.vcf|)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._arrow = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(solid|line|none)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._arrowmode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(free|fixed)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._magnor = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:no|polar|circular|polcircular|orthogonal)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        if((m = /^(?:toptobottom|bottomtotop|lefttoright|righttoleft|top_to_bottom|bottom_to_top|left_to_right|right_to_left)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._orient = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:toptobottom|bottomtotop|lefttoright|righttoleft|top_to_bottom|bottom_to_top|left_to_right|right_to_left)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._nodealign = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(top|center|bottom)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._nodelevel = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^maxlevel/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._longint();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._classname = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._lquote();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._cecolon = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {this._rgb();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._weight = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(medianbary|barymedian|bary|median)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._textmode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(center|left_justify|right_justify)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._default();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
