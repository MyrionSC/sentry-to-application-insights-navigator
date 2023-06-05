console.log("=== contentLoaderAI.js")

const s = document.createElement('script')
s.src = chrome.runtime.getURL('src/scriptSentry.js')
(document.head || document.documentElement).appendChild(s)

s.onload = function () {
    this.remove()
};

