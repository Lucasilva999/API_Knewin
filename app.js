const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Noticia = require("./models/Noticia");
dotenv.config();

const config = { 
    
    "key": process.env.KEY,
    "query": "seade OR \"dalmo nogueira filho\" OR \"produto interno bruto - pib\" OR \"pesquisa de emprego e desemprego - ped\" OR \"inovação tecnológica\" OR \"produto interno bruto\" OR pib OR \"pesquisa de emprego e desemprego\" OR \"inovação tecnológica\" OR investimentos OR \"indústria sucroalcooleira\" OR \"políticas públicas\" OR commodities OR \"desenvolvimento sustentável\" OR \"condições de Vida\" OR fecundidade OR migração OR mortalidade OR casamentos OR envelhecimento",
    "filter": 
        { 
            "language": ["pt"],
            "sourceId": [1, 6, 7, 8, 12, 15, 18, 22, 23, 29, 32, 33, 34, 42, 182, 183, 247, 329, 464, 471, 765, 819, 1460, 1847, 1968, 2070, 2079, 2092, 2993, 4804, 4819, 4867, 5496, 5796, 5797, 5924, 5994, 6303, 6403, 6406, 6626, 9748, 9772, 9817, 9818, 9819, 10060, 10550, 11541, 11542, 12824, 12827, 12828, 12829, 13256, 13816, 13840, 13842, 13994, 14138, 14138, 14139, 14174, 14209, 14237, 14238, 14249, 14285, 14287, 14295, 14338, 14422, 14426, 14426, 14436, 14670, 14891, 15484, 15658, 15662, 15666, 15708, 15809, 15964, 16029, 17066, 17764, 19583, 19597, 19599, 19601, 19610, 19644, 19652, 19714, 19783, 26683, 29084, 41775, 59033, 59033, 63531, 63630, 69985, 79133, 79839, 79839, 89571, 89581, 90477, 96240, 96823, 100704, 101691, 114485, 167786, 14556, 19742, 33324, 19363, 205852, 117488, 19676, 16162, 100539, 817, 19602, 13815, 1329, 6393, 74890, 14784, 18658, 251, 14, 1394, 862, 6405, 86185], 
            "sincePublished": "2019-09-11T00:00:00" 
        }, 
    "offset": "0", 
    "sort": { 
        "field": "published_date",
        "order": "asc"
    }
 }

axios.post('http://data.knewin.com/news', config)
  .then(function(response){
    mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(()=> console.log('Conectado ao Banco de Dados...'))
    .then(
        response.data.hits.forEach(async noticia => {
        let { url, content, title, source, published_date, source_id, id } = noticia;
        let estado = noticia.source_locality["state"] || null;
        let uf = noticia.source_locality["stateAcronym"] || null;

        await Noticia.create({url, "texto": content, "id_noticia": id, 
        "titulo": title, "fonte": source, "codigo_veiculo": source_id, 
        "data_publicacao": published_date, estado, uf });
    }))
    .catch(err => console.log(`Erro ao se conectar ao Banco de Dados: ${err}`));
  })
  .catch(err => {
      console.log(err);
  })

  /*
  Keywords: content, url, page, title, domain, id, source_id, source(fonte), crawled_date(data procurado),
  published_date(data de publicação), lang, source_id(id veículo)
  source_locality: [{country, countryAcronym(sigla país), state, stateAcronym(sigla estado)}]
  */