function injectNavigatorElement() {
    var html = `
        <label class="datanav-label" for="datanav-input">
            <input list="datanav-input-datalist" id="datanav-input" name="datanav-input" />
            <datalist id="datanav-input-datalist"></datalist>
        </label>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    const ele = document.querySelector('input#datanav-input');

    document.addEventListener('keydown', ev => {

        // === Def Navigation
        if (ev.altKey && ev.ctrlKey && ev.code.includes('KeyM')) {
            // insert symbol datalist
            // add eventlistener to ele
        }

        // === File Navigation
        if (ev.altKey && ev.ctrlKey && ev.code.includes('KeyN')) {
            initFileDataList()
            ele.addEventListener('keydown', fileEventListener)
            document.querySelector('input#datanav-input').focus()
        }
    });
}

function fileEventListener(ev) {
    const ele = document.querySelector('input#datanav-input');
    if (ev.code === 'Enter') {
        let persistedModelDict = localStorage[CONSTANTS_PERSISTED_MODELS] ? JSON.parse(localStorage[CONSTANTS_PERSISTED_MODELS]) : {}
        let modelList = getObjectValues(persistedModelDict);

        let userRepo = modelList.find(model => model.pathName && model.pathName.startsWith(`/Repos/${localStorage[CONSTANTS_USERNAME]}`))
        let foundFileModel = userRepo ?
            modelList.find(model => model.pathName && model.pathName.startsWith(`/Repos/${localStorage[CONSTANTS_USERNAME]}`) && model.pathName === ele.value && model.type === "shell") :
            modelList.find(model => model.pathName === ele.value && model.type === "shell")

        if (foundFileModel) {
            location.href = `#notebook/${foundFileModel.id}`;
            ele.value = "";
            ele.blur() // remove focus from ele
            ele.removeEventListener("keydown", fileEventListener) // remove self after call
        } else {
            alert(`could not find persisted file with path ${ele.value}`)
        }
    } else if (ev.code === 'Escape') {
        ele.blur() // remove focus from ele
    }
}


function getMockModelList() {
    return [
        {name: "Matias", pathName: "Grønmo"},
        {name: "Asger", pathName: "Printz Madsen"},
        {name: "Dennis", pathName: "Christensen"},
        {name: "Martin", pathName: "Raunkjær Andersen"},
    ]
}

function initFileDataList() {
    // let filteredModelList = getFilteredModelList();
    let filteredModelList = getMockModelList();
    let htmlOptionList = filteredModelList.map(m => `<option value="${m.pathName}">${m.name}</option>`).join("")

    document.querySelector('datalist#datanav-input-datalist').innerHTML = htmlOptionList
}

function getFilteredModelList() {
    let persistedModelDict = localStorage[CONSTANTS_PERSISTED_MODELS] ? JSON.parse(localStorage[CONSTANTS_PERSISTED_MODELS]) : {}
    let modelList = getObjectValues(persistedModelDict);

    let userRepo = modelList.find(model => model.pathName && model.pathName.startsWith(`/Repos/${localStorage[CONSTANTS_USERNAME]}`))
    return userRepo ?
        modelList.filter(model => model.pathName && model.pathName.startsWith(`/Repos/${localStorage[CONSTANTS_USERNAME]}`) && model.type === "shell") :
        modelList.filter(model => model.type === "shell");
}

