const db = require('../db');

const InfoPalavras = db.sequelize.define('info_palavras', {
    codigo: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    quantidade_palavras: {
        type: db.Sequelize.INTEGER,
        allowNull: true
    }, 
    ultima_modificacao: {
        type: db.Sequelize.DATE,
        allowNull: true
    }
}, {timestamps: false})

module.exports = InfoPalavras;