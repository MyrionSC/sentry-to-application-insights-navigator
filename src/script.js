console.log("=== From script.js")

function addButtonIfTransactionInMessage() {
    const messageText = document.querySelector("#message + div").textContent
    console.log(messageText)
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
