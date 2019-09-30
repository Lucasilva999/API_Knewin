const db = require('../db');

const LogNoticia = db.sequelize.define('logNoticia', {
    codigo: {
        type: db.Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    }, 
    quantidade_gravada: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    quantidade_noticias: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    pagina: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = LogNoticia;