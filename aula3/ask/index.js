const express = require('express');
const app = express();

// configurando o ejs para ser adotado no view do express como template engine
app.set('view engine', 'ejs');

//3.  final da aula
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   // res.send('ask running');
//   let name = 'Cristofer Sousa'
//   let faculdade = 'IELUSC';
//   res.render('index', {
//     name,
//     faculdade,
//     turma: 'Desenvolvimento Web2',
//     remoto: true
//   });
// });


// app.get('/:name/:faculdade', (req, res) => {
//   // res.send('ask running');
//   let name = req.params.name;
//   let faculdade =  req.params.faculdade;
//   let exibirMensagem = true;

//   res.render('index', {
//     name,
//     faculdade,
//     turma: 'Desenvolvimento Web2',
//     remoto: true,
//     msg: exibirMensagem,
//   });
// });

// 3. 
app.get('/:name/:faculdade', (req, res) => {
  let name = req.params.name;
  let faculdade =  req.params.faculdade;
  let exibirMensagem = true;

  let alunos = [
    {id: 1, nome: 'Bianca', genero: 'feminino'},
    {id: 2, nome: 'Misael', genero: 'masculino'},
    {id: 3, nome: 'Victor', genero: 'masculino'},
    {id: 4, nome: 'Alexandre', genero: 'masculino'},
    {id: 5, nome: 'Lucas', genero: 'masculino'},
  ]
  res.render('index', {
    name,
    faculdade,
    turma: 'Desenvolvimento Web2',
    remoto: true,
    msg: exibirMensagem,
    pessoas: alunos
  });
});



app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/perfil', (req, res) => {
  res.render('principal/perfil');
});


// iniciando nosso servidor
app.listen(9000, (erro) => {
  if(erro) {
    console.log('Ops, ocorreu um erro ao iniciar o servidor.')
  } else {
    console.log('Servidor rodando no endereço: http://localhost:9000')
  }
});
