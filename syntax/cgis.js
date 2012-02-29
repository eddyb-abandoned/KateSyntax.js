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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^PROGRAM/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^INTERFACE/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._interface();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._interface = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^CONTROL/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._control();continue;}
        if((m = /^CODE/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._code();continue;}
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^(?:1D|2D|break|continue|do|else|extern|for|forall|foreach|function|if|in|inout|internal|out|reduction|return|struct|typedef|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bool|bool2|bool3|bool4|int|int2|int3|int4|half|half2|half3|half4|float|float2|float3|float4)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._code = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^CONTROL/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._control();continue;}
        if((m = /^#HINT/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._hint();continue;}
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^(?:1D|2D|break|continue|do|else|extern|for|forall|foreach|function|if|in|inout|internal|out|reduction|return|struct|typedef|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bool|bool2|bool3|bool4|int|int2|int3|int4|half|half2|half3|half4|float|float2|float3|float4)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._control = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^CODE/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._code();continue;}
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^(?:1D|2D|break|continue|do|else|extern|for|forall|foreach|function|if|in|inout|internal|out|reduction|return|struct|typedef|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bool|bool2|bool3|bool4|int|int2|int3|int4|half|half2|half3|half4|float|float2|float3|float4)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._common = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._regionMarker();continue;}
        if((m = /^(?:1D|2D|break|continue|do|else|extern|for|forall|foreach|function|if|in|inout|internal|out|reduction|return|struct|typedef|while)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:bool|bool2|bool3|bool4|int|int2|int3|int4|half|half2|half3|half4|float|float2|float3|float4)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == '//' && this.hl('//', 'dsComment')) {this._commentar1();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._commentar2();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._hint = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        if(this.str[0] == ')' && this.hl(')', 'undefined')) return;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'undefined')) continue;
        this.hl(this.str[0], 'undefined');
    }
};
HL.prototype._regionMarker = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsRegionMarker')) return;
        this.hl(this.str[0], 'dsRegionMarker');
    }
};
HL.prototype._commentar1 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentar2 = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
