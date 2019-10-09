const Noticia = require('../models/Noticia');
const LogNoticia = require('../models/LogNoticia');
const encontraPalavrasNoTexto = require('../functions/encontraPalavrasNoTexto');
const definePalavarasQuery = require('../functions/definePalavarasQuery');
const defineEstado = require('../functions/defineEstado');

//Rota Geral Index
exports.getIndex = (req, res)=> {
    res.render('admin.handlebars');
}

//Rota Geral de Cadastro
exports.getCadastro = (req, res)=> {
    res.render('cadastro.handlebars');
}

//Rota Geral de Cadastro
exports.postCadastro = async (req, res)=> {
    const { conteudo, titulo, idfonte, fonte, url, uf, dataPublicacao } = req.body;
    const id_noticia = 0;
    let estado = defineEstado(uf);
    const palavras = encontraPalavrasNoTexto(await definePalavarasQuery(), conteudo.toLowerCase());
    
    await Noticia.create({url, "texto": conteudo, id_noticia, 
    titulo, fonte, "codigo_veiculo": idfonte, 
    "data_publicacao": dataPublicacao, estado, uf, palavras });

    let ultimoRegistro = await LogNoticia.findOne({order: [ [ 'createdAt', 'DESC' ]]});
    let ultimaQuantidadeNoticias = ultimoRegistro.dataValues.quantidade_noticias
    let ultimaPagina = await LogNoticia.max('pagina');
    let pagina = ++ultimaPagina;
    let quantidade_gravada = 1;

    await LogNoticia.create({pagina, quantidade_gravada, "quantidade_noticias": ultimaQuantidadeNoticias});
    
    res.redirect('/cadastro');
}

//Rota Geral de Acesso as Notícias
exports.getNoticias = async (req, res)=> {

    const noticias = await Noticia.findAll();
    res.render('noticias.handlebars', {noticias});
}

//Rota Geral de Acesso as Notícias
exports.getNoticia = async (req, res)=> {
    
    const noticia = await Noticia.findOne({
        where: {
            codigo: req.params.codigo,
        }
    });
    console.log(noticia);

    res.render('noticia.handlebars', {noticia});
}

//Rota de Update das Notícias
exports.postAtualizarNoticia = async (req, res)=> {
    res.redirect('/noticias');
}

//Rota de Delete das Notícias
exports.postExcluirNoticia = async (req, res)=> {
    res.redirect('/noticias');
}