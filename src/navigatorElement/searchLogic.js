function topClick(event) {
    // remove active from all and add to clicked
    let topButtons = document.querySelectorAll("div.search-top-container > div")
    topButtons.forEach((e) => e.classList.remove("active"))
    event.target.classList.add("active")
    filterContent()
}

function setContent(contentArray) {
    if (contentArray.length > 20) {
        contentArray = contentArray.slice(0, 20)
    }
    document.querySelector("div.content-container").innerHTML = contentArray
        .map((c) => `
            <div onclick="chooseContent(event)" data-dbid="${c.id}">
                ${c.content}<span class="typespan">${c.type}</span>
            </div>
        `).join("\n")
}

function getContentArrayFilteredByType(possibleContentArray) {
    let activeButton = document.querySelector("div.search-top-container > div.active")
    let filterType = activeButton?.dataset?.type;
    switch (filterType) {
        case "all":
            return possibleContentArray
        case "file":
            return possibleContentArray.filter(c => c.type === "shell")
    }
    return possibleContentArray.filter(e => e.type === filterType)
}

function getContentArray() {
    let contentArray = localStorage[CONSTANTS_PERSISTED_MODELS] ?
        Object.values(JSON.parse(localStorage[CONSTANTS_PERSISTED_MODELS])) : []
    // if (localStorage[CONSTANTS_USERNAME]) {
    //     let username = localStorage[CONSTANTS_USERNAME]
    //     contentArray = contentArray.filter(value => value.pathName.includes(username))
    // }
    return contentArray
}

let filterContent = () => {
    // filter content for type, if any
    let possibleContentArray = getContentArray()
    let typeFilteredContentArray = getContentArrayFilteredByType(possibleContentArray)

    let searchTerm = document.querySelector("div.search-field-container input[type='text']").value
        .toLowerCase().replace(" ", "")

    // return all if no search term
    if (searchTerm === "") {
        let results = typeFilteredContentArray.map(r => ({
            id: r.id,
            content: r.name,
            type: r.type
        }))
        setContent(results)
        return;
    }

    let fuzzyresult = fuzzysort.go(searchTerm, typeFilteredContentArray, {key: "name"})
    let resultsWithHighlight = fuzzyresult.map(r => ({
        id: r.obj.id,
        content: fuzzysort.highlight(r, open = '<span class="fuzzyhightlight">', close = '</span>'),
        type: r.obj.type
    }))
    setContent(resultsWithHighlight);
}

let chooseContent = (event) => {
    if (event.type === "keydown" && event.code !== "Enter") return;
    let chosenEle = event.type === "keydown" ?
        document.querySelector("div.content-container").firstChild.nextSibling :
        event.target; // click

    let id = chosenEle.dataset.dbid
    location.href = `#notebook/${id}`
    document.querySelector('.search-field-container input[type="text"]').blur()
}

document.addEventListener('keydown', ev => {
    // === File Navigation
    if (ev.altKey && ev.ctrlKey && ev.code.includes('KeyL')) {
        filterContent();
        // document.querySelector('div.search-container').css
        document.querySelector('div.search-field-container input[type="text"]').focus()
    }
    if (ev.code === 'Escape') {
        document.querySelector('.search-field-container input[type="text"]').blur()
    }
})
