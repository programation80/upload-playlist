const { exec } = require('child_process');

// Dependências a serem instaladas
const dependencies = [
    'chromium@3.0.3',
    'cors@2.8.5',
    'dotenv@16.4.5',
    'express@4.19.2',
    'puppeteer@22.13.1',
    'request@2.88.2'
];

// Comando para instalar as dependências
const installCommand = `npm install ${dependencies.join(' ')}`;

console.log(`Instalando dependências: ${dependencies.join(', ')} ...`);

// Executa o comando npm install
exec(installCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erro ao instalar dependências: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Aviso ao instalar dependências: ${stderr}`);
        return;
    }
    console.log('Dependências instaladas com sucesso.');
});
