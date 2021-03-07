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
