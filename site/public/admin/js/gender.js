function viewAllgenders() {

    fetch('/api/gender/', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            viewInTable(myDataAsObj, '#viewGenderDiv');
        })
}
