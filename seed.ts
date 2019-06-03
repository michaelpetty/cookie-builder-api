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
  //recipe 1
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

const recipeStepsData = [
  [], //placeholder
  //recipe 1
  [{
    body: "Combine flour, baking soda and salt in a small bowl. Set aside.",
    stepOrder: 1,
    RecipeId: 0
  },
  {
    body: "Beat butter, granulated sugar, brown sugar and vanilla extract in large mixer bowl until creamy.",
    stepOrder: 2,
    RecipeId: 0
  },
  {
    body: "Add eggs to butter/sugar mixture one at a time, beating well after each addition.",
    stepOrder: 3,
    RecipeId: 0
  },
  {
    body: "Gradually add in flour mixture to butter/sugar mixture.",
    stepOrder: 4,
    RecipeId: 0
  },
  {
    body: "Stir in morsels by hand.",
    stepOrder: 5,
    RecipeId: 0
  },
  {
    body: "Drop rounded tablespoon of mixture onto ungreased baking sheets.",
    stepOrder: 6,
    RecipeId: 0
  },
  {
    body: "Bake for 9 to 11 minutes or until golden brown.",
    stepOrder: 7,
    RecipeId: 0
  },
  {
    body: "Let stand for 2 minute; remove to wire racks to cool completely.",
    stepOrder: 8,
    RecipeId: 0
  }]
]

const seedDatabase = async () => {
  try {
    const db = createModels(sequelizeConfig);
    await db.sequelize.sync({force: true})
        console.log('Cleared database and created tables');


    // Create Ingredients
    for (let ingredient of ingredientsData) {
      await db.Ingredient.create(ingredient);
    }
    // const newIngredients = await db.Ingredient.create(ingredientsData);
    console.log(`Created ${ingredientsData.length} ingredients`);

    // Create Recipes
    for (let recipe of recipesData) {
      let newRecipe = await db.Recipe.create(recipe);
      for (let step of recipeStepsData[newRecipe.id]) {
        step.RecipeId = newRecipe.id;
        await db.RecipeStep.create(step);
      }
      console.log(`Created recipe: ${newRecipe.name} with ${recipeStepsData[newRecipe.id].length} steps`);

    }
    console.log(`Created ${recipesData.length} recipes`);



  // // Hash User Passwords
  // for (const user in usersData) {
  //   const hashedPassword = bcrypt.hashSync(usersData[user].password, 10);
  //   usersData[user].password = hashedPassword;
  // }
  // console.log('User passwords hashed...');

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
