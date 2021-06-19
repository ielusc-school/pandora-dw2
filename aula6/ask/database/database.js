const Sequelize = require('sequelize');
const connection = new Sequelize('pandora', 'root', 'suasenhadobanco', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;