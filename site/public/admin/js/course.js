function viewAllcourses() {
    console.log('View all courses');
    fetch('/api/course/', { method: 'GET' })
        .then((myData) => { return myData.json() })
        .then((myDataAsObj) => {
            console.log(myDataAsObj);
            viewInTable(myDataAsObj, '#viewCoursesDiv');
        })
}
