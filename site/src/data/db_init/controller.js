const pool = require('../db');
const queries_init = require('./queries');
// const queries_init_data = require('./queries_data');
const test = (req, res) => {
    res.status(200).send("test done");
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
    // pool.query(queries_init_data.addDataToCourseTopicsTable, (error, results) => {
    //     if (error) throw error;

    // })
    res.status(200).json(results_records);
}




module.exports = {
    initDatabase,
    test,

}