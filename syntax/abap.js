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
        if((m = /^(?:ADD|ADJACENT|ALL|AND|APPEND|APPENDING|AS|ASCENDING|AT|BEGIN|BETWEEN|BINARY|BLOCK|BY|CASE|CENTERED|CHAIN|CHANGING|CHECK|CHECKBOX|CLEAR|COL_BACKGROUND|COL_HEADING|COL_NORMAL|COL_TOTAL|COLOR|COMMENT|COMMIT|COMPARING|COMPUTE|CONCATENATE|CONDENSE|CONSTANTS|CONTINUE|CONTROLS|COUNTRY|DATA|DECIMALS|DEFAULT|DELETE|DELETING|DESCENDING|DESCRIBE|DO|DUPLICATES|EDIT|ELSE|ELSEIF|END|ENDCASE|ENDCHAIN|ENDDO|ENDIF|ENDLOOP|ENDMODULE|ENDSELECT|ENDWHILE|ENTRIES|EQ|EXCEPTIONS|EXCLUDING|EXIT|EXIT-COMMAND|EXPORT|EXPORTING|FIELD|FIRST|FOR|FORMAT|FRAME|FREE|FROM|GE|GROUP|GT|HEADER|HEADING|HIDE|HOTSPOT|ID|IF|IMPORT|IMPORTING|IN|INDEX|INITIAL|INNER|INPUT|INSERT|INTENSIFIED|INTERVALS|INTO|IS|JOIN|KEY|LE|LEAVE|LEFT|LEFT-JUSTIFIED|LIKE|LINE|LINE-COUNT|LINES|LINES|LINE-SIZE|LIST-PROCESSING|LOOP|LT|MASK|MEMORY|MESSAGE|MESSAGE-ID|MOD|MODIFY|MODULE|MOVE|MOVE-CORRESPONDING|NE|NEW-LINE|NEW-PAGE|NO|NO-EXTENSION|NO-GAP|NO-SCROLLING|NOT|NO-ZERO|NUMBER|OBLIGATORY|OCCURS|OF|OFF|ON|OR|OTHERS|OUTPUT|PAGE|PARAMETER|PARAMETERS|PERFORM|PF-STATUS|POS_HIGH|POS_LOW|POSITION|PROGRAM|RADIOBUTTON|RANGES|READ|REFRESH|REPORT|RESERVE|RESET|RIGHT|RIGHT-JUSTIFIED|ROLLBACK|ROWS|SCREEN|SCREEN-GROUP1|SCREEN-GROUP2|SCREEN-GROUP3|SCREEN-GROUP4|SCREEN-GROUP5|SCREEN-INPUT|SCREEN-INTENSIFIED|SEARCH|SELECT|SELECTION|SELECTION-SCREEN|SELECT-OPTIONS|SEPARATED|SET|SHIFT|SINGLE|SKIP|SORT|SPACE|SPLIT|STANDARD|STARTING|STOP|STRLEN|STRUCTURE|SUBTRACT|SY-CUCOL|SY-DATUM|SY-DYNNR|SY-LINSZ|SY-LOOPC|SY-LSIND|SY-MSGID|SY-MSGTY|SY-MSGV1|SY-MSGV2|SY-MSGV3|SY-MSGV4|SY-PAGNO|SY-REPID|SY-STEPL|SY-SUBRC|SY-TABIX|SY-TCODE|SY-TMAXL|SY-UCOMM|SY-ULINE|SY-UNAME|SY-UZEIT|SY-VLINE|TABLE|TABLES|TABLEVIEW|TIMES|TITLE|TITLEBAR|TO|TRAILING|TRANSPORTING|TYPE|TYPE-POOLS|TYPES|ULINE|UP|UPDATE|USING|VALUE|WHEN|WHERE|WHILE|WITH|WORK|WRITE|AFTER|BEFORE|CALL|DURING|ENDFORM|END-OF-SELECTION|FORM|FUNCTION|INCLUDE|LINE-SELECTION|PROCESS|START-OF-SELECTION|TOP-OF-PAGE|TRANSACTION|USER-COMMAND)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsComment')) {this._comment();continue;}
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) {this._comment();continue;}
        if((m = /^[!%&()+,\-<:=>[\]\^~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._comment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsComment')) return;
        if(this.str[0] == '*' && this.hl('*', 'dsComment')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
