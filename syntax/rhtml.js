KateSyntax.langs.rhtml.syntax = {
    default: 'rhtml_start',
    rhtml_start: function rhtml_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if((m = /^%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysourceline())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.rhtml_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.rhtml_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.rhtml_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_findHTML: function rhtml_findHTML(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if((m = /^%/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysourceline())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.rhtml_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.rhtml_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.rhtml_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_findEntityRefs: function rhtml_findEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_findPEntityRefs: function rhtml_findPEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_findAttributes: function rhtml_findAttributes(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.rhtml_value())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_findDTDRules: function rhtml_findDTDRules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.rhtml_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_comment: function rhtml_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    rhtml_cDATA: function rhtml_cDATA(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^]]>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) return this.pop();
            if((m = /^]]&gt;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_pI: function rhtml_pI(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_doctype: function rhtml_doctype(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsDataType;fontWeight:bold')) {if(m = this.rhtml_doctypeInternalSubset())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_doctypeInternalSubset: function rhtml_doctypeInternalSubset(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsDataType;fontWeight:bold')) return this.pop();
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.rhtml_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_comment())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_pI())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_doctypeMarkupdecl: function rhtml_doctypeMarkupdecl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.rhtml_doctypeMarkupdeclDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.rhtml_doctypeMarkupdeclSQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_doctypeMarkupdeclDQ: function rhtml_doctypeMarkupdeclDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    rhtml_doctypeMarkupdeclSQ: function rhtml_doctypeMarkupdeclSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    rhtml_elOpen: function rhtml_elOpen(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.rhtml_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_elClose: function rhtml_elClose(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_elClose2: function rhtml_elClose2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 2;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_elClose3: function rhtml_elClose3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 3;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_cSS: function rhtml_cSS(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.rhtml_cSSContent())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.rhtml_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_cSSContent: function rhtml_cSSContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if((m = /^<\/style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose2())return this.pop(), m-1;continue;}
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;fontWeight:bold')) continue;
            if((m = /^\.([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^:lang\([\w_-]+\)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsDecVal')) {if(m = this.css_selPseudo())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_jS: function rhtml_jS(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.rhtml_jSContent())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.rhtml_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_jSContent: function rhtml_jSContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if((m = /^<\/script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose2())return this.pop(), m-1;continue;}
            if((m = /^\/\/(?=.*<\/script\b)/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_jSCommentClose())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_jSCommentClose: function rhtml_jSCommentClose(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_elClose3())return this.pop(), m-1;continue;}
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    rhtml_value: function rhtml_value(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.rhtml_valueDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.rhtml_valueSQ())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop(), m = this.rhtml_valueNQ(), m && m-1;
        }
        this.pop();
    },
    rhtml_valueNQ: function rhtml_valueNQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^\/(?!>)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#a00')) continue;
            if((m = /^[^/><"'\s]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#a00')) continue;
            return this.pop(), 1;
        }
        this.pop();
    },
    rhtml_valueDQ: function rhtml_valueDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) return this.pop(), 1;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    rhtml_valueSQ: function rhtml_valueSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<%=?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_rubysource())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) return this.pop(), 1;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    rhtml_rubysourceline: function rhtml_rubysourceline(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.rhtml_lineContinue())return this.pop(), m-1;continue;}
            if((m = /^-?%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\b|\^\s*)(else|elsif|rescue|ensure)(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsChar')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) continue;
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|while|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) continue;
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn|auto_complete_field|auto_complete_result|auto_discovery_link_tag|auto_link|benchmark|button_to|cache|capture|check_box|check_box_tag|collection_select|concat|content_for|content_tag|country_options_for_select|country_select|current_page\?|date_select|datetime_select|debug|define_javascript_functions|distance_of_time_in_words|distance_of_time_in_words_to_now|draggable_element|drop_receiving_element|end_form_tag|error_message_on|error_messages_for|escape_javascript|evaluate_remote_response|excerpt|file_field|file_field_tag|finish_upload_status|form|form_remote_tag|form_tag|form_tag_with_upload_progress|h|hidden_field|hidden_field_tag|highlight|human_size|image_path|image_submit_tag|image_tag|input|javascript_include_tag|javascript_path|javascript_tag|link_image_to|link_to|link_to_function|link_to_if|link_to_image|link_to_remote|link_to_unless|link_to_unless_current|mail_to|markdown|number_to_currency|number_to_human_size|number_to_percentage|number_to_phone|number_with_delimiter|number_with_precision|observe_field|observe_form|option_groups_from_collection_for_select|options_for_select|options_from_collection_for_select|pagination_links|password_field|password_field_tag|periodically_call_remote|pluralize|radio_button|radio_button_tag|register_template_handler|render|render_file|render_template|sanitize|select|select_date|select_datetime|select_day|select_hour|select_minute|select_month|select_second|select_tag|select_time|select_year|simple_format|sortable_element|start_form_tag|strip_links|stylesheet_link_tag|stylesheet_path|submit_tag|submit_to_remote|tag|text_area|text_area_tag|text_field|text_field_tag|text_field_with_auto_complete|textilize|textilize_without_paragraph|time_ago_in_words|time_zone_options_for_select|time_zone_select|truncate|update_element_function|upload_progress_status|upload_progress_text|upload_progress_update_bar_js|upload_status_progress_bar_tag|upload_status_tag|upload_status_text_tag|url_for|visual_effect|word_wrap)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) continue;
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$[\d_*`\!:?'/\\\-\&]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;fontWeight:bold')) continue;
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^=begin/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsChar')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsChar')) continue;
            if((m = /^\s[\?\:\%/]\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsChar')) {if(m = this.rhtml_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:[a-zA-Z_][a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.rhtml_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.rhtml_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_commentLine())return this.pop(), m-1;continue;}
            if((m = /^\s#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_generalComment())return this.pop(), m-1;continue;}
            if((m = /^[\[\]]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsChar')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsChar')) continue;
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[Qqxw]?[^\s>])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_find_gdl_input())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_rubysource: function rhtml_rubysource(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.rhtml_lineContinue())return this.pop(), m-1;continue;}
            if((m = /^-?%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\b|\^\s*)(else|elsif|rescue|ensure)(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsChar')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) continue;
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|while|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) continue;
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn|auto_complete_field|auto_complete_result|auto_discovery_link_tag|auto_link|benchmark|button_to|cache|capture|check_box|check_box_tag|collection_select|concat|content_for|content_tag|country_options_for_select|country_select|current_page\?|date_select|datetime_select|debug|define_javascript_functions|distance_of_time_in_words|distance_of_time_in_words_to_now|draggable_element|drop_receiving_element|end_form_tag|error_message_on|error_messages_for|escape_javascript|evaluate_remote_response|excerpt|file_field|file_field_tag|finish_upload_status|form|form_remote_tag|form_tag|form_tag_with_upload_progress|h|hidden_field|hidden_field_tag|highlight|human_size|image_path|image_submit_tag|image_tag|input|javascript_include_tag|javascript_path|javascript_tag|link_image_to|link_to|link_to_function|link_to_if|link_to_image|link_to_remote|link_to_unless|link_to_unless_current|mail_to|markdown|number_to_currency|number_to_human_size|number_to_percentage|number_to_phone|number_with_delimiter|number_with_precision|observe_field|observe_form|option_groups_from_collection_for_select|options_for_select|options_from_collection_for_select|pagination_links|password_field|password_field_tag|periodically_call_remote|pluralize|radio_button|radio_button_tag|register_template_handler|render|render_file|render_template|sanitize|select|select_date|select_datetime|select_day|select_hour|select_minute|select_month|select_second|select_tag|select_time|select_year|simple_format|sortable_element|start_form_tag|strip_links|stylesheet_link_tag|stylesheet_path|submit_tag|submit_to_remote|tag|text_area|text_area_tag|text_field|text_field_tag|text_field_with_auto_complete|textilize|textilize_without_paragraph|time_ago_in_words|time_zone_options_for_select|time_zone_select|truncate|update_element_function|upload_progress_status|upload_progress_text|upload_progress_update_bar_js|upload_status_progress_bar_tag|upload_status_tag|upload_status_text_tag|url_for|visual_effect|word_wrap)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) continue;
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$[\d_*`\!:?'/\\\-\&]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;fontWeight:bold')) continue;
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^=begin/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsChar')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsChar')) continue;
            if((m = /^\s[\?\:\%/]\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsChar')) {if(m = this.rhtml_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:[a-zA-Z_][a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.rhtml_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.rhtml_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_commentLine())return this.pop(), m-1;continue;}
            if((m = /^\s#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_generalComment())return this.pop(), m-1;continue;}
            if((m = /^[\[\]]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsChar')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsChar')) continue;
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[Qqxw]?[^\s>])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_find_gdl_input())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_lineContinue: function rhtml_lineContinue(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.rhtml_lineContinue())return this.pop(), m-1;continue;}
            if((m = /^-?%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\b|\^\s*)(else|elsif|rescue|ensure)(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsChar')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) continue;
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|while|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) continue;
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn|auto_complete_field|auto_complete_result|auto_discovery_link_tag|auto_link|benchmark|button_to|cache|capture|check_box|check_box_tag|collection_select|concat|content_for|content_tag|country_options_for_select|country_select|current_page\?|date_select|datetime_select|debug|define_javascript_functions|distance_of_time_in_words|distance_of_time_in_words_to_now|draggable_element|drop_receiving_element|end_form_tag|error_message_on|error_messages_for|escape_javascript|evaluate_remote_response|excerpt|file_field|file_field_tag|finish_upload_status|form|form_remote_tag|form_tag|form_tag_with_upload_progress|h|hidden_field|hidden_field_tag|highlight|human_size|image_path|image_submit_tag|image_tag|input|javascript_include_tag|javascript_path|javascript_tag|link_image_to|link_to|link_to_function|link_to_if|link_to_image|link_to_remote|link_to_unless|link_to_unless_current|mail_to|markdown|number_to_currency|number_to_human_size|number_to_percentage|number_to_phone|number_with_delimiter|number_with_precision|observe_field|observe_form|option_groups_from_collection_for_select|options_for_select|options_from_collection_for_select|pagination_links|password_field|password_field_tag|periodically_call_remote|pluralize|radio_button|radio_button_tag|register_template_handler|render|render_file|render_template|sanitize|select|select_date|select_datetime|select_day|select_hour|select_minute|select_month|select_second|select_tag|select_time|select_year|simple_format|sortable_element|start_form_tag|strip_links|stylesheet_link_tag|stylesheet_path|submit_tag|submit_to_remote|tag|text_area|text_area_tag|text_field|text_field_tag|text_field_with_auto_complete|textilize|textilize_without_paragraph|time_ago_in_words|time_zone_options_for_select|time_zone_select|truncate|update_element_function|upload_progress_status|upload_progress_text|upload_progress_update_bar_js|upload_status_progress_bar_tag|upload_status_tag|upload_status_text_tag|url_for|visual_effect|word_wrap)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) continue;
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$[\d_*`\!:?'/\\\-\&]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;fontWeight:bold')) continue;
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^=begin/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsChar')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsChar')) continue;
            if((m = /^\s[\?\:\%/]\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsChar')) {if(m = this.rhtml_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:[a-zA-Z_][a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.rhtml_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.rhtml_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_commentLine())return this.pop(), m-1;continue;}
            if((m = /^\s#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_generalComment())return this.pop(), m-1;continue;}
            if((m = /^[\[\]]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsChar')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsChar')) continue;
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[Qqxw]?[^\s>])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_find_gdl_input())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_quotedString: function rhtml_quotedString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\\"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_apostrophedString: function rhtml_apostrophedString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\\'/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_commandString: function rhtml_commandString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\\`/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_embeddedDocumentation: function rhtml_embeddedDocumentation(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^=end/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    rhtml_regEx1: function rhtml_regEx1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\//.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4A5704')) continue;
            if((m = /^[^\\](?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4A5704')) return this.pop();
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if((m = /^\/[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_subst: function rhtml_subst(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop();
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.rhtml_lineContinue())return this.pop(), m-1;continue;}
            if((m = /^-?%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^__END__(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_dATA())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^#!\/.*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\=|\(|\[|\{)\s*(if|unless|while|until)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(while|until)\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\;\s*(if|unless)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bclass\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bmodule\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bbegin\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfor\b(?!.*\bdo\b)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdef\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bend\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(\b|\^\s*)(else|elsif|rescue|ensure)(\s+|(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\.\.\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '.' && this.str[1] == '.' && this.hl('..', 'dsChar')) continue;
            if((m = /^\.[_a-z][_a-zA-Z0-9]*(\?|\!|\b)/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) continue;
            if((m = /^\s\?(\\M\-)?(\\C\-)?\\?\S/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:BEGIN|END|and|begin|break|case|defined\?|do|else|elsif|end|ensure|for|if|in|include|next|not|or|redo|rescue|retry|return|then|unless|until|when|while|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:attr_reader|attr_writer|attr_accessor)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:private_class_method|private|protected|public_class_method|public)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#0000FF')) continue;
            if((m = /^(?:alias|module|class|def|undef)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:self|super|nil|false|true|caller|__FILE__|__LINE__)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^(?:$stdout|$defout|$stderr|$deferr|$stdin)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^(?:abort|at_exit|autoload|autoload\?|binding|block_given\?|callcc|caller|catch|chomp|chomp!|chop|chop!|eval|exec|exit|exit!|fail|fork|format|getc|gets|global_variables|gsub|gsub!|iterator\?|lambda|load|local_variables|loop|method_missing|open|p|print|printf|proc|putc|puts|raise|rand|readline|readlines|require|scan|select|set_trace_func|sleep|split|sprintf|srand|sub|sub!|syscall|system|test|throw|trace_var|trap|untrace_var|warn|auto_complete_field|auto_complete_result|auto_discovery_link_tag|auto_link|benchmark|button_to|cache|capture|check_box|check_box_tag|collection_select|concat|content_for|content_tag|country_options_for_select|country_select|current_page\?|date_select|datetime_select|debug|define_javascript_functions|distance_of_time_in_words|distance_of_time_in_words_to_now|draggable_element|drop_receiving_element|end_form_tag|error_message_on|error_messages_for|escape_javascript|evaluate_remote_response|excerpt|file_field|file_field_tag|finish_upload_status|form|form_remote_tag|form_tag|form_tag_with_upload_progress|h|hidden_field|hidden_field_tag|highlight|human_size|image_path|image_submit_tag|image_tag|input|javascript_include_tag|javascript_path|javascript_tag|link_image_to|link_to|link_to_function|link_to_if|link_to_image|link_to_remote|link_to_unless|link_to_unless_current|mail_to|markdown|number_to_currency|number_to_human_size|number_to_percentage|number_to_phone|number_with_delimiter|number_with_precision|observe_field|observe_form|option_groups_from_collection_for_select|options_for_select|options_from_collection_for_select|pagination_links|password_field|password_field_tag|periodically_call_remote|pluralize|radio_button|radio_button_tag|register_template_handler|render|render_file|render_template|sanitize|select|select_date|select_datetime|select_day|select_hour|select_minute|select_month|select_second|select_tag|select_time|select_year|simple_format|sortable_element|start_form_tag|strip_links|stylesheet_link_tag|stylesheet_path|submit_tag|submit_to_remote|tag|text_area|text_area_tag|text_field|text_field_tag|text_field_with_auto_complete|textilize|textilize_without_paragraph|time_ago_in_words|time_zone_options_for_select|time_zone_select|truncate|update_element_function|upload_progress_status|upload_progress_text|upload_progress_update_bar_js|upload_status_progress_bar_tag|upload_status_tag|upload_status_text_tag|url_for|visual_effect|word_wrap)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#000080')) continue;
            if((m = /^\$[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$\-[a-zA-z_]\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000')) continue;
            if((m = /^\$[\d_*`\!:?'/\\\-\&]/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#C00000;fontWeight:bold')) continue;
            if((m = /^\b[_A-Z]+[A-Z_0-9]+\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188;fontWeight:bold')) continue;
            if((m = /^\b[A-Z]+_*([0-9]|[a-z])[_a-zA-Z0-9]*\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\b\-?0[xX][_0-9a-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[bB][_01]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?0[1-7][_0-7]*/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\b\-?[0-9][0-9_]*\.[0-9][0-9_]*([eE]\-?[1-9][0-9]*(\.[0-9]*)?)?/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\b\-?[1-9][0-9_]*\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^'(\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})|[^\a\b\e\f\n\r\t\v])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^=begin/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_embeddedDocumentation())return this.pop(), m-1;continue;}
            if((m = /^\s*<<-(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^\s*<<(?=\w+|["'])/.exec(this.str)) && this.hl(m[0], 'dsChar')) {if(m = this.rhtml_find_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsChar')) continue;
            if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsChar')) continue;
            if((m = /^\s[\?\:\%/]\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^[|&<>\^\+*~\-=]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\s!/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\/=\s/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^%=/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsChar')) {if(m = this.rhtml_memberAccess())return this.pop(), m-1;continue;}
            if((m = /^:[a-zA-Z_][a-zA-Z0-9_]*/.exec(this.str)) && this.hl(m[0], 'dsString;color:#D40000')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.rhtml_quotedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_apostrophedString())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#AA3000')) {if(m = this.rhtml_commandString())return this.pop(), m-1;continue;}
            if((m = /^\?#/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.col === 0 && (m = /^#\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.col === 0 && (m = /^#\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_commentLine())return this.pop(), m-1;continue;}
            if((m = /^\s#/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_generalComment())return this.pop(), m-1;continue;}
            if((m = /^[\[\]]+/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsChar')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsChar')) continue;
            if((m = /^@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^@@[a-zA-Z_0-9]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '/' && this.hl('/', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_regEx1())return this.pop(), m-1;continue;}
            if((m = /^\s*[%](?=[Qqxw]?[^\s>])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_find_gdl_input())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_shortSubst: function rhtml_shortSubst(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\w(?!\w)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    rhtml_memberAccess: function rhtml_memberAccess(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\.?[_a-z]\w*(\?|\!)?(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) return this.pop();
            if((m = /^\.?[_a-z]\w*(\?|\!)?/.exec(this.str)) && this.hl(m[0], 'dsNormal;color:#4000A7')) continue;
            if((m = /^[A-Z]+_*(\d|[a-z])\w*(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsDataType')) return this.pop();
            if((m = /^[A-Z]+_*([0-9]|[a-z])\w*/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[_A-Z][_A-Z0-9]*(?=[^\w\d\.\:])/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188')) return this.pop();
            if((m = /^[_A-Z][_A-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsDataType;color:#bb1188')) continue;
            if(this.str[0] == ':' && this.str[1] == ':' && this.hl('::', 'dsChar')) continue;
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
            if((m = /^[=+\-*/%|&[\]{}~]/.exec(this.str)) && this.hl(m[0], 'dsChar')) return this.pop();
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) return this.pop();
            if((m = /^[()\\]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if((m = /^\W/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_commentLine: function rhtml_commentLine(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\w\:\:\s/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.rhtml_rDocLabel())return this.pop(), m-1;continue;}
            if((m = /^(?:TODO|FIXME|NOTE)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^-?%>/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    rhtml_generalComment: function rhtml_generalComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:TODO|FIXME|NOTE)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    rhtml_rDocLabel: function rhtml_rDocLabel(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    rhtml_find_heredoc: function rhtml_find_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(\w+)'/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_apostrophed_normal_heredoc())return this.pop(), m-1;continue;}
            if((m = /^"?(\w+)"?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_normal_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_find_indented_heredoc: function rhtml_find_indented_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^'(\w+)'/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_apostrophed_indented_heredoc())return this.pop(), m-1;continue;}
            if((m = /^"?(\w+)"?/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rhtml_indented_heredoc())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_indented_heredoc: function rhtml_indented_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_apostrophed_indented_heredoc: function rhtml_apostrophed_indented_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_normal_heredoc: function rhtml_normal_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_apostrophed_normal_heredoc: function rhtml_apostrophed_normal_heredoc(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^%1(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return this.pop(), 1;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_heredoc_rules: function rhtml_heredoc_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_find_gdl_input: function rhtml_find_gdl_input(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^w\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_token_array_1())return this.pop(), m-1;continue;}
            if((m = /^w\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_token_array_2())return this.pop(), m-1;continue;}
            if((m = /^w\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_token_array_3())return this.pop(), m-1;continue;}
            if((m = /^w</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_token_array_4())return this.pop(), m-1;continue;}
            if((m = /^w([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_token_array_5())return this.pop(), m-1;continue;}
            if((m = /^q\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_apostrophed_1())return this.pop(), m-1;continue;}
            if((m = /^q\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_apostrophed_2())return this.pop(), m-1;continue;}
            if((m = /^q\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_apostrophed_3())return this.pop(), m-1;continue;}
            if((m = /^q</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_apostrophed_4())return this.pop(), m-1;continue;}
            if((m = /^q([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_apostrophed_5())return this.pop(), m-1;continue;}
            if((m = /^x\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_shell_command_1())return this.pop(), m-1;continue;}
            if((m = /^x\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_shell_command_2())return this.pop(), m-1;continue;}
            if((m = /^x\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_shell_command_3())return this.pop(), m-1;continue;}
            if((m = /^x</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_shell_command_4())return this.pop(), m-1;continue;}
            if((m = /^x([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_shell_command_5())return this.pop(), m-1;continue;}
            if((m = /^r\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_regexpr_1())return this.pop(), m-1;continue;}
            if((m = /^r\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_regexpr_2())return this.pop(), m-1;continue;}
            if((m = /^r\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_regexpr_3())return this.pop(), m-1;continue;}
            if((m = /^r</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_regexpr_4())return this.pop(), m-1;continue;}
            if((m = /^r([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_regexpr_5())return this.pop(), m-1;continue;}
            if((m = /^Q?\(/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_dq_string_1())return this.pop(), m-1;continue;}
            if((m = /^Q?\{/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_dq_string_2())return this.pop(), m-1;continue;}
            if((m = /^Q?\[/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_dq_string_3())return this.pop(), m-1;continue;}
            if((m = /^Q?</.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_dq_string_4())return this.pop(), m-1;continue;}
            if((m = /^Q?([^\s\w])/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_gdl_dq_string_5())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_1: function rhtml_gdl_dq_string_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.rhtml_gdl_dq_string_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_1_nested: function rhtml_gdl_dq_string_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.rhtml_gdl_dq_string_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_2: function rhtml_gdl_dq_string_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.rhtml_gdl_dq_string_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_2_nested: function rhtml_gdl_dq_string_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.rhtml_gdl_dq_string_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_3: function rhtml_gdl_dq_string_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.rhtml_gdl_dq_string_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_3_nested: function rhtml_gdl_dq_string_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.rhtml_gdl_dq_string_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_4: function rhtml_gdl_dq_string_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.rhtml_gdl_dq_string_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_4_nested: function rhtml_gdl_dq_string_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.rhtml_gdl_dq_string_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString')) return this.pop();
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_dq_string_5: function rhtml_gdl_dq_string_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_dq_string_rules: function rhtml_dq_string_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_1: function rhtml_gdl_token_array_1(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.rhtml_gdl_token_array_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_1_nested: function rhtml_gdl_token_array_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString')) {if(m = this.rhtml_gdl_token_array_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_2: function rhtml_gdl_token_array_2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.rhtml_gdl_token_array_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_2_nested: function rhtml_gdl_token_array_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsString')) {if(m = this.rhtml_gdl_token_array_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_3: function rhtml_gdl_token_array_3(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.rhtml_gdl_token_array_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_3_nested: function rhtml_gdl_token_array_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString')) {if(m = this.rhtml_gdl_token_array_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_4: function rhtml_gdl_token_array_4(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.rhtml_gdl_token_array_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_4_nested: function rhtml_gdl_token_array_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString')) {if(m = this.rhtml_gdl_token_array_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_token_array_5: function rhtml_gdl_token_array_5(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_token_array_rules: function rhtml_token_array_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\\/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_1: function rhtml_gdl_apostrophed_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_1_nested: function rhtml_gdl_apostrophed_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_2: function rhtml_gdl_apostrophed_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_2_nested: function rhtml_gdl_apostrophed_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_3: function rhtml_gdl_apostrophed_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_3_nested: function rhtml_gdl_apostrophed_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_4: function rhtml_gdl_apostrophed_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_4_nested: function rhtml_gdl_apostrophed_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#DD4A4A')) {if(m = this.rhtml_gdl_apostrophed_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString;color:#DD4A4A')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_apostrophed_5: function rhtml_gdl_apostrophed_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#DD4A4A')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_apostrophed_rules: function rhtml_apostrophed_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#DD4A4A')) continue;
            this.hl(this.str[0], 'dsString;color:#DD4A4A');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_1: function rhtml_gdl_shell_command_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_1_nested: function rhtml_gdl_shell_command_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_2: function rhtml_gdl_shell_command_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_2_nested: function rhtml_gdl_shell_command_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_3: function rhtml_gdl_shell_command_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_3_nested: function rhtml_gdl_shell_command_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_4: function rhtml_gdl_shell_command_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsString;color:#AA3000')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_4_nested: function rhtml_gdl_shell_command_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsString;color:#AA3000')) {if(m = this.rhtml_gdl_shell_command_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsString;color:#AA3000')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_shell_command_5: function rhtml_gdl_shell_command_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsString;color:#AA3000')) continue;
            if((m = /^\s*%1/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_shell_command_rules: function rhtml_shell_command_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString;color:#AA3000')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString;color:#AA3000');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_1: function rhtml_gdl_regexpr_1(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ')' && this.hl('\\)', 'dsOthers;color:#4A5704')) continue;
            if(this.str[0] == '(' && this.hl('(', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_1_nested())return this.pop(), m-1;continue;}
            if((m = /^\)[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_1_nested: function rhtml_gdl_regexpr_1_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '(' && this.hl('(', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_1_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_2: function rhtml_gdl_regexpr_2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '}' && this.hl('\\}', 'dsOthers;color:#4A5704')) continue;
            if((m = /^\}[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            if(this.str[0] == '{' && this.hl('{', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_2_nested())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_2_nested: function rhtml_gdl_regexpr_2_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_2_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '}' && this.hl('}', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_3: function rhtml_gdl_regexpr_3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == ']' && this.hl('\\]', 'dsOthers;color:#4A5704')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_3_nested())return this.pop(), m-1;continue;}
            if((m = /^\][uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_3_nested: function rhtml_gdl_regexpr_3_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_3_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == ']' && this.hl(']', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_4: function rhtml_gdl_regexpr_4(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '>' && this.hl('\\>', 'dsOthers;color:#4A5704')) continue;
            if(this.str[0] == '<' && this.hl('<', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_4_nested())return this.pop(), m-1;continue;}
            if((m = /^>[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_4_nested: function rhtml_gdl_regexpr_4_nested(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsOthers;color:#4A5704')) {if(m = this.rhtml_gdl_regexpr_4_nested())return this.pop(), m-1;continue;}
            if(this.str[0] == '>' && this.hl('>', 'dsOthers;color:#4A5704')) return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_gdl_regexpr_5: function rhtml_gdl_regexpr_5(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            if((m = /^\\%1/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#4A5704')) continue;
            if((m = /^\s*%1[uiomxn]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_regexpr_rules: function rhtml_regexpr_rules(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsOthers;color:#4A5704')) continue;
            if((m = /^#@{1,2}/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rhtml_shortSubst())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.str[1] == '{' && this.hl('#{', 'dsOthers')) {if(m = this.rhtml_subst())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsOthers;color:#4A5704');
        }
        this.pop();
    },
    rhtml_dATA: function rhtml_dATA(m) {
        this.push();
        while(this.pos < this.len) {
            this.hl(this.str[0], 'dsNormal');
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
    },
    css_base: function css_base(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;fontWeight:bold')) continue;
            if((m = /^\.([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^:lang\([\w_-]+\)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsDecVal')) {if(m = this.css_selPseudo())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_findRuleSets: function css_findRuleSets(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;fontWeight:bold')) continue;
            if((m = /^\.([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^:lang\([\w_-]+\)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsDecVal')) {if(m = this.css_selPseudo())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_findValues: function css_findValues(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_findStrings: function css_findStrings(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_findComments: function css_findComments(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_media: function css_media(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '{' && this.hl('{', 'dsDecVal;fontWeight:bold')) {if(m = this.css_media2())return this.pop(), m-1;continue;}
            if((m = /^(?:all|aural|braille|embossed|handheld|print|projection|screen|tty|tv)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsDecVal;fontWeight:bold')) continue;
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            if((m = /^\S+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_media2: function css_media2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsDecVal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;fontWeight:bold')) continue;
            if((m = /^\.([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^:lang\([\w_-]+\)/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsDecVal')) {if(m = this.css_selPseudo())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_selAttr: function css_selAttr(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsChar')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    css_selPseudo: function css_selPseudo(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:hover|link|visited|active|focus|first-child|last-child|only-child|first-of-type|last-of-type|only-of-type|first-letter|first-line|before|after|selection|root|empty|target|enabled|disabled|checked|indeterminate|nth-child|nth-last-child|nth-of-type|nth-last-of-type|not)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return this.pop();
            return this.pop();
        }
        this.pop();
    },
    css_import: function css_import(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.hl(';', 'dsDecVal')) return this.pop();
            if((m = /^(?:all|aural|braille|embossed|handheld|print|projection|screen|tty|tv)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;fontWeight:bold')) continue;
            if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_comment: function css_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    css_ruleSet: function css_ruleSet(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop();
            if((m = /^(?:azimuth|background|background-attachment|background-color|background-image|background-position|background-repeat|border|border-bottom|border-bottom-color|border-bottom-style|border-bottom-width|border-collapse|border-color|border-left|border-left-color|border-left-style|border-left-width|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-style|border-top-width|border-width|bottom|caption-side|clear|clip|color|content|counter-increment|counter-reset|cue|cue-after|cue-before|cursor|direction|display|elevation|empty-cells|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|height|left|letter-spacing|line-height|list-style|list-style-image|list-style-keyword|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|marker-offset|max-height|max-width|min-height|min-width|orphans|outline|outline-color|outline-style|outline-width|overflow|padding|padding-bottom|padding-left|padding-right|padding-top|page|page-break-after|page-break-before|page-break-inside|pause|pause-after|pause-before|pitch|pitch-range|play-during|position|quotes|richness|right|size|speak|speak-header|speak-numeral|speak-punctuation|speech-rate|stress|table-layout|text-align|text-decoration|text-decoration-color|text-indent|text-shadow|text-transform|top|unicode-bidi|vertical-align|visibility|voice-family|volume|white-space|widows|width|word-spacing|z-index|border-bottom-image|border-bottom-left-image|border-bottom-left-radius|border-bottom-right-image|border-bottom-right-radius|border-corner-image|border-image|border-left-image|border-radius|border-right-image|border-top-image|border-top-left-image|border-top-left-radius|border-top-right-image|border-top-right-radius|box-shadow|box-sizing|opacity|outline-offset|overflow-x|overflow-y|text-overflow|text-shadow|-moz-border-bottom-colors|-moz-border-left-colors|-moz-border-radius|-moz-border-right-colors|-moz-border-top-colors|-moz-box-flex|-o-background-size|-o-text-overflow|-khtml-background-size|konq_bgpos_x|konq_bgpos_y|-webkit-background-size|font-family|font-size|font-stretch|font-style|font-variant|font-weight|unicode-range|units-per-em|src|panose-1|stemv|stemh|slope|cap-height|x-height|ascent|descent|widths|bbox|definition-src|baseline|centerline|mathline|topline)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.css_rule())return this.pop(), m-1;continue;}
            if((m = /^-?[A-Za-z_-]+(?=\s*:)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) {if(m = this.css_rule())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_rule: function css_rule(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsKeyword')) {if(m = this.css_rule2())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_rule2: function css_rule2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ';' && this.hl(';', 'dsKeyword')) return this.pop(), 1;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) return this.pop(), 2;
            if((m = /^(?:inherit|none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|xx-small|x-small|small|medium|large|x-large|xx-large|smaller|larger|italic|oblique|small-caps|normal|bold|bolder|lighter|light|100|200|300|400|500|600|700|800|900|transparent|repeat|repeat-x|repeat-y|no-repeat|baseline|sub|super|top|text-top|middle|bottom|text-bottom|left|right|center|justify|konq-center|disc|circle|square|box|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-alpha|lower-latin|upper-alpha|upper-latin|hebrew|armenian|georgian|cjk-ideographic|hiragana|katakana|hiragana-iroha|katakana-iroha|inline|inline-block|block|list-item|run-in|compact|marker|table|inline-table|table-row-group|table-header-group|table-footer-group|table-row|table-column-group|table-column|table-cell|table-caption|auto|crosshair|default|pointer|move|e-resize|ne-resize|nw-resize|n-resize|se-resize|sw-resize|s-resize|w-resize|text|wait|help|above|absolute|always|avoid|below|bidi-override|blink|both|capitalize|caption|clip|close-quote|collapse|condensed|crop|cross|ellipsis|ellipsis-word|embed|expanded|extra-condensed|extra-expanded|fixed|hand|hide|higher|icon|inside|invert|landscape|level|line-through|loud|lower|lowercase|ltr|menu|message-box|mix|narrower|no-close-quote|no-open-quote|nowrap|open-quote|outside|overline|portrait|pre|pre-line|pre-wrap|relative|rtl|scroll|semi-condensed|semi-expanded|separate|show|small-caption|static|static-position|status-bar|thick|thin|ultra-condensed|ultra-expanded|underline|uppercase|visible|wider|break|serif|sans-serif|cursive|fantasy|monospace|border-box|content-box|-moz-box)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:aqua|black|blue|cyan|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^#([0-9A-Fa-f]{3}){1,4}\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:url|attr|rect|rgb|rgba|hsl|hsla|counter|counters|local|format|expression)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.css_propParen())return this.pop(), m-1;continue;}
            if((m = /^!important\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_propParen: function css_propParen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '(' && this.hl('(', 'dsDataType')) {if(m = this.css_propParen2())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_propParen2: function css_propParen2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ')' && this.hl(')', 'dsDataType')) return this.pop(), 1;
            if((m = /^[-+]?[0-9.]+(em|ex|ch|rem|vw|vh|vm|px|in|cm|mm|pt|pc|deg|rad|grad|turn|ms|s|Hz|kHz)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[-+]?[0-9.]+[%]?/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[\w\-]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.css_stringDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.css_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\*BEGIN.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*END.*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.css_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    css_stringDQ: function css_stringDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if((m = /^\\["']/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    css_stringSQ: function css_stringSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if((m = /^\\["']/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    css_insideString: function css_insideString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\["']/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    javascript_normal: function javascript_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javascript_objectMember: function javascript_objectMember(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) continue;
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if(this.str[0] == '/' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '*') return this.pop();
            if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    javascript_noRegExp: function javascript_noRegExp(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '/') return this.pop();
            if(this.str[0] == '/' && this.str[1] == '*') return this.pop();
            if(this.str[0] == '/' && this.hl('/', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop();
        }
        this.pop();
    },
    javascript_conditionalExpression: function javascript_conditionalExpression(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ':' && this.hl(':', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javascript_object: function javascript_object(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^[a-zA-Z_$][\w$]*\s*(?=:)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsNormal')) return this.pop();
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;fontStyle:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;fontStyle:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
            if((m = /^\/\/\s*@\{\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\/\s*@\}\s*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\{\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^\/\*\s*@\}\s*\*\//.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '/' && this.str[1] == '/' && this.hl('//', 'dsComment')) {if(m = this.javascript_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this.javascript_multiInlineComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.hl('/', 'dsOthers')) {if(m = this['javascript_(regexCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.hl('{', 'dsNormal')) {if(m = this.javascript_object())return this.pop(), m-1;continue;}
            if(this.str[0] == '?' && this.hl('?', 'dsNormal')) {if(m = this.javascript_conditionalExpression())return this.pop(), m-1;continue;}
            if((m = /^[:!%&+,\-/.*<=>?|~\^;]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javascript_string: function javascript_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    javascript_stringSQ: function javascript_stringSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    javascript_comment: function javascript_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    javascript_multiInlineComment: function javascript_multiInlineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    javascript_regularExpression: function javascript_regularExpression(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\w*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop(), 1;
            if((m = /^\{[\d, ]+\}/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\\[bB]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\\[nrtvfDdSsWw]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if(this.str[0] == '[' && this.hl('[', 'dsBaseN')) {if(m = this['javascript_(charclassCaretFirstCheck)']())return this.pop(), m-1;continue;}
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\$(?=\/)/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^[?+*()|]/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    javascript_regularExpressionCharacterClass: function javascript_regularExpressionCharacterClass(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[\[\]]/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if(this.str[0] == ']' && this.hl(']', 'dsBaseN')) return this.pop(), 1;
            this.hl(this.str[0], 'dsBaseN');
        }
        this.pop();
    },
    'javascript_(regexCaretFirstCheck)': function javascript_regexCaretFirstCheck(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {if(m = this.javascript_regularExpression())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            return this.pop(), m = this.javascript_regularExpression(), m && m-1;
        }
        this.pop();
    },
    'javascript_(charclassCaretFirstCheck)': function javascript_charclassCaretFirstCheck(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '^' && this.hl('^', 'dsFloat')) {if(m = this.javascript_regularExpressionCharacterClass())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            return this.pop(), m = this.javascript_regularExpressionCharacterClass(), m && m-1;
        }
        this.pop();
    },
    javascript_region_marker: function javascript_region_marker(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsRegionMarker');
        }
        this.pop();
    }
};
