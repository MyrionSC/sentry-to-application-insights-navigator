console.log("=== From scriptSentry.js")

function addButtonIfTransactionInMessage(messageText) {
    const matchRes = messageText.match(/transact-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/g)
    if (matchRes) {
        console.log(matchRes[0])

        // === AI Button
        const AISearchUrl = "https://portal.azure.com/#@AirmasterAS.onmicrosoft.com/resource/subscriptions/30a95655-48bf-45e0-9c40-d60a8b99d38c/resourceGroups/rg-airlinq-airmaster-prod-1/providers/Microsoft.Insights/components/appi-airlinq-airmaster-prod-1/searchV1"
        const AIButton = `
            <a class="linkBtn" href="${AISearchUrl}" target="_blank">
                <span class="content">To Application Insights</span>
            </a>
        `;
        const AIPlaceholder = document.createElement("div");
        AIPlaceholder.insertAdjacentHTML("afterbegin", AIButton);
        const AInode = AIPlaceholder.firstElementChild;
        document.querySelector("button[aria-label='Copy Link']").after(AInode)


        // === Print Insomnia request data, used by insomnia_import.js
        const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        const unixEpochMs = Date.now()
        const headerJson = JSON.parse(Array.from(document.querySelectorAll('td')).find(el => el.textContent === 'headers').nextSibling.innerText)
        const jwt = headerJson["authorization"].split(" ")[1]
        delete headerJson["authorization"]
        const bodyText = Array.from(document.querySelectorAll('td')).find(el => el.textContent === 'body').nextSibling.innerText
        let urlString = Array.from(document.querySelectorAll('td')).find(el => el.textContent === 'endpoint').nextSibling.innerText;

        let insomniaRequestObj = {
            "_id": `req_${genRanHex(32)}`,
            "type": "Request",
            // "parentId": "wrk_12470cb2aaff49e28b865ece4f3012c6", // set in insomnia_import.js
            "modified": unixEpochMs,
            "created": unixEpochMs,
            "url": urlString,
            "name": matchRes[0],
            "description": `Generated from ${document.location.href}`,
            "method": "GET",
            "body": bodyText === "[undefined]" ? {} : {
                "mimeType": "application/json",
                "text": bodyText
            },
            "parameters": [], // in url is fine
            "headers": Object.entries(headerJson).map(([key, value]) => ({
                "id": `pair_${genRanHex(32)}`,
                "name": key,
                "value": value,
                "description": ""
            })),
            "authentication": {
                "type": "bearer",
                "token": jwt
            },
            "metaSortKey": -unixEpochMs,
            "isPrivate": false,
            "settingStoreCookies": true,
            "settingSendCookies": true,
            "settingDisableRenderRequestBody": false,
            "settingEncodeUrl": true,
            "settingRebuildPath": true,
            "settingFollowRedirects": "global"
        }
        console.log(JSON.stringify(insomniaRequestObj))
    }
}

let tryNum = 0, maxTries = 50

function waitForMessageLoad() {
    const messageEle = document.querySelector(".exc-message")
    if (tryNum > maxTries) {
        console.log("Stopped trying")
        return
    }
    if (messageEle) {
        addButtonIfTransactionInMessage(messageEle.textContent)
    } else {
        setTimeout(() => {
            waitForMessageLoad()
            tryNum++
        }, 500)
    }
}

waitForMessageLoad()
