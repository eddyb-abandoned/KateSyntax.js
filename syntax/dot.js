KateSyntax.langs.dot.syntax = {
    default: 'dot_normal',
    dot_normal: function dot_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dot_string())return this.pop(), m-1;continue;}
            if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.dot_commentSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.dot_commentML())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {if(m = this.dot_regionCurly())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.dot_regionSquare())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.dot_regionParen())return this.pop(), m-1;continue;}
            if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dot_detectAll: function dot_detectAll(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dot_string())return this.pop(), m-1;continue;}
            if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.dot_commentSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.dot_commentML())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {if(m = this.dot_regionCurly())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.dot_regionSquare())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.dot_regionParen())return this.pop(), m-1;continue;}
            if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dot_detectComments: function dot_detectComments(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.dot_commentSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.dot_commentML())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    dot_regionCurly: function dot_regionCurly(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop();
            if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dot_string())return this.pop(), m-1;continue;}
            if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.dot_commentSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.dot_commentML())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {if(m = this.dot_regionCurly())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.dot_regionSquare())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.dot_regionParen())return this.pop(), m-1;continue;}
            if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    dot_regionSquare: function dot_regionSquare(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop();
            if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dot_string())return this.pop(), m-1;continue;}
            if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.dot_commentSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.dot_commentML())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {if(m = this.dot_regionCurly())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.dot_regionSquare())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.dot_regionParen())return this.pop(), m-1;continue;}
            if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    dot_regionParen: function dot_regionParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop();
            if((m = /^(?:digraph|node|edge|subgraph)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:center|layers|margin|mclimit|name|nodesep|nslimit|ordering|page|pagedir|rank|rankdir|ranksep|ratio|rotate|size|distortion|fillcolor|fontcolor|fontname|fontsize|height|layer|orientation|peripheries|regular|shape|shapefile|sides|skew|width|arrowhead|arrowsize|arrowtail|constraint|decorateP|dir|headclip|headlabel|labelangle|labeldistance|labelfontcolor|labelfontname|labelfontsize|minlen|port_label_distance|samehead|sametail|tailclip|taillabel|weight|color|bgcolor|label|URL|fontcolor|fontname|fontsize|layer|style)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.dot_string())return this.pop(), m-1;continue;}
            if((m = /^[;=]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '-' && this.str[1] == '>' && this.hl('->', 'dsOthers')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\b\w+\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.dot_commentSL())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.dot_commentML())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsOthers')) {if(m = this.dot_regionCurly())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsOthers')) {if(m = this.dot_regionSquare())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsOthers')) {if(m = this.dot_regionParen())return this.pop(), m-1;continue;}
            if((m = /^[)\]}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    dot_string: function dot_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsChar')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    dot_commentSL: function dot_commentSL(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    dot_commentML: function dot_commentML(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    alert_normalText: function alert_normalText(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    }
};
