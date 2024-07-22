
function viewAllUsers() {
    console.log('View all users');
    fetch('/api/users/', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            viewInTable(myDataAsObj, '#viewUsersDiv');

        })
}

function viewAllTeachers() {
    console.log('View all teachers');
    fetch('/api/users/teacher', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            viewInTable(myDataAsObj, '#viewTeachersDiv');

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
            viewInTable(myDataAsObj, '#teacherDivInfo');
        })
}
