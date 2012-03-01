var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normalText();
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
HL.prototype._normalText = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:true|false|known|unknown|odd|charexists|not|and|or)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:normaldeviate|length|ASCII|oct|hex|angle|turningnumber|totalweight|directiontime|xpart|ypart|xxpart|xypart|yxpart|yypart|sqrt|sind|cosd|mlog|mexp|floor|uniformdeviate|abs|div|dotprod|max|min|mod|ceiling)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:tracingtitles|tracingequations|tracingcapsules|tracingchoices|tracingspecs|tracingpens|tracingcommands|tracingrestores|tracingmacros|tracingedges|tracingoutput|tracingonline|tracingstats|pausing|showstopping|fontmaking|proofing|turningcheck|warningcheck|smoothing|autorounding|granularity|fillin|year|month|day|time|charcode|charext|charwd|charht|chardp|charic|chardx|chardy|designsize|hppp|vppp|xoffset|yoffset|boundarychar)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:point|of|precontrol|postcontrol|penoffset|rotated|scaled|shifted|slanted|transformed|xscaled|yscaled|zscaled)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:makepath|reverse|subpath|curl|tension|atleast|controls|cycle)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:nullpen|pencircle|makepen)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:nullpicture)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:jobname|readstring|str|char|decimal|substring)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:end|dump|save|interim|newinternal|randomseed|let|delimiters|outer|everyjob|show|showvariable|showtoken|showdependencies|showstats|message|errmessage|errhelp|batchmode|nonstopmode|scrollmode|errorstopmode|addto|also|contour|doublepath|withpen|withweight|cull|keeping|dropping|display|inwindow|openwindow|at|from|to|shipout|special|numspecial)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:boolean|numeric|pair|path|pen|picture|string|transform)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:expr|suffix|text|primary|secondary|tertiary|primarydef|secondarydef|tertiarydef)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:else|elseif|step|until|upto|exitif)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:charlist|endinput|expandafter|extensible|fontdimen|headerbyte|inner|input|intersectiontimes|kern|ligtable|quote|scantokens|skipto)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:addto_currentpicture|aspect_ratio|base_name|base_version|blacker|blankpicture|bot|bye|byte|capsule_def|change_width|clear_pen_memory|clearit|clearpen|clearxy|counterclockwise|culldraw|cullit|currentpen|currentpen_path|currentpicture|currenttransform|currentwindow|cutdraw|cutoff|d|decr|define_blacker_pixels|define_corrected_pixels|define_good_x_pixels|define_good_y_pixels|define_horizontal_corrected_pixels|define_pixels|define_whole_blacker_pixels|define_whole_pixels|define_whole_vertical_blacker_pixels|define_whole_vertical_pixels|dir|direction|directionpoint|displaying|ditto|down|downto|draw|drawdot|eps|epsilon|extra_setup|erase|exitunless|fill|filldraw|fix_units|flex|font_coding_scheme|font_extra_space|font_identifier|font_normal_shrink|font_normal_space|font_normal_stretch|font_quad|font_setup|font_size|font_slant|font_x_height|fullcircle|generate|gfcorners|gobble|gobbled|grayfont|h|halfcircle|hide|hround|identity|image_rules|incr|infinity|interact|interpath|intersectionpoint|inverse|italcorr|join_radius|killtext|labelfont|labels|left|lft|localfont|loggingall|lowres|lowres_fix|mag|magstep|makebox|makegrid|makelabel|maketicks|mode|mode_def|mode_name|mode_setup|nodisplays|notransforms|number_of_modes|numtok|o_correction|openit|origin|pen_bot|pen_lft|pen_rt|pen_top|penlabels|penpos|penrazor|penspeck|pensquare|penstroke|pickup|pixels_per_inch|proof|proofoffset|proofrule|proofrulethickness|quartercircle|range|reflectedabout|relax|right|rotatedabout|rotatedaround|round|rt|rulepen|savepen|screenchars|screen_rows|screen_cols|screenrule|screenstrokes|shipit|showit|slantfont|smode|smoke|softjoin|solve|stop|superellipse|takepower|tensepath|titlefont|tolerance|top|tracingall|tracingnone|undraw|undrawdot|unfill|unfilldraw|unitpixel|unitsquare|unitvector|up|upto|vround|w|whatever)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bluepart|clip|color|dashed|fontsize|greenpart|infont|linecap|linejoin|llcorner|lrcorner|miterlimit|mpxbreak|prologues|redpart|setbounds|tracinglostchars|truecorners|ulcorner|urcorner|withcolor)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:ahangle|ahlength|background|bbox|bboxmargin|beveled|black|blue|buildcycle|butt|center|cutafter|cutbefore|cuttings|dashpattern|defaultfont|defaultpen|defaultscale|dotlabel|dotlabels|drawarrow|drawdblarrow|drawoptions|evenly|green|label|labeloffset|mitered|red|rounded|squared|thelabel|white|base_name|base_version|upto|downto|exitunless|relax|gobble|gobbled|interact|loggingall|tracingall|tracingnone|eps|epsilon|infinity|right|left|up|down|origin|quartercircle|halfcircle|fullcircle|unitsquare|identity|blankpicture|withdots|ditto|EOF|pensquare|penrazor|penspeck|whatever|round|byte|dir|unitvector|inverse|counterclockwise|tensepath|takepower|direction|directionpoint|intersectionpoint|softjoin|incr|decr|reflectedabout|rotatedaround|rotatedabout|flex|superellipse|interpath|magstep|currentpen|currentpen_path|currentpicture|fill|draw|filldraw|drawdot|unfill|undraw|unfilldraw|undrawdot|erase|cutdraw|image|pickup|numeric_pickup|pen_lft|pen_rt|pen_top|pen_bot|savepen|clearpen|clear_pen_memory|lft|rt|top|bot|ulft|urt|llft|lrt|penpos|penstroke|arrowhead|makelabel|labels|penlabel|range|numtok|thru|clearxy|clearit|clearpen|pickup|shipit|bye|hide|stop|solve|blacker|capsule_def|change_width|define_blacker_pixels|define_corrected_pixels|define_good_x_pixels|define_good_y_pixels|define_horizontal_corrected_pixels|define_pixels|define_whole_blacker_pixels|define_whole_vertical_blacker_pixels|define_whole_vertical_pixels|extra_setup|font_coding_scheme|font_extra_space|font_identifier|font_normal_shrink|font_normal_space|font_normal_stretch|font_quad|font_size|font_slant|font_x_height|italcorr|labelfont|makebox|makegrid|maketicks|mode_def|mode_setup|o_correction|proofrule|proofrulethickness|rulepen|smode|cullit|currenttransform|gfcorners|grayfont|hround|imagerules|lowres_fix|nodisplays|notransforms|openit|proofoffset|screenchars|screenrule|screenstrokes|showit|slantfont|titlefont|unitpixel|vround|circmargin|defaultdx|defaultdy|boxit|boxjoin|bpath|circleit|drawboxed|drawboxes|drawunboxed|fixpos|fixsize|pic)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^(\+|\-|\*|\/|\=|\:\=)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsKeyword')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b(bp|cc|cm|dd|in|mm|pc|pt)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b-?\d+(bp|cc|cm|dd|in|mm|pc|pt)#?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b-?\.\d+(bp|cc|cm|dd|in|mm|pc|pt)#?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b-?\d+\.\d+(bp|cc|cm|dd|in|mm|pc|pt)#?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\b[xy]\d(\w|\')*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bz\d(\w|\')*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bp\d(\w|\')*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '$' && this.hl('$', 'dsKeyword')) continue;
        if((m = /^\b(verbatimtex|btex)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._teXMode();continue;}
        if((m = /^\bbegin(group|fig|char)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bend(group|fig|char)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bextra_begin(group|fig|char)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bextra_end(group|fig|char)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(def|vardef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\benddef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bif\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bfi\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\b(for|forsuffixes|forever)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\bendfor\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
        if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._teXMode = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\' && this.hl('\\', 'dsNormal')) {this._contrSeq();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) {this._mathMode();continue;}
        if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._mathMode();continue;}
        if((m = /^\betex\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._contrSeq = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^verb\*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verb();continue;}
        if((m = /^verb(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verb();continue;}
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[a-zA-Z]+(\+?|\*{0,3})/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._toEndOfLine = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._verb = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(.)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._verbEnd();continue;}
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._verbEnd = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._#pop#pop#pop();continue;}
        if(this.str[0] == '×' && this.hl('×', 'undefined')) continue;
        if((m = /^[^%1\xd7]*/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._mathMode = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^$$/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\\' && this.hl('\\', 'dsNormal')) {this._mathContrSeq();continue;}
        if(this.str[0] == '$' && this.hl('$', 'dsNormal')) return;
        if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal')) return;
        if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsAlert')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._mathContrSeq = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
        if((m = /^[a-zA-Z]+\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(FIXME|TODO):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '×' && this.hl('×', 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
