/*!
 * css-var-polyfill.js - v1.2
 * Copyright (c) 2019 Aaron Barker <http://aaronbarker.net>=
 * Date: 2021-03-19
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Aaron Barker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var cssVarPoly={init:function(){window.CSS&&window.CSS.supports&&window.CSS.supports("(--foo: red)")?console.log("your browser supports CSS variables, aborting and letting the native support handle things."):(console.log("no support for you! polyfill all (some of) the things!!"),document.querySelector("body").classList.add("cssvars-polyfilled"),cssVarPoly.ratifiedVars={},cssVarPoly.varsByBlock={},cssVarPoly.oldCSS={},cssVarPoly.findCSS(),cssVarPoly.updateCSS())},findCSS:function(){var e=document.querySelectorAll('style:not(.inserted),link[rel="stylesheet"],link[rel="import"]'),r=1;[].forEach.call(e,function(e){var s;"STYLE"===e.nodeName?(s=e.innerHTML,cssVarPoly.findSetters(s,r)):"LINK"===e.nodeName&&(cssVarPoly.getLink(e.getAttribute("href"),r,function(e,r){cssVarPoly.findSetters(r.responseText,e),cssVarPoly.oldCSS[e]=r.responseText,cssVarPoly.updateCSS()}),s=""),cssVarPoly.oldCSS[r]=s,r++})},findSetters:function(e,r){cssVarPoly.varsByBlock[r]=e.match(/(--[\w-]+:[\s]*[^;\n}]+)/g)||[]},updateCSS:function(){for(var e in cssVarPoly.ratifySetters(cssVarPoly.varsByBlock),cssVarPoly.oldCSS){var r=cssVarPoly.replaceGetters(cssVarPoly.oldCSS[e],cssVarPoly.ratifiedVars);if(document.querySelector("#inserted"+e))document.querySelector("#inserted"+e).innerHTML=r;else{var s=document.createElement("style");s.type="text/css",s.innerHTML=r,s.classList.add("inserted"),s.id="inserted"+e,document.getElementsByTagName("head")[0].appendChild(s)}}},replaceGetters:function(e,r){for(var s in r){var t=new RegExp("var\\(\\s*"+s+"\\s*\\)","g");e=e.replace(t,r[s]);var o=new RegExp("var\\([^\\)]+,\\s*([^\\)]+)\\)","g"),n=e.match(o);n&&n.forEach(function(r){e=e.replace(r,r.match(/var\([^\)]+,\s*([^\)]+)\)/)[1])})}return e},ratifySetters:function(e){for(var r in e){e[r].forEach(function(e){var r=e.split(/:\s*/);cssVarPoly.ratifiedVars[r[0]]=r[1].replace(/;/,"")})}},getLink:function(e,r,s){var t=new XMLHttpRequest;t.open("GET",e,!0),t.overrideMimeType("text/css;"),t.onload=function(){t.status>=200&&t.status<400?"function"==typeof s&&s(r,t):console.warn("an error was returned from:",e)},t.onerror=function(){console.warn("we could not get anything from:",e)},t.send()}};cssVarPoly.init();