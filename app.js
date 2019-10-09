//Importando Dependências
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const dotenv = require('dotenv');

//Config
    //DotEnv
    dotenv.config();
    //Definindo Porta
    const porta = process.env.PORTA || 5000;
    
    //Express BodyParser
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    //Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    //Importando Rotas
    const adminRoutes = require('./routes/index');

    //Usando rotas
    app.use('/', adminRoutes);

app.listen(porta, ()=> console.log(`Escutando na porta ${porta}...`));