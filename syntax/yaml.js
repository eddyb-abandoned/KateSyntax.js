KateSyntax.langs.yaml.syntax = {
    default: 'yaml_normal',
    yaml_normal: function yaml_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^---/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.yaml_header())return this.pop(), m-1;continue;}
            if((m = /^\.\.\.(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.yaml_eOD())return this.pop(), m-1;continue;}
            if((m = /^%/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.yaml_directive())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.hl('-', 'dsKeyword')) {if(m = this.yaml_dash())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {if(m = this.yaml_list())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.yaml_hash())return this.pop(), m-1;continue;}
            if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\??\s*[^"'#-][^:#]*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePre())return this.pop(), m-1;continue;}
            if((m = /^\??\s*"[^"#]+"\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePre())return this.pop(), m-1;continue;}
            if((m = /^\??\s*'[^'#]+'\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePre())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {if(m = this.yaml_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.yaml_stringx())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_dash: function yaml_dash(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if((m = /^null(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(/^./.exec(this.str)) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_header: function yaml_header(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    yaml_eOD: function yaml_eOD(m) {
        this.push();
        while(this.pos < this.len) {
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    yaml_directive: function yaml_directive(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    yaml_attribute: function yaml_attribute(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributeInline: function yaml_attributeInline(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '}') return this.pop(), 1;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributePre: function yaml_attributePre(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if((m = /^null(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {if(m = this.yaml_list())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.yaml_hash())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {if(m = this.yaml_attributeString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.yaml_attributeStringx())return this.pop(), m-1;continue;}
            if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.yaml_attribute())return this.pop(), m-1;continue;}
            if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.yaml_attribute())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.yaml_attribute())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributePreInline: function yaml_attributePreInline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if((m = /^null/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {if(m = this.yaml_list())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.yaml_hash())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {if(m = this.yaml_attributeStringInline())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.yaml_attributeStringxInline())return this.pop(), m-1;continue;}
            if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.yaml_attributeInline())return this.pop(), m-1;continue;}
            if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.yaml_attributeInline())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) return this.pop();
            if(this.str[0] == '}') return this.pop();
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.yaml_attributeInline())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_list: function yaml_list(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsKeyword')) return this.pop();
            if((m = /^\??\s*[^"'#-][^:#]*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePre())return this.pop(), m-1;continue;}
            if((m = /^\??\s*"[^"#]+"\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePre())return this.pop(), m-1;continue;}
            if((m = /^\??\s*'[^'#]+'\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePre())return this.pop(), m-1;continue;}
            if((m = /^null/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^!!\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsKeyword')) {if(m = this.yaml_list())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.yaml_hash())return this.pop(), m-1;continue;}
            if((m = /^&\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\*\S+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {if(m = this.yaml_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.yaml_stringx())return this.pop(), m-1;continue;}
            if(this.str[0] == ',' && this.hl(',', 'dsKeyword')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_hash: function yaml_hash(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.yaml_comment())return this.pop(), m-1;continue;}
            if((m = /^\??\s*[^"'#-][^:#]*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePreInline())return this.pop(), m-1;continue;}
            if((m = /^\??\s*"[^"#]+"\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePreInline())return this.pop(), m-1;continue;}
            if((m = /^\??\s*'[^'#]+'\s*:/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.yaml_attributePreInline())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributeString: function yaml_attributeString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {if(m = this.yaml_attributeEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributeStringx: function yaml_attributeStringx(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.yaml_attributeEnd())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributeStringInline: function yaml_attributeStringInline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) {if(m = this.yaml_attributeEndInline())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributeStringxInline: function yaml_attributeStringxInline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) {if(m = this.yaml_attributeEndInline())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_attributeEnd: function yaml_attributeEnd(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop(), 2;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    yaml_attributeEndInline: function yaml_attributeEndInline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\s*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '}') return this.pop(), 2;
            if((m = /^,\s/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 2;
            if(this.str[0] == '\n') return this.pop(), 2;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    yaml_string: function yaml_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_stringx: function yaml_stringx(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    yaml_comment: function yaml_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
