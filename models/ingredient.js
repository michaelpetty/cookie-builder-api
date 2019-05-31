const Model = Sequelize.Model;

class Ingredient extends Model {}

Ingredient.init({
  name: {
    type:Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ingredient'
})
