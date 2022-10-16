console.log("=== From scriptSentry.js")

function addButtonIfTransactionInMessage() {
    const messageText = document.querySelector("#message + div").textContent
    const matchRes = messageText.match(/transact-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}/g)
    if (matchRes) {
        console.log(matchRes[0])

        const applicationInsightsSearchUrl = "REPLACE"
        const html = `
            <a class="linkBtn" href="${applicationInsightsSearchUrl}?searchTerm=${matchRes[0]}" target="_blank">
                <span class="content">Follow Transaction</span>
            </a>
        `;
        const placeholder = document.createElement("div");
        placeholder.insertAdjacentHTML("afterbegin", html);
        const node = placeholder.firstElementChild;

        const shareBtn = document.querySelector("button[aria-label='Share']")
        shareBtn.after(node)
    }
}

function waitForMessageLoad() {
    const messageEle = document.querySelector("#message")
    if (messageEle) {
        addButtonIfTransactionInMessage()
    } else {
        setTimeout(() => {
            waitForMessageLoad()
        }, 100)
    }
}

waitForMessageLoad()
