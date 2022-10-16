console.log("=== contentLoaderAI.js")

var s = document.createElement('script');
s.src = chrome.runtime.getURL('src/scriptAI.js');
(document.head || document.documentElement).appendChild(s);

s.onload = function () {
    this.remove();
};

