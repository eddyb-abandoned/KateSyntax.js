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
        if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSL();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentML();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._regionCurly();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._regionSquare();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._regionParen();continue;}
        if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectAll = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSL();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentML();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._regionCurly();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._regionSquare();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._regionParen();continue;}
        if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._detectComments = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSL();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentML();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._regionCurly = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return;
        if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSL();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentML();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._regionCurly();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._regionSquare();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._regionParen();continue;}
        if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._regionSquare = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return;
        if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSL();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentML();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._regionCurly();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._regionSquare();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._regionParen();continue;}
        if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._regionParen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return;
        if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {this._commentSL();continue;}
        if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {this._commentML();continue;}
        if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {this._regionCurly();continue;}
        if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {this._regionSquare();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {this._regionParen();continue;}
        if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\\\' && this.str[1] == '\\\' && this.hl('\\\\\\', 'dsChar')) continue;
        if(this.str[0] == '\\\' && this.str[1] == '"' && this.hl('\\\"', 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._commentSL = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._commentML = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
