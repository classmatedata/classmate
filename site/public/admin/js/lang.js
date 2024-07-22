function viewAlllang() {

    fetch('/api/lang/', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            viewInTable(myDataAsObj, '#viewLangDiv');
        })
}

function viewLang() {
    let langCode = document.querySelector('#inputLangCode').value;
    if (langCode.length != 2) {
        viewInTable([{ 'error': 'should be 2 characters code' }], '#viewLangByCodeDiv');
    } else {
        fetch(`/api/lang/${langCode}`, { method: 'GET' })
            .then((myData) => { return myData.json() })
            .then((myDataAsObj) => {
                viewInTable(myDataAsObj, '#viewLangByCodeDiv');
            })
    }
}