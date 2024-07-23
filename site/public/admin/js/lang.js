function viewAlllang() {

    fetch('/api/lang/', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            viewInTable(myDataAsObj, '#viewLangDiv');
        })
}



function addLang() {
    let langcode = document.querySelector('#inputAddLangCode').value;
    let langname = document.querySelector('#inputAddLangName').value;
    let langdir = document.querySelector('#inputAddLangDir').value;
    fetch('/api/lang/', {
        method: 'POST',
        body: JSON.stringify({ langcode, langname, langdir  }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            if(myDataAsObj.status) {
                viewInTable([myDataAsObj], '#addLangInfoDiv');
            }
          
        })
}


function viewLang(){
    let langCode = document.querySelector('#inputUpdateLangCode').value;
    document.querySelector('#inputUpdateLangName').value= "";
    document.querySelector('#inputUpdateLangDir').value = "";
    if (langCode.length != 2) {
        viewInTable([{ 'error': 'should be 2 characters code' }], '#updateLangInfoDiv');
    } else {
        fetch(`/api/lang/${langCode}`, { method: 'GET' })
            .then((myData) => { return myData.json() })
            .then((myDataAsObj) => {
                if(myDataAsObj.status) {
                    viewInTable([myDataAsObj], '#updateLangInfoDiv');
                } else {
                    viewInTable(myDataAsObj, '#updateLangInfoDiv');
                    console.log(myDataAsObj[0]);
                    document.querySelector('#inputUpdateLangName').value= myDataAsObj[0].langname;
                    document.querySelector('#inputUpdateLangDir').value = myDataAsObj[0].langdir;
                }
            })
    }
}

function updateLangName(){
    let langcode = document.querySelector('#inputUpdateLangCode').value;
    let langname = document.querySelector('#inputUpdateLangName').value;
    
    fetch(`/api/lang/${langcode}`, {
        method: 'PATCH',
        body: JSON.stringify({ langname  }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            if(myDataAsObj.status) {
                viewInTable([myDataAsObj], '#updateLangInfoDiv');
            }
          
        })
}

function updateLangDir(){
    let langcode = document.querySelector('#inputUpdateLangCode').value;
    let langdir = document.querySelector('#inputUpdateLangDir').value;
    
    fetch(`/api/lang/${langcode}/dir`, {
        method: 'PATCH',
        body: JSON.stringify({ langdir  }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            if(myDataAsObj.status) {
                viewInTable([myDataAsObj], '#updateLangInfoDiv');
            }
          
        })
}

function deleteLang(){
    let langcode = document.querySelector('#inputUpdateLangCode').value;
     
    fetch(`/api/lang/${langcode}`, {
        method: 'DELETE',
      
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            if(myDataAsObj.status) {
                viewInTable([myDataAsObj], '#updateLangInfoDiv');
            }
          
        })
}