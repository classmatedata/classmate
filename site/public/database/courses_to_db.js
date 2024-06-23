function convert_to_sql_insert_sql(json) {
    let list_queries = [];


    for (let [i, v] of Object.entries(json)) {
        let sql_course = `INSERT INTO courses( name, lang) VALUES ('${v["name"]}','he');`;
        // course_id = $mysqli.insert_id;
        list_queries.push(sql_course);

        for (let [ti, tv] of Object.entries(v["topics"])) {
            let sql_topic = `INSERT INTO course_topics(course_id, topic) VALUES ('$mysqli.insert_id','${tv}')`;
            list_queries.push(sql_topic);
        }
    }

    console.log(list_queries);
}
function load_list(list_url, callback) {
    fetch(list_url)
        .then((response) => response.json())
        .then((json) => callback(json));
}

load_list('courses.json', convert_to_sql_insert_sql);
