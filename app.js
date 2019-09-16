const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Noticia = require("./models/Noticia");
const LogNoticia = require("./models/LogNoticia");
const Contador = require("./models/Contador");
const config = require('./query');
const definePalavarasQuery = require('./functions/definePalavarasQuery');
const encontraPalavrasNoTexto = require('./functions/encontraPalavrasNoTexto');
dotenv.config();

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
.then(()=> console.log('Conectado ao Banco de Dados...'))
.then( 
    axios.post('http://data.knewin.com/news', config)
    .then(function(response){
        response.data.hits.forEach(async noticia => {
        //Inserindo Notícia
        let contadorNoticia = await Contador.findOneAndUpdate({"id": "noticia"}, {$inc: {"noticiaId": 1}}, {new: true});
        let codigoNoticia = contadorNoticia.noticiaId;
        //let codigoLogNoticia = contador.logNoticiaId;

        let { url, content, title, source, published_date, source_id, id } = noticia;
        let palavras = encontraPalavrasNoTexto(definePalavarasQuery(), content.toLowerCase());
        let estado = noticia.source_locality[0].state;
        let uf = noticia.source_locality[0].stateAcronym;

        await Noticia.create({"codigo": codigoNoticia, url, "texto": content, "id_noticia": id, 
        "titulo": title, "fonte": source, "codigo_veiculo": source_id, 
        "data_publicacao": published_date, estado, uf, palavras });

        console.log("Notícia cadastrada com sucesso!");
        })
    })
    .catch(err => {
      console.log(err);
  })
)
.catch(err => console.log(`Erro ao se conectar ao Banco de Dados: ${err}`))
//.then(mongoose.connection.close());


  

  /*
  Keywords: content, url, page, title, domain, id, source_id, source(fonte), crawled_date(data procurado),
  published_date(data de publicação), lang, source_id(id veículo)
  source_locality: [{country, countryAcronym(sigla país), state, stateAcronym(sigla estado)}]
  */