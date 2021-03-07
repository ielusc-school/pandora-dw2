const http = require('http');

http.createServer(function(requisicao, resposta) {
  resposta.end('<h1> Hello NodeJs rodando no servidor</h1> <br> <h4> Desenvolvimento Web II </h4>');
}).listen(9000);

console.log('Servidor rodando na porta > http://localhost:9000');





