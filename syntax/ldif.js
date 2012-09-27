KateSyntax.langs.ldif.syntax = {
    default: 'ldif_ctxStart',
    ldif_ctxStart: function ldif_ctxStart(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#808080;font-style:normal;font-weight:normal')) continue;
            if(this.str[0] == ':' && this.hl(':', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.ldif_ctxEncoded())return this.pop(), m-1;continue;}
            if(this.str[0] == '<' && this.hl('<', 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) {if(m = this.ldif_ctxURL())return this.pop(), m-1;continue;}
            if((m = /^[^:<]/.exec(this.str)) && this.hl(m[0], 'dsString;color:#008000;font-style:normal;font-weight:normal')) {if(m = this.ldif_ctxStandard())return this.pop(), m-1;continue;}
            if(this.col === 0 && (m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) continue;
            this.hl(this.str[0], 'dsString;color:#008000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    ldif_ctxEncoded: function ldif_ctxEncoded(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\s.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF8000;font-style:normal;font-weight:normal')) continue;
            if(this.col === 0 && (m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#FF8000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    ldif_ctxURL: function ldif_ctxURL(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\s+[\w]+:\/\/[\w/.]+/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if((m = /^\s.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#0000FF;font-style:normal;font-weight:normal')) continue;
            if(this.col === 0 && (m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            this.hl(this.str[0], 'dsString;color:#0000FF;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    ldif_ctxStandard: function ldif_ctxStandard(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\{\w+\}.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000;font-style:normal;font-weight:normal')) {if(m = this.ldif_ctxEncrypted())return this.pop(), m-1;continue;}
            if((m = /^(?:IPPhone|URL|aRecord|aliasedEntryName|aliasedObjectName|associatedDomain|associatedName|audio|authorityRevocationList|bootFile|bootParameter|buildingName|businessCategory|c|cACertificate|cNAMERecord|certificateRevocationList|cn|comment|commonName|conferenceInformation|corbaContainer|corbaRepositoryId|countryName|crossCertificatePair|custom1|custom2|custom3|custom4|dITRedirect|dSAQuality|dc|deltaRevocationList|description|destinationIndicator|distinguishedName|dmdName|dnQualifier|documentAuthor|documentIdentifier|documentLocation|documentPublisher|documentTitle|documentVersion|domainComponent|enhancedSearchGuide|facsimileTelephoneNumber|fax|gecos|generationQualifier|gidNumber|givenName|gn|homeDirectory|homePostalAddress|homeUrl|host|houseIdentifier|info|initials|internationaliSDNNumber|ipHostNumber|ipNetmaskNumber|ipNetworkNumber|ipProtocolNumber|ipServicePort|ipServiceProtocol|janetMailbox|javaClassNames|javaCodebase|javaContainer|javaDoc|javaFactory|javaReferenceAddress|javaSerializedData|knowledgeInformation|l|labeledURI|lastModifiedBy|lastModifiedTime|lmpassword|localityName|loginShell|mDRecord|mXRecord|macAddress|mail|manager|member|memberNisNetgroup|memberUid|mozillaHomeCountryName|mozillaHomeFriendlyCountryName|mozillaHomeLocalityName|mozillaHomePostalAddress2|mozillaHomePostalCode|mozillaHomeState|mozillaPostalAddress2|mozillaSecondemail|nSRecord|name|nisMapEntry|nisMapName|nisNetgroupTriple|ntpasswd|o|objectClass|oncRpcNumber|organizationName|organizationalStatus|organizationalUnitName|otherFacsimiletelephoneNumber|otherMailbox|ou|owner|personalSignature|personalTitle|photo|physicalDeliveryOfficeName|postOfficeBox|postalAddress|postalCode|preferredDeliveryMethod|presentationAddress|protocolInformation|rdn|registeredAddress|reports|rfc822Mailbox|roleOccupant|roomNumber|sOARecord|searchGuide|secretary|seeAlso|serialNumber|shadowExpire|shadowFlag|shadowInactive|shadowLastChange|shadowMax|shadowMin|shadowWarning|singleLevelQuality|sn|st|stateOrProvinceName|street|streetAddress|subtreeMaximumQuality|subtreeMinimumQuality|supportedAlgorithms|supportedApplicationContext|surname|telephoneNumber|teletexTerminalIdentifier|telexNumber|textEncodedORAddress|title|uid|uidNumber|uniqueIdentifier|uniqueMember|userCertificate|userClass|userPassword|userid|workUrl|x121Address|x500UniqueIdentifier|xmozillaNickname|xmozillaUseHtmlMail|xmozillanickname|xmozillausehtmlmail)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#404040;font-style:normal;font-weight:bold')) continue;
            if((m = /^(?:RFC822localPart|SUP|account|alias|applicationEntity|applicationProcess|bootableDevice|cRLDistributionPoint|certificationAuthority|certificationAuthority-V2|corbaObject|corbaObjectReference|country|dNSDomain|dSA|dcObject|deltaCRL|device|dmd|document|documentSeries|domain|domainRelatedObject|friendlyCountry|groupOfNames|groupOfUniqueNames|ieee802Device|inetOrgPerson|ipHost|ipNetwork|ipProtocol|ipService|javaClassName|javaMarshalledObject|javaNamingReference|javaObject|javaSerializedObject|labeledURIObject|locality|mozillaAbPersonObsolete|nisMap|nisNetgroup|nisObject|officePerson|oncRpc|organization|organizationalPerson|organizationalRole|organizationalUnit|pager|pagerTelephoneNumber|person|pilotDSA|pilotObject|pilotOrganization|pkiCA|pkiUser|posixAccount|posixGroup|qualityLabelledData|residentialPerson|rid|room|sambaAccount|shadowAccount|simpleSecurityObject|strongAuthenticationUser|telephoneNumber|top|uid|uidNumber|uidObject|userSecurityInformation|userid|xmozillaanyphone|zillaPerson)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#800080;font-style:normal;font-weight:bold')) continue;
            if(this.col === 0 && (m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop();
            if((m = /^[a-zA-Z0-9\-]+=/.exec(this.str)) && this.hl(m[0], 'dsString;color:#008000;font-style:normal;font-weight:bold')) continue;
            this.hl(this.str[0], 'dsString;color:#008000;font-style:normal;font-weight:normal');
        }
        this.pop();
    },
    ldif_ctxEncrypted: function ldif_ctxEncrypted(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment;color:#808080;font-style:normal;font-weight:normal')) continue;
            if((m = /^\s.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsString;color:#FF0000;font-style:normal;font-weight:normal')) continue;
            if(this.col === 0 && (m = /^[\w\-]+((;[\w\-]+)+)?:/.exec(this.str)) && this.hl(m[0], 'dsKeyword;color:#000000;font-style:normal;font-weight:bold')) return this.pop(), 1;
            this.hl(this.str[0], 'dsString;color:#FF0000;font-style:normal;font-weight:normal');
        }
        this.pop();
    }
};
