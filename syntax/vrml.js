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
        if((m = /^(?:DEF|EXTERNPROTO|FALSE|IS|NULL|PROTO|ROUTE|TO|TRUE|USE|eventIn|eventOut|exposedField|field)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Anchor|AudioClip|Appearance|Background|Billboard|Box|Collision|Color|ColorInterpolator|Cone|Coordinate|CoordinateInterpolator|Cylinder|CylinderSensor|DirectionalLight|ElevationGrid|Extrusion|Fog|FontStyle|Group|ImageTexture|IndexedFaceSet|IndexedLineSet|Inline|LOD|Material|MovieTexture|NavigationInfo|Normal|NormalInterpolator|OrientationInterpolator|PixelTexture|Plane|PlaneSensor|PointLight|PointSet|PositionInterpolator|ProximitySensor|ScalarInterpolator|Script|Shape|Sensor|Sound|Sphere|SphereSensor|SpotLight|Switch|Text|TextureCoordinate|TextureTransform|TimeSensor|TouchSensor|Transform|Viewpoint|VisibilitySensor|WorldInfo)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:MFColor|MFFloat|MFInt32|MFNode|MFRotation|MFString|MFTime|MFVec2f|MFVec3f|SFBool|SFColor|SFFloat|SFImage|SFInt32|SFNode|SFRotation|SFString|SFTime|SFVec2f|SFVec3f)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
