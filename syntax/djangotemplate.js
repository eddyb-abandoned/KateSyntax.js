KateSyntax.langs.djangotemplate.syntax = {
    default: 'djangotemplate_start',
    djangotemplate_start: function djangotemplate_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{%\s*end[a-z]+\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) {if(m = this.djangotemplate_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_inBlock: function djangotemplate_inBlock(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^\{%\s*end[a-z]+\s*%\}/.exec(this.str)) return this.pop();
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) {if(m = this.djangotemplate_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_findTemplate: function djangotemplate_findTemplate(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_templateComment: function djangotemplate_templateComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{%\s*endcomment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    djangotemplate_templateVar: function djangotemplate_templateVar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsFunction')) return this.pop();
            if(this.str[0] == '|' && this.hl('|', 'dsOthers')) {if(m = this.djangotemplate_templateFilter())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
            if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsError')) continue;
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    djangotemplate_templateFilter: function djangotemplate_templateFilter(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsFunction')) return this.pop(), 1;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.djangotemplate_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.djangotemplate_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
            if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsError')) continue;
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    djangotemplate_templateTag: function djangotemplate_templateTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^(?:for|block|if|ifequal|ifnotequal|ifchanged|blocktrans|spaceless|autoescape)\b/.exec(this.str)) {if(m = this.djangotemplate_foundBlockTag())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.djangotemplate_inTemplateTag())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    djangotemplate_foundBlockTag: function djangotemplate_foundBlockTag(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(&name;)/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.djangotemplate_inBlockTag())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    djangotemplate_inBlockTag: function djangotemplate_inBlockTag(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\{%\s*end%1\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop(), 2;
            if(/^\{%\s*end[a-z]+\s*%\}/.exec(this.str)) {if(m = this.djangotemplate_nonMatchingTag())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsFunction')) {if(m = this.djangotemplate_inBlock())return this.pop(), m-1;continue;}
            if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsFunction')) return this.pop(), 1;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.djangotemplate_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.djangotemplate_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
            if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsError')) continue;
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    djangotemplate_nonMatchingTag: function djangotemplate_nonMatchingTag(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:endfor|endblock|endif|endifequal|endifnotequal|endifchanged|endblocktrans|endspaceless|endautoescape)\b/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    djangotemplate_inTemplateTag: function djangotemplate_inTemplateTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.str[1] == '}' && this.hl('%}', 'dsFunction')) return this.pop(), 1;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.djangotemplate_singleAString())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.djangotemplate_singleQString())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsError')) continue;
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsError')) continue;
            if(this.str[0] == '}' && this.str[1] == '}' && this.hl('}}', 'dsError')) continue;
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    djangotemplate_singleAString: function djangotemplate_singleAString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    djangotemplate_singleQString: function djangotemplate_singleQString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    djangotemplate_findHTML: function djangotemplate_findHTML(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_comment())return this.pop(), m-1;continue;}
            if((m = /^<!\[CDATA\[/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) {if(m = this.djangotemplate_cDATA())return this.pop(), m-1;continue;}
            if((m = /^<!DOCTYPE\s+/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctype())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_pI())return this.pop(), m-1;continue;}
            if((m = /^<style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_cSS())return this.pop(), m-1;continue;}
            if((m = /^<script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_jS())return this.pop(), m-1;continue;}
            if((m = /^<pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/pre\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/div\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/table\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<\/&name;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose())return this.pop(), m-1;continue;}
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_findEntityRefs: function djangotemplate_findEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_findPEntityRefs: function djangotemplate_findPEntityRefs(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_findAttributes: function djangotemplate_findAttributes(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.djangotemplate_value())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_findDTDRules: function djangotemplate_findDTDRules(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_comment: function djangotemplate_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^-->/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if((m = /^-(-(?!->))+/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    djangotemplate_cDATA: function djangotemplate_cDATA(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^]]>/.exec(this.str)) && this.hl(m[0], 'dsBaseN;font-weight:bold')) return this.pop();
            if((m = /^]]&gt;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_pI: function djangotemplate_pI(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '?' && this.str[1] == '>' && this.hl('?>', 'dsKeyword')) return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_doctype: function djangotemplate_doctype(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;font-weight:bold')) return this.pop();
            if(this.str[0] == '[' && this.hl('[', 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctypeInternalSubset())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_doctypeInternalSubset: function djangotemplate_doctypeInternalSubset(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == ']' && this.hl(']', 'dsDataType;font-weight:bold')) return this.pop();
            if((m = /^<!(ELEMENT|ENTITY|ATTLIST|NOTATION)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;font-weight:bold')) {if(m = this.djangotemplate_doctypeMarkupdecl())return this.pop(), m-1;continue;}
            if((m = /^<!--/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_comment())return this.pop(), m-1;continue;}
            if((m = /^<\?[\w:-]*/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_pI())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^%&name;;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&%]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_doctypeMarkupdecl: function djangotemplate_doctypeMarkupdecl(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsDataType;font-weight:bold')) return this.pop();
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.djangotemplate_doctypeMarkupdeclDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.djangotemplate_doctypeMarkupdeclSQ())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_doctypeMarkupdeclDQ: function djangotemplate_doctypeMarkupdeclDQ(m) {
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
    djangotemplate_doctypeMarkupdeclSQ: function djangotemplate_doctypeMarkupdeclSQ(m) {
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
    djangotemplate_elOpen: function djangotemplate_elOpen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.djangotemplate_value())return this.pop(), m-1;continue;}
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_elClose: function djangotemplate_elClose(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop();
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_elClose2: function djangotemplate_elClose2(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 2;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_elClose3: function djangotemplate_elClose3(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) return this.pop(), 3;
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_cSS: function djangotemplate_cSS(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.djangotemplate_cSSContent())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.djangotemplate_value())return this.pop(), m-1;continue;}
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_cSSContent: function djangotemplate_cSSContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/style\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose2())return this.pop(), m-1;continue;}
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
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
    djangotemplate_jS: function djangotemplate_jS(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '/' && this.str[1] == '>' && this.hl('/>', 'dsKeyword')) return this.pop();
            if(this.str[0] == '>' && this.hl('>', 'dsKeyword')) {if(m = this.djangotemplate_jSContent())return this.pop(), m-1;continue;}
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^\s+&name;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '=' && this.hl('=', 'dsOthers')) {if(m = this.djangotemplate_value())return this.pop(), m-1;continue;}
            if((m = /^\S/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    djangotemplate_jSContent: function djangotemplate_jSContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose2())return this.pop(), m-1;continue;}
            if((m = /^\/\/(?=.*<\/script\b)/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_jSCommentClose())return this.pop(), m-1;continue;}
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^\/\/BEGIN/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\/\/END/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.javascript_region_marker())return this.pop(), m-1;continue;}
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[\])]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^(?:break|case|catch|const|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;font-style:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
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
    djangotemplate_jSCommentClose: function djangotemplate_jSCommentClose(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^<\/script\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.djangotemplate_elClose3())return this.pop(), m-1;continue;}
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    djangotemplate_value: function djangotemplate_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) {if(m = this.djangotemplate_valueDQ())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) {if(m = this.djangotemplate_valueSQ())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            return this.pop(), m = this.djangotemplate_valueNQ(), m && m-1;
        }
        this.pop();
    },
    djangotemplate_valueNQ: function djangotemplate_valueNQ(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^\/(?!>)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#a00')) continue;
            if((m = /^[^/><"'\s]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#a00')) continue;
            return this.pop(), 1;
        }
        this.pop();
    },
    djangotemplate_valueDQ: function djangotemplate_valueDQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsString;color:#a00')) return this.pop(), 1;
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
            if((m = /^&entref;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^[&<]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            this.hl(this.str[0], 'dsString;color:#a00');
        }
        this.pop();
    },
    djangotemplate_valueSQ: function djangotemplate_valueSQ(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\'' && this.hl('\'', 'dsString;color:#a00')) return this.pop(), 1;
            if((m = /^\{%\s*comment\s*%\}/.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this.djangotemplate_templateComment())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '{' && this.hl('{{', 'dsFunction')) {if(m = this.djangotemplate_templateVar())return this.pop(), m-1;continue;}
            if(this.str[0] == '{' && this.str[1] == '%' && this.hl('{%', 'dsFunction')) {if(m = this.djangotemplate_templateTag())return this.pop(), m-1;continue;}
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
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
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
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
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
            if(this.str[0] == '{' && this.hl('{', 'dsDecVal;font-weight:bold')) {if(m = this.css_media2())return this.pop(), m-1;continue;}
            if((m = /^(?:all|aural|braille|embossed|handheld|print|projection|screen|tty|tv)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) continue;
            if(this.str[0] == ',' && this.hl(',', 'dsDecVal;font-weight:bold')) continue;
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
            if(this.str[0] == '}' && this.hl('}', 'dsDecVal;font-weight:bold')) return this.pop(), 1;
            if((m = /^@media\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) {if(m = this.css_media())return this.pop(), m-1;continue;}
            if((m = /^@import\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.css_import())return this.pop(), m-1;continue;}
            if((m = /^@(font-face|charset)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) {if(m = this.css_ruleSet())return this.pop(), m-1;continue;}
            if(this.str[0] == '[' && this.hl('[', 'dsChar')) {if(m = this.css_selAttr())return this.pop(), m-1;continue;}
            if((m = /^#([a-zA-Z0-9\-_]|[\x80-\xFF]|\\[0-9A-Fa-f]{1,6})*/.exec(this.str)) && this.hl(m[0], 'dsFloat;font-weight:bold')) continue;
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
            if((m = /^(?:all|aural|braille|embossed|handheld|print|projection|screen|tty|tv)\b/.exec(this.str)) && this.hl(m[0], 'dsDecVal;font-weight:bold')) continue;
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
            if((m = /^-?[A-Za-z_-]+(?=\s*:)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;font-style:italic')) {if(m = this.css_rule())return this.pop(), m-1;continue;}
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
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;font-style:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
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
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;font-style:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
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
            if((m = /^(?:class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;font-style:italic')) continue;
            if((m = /^(?:Infinity|NaN|false|null|true|undefined)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\.)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*(?=\s*\()/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsNormal')) {if(m = this.javascript_objectMember())return this.pop(), m-1;continue;}
            if((m = /^[a-zA-Z_$][\w$]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.javascript_noRegExp())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.javascript_string())return this.pop(), m-1;continue;}
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.javascript_stringSQ())return this.pop(), m-1;continue;}
            if((m = /^\/\/(!|(\/(?=[^/]|(?=$|\n))))<?/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_lineComment())return this.pop(), m-1;continue;}
            if((m = /^\/\*(\*[^*/]|!|[*!]<|\*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#0000ff;font-style:italic')) {if(m = this.doxygen_blockComment())return this.pop(), m-1;continue;}
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
