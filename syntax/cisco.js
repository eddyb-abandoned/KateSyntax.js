KateSyntax.langs.cisco.syntax = {
    default: 'cisco_base',
    cisco_base: function cisco_base(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\bdone\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bdo\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\belif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bif\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bfi\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\bcase\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\besac\b/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.col === 0 && (m = /^[^()]+\)/i.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == ';' && this.str[1] == ';' && this.hl(';;', 'dsKeyword')) continue;
            if(this.str[0] == '{' && this.hl('{', 'dsKeyword')) continue;
            if(this.str[0] == '}' && this.hl('}', 'dsKeyword')) continue;
            if((m = /^(?:aaa|access-list|address|alias|arp|async-bootp|banner|boot|bridge|buffers|busy-message|call-history-mib|cdp|chat-script|class-map|clock|cns|config-register|controller|crypto|default|default-value|dialer|dialer-list|dnsix-dmdp|dnsix-nat|downward-compatible-config|enable|end|exception|exit|file|frame-relay|help|hostname|interface|ip|isdn|isdn-mib|kerberos|key|line|logging|login-string|map-class|map-list|memory-size|menu|modemcap|multilink|netbios|no|ntp|partition|policy-map|priority-list|privilege|process-max-time|prompt|queue-list|resume-string|rlogin|rmon|route-map|router|rtr|scheduler|service|snmp-server|sntp|stackmaker|state-machine|subscriber-policy|tacacs-server|template|terminal-queue|tftp-server|time-range|username|virtual-profile|virtual-template|vpdn|vpdn-group|x25|x29)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            if((m = /^(?:accounting|accounting-list|accounting-threshold|accounting-transits|address-pool|as-path|audit|auth-proxy|authentication|authorization|bgp-community|bootp|cef|classless|community-list|default-gateway|default-network|dhcp|dhcp-server|domain-list|domain-lookup|domain-name|dvmrp|exec-callback|extcommunity-list|finger|flow-aggregation|flow-cache|flow-export|forward-protocol|ftp|gratuitous-arps|host|host-routing|hp-host|http|icmp|inspect|local|mrm|mroute|msdp|multicast|multicast-routing|name-server|nat|new-model|ospf|password|password-encryption|pgm|pim|port-map|prefix-list|radius|rcmd|reflexive-list|route|routing|rsvp|rtcp|sap|sdr|security|source-route|subnet-zero|tacacs|tcp|tcp-small-servers|telnet|tftp|timestamps|udp-small-servers|vrf|wccp)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^(?:accounting|accounting-list|accounting-threshold|accounting-transits|address-pool|as-path|audit|auth-proxy|authentication|authorization|bgp-community|bootp|cef|classless|community-list|default-gateway|default-network|dhcp|dhcp-server|domain-list|domain-lookup|domain-name|dvmrp|exec-callback|extcommunity-list|finger|flow-aggregation|flow-cache|flow-export|forward-protocol|ftp|gratuitous-arps|host|host-routing|hp-host|http|icmp|inspect|local|mrm|mroute|msdp|multicast|multicast-routing|name-server|nat|new-model|ospf|password|password-encryption|pgm|pim|port-map|prefix-list|radius|rcmd|reflexive-list|route|routing|rsvp|rtcp|sap|sdr|security|source-route|subnet-zero|tacacs|tcp|tcp-small-servers|telnet|tftp|timestamps|udp-small-servers|vrf|wccp)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
            if((m = /^\$[A-Za-z0-9_?{}!]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if((m = /^".*?"/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
            if((m = /^[|<>=;]/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) {if(m = this.cisco_singleQuote())return this.pop(), m-1;continue;}
            if(this.str[0] == '`' && this.hl('`', 'dsOthers')) {if(m = this.cisco_substitution())return this.pop(), m-1;continue;}
            if(this.str[0] == '\\' && this.str[1] == '#' && this.hl('\\#', 'dsNormal')) continue;
            if((m = /^#.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    cisco_string: function cisco_string(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '"' && this.hl('\\"', 'dsString')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    cisco_singleQuote: function cisco_singleQuote(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '\'' && this.hl('\\\'', 'dsString')) continue;
            if(this.str[0] == '\'' && this.hl('\'', 'dsString')) return this.pop();
            this.hl(this.str[0], 'dsString');
        }
        this.pop();
    },
    cisco_substitution: function cisco_substitution(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '\\' && this.str[1] == '\\' && this.hl('\\\\', 'dsString')) continue;
            if(this.str[0] == '\\' && this.str[1] == '`' && this.hl('\\`', 'dsString')) continue;
            if(this.str[0] == '`' && this.hl('`', 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    },
    cisco_parameter: function cisco_parameter(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^\$[A-Za-z0-9_?]+/.exec(this.str)) && this.hl(m[0], 'dsOthers')) return this.pop();
            this.hl(this.str[0], 'dsOthers');
        }
        this.pop();
    }
};
