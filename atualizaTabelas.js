const LogNoticia = require("./models/LogNoticia");
const PalavrasQuery = require("./models/PalavrasQuery");

const palavras = ['seade', 'dalmo nogueira filho', 'produto interno bruto - pib', 'pesquisa de emprego e desemprego - ped',
'inovação tecnológica', 'produto interno bruto', 'pib', 'pesquisa de emprego e desemprego', 'inovação tecnológica',
'investimentos', 'indústria sucroalcooleira', 'políticas públicas', 'commodities', 'desenvolvimento sustentável',
'condições de vida', 'fecundidade', 'migração', 'mortalidade', 'casamentos', 'envelhecimento'];

async function main() {
    await LogNoticia.destroy({
        where: {},
        truncate: true
    });
    await PalavrasQuery.destroy({
        where: {},
        truncate: true
    });

    //Insere na tabela Palavras cada palavra específicada no Array palavras
    palavras.forEach(async palavra => {
        await PalavrasQuery.create({palavra});
    })
}

main();




