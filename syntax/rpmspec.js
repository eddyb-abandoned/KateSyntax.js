KateSyntax.langs.rpmspec.syntax = {
    default: 'rpmspec_packageSection',
    rpmspec_packageSection: function rpmspec_packageSection(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^((Icon)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_value())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^((ExclusiveOs|ExcludeOs)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_os())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^((BuildArch|BuildArchitectures|ExclusiveArch|ExcludeArch)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_arch())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^((Conflicts|Obsoletes|Provides|Requires|Requires\(.*\)|Enhances|Suggests|BuildConflicts|BuildRequires|Recommends|PreReq)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_package())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^((Epoch|Serial|Nosource|Nopatch)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_integer())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^((AutoReq|AutoProv|AutoReqProv)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_switch())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^((Copyright|License|Summary|Summary\(.*\)|Distribution|Vendor|Packager|Group|Source\d*|Patch\d*|BuildRoot|Prefix)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_string())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^((Name|Version|Release|Url|URL)[ \t]*:[ \t]*)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_tag_line_string_only_one_word())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_macroEntryInPackageSection())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^[ \t]*#/.exec(this.str)) {if(m = this.rpmspec_comment())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_macroEntryInPackageSection: function rpmspec_macroEntryInPackageSection(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_packageSectionStartLine: function rpmspec_packageSectionStartLine(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.rpmspec_packageSection();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_commandSection: function rpmspec_commandSection(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '\\' && this.hl('\\', 'dsKeyword')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^[ \t]*#/.exec(this.str)) {if(m = this.rpmspec_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_changelogSection: function rpmspec_changelogSection(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && this.str[0] == '*' && this.hl('*', 'dsDataType')) {if(m = this.rpmspec_changelog_weekday())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^[ \t]*#/.exec(this.str)) {if(m = this.rpmspec_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rpmspec_descriptionSectionStartLine: function rpmspec_descriptionSectionStartLine(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), this.rpmspec_descriptionSection();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_descriptionSection: function rpmspec_descriptionSection(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.col === 0 && /^[ \t]*#/.exec(this.str)) {if(m = this.rpmspec_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rpmspec_comment: function rpmspec_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.col === 0 && (m = /^[ \t]+(?=#)/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.col === 0 && (m = /^# norootforbuild/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_every_non_whitespace_is_warning())return this.pop(), m-1;continue;}
            if((m = /^#[ \t]*norootforbuild/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsComment')) continue;
            if(this.str[0] == '%' && this.hl('%', 'dsError')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    rpmspec_every_non_whitespace_is_error: function rpmspec_every_non_whitespace_is_error(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\s]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_every_non_whitespace_is_warning: function rpmspec_every_non_whitespace_is_warning(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\s]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_tag_line_value: function rpmspec_tag_line_value(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    rpmspec_tag_line_string: function rpmspec_tag_line_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[^%]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\(?=(\%))/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rpmspec_tag_line_string_only_one_word: function rpmspec_tag_line_string_only_one_word(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[^%]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if((m = /^\\(?=(\%))/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_tag_line_string())return this.pop(), m-1;continue;}
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rpmspec_tag_line_integer: function rpmspec_tag_line_integer(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_tag_line_integer_without_syntax_check())return this.pop(), m-1;continue;}
            if(/^./.exec(this.str)) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_tag_line_os: function rpmspec_tag_line_os(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&os;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_tag_line_value())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_tag_line_integer_without_syntax_check: function rpmspec_tag_line_integer_without_syntax_check(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDecVal');
        }
        this.pop();
    },
    rpmspec_tag_line_arch: function rpmspec_tag_line_arch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&arch;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_tag_line_value())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_tag_line_package: function rpmspec_tag_line_package(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[()]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '<' && this.str[1] == '=' && this.hl('<=', 'dsKeyword')) continue;
            if(this.str[0] == '>' && this.str[1] == '=' && this.hl('>=', 'dsKeyword')) continue;
            if(this.str[0] == '=' && this.str[1] == '=' && this.hl('==', 'dsKeyword')) continue;
            if((m = /^[=<>,]/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    rpmspec_tag_line_switch: function rpmspec_tag_line_switch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[01]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if(this.str[0] == 'n' && this.str[1] == 'o' && this.hl('no', 'dsOthers')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if((m = /^yes/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_tag_line_value())return this.pop(), m-1;continue;}
            if(/^./.exec(this.str)) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_changelog_generic: function rpmspec_changelog_generic(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    rpmspec_changelog_weekday: function rpmspec_changelog_weekday(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_changelog_month())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_changelog_generic())return this.pop(), m-1;continue;}
            if((m = /^\S*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsError')) {if(m = this.rpmspec_changelog_month())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    rpmspec_changelog_month: function rpmspec_changelog_month(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_changelog_day())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_changelog_generic())return this.pop(), m-1;continue;}
            if((m = /^\S*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsError')) {if(m = this.rpmspec_changelog_day())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    rpmspec_changelog_day: function rpmspec_changelog_day(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(?:1|2|3|4|5|6|7|8|9|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_changelog_year())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_changelog_generic())return this.pop(), m-1;continue;}
            if((m = /^\S*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsError')) {if(m = this.rpmspec_changelog_year())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    rpmspec_changelog_year: function rpmspec_changelog_year(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^(\d{4})&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) {if(m = this.rpmspec_changelog_header())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_changelog_generic())return this.pop(), m-1;continue;}
            if((m = /^\S*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsError')) {if(m = this.rpmspec_changelog_header())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    rpmspec_changelog_header: function rpmspec_changelog_header(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsDataType');
        }
        this.pop();
    },
    rpmspec_parametersAfterIfos: function rpmspec_parametersAfterIfos(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&os;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_parametersAfterIfarch: function rpmspec_parametersAfterIfarch(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^&arch;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_expressionAfter_if_Statement: function rpmspec_expressionAfter_if_Statement(m) {
        this.push();
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
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.rpmspec_quotedStringsInIfStatements())return this.pop(), m-1;continue;}
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
        }
        this.pop();
    },
    rpmspec_quotedStringsInIfStatements: function rpmspec_quotedStringsInIfStatements(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\[^"]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rpmspec_macroDefination: function rpmspec_macroDefination(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[&a_valid_char_in_macro_names;]*&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rpmspec_macroDefinationContent())return this.pop(), m-1;continue;}
            if((m = /^[^ \t]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsError')) {if(m = this.rpmspec_macroDefinationContent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_macroDefinationContent: function rpmspec_macroDefinationContent(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '\\' && this.hl('\\', 'dsError')) continue;
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    rpmspec_undefineMacro: function rpmspec_undefineMacro(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^[&a_valid_char_in_macro_names;]*&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if((m = /^./.exec(this.str)) && this.hl(m[0], 'dsError')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_handle_percent: function rpmspec_handle_percent(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '%' && this.str[1] == '%' && this.hl('%%', 'dsChar')) return this.pop();
            if((m = /^%(if!?)&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rpmspec_expressionAfter_if_Statement())return this.pop(), m-1;continue;}
            if((m = /^%&arch_conditionals_names;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rpmspec_parametersAfterIfarch())return this.pop(), m-1;continue;}
            if((m = /^%&os_conditionals_names;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rpmspec_parametersAfterIfos())return this.pop(), m-1;continue;}
            if((m = /^%else&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if((m = /^%endif&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rpmspec_every_non_whitespace_is_error())return this.pop(), m-1;continue;}
            if((m = /^%(define|global)&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rpmspec_macroDefination())return this.pop(), m-1;continue;}
            if((m = /^%undefine&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this.rpmspec_undefineMacro())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%package&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.rpmspec_packageSectionStartLine())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%description&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.rpmspec_descriptionSectionStartLine())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%&command_section_name;&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.rpmspec_commandSection())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^%changelog&lookahead_whitespace_eol;/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) {if(m = this.rpmspec_changelogSection())return this.pop(), m-1;continue;}
            if((m = /^%([\{\(][ \t]{0,}){0,1}(if|&arch_conditionals_names;|&os_conditionals_names;|else|endif|define|global|undefine|package|description|&command_section_name;|changelog)(?=((?=$|\n)|[^&a_valid_char_in_macro_names;]))/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            if((m = /^%[&a_valid_char_in_macro_names;]*\(/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.rpmspec_macroContentInParenthesis())return this.pop(), m-1;continue;}
            if((m = /^(%|\$)\{/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.rpmspec_macroContentInBraces())return this.pop(), m-1;continue;}
            if((m = /^(%|\$)([&a_valid_char_in_macro_names;]{1,}|\*|\#)(?=((?=$|\n)|[^&a_valid_char_in_macro_names;]))/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop();
            if((m = /^(%|\$)([&a_valid_char_in_macro_names;]{1,}|\*|\#)/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            if((m = /^[%$]/.exec(this.str)) && this.hl(m[0], 'dsError')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    rpmspec_macroContentInParenthesis: function rpmspec_macroContentInParenthesis(m) {
        this.push();
        while(this.pos < this.len) {
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == ')' && this.hl(')', 'dsFunction')) return this.pop(), 1;
            if((m = /^[({}]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    rpmspec_macroContentInBraces: function rpmspec_macroContentInBraces(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '}' && this.hl('}', 'dsFunction')) return this.pop(), 1;
            if((m = /^[({)]/.exec(this.str)) && this.hl(m[0], 'dsError')) continue;
            if(/^[%$]/.exec(this.str)) {if(m = this.rpmspec_handle_percent())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop(), 1;
            this.hl(this.str[0], 'dsFunction');
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
