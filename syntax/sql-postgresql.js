KateSyntax.langs['sql-postgresql'].syntax = {
    default: 'sql-postgresql_normal',
    'sql-postgresql_normal': function sqlpostgresql_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^CREATE FUNCTION/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['sql-postgresql_createFunction']())return this.pop(), m-1;continue;}
            if((m = /^(?:ABORT|ACCESS|ACTION|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|ANALYSE|ANALYZE|ANY|ARE|AS|ASC|ASENSITIVE|ASSERTION|ASSIGNMENT|ASYMMETRIC|AT|ATOMIC|AUTHORIZATION|BACKWARD|BEFORE|BEGIN|BETWEEN|BINARY|BOTH|BREADTH|BY|C|CACHE|CALL|CALLED|CARDINALITY|CASCADE|CASCADED|CASE|CAST|CATALOG|CATALOG_NAME|CHAIN|CHAR_LENGTH|CHARACTER_LENGTH|CHARACTER_SET_CATALOG|CHARACTER_SET_NAME|CHARACTER_SET_SCHEMA|CHARACTERISTICS|CHECK|CHECKED|CHECKPOINT|CLASS|CLASS_ORIGIN|CLOB|CLOSE|CLUSTER|COALESCE|COBOL|COLLATE|COLLATION|COLLATION_CATALOG|COLLATION_NAME|COLLATION_SCHEMA|COLUMN|COLUMN_NAME|COMMAND_FUNCTION|COMMAND_FUNCTION_CODE|COMMENT|COMMIT|COMMITTED|COMPLETION|CONDITION_NUMBER|CONNECT|CONNECTION|CONNECTION_NAME|CONSTRAINT|CONSTRAINT_CATALOG|CONSTRAINT_NAME|CONSTRAINT_SCHEMA|CONSTRAINTS|CONSTRUCTOR|CONTAINS|CONTINUE|CONVERT|COPY|CORRESPONDING|COUNT|CREATE|CREATEDB|CREATEUSER|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CURSOR_NAME|CYCLE|DATA|DATABASE|DATE|DATETIME_INTERVAL_CODE|DATETIME_INTERVAL_PRECISION|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DEFINED|DEFINER|DELETE|DELIMITERS|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DIAGNOSTICS|DICTIONARY|DISCONNECT|DISPATCH|DISTINCT|DO|DOMAIN|DOUBLE|DROP|DYNAMIC|DYNAMIC_FUNCTION|DYNAMIC_FUNCTION_CODE|EACH|ELSE|ENCODING|ENCRYPTED|END|END-EXEC|EQUALS|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXCLUSIVE|EXEC|EXECUTE|EXISTING|EXISTS|EXPLAIN|EXTERNAL|FETCH|FINAL|FIRST|FOR|FORCE|FOREIGN|FORTRAN|FORWARD|FOUND|FREE|FREEZE|FROM|FULL|FUNCTION|G|GENERAL|GENERATED|GET|GLOBAL|GO|GOTO|GRANT|GRANTED|GROUP|GROUPING|HANDLER|HAVING|HIERARCHY|HOLD|HOST|HOUR|IDENTITY|IGNORE|ILIKE|IMMEDIATE|IMMUTABLE|IMPLEMENTATION|IN|INCREMENT|INDEX|INDICATOR|INFIX|INHERITS|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSENSITIVE|INSERT|INSTANCE|INSTANTIABLE|INSTEAD|INTERSECT|INTERVAL|INTO|INVOKER|IS|ISNULL|ISOLATION|ITERATE|JOIN|K|KEY|KEY_MEMBER|KEY_TYPE|LANCOMPILER|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LEFT|LENGTH|LESS|LEVEL|LIKE|LIMIT|LISTEN|LOAD|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATION|LOCATOR|LOCK|LOWER|M|MAP|MATCH|MAX|MAXVALUE|MESSAGE_LENGTH|MESSAGE_OCTET_LENGTH|MESSAGE_TEXT|METHOD|MIN|MINUTE|MINVALUE|MOD|MODE|MODIFIES|MODIFY|MODULE|MONTH|MORE|MOVE|MUMPS|NAME|NAMES|NATIONAL|NATURAL|NEW|NEXT|NO|NOCREATEDB|NOCREATEUSER|NONE|NOT|NOTHING|NOTIFY|NOTNULL|NULL|NULLABLE|NULLIF|NUMBER|NUMERIC|OBJECT|OCTET_LENGTH|OF|OFF|OFFSET|OIDS|OLD|ON|ONLY|OPEN|OPERATION|OPERATOR|OPTION|OPTIONS|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|OVERLAPS|OVERLAY|OVERRIDING|OWNER|PAD|PARAMETER|PARAMETER_MODE|PARAMETER_NAME|PARAMETER_ORDINAL_POSITION|PARAMETER_SPECIFIC_CATALOG|PARAMETER_SPECIFIC_NAME|PARAMETER_SPECIFIC_SCHEMA|PARAMETERS|PARTIAL|PASCAL|PASSWORD|PATH|PENDANT|PLI|POSITION|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURAL|PROCEDURE|PUBLIC|READ|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|REINDEX|RELATIVE|RENAME|REPEATABLE|REPLACE|RESET|RESTRICT|RESULT|RETURN|RETURNED_LENGTH|RETURNED_OCTET_LENGTH|RETURNED_SQLSTATE|RETURNS|REVOKE|RIGHT|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROUTINE_CATALOG|ROUTINE_NAME|ROUTINE_SCHEMA|ROW|ROW_COUNT|ROWS|RULE|SAVEPOINT|SCALE|SCHEMA|SCHEMA_NAME|SCOPE|SCROLL|SEARCH|SECOND|SECTION|SECURITY|SELECT|SELF|SENSITIVE|SEQUENCE|SERIALIZABLE|SERVER_NAME|SESSION|SESSION_USER|SET|SETOF|SETS|SHARE|SHOW|SIMILAR|SIMPLE|SIZE|SOME|SOURCE|SPACE|SPECIFIC|SPECIFIC_NAME|SPECIFICTYPE|SQL|SQLCODE|SQLERROR|SQLEXCEPTION|SQLSTATE|SQLWARNING|STABLE|START|STATE|STATEMENT|STATIC|STATISTICS|STDIN|STDOUT|STRUCTURE|STYLE|SUBCLASS_ORIGIN|SUBLIST|SUBSTRING|SUM|SYMMETRIC|SYSID|SYSTEM|SYSTEM_USER|TABLE|TABLE_NAME|TEMP|TEMPLATE|TEMPORARY|TERMINATE|THAN|THEN|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TOAST|TRAILING|TRANSACTION|TRANSACTION_ACTIVE|TRANSACTIONS_COMMITTED|TRANSACTIONS_ROLLED_BACK|TRANSFORM|TRANSFORMS|TRANSLATE|TRANSLATION|TREAT|TRIGGER|TRIGGER_CATALOG|TRIGGER_NAME|TRIGGER_SCHEMA|TRIM|TRUNCATE|TRUSTED|TYPE|UNCOMMITTED|UNDER|UNENCRYPTED|UNION|UNIQUE|UNKNOWN|UNLISTEN|UNNAMED|UNNEST|UNTIL|UPDATE|UPPER|USAGE|USER|USER_DEFINED_TYPE_CATALOG|USER_DEFINED_TYPE_NAME|USER_DEFINED_TYPE_SCHEMA|USING|VACUUM|VALID|VALUE|VALUES|VARIABLE|VARYING|VERBOSE|VERSION|VIEW|VOLATILE|WHEN|WHENEVER|WHERE|WITH|WITHOUT|WORK|WRITE|YEAR|ZONE|FALSE|TRUE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\+|-|\*|\/|\|\||\|\/|\|\|\/|!|!!|@|&|\||#|<<|>>|%|\^|=|!=|<>|<|<=|>|>=|~|~\*|!~|!~\*|\^=|:=|=>|\*\*|\.\.|AND|OR|NOT|##|&&|&<|&>|<->|<\^|>\^|\?#|\?-|\?-\||@-@|\?\||\?\|\||@@|~=|<<=|>>=)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:ABS|CBRT|CEIL|DEGREES|EXP|FLOOR|LN|LOG|MOD|PI|POW|RADIANS|RANDOM|ROUND|SIGN|SQRT|TRUNC|ACOS|ASIN|ATAN|ATAN2|COS|COT|SIN|TAN|BIT_LENGTH|CHAR_LENGTH|CHARACTER_LENGTH|LOWER|OCTET_LENGTH|POSITION|SUBSTRING|TRIM|UPPER|ASCII|BTRIM|CHR|CONVERT|INITCAP|LENGTH|LPAD|LTRIM|PG_CLIENT_ENCODING|REPEAT|RPAD|RTRIM|STRPOS|SUBSTR|TO_ASCII|TRANSLATE|ENCODE|DECODE|TO_CHAR|TO_DATE|TO_TIMESTAMP|TO_NUMBER|AGE|DATE_PART|DATE_TRUNC|EXTRACT|ISFINITE|NOW|TIMEOFDAY|TIMESTAMP|EXTRACT|AREA|BOX|CENTER|DIAMETER|HEIGHT|ISCLOSED|ISOPEN|PCLOSE|NPOINT|POPEN|RADIUS|WIDTH|BOX|CIRCLE|LSEG|PATH|POINT|POLYGON|BROADCAST|HOST|MASKLEN|SET_MASKLEN|NETMASK|NETWORK|ABBREV|NEXTVAL|CURRVAL|SETVAL|COALESCE|NULLIF|HAS_TABLE_PRIVILEGE|PG_GET_VIEWDEF|PG_GET_RULEDEF|PG_GET_INDEXDEF|PG_GET_USERBYID|OBJ_DESCRIPTION|COL_DESCRIPTION|AVG|COUNT|MAX|MIN|STDDEV|SUM|VARIANCE)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:LZTEXT|BIGINT|INT2|INT8|BIGSERIAL|SERIAL8|BIT|BIT VARYING|VARBIT|BOOLEAN|BOOL|BOX|BYTEA|CHARACTER|CHAR|CHARACTER VARYING|VARCHAR|CIDR|CIRCLE|DATE|DOUBLE PRECISION|FLOAT8|INET|INTEGER|INT|INT4|INTERVAL|LINE|LSEG|MACADDR|MONEY|NUMERIC|DECIMAL|OID|PATH|POINT|POLYGON|REAL|SMALLINT|SERIAL|TEXT|TIME|TIMETZ|TIMESTAMP|TIMESTAMPTZ|TIMESTAMP WITH TIMEZONE)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%bulk_exceptions\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%bulk_rowcount\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%found\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%isopen\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%notfound\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%rowcount\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%rowtype\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%type\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this['sql-postgresql_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['sql-postgresql_multiLineComment']())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^rem\b/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) {if(m = this['sql-postgresql_identifier']())return this.pop(), m-1;continue;}
            if((m = /^[:&]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^\/(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^@@?[^@ \t\r\n]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['sql-postgresql_preprocessor']())return this.pop(), m-1;continue;}
            if((m = /^\$([^\$\n\r]*)\$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this['sql-postgresql_multiLineString']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'sql-postgresql_createFunction': function sqlpostgresql_createFunction(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$([^\$\n\r]*)\$/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this['sql-postgresql_functionBody']())return this.pop(), m-1;continue;}
            if((m = /^CREATE FUNCTION/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['sql-postgresql_createFunction']())return this.pop(), m-1;continue;}
            if((m = /^(?:ABORT|ACCESS|ACTION|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|ANALYSE|ANALYZE|ANY|ARE|AS|ASC|ASENSITIVE|ASSERTION|ASSIGNMENT|ASYMMETRIC|AT|ATOMIC|AUTHORIZATION|BACKWARD|BEFORE|BEGIN|BETWEEN|BINARY|BOTH|BREADTH|BY|C|CACHE|CALL|CALLED|CARDINALITY|CASCADE|CASCADED|CASE|CAST|CATALOG|CATALOG_NAME|CHAIN|CHAR_LENGTH|CHARACTER_LENGTH|CHARACTER_SET_CATALOG|CHARACTER_SET_NAME|CHARACTER_SET_SCHEMA|CHARACTERISTICS|CHECK|CHECKED|CHECKPOINT|CLASS|CLASS_ORIGIN|CLOB|CLOSE|CLUSTER|COALESCE|COBOL|COLLATE|COLLATION|COLLATION_CATALOG|COLLATION_NAME|COLLATION_SCHEMA|COLUMN|COLUMN_NAME|COMMAND_FUNCTION|COMMAND_FUNCTION_CODE|COMMENT|COMMIT|COMMITTED|COMPLETION|CONDITION_NUMBER|CONNECT|CONNECTION|CONNECTION_NAME|CONSTRAINT|CONSTRAINT_CATALOG|CONSTRAINT_NAME|CONSTRAINT_SCHEMA|CONSTRAINTS|CONSTRUCTOR|CONTAINS|CONTINUE|CONVERT|COPY|CORRESPONDING|COUNT|CREATE|CREATEDB|CREATEUSER|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CURSOR_NAME|CYCLE|DATA|DATABASE|DATE|DATETIME_INTERVAL_CODE|DATETIME_INTERVAL_PRECISION|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DEFINED|DEFINER|DELETE|DELIMITERS|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DIAGNOSTICS|DICTIONARY|DISCONNECT|DISPATCH|DISTINCT|DO|DOMAIN|DOUBLE|DROP|DYNAMIC|DYNAMIC_FUNCTION|DYNAMIC_FUNCTION_CODE|EACH|ELSE|ENCODING|ENCRYPTED|END|END-EXEC|EQUALS|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXCLUSIVE|EXEC|EXECUTE|EXISTING|EXISTS|EXPLAIN|EXTERNAL|FETCH|FINAL|FIRST|FOR|FORCE|FOREIGN|FORTRAN|FORWARD|FOUND|FREE|FREEZE|FROM|FULL|FUNCTION|G|GENERAL|GENERATED|GET|GLOBAL|GO|GOTO|GRANT|GRANTED|GROUP|GROUPING|HANDLER|HAVING|HIERARCHY|HOLD|HOST|HOUR|IDENTITY|IGNORE|ILIKE|IMMEDIATE|IMMUTABLE|IMPLEMENTATION|IN|INCREMENT|INDEX|INDICATOR|INFIX|INHERITS|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSENSITIVE|INSERT|INSTANCE|INSTANTIABLE|INSTEAD|INTERSECT|INTERVAL|INTO|INVOKER|IS|ISNULL|ISOLATION|ITERATE|JOIN|K|KEY|KEY_MEMBER|KEY_TYPE|LANCOMPILER|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LEFT|LENGTH|LESS|LEVEL|LIKE|LIMIT|LISTEN|LOAD|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATION|LOCATOR|LOCK|LOWER|M|MAP|MATCH|MAX|MAXVALUE|MESSAGE_LENGTH|MESSAGE_OCTET_LENGTH|MESSAGE_TEXT|METHOD|MIN|MINUTE|MINVALUE|MOD|MODE|MODIFIES|MODIFY|MODULE|MONTH|MORE|MOVE|MUMPS|NAME|NAMES|NATIONAL|NATURAL|NEW|NEXT|NO|NOCREATEDB|NOCREATEUSER|NONE|NOT|NOTHING|NOTIFY|NOTNULL|NULL|NULLABLE|NULLIF|NUMBER|NUMERIC|OBJECT|OCTET_LENGTH|OF|OFF|OFFSET|OIDS|OLD|ON|ONLY|OPEN|OPERATION|OPERATOR|OPTION|OPTIONS|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|OVERLAPS|OVERLAY|OVERRIDING|OWNER|PAD|PARAMETER|PARAMETER_MODE|PARAMETER_NAME|PARAMETER_ORDINAL_POSITION|PARAMETER_SPECIFIC_CATALOG|PARAMETER_SPECIFIC_NAME|PARAMETER_SPECIFIC_SCHEMA|PARAMETERS|PARTIAL|PASCAL|PASSWORD|PATH|PENDANT|PLI|POSITION|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURAL|PROCEDURE|PUBLIC|READ|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|REINDEX|RELATIVE|RENAME|REPEATABLE|REPLACE|RESET|RESTRICT|RESULT|RETURN|RETURNED_LENGTH|RETURNED_OCTET_LENGTH|RETURNED_SQLSTATE|RETURNS|REVOKE|RIGHT|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROUTINE_CATALOG|ROUTINE_NAME|ROUTINE_SCHEMA|ROW|ROW_COUNT|ROWS|RULE|SAVEPOINT|SCALE|SCHEMA|SCHEMA_NAME|SCOPE|SCROLL|SEARCH|SECOND|SECTION|SECURITY|SELECT|SELF|SENSITIVE|SEQUENCE|SERIALIZABLE|SERVER_NAME|SESSION|SESSION_USER|SET|SETOF|SETS|SHARE|SHOW|SIMILAR|SIMPLE|SIZE|SOME|SOURCE|SPACE|SPECIFIC|SPECIFIC_NAME|SPECIFICTYPE|SQL|SQLCODE|SQLERROR|SQLEXCEPTION|SQLSTATE|SQLWARNING|STABLE|START|STATE|STATEMENT|STATIC|STATISTICS|STDIN|STDOUT|STRUCTURE|STYLE|SUBCLASS_ORIGIN|SUBLIST|SUBSTRING|SUM|SYMMETRIC|SYSID|SYSTEM|SYSTEM_USER|TABLE|TABLE_NAME|TEMP|TEMPLATE|TEMPORARY|TERMINATE|THAN|THEN|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TOAST|TRAILING|TRANSACTION|TRANSACTION_ACTIVE|TRANSACTIONS_COMMITTED|TRANSACTIONS_ROLLED_BACK|TRANSFORM|TRANSFORMS|TRANSLATE|TRANSLATION|TREAT|TRIGGER|TRIGGER_CATALOG|TRIGGER_NAME|TRIGGER_SCHEMA|TRIM|TRUNCATE|TRUSTED|TYPE|UNCOMMITTED|UNDER|UNENCRYPTED|UNION|UNIQUE|UNKNOWN|UNLISTEN|UNNAMED|UNNEST|UNTIL|UPDATE|UPPER|USAGE|USER|USER_DEFINED_TYPE_CATALOG|USER_DEFINED_TYPE_NAME|USER_DEFINED_TYPE_SCHEMA|USING|VACUUM|VALID|VALUE|VALUES|VARIABLE|VARYING|VERBOSE|VERSION|VIEW|VOLATILE|WHEN|WHENEVER|WHERE|WITH|WITHOUT|WORK|WRITE|YEAR|ZONE|FALSE|TRUE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\+|-|\*|\/|\|\||\|\/|\|\|\/|!|!!|@|&|\||#|<<|>>|%|\^|=|!=|<>|<|<=|>|>=|~|~\*|!~|!~\*|\^=|:=|=>|\*\*|\.\.|AND|OR|NOT|##|&&|&<|&>|<->|<\^|>\^|\?#|\?-|\?-\||@-@|\?\||\?\|\||@@|~=|<<=|>>=)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:ABS|CBRT|CEIL|DEGREES|EXP|FLOOR|LN|LOG|MOD|PI|POW|RADIANS|RANDOM|ROUND|SIGN|SQRT|TRUNC|ACOS|ASIN|ATAN|ATAN2|COS|COT|SIN|TAN|BIT_LENGTH|CHAR_LENGTH|CHARACTER_LENGTH|LOWER|OCTET_LENGTH|POSITION|SUBSTRING|TRIM|UPPER|ASCII|BTRIM|CHR|CONVERT|INITCAP|LENGTH|LPAD|LTRIM|PG_CLIENT_ENCODING|REPEAT|RPAD|RTRIM|STRPOS|SUBSTR|TO_ASCII|TRANSLATE|ENCODE|DECODE|TO_CHAR|TO_DATE|TO_TIMESTAMP|TO_NUMBER|AGE|DATE_PART|DATE_TRUNC|EXTRACT|ISFINITE|NOW|TIMEOFDAY|TIMESTAMP|EXTRACT|AREA|BOX|CENTER|DIAMETER|HEIGHT|ISCLOSED|ISOPEN|PCLOSE|NPOINT|POPEN|RADIUS|WIDTH|BOX|CIRCLE|LSEG|PATH|POINT|POLYGON|BROADCAST|HOST|MASKLEN|SET_MASKLEN|NETMASK|NETWORK|ABBREV|NEXTVAL|CURRVAL|SETVAL|COALESCE|NULLIF|HAS_TABLE_PRIVILEGE|PG_GET_VIEWDEF|PG_GET_RULEDEF|PG_GET_INDEXDEF|PG_GET_USERBYID|OBJ_DESCRIPTION|COL_DESCRIPTION|AVG|COUNT|MAX|MIN|STDDEV|SUM|VARIANCE)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:LZTEXT|BIGINT|INT2|INT8|BIGSERIAL|SERIAL8|BIT|BIT VARYING|VARBIT|BOOLEAN|BOOL|BOX|BYTEA|CHARACTER|CHAR|CHARACTER VARYING|VARCHAR|CIDR|CIRCLE|DATE|DOUBLE PRECISION|FLOAT8|INET|INTEGER|INT|INT4|INTERVAL|LINE|LSEG|MACADDR|MONEY|NUMERIC|DECIMAL|OID|PATH|POINT|POLYGON|REAL|SMALLINT|SERIAL|TEXT|TIME|TIMETZ|TIMESTAMP|TIMESTAMPTZ|TIMESTAMP WITH TIMEZONE)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%bulk_exceptions\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%bulk_rowcount\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%found\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%isopen\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%notfound\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%rowcount\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%rowtype\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%type\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this['sql-postgresql_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['sql-postgresql_multiLineComment']())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^rem\b/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) {if(m = this['sql-postgresql_identifier']())return this.pop(), m-1;continue;}
            if((m = /^[:&]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^\/(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^@@?[^@ \t\r\n]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['sql-postgresql_preprocessor']())return this.pop(), m-1;continue;}
            if((m = /^\$([^\$\n\r]*)\$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this['sql-postgresql_multiLineString']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'sql-postgresql_functionBody': function sqlpostgresql_functionBody(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$%1\$/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return this.pop(), 1;
            if((m = /^CREATE FUNCTION/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {if(m = this['sql-postgresql_createFunction']())return this.pop(), m-1;continue;}
            if((m = /^(?:ABORT|ACCESS|ACTION|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|ANALYSE|ANALYZE|ANY|ARE|AS|ASC|ASENSITIVE|ASSERTION|ASSIGNMENT|ASYMMETRIC|AT|ATOMIC|AUTHORIZATION|BACKWARD|BEFORE|BEGIN|BETWEEN|BINARY|BOTH|BREADTH|BY|C|CACHE|CALL|CALLED|CARDINALITY|CASCADE|CASCADED|CASE|CAST|CATALOG|CATALOG_NAME|CHAIN|CHAR_LENGTH|CHARACTER_LENGTH|CHARACTER_SET_CATALOG|CHARACTER_SET_NAME|CHARACTER_SET_SCHEMA|CHARACTERISTICS|CHECK|CHECKED|CHECKPOINT|CLASS|CLASS_ORIGIN|CLOB|CLOSE|CLUSTER|COALESCE|COBOL|COLLATE|COLLATION|COLLATION_CATALOG|COLLATION_NAME|COLLATION_SCHEMA|COLUMN|COLUMN_NAME|COMMAND_FUNCTION|COMMAND_FUNCTION_CODE|COMMENT|COMMIT|COMMITTED|COMPLETION|CONDITION_NUMBER|CONNECT|CONNECTION|CONNECTION_NAME|CONSTRAINT|CONSTRAINT_CATALOG|CONSTRAINT_NAME|CONSTRAINT_SCHEMA|CONSTRAINTS|CONSTRUCTOR|CONTAINS|CONTINUE|CONVERT|COPY|CORRESPONDING|COUNT|CREATE|CREATEDB|CREATEUSER|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CURSOR_NAME|CYCLE|DATA|DATABASE|DATE|DATETIME_INTERVAL_CODE|DATETIME_INTERVAL_PRECISION|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DEFINED|DEFINER|DELETE|DELIMITERS|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DIAGNOSTICS|DICTIONARY|DISCONNECT|DISPATCH|DISTINCT|DO|DOMAIN|DOUBLE|DROP|DYNAMIC|DYNAMIC_FUNCTION|DYNAMIC_FUNCTION_CODE|EACH|ELSE|ENCODING|ENCRYPTED|END|END-EXEC|EQUALS|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXCLUSIVE|EXEC|EXECUTE|EXISTING|EXISTS|EXPLAIN|EXTERNAL|FETCH|FINAL|FIRST|FOR|FORCE|FOREIGN|FORTRAN|FORWARD|FOUND|FREE|FREEZE|FROM|FULL|FUNCTION|G|GENERAL|GENERATED|GET|GLOBAL|GO|GOTO|GRANT|GRANTED|GROUP|GROUPING|HANDLER|HAVING|HIERARCHY|HOLD|HOST|HOUR|IDENTITY|IGNORE|ILIKE|IMMEDIATE|IMMUTABLE|IMPLEMENTATION|IN|INCREMENT|INDEX|INDICATOR|INFIX|INHERITS|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSENSITIVE|INSERT|INSTANCE|INSTANTIABLE|INSTEAD|INTERSECT|INTERVAL|INTO|INVOKER|IS|ISNULL|ISOLATION|ITERATE|JOIN|K|KEY|KEY_MEMBER|KEY_TYPE|LANCOMPILER|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LEFT|LENGTH|LESS|LEVEL|LIKE|LIMIT|LISTEN|LOAD|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATION|LOCATOR|LOCK|LOWER|M|MAP|MATCH|MAX|MAXVALUE|MESSAGE_LENGTH|MESSAGE_OCTET_LENGTH|MESSAGE_TEXT|METHOD|MIN|MINUTE|MINVALUE|MOD|MODE|MODIFIES|MODIFY|MODULE|MONTH|MORE|MOVE|MUMPS|NAME|NAMES|NATIONAL|NATURAL|NEW|NEXT|NO|NOCREATEDB|NOCREATEUSER|NONE|NOT|NOTHING|NOTIFY|NOTNULL|NULL|NULLABLE|NULLIF|NUMBER|NUMERIC|OBJECT|OCTET_LENGTH|OF|OFF|OFFSET|OIDS|OLD|ON|ONLY|OPEN|OPERATION|OPERATOR|OPTION|OPTIONS|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|OVERLAPS|OVERLAY|OVERRIDING|OWNER|PAD|PARAMETER|PARAMETER_MODE|PARAMETER_NAME|PARAMETER_ORDINAL_POSITION|PARAMETER_SPECIFIC_CATALOG|PARAMETER_SPECIFIC_NAME|PARAMETER_SPECIFIC_SCHEMA|PARAMETERS|PARTIAL|PASCAL|PASSWORD|PATH|PENDANT|PLI|POSITION|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURAL|PROCEDURE|PUBLIC|READ|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|REINDEX|RELATIVE|RENAME|REPEATABLE|REPLACE|RESET|RESTRICT|RESULT|RETURN|RETURNED_LENGTH|RETURNED_OCTET_LENGTH|RETURNED_SQLSTATE|RETURNS|REVOKE|RIGHT|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROUTINE_CATALOG|ROUTINE_NAME|ROUTINE_SCHEMA|ROW|ROW_COUNT|ROWS|RULE|SAVEPOINT|SCALE|SCHEMA|SCHEMA_NAME|SCOPE|SCROLL|SEARCH|SECOND|SECTION|SECURITY|SELECT|SELF|SENSITIVE|SEQUENCE|SERIALIZABLE|SERVER_NAME|SESSION|SESSION_USER|SET|SETOF|SETS|SHARE|SHOW|SIMILAR|SIMPLE|SIZE|SOME|SOURCE|SPACE|SPECIFIC|SPECIFIC_NAME|SPECIFICTYPE|SQL|SQLCODE|SQLERROR|SQLEXCEPTION|SQLSTATE|SQLWARNING|STABLE|START|STATE|STATEMENT|STATIC|STATISTICS|STDIN|STDOUT|STRUCTURE|STYLE|SUBCLASS_ORIGIN|SUBLIST|SUBSTRING|SUM|SYMMETRIC|SYSID|SYSTEM|SYSTEM_USER|TABLE|TABLE_NAME|TEMP|TEMPLATE|TEMPORARY|TERMINATE|THAN|THEN|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TOAST|TRAILING|TRANSACTION|TRANSACTION_ACTIVE|TRANSACTIONS_COMMITTED|TRANSACTIONS_ROLLED_BACK|TRANSFORM|TRANSFORMS|TRANSLATE|TRANSLATION|TREAT|TRIGGER|TRIGGER_CATALOG|TRIGGER_NAME|TRIGGER_SCHEMA|TRIM|TRUNCATE|TRUSTED|TYPE|UNCOMMITTED|UNDER|UNENCRYPTED|UNION|UNIQUE|UNKNOWN|UNLISTEN|UNNAMED|UNNEST|UNTIL|UPDATE|UPPER|USAGE|USER|USER_DEFINED_TYPE_CATALOG|USER_DEFINED_TYPE_NAME|USER_DEFINED_TYPE_SCHEMA|USING|VACUUM|VALID|VALUE|VALUES|VARIABLE|VARYING|VERBOSE|VERSION|VIEW|VOLATILE|WHEN|WHENEVER|WHERE|WITH|WITHOUT|WORK|WRITE|YEAR|ZONE|FALSE|TRUE)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^(?:\+|-|\*|\/|\|\||\|\/|\|\|\/|!|!!|@|&|\||#|<<|>>|%|\^|=|!=|<>|<|<=|>|>=|~|~\*|!~|!~\*|\^=|:=|=>|\*\*|\.\.|AND|OR|NOT|##|&&|&<|&>|<->|<\^|>\^|\?#|\?-|\?-\||@-@|\?\||\?\|\||@@|~=|<<=|>>=)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:ABS|CBRT|CEIL|DEGREES|EXP|FLOOR|LN|LOG|MOD|PI|POW|RADIANS|RANDOM|ROUND|SIGN|SQRT|TRUNC|ACOS|ASIN|ATAN|ATAN2|COS|COT|SIN|TAN|BIT_LENGTH|CHAR_LENGTH|CHARACTER_LENGTH|LOWER|OCTET_LENGTH|POSITION|SUBSTRING|TRIM|UPPER|ASCII|BTRIM|CHR|CONVERT|INITCAP|LENGTH|LPAD|LTRIM|PG_CLIENT_ENCODING|REPEAT|RPAD|RTRIM|STRPOS|SUBSTR|TO_ASCII|TRANSLATE|ENCODE|DECODE|TO_CHAR|TO_DATE|TO_TIMESTAMP|TO_NUMBER|AGE|DATE_PART|DATE_TRUNC|EXTRACT|ISFINITE|NOW|TIMEOFDAY|TIMESTAMP|EXTRACT|AREA|BOX|CENTER|DIAMETER|HEIGHT|ISCLOSED|ISOPEN|PCLOSE|NPOINT|POPEN|RADIUS|WIDTH|BOX|CIRCLE|LSEG|PATH|POINT|POLYGON|BROADCAST|HOST|MASKLEN|SET_MASKLEN|NETMASK|NETWORK|ABBREV|NEXTVAL|CURRVAL|SETVAL|COALESCE|NULLIF|HAS_TABLE_PRIVILEGE|PG_GET_VIEWDEF|PG_GET_RULEDEF|PG_GET_INDEXDEF|PG_GET_USERBYID|OBJ_DESCRIPTION|COL_DESCRIPTION|AVG|COUNT|MAX|MIN|STDDEV|SUM|VARIANCE)\b/.exec(this.str)) && this.hl(m[0], 'dsFunction')) continue;
            if((m = /^(?:LZTEXT|BIGINT|INT2|INT8|BIGSERIAL|SERIAL8|BIT|BIT VARYING|VARBIT|BOOLEAN|BOOL|BOX|BYTEA|CHARACTER|CHAR|CHARACTER VARYING|VARCHAR|CIDR|CIRCLE|DATE|DOUBLE PRECISION|FLOAT8|INET|INTEGER|INT|INT4|INTERVAL|LINE|LSEG|MACADDR|MONEY|NUMERIC|DECIMAL|OID|PATH|POINT|POLYGON|REAL|SMALLINT|SERIAL|TEXT|TIME|TIMETZ|TIMESTAMP|TIMESTAMPTZ|TIMESTAMP WITH TIMEZONE)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%bulk_exceptions\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%bulk_rowcount\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%found\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%isopen\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%notfound\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%rowcount\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%rowtype\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^%type\b/i.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this['sql-postgresql_string']())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '-' && this.str[1] == '-' && this.hl('--', 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '/' && this.str[1] == '*' && this.hl('/*', 'dsComment')) {if(m = this['sql-postgresql_multiLineComment']())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^rem\b/i.exec(this.str)) && this.hl(m[0], 'dsComment')) {if(m = this['sql-postgresql_singleLineComment']())return this.pop(), m-1;continue;}
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) {if(m = this['sql-postgresql_identifier']())return this.pop(), m-1;continue;}
            if((m = /^[:&]/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^\/(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
            if(this.col === 0 && (m = /^@@?[^@ \t\r\n]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {if(m = this['sql-postgresql_preprocessor']())return this.pop(), m-1;continue;}
            if((m = /^\$([^\$\n\r]*)\$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {if(m = this['sql-postgresql_multiLineString']())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    'sql-postgresql_multiLineString': function sqlpostgresql_multiLineString(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$%1\$/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    'sql-postgresql_string': function sqlpostgresql_string(m) {
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
    'sql-postgresql_singleLineComment': function sqlpostgresql_singleLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'sql-postgresql_multiLineComment': function sqlpostgresql_multiLineComment(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\\\n/.exec(this.str)) && this.hl(m[0], 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.str[1] == '/' && this.hl('*/', 'dsComment')) return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    },
    'sql-postgresql_identifier': function sqlpostgresql_identifier(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsOthers')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    'sql-postgresql_preprocessor': function sqlpostgresql_preprocessor(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    }
};
