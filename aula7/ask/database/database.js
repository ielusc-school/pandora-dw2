// conectando 
const Sequelize = require('sequelize');
const connection = new Sequelize('ask', 'USUARIODOMYSQL', 'SENHADOMYSQL', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;