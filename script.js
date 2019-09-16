const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Noticia = require("./models/Noticia");
const LogNoticia = require("./models/LogNoticia");
const Contador = require("./models/Contador");
dotenv.config();

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
.then(()=> console.log('Conectado ao Banco de Dados...'))
.catch(err => {
    console.log(err);
}) 

async function criarContadores() {
    await Contador.create({"id": "noticia"});
    await Contador.create({"id": "logNoticia"});
}

criarContadores();