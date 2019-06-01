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
const Ingredient = IngredientModel.init(sequelize, Sequelize);

//Recipe.belongs

sequelize.sync({force:true})
  .then(() => {
    console.log('Database and tables created');
  })

module.exports = {
  Ingredient
}
