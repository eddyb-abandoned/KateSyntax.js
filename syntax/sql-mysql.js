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
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^SET(?=\s*\()/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^\bCHARACTER SET\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:ACCESS|ADD|ALL|ALTER|ANALYZE|AND|AS|ASC|AUTO_INCREMENT|BDB|BERKELEYDB|BETWEEN|BOTH|BY|CASCADE|CASE|CHANGE|CHARSET|COLUMN|COLUMNS|CONSTRAINT|CREATE|CROSS|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|DATABASE|DATABASES|DAY_HOUR|DAY_MINUTE|DAY_SECOND|DEC|DEFAULT|DELAYED|DELETE|DESC|DESCRIBE|DISTINCT|DISTINCTROW|DROP|ELSE|ENCLOSED|ESCAPED|EXISTS|EXPLAIN|FIELDS|FOR|FOREIGN|FROM|FULLTEXT|FUNCTION|GRANT|GROUP|HAVING|HIGH_PRIORITY|IF|IGNORE|IN|INDEX|INFILE|INNER|INNODB|INSERT|INTERVAL|INTO|IS|JOIN|KEY|KEYS|KILL|LEADING|LEFT|LIKE|LIMIT|LINES|LOAD|LOCK|LOW_PRIORITY|MASTER_SERVER_ID|MATCH|MRG_MYISAM|NATURAL|NATIONAL|NOT|NULL|NUMERIC|ON|OPTIMIZE|OPTION|OPTIONALLY|OR|ORDER|OUTER|OUTFILE|PARTIAL|PRECISION|PRIMARY|PRIVILEGES|PROCEDURE|PURGE|READ|REFERENCES|REGEXP|RENAME|REPLACE|REQUIRE|RESTRICT|RETURNS|REVOKE|RIGHT|RLIKE|SELECT|SET|SHOW|SONAME|SQL_BIG_RESULT|SQL_CALC_FOUND_ROWS|SQL_SMALL_RESULT|SSL|STARTING|STRAIGHT_JOIN|STRIPED|TABLE|TABLES|TERMINATED|THEN|TO|TRAILING|TRUNCATE|TYPE|UNION|UNIQUE|UNLOCK|UNSIGNED|UPDATE|USAGE|USE|USER_RESOURCES|USING|VALUES|VARYING|WHEN|WHERE|WITH|WRITE|XOR|YEAR_MONTH|ZEROFILL)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\+|-|\*|\/||||=|!=|<>|<|<=|>|>=|~=|\^=|:=|=>|\*\*|\.\.)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:ASCII|ORD|CONV|BIN|OCT|HEX|CHAR|CONCAT|CONCAT_WS|LENGTH|OCTET_LENGTH|CHAR_LENGTH|CHARACTER_LENGTH|BIT_LENGTH|LOCATE|POSITION|INSTR|LPAD|RPAD|LEFT|RIGHT|SUBSTRING|SUBSTRING_INDEX|MID|LTRIM|RTRIM|TRIM|SOUNDEX|SPACE|REPLACE|REPEAT|REVERSE|INSERT|ELT|FIELD|FIND_IN_SET|MAKE_SET|EXPORT_SET|LCASE|LOWER|UCASE|UPPER|LOAD_FILE|QUOTE|ABS|SIGN|MOD|FLOOR|CEILING|ROUND|EXP|LN|LOG|LOG2|LOG10|POW|POWER|SQRT|PI|COS|SIN|TAN|ACOS|ASIN|ATAN|ATAN2|COT|RAND|LEAST|GREATEST|DEGREES|RADIANS|DAYOFWEEK|WEEKDAY|DAYOFMONTH|DAYOFYEAR|MONTH|DAYNAME|MONTHNAME|QUARTER|WEEK|YEAR|YEARWEEK|HOUR|MINUTE|SECOND|PERIOD_ADD|PERIOD_DIFF|DATE_ADD|DATE_SUB|ADDDATE|SUBDATE|EXTRACT|TO_DAYS|FROM_DAYS|DATE_FORMAT|TIME_FORMAT|CURDATE|CURRENT_DATE|CURTIME|CURRENT_TIME|NOW|SYSDATE|CURRENT_TIMESTAMP|UNIX_TIMESTAMP|FROM_UNIXTIME|SEC_TO_TIME|TIME_TO_SEC|CAST|CONVERT|BIT_COUNT|DATABASE|USER|SYSTEM_USER|SESSION_USER|PASSWORD|ENCRYPT|ENCODE|DECODE|MD5|SHA1|SHA|AES_ENCRYPT|AES_DECRYPT|DES_ENCRYPT|DES_DECRYPT|LAST_INSERT_ID|FORMAT|VERSION|CONNECTION_ID|GET_LOCK|RELEASE_LOCK|IS_FREE_LOCK|BENCHMARK|INET_NTOA|INET_ATON|MASTER_POS_WAIT|FOUND_ROWS|COUNT|AVG|MIN|MAX|SUM|STD|STDDEV|BIT_OR|BIT_AND)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
        if((m = /^(?:CHAR|CHARACTER|VARCHAR|BINARY|VARBINARY|TINYBLOB|MEDIUMBLOB|BLOB|LONGBLOB|TINYTEXT|MEDIUMTEXT|TEXT|LONGTEXT|ENUM|BIT|BOOL|BOOLEAN|TINYINT|SMALLINT|MEDIUMINT|MIDDLEINT|INT|INTEGER|BIGINT|FLOAT|DOUBLE|REAL|DECIMAL|DEC|FIXED|NUMERIC|LONG|SERIAL|DATE|DATETIME|TIME|TIMESTAMP|YEAR)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^%(?:bulk_(?:exceptions|rowcount)|found|isopen|notfound|rowcount|rowtype|type)\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) {this._string();continue;}
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string2();continue;}
        if(this.str[0] == '`' && this.hl('`', 'dsString')) {this._name();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._singleLineComment();continue;}
        if(this.str[0] == '--' && this.hl('--', 'dsComment')) {this._singleLineComment();continue;}
        if(this.str[0] == '/*' && this.hl('/*', 'dsComment')) {this._multiLineComment();continue;}
        if((m = /^rem\b/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {this._singleLineComment();continue;}
        if((m = /^[:&]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^/(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^@@?[^@ \t\r\n]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._preprocessor();continue;}
        if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsChar')) continue;
        if(this.str[0] == ''' && this.hl(''', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._string2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '&' && this.hl('&', 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._name = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '`' && this.hl('`', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._singleLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._multiLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) return;
        if(this.str[0] == '*/' && this.hl('*/', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._preprocessor = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n' && this.hl('\n', 'dsOthers')) return;
        this.hl(this.str[0], 'dsOthers');
    }
};
