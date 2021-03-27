## Projeto ASK

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

// responsavel por traduzir os dados enviados para uma estrutura que o JS reconheça
const bodyParser = require('body-parser');


// configurando o ejs para ser adotado no view do express como template engine
app.set('view engine', 'ejs');


app.use(express.static('public'));

//decodificando os dados submetidos pelo formulario
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

Para fazer a conexão entre os campos do formulário junto com o backend, 
deve-se adotar o atributo name no formulário.

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

Exercício:

1. Crie uma rota get/listar,
2. Crie um template list.ejs
3. Adote o conceito de partials visto em aula
4. Explore os recurso do Bootstrap para exibir como você acha que pode ser o preview de listar 
tópicos.
