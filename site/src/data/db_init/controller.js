const pool = require('../db');
const queries = require('./queries');
const queries_init = require('../db_init/queries');

const test = (req, res) => {
    res.status(200).send("test data controller.");
}

const initDatabase = (req, res) => {
    let results_records = [];
    // pool.query(queries_init.createCourseTable, (error, results) => {
    //     if (error) throw error;
    //     results_records.push({ status: 'OK', query: queries_init.createCourseTable, res: results });
    // })
    // pool.query(queries_init.addDataToCourseTable, (error, results) => {
    //     if (error) throw error;
    //     results_records.push({ status: 'OK', query: queries_init.addDataToCourseTable, res: results });
    // })
    // pool.query(queries_init.createCourseTopicsTable, (error, results) => {
    //     if (error) throw error;
    //     results_records.push({ status: 'OK', query: queries_init.createCourseTable, res: results });
    // })
    pool.query(queries_init.addDataToCourseTopicsTable, (error, results) => {
        if (error) throw error;
        results_records.push({ status: 'OK', query: queries_init.addDataToCourseTable, res: results });
    })
    res.status(200).json(results_records);
}




module.exports = {
    initDatabase,
    test,

}