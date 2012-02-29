var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._apache();
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
HL.prototype._apache = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:AcceptFilter|AccessFileName|Action|AddAlt|AddAltByEncoding|AddAltByType|AddCharset|AddDefaultCharset|AddDescription|AddEncoding|AddHandler|AddIcon|AddIconByEncoding|AddIconByType|AddInputFilter|AddLanguage|AddModuleInfo|AddOutputFilter|AddOutputFilterByType|AddType|Alias|AliasMatch|Allow|Anonymous|AuthBasicProvider|AuthDBMGroupFile|AuthDBMUserFile|AuthDigestDomain|AuthDigestFile|AuthDigestGroupFile|AuthDigestNonceFormat|AuthDigestProvider|AuthGroupFile|AuthLDAPBindDN|AuthLDAPBindPassword|AuthLDAPCharsetConfig|AuthLDAPGroupAttribute|AuthLDAPUrl|AuthName|AuthUserFile|BrowserMatch|BrowserMatchNoCase|BS2000Account|CacheDisable|CacheEnable|CacheFile|CacheGcClean|CacheGcUnused|CacheRoot|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CookieDomain|CookieLog|CookieName|CoreDumpDirectory|CustomLog|Dav|DavGenericLockDB|DavLockDB|DBDParams|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultType|DeflateFilterNote|Deny|DirectoryIndex|DocumentRoot|ErrorDocument|ErrorLog|Example|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceType|ForensicLog|Group|Header|HeaderName|ImapBase|Include|IndexIgnore|IndexOptions|IndexStyleSheet|ISAPICacheFile|LanguagePriority|LDAPSharedCacheFile|LDAPTrustedCA|LDAPTrustedCAType|LDAPTrustedClientCert|LDAPTrustedGlobalCert|Listen|LoadFile|LoadModule|LockFile|LogFormat|MetaDir|MetaSuffix|MimeMagicFile|MMapFile|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|PassEnv|PidFile|ProxyBlock|ProxyDomain|ProxyPass|ProxyPassReverse|ProxyPassReverseCookieDomain|ProxyPassReverseCookiePath|ProxyRemote|ProxyRemoteMatch|ReadmeName|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|Require|RewriteBase|RewriteCond|RewriteLock|RewriteLog|RewriteMap|RewriteRule|ScoreBoardFile|Script|ScriptAlias|ScriptAliasMatch|ScriptLog|ScriptSock|SecureListen|ServerAdmin|ServerAlias|ServerName|ServerPath|ServerRoot|SetEnv|SetEnvIf|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSLCACertificateFile|SSLCACertificatePath|SSLCADNRequestFile|SSLCADNRequestPath|SSLCARevocationFile|SSLCARevocationPath|SSLCertificateChainFile|SSLCertificateFile|SSLCertificateKeyFile|SSLCipherSuite|SSLCryptoDevice|SSLHonorCiperOrder|SSLPassPhraseDialog|SSLProxyCACertificateFile|SSLProxyCACertificatePath|SSLProxyCARevocationFile|SSLProxyCARevocationPath|SSLProxyCipherSuite|SSLProxyMachineCertificateFile|SSLProxyMachineCertificatePath|SSLProxyProtocol|SSLRandomSeed|SSLRequire|SSLRequireSSL|SSLUserName|SuexecUserGroup|TransferLog|TypesConfig|UnsetEnv|User|UserDir|VirtualDocumentRoot|VirtualDocumentRootIP|VirtualScriptAlias|VirtualScriptAliasIP|Win32DisableAcceptEx)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) {this._stringDirectives();continue;}
        if((m = /^(?:AllowCONNECT|AssignUserID|AuthDigestNonceLifetime|AuthDigestShmemSize|CacheDefaultExpire|CacheDirLength|CacheDirLevels|CacheForceCompletion|CacheGcDaily|CacheGcInterval|CacheGcMemUsage|CacheLastModifiedFactor|CacheMaxExpire|CacheMaxFileSize|CacheMinFileSize|CacheSize|CacheTimeMargin|ChildPerUserID|CookieExpires|DavMinTimeout|DBDExptime|DBDKeep|DBDMax|DBDMin|DBDPersist|DeflateBufferSize|DeflateCompressionLevel|DeflateMemLevel|DeflateWindowSize|IdentityCheckTimeout|ISAPIReadAheadBuffer|KeepAliveTimeout|LDAPCacheEntries|LDAPCacheTTL|LDAPConnectionTimeout|LDAPOpCacheEntries|LDAPOpCacheTTL|LDAPSharedCacheSize|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldsize|LimitRequestLine|LimitXMLRequestBody|ListenBacklog|MaxClients|MaxKeepAliveRequests|MaxMemFree|MaxRequestsPerChild|MaxRequestsPerThread|MaxSpareServers|MaxSpareThreads|MaxThreads|MaxThreadsPerChild|MCacheMaxObjectCount|MCacheMaxObjectSize|MCacheMaxStreamingBuffer|MCacheMinObjectSize|MCacheSize|MinSpareServers|MinSpareThreads|NumServers|ProxyIOBufferSize|ProxyMaxForwards|ProxyReceiveBufferSize|ProxyTimeout|RewriteLogLevel|RLimitCPU|RLimitMEM|RLimitNPROC|ScriptLogBuffer|ScriptLogLength|SendBufferSize|ServerLimit|SSLProxyVerifyDepth|SSLSessionCacheTimeout|SSLVerifyDepth|StartServers|StartThreads|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._integerDirectives();continue;}
        if((m = /^(?:AcceptMutex|AcceptPathInfo|AllowEncodedSlashes|AllowOverride|Anonymous_Authoritative|Anonymous_LogEmail|Anonymous_MustGiveEmail|Anonymous_NoUserID|Anonymous_VerifyEmail|AuthAuthoritative|AuthBasicAuthoritative|AuthBasicProvider|AuthDBMAuthoritative|AuthDBMType|AuthDefaultAuthoritative|AuthDigestAlgorithm|AuthDigestNcCheck|AuthDigestQop|AuthLDAPAuthoritative|AuthLDAPCompareDNOnServer|AuthLDAPDereferenceAliases|AuthLDAPEnabled|AuthLDAPFrontPageHack|AuthLDAPGroupAttributeIsDN|AuthLDAPRemoteUserIsDN|AuthType|AuthzDBMAuthoritative|AuthzDBMType|AuthzDefaultAuthoritative|AuthzGroupFileAuthoritative|AuthzLDAPAuthoritative|AuthzOwnerAuthoritative|AuthzUserAuthoritative|BufferedLogs|CacheExpiryCheck|CacheIgnoreCacheControl|CacheIgnoreHeaders|CacheIgnoreNoLastMod|CacheNegotiatedDocs|CacheStoreNoStore|CacheStorePrivate|CheckSpelling|ContentDigest|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DavDepthInfinity|DirectorySlash|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|ExpiresActive|ExtendedStatus|FileETag|ForceLanguagePriority|HostnameLookups|IdentityCheck|ImapDefault|ImapMenu|IndexOrderDefault|ISAPIAppendLogToErrors|ISAPIAppendLogToQuery|ISAPIFakeAsync|ISAPILogNotSupported|KeepAlive|LDAPTrustedMode|LDAPVerifyServerCert|LogLevel|MCacheRemovalAlgorithm|MetaFiles|ModMimeUsePathInfo|MultiviewsMatch|Options|Order|ProtocolEcho|ProxyBadHeader|ProxyErrorOverride|ProxyPreserveHost|ProxyRequests|ProxyVia|RewriteEngine|RewriteOptions|Satisfy|ScriptInterpreterSource|ServerSignature|ServerTokens|SSLEngine|SSLMutex|SSLOptions|SSLProtocol|SSLProxyEngine|SSLProxyVerify|SSLSessionCache|SSLVerifyClient|UseCanonicalName|XBitHack)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._alternativeDirectives();continue;}
        if((m = /^<\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._containerOpen();continue;}
        if((m = /^</\w+/.exec(this.str)) && this.hl(m[0], 'dsFunction')) {this._containerClose();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsComment')) {this._comment();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._stringDirectives = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^#]*/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsError')) {this._alert();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsOthers');
    }
};
HL.prototype._integerDirectives = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._integerDirectives();continue;}
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) {this._integerDirectives();continue;}
        if(this.str[0] == '#' && this.hl('#', 'dsError')) {this._alert();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
    }
};
HL.prototype._alternativeDirectives = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:On|Off|Default|flock|fcntl|posixsem|pthread|sysvsem|All|None|AuthConfig|FileInfo|Indexes|Limit|Options|ExecCGI|FollowSymLinks|Includes|IncludesNOEXEC|Indexes|MultiViews|SymLinksIfOwnerMatch|StdEnvVars|CompatEnvVars|ExportCertData|FakeBasicAuth|StrictRequire|OptRenegotiate|SDBM|GDBM|NDBM|DB|MD5|MD5-sess|auth|auth-int|never|searching|finding|always|Basic|Digest|Connection|Keep-Alive|Proxy-Authenticate|Proxy-Authorization|TE|Trailers|Transfer-Encoding|Upgrade|Netscape|Cookie|Cookie2|RFC2109|RFC2965|INode|MTime|Size|Prefer|Fallback|Double|error|nocontent|map|referer|formatted|semiformatted|unformatted|Ascending|Descending|Name|Date|Size|Description|SSL|TLS|STARTTLS|emerg|alert|crit|error|warn|notice|info|debug|LRU|GDSF|Any|NegotiatedOnly|Filters|Handlers|Deny,Allow|Allow,Deny|Mutual-failure|IsError|Ignore|StartBody|Full|Block|inherit|Registry|Registry-Strict|Script|EMail|Major|Minor|Min|Minimal|Prod|ProductOnly|OS|Full|optional|posixsem|sysvsem|sem|pthread|fcntl:|flock:|file:|yes|no|SSLv2|SSLv3|TLSv1|require|optional_no_ca|nonenotnull|dbm:|shm:|dc:|DNS)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if(this.str[0] == '-' && this.hl('-', 'dsKeyword')) continue;
        if(this.str[0] == '+' && this.hl('+', 'dsKeyword')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsError')) {this._alert();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsChar');
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
HL.prototype._containerOpen = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsFunction')) {this._alert();continue;}
        if((m = /^[^#>]*/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '#' && this.hl('#', 'dsError')) {this._alert();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._containerClose = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>' && this.hl('>', 'dsFunction')) {this._alert();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._commentAlert = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '#' && this.hl('#', 'dsError')) {this._alert();continue;}
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._alert = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '\n') return;
        this.hl(this.str[0], 'dsError');
    }
};
