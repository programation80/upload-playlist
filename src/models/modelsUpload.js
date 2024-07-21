require('dotenv').config()
const { Mailsac } = require('../models/mailsac');
const { Puppeteer } = require('../models/puppetter')
const utils = require('../utils/utils')

const mailsac = new Mailsac()
const myPuppeteer = new Puppeteer()

class ModelsUpload {

    // Função para gerar um novo email fake
    async generateEmailFake() {

        try {
            const emailFake = await mailsac.generateEmailFake();

            return emailFake;

        } catch (error) {
            console.error('Erro ao gerar o email fake:', error);
            throw error;
        }

    }

    // Função para gerar o teste IPTV e obter a URL da playlist
    async generateTestIptv(email) {
        
        const url = process.env.URL_TEST_IPTV
        const name = utils.horas()
        const phone = utils.generatePhoneNumber()

        try {
            // Gera o teste IPTV utilizando o email gerado
            const emailTestIptv = await myPuppeteer.generateTestIptv(url, email, name, phone)

            return emailTestIptv

        } catch (error) {
            console.error('Erro ao gerar teste IPTV ou obter URL da playlist:', error);
            throw error;
        }
    }

    // Função para pegar o link da lista gerada no teste iptv
    async getUrlPlaylist(email) {

        // Obtém a URL da playlist utilizando o email gerado

        try {
            const urlPlaylist = await mailsac.getUrlPlaylist(email);

            return urlPlaylist

        } catch (error) {
            reject(error);
        }
    }

    // Função para processar os dados
    async processData() {
        try {
            // Passo 1: Gerar o email fake
            const emailFake = await this.generateEmailFake()

            // Passo 2: Gerar o teste IPTV e obter o email do teste
            const emailTestIptv = await this.generateTestIptv(emailFake)

            // Passo 3: Aguarda 3 segundos para pegar o link da playlist
            const urlPlaylist = await new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        const urlGenerateIptv = await this.getUrlPlaylist(emailTestIptv);

                        resolve(urlGenerateIptv);

                    } catch (error) {
                        reject(error);
                    }
                }, 3000); // Aguarda 3 segundos antes de obter a URL da playlist
            });

            // Retornar todos os dados processados
            return {
                emailFake,
                urlPlaylist
            };
        } catch (error) {
            console.error('Erro ao processar dados:', error);
            throw error;
        }
    }
}

module.exports = { ModelsUpload }