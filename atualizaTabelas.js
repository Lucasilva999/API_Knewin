const LogNoticia = require("./models/LogNoticia");
const PalavrasQuery = require("./models/PalavrasQuery");

const palavras = ['Seade', 'Dalmo Nogueira filho', 'Produto Interno Bruto - PIB', 'Pesquisa de Emprego e Desemprego - PED',
'Inovação Tecnológica', 'Produto Interno Bruto', 'PIB', 'Pesquisa de Emprego e Desemprego', 'Inovação Tecnológica',
'Investimentos', 'Indústria Sucroalcooleira', 'Políticas Públicas', 'Commodities', 'Desenvolvimento Sustentável',
'Condições de Vida', 'Fecundidade', 'Migração', 'Mortalidade', 'Casamentos', 'Envelhecimento'];

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




