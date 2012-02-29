var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._packageSection();
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
HL.prototype._packageSection = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^((Icon)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_value();continue;}
        if((m = /^((ExclusiveOs|ExcludeOs)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_os();continue;}
        if((m = /^((BuildArch|BuildArchitectures|ExclusiveArch|ExcludeArch)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_arch();continue;}
        if((m = /^((Conflicts|Obsoletes|Provides|Requires|Requires\(.*\)|Enhances|Suggests|BuildConflicts|BuildRequires|Recommends|PreReq)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_package();continue;}
        if((m = /^((Epoch|Serial|Nosource|Nopatch)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_integer();continue;}
        if((m = /^((AutoReq|AutoProv|AutoReqProv)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_switch();continue;}
        if((m = /^((Copyright|License|Summary|Summary\(.*\)|Distribution|Vendor|Packager|Group|Source\d*|Patch\d*|BuildRoot|Prefix)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_string();continue;}
        if((m = /^((Name|Version|Release|Url|URL)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._tag_line_string_only_one_word();continue;}
        if(/^[%$]/.exec(this.str)) {this._macroEntryInPackageSection();continue;}
        if(/^[ \t]*#/.exec(this.str)) {this._comment();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._macroEntryInPackageSection = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._packageSectionStartLine = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._commandSection = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '\' && this.hl('\', 'dsKeyword')) continue;
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(/^[ \t]*#/.exec(this.str)) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._changelogSection = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*' && this.hl('*', 'dsDataType')) {this._changelog_weekday();continue;}
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(/^[ \t]*#/.exec(this.str)) {this._comment();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._descriptionSectionStartLine = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._descriptionSection = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(/^[ \t]*#/.exec(this.str)) {this._comment();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[ \t]+(?=#)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if((m = /^# norootforbuild/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._every_non_whitespace_is_warning();continue;}
        if((m = /^#[ \t]*norootforbuild/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsComment')) continue;
        if(this.str[0] == '%' && this.hl('%', 'dsError')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._every_non_whitespace_is_error = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\s]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._every_non_whitespace_is_warning = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\s]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._tag_line_value = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._tag_line_string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[^%]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\(?=(\%))/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._tag_line_string_only_one_word = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[^%]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\(?=(\%))/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(/^[%$]/.exec(this.str)) {this._tag_line_string();continue;}
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._every_non_whitespace_is_error();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._tag_line_integer = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {this._every_non_whitespace_is_error();continue;}
        if(/^[%$]/.exec(this.str)) {this._tag_line_integer_without_syntax_check();continue;}
        if(/^./.exec(this.str)) {this._every_non_whitespace_is_error();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._tag_line_os = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&os;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[%$]/.exec(this.str)) {this._tag_line_value();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._tag_line_integer_without_syntax_check = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDecVal');
    }
};
HL.prototype._tag_line_arch = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&arch;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[%$]/.exec(this.str)) {this._tag_line_value();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._tag_line_package = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[()]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.str[1] == '=' && this.hl('<=', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '=' && this.hl('>=', 'dsKeyword')) continue;
        if(this.str[0] == '=' && this.str[1] == '=' && this.hl('==', 'dsKeyword')) continue;
        if((m = /^[=<>,]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._tag_line_switch = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[01]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._every_non_whitespace_is_error();continue;}
        if(this.str[0] == 'n' && this.str[1] == 'o' && this.hl('no', 'dsOthers')) {this._every_non_whitespace_is_error();continue;}
        if((m = /^yes/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._every_non_whitespace_is_error();continue;}
        if(/^[%$]/.exec(this.str)) {this._tag_line_value();continue;}
        if(/^./.exec(this.str)) {this._every_non_whitespace_is_error();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._changelog_generic = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._changelog_weekday = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._changelog_month();continue;}
        if(/^[%$]/.exec(this.str)) {this._changelog_generic();continue;}
        if((m = /^\S*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._changelog_month();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._changelog_month = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._changelog_day();continue;}
        if(/^[%$]/.exec(this.str)) {this._changelog_generic();continue;}
        if((m = /^\S*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._changelog_day();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._changelog_day = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:1|2|3|4|5|6|7|8|9|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._changelog_year();continue;}
        if(/^[%$]/.exec(this.str)) {this._changelog_generic();continue;}
        if((m = /^\S*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._changelog_year();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._changelog_year = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(\d{4})&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {this._changelog_header();continue;}
        if(/^[%$]/.exec(this.str)) {this._changelog_generic();continue;}
        if((m = /^\S*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._changelog_header();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._changelog_header = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsDataType');
    }
};
HL.prototype._parametersAfterIfos = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&os;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._parametersAfterIfarch = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^&arch;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._expressionAfter_if_Statement = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[()]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '&' && this.str[1] == '&' && this.hl('&&', 'dsKeyword')) continue;
        if(this.str[0] == '<' && this.str[1] == '=' && this.hl('<=', 'dsKeyword')) continue;
        if(this.str[0] == '>' && this.str[1] == '=' && this.hl('>=', 'dsKeyword')) continue;
        if(this.str[0] == '=' && this.str[1] == '=' && this.hl('==', 'dsKeyword')) continue;
        if(this.str[0] == '!' && this.str[1] == '=' && this.hl('!=', 'dsKeyword')) continue;
        if((m = /^[!<>]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '|' && this.str[1] == '|' && this.hl('||', 'dsKeyword')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._quotedStringsInIfStatements();continue;}
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
HL.prototype._quotedStringsInIfStatements = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\[^"]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._macroDefination = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[&a_valid_char_in_macro_names;]*&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._macroDefinationContent();continue;}
        if((m = /^[^ \t]*/.exec(this.str)) && this.hl(m[0], 'dsError')) {this._macroDefinationContent();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._macroDefinationContent = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.hl('\', 'dsError')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._undefineMacro = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[&a_valid_char_in_macro_names;]*&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._every_non_whitespace_is_error();continue;}
        if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsError')) {this._every_non_whitespace_is_error();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._handle_percent = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) return;
        if((m = /^%(if!?)&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._expressionAfter_if_Statement();continue;}
        if((m = /^%&arch_conditionals_names;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._parametersAfterIfarch();continue;}
        if((m = /^%&os_conditionals_names;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._parametersAfterIfos();continue;}
        if((m = /^%else&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._every_non_whitespace_is_error();continue;}
        if((m = /^%endif&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._every_non_whitespace_is_error();continue;}
        if((m = /^%(define|global)&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._macroDefination();continue;}
        if((m = /^%undefine&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._undefineMacro();continue;}
        if((m = /^%package&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._packageSectionStartLine();continue;}
        if((m = /^%description&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._descriptionSectionStartLine();continue;}
        if((m = /^%&command_section_name;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._commandSection();continue;}
        if((m = /^%changelog&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {this._changelogSection();continue;}
        if((m = /^%([\{\(][ \t]{0,}){0,1}(if|&arch_conditionals_names;|&os_conditionals_names;|else|endif|define|global|undefine|package|description|&command_section_name;|changelog)(?=($|[^&a_valid_char_in_macro_names;]))/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if((m = /^%[&a_valid_char_in_macro_names;]*\(/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._macroContentInParenthesis();continue;}
        if((m = /^(%|\$)\{/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._macroContentInBraces();continue;}
        if((m = /^(%|\$)([&a_valid_char_in_macro_names;]{1,}|\*|\#)(?=($|[^&a_valid_char_in_macro_names;]))/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        if((m = /^(%|\$)([&a_valid_char_in_macro_names;]{1,}|\*|\#)/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if((m = /^[%$]/.exec(this.str)) && this.hl(m[0], 'dsError')) return;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._macroContentInParenthesis = function() {
    var m;
    while(this.pos < this.len) {
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        if(this.str[0] == ')' && this.hl(')', 'dsFunction')) {this._#pop#pop();continue;}
        if((m = /^[({}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._macroContentInBraces = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '}' && this.hl('}', 'dsFunction')) {this._#pop#pop();continue;}
        if((m = /^[({)]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
        if(/^[%$]/.exec(this.str)) {this._handle_percent();continue;}
        this.hl(this.str[0], 'dsFunction');
    }
};
