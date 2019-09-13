const config = require('../query');

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

module.exports = definePalavarasQuery;