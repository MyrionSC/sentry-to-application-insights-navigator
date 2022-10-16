console.log("=== From script.js")
// const CONSTANTS_PERSISTED_MODELS = "dbnav_persistedModelDict"
// const CONSTANTS_USERNAME = "dbnav_username"
//
// // wait for stuff to be loaded before running
// let startTimeout = () => {
//     setTimeout(() => {
//         console.log("testing window.fileBrowserView")
//         if (window.fileBrowserView) {
//             console.log('Databricks-navigator: ready!');
//             // TODO: handle - in email. fx. e-mand@seges.dk. It evaluates to "e" right now
//             localStorage[CONSTANTS_USERNAME] = window.fileBrowserView.localPref.storeKey.split("-")[0]
//             startScrapingLoop();
//         } else {
//             console.log('Databricks-navigator: not ready');
//             startTimeout();
//         }
//     }, 1000);
// }
//
// function startScrapingLoop() {
//     setInterval(() => {
//         let modelKeyAttrList = window.fileBrowserView.treeProvider.collection.models.map(m => m.attributes)
//
//         let persistedModelDict = localStorage[CONSTANTS_PERSISTED_MODELS] ? JSON.parse(localStorage[CONSTANTS_PERSISTED_MODELS]) : {}
//         for (let key in modelKeyAttrList) {
//             let attr = modelKeyAttrList[key]
//             persistedModelDict[attr.id] = attr
//         }
//         localStorage[CONSTANTS_PERSISTED_MODELS] = JSON.stringify(persistedModelDict)
//
//     }, 1000 * 10)
// }
//
//
// // helpers
// function getObjectValues(obj) {
//     return Object.values(obj)
// }
//
// startTimeout()
