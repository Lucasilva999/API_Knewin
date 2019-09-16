const mongoose = require('mongoose');

//Model com que as informações são salvas no BD
const LogNoticiaSchema = new mongoose.Schema({

    codigo: {
        type: Number,
        default: 0
    },
    quantidade_gravada: {
        type: Number,
        default: 10
    },
    pagina: {
        type: Number,
        default: 0
    },
    data_cadastro: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('log_noticia', LogNoticiaSchema);