# ShortenerJs
Um pequeno projeto para testar minhas habilidades como programador.

## Stack Tecnológico

- Server: Node.js, express
- Database: mongoDB
- Client: ReactJS, Redux
- Infra: Docker
- Testes: Mocha, Chai

## Bonus Points Feitos

1. Crie *testcases* para todas as funcionalidades criadas
2. Crie um *endpoint* que mostre as dez *URL's* mais acessadas 
3. Crie um *client* para chamar sua API
4. Faça um diagrama de sequencia da implementação feita nos casos de uso (Dica, use o https://www.websequencediagrams.com/)
5. Monte um deploy da sua solução utilizando containers 

### Diagrama de sequência

![Diagrama](http://i.imgur.com/VdhiWHN.png)

### Como instalar

Para instalar o lado do servidor é necessário ter o docker em sua máquina.
Depois de ter o docker instalado, rode o seguinte comando:

```
    docker-compose up -d
```

Isso fará com que o servidor e o banco(MongoDB) suba. Entre no container com o comando:

```
    docker exec -it shortenerjs_web_1 bash
```

Execute execute o comando abaixo:

```
    npm install && npm start
```

Use algum cliente como postman e acesse link http://localhost:8888 para testar.

### Instalando o client

Para rodar é necessário ter o node.js<=7.5.0 e npm<=4.1.2.
Entre dentro do diretório *client* e rode:

```
    npm install && npm start
```

Acesse o navegador pelo link: http://localhost:3000

### Rodando os testes de servidor

Entre dentro container shortenerjs_web_1 com o comando:

```
    npm run test
```