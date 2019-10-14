//Importanto Express Router
const router = require('express').Router();
//Importando Controller
const indexController = require('../controllers/index');

//Rota geral Admin
router.get('/', indexController.getIndex);

router.get('/cadastro', indexController.getCadastro);

router.post('/cadastro', indexController.postCadastro);

router.get('/noticias', indexController.getNoticias);

router.get('/noticias/:codigo', indexController.getNoticia);

router.post('/noticias/editar', indexController.postEditarNoticia);

router.post('/noticias/excluir', indexController.postExcluirNoticia);

router.get('/palavras', indexController.getPalavras);

router.post('/palavras/cadastrar', indexController.cadastrarPalavras);

router.post('/palavras/excluir', indexController.excluirPalavras);

router.post('/palavras/editar', indexController.editarPalavras);

module.exports = router;