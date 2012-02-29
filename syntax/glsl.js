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
        if((m = /^(?:break|continue|do|for|while|if|else|true|false|discard|return|struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:float|int|void|bool|mat2|mat3|mat4|vec2|vec3|vec4|ivec2|ivec3|ivec4|bvec2|bvec3|bvec4|sampler1D|sampler2D|sampler3D|samplerCube|sampler1DShadow|sampler2DShadow)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:attribute|const|uniform|varying|in|out|inout)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:radians|degrees|sin|cos|tan|asin|acos|atan|pow|exp|log|exp2|log2|sqrt|inversesqrt|abs|sign|floor|ceil|fract|mod|min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|normalize|ftransform|faceforward|reflect|refract|matrixCompMult|lessThan|lessThenEqual|greaterThan|greaterThanEqual|equal|notEqual|any|all|not|texture1D|texture1DProj|texture1DLod|texture1DProjLod|texture2D|texture2DProj|texture2DLod|texture2DProjLod|texture3D|texture3DProj|texture3DLod|texture3DProjLod|textureCube|textureCubeLod|shadow1D|shadow2D|shadow1DProj|shadow2DProj|shadow1DLod|shadow2DLod|shadow1DProjLod|shadow2DProjLod|dFdx|dFdy|fwidth|noise1|noise2|noise3|noise4)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:gl_Position|gl_PointSize|gl_ClipVertex|gl_FragCoord|gl_FragFacing|gl_FragColor|gl_FragData|gl_FragDepth|gl_Color|gl_SecondaryColor|gl_Normal|gl_Vertex|gl_MultiTexCoord0|gl_MultiTexCoord1|gl_MultiTexCoord2|gl_MultiTexCoord2|gl_MultiTexCoord3|gl_MultiTexCoord4|gl_MultiTexCoord5|gl_MultiTexCoord6|gl_MultiTexCoord7|gl_FogColor|gl_MaxLights|gl_MaxClipPlanes|gl_MaxTextureUnits|gl_MaxTextureCoords|gl_MaxVertexAttributes|gl_MaxVertexUniformComponents|gl_MaxVaryingFloats|gl_MaxVertexTextureImageUnits|gl_MaxCombinedTextureImageUnits|gl_MaxTextureImageUnits|gl_MaxFragmentUniformComponents|gl_MaxDrawBuffers|gl_ModelViewMatrix|gl_ProjectionMatrix|gl_ModelViewProjectionMatrix|gl_TextureMatrix|gl_NormalMatrix|gl_ModelViewMatrixInverse|gl_ProjectionMatrixInverse|gl_ModelViewProjectionMatrixInverse|gl_TextureMatrixInverse|gl_ModelViewMatrixTranspose|gl_ProjectionMatrixTranspose|gl_ModelViewProjectionMatrixTranspose|gl_TextureMatrixTranspose|gl_ModelViewMatrixInverseTranspose|gl_ProjectionMatrixInverseTranspose|gl_ModelViewProjectionMatrixInverseTranspose|gl_TextureMatrixInverseTranspose|gl_NormScale|gl_DepthRangeParameters|gl_DepthRange|gl_ClipPlane|gl_PointParameters|gl_Point|gl_MaterialParameters|gl_FrontMaterial|gl_BackMaterial|gl_LightSourceParameters|gl_LightSource|gl_LightModelParameters|gl_LightModel|gl_LightModelProducts|gl_FrontLightModelProduct|gl_BackLightModelProduct|gl_LightProducts|gl_FrontLightProduct|gl_BackLightProduct|gl_TextureEnvColor|gl_EyePlaneS|gl_EyePlaneT|gl_EyePlaneR|gl_EyePlaneQ|gl_ObjectPlaneS|gl_ObjectPlaneT|gl_ObjectPlaneR|gl_ObjectPlaneQ|gl_FogParameters|gl_Fog|gl_FrontColor|gl_BackColor|gl_FrontSecondaryColor|gl_BackSecondaryColor|gl_TexCoord|gl_FogFragCoord|gl_Color|gl_SecondaryColor)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsOthers')) {this._preprocessor();continue;}
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*[(])/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^[.]{1,1}/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._member();continue;}
        if((m = /^[.+\-/*%<>[\]()\^|&~=!:;,?;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._member = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\b[_\w][_\w\d]*(?=[\s]*)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        if((m = /^(?:FIXME|TODO|BUG)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
