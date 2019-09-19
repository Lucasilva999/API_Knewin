const db = require('./db');
const Noticia = require('./models/Noticia');
const LogNoticia = require('./models/LogNoticia');

//Noticia.findAll().then(noticia => console.log(noticia));


// Noticia.findOne({
//     order: [ [ 'createdAt', 'DESC' ]],
// })
// .then(noticia => console.log(noticia));


LogNoticia.max('pagina').then(noticia => console.log(noticia));
