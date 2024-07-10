const getGenders = `SELECT * FROM getGenders()`;
const getGendersByLang = `SELECT * FROM getGendersByLang( $1);`;

module.exports = {
    getGenders,
    getGendersByLang,
}