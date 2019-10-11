const Noticia = require('../models/Noticia');
const LogNoticia = require('../models/LogNoticia');
const Palavras = require('../models/PalavrasQuery');
const encontraPalavrasNoTexto = require('../functions/encontraPalavrasNoTexto');
const definePalavarasQuery = require('../functions/definePalavarasQuery');
const defineEstado = require('../functions/defineEstado');

//Rota Geral Index
exports.getIndex = (req, res)=> {
    res.render('menu.handlebars', {layout: 'menu.handlebars'});
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
    let pagina = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let offset = (pagina - 1) * limit;
    let count = await Noticia.count();
    
    let ultimoOffset = ((pagina - 1) - 1) * limit;
    let proximoOffset = ((pagina + 1) - 1) * limit;
    let totalPaginas = Math.ceil(count / limit);
    let ultimaPagina = pagina - 1;
    let proximaPagina = pagina + 1;
    

    if(offset <= 0 || offset == NaN) offset = 0;
    if(pagina <= 0) pagina = 1;
    if(ultimaPagina <= 0) ultimaPagina = null;
    if (proximaPagina >= totalPaginas) proximaPagina = null; 
    
    const noticias = await Noticia.findAll({
        limit,
        offset
    });

    res.render('noticias.handlebars', {noticias, proximoOffset, ultimoOffset, pagina, ultimaPagina, proximaPagina, limit});
}

//Rota Geral de Acesso as Notícias
exports.getNoticia = async (req, res)=> {
    
    const noticia = await Noticia.findOne({
        where: {
            codigo: req.params.codigo,
        }
    });

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

//Rota para Página de Edição de Palavras-chave
exports.getPalavras = async (req, res)=> {
    const palavras = await Palavras.findAll();
    res.render('palavras.handlebars', {palavras});
}

//Rota de Cadastro de Palavras
exports.cadastrarPalavras = async (req, res)=> {
    const palavra = req.body.palavra;
    
    await Palavras.create({ palavra });
   
    res.redirect('/palavras');
}

//Rota de Exclusão de Palavras
exports.excluirPalavras = async (req, res)=> {
    const codigo = req.body.codigo;
    await Palavras.destroy({
        where: { codigo },
    }); 
   
    res.redirect('/palavras');
}

//Rota de Edição de Palavras
exports.editarPalavras = async (req, res)=> {
    const { codigo, palavra } = req.body;

    await Palavras.findOne({codigo})
    .then(registro => registro.update({palavra}));
   
    res.redirect('/palavras');
}