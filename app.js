const axios = require('axios');
const dotenv = require('dotenv');
const Noticia = require("./models/Noticia");
const LogNoticia = require("./models/LogNoticia");
const config = require('./query');
const definePalavarasQuery = require('./functions/definePalavarasQuery');
const encontraPalavrasNoTexto = require('./functions/encontraPalavrasNoTexto');
dotenv.config();

async function main() {

  let offset = await LogNoticia.max('pagina');
  offset != NaN % offset != null ? config.offset = offset.toString() : config.offset = "0";
  console.log(`config.offset = ${config.offset}`);

  axios.post('http://data.knewin.com/news', config)
    .then(async function(response){
        try {
          //Insere Notícia
          let noticias = response.data.hits;
          for (let i = 0; i < noticias.length; i++) {
            //let contadorNoticia = await Contador.findOneAndUpdate({"id": "noticia"}, {$inc: {"noticiaId": 1}}, {new: true});
            //let codigoNoticia = contadorNoticia.noticiaId;
            let { url, content, title, source, published_date, source_id, id } = noticias[i];
            let palavras = encontraPalavrasNoTexto(definePalavarasQuery(), content.toLowerCase());
            let estado = noticias[i].source_locality[0].state;
            let uf = noticias[i].source_locality[0].stateAcronym;

            await Noticia.create({url, "texto": content, "id_noticia": id, 
            "titulo": title, "fonte": source, "codigo_veiculo": source_id, 
            "data_publicacao": published_date, estado, uf, palavras });
            console.log("Notícia cadastrada com sucesso!");
          }
          //Insere Log Notícia
          let ultimoCodigo = await LogNoticia.max('codigo');
          let ultimaPagina = await LogNoticia.max('pagina');
          let quantidade_gravada = noticias.length;

          if(ultimoCodigo && ultimaPagina || NaN && ultimoCodigo && ultimaPagina || null) {
               let codigo = ultimoCodigo + 1;
               let pagina = ultimaPagina + quantidade_gravada;
               await LogNoticia.create({codigo, pagina, quantidade_gravada});
          }
          else {
            await LogNoticia.create({"codigo": 1, "pagina": 10, "quantidade_gravada": 10});
          }
          console.log("Log Registro cadastrado com sucesso!");
        }
        catch(err) {
          throw err;
        }
      }
)
}

main();


  /*
  Keywords: content, url, page, title, domain, id, source_id, source(fonte), crawled_date(data procurado),
  published_date(data de publicação), lang, source_id(id veículo)
  source_locality: [{country, countryAcronym(sigla país), state, stateAcronym(sigla estado)}]
  */