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
    },
    createdAt: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
    }
})

module.exports = PalavrasQuery;