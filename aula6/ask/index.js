const express = require('express');
const app = express();

//configurando o envio de dados do browser para o server
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

// conectando com o banco de dados mysql pelo nodejs
// devemos criar uma database no mysql workbench com o nome que foi especificado
// no arquivo database.js
const connection = require('./database/database');
connection
  .authenticate()
  .then(() => {
    console.log('MYSQL, CONECTADO');
  }).catch((error) => {
    console.error(error);
  });

// Adicionando meu modelo Pergunta para o Node.
const Pergunta = require('./database/Pergunta');


app.get('/', (req, res) => {
  //select * from perguntas;
  
  Pergunta.findAll({
    raw: true, 
    order: [[ 'id', 'DESC']]
  }).then((perguntas) => {
    res.render('index', {
      perguntas: perguntas
    });
  });
});

app.get('/novo', (req, res) => {
  res.render('new');
});

app.post('/salvar', (req, res) => {
    let title = req.body.titulo;
    let description = req.body.descricao;
    console.log(`Dados do formulario salvo: Titulo: ${title}  Descricao: ${description}`);
  // insert into Pergunta values ('titulo qualquer', 'descricao qualquer');

    Pergunta.create({
      title: title, 
      description: description
    }).then(() => {
      res.redirect('/');
    }).catch((error) => {
      console.error(`Ocorreu um erro, ao salvar sua pergunta -  ${error}`);
    });
});

app.listen(9000, (erro) => {
  if(erro) {
    console.log('Ops, erro de servidor na porta 9000');
  } else {
    console.log('Servidor rodando : https//localhost:9000');
  }
});
