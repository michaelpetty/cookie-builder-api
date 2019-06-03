import { createModels } from './models';
import { RecipeInstance } from  'models/recipe';
import { IngredientInstance } from 'models/ingredient';
const sequelizeConfig = require('./config/sequelizeConfig.json');

const ingredientsData = [
  {
    name: "all-purpose flower"
  },
  {
    name: "baking soda"
  },
  {
    name: "salt"
  },
  {
    name: "butter"
  },
  {
    name: "granulated sugar"
  },
  {
    name: "light brown sugar"
  },
  {
    name: "eggs"
  },
  {
    name: "vanilla"
  },
  {
    name: "semi-sweet chocolate chips"
  }
]
const recipesData = [
  {
    name: "Toll house Chocolate Chip",
    picture: "https://www.diningandcooking.com/wp-content/uploads/2018/03/Toll-House-Chocolate-Chip-Cookies-2.jpg",
    price: 15.99,
    yield: "Makes about 5 dozen",
    activeTime: "15 minutes",
    totalTime: "11 minutes",
    preheat: "375",
    intro: "",
    note: "",
    source: "Very Best Baking by Nestle",
    sourceURL: "https://www.verybestbaking.com/recipes/18476/original-nestle-toll-house-chocolate-chip-cookies/"
  }
]
const seedDatabase = async () => {
  try {
    const db = createModels(sequelizeConfig);
    await db.sequelize.sync({force: true})
//      .then(() => {
        console.log('Cleared database and created tables');
//      })

    // // Hash User Passwords
    // for (const user in usersData) {
    //   const hashedPassword = bcrypt.hashSync(usersData[user].password, 10);
    //   usersData[user].password = hashedPassword;
    // }
    // console.log('User passwords hashed...');

    // Create Ingredients
    for (let ingredient of ingredientsData) {
      await db.Ingredient.create(ingredient);
    }
    // const newIngredients = await db.Ingredient.create(ingredientsData);
    console.log(`Created ${ingredientsData.length} ingredients`);

    // Create Recipes
    for (let recipe of recipesData) {
      await db.Recipe.create(recipe);
    }
    console.log(`Created ${recipesData.length} recipes`);

  //   // Associate Users/Cities/Posts
  //   console.log('Associating models...');
  //
  //   const randomIndex = arr => Math.floor(Math.random() * arr.length);
  //
  //   for (const post in newPosts) {
  //     console.log('Random Index = ', randomIndex(newPosts));
  //
  //     newPosts[post].user_id = newUsers[randomIndex(newUsers)];
  //     newPosts[post].city_id = newCities[randomIndex(newCities)];
  //
  //     // Save Post
  //     await newPosts[post].save();
  // }
  //
  //   console.log('Users, cities, and posts successfully associated');

    console.log('Exiting...');
    process.exit();

  } catch(err) {
    console.log(err);
  }
}
seedDatabase();
