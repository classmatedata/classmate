
function viewAllUsers() {
    console.log('View all users');
    fetch('/api/users/', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            let theData = myDataAsObj
            let theHTMLStr = "<table>";
            theHTMLStr += viewDataTitle(theData[0]);
            for (let i = 0; i < theData.length; i++) {
                theHTMLStr += viewData(theData[i]);

            }
            theHTMLStr += `</table>`;

            document.querySelector('#viewUsersDiv').innerHTML =
                theHTMLStr;
        })
}

function viewAllTeachers() {
    console.log('View all teachers');
    fetch('/api/users/teacher', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            let theData = myDataAsObj;
            let theHTMLStr = "<p>no teachers yet</p>";
            if (theData.length > 0) {
                theHTMLStr = "<table>";
                theHTMLStr += viewDataTitle(theData[0]);
                for (let i = 0; i < theData.length; i++) {
                    theHTMLStr += viewData(theData[i]);

                }
                theHTMLStr += `</table>`;
            }
            document.querySelector('#viewTeachersDiv').innerHTML =
                theHTMLStr;
        })
}

function addOrUpdateTeacher() {
    let userid = document.querySelector('#inputTeacherId').value;
    let hoursToVolonteer = document.querySelector('#inputHoursVolonteer').value;
    fetch('/api/users/teacher', {
        method: 'PUT',
        body: JSON.stringify({ userid, hoursToVolonteer }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            let theData = myDataAsObj;
            let theHTMLStr = "<p>no teachers yet</p>";
            if (theData.length > 0) {
                theHTMLStr = "<table>";
                theHTMLStr += viewDataTitle(theData[0]);
                for (let i = 0; i < theData.length; i++) {
                    theHTMLStr += viewData(theData[i]);

                }
                theHTMLStr += `</table>`;
            }
            document.querySelector('#teacherDivInfo').innerHTML =
                theHTMLStr;
        })
}
