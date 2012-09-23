KateSyntax.langs.apache.syntax = {
    default: 'apache_apache',
    apache_apache: function apache_apache(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:AcceptFilter|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|Anonymous|AuthBasicProvider|AuthDBMGroupFile|AuthDBMUserFile|AuthDigestDomain|AuthDigestFile|AuthDigestGroupFile|AuthDigestNonceFormat|AuthDigestProvider|AuthGroupFile|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPGroupAttribute|AuthLDAPUrl|AuthName|AuthUserFile|BrowserMatch|BrowserMatchNoCase|BS2000Account|CacheDisable|CacheEnable|CacheFile|CacheGcClean|CacheGcUnused|CacheRoot|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CookieDomain|CookieLog|CookieName|CoreDumpDirectory|CustomLog|Dav|DavGenericLockDB|DavLockDB|DBDParams|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultType|DeflateFilterNote|Deny|DirectoryIndex|DocumentRoot|ErrorDocument|ErrorLog|Example|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceType|ForensicLog|Group|Header|HeaderName|ImapBase|Include|IndexIgnore|IndexOptions|IndexStyleSheet|ISAPICacheFile|LanguagePriority|LDAPSharedCacheFile|LDAPTrustedCA|LDAPTrustedCAType|LDAPTrustedClientCert|LDAPTrustedGlobalCert|Listen|LoadFile|LoadModule|LockFile|LogFormat|MetaDir|MetaSuffix|MimeMagicFile|MMapFile|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|PassEnv|PidFile|ProxyBlock|ProxyDomain|ProxyPass|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyRemote|ProxyRemoteMatch|ReadmeName|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|Require|RewriteBase|RewriteCond|RewriteLock|RewriteLog|RewriteMap|RewriteRule|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptLog|ScriptSock|SecureListen|ServerAdmin|ServerAlias|ServerName|ServerPath|ServerRoot|SetEnv|SetEnvIf|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCryptoDevice|SSLHonorCiperOrder|SSLPassPhraseDialog|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCipherSuite|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLRandomSeed|SSLRequire|SSLRequireSSL|SSLUserName|SuexecUserGroup|TransferLog|TypesConfig|UnsetEnv|User|UserDir|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|Win32DisableAcceptEx)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF;fontStyle:normal;fontWeight:bold')) {if(m = this.apache_stringDirectives())return this.pop(), m-1;continue;}
            if((m = /^(?:AllowCONNECT|AssignUserID|AuthDigestNonceLifetime|AuthDigestShmemSize|CacheDefaultExpire|CacheDirLength|CacheDirLevels|CacheForceCompletion|CacheGcDaily|CacheGcInterval|CacheGcMemUsage|CacheLastModifiedFactor|CacheMaxExpire|CacheMaxFileSize|CacheMinFileSize|CacheSize|CacheTimeMargin|ChildPerUserID|CookieExpires|DavMinTimeout|DBDExptime|DBDKeep|DBDMax|DBDMin|DBDPersist|DeflateBufferSize|DeflateCompressionLevel|DeflateMemLevel|DeflateWindowSize|IdentityCheckTimeout|ISAPIReadAheadBuffer|KeepAliveTimeout|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionTimeout|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPSharedCacheSize|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldsize|LimitRequestLine|LimitXMLRequestBody|ListenBacklog|MaxClients|MaxKeepAliveRequests|MaxMemFree|MaxRequestsPerChild|MaxRequestsPerThread|MaxSpareServers|MaxSpareThreads|MaxThreads|MaxThreadsPerChild|MCacheMaxObjectCount|MCacheMaxObjectSize|MCacheMaxStreamingBuffer|MCacheMinObjectSize|MCacheSize|MinSpareServers|MinSpareThreads|NumServers|ProxyIOBufferSize|ProxyMaxForwards|ProxyReceiveBufferSize|ProxyTimeout|RewriteLogLevel|RLimitCPU|RLimitMEM|RLimitNPROC|ScriptLogBuffer|ScriptLogLength|SendBufferSize|ServerLimit|SSLProxyVerifyDepth|SSLSessionCacheTimeout|SSLVerifyDepth|StartServers|StartThreads|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF;fontStyle:normal;fontWeight:bold')) {if(m = this.apache_integerDirectives())return this.pop(), m-1;continue;}
            if((m = /^(?:AcceptMutex|AcceptPathInfo|AllowEncodedSlashes|AllowOverride|Anonymous_Authoritative|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AuthAuthoritative|AuthBasicAuthoritative|AuthBasicProvider|AuthDBMAuthoritative|AuthDBMType|AuthDefaultAuthoritative|AuthDigestAlgorithm|AuthDigestNcCheck|AuthDigestQop|AuthLDAPAuthoritative|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPEnabled|AuthLDAPFrontPageHack|AuthLDAPGroupAttributeIsDN|AuthLDAPRemoteUserIsDN|AuthType|AuthzDBMAuthoritative|AuthzDBMType|AuthzDefaultAuthoritative|AuthzGroupFileAuthoritative|AuthzLDAPAuthoritative|AuthzOwnerAuthoritative|AuthzUserAuthoritative|BufferedLogs|CacheExpiryCheck|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheNegotiatedDocs|CacheStoreNoStore|CacheStorePrivate|CheckSpelling|ContentDigest|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DavDepthInfinity|DirectorySlash|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|ExpiresActive|ExtendedStatus|FileETag|ForceLanguagePriority|HostnameLookups|IdentityCheck|ImapDefault|ImapMenu|IndexOrderDefault|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPIFakeAsync|ISAPILogNotSupported|KeepAlive|LDAPTrustedMode|LDAPVerifyServerCert|LogLevel|MCacheRemovalAlgorithm|MetaFiles|ModMimeUsePathInfo|MultiviewsMatch|Options|Order|ProtocolEcho|ProxyBadHeader|ProxyErrorOverride|ProxyPreserveHost|ProxyRequests|ProxyVia|RewriteEngine|RewriteOptions|Satisfy|ScriptInterpreterSource|ServerSignature|ServerTokens|SSLEngine|SSLMutex|SSLOptions|SSLProtocol|SSLProxyEngine|SSLProxyVerify|SSLSessionCache|SSLVerifyClient|UseCanonicalName|XBitHack)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers;color:#0000FF;fontStyle:normal;fontWeight:bold')) {if(m = this.apache_alternativeDirectives())return this.pop(), m-1;continue;}
            if((m = /^<\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.apache_containerOpen())return this.pop(), m-1;continue;}
            if((m = /^<\/\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {if(m = this.apache_containerClose())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsComment')) {if(m = this.apache_comment())return this.pop(), m-1;continue;}
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    apache_stringDirectives: function apache_stringDirectives(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^[^#]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsString')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsError')) {if(m = this.apache_alert())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsOthers;color:#0000FF;fontStyle:normal;fontWeight:bold');
        }
        this.pop();
    },
    apache_integerDirectives: function apache_integerDirectives(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.apache_integerDirectives())return this.pop(), m-1;continue;}
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {if(m = this.apache_integerDirectives())return this.pop(), m-1;continue;}
            if(this.str[0] == '#' && this.hl('#', 'dsError')) {if(m = this.apache_alert())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    apache_alternativeDirectives: function apache_alternativeDirectives(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:On|Off|Default|flock|fcntl|posixsem|pthread|sysvsem|All|None|AuthConfig|FileInfo|Indexes|Limit|Options|ExecCGI|FollowSymLinks|Includes|IncludesNOEXEC|Indexes|MultiViews|SymLinksIfOwnerMatch|StdEnvVars|CompatEnvVars|ExportCertData|FakeBasicAuth|StrictRequire|OptRenegotiate|SDBM|GDBM|NDBM|DB|MD5|MD5-sess|auth|auth-int|never|searching|finding|always|Basic|Digest|Connection|Keep-Alive|Proxy-Authenticate|Proxy-Authorization|TE|Trailers|Transfer-Encoding|Upgrade|Netscape|Cookie|Cookie2|RFC2109|RFC2965|INode|MTime|Size|Prefer|Fallback|Double|error|nocontent|map|referer|formatted|semiformatted|unformatted|Ascending|Descending|Name|Date|Size|Description|SSL|TLS|STARTTLS|emerg|alert|crit|error|warn|notice|info|debug|LRU|GDSF|Any|NegotiatedOnly|Filters|Handlers|Deny,Allow|Allow,Deny|Mutual-failure|IsError|Ignore|StartBody|Full|Block|inherit|Registry|Registry-Strict|Script|EMail|Major|Minor|Min|Minimal|Prod|ProductOnly|OS|Full|optional|posixsem|sysvsem|sem|pthread|fcntl:|flock:|file:|yes|no|SSLv2|SSLv3|TLSv1|require|optional_no_ca|nonenotnull|dbm:|shm:|dc:|DNS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '-' && this.hl('-', 'dsKeyword')) continue;
            if(this.str[0] == '+' && this.hl('+', 'dsKeyword')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsError')) {if(m = this.apache_alert())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsChar');
        }
        this.pop();
    },
    apache_comment: function apache_comment(m) {
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
    apache_containerOpen: function apache_containerOpen(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsFunction')) {if(m = this.apache_alert())return this.pop(), m-1;continue;}
            if((m = /^[^#>]*/.exec(this.str)) && m[0].length && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '#' && this.hl('#', 'dsError')) {if(m = this.apache_alert())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    apache_containerClose: function apache_containerClose(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '>' && this.hl('>', 'dsFunction')) {if(m = this.apache_alert())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsFunction');
        }
        this.pop();
    },
    apache_commentAlert: function apache_commentAlert(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '#' && this.hl('#', 'dsError')) {if(m = this.apache_alert())return this.pop(), m-1;continue;}
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    apache_alert: function apache_alert(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsError');
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
