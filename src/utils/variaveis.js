require('dotenv').config()
const chromium = require('chromium');

module.exports = {

    configPuppetter: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
        },

        options: {
            executablePath: chromium.path, // caminho para o Chromium
            args: [
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--no-zygote'
            ],
            headless: true, // true se deseja sem interface gráfica
        },

    },

    caracteres: `abcdefghijlmnopqrstuvxz
    ABCDEFGHIJLMNOPQRSTUVXZ123456789`,
    horas:new Date()
}