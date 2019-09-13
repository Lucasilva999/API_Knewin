function encontraPalavras(palavras, texto) {
    let palavrasExistentes = [];
    palavras.forEach(palavra => {
        if(texto.includes(palavra)) palavrasExistentes.push(palavra);
    })
    return palavrasExistentes;
}

module.exports = encontraPalavras;