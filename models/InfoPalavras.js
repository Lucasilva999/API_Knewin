const db = require('../db');

const InfoPalavras = db.sequelize.define('info_palavras', {
    codigo: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    ultima_modificacao: {
        type: db.Sequelize.DATE,
        allowNull: true
    }
}, {timestamps: false})

module.exports = InfoPalavras;