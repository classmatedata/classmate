const pool = require('../db');
const queries = require('./queries');

const getGenders = async (req, res) => {
    try {

        const client = await pool.connect();
        const result = await client.query(queries.getGenders);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}

const getGendersByLang = async (req, res) => {
    try {
        const langcode = req.params.lang;

        if (langcode != NaN) {
            const client = await pool.connect();
            const results = await client.query(queries.getGendersByLang, [langcode]);
            client.release();
            res.status(200).json(results.rows);

        } else {
            throw ("no lang given");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports = {

    getGenders,
    getGendersByLang,
}