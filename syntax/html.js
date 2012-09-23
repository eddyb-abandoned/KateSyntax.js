KateSyntax.langs.html.syntax = {
    default: 'html_start',
    html_start: function html_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.html_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.html_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_findHTML: function html_findHTML(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;fontWeight:bold')) {if(m = this.html_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.html_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ul\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/ol\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/dl\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_findEntityRefs: function html_findEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_findPEntityRefs: function html_findPEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_findAttributes: function html_findAttributes(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.html_value())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_findDTDRules: function html_findDTDRules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_comment: function html_comment(m) {
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
    html_cDATA: function html_cDATA(m) {
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
    html_pI: function html_pI(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_doctype: function html_doctype(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsDataType;fontWeight:bold')) {if(m = this.html_doctypeInternalSubset())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_doctypeInternalSubset: function html_doctypeInternalSubset(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsDataType;fontWeight:bold')) return this.pop();
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) {if(m = this.html_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_comment())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_pI())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_doctypeMarkupdecl: function html_doctypeMarkupdecl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;fontWeight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.html_doctypeMarkupdeclDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.html_doctypeMarkupdeclSQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_doctypeMarkupdeclDQ: function html_doctypeMarkupdeclDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    html_doctypeMarkupdeclSQ: function html_doctypeMarkupdeclSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) return this.pop();
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    html_elOpen: function html_elOpen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.html_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_elClose: function html_elClose(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_elClose2: function html_elClose2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 2;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_elClose3: function html_elClose3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 3;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_cSS: function html_cSS(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.html_cSSContent())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.html_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_cSSContent: function html_cSSContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose2())return this.pop(), m-1;continue;}
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
    html_jS: function html_jS(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.html_jSContent())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.html_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    html_jSContent: function html_jSContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose2())return this.pop(), m-1;continue;}
            if((m = /^\/\/(?=.*<\/script\b)/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.html_jSCommentClose())return this.pop(), m-1;continue;}
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
    html_jSCommentClose: function html_jSCommentClose(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.html_elClose3())return this.pop(), m-1;continue;}
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    html_value: function html_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.html_valueDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.html_valueSQ())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop(), m = this.html_valueNQ(), m && m-1;
        }
        this.pop();
    },
    html_valueNQ: function html_valueNQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^\/(?!>)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#a00')) continue;
            if((m = /^[^/><"'\s]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#a00')) continue;
            return this.pop(), 1;
        }
        this.pop();
    },
    html_valueDQ: function html_valueDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) return this.pop(), 1;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    html_valueSQ: function html_valueSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) return this.pop(), 1;
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
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
