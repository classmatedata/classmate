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

module.exports = {
    viewDataTitle,
    viewData
}