function elm(id) { return typeof id === 'string' ? document.getElementById(id) : '' }

var localVer = 1.0

// generate blurb
elm('blurb').innerHTML = (function() {var t = ['works in Internet Explorer 9!','took longer than you would imagine','<del>lack of features</del> simplicity at its finest','dark mode!!!!','don\'t forget to export!','no watermarks!','there\'s an auto-indent feature btw','@xy_rus on twt!','fast? probably','compatible with old browsers!','open-source,visit on github!','why??!?!?!','barely 0.15 MB total size!','~0.15 MB in total!','~150 KB in total!','made in 2021','online version <a href="https://xyr11.github.io/simple-html-previewer/">here</a>','this text changes every reload','version ' + localVer,'it\'s uniquely simple','simple and (somewhat) elegant','don\'t forget to copy your code!','change the orientation of the preview!'];return t[Math.floor(100 * Math.random() % t.length)]})() + ' • '

// Toggle theme
var theme = elm('theme')
var isIE = window.matchMedia('(-ms-high-contrast: active), (-ms-high-contrast: none)').matches
if (window.localStorage && window.localStorage.theme) {
  if (window.localStorage.theme === 'light') theme.checked = false
  else theme.checked = true
}
function toggle () {
  // if (isIE) return // disable if IE
  if (theme && theme.checked) elm('body').classList.remove('light')
  else elm('body').classList.add('light')
  if (window.localStorage) {
    if (theme.checked) window.localStorage.theme = 'dark'
    else window.localStorage.theme = 'light'
  }
}
if (theme) {
  theme.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) { theme.checked = !theme.checked; toggle() }
  })
}
toggle()

// check version
if (elm('ver')) elm('ver').innerHTML = localVer
try { if (version > localVer) { document.getElementsByTagName('body')[0].innerHTML += '<div id="popup" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3);cursor:not-allowed"><div style="padding:35px;width:80%;max-width:480px;height:70%;max-height:280px;margin:auto;margin-top:80px;text-align:center;color:white;background-color:#121212;border:4px solid #ff0;font-size:16px;box-shadow:0 1px 16px #000;overflow:auto;cursor:help"><h2 style="margin: 12px 0">Not the latest version!</h2><p>We\'ve detected that your local version is running an older version and we recommend you to <a href="https://github.com/xyr11/simple-html-previewer">re-download the newer version on GitHub</a>, or <a href="https://xyr11.github.io/simple-html-previewer/">visit the online version</a> which is always up-to-date.</p><p style="font-size:.8em"><del><a style="cursor:not-allowed">how the heck did you know???</a></del><br><br><a id="closepopup" style="cursor:pointer" href="javascript:void(0)" onclick="document.getElementById(\'popup\').style.display=\'none\'">ok i get it, now close this popup pls</a></p></div></div>' } } catch (e) {}

// smooth transition when switching themes
setTimeout(function () {
  document.getElementsByTagName('body')[0].style.transition = 'background-color .3s, color .3s'
  if (elm('content')) elm('content').style.transition = 'color .3s, background-color .3s'
}, 800)
