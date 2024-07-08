const pool = require('../db_init/db');
const queries = require('./queries');

const getLangs = async (req, res) => {
    try {
        console.log(`pool: ${pool}`);
        console.log(`get courses: ${queries.getLangs}`);
        const client = await pool.connect();
        const result = await client.query(queries.getLangs);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}



module.exports = {
    getLangs,
}