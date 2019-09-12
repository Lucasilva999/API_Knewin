const mongoose = require('mongoose');

//Model com que as informações são salvas no BD
const NoticiaSchema = new mongoose.Schema({
    /*codigo: {
        type: Number,
        required: true
    },*/
    /*serial: {
        type: Number,
        required: true
    },*/
    id_noticia: {
        type: Number,
        required: false
    },
    data_publicacao: {
        type: Date,
        required: false
    },
    titulo: {
        type: String,
        required: false
    },
    fonte: {
        type: String,
        required: false
    },
    codigo_veiculo: {
        type: Number,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    /*
    palavras: [{
        type: String,
        required: true
    }],*/
    estado: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false
    },
    texto: {
        type: String,
        required: false
    },
    data_cadastro: {
        type: Date,
        default: Date.now()
    },
    /*
    status_feed: {
        type: Number,
        required: true
    }*/
})

module.exports = mongoose.model('noticia', NoticiaSchema);