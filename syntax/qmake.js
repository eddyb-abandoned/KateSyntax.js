var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
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
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:CONFIG|DEFINES|DESTDIR|DLLDESTDIR|FORMS|HEADERS|INCLUDEPATH|INSTALLS|LIBS|OBJECTIVE_SOURCES|OTHER_FILES|OUT_PWD|QMAKE_CXXFLAGS|QMAKE_EXTRA_COMPILERS|QMAKE_FILE_IN|QMAKE_FILE_OUT|QMAKE_LFLAGS|QMAKE_LFLAGS_SONAME|QMAKE_RPATHDIR|QMAKE_SUBSTITUTES|QT|QT_CONFIG|QT_MAJOR_VERSION|QT_MINOR_VERSION|QT_PATCH_VERSION|RCC_DIR|RESOURCES|SOURCES|SUBDIRS|TARGET|TEMPLATE|UI_DIR|MOC_DIR|OBJECTS_DIR)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^(?:contains|defineReplace|defineTest|equals|error|eval|greaterThan|include|isEmpty|isEqual|message|return|unset)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:build_pass|debug|debug_and_release|linux|macx|msvc|release|unix|win32)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if((m = /^(?:else|for|if)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        if((m = /^\$\$?[a-zA-Z0-9_]+/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\$\$\{[^\}]*\}/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\$\$\[[^\]]*\]/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\$\$\([^\)]*\)/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == '"' && this.hl('\"', 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\' && this.str[1] == '\' && this.hl('\\', 'dsKeyword')) continue;
        if(this.str[0] == '\' && this.str[1] == '"' && this.hl('\"', 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsComment');
    }
};
