console.log("=== From scriptAI.js")

// Does not work :/

// function setSearchTermWhenReady(searchTerm) {
//     // Will never be found because iframe...
//     const searchInputEle = document.querySelector("input[title='search-text-box']")
//     if (searchInputEle) {
//         searchInputEle.value = searchTerm
//     } else {
//         setTimeout(() => {
//             console.log("trying to set...")
//             setSearchTermWhenReady(searchTerm)
//         }, 500)
//     }
// }
//
// setTimeout(() => {
//     const url = document.location.toString()
//     console.log(url)
//     if (url.includes("airlinq-airmaster-prod-1/searchV1")) {
//         const regRes = url.match(/searchTerm=[^&]+/g)
//         console.log(regRes)
//         if (regRes) {
//             const searchTerm = regRes[0].split("=")[1]
//             console.log(searchTerm)
//             setSearchTermWhenReady(searchTerm)
//         }
//     }
// },100)
