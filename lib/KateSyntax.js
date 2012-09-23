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
            // Try to reuse older elements with the same css class.
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
