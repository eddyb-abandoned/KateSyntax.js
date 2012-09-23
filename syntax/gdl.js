KateSyntax.langs.gdl.syntax = {
    default: 'gdl_default',
    gdl_default: function gdl_default(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.gdl_ccomment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.gdl_cppcomment())return this.pop(), m-1;continue;}
            if((m = /^focus/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(graph|edge|node|region|backedge|(left|right|)(bent|)nearedge):/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^loc *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^colorentry/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_centry())return this.pop(), m-1;continue;}
            if((m = /^arrow_?mode *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_arrowmode())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|)(text|border|)color *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_colorid())return this.pop(), m-1;continue;}
            if((m = /^(foldedge.|edge.|)(arrow|backarrow|)color *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_colorid())return this.pop(), m-1;continue;}
            if((m = /^(foldedge.|edge.|)(arrow|backarrow)style *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_arrow())return this.pop(), m-1;continue;}
            if((m = /^(foldedge.|edge.|)linestyle *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lineid())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|)borderstyle *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lineid())return this.pop(), m-1;continue;}
            if((m = /^view *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_fishid())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|)shape/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_shapeid())return this.pop(), m-1;continue;}
            if((m = /^(source|target)(name|)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lquote())return this.pop(), m-1;continue;}
            if((m = /^title *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lquote())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|foldedge.|edge.|)label *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lquote())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|foldedge.|edge.|)fontname *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_fontlq())return this.pop(), m-1;continue;}
            if((m = /^infoname(1|2|3) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lquote())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|)info(1|2|3) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lquote())return this.pop(), m-1;continue;}
            if((m = /^spreadlevel *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|)(level|vertical_?order) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_nodelevel())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|foldedge.|edge.|)horizontal_?order *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^stat(e|us) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_stateid())return this.pop(), m-1;continue;}
            if((m = /^layout_?algorithm *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_algid())return this.pop(), m-1;continue;}
            if((m = /^crossing_?optimization *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^crossing_?phase2 *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^(dirty_edge_|display_edge_|displayedge|late_edge_|subgraph_?)labels *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^s?manhatt(a|e)n_?edges *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^(nodes|near_?edges|edges|splines) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^classname/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_classname())return this.pop(), m-1;continue;}
            if((m = /^orientation *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_orient())return this.pop(), m-1;continue;}
            if((m = /^node_alignment *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_nodealign())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|)textmode *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_textmode())return this.pop(), m-1;continue;}
            if((m = /^equal_y_dist *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^equal_?ydist *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^crossing_?weight *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_weight())return this.pop(), m-1;continue;}
            if((m = /^(fast_?|)icons *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^fine_?tuning *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^(f?straight_?|priority_)phase *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^ignore_?singles *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^(in|out|)port_?sharing *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^linear_?segments *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^(foldnode.|node.|)(height|width|borderwidth|stretch|shrink) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^(foldedge.|edge.|)(arrowsize|backarrowsize|thickness|class|priority) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^anchor *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^iconcolors *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^hidden *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^energetic *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_boolean())return this.pop(), m-1;continue;}
            if((m = /^layout_(up|down|near|spline)factor *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^border +(x|y) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^splinefactor *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^(gravity|tempfactor|treefactor) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_floatval())return this.pop(), m-1;continue;}
            if((m = /^(xspace|xbase|xmax|xraster|x) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^(yspace|ybase|ymax|yraster|y) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^(xlraster|xlspace) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^magnetic_force(1|2) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^magnetic_field(1|2) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_magnor())return this.pop(), m-1;continue;}
            if((m = /^(a|b|c|fd|p|r|s)(max) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^(c|p|r)(min) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^(?:attraction|repulsion|randomfactor|randomimpulse|randomrounds|tempscheme|temptreshold|tempmin|tempmax)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_intval())return this.pop(), m-1;continue;}
            if((m = /^scaling *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_scaling())return this.pop(), m-1;continue;}
            if((m = /^useraction(name|cmd)(1|2|3|4) *:/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_lquote())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_string: function gdl_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
            if((m = /^\\(n|a|t|b)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\fi(0|1|2)[0-9][0-9]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\f(u|I|b|B|n|[0-9][0-9])/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    gdl_scaling: function gdl_scaling(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^maxspect/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_ccomment: function gdl_ccomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), this.gdl_default();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    gdl_cppcomment: function gdl_cppcomment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    gdl_colorid: function gdl_colorid(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:white|blue|red|green|yellow|magenta|cyan|darkgrey|darkgray|darkblue|darkred|darkgreen|darkyellow|darkmagenta|darkcyan|gold|lightgrey|lightgray|lightblue|lightred|lightgreen|lightyellow|lightmagenta|lightcyan|lilac|turquoise|aquamarine|khaki|purple|yellowgreen|pink|orange|orchid|black)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            if((m = /^[0-9][0-9]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_shapeid: function gdl_shapeid(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:box|triangle|circle|ellipse|hexagon|rhomb|rhomboid|trapeze|uptrapeze|trapezoid|uptrapezoid|lparallelogram|rparallelogram)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_lquote: function gdl_lquote(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.gdl_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_stateid: function gdl_stateid(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:unfolded|folded|boxed|clustered|wrapped|exclusive|white)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_algid: function gdl_algid(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:normal|tree|forcedir|dfs|minbackward|maxdepth|maxdepthslow|mindepth|mindepthslow|minindegree|minoutdegree|maxindegree|maxoutdegree|maxdegree|mindegree)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_fishid: function gdl_fishid(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:pfish|cfish|fpfish|fcfish|dpfish|dcfish)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_boolean: function gdl_boolean(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(yes|no)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_lineid: function gdl_lineid(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:solid|continuous|dashed|dotted|double|triple|invisible)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_intval: function gdl_intval(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.gdl_longint())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_longint: function gdl_longint(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.gdl_longint())return this.pop(), m-1;continue;}
            if((m = /^\ /.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.gdl_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_centry: function gdl_centry(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-9][0-9]?/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.gdl_cecolon())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.gdl_default();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_rgb: function gdl_rgb(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-9][0-9]?[0-9]? +[0-9][0-9]?[0-9]? +[0-9][0-9]?[0-9]?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_floatval: function gdl_floatval(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_fontlq: function gdl_fontlq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.gdl_fontbase())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_fontbase: function gdl_fontbase(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^((tim|ncen)(R|B|I|BI)|(cour|helv)(R|B|O|BO)|symb)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_fontsize())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_fontsize: function gdl_fontsize(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(08|10|12|14|18|24)(.vcf|)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_arrow: function gdl_arrow(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(solid|line|none)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_arrowmode: function gdl_arrowmode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(free|fixed)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_magnor: function gdl_magnor(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:no|polar|circular|polcircular|orthogonal)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            if((m = /^(?:toptobottom|bottomtotop|lefttoright|righttoleft|top_to_bottom|bottom_to_top|left_to_right|right_to_left)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_orient: function gdl_orient(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:toptobottom|bottomtotop|lefttoright|righttoleft|top_to_bottom|bottom_to_top|left_to_right|right_to_left)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_nodealign: function gdl_nodealign(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(top|center|bottom)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_nodelevel: function gdl_nodelevel(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^maxlevel/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.gdl_longint())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_classname: function gdl_classname(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.gdl_lquote())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_cecolon: function gdl_cecolon(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsOthers')) {if(m = this.gdl_rgb())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_weight: function gdl_weight(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(medianbary|barymedian|bary|median)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    gdl_textmode: function gdl_textmode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(center|left_justify|right_justify)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.gdl_default())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
