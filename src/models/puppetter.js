require('dotenv').config();
const puppeteer = require('puppeteer');
const vr = require('../utils/variaveis');

class Puppeteer {
    // Método para iniciar uma página no navegador Puppeteer
    async browserPage() {
        try {
            const browser = await puppeteer.launch(vr.configPuppetter.options); // Inicia o navegador
            const page = await browser.newPage(); // Abre uma nova página

            await page.setExtraHTTPHeaders(vr.configPuppetter.headers); // Define cabeçalhos HTTP extras

            return { browser, page }; // Retorna o navegador e a página para uso posterior

        } catch (error) {
            throw new Error(`Erro ao executar o Puppeteer: ${error.message}`); // Lança erro se falhar
        }
    }

    // Método para realizar um teste IPTV automatizado
    async generateTestIptv(url, email, name, phone) {
        try {
            const { browser, page } = await this.browserPage(); // Inicia o navegador e obtém a página

            await page.goto(url); // Acessa a URL especificada
            // Preenche os campos do formulário
            await page.type('input#name', name); 
            await page.type('input#email', email); 
            await page.type('input#phone', phone); 

            // Clica no botão de envio
            await page.click('button.btn.btn-primary.w-100'); 

            await browser.close(); // Fecha o navegador Puppeteer após a conclusão

        } catch (error) {
            console.error('Ocorreu um erro durante a execução:', error); // Trata erros durante a execução do teste IPTV
        }

        return email; // Retorna o email usado no teste IPTV
    }
}

module.exports = {Puppeteer}