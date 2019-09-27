const PalavrasQuery = require('../models/PalavrasQuery');

async function defineStringQuery() {
    let string = '';
    const res = await PalavrasQuery.findAll();
    res.forEach(resultado => {
        string = string.concat(`\"${resultado.dataValues.palavra.toLowerCase()}\"`, ' OR ');
    })
    string = string.substring(0, string.length - 4);
    return string;
}

module.exports = defineStringQuery;