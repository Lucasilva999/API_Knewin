const Palavras = require("./models/PalavrasQuery");
const InfoPalavras = require("./models/InfoPalavras");

async function main() {
    //Encontra o valor máximo de Criação e Atualização na tabela Palavras
    let ultimaModificacaoCreatedAt = await Palavras.max('createdAt');
    let ultimaModificacaoUpdatedAt = await Palavras.max('updatedAt');
    //Encontra o Registro único da tabela InfoPalavras
    let infoPalavra = await InfoPalavras.findOne({"codigo": 1});

    //Caso o Registro Exista
    if(infoPalavra || null) {

        //Caso os valores máximos de CreatedAt e UpdatedAt sejam diferentes
        if (ultimaModificacaoCreatedAt || ultimaModificacaoUpdatedAt) {
            
        //Determina qual o valor mais recente que será inserido na tabela InfoPalavras
            ultimaModificacaoCreatedAt > ultimaModificacaoUpdatedAt ? 
            await InfoPalavras.findOne({"codigo": 1})
            .then(registro => registro.update({"ultima_modificacao": ultimaModificacaoCreatedAt})) : 
            await InfoPalavras.findOne({"codigo": 1})
            .then(registro => registro.update({"ultima_modificacao": ultimaModificacaoUpdatedAt})) 
        
        //Caso os valores máximos de CreatedAt e UpdatedAt sejam iguais
        }else {
            await InfoPalavras.findOne({"codigo": 1})
            .then(registro => registro.update({"ultima_modificacao": ultimaModificacaoUpdatedAt})) 
        }

    //Caso o Registro não Exista
    } else {

        //Caso os valores máximos de CreatedAt e UpdatedAt sejam diferentes
        if (ultimaModificacaoCreatedAt || ultimaModificacaoUpdatedAt) {
            
        //Determina qual o valor mais recente que será inserido na tabela InfoPalavras
            ultimaModificacaoCreatedAt > ultimaModificacaoUpdatedAt ? 
            await InfoPalavras.create({"codigo": 1, "ultima_modificacao": ultimaModificacaoCreatedAt}) : 
            await InfoPalavras.create({"codigo": 1, "ultima_modificacao": ultimaModificacaoUpdatedAt}) 
        
        //Caso os valores máximos de CreatedAt e UpdatedAt sejam iguais
        }else {
            await InfoPalavras.create({"codigo": 1, "ultima_modificacao": ultimaModificacaoUpdatedAt}) 
        } 
    } 
}

main();




