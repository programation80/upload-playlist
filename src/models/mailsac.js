const request = require('request');
const utils = require('../utils/utils')
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Classe Mailsac para interação com a API do Mailsac
class Mailsac {
    constructor() {
        this.apiKey = process.env.MAILSAC_KEY; // Chave de API do Mailsac configurada via variável de ambiente
        this.domain = '@mailsac.com'; // Domínio padrão para emails fake
        this.urlBase = process.env.URL_BASE_MAILSAC; // URL base da API do Mailsac configurada via variável de ambiente
    }

    // Método privado para atualizar as opções da requisição comuns a todos os endpoints
    updateOptions(method, endpoint) {
        const url = `${this.urlBase}${endpoint}`;
        const options = {
            method: method,
            url: url,
            headers: { 'Mailsac-Key': this.apiKey }
        };
        return options;
    }

    // Método para gerar um email fake no Mailsac
    generateEmailFake() {
        const email = `${utils.generateString()}${this.domain}`; // Gera um email fake com 12 caracteres aleatórios + domínio
        const endpoint = `addresses/${email}`; // Endpoint para verificar o email no Mailsac
        const options = this.updateOptions('GET', endpoint); // Opções da requisição

        return new Promise((resolve, reject) => {
            request(options, (error, response, data) => {
                if (error) {
                    reject(error); // Em caso de erro na requisição
                } else if (response.statusCode === 200) {
                    const dataJson = JSON.parse(data);
                    const emailFake = dataJson._id.trim().replace(/\s/g, ''); // ID do email no Mailsac
                    resolve(emailFake);
                } else {
                    reject(`Status não esperado: ${response.statusCode}`); // Se o status da resposta não for 200
                }
            });
        });
    }

    // Método assíncrono para obter a URL da playlist de um email no Mailsac
    async getUrlPlaylist(email) {
        const endpoint = `addresses/${email}/messages`; // Endpoint para obter as mensagens do email
        const options = this.updateOptions('GET', endpoint); // Opções da requisição

        try {
            const body = await new Promise((resolve, reject) => {
                request(options, function (error, response, body) {
                    if (error) reject(error); // Em caso de erro na requisição
                    resolve(body);
                });
            });

            const jsonParse = JSON.parse(body);

            // Verifica se há mensagens e se a primeira mensagem possui links
            if (jsonParse.length > 0 && jsonParse[0].links && jsonParse[0].links.length > 1) {
                const link = jsonParse[0].links[1]; // Segundo link na primeira mensagem
                const urlPlaylist = link.replace(/Link$/, ''); // Remove 'Link' do final do link

                return urlPlaylist; // Retorna a URL da playlist
            } else {
                return ('Nenhum link encontrado na primeira mensagem.');
            }

        } catch (error) {
            return 'Erro ao obter link M3U'; // Lança o erro para ser tratado externamente
        }
    }
}

module.exports = {Mailsac}