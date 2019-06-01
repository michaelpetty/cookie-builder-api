const Sequelize = require('sequelize');

class Ingredient extends Sequelize.Model {
  static init(sequelize, type) {
    return super.init({
      name: {
        type:Sequelize.STRING,
        unique: true,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'ingredient'
    })
  }
}

// module.exports = (sequelize, type) => {
//     return sequelize.define('ingredient', {
//         name: {
//           type: type.STRING,
//           allowNull: false
//         }
//     })
// }

module.exports = Ingredient;
