function viewDataTitle(myData) {
    let html = "";

    html += `<tr>`;
    for (let [i, _] of Object.entries(myData)) {
        html += `<th>${i}</th>`;
    }
    html += `</tr>`;

    return html;
}
function viewData(myData) {

    let html = "";

    html += `<tr>`;
    for (let [_, v] of Object.entries(myData)) {
        html += `<td> ${v}</td>`;
    }
    html += `</tr>`;

    return html;
}

function viewInTable(theData, selectorId) {
    let theHTMLStr = "<p>no data to view</p>";
    if (theData.length > 0) {
        theHTMLStr = "<table>";
        theHTMLStr += viewDataTitle(theData[0]);
        for (let i = 0; i < theData.length; i++) {
            theHTMLStr += viewData(theData[i]);

        }
        theHTMLStr += `</table>`;
    }
    document.querySelector(selectorId).innerHTML =
        theHTMLStr;
}

// module.exports = {
//     viewInTable
// }