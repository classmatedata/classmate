function viewAllcourses() {


    console.log('View all courses');
    fetch('/api/course/', { method: 'GET' })
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

            document.querySelector('#viewCoursesDiv').innerHTML =
                theHTMLStr;
        })
}
