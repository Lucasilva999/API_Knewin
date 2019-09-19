const db = require('../db');

const LogNoticia = db.sequelize.define('logNoticia', {
    codigo: {
        type: db.Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false
    }, 
    quantidade_gravada: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    pagina: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
})

//LogNoticia.sync({force: true});

module.exports = LogNoticia;