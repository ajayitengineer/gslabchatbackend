const  Sequelize  = require('sequelize');

const sequelize = new Sequelize('gslab','root','',{ dialect : 'mysql', host: 'localhost'});

module.exports = sequelize;


