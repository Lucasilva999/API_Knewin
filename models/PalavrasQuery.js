const db = require('../db');

const PalavrasQuery = db.sequelize.define('palavras', {
    codigo: {
        type: db.Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    }, 
    palavra: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

//PalavrasQuery.sync({force: true});

module.exports = PalavrasQuery;