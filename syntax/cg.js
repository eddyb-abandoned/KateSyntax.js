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
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^(?:abs|acos|all|any|asin|atan|atan2|ceil|clamp|cos|cosh|cross|degrees|determinant|dot|exp|exp2|floor|fmod|frac|frexp|isfinite|isinf|isnan|ldexp|lerp|lit|log|log2|log10|max|min|modf|mul|noise|pow|radians|round|rsqrt|saturate|sign|sin|sincos|sinh|smoothstep|step|sqrt|tan|tanh|transpose|distance|faceforward|length|normalize|reflect|refract|tex1D|tex1Dproj|tex2D|tex2Dproj|texRECT|texRECTproj|tex3D|tex3Dproj|texCUBE|texCUBEproj|ddx|ddy|debug|pack_2half|unpack_2half|pack_2ushort|unpack_2ushort|pack_4byte|unpack_4byte|pack_4ubyte|unpack_4ubyte)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[.]{1,1}[rgbaxyzw]+(?=[\s/*-+<>])/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._member();continue;}
        if((m = /^[:!%&()+,\-/.*<=>?[\]|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._member = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentarPreprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._outscoped = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*(endif|else|elif)/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._outscopedIntern = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if((m = /^#\s*if/.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._outscopedIntern();continue;}
        if((m = /^#\s*endif/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
