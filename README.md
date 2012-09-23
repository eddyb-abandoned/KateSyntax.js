# KateSyntax.js
This is an attempt at using the Kate syntax highlighting definitions for a JavaScript highlighter.

## HowTo

### Conversion
`node bin/convert` will convert the definitions for all the languages, and store them in `syntax/`.

### Usage
```html
<style>
.highlighted {
    font-family: monospace;
    font-size: 12px;
    outline: none;
    display: block;
    white-space: pre;
    word-wrap: normal;

    background: #FFFFFF;
}
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
.highlighted .dsError {text-decoration: underline}
</style>
...
JavaScript:
<code lang=js>
var x = $('#x').text().replace(/^(:?[a-f0-9]{2})*/g, '\n');
</code>
<br>
C++:
<code lang=cpp>
#include &lt;iostream&gt;
int main() {
    return std::cout &lt;&lt; "Hello World!" &lt;&lt; std::endl;
}
</code>​
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
        // As an example, we're highlighting every <code lang=something> element.
        [].forEach.call(document.getElementsByTagName('code'), function(code) {
            if(code.attributes.lang)
                KateSyntax.highlight({file: 'no-file-name.'+code.attributes.lang.value}, code.textContent.trim(), function(container) {
                    container.className = 'highlighted';
                    code.parentNode.replaceChild(container, code);
                });
        });
    };
    document.head.appendChild(script);
})();
</script>
```
[The example above on jsFiddle](http://jsfiddle.net/89EBE/).

*Outdated:* [This is a simple editor](http://jsfiddle.net/yBwAx/) (using KateSyntax.js for highlighting).

## Resources
* [List of all the highlighting files](http://kate-editor.org/syntax/update-3.7.xml)
* [Article on kate-editor.org](http://kate-editor.org/2005/03/24/writing-a-syntax-highlighting-file/)
