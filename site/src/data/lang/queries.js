const getLangs = `SELECT * FROM lang`;
const addLang = `INSERT INTO lang(langcode, langname, langdir)	VALUES ($1, $2, $3);`;
const updateLang = `UPDATE lang  SET  langname=$2, langdir=$3 	WHERE langcode=$1`;
const removeLang = `DELETE FROM lang WHERE langcode=$1;`

module.exports = {
    getLangs,
    addLang,
    updateLang,
    removeLang,
}