const db = require('../db');

const Noticia = db.sequelize.define('noticia', {
    codigo: {
        type: db.Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    }, 
    id_noticia: {
        type: db.Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    data_publicacao: {
        type: db.Sequelize.DATE,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    fonte: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    codigo_veiculo: {
        type: db.Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    url: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    palavras: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    estado: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    uf: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    texto: {
        type: db.Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
})

//Noticia.sync({force: true});

module.exports = Noticia;