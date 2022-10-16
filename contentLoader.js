
var s = document.createElement('script');
s.src = chrome.runtime.getURL('src/script.js');
(document.head || document.documentElement).appendChild(s);

var fuzzySort = document.createElement('script');
fuzzySort.src = chrome.runtime.getURL('src/navigatorElement/fuzzysort.js');
(document.head || document.documentElement).appendChild(fuzzySort);

var searchLogic = document.createElement('script');
searchLogic.src = chrome.runtime.getURL('src/navigatorElement/searchLogic.js');
(document.head || document.documentElement).appendChild(searchLogic);

const eleUrl = chrome.runtime.getURL('src/navigatorElement/navigator.html');
fetch(eleUrl).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
});

s.onload = function () {
    this.remove();
};
