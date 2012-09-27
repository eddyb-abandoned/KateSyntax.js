KateSyntax.langs.json.syntax = {
    default: 'json_normal',
    json_normal: function json_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#EF0000;font-weight:bold')) {if(m = this.json_pair())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal;color:#0000AF;font-weight:bold')) {if(m = this.json_array())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    json_pair: function json_pair(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) {if(m = this.json_string_Key())return this.pop(), m-1;continue;}
            if(this.str[0] == ':' && this.hl(':', 'dsNormal;color:#EF0000;font-weight:bold')) {if(m = this.json_value())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsNormal;color:#EF0000;font-weight:bold')) return this.pop();
            if(this.str[0] == ',' && this.hl(',', 'dsNormal;color:#EF0000;font-weight:bold')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    json_string_Key: function json_string_Key(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsDataType')) return this.pop();
            if((m = /^\\(?:["\\/bfnrt]|u[0-9a-fA-f]{4})/.exec(this.str)) && this.hl(m[0], 'dsDataType;text-decoration:underline')) continue;
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    json_value: function json_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#FF00FF')) {if(m = this.json_string_Value())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#EF0000;font-weight:bold')) {if(m = this.json_pair())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal;color:#0000AF;font-weight:bold')) {if(m = this.json_array())return this.pop(), m-1;continue;}
            if(this.str[0] == '}') return this.pop();
            if(this.str[0] == ',') return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:null|true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) continue;
            if((m = /^-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^-?(?:[0-9]|[1-9][0-9]+)(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    json_string_Value: function json_string_Value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#FF00FF')) return this.pop();
            if((m = /^\\(?:["\\/bfnrt]|u[0-9a-fA-f]{4})/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF00FF;text-decoration:underline')) continue;
            this.hl(this.str[0], 'dsString;color:#FF00FF');
        }
        this.pop();
    },
    json_array: function json_array(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ',' && this.hl(',', 'dsNormal;color:#0000AF;font-weight:bold')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsNormal;color:#0000AF;font-weight:bold')) return this.pop();
            if(this.str[0] == '{' && this.hl('{', 'dsNormal;color:#EF0000;font-weight:bold')) {if(m = this.json_pair())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsNormal;color:#0000AF;font-weight:bold')) {if(m = this.json_array())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#FF00FF')) {if(m = this.json_string_Value())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:null|true|false)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) continue;
            if((m = /^-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^-?(?:[0-9]|[1-9][0-9]+)(?:[eE][+-]?[0-9]+)?/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    }
};
