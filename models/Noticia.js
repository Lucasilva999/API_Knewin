const db = require('../db');

const Noticia = db.sequelize.define('noticia', {
    codigo: {
        type: db.Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    }, 
    id_noticia: {
        type: db.Sequelize.BIGINT,
        allowNull: false,
    },
    data_publicacao: {
        type: db.Sequelize.DATE,
        allowNull: false,
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
        defaultValue: 0
    },
    url: {
        type: db.Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Não Encontrado'
    },
    palavras: {
        type: db.Sequelize.STRING,
        allowNull: false
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
    createdAt: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
    }
})

module.exports = Noticia;