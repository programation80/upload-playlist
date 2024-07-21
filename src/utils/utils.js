const vr = require('./variaveis'); // Importa variáveis úteis

// Função para gerar uma string aleatória de um comprimento específico
const generateString = (length = 12) => {
    let randomString = '';
    const caracteres = vr.caracteres; // Obtém os caracteres do módulo 'variaveis'
    const caracteresLength = caracteres.length;

    for (let i = 0; i < length; i++) {
        // Gera um caractere aleatório a partir do conjunto de caracteres
        const randomIndex = Math.floor(Math.random() * caracteresLength);
        randomString += caracteres.charAt(randomIndex);
    }

    return randomString;
};

// Função para gerar um número de telefone aleatório com DDD brasileiro
const generatePhoneNumber = () => {
    const ddds = ['11', '21', '31', '41', '51']; // Exemplos de DDDs brasileiros
    const ddd = ddds[Math.floor(Math.random() * ddds.length)]; // Escolhe aleatoriamente um DDD da lista
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000; // Gera um número aleatório de 9 dígitos começando a partir de 100 milhões
    const phoneNumber = `${ddd}9${randomNumber}`; // Concatena o DDD com o número aleatório, garantindo que o '9' está no terceiro dígito

    return phoneNumber;
};

// Função para retornar a hora atual no formato HH:SS:mmm
const horas = () => {
    return `${vr.horas.getHours()}:${vr.horas.getMinutes()}:${vr.horas.getSeconds()}`;
}

module.exports = { generateString, generatePhoneNumber,horas }; // Exporta as funções utilitárias
