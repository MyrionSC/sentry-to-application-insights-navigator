
console.log("=== contentloader.js start")

var s = document.createElement('script');
s.src = chrome.runtime.getURL('src/script.js');
(document.head || document.documentElement).appendChild(s);

const eleUrl = chrome.runtime.getURL('src/navigatorElement/navigator.html');
fetch(eleUrl).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
});

s.onload = function () {
    this.remove();
};

console.log("=== contentloader.js end")
