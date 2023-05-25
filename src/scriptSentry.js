console.log("=== From scriptSentry.js")

function addButtonIfTransactionInMessage(messageText) {
    const matchRes = messageText.match(/transact-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/g)
    if (matchRes) {
        console.log(matchRes[0])

        const applicationInsightsSearchUrl = "https://portal.azure.com/#@AirmasterAS.onmicrosoft.com/resource/subscriptions/30a95655-48bf-45e0-9c40-d60a8b99d38c/resourceGroups/rg-airlinq-airmaster-prod-1/providers/Microsoft.Insights/components/appi-airlinq-airmaster-prod-1/searchV1"
        const AIButton = `
            <a class="linkBtn" href="${applicationInsightsSearchUrl}" target="_blank">
                <span class="content">To Application Insights</span>
            </a>
        `;
        const placeholder = document.createElement("div");
        placeholder.insertAdjacentHTML("afterbegin", AIButton);
        const node = placeholder.firstElementChild;

        const shareBtn = document.querySelector("button[aria-label='Copy Link']")
        shareBtn.after(node)
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
