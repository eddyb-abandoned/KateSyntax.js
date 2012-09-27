# KateSyntax.js
This is an attempt at using the Kate syntax highlighting definitions for a JavaScript highlighter.

## HowTo

### Conversion
`node bin/convert` will convert the definitions for all the languages, and store them in `syntax/`.

### Usage
```html
<style>
body {
    padding: 20px;
}
.highlighted {
    font-family: monospace;
    font-size: 12px;
    white-space: pre;
    word-wrap: normal;
}
.highlighted.highlighted-inline {
    display: inline-block;
    padding: 2px 4px;
    background-color: #f7f7f9;
    border: 1px solid #e1e1e8;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.highlighted.highlighted-block {
    overflow: auto;
    padding: 9.5px;
    margin: 0 0 10px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
/* Default Kate colors */
.highlighted {background: #FFFFFF;}
.highlighted .dsKeyword {font-weight: bold}
.highlighted .dsDataType {color: #0057AE}
.highlighted .dsDecVal, .highlighted .dsBaseN, .highlighted .dsFloat {color: #B08000}
.highlighted .dsChar {color: #FF80E0}
.highlighted .dsString, .highlighted .dsError, .highlighted .dsAlert {color: #BF0303}
.highlighted .dsComment {font-style: italic; color: #888786}
.highlighted .dsOthers {color: #006E28}
.highlighted .dsFunction {color: #452886}
.highlighted .dsAlert {font-weight: bold; background: #F7E6E6}
.highlighted .dsRegionMarker {color: #0057AE; background: #E0E9F8}
.highlighted .dsError {text-decoration: underline}​
</style>
...
<b>JavaScript:</b>
<pre lang=js>
var x = $('#x').text().replace(/^(:?[a-f0-9]{2})*/g, '\n');
</pre>
<br>
<b>C++:</b>
<pre lang=cpp>
#include &lt;iostream&gt;
int main() {
    return std::cout &lt;&lt; "Hello World!" &lt;&lt; std::endl;
}
</pre>
<br>
<b>Bash <i>(inline)</i>:</b> <code lang=sh>touch /dev/apple || rm -rf / # Don't do it...</code>
<br><br>
<b>JSON <i>(inline)</i>:</b> <code lang=json>{"foo": "bar", "one": 1337, "two": [1.1, 2.3], "niet": null}</code>​
...
<script>
window.KateSyntax = {
    base: 'js/syntax' /* This is a path to your syntax/ directory */,
    debugTime: false,
    debugTrace: false
};
(function() {
    var script = document.createElement('script');
    script.src = KateSyntax.base+'/KateSyntax.js';
    script.onload = function() {
        // As an example, we're highlighting every <pre lang=...> (<code lang=...> for inline) element.
        var elements = [].slice.call(document.getElementsByTagName('pre')).concat([].slice.call(document.getElementsByTagName('code')));
        elements.forEach(function(el) {
            if(el.attributes.lang)
                KateSyntax.highlight({file: 'no-file-name.'+el.attributes.lang.value}, el.textContent.trim(), function(container) {
                    container.className = 'highlighted highlighted-'+(el.tagName === 'CODE' ? 'inline' : 'block');
                    el.parentNode.replaceChild(container, el);
                });
        });
    };
    document.head.appendChild(script);
})();
</script>
```
[The example above on jsFiddle](http://jsfiddle.net/89EBE/1/).

*Outdated:* [This is a simple editor](http://jsfiddle.net/yBwAx/) (using KateSyntax.js for highlighting).

## Resources
* [List of all the highlighting files](http://kate-editor.org/syntax/update-3.7.xml)
* [Article on kate-editor.org](http://kate-editor.org/2005/03/24/writing-a-syntax-highlighting-file/)
