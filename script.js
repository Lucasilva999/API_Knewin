const Noticia = require("./models/Noticia");
const LogNoticia = require("./models/LogNoticia");

Noticia.sync({force: true});
LogNoticia.sync({force: true});