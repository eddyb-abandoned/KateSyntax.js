KateSyntax.langs.cg.syntax = {
    default: 'cg_normal',
    cg_normal: function cg_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:do|while|if|else|for|struct|return|static|typedef|discard|true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:POSITION|COLOR|COLOR0|COLOR1|COLOR2|COLOR3|TEXCOORD0|TEXCOORD1|TEXCOORD2|TEXCOORD3|TEXCOORD4|TEXCOORD5|TEXCOORD6|TEXCOORD7|TEXCOORD8|TEXCOORD9|TEXCOORD10|TEXCOORD11|TEXCOORD12|TEXCOORD13|TEXCOORD14|TEXCOORD15|TEXUNIT0|TEXUNIT1|TEXUNIT2|TEXUNIT3|TEXUNIT4|TEXUNIT5|TEXUNIT6|TEXUNIT7|TEXUNIT8|TEXUNIT9|TEXUNIT10|TEXUNIT11|TEXUNIT12|TEXUNIT13|TEXUNIT14|TEXUNIT15|WPOS|DEPTH|BLENDWEIGHT|NORMAL|TESSFACTOR|FOGCOORD|PSIZE|BLENDINDICES|TANGENT|BINORMAL|FOG|BCOL0|BCOL1|FACE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if((m = /^float[1234](x[1234])?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^half[1234](x[1234])?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^fixed[1234](x[1234])?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^bool[1234](x[1234])?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^int[1234](x[1234])?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:bool|int|fixed|half|float|void|sampler|sampler1D|sampler2D|sampler3D|samplerCUBE|samplerRECT|packed|const|uniform|in|out|inout)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:fragout|fragout_float)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[0123456789]*[.][0123456789]+f/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[0123456789]*[.][0123456789]+h/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[0123456789]*[.][0123456789]+x/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[0123456789]*[.][0123456789]+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.cg_commentar1())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cg_commentar2())return this.pop(), m-1;continue;}
            if((m = /^(?:abs|acos|all|any|asin|atan|atan2|ceil|clamp|cos|cosh|cross|degrees|determinant|dot|exp|exp2|floor|fmod|frac|frexp|isfinite|isinf|isnan|ldexp|lerp|lit|log|log2|log10|max|min|modf|mul|noise|pow|radians|round|rsqrt|saturate|sign|sin|sincos|sinh|smoothstep|step|sqrt|tan|tanh|transpose|distance|faceforward|length|normalize|reflect|refract|tex1D|tex1Dproj|tex2D|tex2Dproj|texRECT|texRECTproj|tex3D|tex3Dproj|texCUBE|texCUBEproj|ddx|ddy|debug|pack_2half|unpack_2half|pack_2ushort|unpack_2ushort|pack_4byte|unpack_4byte|pack_4ubyte|unpack_4ubyte)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:bold')) continue;
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:normal')) continue;
            if((m = /^[.]{1,1}[rgbaxyzw]+(?=[\s/*-+<>])/.exec(this.str)) && this.hl(m[0], 'dsNormal;font-weight:bold')) continue;
            if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.cg_member())return this.pop(), m-1;continue;}
            if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cg_member: function cg_member(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\b[_\w][_\w\d]*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction;font-weight:normal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    cg_commentar1: function cg_commentar1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cg_commentar2: function cg_commentar2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cg_commentarPreprocessor: function cg_commentarPreprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cg_outscoped: function cg_outscoped(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cg_commentar2())return this.pop(), m-1;continue;}
            if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.cg_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*(endif|else|elif)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    cg_outscopedIntern: function cg_outscopedIntern(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.cg_commentar2())return this.pop(), m-1;continue;}
            if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.cg_outscopedIntern())return this.pop(), m-1;continue;}
            if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
