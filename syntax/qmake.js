KateSyntax.langs.qmake.syntax = {
    default: 'qmake_normal',
    qmake_normal: function qmake_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:CONFIG|DEFINES|DESTDIR|DLLDESTDIR|FORMS|HEADERS|INCLUDEPATH|INSTALLS|LIBS|OBJECTIVE_SOURCES|OTHER_FILES|OUT_PWD|QMAKE_CXXFLAGS|QMAKE_EXTRA_COMPILERS|QMAKE_FILE_IN|QMAKE_FILE_OUT|QMAKE_LFLAGS|QMAKE_LFLAGS_SONAME|QMAKE_RPATHDIR|QMAKE_SUBSTITUTES|QT|QT_CONFIG|QT_MAJOR_VERSION|QT_MINOR_VERSION|QT_PATCH_VERSION|RCC_DIR|RESOURCES|SOURCES|SUBDIRS|TARGET|TEMPLATE|UI_DIR|MOC_DIR|OBJECTS_DIR|VPATH)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType;fontWeight:bold')) continue;
            if((m = /^(?:contains|defineReplace|defineTest|equals|error|eval|greaterThan|include|isEmpty|isEqual|message|return|unset)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:build_pass|debug|debug_and_release|linux|macx|msvc|release|unix|win32)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:else|for|if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.qmake_comment())return this.pop(), m-1;continue;}
            if((m = /^\$\$?[a-zA-Z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\$\$\{[^\}]*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\$\$\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\$\$\([^\)]*\)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword;fontWeight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsKeyword;fontWeight:bold')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this.qmake_string())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    qmake_string: function qmake_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsKeyword;fontWeight:bold')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsKeyword;fontWeight:bold')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    qmake_comment: function qmake_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if((m = /^(?:###|ALERT|BUG|DANGER|DEPRECATED|FIXME|HACK|NOTE|NOTICE|SECURITY|TASK|TEST|TESTING|TODO|WARNING)\b/.exec(this.str)) && this.hl(m[0], 'dsAlert')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            if(this.str[0] == '\n') return this.pop();
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
