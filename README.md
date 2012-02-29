# KateSyntax.js
This is an attempt at using the Kate syntax highlighting definitions for a JavaScript highlighter.
## HowTo:
`node convert.js` will convert the definitions for all the languages, and store them in syntax/*name*.js.
The resulting files consist of JavaScript code that can process a string into a DOM element with highlighting applied.
There's also an example for C++ highlighting [on jsFiddle](http://jsfiddle.net/yfBsW/2/).
## Resources:
* [List of all the highlighting files](http://kate-editor.org/syntax/update-3.7.xml)
* [Article on kate-editor.org](http://kate-editor.org/2005/03/24/writing-a-syntax-highlighting-file/)
