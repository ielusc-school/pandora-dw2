## Projeto ASK

![](./public/img/ask-logo.png)

1. crie um projeto node no diretório a sua escolha
> npm init

2. instale o express na pasta do seu projeto node
> npm install express --save

3. crie o arquivo na raiz do projeto 
> index.js

4. instale o ejs no projeto
> npm install ejs --save


5. arquivo index.js

```js

const express = require('express');
const app = require(express);

app.get('/', (req, res) => {
  res.send('ask running');
});

app.listen(9000, () => console.log('app rodando: http://localhost:9000');

```

6. Usando o EJS na aula
> npm i ejs

6.1 Crie um diretório public
6.2 Crie os diretórios dentro de public:
- css
- img
- js

7. Instalando o Bootstrap
> https://getbootstrap.com/docs/4.3/getting-started/introduction/

Ver todas as versões disponvéis do Bootstrap
> https://getbootstrap.com/docs/versions/

8. Crie uma rota `perguntar`

```js
app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

```

9. Crie um diretório `views`
9.1 Crie um arquivo `perguntar.ejs`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guia de Perguntas</title>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
      <h3>Realizar Perguntas</h3>
      <hr>
      <form action="">
        <label for="">Insira o título?</label>
        <input 
          type="text" 
          placeholder="Título" 
          class="form-control">
        <label for="">Descreva sua dúvida.</label>
        <textarea 
          name="" 
          id="" 
          cols="30" 
          rows="10" 
          class="form-control">
        </textarea>
        <button 
          class="btn btn-primary mt-3">Enviar pergunta
        </button>
      </form>
    </div>
</body>
</html>
```

10. Vamos lidar com Partials

11. Vamos enviar nossos dados para o servidor
Instalar o body-parser
> npm i body-parser --save

12. Configurando nosso `index.js` para adotar o body-parser

```js

const express = require('express');
const app = express();

//step 11.1 
// responsavel por traduzir os dados enviados para uma estrutura que o JS reconheça
const bodyParser = require('body-parser');


// configurando o ejs para ser adotado no view do express como template engine
app.set('view engine', 'ejs');

//3.  final da aula
app.use(express.static('public'));

//11.1 decodificando os dados submetidos pelo formulario
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

// rotas
app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.get('/', (req, res) => {
  res.render('index2');
});

//recebendo dados do form
app.post('/salvarpergunta', (req, res) => {
  let topic = {
    title: req.params.titulo, // campo do front-end
    message: req.params.message, // campo do front-end
  };
  console.log(topic)
  res.send(`Formulário enviado para o servidor', ${topic}`);
});

// iniciando nosso servidor
app.listen(9000, (erro) => {
  if(erro) {
    console.log('Ops, ocorreu um erro ao iniciar o servidor.')
  } else {
    console.log('Servidor rodando no endereço: http://localhost:9000')
  }
});

```

Para fazer a conexão entre os campos do formulãrio junto com o backend, deve-se adotar o atributo name no formulãrio.

```html
<form action="/salvarpergunta" method="POST">
            <label for="">Insira o título?</label>
            <input 
              type="text"
              name="titulo" 
              placeholder="Título" 
              class="form-control">
            <label for="">Descreva sua dúvida.</label>
            <textarea 
              name="descricao" 
              id="" 
              cols="30" 
              rows="10" 
              class="form-control">
            </textarea>
            <button 
              class="btn btn-primary mt-3">Enviar pergunta
            </button>
          </form>

```


12. Configurando mySQL no projeto

12.1 Vamos instalar a dependência com o MySQL 

 > npm i --save mysql2 

12.2 Vamos instalar a dependencia do sequelize.

 > npm i --save sequelize


 12.3 Vamos criar um diretório na raiz do seu projeto com o nome `database`.

12.4. Crie um arquivo no diretório database com o nome database.js, não se esqueça de criar uma database no seu mysqlworkbench:

database: ask
user: root
senha: senhadeconfiguracaodoseubanco

```js
// conectando 
const Sequelize = require('sequelize');
const connection = new Sequelize('ask', 'root', 'suasenha', {
  host: 'localhost',
  dialect: 'mysql',
});
module.exports = connection;
```

12.5 Vamos instanciar o mysql no nosso arquivo index.js

```js
// buscando conexão com o banco.
const connection = require('./database/database');

connection
  .authenticate()
  .then(() => {
    console.log('MySQL: Conexão feita com sucesso!');
  }).catch((error) => {
    console.log(error);
  });
```
> Se tiver erro na conexão com o mysql faça o step abaixo: 

```SQL
ALTER USER 'root'@'localhost' 
IDENTIFIED WITH mysql_native_password 
BY '123456'
```


13. Criando o modelo.

tabela

topic
--------
title
description

```js
const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Pergunta.sync({force: false}).then(() => {});
module.exports = Pergunta;
```

14. Adicionando o modelo no index.js

> const Pergunta = require('./database/Pergunta');

14.1 Chamando a tabela no Sequelize na rota 

```js 
//recebendo dados do form
app.post('/salvarpergunta', (req, res) => {
  const title = req.body.titulo;
  const description = req.body.descricao

  // salvar a perguntar no Banco
  Pergunta.create({
    title: title, 
    description: description
  }).then(() => {
    res.redirect('/');
  }).catch((error) => {
    console.log(error);
  });
});
```

15. Buscando todos os tópicos salvos no banco e preparando a rota `/` para exibi-la.

```js
app.get('/', (req, res) => {
  // vamos ler o nosso model Pergunta
  // select * from all pergunta;
  Pergunta.findAll({raw: true})
    .then((perguntas ) => {
      console.log(perguntas);
      res.render('index', {
        perguntas: perguntas
      });
  })
});
```

16. Vamos exibir agora os dados na nossa interface EJS.
Acesse o arquivo index.ejs.

```html

<div class="container mt-3 mb-3">
    <hr>
    <h1>Tópicos</h1>
    <a href="/perguntar" class="btn btn-primary">Criar novo tópico</a>
    <hr>
    <% perguntas.forEach(pergunta => { %>
      <br>
      <div class="card">
        <div class="card-body">
          <h3><%= pergunta.title %></h3>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary">
            Responder
          </button>
        </div>
      </div>
    <% }); %>
  </div>
```
*Abordar com eles sobre ASC / DESC *

17. Vamos agora no nosso EJS quando clicar em ler tópico vamos exibir o assunto.



