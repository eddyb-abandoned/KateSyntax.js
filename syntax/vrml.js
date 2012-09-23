KateSyntax.langs.vrml.syntax = {
    default: 'vrml_normal',
    vrml_normal: function vrml_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:DEF|EXTERNPROTO|FALSE|IS|NULL|PROTO|ROUTE|TO|TRUE|USE|eventIn|eventOut|exposedField|field)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:Anchor|AudioClip|Appearance|Background|Billboard|Box|Collision|Color|ColorInterpolator|Cone|Coordinate|CoordinateInterpolator|Cylinder|CylinderSensor|DirectionalLight|ElevationGrid|Extrusion|Fog|FontStyle|Group|ImageTexture|IndexedFaceSet|IndexedLineSet|Inline|LOD|Material|MovieTexture|NavigationInfo|Normal|NormalInterpolator|OrientationInterpolator|PixelTexture|Plane|PlaneSensor|PointLight|PointSet|PositionInterpolator|ProximitySensor|ScalarInterpolator|Script|Shape|Sensor|Sound|Sphere|SphereSensor|SpotLight|Switch|Text|TextureCoordinate|TextureTransform|TimeSensor|TouchSensor|Transform|Viewpoint|VisibilitySensor|WorldInfo)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^(?:MFColor|MFFloat|MFInt32|MFNode|MFRotation|MFString|MFTime|MFVec2f|MFVec3f|SFBool|SFColor|SFFloat|SFImage|SFInt32|SFNode|SFRotation|SFString|SFTime|SFVec2f|SFVec3f)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.vrml_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.vrml_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    vrml_comment: function vrml_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    vrml_string: function vrml_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    }
};
