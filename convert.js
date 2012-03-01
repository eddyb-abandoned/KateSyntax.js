var fs = require('fs'), http = require('http'), url = require('url'), domJS = require('dom-js');

function camel(name) {
    return name.length ? name[0].toLowerCase() + name.slice(1).replace(/[^\w#]+\w/g, function(x) {return x[1].toUpperCase();}) : '';
}

domJS.Element.prototype.isTag = true;
domJS.Element.prototype.attr = function attr(name) {
    for(var i in this.attributes)
        if(camel(i) == name)
            return this.attributes[i];
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
            callback(file);
        });
    });
};

function ctxAction(ctx) {
    if(!ctx)
        return 'continue;';
    if(ctx == '#stay')
        return 'continue;';
    if(ctx == '#pop')
        return 'return;';
    return '{this._' + camel(ctx) + '();continue;}'; 
}

httpGetFile('http://kate-editor.org/syntax/update-3.7.xml', function(data) {
    (new domJS.DomJS).parse(data, function(err, xml) {
        if(err)
            return console.error(xml);
        // ANSI C89=9, C=24, C++=36, CSS=39
        var syntaxFiles = xml.childs('definition').map(function(e) {return [e.attr('name'), e.attr('url')];}).forEach(function(syntaxFile) {
            //var syntaxFile = syntaxFiles[36];
            httpGetFile(syntaxFile[1], function(file) {
                (new domJS.DomJS).parse(file, function(err, xml) {
                    if(err)
                        return console.error(xml);
                    console.log('Converting '+syntaxFile[0]+'...');
                    xml.highlighting = xml.childs('highlighting')[0];
                    xml.lists = xml.highlighting.childs('list');
                    xml.contexts = xml.highlighting.childs('contexts')[0].childs('context');
                    xml.itemDatas = xml.highlighting.childs('itemDatas')[0].childs('itemData');
                    
                    var lists = {}, contexts = {}, defContext, styles = {};
                    for(var i in xml.lists)
                        lists[camel(xml.lists[i].attr('name'))] = xml.lists[i].childs('item').map(function(x) {return x.text().trim();});
                    for(var i in xml.itemDatas)
                        styles[camel(xml.itemDatas[i].attr('name'))] = xml.itemDatas[i].attributes;
                    for(var i in xml.contexts) {
                        var ctx = xml.contexts[i], ctxName = camel(xml.contexts[i].attr('name'));
                        if(!defContext)
                            defContext = ctxName;
                        contexts[ctxName] = {};
                        contexts[ctxName].style = (styles[camel(ctx.attr('attribute') || '')] || {}).defStyleNum;
                        contexts[ctxName].lineEndContext = ctx.attr('lineEndContext');
                        if(contexts[ctxName].lineEndContext == '#stay')
                            delete contexts[ctxName].lineEndContext;
                        contexts[ctxName].childs = ctx.childs();
                        contexts[ctxName].rules = [];
                    }
                    for(var i in contexts) {
                        contexts[i].childs.forEach(function doRule(rule) {
                            var name = rule.name.toLowerCase(), regex, ret = {
                                lookAhead: (rule.attr('lookAhead') || '').toLowerCase() == 'true',
                                style: (styles[camel(rule.attr('attribute') || '')] || {}).defStyleNum || contexts[i].style,
                                action: ctxAction(rule.attr('context')),
                            };
                            if(name == 'detectchar') {
                                var c = '\''+rule.attr('char').replace(/[\a\b\e\f\n\r\t\v'\\]/, '\\$&')+'\'';
                                ret.match = ret.matchHL = 'this.str[0] == '+c, ret.hl = c;
                            } else if(name == 'detect2chars') {
                                var c1 = rule.attr('char').replace(/[\a\b\e\f\n\r\t\v'\\]/, '\\$&'), c2 = rule.attr('char1').replace(/[\a\b\e\f\n\r\t\v'\\]/, '\\$&');
                                ret.match = ret.matchHL = 'this.str[0] == \''+c1+'\' && this.str[1] == \''+c2+'\'', ret.hl = '\''+c1+c2+'\'';
                            } else if(name == 'anychar')
                                regex = '[' + rule.attr('string').replace(/[\]^-]/g, '\\$&') + ']';
                            else if(name == 'stringdetect')
                                regex = rule.attr('string').replace(/[[^.*+(){}\\/]/g, '\\$&');
                            else if(name == 'worddetect')
                                regex = rule.attr('string').replace(/[[^.*+(){}\\/]/g, '\\$&') + '\\b';
                            else if(name == 'regexpr') // TODO minimal=true and ^ matching the start of a line
                                regex = rule.attr('string').replace(/\$$/, '(?=$|\\n)');
                            else if(name == 'keyword') {
                                var list = lists[camel(rule.attr('string'))];
                                if(!list) // FIXME happens for ASP
                                    return;
                                regex = '(?:' + list.map(function(x){return x.replace(/[[^.*+(){}\\/]/g, '\\$&');}).join('|') + ')\\b';
                            } else if(name == 'int') // TODO child rules
                                regex = '\\d+';
                            else if(name == 'float') // TODO child rules
                                regex = '\\d*\\.\\d+';
                            else if(name == 'hlcoct')
                                regex = '0[0-7]+';
                            else if(name == 'hlchex')
                                regex = '0x[\\da-fA-F]+';
                            else if(name == 'hlcstringchar')
                                regex = '\\\\([abefnrtv"\'?\\\\]|x[\\da-fA-F]{2}|0?[0-7]{1,2})';
                            else if(name == 'hlcchar')
                                regex = '\'(\\\\([abefnrtv"\'?\\\\]|x[\\da-fA-F]{2}|0?[0-7]{1,2})|[^\\a\\b\\e\\f\\n\\r\\t\\v])\'';
                            else if(name == 'rangedetect')
                                regex = rule.attr('char').replace(/[[^.*+(){}\\/]/g, '\\$&') + '.*?' + rule.attr('char1').replace(/[[^.*+(){}\\/]/g, '\\$&');
                            else if(name == 'linecontinue')
                                regex = '\\\\\\n'; // \\ \n
                            else if(name == 'detectspaces')
                                regex = '[^\\S\\n]+';
                            else if(name == 'detectidentifier')
                                regex = '[a-zA-Z][a-zA-Z0-9]*';
                            else if(name == 'includerules') {
                                var targetCtx = rule.attr('context');
                                if(targetCtx.match(/##/))
                                    return console.error('TODO: IncludeRules context='+targetCtx);
                                return contexts[camel(targetCtx)].childs.forEach(doRule);
                            } else
                                return console.error('TODO: '+rule.toXml());
                            if(regex) {
                                var match = '/^'+regex+((rule.attr('insensitive') || '').toLowerCase() == 'true' ? '/i' : '/')+'.exec(this.str)';
                                ret.match = match, ret.matchHL = '(m = '+match+')', ret.hl = 'm[0]';
                            }
                            contexts[i].rules.push(ret);
                        });
                    }
                    var code = 'var HL = function HL(){};\n'+
                    'HL.prototype.run = function run(str) {\n'+
                    '\tthis.str = str;\n'+
                    '\tthis.pos = 0;\n'+
                    '\tthis.len = str.length;\n'+
                    '\tthis.main = document.createElement(\'div\');\n'+
                    '\tthis.hlText = \'\';\n'+
                    '\tthis.style = \'dsNormal\';\n'+
                    '\tthis._'+defContext+'();\n'+
                    '\tthis.hl(\'\');\n'+
                    '\treturn this.main;\n'+
                    '};\n'+
                    'HL.prototype.hl = function hl(m,s) {\n'+
                    '\tthis.pos += m.length;\n'+
                    '\tthis.str = this.str.slice(m.length);\n'+
                    '\tif(this.style == s)\n'+
                    '\t\tthis.hlText += m;\n'+
                    '\telse {\n'+
                    '\t\tif(this.hlText) {\n'+
                    '\t\t\tif(this.style == \'dsNormal\')\n'+
                    '\t\t\t\tthis.main.appendChild(document.createTextNode(this.hlText));\n'+
                    '\t\t\telse {\n'+
                    '\t\t\t\tvar span = document.createElement(\'span\');\n'+
                    '\t\t\t\tspan.appendChild(document.createTextNode(this.hlText));\n'+
                    '\t\t\t\tspan.className = this.style;\n'+
                    '\t\t\t\tthis.main.appendChild(span);\n'+
                    '\t\t\t}\n'+
                    '\t\t}\n'+
                    '\t\tthis.style = s;\n'+
                    '\t\tthis.hlText = m;\n'+
                    '\t}\n'+
                    '\treturn true;\n'+
                    '};\n';
                    for(var ctxName in contexts) {
                        code += 'HL.prototype._' + ctxName + ' = function() {\n\tvar m;\n\twhile(this.pos < this.len) {\n';
                        for(var i in contexts[ctxName].rules) {
                            var rule = contexts[ctxName].rules[i];
                            if(!rule)
                                continue;
                            if(rule.lookAhead)
                                code += '\t\tif('+rule.match+') '+rule.action+'\n';
                            else
                                code += '\t\tif('+rule.matchHL+' && this.hl('+rule.hl+', \''+rule.style+'\')) '+rule.action+'\n';
                        }
                        if(contexts[ctxName].lineEndContext) {
                            if(contexts[ctxName].lineEndContext == '#pop')
                                code += '\t\tif(this.str[0] == \'\\n\') return;\n';
                            else
                                console.error('TODO: lineEndContext='+contexts[ctxName].lineEndContext);
                        }
                        code += '\t\tthis.hl(this.str[0], \''+contexts[ctxName].style+'\');\n'+
                        '\t}\n'+
                        '};\n';
                    }
                    fs.writeFileSync('syntax/'+syntaxFile[1].replace(/^([^/]*\/)*/, '').replace(/\.[^.]*$/, '')+'.js', code.replace(/\t/g, '    '));
                });
            });
        });
    });
});
