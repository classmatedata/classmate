import texts_json from './lang/he_index.json' with { type: 'json' };
function fillTexts(texts) {
    for (let [quilifier, data] of Object.entries(texts)) {
        if (typeof (data) === "string") {
            document.querySelector(quilifier).innerHTML = data;
        }
        else {
            fillTexts(data);
        }
    }
}


fillTexts(texts_json);