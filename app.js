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
.then(async ()=> {

  let ultimoRegistro = await LogNoticia.findOne({}).sort({"data_cadastro": "desc"});
  ultimoRegistro ? config.offset = ultimoRegistro.pagina.toString() : config.offset = "0";
  console.log("OFFSET: " + config.offset);

  axios.post('http://data.knewin.com/news', config)
    .then(async function(response){
        try {
          //Insere Notícia
          let noticias = response.data.hits;
          for (let i = 0; i < noticias.length; i++) {
            let contadorNoticia = await Contador.findOneAndUpdate({"id": "noticia"}, {$inc: {"noticiaId": 1}}, {new: true});
            let codigoNoticia = contadorNoticia.noticiaId;
            let { url, content, title, source, published_date, source_id, id } = noticias[i];
            let palavras = encontraPalavrasNoTexto(definePalavarasQuery(), content.toLowerCase());
            let estado = noticias[i].source_locality[0].state;
            let uf = noticias[i].source_locality[0].stateAcronym;

            await Noticia.create({"codigo": codigoNoticia, url, "texto": content, "id_noticia": id, 
            "titulo": title, "fonte": source, "codigo_veiculo": source_id, 
            "data_publicacao": published_date, estado, uf, palavras });
            console.log("Notícia cadastrada com sucesso!");
          }
          //Insere Log Notícia
          let ultimoRegistro = await LogNoticia.findOne({}).sort({"data_cadastro": "desc"});
          let quantidade_gravada = noticias.length;

          if(ultimoRegistro) {
              let codigo = ultimoRegistro.codigo + 1;
              let pagina = ultimoRegistro.pagina + quantidade_gravada;
              await LogNoticia.create({codigo, pagina, quantidade_gravada});
          }
          if(!ultimoRegistro) {
              await LogNoticia.create({"codigo": 1, "pagina": 10, "quantidade_gravada": 10});
          }
          console.log("Log Registro cadastrado com sucesso!");
          mongoose.disconnect();
        }
        catch(err) {
          throw err;
        }
      }
)})
.catch(err => {throw err;})
.catch(err => console.log(`Erro ao se conectar ao Banco de Dados: ${err}`))

//.then(mongoose.connection.close());

  /*
  Keywords: content, url, page, title, domain, id, source_id, source(fonte), crawled_date(data procurado),
  published_date(data de publicação), lang, source_id(id veículo)
  source_locality: [{country, countryAcronym(sigla país), state, stateAcronym(sigla estado)}]
  */