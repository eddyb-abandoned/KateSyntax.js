KateSyntax.langs.javadoc.syntax = {
    default: 'javadoc_start',
    javadoc_start: function javadoc_start(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\*\*\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocFSar())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javadoc_findJavadoc: function javadoc_findJavadoc(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\/\*\*\//.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\/\*\*/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocFSar())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    javadoc_javadocFSar: function javadoc_javadocFSar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) return this.pop();
            if((m = /^(!|\?)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^(\.\s*(?=$|\n))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^(\.\s)(?![\da-z])/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^\**\s*(?=@(author|deprecated|exception|param|return|see|serial|serialData|serialField|since|throws|version)(\s|(?=$|\n)))/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocar())return this.pop(), m-1;continue;}
            if((m = /^\{@code /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@code    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@docRoot\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\{@inheritDoc\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\{@link /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@link    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\{@value /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
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
            this.hl(this.str[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold');
        }
        this.pop();
    },
    javadoc_javadocar: function javadoc_javadocar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) return this.pop(), 1;
            if((m = /^\*+(?!\/)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@author /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@deprecated /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@exception /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@param /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@return /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@see /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_seeTag())return this.pop(), m-1;continue;}
            if((m = /^@serial /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@serialData /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@serialField /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@since /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@throws /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@version /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@author    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@deprecated    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@exception    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@param    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@return    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@see    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_seeTag())return this.pop(), m-1;continue;}
            if((m = /^@serial    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@serialData    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@serialField    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@since    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^@throws    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) {if(m = this.javadoc_javadocParam())return this.pop(), m-1;continue;}
            if((m = /^@version    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:bold')) continue;
            if((m = /^\{@code /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@code    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@docRoot\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\{@inheritDoc\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\{@link /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@link    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@linkplain    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@literal    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_literalTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value\}/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) continue;
            if((m = /^\{@value /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
            if((m = /^\{@value    /.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) {if(m = this.javadoc_inlineTagar())return this.pop(), m-1;continue;}
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
            this.hl(this.str[0], 'dsComment;color:#008000');
        }
        this.pop();
    },
    javadoc_javadocParam: function javadoc_javadocParam(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#008000')) continue;
            if((m = /^\S*(?=\*\/)/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:italic;fontWeight:normal')) return this.pop(), 1;
            if((m = /^\S*(\s|(?=$|\n))/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsKeyword;color:#008080;fontStyle:italic;fontWeight:normal')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment;color:#008000');
        }
        this.pop();
    },
    javadoc_inlineTagar: function javadoc_inlineTagar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) return this.pop(), 2;
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
            this.hl(this.str[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    javadoc_literalTagar: function javadoc_literalTagar(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) return this.pop(), 2;
            this.hl(this.str[0], 'dsKeyword;color:#808080;fontStyle:normal;fontWeight:normal');
        }
        this.pop();
    },
    javadoc_seeTag: function javadoc_seeTag(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment;color:#008000;fontStyle:normal;fontWeight:bold')) return this.pop(), 2;
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
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsKeyword;color:#008080;fontStyle:italic;fontWeight:normal');
        }
        this.pop();
    },
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
    }
};
