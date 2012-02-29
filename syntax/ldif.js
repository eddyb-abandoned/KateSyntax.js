var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._ctxStart();
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
HL.prototype._ctxStart = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == ':' && this.hl(':', 'dsKeyword')) {this._ctxEncoded();continue;}
        if(this.str[0] == '<' && this.hl('<', 'dsKeyword')) {this._ctxURL();continue;}
        if((m = /^[^:<]/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._ctxStandard();continue;}
        if((m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ctxEncoded = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\s.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ctxURL = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\s+[\w]+://[\w/.]+/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^\s.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ctxStandard = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\{\w+\}.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) {this._ctxEncrypted();continue;}
        if((m = /^(?:IPPhone|URL|aRecord|aliasedEntryName|aliasedObjectName|associatedDomain|associatedName|audio|authorityRevocationList|bootFile|bootParameter|buildingName|businessCategory|c|cACertificate|cNAMERecord|certificateRevocationList|cn|comment|commonName|conferenceInformation|corbaContainer|corbaRepositoryId|countryName|crossCertificatePair|custom1|custom2|custom3|custom4|dITRedirect|dSAQuality|dc|deltaRevocationList|description|destinationIndicator|distinguishedName|dmdName|dnQualifier|documentAuthor|documentIdentifier|documentLocation|documentPublisher|documentTitle|documentVersion|domainComponent|enhancedSearchGuide|facsimileTelephoneNumber|fax|gecos|generationQualifier|gidNumber|givenName|gn|homeDirectory|homePostalAddress|homeUrl|host|houseIdentifier|info|initials|internationaliSDNNumber|ipHostNumber|ipNetmaskNumber|ipNetworkNumber|ipProtocolNumber|ipServicePort|ipServiceProtocol|janetMailbox|javaClassNames|javaCodebase|javaContainer|javaDoc|javaFactory|javaReferenceAddress|javaSerializedData|knowledgeInformation|l|labeledURI|lastModifiedBy|lastModifiedTime|lmpassword|localityName|loginShell|mDRecord|mXRecord|macAddress|mail|manager|member|memberNisNetgroup|memberUid|mozillaHomeCountryName|mozillaHomeFriendlyCountryName|mozillaHomeLocalityName|mozillaHomePostalAddress2|mozillaHomePostalCode|mozillaHomeState|mozillaPostalAddress2|mozillaSecondemail|nSRecord|name|nisMapEntry|nisMapName|nisNetgroupTriple|ntpasswd|o|objectClass|oncRpcNumber|organizationName|organizationalStatus|organizationalUnitName|otherFacsimiletelephoneNumber|otherMailbox|ou|owner|personalSignature|personalTitle|photo|physicalDeliveryOfficeName|postOfficeBox|postalAddress|postalCode|preferredDeliveryMethod|presentationAddress|protocolInformation|rdn|registeredAddress|reports|rfc822Mailbox|roleOccupant|roomNumber|sOARecord|searchGuide|secretary|seeAlso|serialNumber|shadowExpire|shadowFlag|shadowInactive|shadowLastChange|shadowMax|shadowMin|shadowWarning|singleLevelQuality|sn|st|stateOrProvinceName|street|streetAddress|subtreeMaximumQuality|subtreeMinimumQuality|supportedAlgorithms|supportedApplicationContext|surname|telephoneNumber|teletexTerminalIdentifier|telexNumber|textEncodedORAddress|title|uid|uidNumber|uniqueIdentifier|uniqueMember|userCertificate|userClass|userPassword|userid|workUrl|x121Address|x500UniqueIdentifier|xmozillaNickname|xmozillaUseHtmlMail|xmozillanickname|xmozillausehtmlmail)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:RFC822localPart|SUP|account|alias|applicationEntity|applicationProcess|bootableDevice|cRLDistributionPoint|certificationAuthority|certificationAuthority-V2|corbaObject|corbaObjectReference|country|dNSDomain|dSA|dcObject|deltaCRL|device|dmd|document|documentSeries|domain|domainRelatedObject|friendlyCountry|groupOfNames|groupOfUniqueNames|ieee802Device|inetOrgPerson|ipHost|ipNetwork|ipProtocol|ipService|javaClassName|javaMarshalledObject|javaNamingReference|javaObject|javaSerializedObject|labeledURIObject|locality|mozillaAbPersonObsolete|nisMap|nisNetgroup|nisObject|officePerson|oncRpc|organization|organizationalPerson|organizationalRole|organizationalUnit|pager|pagerTelephoneNumber|person|pilotDSA|pilotObject|pilotOrganization|pkiCA|pkiUser|posixAccount|posixGroup|qualityLabelledData|residentialPerson|rid|room|sambaAccount|shadowAccount|simpleSecurityObject|strongAuthenticationUser|telephoneNumber|top|uid|uidNumber|uidObject|userSecurityInformation|userid|xmozillaanyphone|zillaPerson)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if((m = /^[a-zA-Z0-9\-]+=/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._ctxEncrypted = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\s.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if((m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._#pop#pop();continue;}
        this.hl(this.str[0], 'dsString');
    }
};
