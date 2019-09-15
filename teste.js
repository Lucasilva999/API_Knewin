const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Noticia = require("./models/Noticia");
const LogNoticia = require("./models/LogNoticia");
const config = require('./query');
const definePalavarasQuery = require('./functions/definePalavarasQuery');
const encontraPalavrasNoTexto = require('./functions/encontraPalavrasNoTexto');
dotenv.config();

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
.then(()=> console.log('Conectado ao Banco de Dados...'))
.catch(err => console.log(`Erro ao se conectar ao Banco de Dados: ${err}`))

async function contador() {
    
    let ultimoRegistro = await LogNoticia.findOne({}).sort({"data_cadastro": "desc"});
    if(ultimoRegistro) {
        let codigo = ultimoRegistro.codigo + 1;
        let pagina = ultimoRegistro.pagina + 10;
        await LogNoticia.create({codigo, pagina});
    }

    if(!ultimoRegistro) {
        await LogNoticia.create({"codigo": 1, "pagina": 10});
    }
}

contador();
