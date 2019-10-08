//Importanto Express Router
const router = require('express').Router();
//Importando Controller
const adminController = require('../controllers/admin');

//Rota geral Admin
router.get('/', adminController.getIndex);

router.get('/cadastro', adminController.getCadastro);

router.post('/cadastro', adminController.postCadastro);

router.get('/noticias', adminController.getNoticias);

module.exports = router;