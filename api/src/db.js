require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const {API_POST_URL ,API_KEY, API_KEY1, API_KEY2, HEROKU_DB} = process.env;
const recipeModel = require("./models/recipe.js")
const dietsModel = require("./models/diets.js")

 
const sequelize = new Sequelize(API_POST_URL,{
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  native:false,
  // dialectOptions: {
  //     ssl: {
  //         require: true,
  //         rejectUnauthorized: false
  //     }
  // }
})

recipeModel(sequelize)
dietsModel(sequelize)

const {Recipe, Diets} = sequelize.models

Recipe.belongsToMany(Diets ,{through:"recipe-Diets"})
Diets.belongsToMany(Recipe, {through:"recipe-Diets"})


console.log(sequelize.models)
module.exports = {
  ...sequelize.models, 
  conn: sequelize,
  API_KEY,
  API_KEY1, 
  API_KEY2,
  Op
};
