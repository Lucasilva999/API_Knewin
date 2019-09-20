function encontraPalavras(palavras, texto) {
    let palavrasExistentes = '';
    palavras.forEach(palavra => {
        if(texto.includes(palavra)) palavrasExistentes = palavrasExistentes.concat(palavra, ', ');
    })
    palavrasExistentes = palavrasExistentes.trim();
    palavrasExistentes = palavrasExistentes.substring(0, palavrasExistentes.length - 1);
    return palavrasExistentes;
}

module.exports = encontraPalavras;