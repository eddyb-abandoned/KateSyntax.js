(function() {
    window.KateSyntax = window.KateSyntax || {};

    function timeStart(name) {
        if(KateSyntax.debugTime)
            console.time(name);
    }

    function timeEnd(name) {
        if(KateSyntax.debugTime)
            console.timeEnd(name);
    }

    function _doHL(m, s) {
        if(s && KateSyntax.debugTrace)
            console.log([], JSON.stringify(m).slice(1,-1), s);

        if(s === 'dsNormal')
            s = null;

        this.str = this.str.slice(m.length);
        this.pos += m.length;

        var lastNewline = m.lastIndexOf('\n');
        if(lastNewline === -1)
            this.col += m.length;
        else
            this.col = m.length-lastNewline-1;

        var lines = m.match(/\n/g);
        this.line += lines && lines.length;

        if(this.style === s) {
            this.hlText += m;
            return true;
        }
        if(this.hlText.length) {
            var el;
            if(this.oldCache && this.oldCacheEnd === -1) {
                var oldEl = this.oldCache[this.oldCacheIdx];
                if(oldEl) {
                    if(!!this.style != (oldEl.nodeType === 1))
                        this.oldCacheEnd = this.oldCacheIdx;
                    else {
                        if(oldEl.nodeType === 1) {
                            if(oldEl.className != this.styleClass)
                                this.oldCacheEnd = this.oldCacheIdx;
                            else {
                                oldEl.style.cssText = this.styleExtra;
                                el = oldEl;
                                oldEl = oldEl.firstChild;
                            }
                        }
                        if(oldEl.nodeType === 3) {
                            oldEl.data = this.hlText;
                            if(!el)
                                el = oldEl;
                            this.oldCacheIdx++;
                        }
                    }
                }
            }
            if(!el) {
                el = document.createTextNode(this.hlText);
                if(this.style) {
                    var textElem = el;
                    el = document.createElement('span');
                    el.appendChild(textElem);
                    el.className = this.styleClass;
                    el.style.cssText = this.styleExtra;
                }
            }
            if(this.cache)
                this.cache.push(el);
            if(!this.oldCache)
                this.root.appendChild(el);
            /*var c1 = this.cache[this.style];
            if(!c1)
                (this.cache[this.style] = {})[m] = [el];
            else {
                var c2 = c1[m];
                if(!c2)
                    c1[m] = [el];
                else
                    c2.push(el);
            }*/
        }
        this.style = s;
        if(s) {
            var extraStart = s.indexOf(';');
            if(extraStart === -1) {
                this.styleClass = s;
                this.styleExtra = null;
            } else {
                this.styleClass = s.slice(0, extraStart);
                this.styleExtra = s.slice(extraStart+1);
            }
        } else
            this.styleClass = this.styleExtra = null;
        this.hlText = m;
        return true;
    }

    function push() {
        if(KateSyntax.debugTrace)
            console.groupCollapsed(push.caller.name);
        /*if(this.stack)
            this.stack = this.stack.concat([push.caller]);*/
    }

    function pop() {
        if(KateSyntax.debugTrace)
            console.groupEnd();
        /*if(this.stack)
            this.stack = this.stack.slice(0, -1);*/
    }

    function run(data) {
        this.str = data;
        this.pos = 0;
        this.len = data.length;
        this.col = 0;
        this.line = 0;
        timeStart(this.id);
        this[this.default]();
        timeEnd(this.id);
        if(this.pos < this.len)
            console.error('Failed to finish', id+':', this.pos+'/'+this.len);
        this.hl('');
        if(this.cache) {
            if(this.oldCache) {
                if(this.oldCacheEnd === -1)
                    this.oldCacheEnd = this.oldCacheIdx;
                //console.log(this.oldCacheEnd, this.oldCache, this.cache);
                //for(var i = this.oldCacheEnd; i < this.oldCache.length; i++)
                //    this.root.removeChild(this.oldCache[i]);
                for(var i = 0, nodes = this.root.childNodes, n = nodes.length; i < n; i++)
                    if(this.oldCache.indexOf(nodes[i]) >= this.oldCacheEnd)
                        while(i < nodes.length)
                                this.root.removeChild(nodes[i]);
                for(var i = Math.max(this.oldCacheEnd-1, 0); i < this.cache.length; i++)
                    this.root.appendChild(this.cache[i]);
            }
            this.oldCache = this.cache;
            this.oldCacheIdx = 0;
            this.oldCacheEnd = -1;
            this.cache = [];
        }
    }

    function make(syntax, id) {
        var hl = Object.create(syntax);
        hl.hlText = '';
        hl.style = null;
        //hl.stack = [];
        //hl.cache = {};
        hl.cache = [];
        hl.oldCache = null;
        hl.oldCacheIdx = 0;
        hl.id = id;
        hl.hl = _doHL;
        hl.push = push;
        hl.pop = pop;
        hl.run = run;
        return hl;
    }

    function find(file) {
        if(!KateSyntax.langs)
            return;
        var r;
        if(file.mime)
            for(var i in KateSyntax.langs)
                if((r = KateSyntax.langs[i].mime) && r.test(file.mime))
                    return i;
        var basename = file.file && file.file.replace(/^([^/]*\/)*/, '');
        if(file.file)
            for(var i in KateSyntax.langs)
                if((r = KateSyntax.langs[i].file) && (r.test(file.file) || r.test(basename)))
                    return i;
    }

    KateSyntax.getHighlighter = function getHighlighter(file, cb) {
        var lang = find(file);
        if(!lang)
            return cb();
        var id = file.file ? file.file + '(' + lang + ')' : lang;
        var langInfo = KateSyntax.langs[lang];
        if(langInfo.syntax)
            return cb(make(langInfo.syntax, id));
        var todo = [cb, id];
        if(langInfo.queue)
            return void(langInfo.queue.push(todo));
        langInfo.queue = [todo];
        var js = (KateSyntax.base?KateSyntax.base+'/':'')+lang+'.js', script = document.createElement('script');
        script.onload = function() {
            if(!langInfo.syntax)
                return console.error('KateSyntax.js: Loading syntax file '+js+' failed');
            for(var i = 0; i < langInfo.queue.length; i++)
                langInfo.queue[i][0](make(langInfo.syntax, langInfo.queue[i][1]));
        };
        script.src = js;
        document.head.appendChild(script);
    };

    KateSyntax.highlight = function highlight(file, data, cb) {
        KateSyntax.getHighlighter(file, function(hl) {
            if(!hl)
                return cb(document.createTextNode(data));
            delete hl.cache;
            //delete hl.stack;
            hl.root = document.createElement('div');
            hl.run(data);
            return cb(hl.root);
        });
    };
})();

KateSyntax.langs = {
    fsharp: {file: /^(?:.*\.fs|.*\.fsi|.*\.fsx)$/},
    html: {mime: /^(?:text\/html)$/, file: /^(?:.*\.htm|.*\.html|.*\.shtml|.*\.shtm)$/},
    latex: {mime: /^(?:text\/x-tex)$/, file: /^(?:.*\.tex|.*\.ltx|.*\.dtx|.*\.sty|.*\.cls|.*\.bbx|.*\.cbx|.*\.lbx)$/},
    ocaml: {file: /^(?:.*\.ml|.*\.mli)$/},
    djangotemplate: {mime: /^(?:text\/html)$/, file: /^(?:.*\.htm|.*\.html)$/},
    doxygen: {mime: /^(?:text\/x-doxygen)$/, file: /^(?:.*\.dox|.*\.doxygen)$/},
    cpp: {mime: /^(?:text\/x-c\+\+src|text\/x-c\+\+hdr|text\/x-chdr)$/, file: /^(?:.*\.c\+\+|.*\.cxx|.*\.cpp|.*\.cc|.*\.C|.*\.h|.*\.hh|.*\.H|.*\.h\+\+|.*\.hxx|.*\.hpp|.*\.hcc|.*\.moc)$/},
    fortran: {mime: /^(?:text\/x-fortran-src)$/, file: /^(?:.*\.f|.*\.F|.*\.for|.*\.FOR|.*\.f90|.*\.F90|.*\.fpp|.*\.FPP|.*\.f95|.*\.F95)$/},
    sieve: {mime: /^(?:application\/sieve)$/, file: /^(?:.*\.siv)$/},
    abap: {mime: /^(?:text\/x-abap-src)$/, file: /^(?:.*\.abap|.*\.ABAP)$/},
    ansforth94: {file: /^(?:.*\.4th|.*\.4TH|.*\.f|.*\.F|.*\.frt|.*\.FRT|.*\.fs|.*\.FS|.*\.fth|.*\.FTH|.*\.seq|.*\.SEQ)$/},
    ample: {mime: /^(?:text\/x-amplesrc)$/, file: /^(?:.*\.ample|.*\.menu|.*\.startup)$/},
    c: {mime: /^(?:text\/x-csrc|text\/x-c\+\+src|text\/x-chdr)$/, file: /^(?:.*\.c|.*\.C|.*\.h)$/},
    stata: {file: /^(?:.*\.do| .*\.ado| .*\.doh| .*\.DO| .*\.ADO| .*\.DOH)$/},
    pgn: {file: /^(?:.*\.pgn|.*\.PGN)$/},
    xharbour: {mime: /^(?:text\/x-xharbour-src)$/, file: /^(?:.*\.prg|.*\.PRG|.*\.ch)$/},
    povray: {mime: /^(?:text\/x-povray-script|text\/x-povray-include)$/, file: /^(?:.*\.inc|.*\.pov)$/},
    clipper: {mime: /^(?:text\/x-clipper-src)$/, file: /^(?:.*\.prg|.*\.PRG|.*\.ch)$/},
    ansic89: {mime: /^(?:text\/x-csrc|text\/x-c\+\+src|text\/x-chdr)$/, file: /^(?:.*\.c|.*\.C|.*\.h)$/},
    systemc: {mime: /^(?:text\/x-c\+\+src|text\/x-c\+\+hdr|text\/x-chdr)$/, file: /^(?:.*\.c\+\+|.*\.cxx|.*\.cpp|.*\.cc|.*\.C|.*\.h|.*\.hh|.*\.H|.*\.h\+\+|.*\.hxx|.*\.hpp|.*\.hcc|.*\.moc)$/},
    cisco: {mime: /^(?:text\/cisco)$/, file: /^(?:.*\.cis)$/},
    ada: {mime: /^(?:text\/x-adasrc)$/, file: /^(?:.*\.adb|.*\.ads|.*\.ada|.*\.a)$/},
    clojure: {file: /^(?:.*\.clj)$/},
    cmake: {file: /^(?:CMakeLists\.txt|.*\.cmake)$/},
    coldfusion: {mime: /^(?:text\/x-coldfusion)$/, file: /^(?:.*\.cfm|.*\.cfc|.*\.cfml|.*\.dbm)$/},
    commonlisp: {file: /^(?:.*\.lisp|.*\.cl|.*\.lsp)$/},
    'component-pascal': {mime: /^(?:text\/x-component-pascal)$/, file: /^(?:.*\.cp|.*\.bro)$/},
    css: {mime: /^(?:text\/css)$/, file: /^(?:.*\.css)$/},
    cue: {mime: /^(?:application\/x-cue)$/, file: /^(?:.*\.cue)$/},
    d: {mime: /^(?:text\/x-dsrc)$/, file: /^(?:.*\.d|.*\.D|.*\.di|.*\.DI)$/},
    debiancontrol: {file: /^(?:control)$/},
    desktop: {mime: /^(?:application\/x-desktop)$/, file: /^(?:.*\.desktop|.*\.kdelnk)$/},
    diff: {mime: /^(?:text\/x-patch)$/, file: /^(?:.*\.diff|.*patch)$/},
    dosbat: {mime: /^(?:application\/x-dos)$/, file: /^(?:.*\.bat)$/},
    modelica: {file: /^(?:.*\.mo)$/},
    ahdl: {mime: /^(?:text\/x-ahdl)$/, file: /^(?:.*\.ahdl|.*\.tdf)$/},
    apache: {file: /^(?:httpd\.conf|httpd2\.conf|apache\.conf|apache2\.conf|\.htaccess.*|\.htpasswd.*)$/},
    cgis: {file: /^(?:.*\.cgis)$/},
    crk: {file: /^(?:.*\.crk)$/},
    'asm-avr': {mime: /^(?:text\/x-asm|text\/x-asm-avr)$/, file: /^(?:.*\.asm|.*\.ASM|.*\.asm-avr)$/},
    cs: {mime: /^(?:text\/x-csharp-src|text\/x-csharp-hde)$/, file: /^(?:.*\.cs)$/},
    dot: {mime: /^(?:text\/x-dot)$/, file: /^(?:.*\.dot)$/},
    doxygenlua: {mime: /^(?:text\/x-doxygen)$/, file: /^(?:.*\.dox|.*\.doxygen)$/},
    dtd: {mime: /^(?:application\/xml-dtd)$/, file: /^(?:.*\.dtd)$/},
    e: {mime: /^(?:text\/x-e-src)$/, file: /^(?:.*\.e)$/},
    email: {mime: /^(?:message\/rfc822)$/, file: /^(?:.*\.eml)$/},
    asterisk: {file: /^(?:.*asterisk\/.*\.conf)$/},
    asn1: {file: /^(?:.*\.asn.*\.asn1)$/},
    eiffel: {mime: /^(?:text\/x-eiffel-src)$/, file: /^(?:.*\.e)$/},
    ferite: {mime: /^(?:text\/x-ferite-src)$/, file: /^(?:.*\.fe|.*\.feh)$/},
    'fgl-4gl': {mime: /^(?:text\/x-4glsrc|text\/x-4glerr)$/, file: /^(?:.*\.4gl|.*\.4GL|.*\.err)$/},
    'fgl-per': {mime: /^(?:text\/x-4glper|text\/x-4glpererr)$/, file: /^(?:.*\.per|.*\.PER|.*\.per\.err)$/},
    euphoria: {mime: /^(?:text\/x-euphoria)$/, file: /^(?:.*\.e|.*\.ex|.*\.exw|.*\.exu)$/},
    freebasic: {mime: /^(?:text\/x-freebasic)$/, file: /^(?:.*\.bas|.*\.bi|.*\.BAS|.*\.BI)$/},
    ansys: {file: /^(?:.*\.ans)$/},
    'asm-m68k': {file: /^(?:.*\.s|.*\.i|.*\.S|.*\.I)$/},
    gdb: {file: /^(?:.*\.kcrash|.*\.crash|.*\.bt)$/},
    gdl: {file: /^(?:.*\.gdl|.*\.vcg|.*\.GDL|.*\.VCG)$/},
    glsl: {mime: /^(?:text\/x-glslsrc)$/, file: /^(?:.*\.glsl|.*\.vert|.*\.frag|.*\.geom)$/},
    gnuassembler: {mime: /^(?:text\/x-asm)$/, file: /^(?:.*\.s|.*\.S)$/},
    go: {file: /^(?:.*\.go)$/},
    gettext: {mime: /^(?:text\/x-gettext-translation)$/, file: /^(?:.*\.po|.*\.pot)$/},
    grammar: {file: /^(?:.*\.g)$/},
    haxe: {mime: /^(?:text\/x-hxsrc)$/, file: /^(?:.*\.hx|.*\.Hx|.*\.hX|.*\.HX)$/},
    idconsole: {file: /^(?:.*\.cfg)$/},
    idl: {mime: /^(?:text\/x-idl-src)$/, file: /^(?:.*\.idl)$/},
    ilerpg: {mime: /^(?:text\/x-ilerpg-src)$/, file: /^(?:QRPG.*\..*|qrpg.*\..*)$/},
    inform: {mime: /^(?:text\/x-inform-src)$/, file: /^(?:.*\.inf|.*\.h)$/},
    ini: {file: /^(?:.*\.ini|.*\.pls|.*\.kcfgc)$/},
    haskell: {mime: /^(?:text\/x-haskell)$/, file: /^(?:.*\.hs)$/},
    jam: {mime: /^(?:text\/x-jam|text\/x-Jamfile|text\/x-Jamrules|text\/x-Jambase)$/, file: /^(?:Jam.*|.*\.jam)$/},
    json: {mime: /^(?:application\/json)$/, file: /^(?:.*\.json)$/},
    javascript: {mime: /^(?:text\/x-javascript|application\/x-javascript)$/, file: /^(?:.*\.js|.*\.kwinscript)$/},
    coffee: {mime: /^(?:text\/x-coffeescript|application\/x-coffeescript)$/, file: /^(?:Cakefile|.*\.coffee|.*\.coco)$/},
    'asm-dsp56k': {file: /^(?:.*\.asm|.*\.inc|.*\.ASM|.*\.INC)$/},
    asm6502: {mime: /^(?:text\/x-asm6502)$/, file: /^(?:.*\.asm)$/},
    actionscript: {mime: /^(?:text\/x-actionscript)$/, file: /^(?:.*\.as)$/},
    java: {mime: /^(?:text\/x-java)$/, file: /^(?:.*\.java)$/},
    kbasic: {mime: /^(?:text\/x-kbasic-src)$/, file: /^(?:.*\.kbasic)$/},
    asp: {mime: /^(?:text\/x-asp-src|text\/x-asp-src)$/, file: /^(?:.*\.asp)$/},
    glosstex: {mime: /^(?:text\/x-gdf)$/, file: /^(?:.*\.gdf)$/},
    ld: {file: /^(?:.*\.ld)$/},
    ldif: {mime: /^(?:application\/directory)$/, file: /^(?:.*\.ldif)$/},
    fstab: {file: /^(?:fstab|mtab)$/},
    lilypond: {mime: /^(?:text\/x-lilypond)$/, file: /^(?:.*\.ly|.*\.LY|.*\.ily|.*\.ILY|.*\.lyi|.*\.LYI)$/},
    lex: {file: /^(?:.*\.l|.*\.lex|.*\.flex)$/},
    'literate-haskell': {mime: /^(?:text\/x-haskell)$/, file: /^(?:.*\.lhs)$/},
    logtalk: {mime: /^(?:text\/x-logtalk)$/, file: /^(?:.*\.lgt|.*\.config)$/},
    lsl: {mime: /^(?:text\/x-lsl)$/, file: /^(?:.*\.lsl)$/},
    lua: {mime: /^(?:text\/x-lua)$/, file: /^(?:.*\.lua)$/},
    m3u: {mime: /^(?:audio\/x-mpegurl)$/, file: /^(?:.*\.m3u)$/},
    abc: {mime: /^(?:text\/vnd\.abc)$/, file: /^(?:.*\.abc|.*\.ABC)$/},
    lpc: {file: /^(?:.*\.c|.*\.h|.*\.inc|.*\.o)$/},
    mab: {mime: /^(?:text\/x-mab)$/, file: /^(?:.*\.mab|.*\.MAB|.*\.Mab)$/},
    jsp: {mime: /^(?:text\/html)$/, file: /^(?:.*\.jsp|.*\.JSP)$/},
    makefile: {mime: /^(?:text\/x-makefile)$/, file: /^(?:GNUmakefile|Makefile|makefile|GNUmakefile\..*|Makefile\..*|makefile\..*)$/},
    gap: {mime: /^(?:text\/gap)$/, file: /^(?:.*\.gd|.*\.gi|.*\.g)$/},
    matlab: {mime: /^(?:text\/mfile)$/, file: /^(?:.*\.m|.*\.M)$/},
    mason: {file: /^(?:.*\.html)$/},
    mergetagtext: {file: /^(?:.*\.mtt)$/},
    metafont: {mime: /^(?:text\/x-metapost)$/, file: /^(?:.*\.mp|.*\.mps|.*\.mpost|.*\.mf)$/},
    sml: {file: /^(?:.*\.sml|.*\.ml)$/},
    maxima: {file: /^(?:.*\.mac|.*\.MAC|.*\.dem|.*\.DEM)$/},
    mel: {file: /^(?:.*\.mel)$/},
    'modula-2': {mime: /^(?:text\/x-modula-2)$/, file: /^(?:.*\.mod|.*\.def|.*\.mi|.*\.md)$/},
    monobasic: {file: /^(?:.*\.vb)$/},
    mup: {mime: /^(?:text\/x-mup|audio\/x-mup|application\/x-mup|audio\/x-notes)$/, file: /^(?:.*\.mup|.*\.not)$/},
    nasm: {file: /^(?:.*\.asm)$/},
    nemerle: {mime: /^(?:text\/x-nemerle)$/, file: /^(?:.*\.n)$/},
    noweb: {file: /^(?:.*\.w|.*\.nw)$/},
    objectivec: {mime: /^(?:text\/x-objc-src|text\/x-c-hdr)$/, file: /^(?:.*\.m|.*\.h)$/},
    objectivecpp: {mime: /^(?:text\/x-objcpp-src|text\/x-c-hdr)$/, file: /^(?:.*\.mm|.*\.M|.*\.h)$/},
    oors: {file: /^(?:.*\.oors)$/},
    opal: {file: /^(?:.*\.impl|.*\.sign)$/},
    awk: {mime: /^(?:text\/x-awk)$/, file: /^(?:.*\.awk)$/},
    bash: {mime: /^(?:application\/x-shellscript)$/, file: /^(?:.*\.sh|.*\.bash|.*\.ebuild|.*\.eclass|\.bashrc|\.bash_profile|\.bash_login|\.profile)$/},
    octave: {mime: /^(?:text\/octave)$/, file: /^(?:.*\.octave|.*\.m|.*\.M)$/},
    picsrc: {mime: /^(?:text\/x-PicSrc|text\/x-PicHdr)$/, file: /^(?:.*\.src|.*\.SRC|.*\.asm|.*\.ASM|.*\.pic|.*\.PIC)$/},
    pig: {mime: /^(?:application\/x-pig|text\/x-pig)$/, file: /^(?:.*\.pig)$/},
    pike: {mime: /^(?:application\/x-pike|text\/x-pike)$/, file: /^(?:.*\.pike)$/},
    postscript: {mime: /^(?:application\/postscript)$/, file: /^(?:.*\.ps|.*\.ai|.*\.eps)$/},
    perl: {mime: /^(?:application\/x-perl|text\/x-perl)$/, file: /^(?:.*\.pl|.*\.pm)$/},
    bmethod: {file: /^(?:.*\.mch|.*\.imp|.*\.ref)$/},
    progress: {file: /^(?:.*\.p|.*\.w|.*\.i|.*\.cls)$/},
    prolog: {mime: /^(?:text\/x-prolog)$/, file: /^(?:.*\.prolog)$/},
    purebasic: {mime: /^(?:text\/x-purebasic)$/, file: /^(?:.*\.pb)$/},
    python: {mime: /^(?:application\/x-python|text\/x-python)$/, file: /^(?:.*\.py|.*\.pyw|SConstruct|SConscript)$/},
    qmake: {file: /^(?:.*\.pro|.*\.pri)$/},
    rapidq: {file: /^(?:.*\.rqb)$/},
    relaxng: {file: /^(?:.*\.rng|.*\.RNG)$/},
    relaxngcompact: {file: /^(?:.*\.rnc)$/},
    rest: {mime: /^(?:text\/x-rst)$/, file: /^(?:.*\.rst)$/},
    qml: {mime: /^(?:text\/x-qml|application\/x-qml)$/, file: /^(?:.*\.qml)$/},
    r: {file: /^(?:.*\.R|.*\.r|.*\.S|.*\.s|.*\.q)$/},
    rexx: {file: /^(?:.*\.rex)$/},
    rib: {file: /^(?:.*\.rib)$/},
    rhtml: {file: /^(?:.*\.rhtml|.*\.html\.erb)$/},
    rsiidl: {mime: /^(?:text\/x-rsiidl-src)$/, file: /^(?:.*\.pro)$/},
    rpmspec: {file: /^(?:.*\.spec)$/},
    sather: {mime: /^(?:text\/x-sather-src)$/, file: /^(?:.*\.sa)$/},
    ruby: {mime: /^(?:application\/x-ruby)$/, file: /^(?:.*\.rb|.*\.rjs|.*\.rxml|.*\.xml\.erb|.*\.js\.erb|.*\.rake|Rakefile|Gemfile|.*\.gemspec)$/},
    scala: {mime: /^(?:text\/x-scala)$/, file: /^(?:.*\.scala)$/},
    scheme: {mime: /^(?:text\/x-scheme)$/, file: /^(?:.*\.scm|.*\.ss|.*\.scheme|.*\.guile)$/},
    mandoc: {file: /^(?:.*\.1|.*\.2|.*\.3|.*\.4|.*\.5|.*\.6|.*\.7|.*\.8|.*\.1m|.*\.3x|.*\.tmac)$/},
    sed: {mime: /^(?:text\/x-sed)$/, file: /^(?:.*\.sed)$/},
    sci: {mime: /^(?:text\/x-sci)$/, file: /^(?:.*\.sci|.*\.sce)$/},
    bibtex: {mime: /^(?:text\/x-bib)$/, file: /^(?:.*\.bib)$/},
    sgml: {mime: /^(?:text\/sgml)$/, file: /^(?:.*\.sgml)$/},
    scss: {mime: /^(?:text\/css)$/, file: /^(?:.*\.scss)$/},
    spice: {mime: /^(?:text\/spice)$/, file: /^(?:.*\.sp|.*\.hsp)$/},
    sisu: {file: /^(?:.*\.sst|.*\.ssm|.*\.ssi|.*\._sst|.*\.-sst)$/},
    'sql-mysql': {mime: /^(?:text\/x-sql)$/, file: /^(?:.*\.sql|.*\.SQL)$/},
    'sql-postgresql': {mime: /^(?:text\/x-sql)$/, file: /^(?:.*\.sql|.*\.SQL)$/},
    sql: {mime: /^(?:text\/x-sql)$/, file: /^(?:.*\.sql|.*\.SQL)$/},
    boo: {mime: /^(?:text\/x-boo)$/, file: /^(?:.*\.boo)$/},
    cg: {mime: /^(?:text\/x-cgsrc)$/, file: /^(?:.*\.cg|.*\.cgfx)$/},
    systemverilog: {mime: /^(?:text\/x-systemverilog-src)$/, file: /^(?:.*\.sv|.*\.svh)$/},
    tads3: {file: /^(?:.*\.t|.*\.h)$/},
    tcl: {mime: /^(?:text\/x-tcl)$/, file: /^(?:.*\.tcl|.*\.tk)$/},
    tcsh: {mime: /^(?:application\/x-csh)$/, file: /^(?:.*\.csh|.*\.tcsh|csh\.cshrc|csh\.login|\.tcshrc|\.cshrc|\.login)$/},
    texinfo: {mime: /^(?:application\/x-texinfo)$/, file: /^(?:.*\.texi)$/},
    txt2tags: {mime: /^(?:text\/txt2tags)$/, file: /^(?:.*\.t2t)$/},
    uscript: {mime: /^(?:text\/x-uscript)$/, file: /^(?:.*\.uc)$/},
    'valgrind-suppression': {file: /^(?:.*\.supp)$/},
    velocity: {mime: /^(?:text\/x-velocity-src|text\/x-vm-src)$/, file: /^(?:.*\.vm)$/},
    vera: {mime: /^(?:text\/x-vera-src)$/, file: /^(?:.*\.vr|.*\.vri|.*\.vrh)$/},
    verilog: {mime: /^(?:text\/x-verilog-src)$/, file: /^(?:.*\.v|.*\.V|.*\.vl)$/},
    vhdl: {mime: /^(?:text\/x-vhdl)$/, file: /^(?:.*\.vhdl|.*\.vhd)$/},
    winehq: {file: /^(?:.*\.reg)$/},
    wml: {file: /^(?:.*\.cfg|.*\.pbl|.*\.CFG|.*\.PBL)$/},
    changelog: {file: /^(?:ChangeLog)$/},
    vrml: {mime: /^(?:model\/vrml)$/, file: /^(?:.*\.wrl)$/},
    xml: {mime: /^(?:text\/xml|text\/book|text\/daml|text\/rdf|application\/rss\+xml|application\/xspf\+xml|image\/svg\+xml|application\/x-designer|application\/xml)$/, file: /^(?:.*\.docbook|.*\.xml|.*\.rc|.*\.daml|.*\.rdf|.*\.rss|.*\.xspf|.*\.xsd|.*\.svg|.*\.ui|.*\.kcfg|.*\.qrc|.*\.wsdl)$/},
    xorg: {file: /^(?:xorg\.conf)$/},
    xslt: {file: /^(?:.*\.xsl|.*\.xslt)$/},
    xul: {mime: /^(?:text\/xul)$/, file: /^(?:.*\.xul|.*\.xbl)$/},
    yacas: {mime: /^(?:text\/x-yacassrc)$/, file: /^(?:.*\.ys)$/},
    yacc: {file: /^(?:.*\.y|.*\.yy)$/},
    yaml: {mime: /^(?:text\/yaml)$/, file: /^(?:.*\.yaml|.*\.yml)$/},
    zonnon: {mime: /^(?:text\/x-zonnon)$/, file: /^(?:.*\.znn)$/},
    zsh: {mime: /^(?:application\/x-shellscript)$/, file: /^(?:.*\.sh|.*\.zsh|\.zshrc|\.zprofile|\.zlogin|\.zlogout|\.profile)$/},
    m4: {file: /^(?:.*\.m4)$/},
    mips: {mime: /^(?:text\/x-mips)$/, file: /^(?:.*\.s)$/}
};