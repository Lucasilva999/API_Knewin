const db = require('../db');

const InfoPalavras = db.sequelize.define('info_palavras', {
    codigo: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    quantidade_palavras: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    ultima_modificacao: {
        type: db.Sequelize.DATE,
        allowNull: false
    }
})

module.exports = InfoPalavras;