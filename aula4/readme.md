## Resumo: Aula 4
Nessa aula estamos aprendendo sobre como funciona as views adotando o EJS e como podemos exibir valores das nossas variáveis que estão no servidor e renderizar no client através do HTML.

> Documentação oficial:
1. [https://ejs.co/](https://ejs.co/)

## Setup

0. crie um novo projeto `node-template`
> npm init

1. instale o express na pasta do seu projeto node
> npm install express --save

2. crie o arquivo na raiz do projeto 
> index.js

3. configure o setup inicial para subir seu projeto
```js
// importando o express no projeto
const express = require('express');
// instanciando o express 
const app = express();
// instanciando o EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// criar as nossas rotas
app.get('/:name/:faculdade', (req, res) => {
  // let name = 'Joao Pé de Feijão';
  // let faculdade = 'IELUSC';

  let name =  req.params.name;
  let faculdade = req.params.faculdade;
  let msg = true;

  res.render('index', {
    name, 
    faculdade,
    remoto: true,
    curso: 'Desenvolvimento Web2',
    exibirNotificacao: msg,
  });
});

app.listen(5000, (erro) => {
  if(erro) {
    console.log('Osh, erro ao executar o projeto');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
```

4. Crie um diretório na raiz do projeto `public`
5. Crie os diretórios dentro de public para servir seus **assets** arquivos estáticos:
- CSS
- JS
- IMG
6. Crie um diretório na raiz do projeto `views`
7. Crie um arquivo no diretório `views` com o nome `index.ejs`;
8. Contéudo do seu arquivo index.ejs deve ser:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aula 4 - Exemplo 1 EJS</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>Olá EJS</h1>
  <p>Estamos funcionando...</p>
  <hr>
  <h3>Renderizando variáveis</h3>

  <h5><%= name %></h5>
  <%= faculdade %> <br>
  A turma está no modelo: <strong><%= remoto %> </strong> <br>
  O curso que fazemos é <%= curso %>


  <h3>Condicionais</h3>
  <% if(!exibirNotificacao) { %>
    <strong>Error:</strong> Não foi possivel exibir a informação solicitada.
  <% } else { %>
    <strong>Correto:</strong> 
    Tudo Certo, renderizando conforme esperado....
  <% } %>
</body>
</html>

```
9. Execute o projeto: 
> nodemon index.js or npx nodemon index.js


