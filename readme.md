UploadPlaylist

O UploadPlaylist é um projeto Node.js que facilita a geração de um email fake, a execução de um teste IPTV e o upload de um endereço MAC para o aplicativo Roku Media Player.
Funcionalidades

    Gera um email fake utilizando a API do Mailsac.
    Executa um teste IPTV preenchendo um formulário online.
    Faz o upload de um endereço MAC para o aplicativo Roku Media Player.

Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

    Node.js (v14.x ou superior)
    NPM (geralmente vem com o Node.js)

Instalação

    Clone o repositório:

    bash

git clone https://github.com/seu-usuario/uploadplaylist.git

Instale as dependências:

bash

cd uploadplaylist
npm install

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:

plaintext

    MAILSAC_KEY=SuaChaveDeAPIDoMailsac
    URL_BASE_MAILSAC=https://api.mailsac.com/
    URL_TEST_IPTV=https://url-do-seu-teste-iptv.com/

    Certifique-se de substituir os valores acima pelos seus próprios dados.

Uso

Para iniciar o servidor:

bash

npm start

O servidor estará ouvindo na porta 3000 por padrão. Certifique-se de que o ambiente esteja configurado corretamente para acessar o servidor localmente ou através de um host remoto.
Endpoints
/process

Este endpoint executa o processo completo:

    Gera um email fake.
    Executa um teste IPTV utilizando o email gerado.
    Aguarda 3 segundos e obtém a URL da playlist.

Método: GET

Exemplo de requisição:

bash

curl http://localhost:3000/api/upload-playlist

Exemplo de resposta:

json

{
  "emailFake": "emailfake@mailsac.com",
  "urlPlaylist": "https://url-da-playlist.com/"
}

Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou uma issue para discutir novas funcionalidades, correções ou melhorias.
Licença

Este projeto está licenciado sob a Licença MIT.