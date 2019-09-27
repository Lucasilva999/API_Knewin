const Noticia = require("./models/Noticia");
const LogNoticia = require("./models/LogNoticia");
const PalavrasQuery = require("./models/PalavrasQuery");

/*
Cria Tabelas Notícias, LogNoticias e Palavras
Obs: A Opção "force: true" força a exclusão da tabela caso a mesma já exista. Remova a opção
caso deseje apenas criar uma tabela caso a mesma ainda não exista.
*/

const palavras = ['seade', 'dalmo nogueira filho', 'produto interno bruto - pib', 'pesquisa de emprego e desemprego - ped',
'inovação tecnológica', 'produto interno bruto', 'pib', 'pesquisa de emprego e desemprego', 'inovação tecnológica',
'investimentos', 'indústria sucroalcooleira', 'políticas públicas', 'commodities', 'desenvolvimento sustentável',
'condições de vida', 'fecundidade', 'migração', 'mortalidade', 'casamentos', 'envelhecimento'];

async function main() {
    /* 
    Descomente "await Noticia.sync()" se estiver gerando a estrutura do banco pela primeira vez
    Caso queira apenas atualizar a lista de palavras, 
    comente-o para não perder as notícias que já foram salvas!!!
    */

    //await Noticia.sync({force: true});
    await LogNoticia.sync({force: true});
    await PalavrasQuery.sync({force: true})

    //Insere na tabela Palavras cada palavra específicada no Array palavras
    palavras.forEach(async palavra => {
        await PalavrasQuery.create({palavra});
    })
}

main();




