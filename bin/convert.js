var fs = require('fs'), http = require('http'), path = require('path'), url = require('url'), domJS = require('dom-js');

function camel(name) {
    return name.length ? name[0].toLowerCase() + name.slice(1).replace(/[^\w#]+\w/g, function(x) {return x[1].toUpperCase();}) : '';
}

function nonStrictDOM() {
    var dom = new domJS.DomJS;
    dom.strict = false;
    return dom;
}

domJS.Element.prototype.isTag = true;
domJS.Element.prototype.attr = function attr(name) {
    return this.attributes[name.toUpperCase()];
};
domJS.Element.prototype.text = function text(name) {
    var text = '';
    for(var i in this.children)
        if(this.children[i].text)
            text += this.children[i].text;
    return text;
};
domJS.Element.prototype.childs = function childs(name) {
    return this.children.filter(function(e) {return e.isTag && (!name || e.name == name.toUpperCase());});
};

function httpGetFile(fileURL, callback) {
    var parsedURL = url.parse(fileURL), file = '';

    http.get({host: parsedURL.host, port: parsedURL.port || 80, path: parsedURL.pathname}, function(res) {
        if(res.statusCode == 301 || res.statusCode == 302)
            return httpGetFile(res.headers.location, callback);
        res.on('data', function(data) {
            file += data.toString('utf8');
        }).on('end', function() {
            callback(null, file);
        });
    });
};

function safePropName(prop) {
    if(/[^$0-9a-zA-Z_]/.test(prop))
        return '\''+prop+'\'';
    return prop;
}

function safePropAccess(prop) {
    if(/[^$0-9a-zA-Z_]/.test(prop))
        return '[\''+prop+'\']';
    return '.'+prop;
}

function safeChar(c) {
    if(/^[\\']$/.test(c))
        return '\\'+c;
    return c;
}

function safeBool(x) {
    if(typeof x !== 'string')
        return !!x;
    if(x === '1' || x === '0')
        return !!+x;
    return x.toLowerCase() === 'true';
}

function fixQRegExp(r) {
    var o = '';
    for(var i = 0; i < r.length; i++) {
        if(r[i] == '\\')
            o += r[i++]+r[i];
        else if(r[i] == '/' || i && r[i] == '^')
            o += '\\'+r[i];
        else if(r[i] == '$')
            o += '(?=$|\\n)'
        else if(r[i] == '[') {
            o += r[i++];
            if(r[i] == '^')
                o += r[i++];
            if(r[i] == ']')
                o += '\\'+r[i++];
            for(; i < r.length; i++) {
                o += r[i];
                if(r[i] == ']')
                    break;
                if(r[i] == '\\')
                    o += r[++i];
            }
        } else
            o += r[i];
    }
    return o;
}

function makeStyle(s, def) {
    if(!s)
        return def;
    // HACK upper-case properties required because of non-strict mode.
    var r = s.DEFSTYLENUM || def;
    s.COLOR && (r += ';color:'+s.COLOR);
    s.ITALIC && (r += ';font-style:'+(safeBool(s.ITALIC) ? 'italic' : 'normal'));
    s.BOLD && (r += ';font-weight:'+(safeBool(s.BOLD) ? 'bold' : 'normal'));
    if(s.UNDERLINE || s.STRIKEOUT) {
        var decoration = safeBool(s.UNDERLINE) ? 'underline' : '';
        safeBool(s.STRIKEOUT) && (decoration += (decoration ? ' ' : '')+'line-through');
        r += ';text-decoration:'+(decoration || 'none');
    }
    return r;
}

var langs = {}, langDefs = [];

function convert() {
    var fileName = this.fileName = this.xmlFile.replace(/\.xml$/, ''), jsFile = fileName+'.js';

    console.log('\x1b[1;32mConverting\x1b[0;32m', this.name, '\x1b[0;1m->\x1b[0;32m', 'syntax/'+jsFile+'\x1b[0m...');

    var deps = [], self = this;

    var ctxAction = function ctxAction(ctx, special) {
        if(!ctx || ctx == '#stay')
            return 'continue;';
        if(ctx == '#pop')
            return 'return this.pop();';
        if(/^(#pop){2,}$/.test(ctx))
            return 'return this.pop(), '+(ctx.length/4-1)+';';
        var idx = ctx.indexOf('##');
        if(idx !== -1 && !special) {
            var name = ctx.slice(idx+2), lang = langs[name];
            // FIXME happens for D
            if(name == this.name)
                ctx = idx ? ctx.slice(0, idx) : this.defContext;
            else {
                if(!lang.pending) {
                    if(deps.indexOf(lang) === -1)
                        deps.push(lang);
                    return '{if(m = this' + safePropAccess(lang.fileName+'_'+(idx ? lang.defContext : camel(ctx.slice(0, idx)))) + '())return this.pop(), m-1;continue;}';
                }
                lang.pending.push(this);
                console.error('\x1b[1;33mPending (context=)\x1b[0;33m', this.name, '\x1b[0;1m<-\x1b[0;33m', name, '\x1b[0m');
                // HACK this should make the current convert instance exit.
                throw null;
            }
        }
        if(ctx.indexOf('#') !== -1)
            return console.error('TODO:', special||'context', ctx), 'return this.pop();';
        return '{if(m = this' + safePropAccess(fileName+'_'+camel(ctx)) + '())return this.pop(), m-1;continue;}';
    }.bind(this);

    this.highlighting = this.xml.childs('highlighting')[0];
    this.lists = this.highlighting.childs('list');
    this.contexts = this.highlighting.childs('contexts')[0].childs('context');
    this.itemDatas = this.highlighting.childs('itemDatas')[0].childs('itemData');

    var lists = {}, contexts = {}, styles = {};
    for(var i in this.lists)
        lists[camel(this.lists[i].attr('name'))] = this.lists[i].childs('item').map(function(x) {return x.text().trim();});
    for(var i in this.itemDatas)
        styles[camel(this.itemDatas[i].attr('name'))] = this.itemDatas[i].attributes;
    for(var i in this.contexts) {
        var ctx = this.contexts[i], ctxName = camel(ctx.attr('name'));
        if(!this.defContext)
            this.defContext = ctxName;
        contexts[ctxName] = {};
        contexts[ctxName].style = makeStyle(styles[camel(ctx.attr('attribute') || '')], 'dsNormal');
        contexts[ctxName].lineEndContext = ctx.attr('lineEndContext');
        contexts[ctxName].fallthroughContext = safeBool(ctx.attr('fallthrough')) && ctx.attr('fallthroughContext');
        if(contexts[ctxName].lineEndContext == '#stay' || contexts[ctxName].lineEndContext == contexts[ctxName].fallthroughContext)
            delete contexts[ctxName].lineEndContext;
        contexts[ctxName].childs = ctx.childs();
        contexts[ctxName].rules = [];
    }

    for(var i in contexts) {
        contexts[i].childs.forEach(function doRule(rule) {
            var type = rule.name.toLowerCase(), targetCtx = rule.attr('context');
            if(type == 'includerules') {
                var idx = targetCtx.indexOf('##');
                if(idx !== -1) {
                    var name = targetCtx.slice(idx+2), lang = langs[name];
                    // FIXME happens for D
                    if(name == self.name)
                        targetCtx = idx ? targetCtx.slice(0, idx) : self.defContext;
                    else {
                        if(!lang.pending) {
                            if(deps.indexOf(lang) === -1)
                                deps.push(lang);
                            return contexts[i].rules = contexts[i].rules.concat(lang.rules[idx ? camel(targetCtx.slice(0, idx)) : lang.defContext]);
                        }
                        lang.pending.push(self);
                        console.error('\x1b[1;33mPending (IncludeRules)\x1b[0;33m', self.name, '\x1b[0;1m<-\x1b[0;33m', name, '\x1b[0m');
                        // HACK this should make the current convert instance exit.
                        throw null;
                    }
                }
                return contexts[camel(targetCtx)].childs.forEach(doRule);
            }
            var lookAhead = safeBool(rule.attr('lookAhead')), defStyle = contexts[i].style, attribute = rule.attr('attribute');
            if(!lookAhead && targetCtx && targetCtx != '#stay' && !attribute) {
                if(targetCtx.indexOf('#') !== -1)
                    console.error('TODO: guess attribute for', targetCtx);
                else
                    defStyle = contexts[camel(targetCtx)].style;
            }
            var style = makeStyle(attribute && styles[camel(attribute)], defStyle);
            var match, matchHL, hl, regex;
            if(type == 'detectchar')
                hl = '\''+safeChar(rule.attr('char'))+'\'', match = matchHL = 'this.str[0] == '+hl;
            else if(type == 'detect2chars') {
                var c1 = safeChar(rule.attr('char')), c2 = safeChar(rule.attr('char1'));
                match = matchHL = 'this.str[0] == \''+c1+'\' && this.str[1] == \''+c2+'\'', hl = '\''+c1+c2+'\'';
            } else if(type == 'anychar')
                regex = '[' + rule.attr('string').replace(/[\\\]^-]/g, '\\$&') + ']';
            else if(type == 'stringdetect')
                regex = rule.attr('string').replace(/[[^.?*+(){}\\/|]/g, '\\$&');
            else if(type == 'worddetect')
                regex = rule.attr('string').replace(/[[^.?*+(){}\\/|]/g, '\\$&') + '\\b';
            else if(type == 'regexpr') // TODO minimal=true, ^ matching the start of a line, \b at the start of the regexp, etc.
                regex = fixQRegExp(rule.attr('string')).replace(/^\^/, '');
            else if(type == 'keyword') {
                var list = lists[camel(rule.attr('string'))];
                if(!list || !list.length) // Ignore empty lists.
                    return;
                regex = '(?:' + list.map(function(x){return x.replace(/[[^.?*+(){}\\/|]/g, '\\$&');}).join('|') + ')\\b';
            } else if(type == 'int') // TODO child rules
                regex = '\\d+';
            else if(type == 'float') // TODO child rules
                regex = '\\d*\\.\\d+';
            else if(type == 'hlcoct')
                regex = '0[0-7]+';
            else if(type == 'hlchex')
                regex = '0x[\\da-fA-F]+';
            else if(type == 'hlcstringchar')
                regex = '\\\\([abefnrtv"\'?\\\\]|x[\\da-fA-F]{2}|0?[0-7]{1,2})';
            else if(type == 'hlcchar')
                regex = '\'(\\\\([abefnrtv"\'?\\\\]|x[\\da-fA-F]{2}|0?[0-7]{1,2})|[^\\a\\b\\e\\f\\n\\r\\t\\v])\'';
            else if(type == 'rangedetect')
                regex = rule.attr('char').replace(/[[^.?*+(){}\\/|]/g, '\\$&') + '.*?' + rule.attr('char1').replace(/[[^.?*+(){}\\/|]/g, '\\$&');
            else if(type == 'linecontinue')
                regex = '\\\\\\n'; // \\ \n
            else if(type == 'detectspaces')
                regex = '[^\\S\\n]+';
            else if(type == 'detectidentifier')
                regex = '[a-zA-Z][a-zA-Z0-9]*';
            else
                return console.error('TODO: '+rule.toXml());
            if(regex) {
                match = '/^'+regex+(safeBool(rule.attr('insensitive')) ? '/i' : '/')+'.exec(this.str)';
                matchHL = '(m = '+match+')';
                try {
                    regex = new RegExp(regex);
                } catch (e) {
                    console.error('\x1b[33m'+fileName+':'+i+':\x1b[31m', e.message);
                    return;
                }
                // Ensure that the regexp won't match ''.
                if(regex.test(''))
                    matchHL += ' && m[0].length';
                 hl = 'm[0]';
            }
            match = lookAhead ? match : matchHL+' && this.hl('+hl+', \''+style+'\')';
            var column = rule.attr('column');
            if(column)
                match = 'this.col === '+(+column)+' && '+match;
            contexts[i].rules.push('if('+match+') '+ctxAction(targetCtx));
        });
    }

    // Export the rules.
    this.rules = {};
    for(var i in contexts)
        this.rules[i] = contexts[i].rules;

    var code = '';
    for(var ctxName in contexts) {
        code += ',\n\t' + safePropName(fileName+'_'+ctxName) + ': function '+(fileName+'_'+ctxName).replace(/\W+/g, '')+'(m) {\n\t\tthis.push();\n\t\twhile(this.pos < this.len) {\n';
        for(var i in contexts[ctxName].rules)
            code += '\t\t\t'+contexts[ctxName].rules[i]+'\n';
        var lineEndCtx = contexts[ctxName].lineEndContext, fallthroughCtx = contexts[ctxName].fallthroughContext;
        if(lineEndCtx) {
            if(lineEndCtx.indexOf('#') !== -1)
                code += '\t\t\tif(this.str[0] == \'\\n\') '+ctxAction(lineEndCtx, 'lineEndContext')+'\n';
            else
                code += '\t\t\tif(this.str[0] == \'\\n\') return this.pop(), this' + safePropAccess(fileName+'_'+camel(lineEndCtx)) + '();\n';
        }
        if(fallthroughCtx) {
            if(fallthroughCtx.indexOf('#') !== -1)
                code += '\t\t\t'+ctxAction(fallthroughCtx, 'fallthroughContext')+'\n';
            else
                code += '\t\t\treturn this.pop(), m = this' + safePropAccess(fileName+'_'+camel(fallthroughCtx)) + '(), m && m-1;\n';
        } else
            code += '\t\t\tthis.hl(this.str[0], \''+contexts[ctxName].style+'\');\n';
        code += '\t\t}\n\t\tthis.pop();\n\t}';
    }

    this.code = code;
    for(var i = 0; i < deps.length; i++)
        code += deps[i].code;
    code = 'KateSyntax.langs'+safePropAccess(fileName)+'.syntax = {\n\tdefault: \''+fileName+'_'+this.defContext+'\''+code+'\n};\n';
    fs.writeFile('syntax/'+jsFile, code.replace(/\t/g, '    '));

    var props = [], mime = this.xml.attr('mimetype'), exts = this.xml.attr('extensions');
    if(mime)
        props.push('mime: /^(?:'+mime.replace(/[[^.?*+(){}\\/]/g, '\\$&').replace(/;/g, '|')+')$/');
    if(exts)
        props.push('file: /^(?:'+exts.replace(/[[^.?+(){}\\/]/g, '\\$&').replace(/;$/, '').replace(/;/g, '|').replace(/\*/g, '.*')+')$/');
    if(props.length)
        langDefs.push([+this.xml.attr('priority') || 0, '\n    '+safePropName(fileName)+': {'+props.join(', ')+'}']);

    var pending = this.pending;
    delete this.pending;
    for(var i = 0; i < pending.length; i++)
        convert.call(pending[i]);
}

process.on('exit', function() {
    langDefs.sort(function(a, b) {
        return b[0] - a[0];
    });
    var s = '';
    for(var i = 0; i < langDefs.length; i++)
        s += (i?',':'')+langDefs[i][1];
    fs.writeFileSync('syntax/KateSyntax.js', fs.readFileSync('lib/KateSyntax.js', 'utf8')+'\nKateSyntax.langs = {'+s+'\n};');
});
process.on('SIGINT', function() {
    process.exit(0);
});
process.on('uncaughtException', function(err) {
    console.error('\x1b[1;31mRogue exception:\x1b[0;31m', err, '\x1b[0m');
});

var userDir = process.env.HOME+'/Projects/kate/part/syntax/data/'/*'/.kde4/share/apps/katepart/syntax/'*/, systemDir = '/usr/share/kde4/apps/katepart/syntax/';
httpGetFile('http://kate-editor.org/syntax/update-3.7.xml', function(err, data) {
    nonStrictDOM().parse(data, function(err, xml) {
        if(err)
            return console.error(xml);
        xml.childs('definition').map(function(e) {return [e.attr('name'), e.attr('url')];}).forEach(function(syntaxFile) {
            var name = syntaxFile[0], url = syntaxFile[1], xmlFile = path.basename(url);
            var lang = langs[name] = {name: name, xmlFile: xmlFile, pending: []};
            function processFile(err, file) {
                nonStrictDOM().parse(file, function(err, xml) {
                    if(err)
                        return console.error('\x1b[1;31mError parsing '+xmlFile+':\x1b[0m', xml.message);
                    lang.xml = xml;
                    try {
                        convert.call(lang);
                    } catch(e) {
                        // Ignore null - it means deps are not (yet) satisfied.
                        if(e !== null)
                            throw e;
                    }
                });
            }
            // HACK Try to use local files, internet is slow here.
            if(fs.existsSync(userDir+xmlFile))
                return fs.readFile(userDir+xmlFile, 'utf8', processFile);
            if(fs.existsSync(systemDir+xmlFile))
                return fs.readFile(systemDir+xmlFile, 'utf8', processFile);
            httpGetFile(url, processFile);
        });
    });
});
