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
        if((m = /^(?:AreaLightSource|Attribute|AttributeBegin|AttributeEnd|Begin|Bound|Clipping|Color|ColorSamples|ConcatTransform|CoordinateSystem|CropWindow|Declare|DepthOfField|Detail|DetailRange|Displacement|Display|End|Exterior|Format|FrameAspectRatio|FrameBegin|FrameEnd|GeometricApproximation|Hider|Identity|Illuminance|Illuminate|Interior|LightSource|Matte|Opacity|Option|Orientation|Perspective|PixelFilter|PixelSamples|PixelVariance|Projection|Quantize|RelativeDetail|Rotate|Scale|ScreenWindow|ShadingInterpolation|ShadingRate|Shutter|Sides|Skew|Surface|TextureCoordinates|Transform|TransformBegin|TransformEnd|TransformPoints|Translate|version|WorldBegin|WorldEnd)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:Basis|Cylinder|Disk|GeneralPolygon|Geometry|Hyperboloid|NuPatch|ObjectBegin|ObjectEnd|ObjectInstance|Patch|Paraboloid|PointsPolygons|PointsGeneralPolygons|Polygon|Procedural|SolidBegin|SolidEnd|Sphere|Torus)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:MotionBegin|MotionEnd)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:MakeBump|MakeCubeFaceEnvironment|MakeLatLongEnvironment|MakeTexture|ArchiveRecord|ErrorHandler)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
