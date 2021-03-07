// importando o express no projeto
const express = require('express');

// instanciando o express 
const app = express()


// criando nossa primeira rota com express X)
app.get('/', (req, res) => {
  // req(request)
  // res(response)

  // enviando uma resposta para o cliente em formato de texto
  res.send('Express rolando...');
  // podemos enviar apenas 1 resposta, o conteudo posterior será ignorado
  // pois estaremos fechando a conexão com o client
  // res.send('Express again...');
});

app.get('/blog', (req, res) => {
  res.send('Acessando o nosso blog');
});

app.get('/videos/yt', (req, res) => {
  res.send('<h3>Acessando meu youtube</h3>');
});

// parâmetros
app.get('/hello/:nome', (req,res) => {
  // REQ => dados enviados pelo usuário
  // RES => resposta que vai ser enviado para o usuário
  const name = req.params.nome; 
  res.send(`Hello, ${name}`);
});

// multiplos parâmetros
app.get('/say/:nome/:company', (req,res) => {
  // REQ => dados enviados pelo usuário
  // RES => resposta que vai ser enviado para o usuário
  const name = req.params.nome; 
  const company = req.params.company;

  res.send(`O(a) funcionário(a) ${name} trabalha na empresa ${company}`);
});

// parâmetros opcionais
app.get('/portal/:artigo?', (req,res) => {
  // REQ => dados enviados pelo usuário
  // RES => resposta que vai ser enviado para o usuário
  const artigo = req.params.artigo; 
  if(!artigo) {
    res.send(`O portal ainda não possui artigos publicados, deseja publicar agora?`);
  }
  res.send(`O título do artigo é: ${artigo}`);
});

// query params
app.get('/shop/apple', (req,res) => {
  let produto = req.query['classificado'];
  
  if(!produto) {
    res.send('Oush, não foi inserido nenhum produto para filtro.');
  } else {
    res.send(produto);
  }

});


// iniciando nosso servidor
app.listen(4000, (erro) => {
  if(erro) {
    console.log('Ops, ocorreu um erro ao iniciar o servidor.')
  } else {
    console.log('Servidor rodando no endereço: http://localhost:4000')
  }
});

