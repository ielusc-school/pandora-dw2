const express = require('express');
const app = express();


// responsavel por traduzir os dados enviados para uma estrutura que o JS reconheça
const bodyParser = require('body-parser');
// configurando o ejs para ser adotado no view do express como template engine
app.set('view engine', 'ejs');

//3.  final da aula
app.use(express.static('public'));

//11.1 decodificando os dados submetidos pelo formulario
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

// 12. testando a conexao com mysql
const connection = require('./database/database');

connection
  .authenticate()
  .then(() => {
    console.log('MySQL: Conexão feita com sucesso!');
  }).catch((error) => {
    console.log(error);
  });


// 14. conectando o mysql com a minha app... 
const Pergunta = require('./database/Pergunta');

app.get('/', (req, res) => {
  // vamos ler o nosso model Pergunta
  // select * from all pergunta;
  Pergunta.findAll({
    raw: true, 
    order: [['id', 'DESC']] // ASC = Crescente // DESC = DECRESCENTE  
  }).then((perguntas ) => {
      console.log(perguntas);
      res.render('index', {
        perguntas: perguntas
      });
  })
});

app.get('/perfil', (req, res) => {
  res.render('principal/perfil');
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

//recebendo dados do form
app.post('/salvarpergunta', (req, res) => {
  // let topic = {
  //   title: req.body.titulo,
  //   description: req.body.descricao, 
  // };
  // console.log(topic)
  // res.send(`Formulário enviado para o servidor', Titulo:  ${topic.title}, Descrição: ${topic.description}`);


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

app.get('/pergunta/:id', (req,res) => {
  let id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then((pergunta) => {
    if(pergunta != undefined) { // existe um topico no banco com o id informado
      res.render('pergunta', {
        pergunta: pergunta
      })
    } else { 
      res.redirect('/');
    }
  });
});

// iniciando nosso servidor
app.listen(9001, (erro) => {
  if(erro) {
    console.log('Ops, ocorreu um erro ao iniciar o servidor.')
  } else {
    console.log('Servidor rodando no endereço: http://localhost:9000')
  }
});
