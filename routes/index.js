//Importanto Express Router
const router = require('express').Router();
//Importando Controller
const adminController = require('../controllers/admin');

//Rota geral Admin
router.get('/', adminController.getIndex);

router.get('/cadastro', adminController.getCadastro);

router.post('/cadastro', adminController.postCadastro);

router.get('/noticias', adminController.getNoticias);

router.get('/noticias/:codigo', adminController.getNoticia);

router.post('/noticias/atualizar/:codigo', adminController.postAtualizarNoticia);

router.post('/noticias/excluir/:codigo', adminController.postExcluirNoticia);

router.get('/palavras', adminController.getPalavras);

router.post('/palavras/cadastrar', adminController.cadastrarPalavras);

router.post('/palavras/excluir', adminController.excluirPalavras);

router.post('/palavras/editar', adminController.editarPalavras);

module.exports = router;