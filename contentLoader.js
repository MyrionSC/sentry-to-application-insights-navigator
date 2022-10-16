
console.log("=== contentloader.js start")

var s = document.createElement('script');
s.src = chrome.runtime.getURL('src/script.js');
(document.head || document.documentElement).appendChild(s);

s.onload = function () {
    this.remove();
};

console.log("=== contentloader.js end")
