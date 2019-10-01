const axios = require('axios');
const dotenv = require('dotenv');
const Noticia = require("./models/Noticia");
const LogNoticia = require("./models/LogNoticia");
const Palavras = require("./models/PalavrasQuery");
const InfoPalavras = require("./models/InfoPalavras");
const config = require('./query');
const definePalavarasQuery = require('./functions/definePalavarasQuery');
const defineStringQuery = require('./functions/defineStringQuery');
const encontraPalavrasNoTexto = require('./functions/encontraPalavrasNoTexto');
dotenv.config();

async function main() {

  config.query = await defineStringQuery();
  console.log(`Query: ${config.query}`);

  //Atualiza InfoPalavras
  let ultimaModificacaoCreatedAt = await Palavras.max('createdAt');
  let ultimaModificacaoUpdatedAt = await Palavras.max('updatedAt');
    
    if (ultimaModificacaoCreatedAt || ultimaModificacaoUpdatedAt) {
        ultimaModificacaoCreatedAt > ultimaModificacaoUpdatedAt ? 
        await InfoPalavras.findOne({"codigo": 1})
        .then(registro => registro.update({"ultima_modificacao": ultimaModificacaoCreatedAt})) : 
        await InfoPalavras.findOne({"codigo": 1})
        .then(registro => registro.update({"ultima_modificacao": ultimaModificacaoUpdatedAt})) 
    }else {
        await InfoPalavras.findOne({"codigo": 1})
        .then(registro => registro.update({"ultima_modificacao": ultimaModificacaoUpdatedAt})) 
    }

  //Define Offset
  let ultimaPagina = await LogNoticia.max('pagina');
  ultimaPagina >= 0 ? config.offset = ultimaPagina.toString() : config.offset = 0;  
  console.log(`Offset: ${config.offset}`);

  axios.post('http://data.knewin.com/news', config)
    .then(async function(response){
        try {
          //Insere Notícia
          let quantidade_noticias = response.data.num_docs;
          let noticias = response.data.hits;
          for (let i = 0; i < noticias.length; i++) {

            let { url, content, title, source, published_date, source_id, id } = noticias[i];
            let palavras = encontraPalavrasNoTexto(await definePalavarasQuery(), content.toLowerCase());
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
              
              let pagina = ultimaPagina + quantidade_gravada;
              await LogNoticia.create({pagina, quantidade_noticias, quantidade_gravada});
              console.log("Log Registro cadastrado com sucesso!");
          }
          else {
              await LogNoticia.create({"pagina": noticias.length, quantidade_gravada, quantidade_noticias});
              console.log("Log Registro cadastrado com sucesso!");
          }
          
        }
        catch(err) {
          console.log(err);
        }
      }
  )
}

main();
