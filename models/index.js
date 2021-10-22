const fs = require('fs-extra');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); // index.js
const config = require('../config/config');
// const config = require(__dirname + '/../config/config.json')[env];
// json 파일에 있는 development
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // config.use_env_variable = config.development
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname) // [ 'index.js', 'Users.js' ]
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    // basename = index.js
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // __dirname = C:\Users\insu\Desktop\코드마스터\sequelize__\models
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// console.log(db) => { board: board, User: User }


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
