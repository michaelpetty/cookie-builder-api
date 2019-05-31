const Sequelize = require('sequelize');
//const RecipeModel = require('./models/recipe');
//const RecipeIngredientModel = require('./models/recipeingredient');
const IngredientModel = require('./ingredient');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.development.sqlite'
})

//const Recipe = RecipeModel(sequelize, Sequelize);
//const RecipeIngredient = RecipeIngredientModel(sequelize, Sequelize);
const Ingredient = IngredientModel(sequelize, Sequelize);

//Recipe.belongs

sequelize.sync()
  .then(() => {
    console.log('Database and tables created');
  })

module.exports = {
  Ingredient
}
