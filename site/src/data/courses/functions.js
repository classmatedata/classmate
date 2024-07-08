const client = require('../db');
const queries = require('./queries');

// Function to call the stored procedure
async function addCourse(courseName, lang) {
    let client;
    try {
        client = await pool.connect();

        // Execute the query
        const res = await client.query(queries.addCourse, [courseName, lang]);
        // Get the returned values
        const nextTextId = res.rows[0].next_text_id;
        const courseId = res.rows[0].course_id;
        console.log('Next text ID:', nextTextId);
        console.log('Course ID:', courseId);

        console.log('Procedure called successfully');
        return { courseId, nextTextId };
    } catch (err) {
        console.error('Error calling procedure:', err);
    } finally {
        await client.end();
    }
}

module.exports = {
    addCourse,
}