KateSyntax.langs.rib.syntax = {
    default: 'rib_normal',
    rib_normal: function rib_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:AreaLightSource|Attribute|AttributeBegin|AttributeEnd|Begin|Bound|Clipping|Color|ColorSamples|ConcatTransform|CoordinateSystem|CropWindow|Declare|DepthOfField|Detail|DetailRange|Displacement|Display|End|Exterior|Format|FrameAspectRatio|FrameBegin|FrameEnd|GeometricApproximation|Hider|Identity|Illuminance|Illuminate|Interior|LightSource|Matte|Opacity|Option|Orientation|Perspective|PixelFilter|PixelSamples|PixelVariance|Projection|Quantize|RelativeDetail|Rotate|Scale|ScreenWindow|ShadingInterpolation|ShadingRate|Shutter|Sides|Skew|Surface|TextureCoordinates|Transform|TransformBegin|TransformEnd|TransformPoints|Translate|version|WorldBegin|WorldEnd)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Basis|Cylinder|Disk|GeneralPolygon|Geometry|Hyperboloid|NuPatch|ObjectBegin|ObjectEnd|ObjectInstance|Patch|Paraboloid|PointsPolygons|PointsGeneralPolygons|Polygon|Procedural|SolidBegin|SolidEnd|Sphere|Torus)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:MotionBegin|MotionEnd)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:MakeBump|MakeCubeFaceEnvironment|MakeLatLongEnvironment|MakeTexture|ArchiveRecord|ErrorHandler)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.rib_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.rib_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rib_string: function rib_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rib_comment: function rib_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
