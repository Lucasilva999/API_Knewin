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

    let dataPublicacao = noticia.dataValues.data_publicacao.toString();
    let ano = dataPublicacao.slice(11, 15);
    let dia = dataPublicacao.slice(8, 10);
    let mes = dataPublicacao.slice(4, 7);
    let hora = dataPublicacao.slice(16, 18);
    let minutos = dataPublicacao.slice(19, 21);

    switch (mes) {
        case "Jan":
            mes = "01";
            break;
        case "Feb":
            mes = "02";
            break;
        case "Mar":
            mes = "03";
            break;
        case "Apr":
            mes = "04";
            break;
        case "May":
            mes = "05";
            break;
        case "Jun":
            mes = "06";
            break;
        case "Jul":
            mes = "07";
            break;
        case "Aug":
            mes = "08";
            break;
        case "Sep":
            mes = "09";
            break;
        case "Oct":
            mes = "10";
            break;
        case "Nov":
            mes = "11";
            break;
        case "Dec":
            mes = "12";
            break;    
    }

    dataPublicacao = `${ano}-${mes}-${dia}T${hora}:${minutos}`;
    noticia.dataValues.data_publicacao = `${dia}/${mes}/${ano} às ${hora}:${minutos}`;

    res.render('noticia.handlebars', {noticia, dataPublicacao});
}

//Rota de Update das Notícias
exports.postEditarNoticia = async (req, res)=> {
    let {codigo, id_noticia, texto, titulo, idfonte, fonte, url, uf, dataPublicacao } = req.body;
    texto = texto.trim();
    let estado = defineEstado(uf);
    uf === 'NI' ? uf = 'Não Encontrado' : uf = uf;
    const palavras = encontraPalavrasNoTexto(await definePalavarasQuery(), texto.toLowerCase());

    await Noticia.findOne({codigo})
    .then(registro => registro.update({id_noticia, texto, titulo, idfonte, fonte, url, estado, uf, dataPublicacao, palavras}));

    res.redirect(`/noticias/${codigo}`);
}

//Rota de Delete das Notícias
exports.postExcluirNoticia = async (req, res)=> {
    const codigo = req.body.codigo;
    await Noticia.destroy({
        where: { codigo },
    }); 
    res.redirect('/noticias');
}

//Rota para Página de Edição de Palavras-chave
exports.getPalavras = async (req, res)=> {
    const palavras = await Palavras.findAll();
    res.render('palavras.handlebars', {palavras});
}

//Rota de Cadastro de Palavras
exports.cadastrarPalavras = async (req, res)=> {
    const palavra = req.body.palavra.toLowerCase();
    
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