KateSyntax.langs['sql-mysql'].syntax = {
    default: 'sql-mysql_normal',
    'sql-mysql_normal': function sqlmysql_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^SET(?=\s*\()/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\bCHARACTER SET\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:ACCESS|ADD|ALL|ALTER|ANALYZE|AND|AS|ASC|AUTO_INCREMENT|BDB|BERKELEYDB|BETWEEN|BOTH|BY|CASCADE|CASE|CHANGE|CHARSET|COLUMN|COLUMNS|CONSTRAINT|CREATE|CROSS|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|DATABASE|DATABASES|DAY_HOUR|DAY_MINUTE|DAY_SECOND|DEC|DEFAULT|DELAYED|DELETE|DESC|DESCRIBE|DISTINCT|DISTINCTROW|DROP|ELSE|ENCLOSED|ESCAPED|EXISTS|EXPLAIN|FIELDS|FOR|FOREIGN|FROM|FULLTEXT|FUNCTION|GRANT|GROUP|HAVING|HIGH_PRIORITY|IF|IGNORE|IN|INDEX|INFILE|INNER|INNODB|INSERT|INTERVAL|INTO|IS|JOIN|KEY|KEYS|KILL|LEADING|LEFT|LIKE|LIMIT|LINES|LOAD|LOCK|LOW_PRIORITY|MASTER_SERVER_ID|MATCH|MRG_MYISAM|NATURAL|NATIONAL|NOT|NULL|NUMERIC|ON|OPTIMIZE|OPTION|OPTIONALLY|OR|ORDER|OUTER|OUTFILE|PARTIAL|PRECISION|PRIMARY|PRIVILEGES|PROCEDURE|PURGE|READ|REFERENCES|REGEXP|RENAME|REPLACE|REQUIRE|RESTRICT|RETURNS|REVOKE|RIGHT|RLIKE|SELECT|SET|SHOW|SONAME|SQL_BIG_RESULT|SQL_CALC_FOUND_ROWS|SQL_SMALL_RESULT|SSL|STARTING|STRAIGHT_JOIN|STRIPED|TABLE|TABLES|TERMINATED|THEN|TO|TRAILING|TRUNCATE|TYPE|UNION|UNIQUE|UNLOCK|UNSIGNED|UPDATE|USAGE|USE|USER_RESOURCES|USING|VALUES|VARYING|WHEN|WHERE|WITH|WRITE|XOR|YEAR_MONTH|ZEROFILL)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\+|-|\*|\/|\|\||=|!=|<>|<|<=|>|>=|~=|\^=|:=|=>|\*\*|\.\.)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:ASCII|ORD|CONV|BIN|OCT|HEX|CHAR|CONCAT|CONCAT_WS|LENGTH|OCTET_LENGTH|CHAR_LENGTH|CHARACTER_LENGTH|BIT_LENGTH|LOCATE|POSITION|INSTR|LPAD|RPAD|LEFT|RIGHT|SUBSTRING|SUBSTRING_INDEX|MID|LTRIM|RTRIM|TRIM|SOUNDEX|SPACE|REPLACE|REPEAT|REVERSE|INSERT|ELT|FIELD|FIND_IN_SET|MAKE_SET|EXPORT_SET|LCASE|LOWER|UCASE|UPPER|LOAD_FILE|QUOTE|ABS|SIGN|MOD|FLOOR|CEILING|ROUND|EXP|LN|LOG|LOG2|LOG10|POW|POWER|SQRT|PI|COS|SIN|TAN|ACOS|ASIN|ATAN|ATAN2|COT|RAND|LEAST|GREATEST|DEGREES|RADIANS|DAYOFWEEK|WEEKDAY|DAYOFMONTH|DAYOFYEAR|MONTH|DAYNAME|MONTHNAME|QUARTER|WEEK|YEAR|YEARWEEK|HOUR|MINUTE|SECOND|PERIOD_ADD|PERIOD_DIFF|DATE_ADD|DATE_SUB|ADDDATE|SUBDATE|EXTRACT|TO_DAYS|FROM_DAYS|DATE_FORMAT|TIME_FORMAT|CURDATE|CURRENT_DATE|CURTIME|CURRENT_TIME|NOW|SYSDATE|CURRENT_TIMESTAMP|UNIX_TIMESTAMP|FROM_UNIXTIME|SEC_TO_TIME|TIME_TO_SEC|CAST|CONVERT|BIT_COUNT|DATABASE|USER|SYSTEM_USER|SESSION_USER|PASSWORD|ENCRYPT|ENCODE|DECODE|MD5|SHA1|SHA|AES_ENCRYPT|AES_DECRYPT|DES_ENCRYPT|DES_DECRYPT|LAST_INSERT_ID|FORMAT|VERSION|CONNECTION_ID|GET_LOCK|RELEASE_LOCK|IS_FREE_LOCK|BENCHMARK|INET_NTOA|INET_ATON|MASTER_POS_WAIT|FOUND_ROWS|COUNT|AVG|MIN|MAX|SUM|STD|STDDEV|BIT_OR|BIT_AND)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:CHAR|CHARACTER|VARCHAR|BINARY|VARBINARY|TINYBLOB|MEDIUMBLOB|BLOB|LONGBLOB|TINYTEXT|MEDIUMTEXT|TEXT|LONGTEXT|ENUM|BIT|BOOL|BOOLEAN|TINYINT|SMALLINT|MEDIUMINT|MIDDLEINT|INT|INTEGER|BIGINT|FLOAT|DOUBLE|REAL|DECIMAL|DEC|FIXED|NUMERIC|LONG|SERIAL|DATE|DATETIME|TIME|TIMESTAMP|YEAR)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^[a-zA-Z][a-zA-Z0-9]*/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^%(?:bulk_(?:exceptions|rowcount)|found|isopen|notfound|rowcount|rowtype|type)\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this['sql-mysql_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsString')) {if(m = this['sql-mysql_string2']())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#080')) {if(m = this['sql-mysql_name']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['sql-mysql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this['sql-mysql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['sql-mysql_multiLineComment']())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^rem\b/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['sql-mysql_singleLineComment']())return this.pop(), m-1;continue;}
            if((m = /^[:&]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^\/(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^@@?[^@ \t\r\n]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['sql-mysql_preprocessor']())return this.pop(), m-1;continue;}
            if(this.str[0] == '.' && this.hl('.', 'dsChar')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'sql-mysql_string': function sqlmysql_string(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsChar')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'sql-mysql_string2': function sqlmysql_string2(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '&' && this.hl('&', 'dsChar')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'sql-mysql_name': function sqlmysql_name(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsString;color:#080')) return this.pop();
            if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.str[0] == '`' && this.hl('`', 'dsString;color:#080')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#080');
        }
        this.pop();
    },
    'sql-mysql_singleLineComment': function sqlmysql_singleLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'sql-mysql_multiLineComment': function sqlmysql_multiLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'sql-mysql_preprocessor': function sqlmysql_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    }
};
