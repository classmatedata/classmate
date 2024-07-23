const pool = require('../config/config_db');
const queries = require('../queries/queries_lang');

const getLangs = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(queries.getLangs);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}


const getLang = async (req, res) => {
    try {

        const lang = req.params.lang;
        console.log(`get lang datata for ${lang}`);
        const client = await pool.connect();
        const result = await client.query(queries.getLangByCode, [lang]);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}
const checkLangExistsFn = async (langcode) => {
    let client;
    try {
        client = await pool.connect();
        
        const results = await client.query(queries.getLangByCode, [langcode]);

        if (results.rows.length) {
            return true;
        }

    } catch (error) {
        console.error("Error executing checkLangExistsFn query:", error);
    } finally {
        if (client) client.release();
    }

    return false;
}
const addLang = async (req, res) => {
    let client;
    try {
        const { langcode, langname, langdir } = req.body;
        
        client = await pool.connect();
        let isExist = await checkLangExistsFn(langcode);
        if (isExist) {
            return res.status(200).json({ 'status': 'already exists' });
        } else {
            await client.query(queries.addLang, [langcode, langname, langdir]);
            return res.status(200).json({ 'status': 'lang added' });
        }
    } catch (error) {
        console.error("Error adding lang:", error);
        return res.status(500).json({ 'status': 'error', 'message': error.message });
    } finally {
        if (client) client.release();
    }
    return;
}

const updateLang = async (req, res) => {
    const lang = req.params.lang;
    const { langname, langdir } = req.body;
    let client;

    try {
        let isExist = await checkLangExistsFn(lang);
        if (!isExist) {
            return res.status(200).json({ 'status': 'no lang in DB exists' });
        } else {
            client = await pool.connect();
            await client.query(queries.updateLang, [lang, langname, langdir]);
            return res.status(200).json({ 'status': 'lang updated' });
        }
    } catch (error) {
        console.error("Error updating lang:", error);
        return res.status(500).json({ 'status': 'error', 'message': error.message });
    } finally {
        if (client) client.release();
    }
}

const updateLangName = async (req, res) => {
    const lang = req.params.lang;
    const { langname } = req.body;
    let client;

    try {
        const isExist = await checkLangExistsFn(lang);
        if (!isExist) {
            return res.status(200).json({ 'status': 'no lang in DB exists' });
        } else {
            client = await pool.connect();
            await client.query(queries.updateLangName, [lang, langname]);
            return res.status(200).json({ 'status': 'lang name updated' });
        }
    } catch (error) {
        console.error("Error updating lang name:", error);
        return res.status(500).json({ 'status': 'error', 'message': error.message });
    } finally {
        if (client) client.release();
    }
}

const updateLangDir = async (req, res) => {
    const lang = req.params.lang;
    const { langdir } = req.body;
    let client;

    try {
        const isExist = await checkLangExistsFn(lang);
        if (!isExist) {
            return res.status(200).json({ 'status': 'no lang in DB exists' });
        } else {
            client = await pool.connect();
            await client.query(queries.updateLangDir, [lang, langdir]);
            return res.status(200).json({ 'status': 'lang dir updated' });
        }
    } catch (error) {
        console.error("Error updating lang dir:", error);
        return res.status(500).json({ 'status': 'error', 'message': error.message });
    } finally {
        if (client) client.release();
    }
}

const deleteLang = async (req, res) => {
    const lang = req.params.lang;
    let client;

    try {
        const isExist = await checkLangExistsFn(lang);
        if (!isExist) {
            return res.status(200).json({ 'status': 'no lang in DB exists' });
        } else {
            client = await pool.connect();
            await client.query(queries.removeLang, [lang]);
            return res.status(200).json({ 'status': 'lang deleted' });
        }
    } catch (error) {
        console.error("Error deleting lang:", error);
        return res.status(500).json({ 'status': 'error', 'message': error.message });
    } finally {
        if (client) client.release();
    }
}


module.exports = {
    getLangs,
    getLang,
    addLang,
    updateLang,
    updateLangName,
    updateLangDir,
    deleteLang
}