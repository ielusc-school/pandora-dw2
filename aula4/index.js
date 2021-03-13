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

app.get('/alunos', (req, res) => {
  let alunos = [
    {id: 1, nome: 'Bianca', genero: 'feminino'},
    {id: 2, nome: 'Misael', genero: 'masculino'},
    {id: 3, nome: 'Victor', genero: 'masculino'},
    {id: 4, nome: 'Lucas', genero: 'masculino'},
    {id: 5, nome: 'Alexandre', genero: 'masculino'},
  ];

  res.render('alunos', {
    pessoas: alunos
  });

});


app.listen(5000, (erro) => {
  if(erro) {
    console.log('Osh, erro ao executar o projeto');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
