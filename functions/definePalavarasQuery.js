const PalavrasQuery = require('../models/PalavrasQuery');

async function definePalavarasQuery() {
    let palavras = [];
    const res = await PalavrasQuery.findAll();
    res.forEach(resultado => {
        palavras.push(resultado.dataValues.palavra);
    })
    return palavras;
}

module.exports = definePalavarasQuery;

/*
function definePalavarasQuery() {
    let palavras = [];
    config.query.split("OR").map(s => {
        if(s.indexOf('"') == 1 && s.lastIndexOf('"') > -1) {
            s = s.replace(/"/g, "");
        }
        s = s.trim();
        palavras.push(s);
    });
    return palavras;
}
*/