require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const {DB_USER, DB_PASSWORD, DB_HOST,API_KEY, API_KEY1, API_KEY2} = process.env;
const recipeModel = require("./models/recipe.js")
const dietsModel = require("./models/diets.js")

 
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {logging: false, native: false,})

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
