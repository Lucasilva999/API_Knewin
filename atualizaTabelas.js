const LogNoticia = require("./models/LogNoticia");
const PalavrasQuery = require("./models/PalavrasQuery");

const palavras = ['Queens of The Stone Age', 'Muse', 'Led Zepellin', 'Kyuss',
'Queen', 'Jimi Hendrix', 'Metallica', 'AC/DC', 'Josh Homme',
'Eric Clapton', 'Steve Vai', 'Van Halen', 'Chris Cornell', 'Pearl Jam',
'Alice in Chains', 'Mark Lanegan', 'Ted Nugent', 'Nirvana', 'Bad Religion', 'Kurt Cobain'];

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




