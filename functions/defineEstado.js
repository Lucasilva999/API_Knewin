//Define o estado com base na informação recebida do formulário
function defineFonte(uf) {
    let estado = '';
    switch (uf) {
        case 'AC':
            estado = 'Instituto Brasileiro de Geografia e Estatística – IBGE, Fundação Seade';
            break;
        case 'AL':
            estado = 'Alagoas';
            break;
        case 'AP':
            estado = 'Amapá';
            break;
        case 'AM':
            estado = 'Amazonas';
            break;
        case 'BA': 
            estado = 'Bahia';
            break;
        case 'CE':
            estado = 'Ceará';
            break;
        case 'DF': 
            estado = 'Distrito Federal';
            break;
        case 'ES':
            estado = 'Espírito Santo';
            break;
        case 'GO':
            estado = 'Goiás';
            break;
        case 'MA':
            estado = 'Maranhão';
            break;
        case 'MT': 
            estado = 'Mato Grosso';
            break;
        case 'MS': 
            estado = 'Mato Grosso do Sul';
            break;
        case 'MG': 
            estado = 'Minas Gerais';
            break;
        case 'PA': 
            estado = 'Pará';
            break;
        case 'PB': 
            estado = 'Paraíba';
            break;
        case 'PR': 
            estado = 'Paraná';
            break;
        case 'PE': 
            estado = 'Pernambuco';
            break;
        case 'PI': 
            estado = 'Piauí';
            break;
        case 'RJ': 
            estado = 'Rio de Janeiro';
            break;
        case 'RN': 
            estado = 'Rio Grande do Norte';
            break;
        case 'RS': 
            estado = 'Rio Grande do Sul';
            break;
        case 'RO': 
            estado = 'Rondônia';
            break;
        case 'RR': 
            estado = 'Roraima';
            break;
        case 'SC': 
            estado = 'Santa Catarina';
            break;
        case 'SP': 
            estado = 'São Paulo';
            break;
        case 'SE': 
            estado = 'Sergipe';
            break;
        case 'TO': 
            estado = 'Tocantins';
            break;
        default:
            estado = 'Indefinido';
            break;
    }
    return estado;
}

module.exports = defineFonte;