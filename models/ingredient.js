// const Sequelize = require('sequelize');
// const Model = Sequelize.Model;
// const sequelize = require('../sequelize');
//
// class Ingredient extends Model {}
//
// Ingredient.init({
//   name: {
//     type:Sequelize.STRING,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'ingredient'
// })
module.exports = (sequelize, type) => {
    return sequelize.define('ingredient', {
        name: {
          type: type.STRING,
          allowNull: false
        }
    })
}
