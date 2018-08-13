const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);
//const Sequelize = require('sequelize-hierarchy')();

const models = {};

let sequelizeConfig = new Sequelize(
  config.database, config.username, config.password, config
);

let skillModel = sequelizeConfig.import('./skill');
let categoryModel = sequelizeConfig.import('./category');

models[skillModel.name] = skillModel;
//models[categoryModel.name] = categoryModel;

// Get associations from models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Some temp auto-populated data to develop with
sequelizeConfig.sync({ force: true }).then(() => { 

  skillModel.build({ name: "Web Development" }).save().then(parent => {

    skillModel.build({ name: 'HTML' }).save().then(child => {
      parent.addChild(child);
    });

    skillModel.build({ name: 'Frontend' }).save().then(child => {
      parent.addChild(child);
      skillModel.build({ name: 'JavaScript' }).save().then(grandchild => {
        child.addChild(grandchild);
      });
      skillModel.build({ name: 'Vue.js' }).save().then(grandchild => {
        child.addChild(grandchild);
      });
    });

  });

  skillModel.build({ name: "Computer Science" }).save().then(parent => {

    skillModel.build({ name: 'Algorithms' }).save().then(child => {
      parent.addChild(child);
    });

    skillModel.build({ name: 'Data Structures' }).save().then(child => {
      parent.addChild(child);
    });

  });

});

module.exports = models;