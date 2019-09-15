const mongoose = require('mongoose');

//Model com que as informações são salvas no BD
const ContadorSchema = new mongoose.Schema({
    noticiaId: {
        type: Number,
        default: 0
    },
    logNoticiaId: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('contador', ContadorSchema);