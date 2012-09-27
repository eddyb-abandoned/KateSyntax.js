KateSyntax.langs.metafont.syntax = {
    default: 'metafont_normalText',
    metafont_normalText: function metafont_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:true|false|known|unknown|odd|charexists|not|and|or)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#AA00AA;font-style:italic;font-weight:normal')) continue;
            if((m = /^(?:normaldeviate|length|ASCII|oct|hex|angle|turningnumber|totalweight|directiontime|xpart|ypart|xxpart|xypart|yxpart|yypart|sqrt|sind|cosd|mlog|mexp|floor|uniformdeviate|abs|div|dotprod|max|min|mod|ceiling)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:tracingtitles|tracingequations|tracingcapsules|tracingchoices|tracingspecs|tracingpens|tracingcommands|tracingrestores|tracingmacros|tracingedges|tracingoutput|tracingonline|tracingstats|pausing|showstopping|fontmaking|proofing|turningcheck|warningcheck|smoothing|autorounding|granularity|fillin|year|month|day|time|charcode|charext|charwd|charht|chardp|charic|chardx|chardy|designsize|hppp|vppp|xoffset|yoffset|boundarychar)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:point|of|precontrol|postcontrol|penoffset|rotated|scaled|shifted|slanted|transformed|xscaled|yscaled|zscaled)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:makepath|reverse|subpath|curl|tension|atleast|controls|cycle)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:nullpen|pencircle|makepen)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:nullpicture)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:jobname|readstring|str|char|decimal|substring)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:end|dump|save|interim|newinternal|randomseed|let|delimiters|outer|everyjob|show|showvariable|showtoken|showdependencies|showstats|message|errmessage|errhelp|batchmode|nonstopmode|scrollmode|errorstopmode|addto|also|contour|doublepath|withpen|withweight|cull|keeping|dropping|display|inwindow|openwindow|at|from|to|shipout|special|numspecial)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:boolean|numeric|pair|path|pen|picture|string|transform)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:expr|suffix|text|primary|secondary|tertiary|primarydef|secondarydef|tertiarydef)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:else|elseif|step|until|upto|exitif)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:charlist|endinput|expandafter|extensible|fontdimen|headerbyte|inner|input|intersectiontimes|kern|ligtable|quote|scantokens|skipto)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:addto_currentpicture|aspect_ratio|base_name|base_version|blacker|blankpicture|bot|bye|byte|capsule_def|change_width|clear_pen_memory|clearit|clearpen|clearxy|counterclockwise|culldraw|cullit|currentpen|currentpen_path|currentpicture|currenttransform|currentwindow|cutdraw|cutoff|d|decr|define_blacker_pixels|define_corrected_pixels|define_good_x_pixels|define_good_y_pixels|define_horizontal_corrected_pixels|define_pixels|define_whole_blacker_pixels|define_whole_pixels|define_whole_vertical_blacker_pixels|define_whole_vertical_pixels|dir|direction|directionpoint|displaying|ditto|down|downto|draw|drawdot|eps|epsilon|extra_setup|erase|exitunless|fill|filldraw|fix_units|flex|font_coding_scheme|font_extra_space|font_identifier|font_normal_shrink|font_normal_space|font_normal_stretch|font_quad|font_setup|font_size|font_slant|font_x_height|fullcircle|generate|gfcorners|gobble|gobbled|grayfont|h|halfcircle|hide|hround|identity|image_rules|incr|infinity|interact|interpath|intersectionpoint|inverse|italcorr|join_radius|killtext|labelfont|labels|left|lft|localfont|loggingall|lowres|lowres_fix|mag|magstep|makebox|makegrid|makelabel|maketicks|mode|mode_def|mode_name|mode_setup|nodisplays|notransforms|number_of_modes|numtok|o_correction|openit|origin|pen_bot|pen_lft|pen_rt|pen_top|penlabels|penpos|penrazor|penspeck|pensquare|penstroke|pickup|pixels_per_inch|proof|proofoffset|proofrule|proofrulethickness|quartercircle|range|reflectedabout|relax|right|rotatedabout|rotatedaround|round|rt|rulepen|savepen|screenchars|screen_rows|screen_cols|screenrule|screenstrokes|shipit|showit|slantfont|smode|smoke|softjoin|solve|stop|superellipse|takepower|tensepath|titlefont|tolerance|top|tracingall|tracingnone|undraw|undrawdot|unfill|unfilldraw|unitpixel|unitsquare|unitvector|up|upto|vround|w|whatever)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#770000;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:bluepart|clip|color|dashed|fontsize|greenpart|infont|linecap|linejoin|llcorner|lrcorner|miterlimit|mpxbreak|prologues|redpart|setbounds|tracinglostchars|truecorners|ulcorner|urcorner|withcolor)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^(?:ahangle|ahlength|background|bbox|bboxmargin|beveled|black|blue|buildcycle|butt|center|cutafter|cutbefore|cuttings|dashpattern|defaultfont|defaultpen|defaultscale|dotlabel|dotlabels|drawarrow|drawdblarrow|drawoptions|evenly|green|label|labeloffset|mitered|red|rounded|squared|thelabel|white|base_name|base_version|upto|downto|exitunless|relax|gobble|gobbled|interact|loggingall|tracingall|tracingnone|eps|epsilon|infinity|right|left|up|down|origin|quartercircle|halfcircle|fullcircle|unitsquare|identity|blankpicture|withdots|ditto|EOF|pensquare|penrazor|penspeck|whatever|round|byte|dir|unitvector|inverse|counterclockwise|tensepath|takepower|direction|directionpoint|intersectionpoint|softjoin|incr|decr|reflectedabout|rotatedaround|rotatedabout|flex|superellipse|interpath|magstep|currentpen|currentpen_path|currentpicture|fill|draw|filldraw|drawdot|unfill|undraw|unfilldraw|undrawdot|erase|cutdraw|image|pickup|numeric_pickup|pen_lft|pen_rt|pen_top|pen_bot|savepen|clearpen|clear_pen_memory|lft|rt|top|bot|ulft|urt|llft|lrt|penpos|penstroke|arrowhead|makelabel|labels|penlabel|range|numtok|thru|clearxy|clearit|clearpen|pickup|shipit|bye|hide|stop|solve|blacker|capsule_def|change_width|define_blacker_pixels|define_corrected_pixels|define_good_x_pixels|define_good_y_pixels|define_horizontal_corrected_pixels|define_pixels|define_whole_blacker_pixels|define_whole_vertical_blacker_pixels|define_whole_vertical_pixels|extra_setup|font_coding_scheme|font_extra_space|font_identifier|font_normal_shrink|font_normal_space|font_normal_stretch|font_quad|font_size|font_slant|font_x_height|italcorr|labelfont|makebox|makegrid|maketicks|mode_def|mode_setup|o_correction|proofrule|proofrulethickness|rulepen|smode|cullit|currenttransform|gfcorners|grayfont|hround|imagerules|lowres_fix|nodisplays|notransforms|openit|proofoffset|screenchars|screenrule|screenstrokes|showit|slantfont|titlefont|unitpixel|vround|circmargin|defaultdx|defaultdy|boxit|boxjoin|bpath|circleit|drawboxed|drawboxes|drawunboxed|fixpos|fixsize|pic)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#770000;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsComment')) {if(m = this.metafont_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.metafont_string())return this.pop(), m-1;continue;}
            if((m = /^(\+|\-|\*|\/|\=|\:\=)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#244CFF;font-weight:normal')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsKeyword;color:#244CFF;font-weight:normal')) continue;
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b(bp|cc|cm|dd|in|mm|pc|pt)\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b-?\d+(bp|cc|cm|dd|in|mm|pc|pt)#?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b-?\.\d+(bp|cc|cm|dd|in|mm|pc|pt)#?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b-?\d+\.\d+(bp|cc|cm|dd|in|mm|pc|pt)#?\b/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b[xy]\d(\w|\')*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#550022')) continue;
            if((m = /^\bz\d(\w|\')*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#550022')) continue;
            if((m = /^\bp\d(\w|\')*/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#550022')) continue;
            if(this.str[0] == '$' && this.hl('$', 'dsKeyword;color:#008000;font-weight:normal')) continue;
            if((m = /^\b(verbatimtex|btex)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.metafont_teXMode())return this.pop(), m-1;continue;}
            if((m = /^\bbegin(group|fig|char)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend(group|fig|char)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bextra_begin(group|fig|char)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bextra_end(group|fig|char)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(def|vardef)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\benddef\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\b(for|forsuffixes|forever)\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bendfor\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    metafont_string: function metafont_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    metafont_teXMode: function metafont_teXMode(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.metafont_contrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;font-style:normal;font-weight:normal')) {if(m = this.metafont_mathMode())return this.pop(), m-1;continue;}
            if((m = /^\\\(/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#00A000;font-style:normal;font-weight:normal')) {if(m = this.metafont_mathMode())return this.pop(), m-1;continue;}
            if((m = /^\betex\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    metafont_contrSeq: function metafont_contrSeq(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^verb\*/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.metafont_verb())return this.pop(), m-1;continue;}
            if((m = /^verb(?=[^a-zA-Z])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) {if(m = this.metafont_verb())return this.pop(), m-1;continue;}
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) continue;
            if((m = /^[a-zA-Z]+(\+?|\*{0,3})/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#800000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    metafont_toEndOfLine: function metafont_toEndOfLine(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    metafont_verb: function metafont_verb(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(.)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.metafont_verbEnd())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    metafont_verbEnd: function metafont_verbEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop(), 2;
            if(this.str[0] == '×' && this.hl('×', 'dsNormal')) continue;
            if((m = /^[^%1\xd7]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\n') return this.pop(), 2;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    metafont_mathMode: function metafont_mathMode(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^$$/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\\' && this.hl('\\', 'dsNormal;color:#606000;font-style:normal;font-weight:normal')) {if(m = this.metafont_mathContrSeq())return this.pop(), m-1;continue;}
            if(this.str[0] == '$' && this.hl('$', 'dsNormal;color:#00A000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsNormal;color:#00A000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsAlert')) continue;
            this.hl(this.str[0], 'dsNormal;color:#00A000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    metafont_mathContrSeq: function metafont_mathContrSeq(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '×' && this.hl('×', 'dsNormal;color:#606000;font-style:normal;font-weight:normal')) continue;
            if((m = /^[a-zA-Z]+\*?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;font-style:normal;font-weight:normal')) return this.pop();
            if((m = /^[^a-zA-Z]/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#606000;font-style:normal;font-weight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal;color:#606000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    metafont_comment: function metafont_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(FIXME|TODO):?/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '×' && this.hl('×', 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
