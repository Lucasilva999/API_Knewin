const PalavrasQuery = require('../models/PalavrasQuery');

async function definePalavarasQuery() {
    let palavras = [];
    const res = await PalavrasQuery.findAll();
    res.forEach(resultado => {
        palavras.push(resultado.dataValues.palavra.toLowerCase());
    })
    return palavras;
}

module.exports = definePalavarasQuery;
