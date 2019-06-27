import bcrypt from 'bcrypt';
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
    name: "semi-sweet chocolate chips",
    popularity: 1
  },
  {
    name: "oats",
    popularity: 3
  },
  {
    name: "peanut butter",
    popularity: 2
  },
  {
    name: "cinnamon"
  },
  {
    name: "raisins",
    popularity: 4
  },
  {
    name: "dark brown sugar",
  },
  {
    name: "dark corn syrup"
  },
  {
    name: "baking powder"
  },
  {
    name: "bittersweet chocolate"
  },
  {
    name: "liquor"
  },
  {
    name: "almonds"
  }
]

const recipesData = [
  //recipe 1
  {
    name: "Toll House Chocolate Chip",
    picture: "/i/c/chocolate-chip.jpg",
    price: 12.99,
    yield: "Makes about 5 dozen",
    activeTime: "15 minutes",
    totalTime: "30 minutes",
    preheat: "375",
    intro: "",
    note: "",
    source: "Very Best Baking by Nestle",
    sourceURL: "https://www.verybestbaking.com/recipes/18476/original-nestle-toll-house-chocolate-chip-cookies/"
  },
  //recipe 2
  {
    name: "Vanishing Oatmeal Raisin",
    picture: "/i/c/oatmeal-raisin.jpg",
    price: 15.99,
    yield: "4 dozen",
    activeTime: "15 minutes",
    totalTime: "25 minutes",
    preheat: "350",
    intro: "",
    note: "Variations: Stir in 1 cup chopped nuts. Substitute 1 cup semisweet chocolate chips or candy-coated chocolate pieces for raisins; omit cinnamon. Substitute 1 cup diced dried mixed fruit.",
    source: "Quaker Oats",
    sourceURL: "https://www.quakeroats.com/cooking-and-recipe/vanishing-oatmeal-raisin-cookies/"
  },
  //recipe 3
  {
    name: "Peanut Butter Chocolate Chip",
    picture: "/i/c/pb-chocolate-chip.jpg",
    price: 16.99,
    yield: "Makes about 2 dozen",
    activeTime: "",
    totalTime: "",
    preheat: "350",
    intro: "",
    note: "",
    source: "Bon Appétit",
    sourceURL: "https://www.epicurious.com/recipes/food/views/peanut-butter-cookies-with-milk-chocolate-chunks-4518"
  },
  //recipe 4
  {
    name: "Peanut Butter Cookies",
    picture: "/i/c/peanut-butter.jpg",
    price: 15.49,
    yield: "Makes about 36",
    activeTime: "20 minutes",
    totalTime: "35 minutes",
    preheat: "375",
    intro: "For double the peanut flavor, add 3/4 cup of chopped peanuts to the dough.",
    note: "",
    source: "Better Homes and Gardens Cook Book",
    sourceURL: ""
  },
  //recipe 5
  {
    name: "Earthquake Cookies",
    picture: "/i/c/earthquake.jpg",
    price: 17.49,
    yield: "About 40 cookies",
    activeTime: "",
    totalTime: "",
    preheat: "325",
    intro: "Named because they develop fissures as they bake.",
    note: "You can make this dough several days before baking. Or roll the dough into 1-inch balls and freeze them for up to 2 months.",
    source: "Room for Dessert",
    sourceURL: ""
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
  }],
  //recipe 2
  [{
    body: "In large bowl, beat butter and sugars on medium speed of electric mixer until creamy. Add eggs and vanilla; beat well.",
    stepOrder: 1,
    RecipeId: 0
  },
  {
    body: " Add combined flour, baking soda, cinnamon and salt; mix well.",
    stepOrder: 2,
    RecipeId: 0
  },
  {
    body: "Add oats and raisins; mix well.",
    stepOrder: 3,
    RecipeId: 0
  },
  {
    body: "Drop dough by rounded tablespoonfuls onto ungreased cookie sheets.",
    stepOrder: 4,
    RecipeId: 0
  },
  {
    body: "Bake 8 to 10 minutes or until light golden brown.",
    stepOrder: 5,
    RecipeId: 0
  },
  {
    body: "Cool 1 minute on cookie sheets; remove to wire rack. Cool completely. Store tightly covered.",
    stepOrder: 6,
    RecipeId: 0
  }],
  //recipe 3
  [{
    body: "Butter 2 large baking sheets.",
    stepOrder: 1,
    RecipeId: 0
  },
  {
    body: "Using electric mixer, beat first 7 ingredients in large bowl until fluffy.",
    stepOrder: 2,
    RecipeId: 0
  },
  {
    body: "Mix flour, oats and baking soda in small bowl. Add to peanut butter mixture; beat to blend.",
    stepOrder: 3,
    RecipeId: 0
  },
  {
    body: "Stir in nuts and chocolate chips by hand.",
    stepOrder: 4,
    RecipeId: 0
  },
  {
    body: "For each cookie, drop 1 slightly rounded tablespoon dough onto prepared sheet and top each with second slightly rounded tablespoon dough, pressing slightly. Freeze 10 minutes.",
    stepOrder: 5,
    RecipeId: 0
  },
  {
    body: "Bake until cookies are light golden, about 15 minutes. Transfer to racks; cool.",
    stepOrder: 6,
    RecipeId: 0
  }],
  //recipe 4
  [{
    body: "In a mixing bowl beat butter and peanut butter with an electric mixer on medium to high speed for 30 seconds.",
    stepOrder: 1,
    RecipeId: 0
  },
  {
    body: "Add 1/2 cup of the flour, the sugars, egg, baking soda, baking powder, and vanilla. Beat till thoroughly combined.",
    stepOrder: 2,
    RecipeId: 0
  },
  {
    body: "Beat in the remaining flour. If necessary, cover and chill the dough till easy to handle.",
    stepOrder: 3,
    RecipeId: 0
  },
  {
    body: "Shape dough into 1-inch balls. If desired, roll in additional sugar.",
    stepOrder: 4,
    RecipeId: 0
  },
  {
    body: "Bake in a 375&deg; oven for 7 to 9 minutes or till bottoms are lightly browned.",
    stepOrder: 5,
    RecipeId: 0
  },
  {
    body: "Cool cookies on a wire rack.",
    stepOrder: 6,
    RecipeId: 0
  }],
  //recipe 5
  [{
    body: "In a bowl set over simmering water, melt the chocloate and butter together with the liquor.",
    stepOrder: 1,
    RecipeId: 0
  },
  {
    body: "Whip the eggs with the sugar until they form a ribbon, 5 to 7 minutes in a standing electric mixer. Stir in the melted chocolate.",
    stepOrder: 2,
    RecipeId: 0
  },
  {
    body: "In a food processor, pulverize the nuts with the flour, then add the baking powder. Stir the ground nut mixture into the chocolate batter.",
    stepOrder: 3,
    RecipeId: 0
  },
  {
    body: "Chill the chocolate cookie batter in the refrigerator until firm, 1 or 2 hours.",
    stepOrder: 4,
    RecipeId: 0
  },
  {
    body: "To bake the cookies, position an oven rack in the center of the oven.",
    stepOrder: 5,
    RecipeId: 0
  },
  {
    body: "Soft some powdered sugar into a bowl and pour some granulated sugar into another. Roll the cookie dough into 1-inch balls. First toss a few of the unbaked cookies in the granulated sugar to coat them, then roll them in the powdered sugar, coating them completely. Set the sugared cookies on a parchment lined baking sheet at least 1 inch apart. Continue to roll all the remaining cookies in both sugars.",
    stepOrder: 6,
    RecipeId: 0
  },
  {
    body: "Bake the cookies for 12 to 14 minutes, rotating the baking sheet midway through baking. They are done when they are just slightly firm at the edges but still quite soft near the center. They should slide on the baking sheet when you nudge them with your finger. Do not overbake them. Once they have cooled, store the cookies in an airtight container.",
    stepOrder: 7,
    RecipeId: 0
  }],
]

const recipeIngredientData = [
  [], //placeholder
  //recipe 1 ingredients
  [{
    RecipeId: 0,
    IngredientId: 1,
    recIngOrder: 1,
    amount: '2 1/4',
    unit: 'cups'
  },
  {
    RecipeId: 0,
    IngredientId: 2,
    recIngOrder: 2,
    amount: '1',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 3,
    recIngOrder: 3,
    amount: '1',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 4,
    recIngOrder: 4,
    preparation: 'softened',
    amount: '1',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 5,
    recIngOrder: 5,
    amount: '3/4',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 6,
    recIngOrder: 6,
    amount: '3/4',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 7,
    recIngOrder: 7,
    amount: '2',
  },{
    RecipeId: 0,
    IngredientId: 8,
    recIngOrder: 8,
    amount: '1',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 9,
    recIngOrder: 9,
    amount: '2',
    unit: 'cups'
  }],
  //recipe 2 ingredients
  [{
    RecipeId: 0,
    IngredientId: 4,
    recIngOrder: 1,
    amount: '14',
    preparation: 'softened',
    unit: 'tbl.'
  },
  {
    RecipeId: 0,
    IngredientId: 6,
    recIngOrder: 2,
    amount: '3/4',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 5,
    recIngOrder: 3,
    amount: '1/2',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 7,
    recIngOrder: 4,
    amount: '2',
  },{
    RecipeId: 0,
    IngredientId: 8,
    recIngOrder: 5,
    amount: '1',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 1,
    recIngOrder: 6,
    amount: '1 1/2',
    unit: 'cups'
  },{
    RecipeId: 0,
    IngredientId: 2,
    recIngOrder: 7,
    amount: '1',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 12,
    recIngOrder: 8,
    amount: '1',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 3,
    recIngOrder: 9,
    amount: '1/2',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 10,
    recIngOrder: 10,
    amount: '3',
    unit: 'cups'
  },{
    RecipeId: 0,
    IngredientId: 13,
    recIngOrder: 11,
    amount: '1',
    unit: 'cup'
  }],
  //recipe 3 ingredients
  [{
    RecipeId: 0,
    IngredientId: 11,
    recIngOrder: 1,
    amount: '1',
    preparation: 'chunky',
    unit: 'cup'
  },
  {
    RecipeId: 0,
    IngredientId: 14,
    recIngOrder: 2,
    amount: '10',
    unit: 'tbl.'
  },{
    RecipeId: 0,
    IngredientId: 5,
    recIngOrder: 3,
    amount: '1/2',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 4,
    recIngOrder: 4,
    amount: '6',
    unit: 'tbl.',
    preparation: 'unsalted, room temperature'
  },{
    RecipeId: 0,
    IngredientId: 15,
    recIngOrder: 5,
    amount: '2',
    unit: 'tbl.'
  },{
    RecipeId: 0,
    IngredientId: 7,
    recIngOrder: 6,
    amount: '1',
  },{
    RecipeId: 0,
    IngredientId: 8,
    recIngOrder: 7,
    amount: '2',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 1,
    recIngOrder: 8,
    amount: '1',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 10,
    recIngOrder: 9,
    amount: '1/4',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 2,
    recIngOrder: 10,
    amount: '1',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 9,
    recIngOrder: 11,
    amount: '9',
    unit: 'ounces'
  }],
  //recipe 4 ingredients
  [{
    RecipeId: 0,
    IngredientId: 4,
    recIngOrder: 1,
    amount: '1/2',
    unit: 'cup'
  },
  {
    RecipeId: 0,
    IngredientId: 11,
    recIngOrder: 2,
    amount: '1/2',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 1,
    recIngOrder: 3,
    amount: '1 1/4',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 5,
    recIngOrder: 4,
    amount: '1/2',
    unit: 'cup',
  },{
    RecipeId: 0,
    IngredientId: 6,
    recIngOrder: 5,
    amount: '1/2',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 7,
    recIngOrder: 6,
    amount: '1',
  },{
    RecipeId: 0,
    IngredientId: 2,
    recIngOrder: 7,
    amount: '1/2',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 16,
    recIngOrder: 8,
    amount: '1/2',
    unit: 'tsp.'
  },{
    RecipeId: 0,
    IngredientId: 8,
    recIngOrder: 9,
    amount: '1/2',
    unit: 'tsp.'
  }],
  //recipe 5 ingredients
  [{
    RecipeId: 0,
    IngredientId: 17,
    recIngOrder: 1,
    amount: '8',
    unit: 'ounces'
  },
  {
    RecipeId: 0,
    IngredientId: 4,
    recIngOrder: 2,
    amount: '3',
    unit: 'tbl.'
  },{
    RecipeId: 0,
    IngredientId: 18,
    recIngOrder: 3,
    amount: '1 1/2',
    unit: 'tbl.',
    preparation: 'rum, Cognac, or bourbon'
  },{
    RecipeId: 0,
    IngredientId: 7,
    recIngOrder: 4,
    amount: '2',
    preparation: 'at room temperature'
  },{
    RecipeId: 0,
    IngredientId: 5,
    recIngOrder: 5,
    amount: '1/3',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 19,
    recIngOrder: 6,
    amount: '1',
    unit: 'cup',
    preparation: 'toasted'
  },{
    RecipeId: 0,
    IngredientId: 1,
    recIngOrder: 7,
    amount: '1/2',
    unit: 'cup'
  },{
    RecipeId: 0,
    IngredientId: 16,
    recIngOrder: 8,
    amount: '1/2',
    unit: 'tsp.'
  }]
]

const usersData = [
  {
    name: 'Ann Taylor',
    email: 'a@a.com',
    password: '1234',
    street1: '12 A St.',
    city: 'Ann Arbor',
    state: 'ME',
    postalCode: '00123',
    orders: [
      {
      expectedDelivery: new Date('2019-01-01'),
      deliveredOn: new Date('2019-01-02'),
      createdAt: new Date('2018-12-25'),
      quantity: 2,
      paid: 25,
      RecipeId: 1,
      UserId: 0
      },
      {
      expectedDelivery: new Date('2019-02-02'),
      deliveredOn: new Date('2019-02-12'),
      createdAt: new Date('2019-02-01'),
      quantity: 1,
      paid: 12.99,
      RecipeId: 2,
      UserId: 0
      },
      {
      expectedDelivery: new Date('2019-06-16'),
      createdAt: new Date('2019-06-06'),
      quantity: 3,
      paid: 39.99,
      RecipeId: 1,
      UserId: 0
      },
    ],
    faves: [
      {
        RecipeId: 1,
        UserId: 0
      },
      {
        RecipeId: 2,
        UserId: 0
      },
    ]
  },
  {
    name: 'Bo Jangles',
    email: 'b@b.com',
    password: '1234',
    street1: '34 B Ave.',
    street2: 'Ste. 45',
    city: 'Berkeley',
    state: 'CA',
    postalCode: '94704',
    orders: [
      {
      expectedDelivery: new Date('2019-05-12'),
      deliveredOn: new Date('2019-05-16'),
      createdAt: new Date('2019-05-10'),
      quantity: 4,
      paid: 62.99,
      RecipeId: 2,
      UserId: 0
      },
      {
      expectedDelivery: new Date('2019-06-16'),
      createdAt: new Date('2019-06-07'),
      quantity: 1,
      paid: 12.99,
      RecipeId: 2,
      UserId: 0
      },
    ],
    faves: [
      {
        RecipeId: 2,
        UserId: 0
      },
    ]
  }
]
const seedDatabase = async () => {
  try {
    const db = createModels(sequelizeConfig);
    await db.sequelize.sync({force: true})
        console.log('Cleared database and created tables');


    // Create Ingredients
    console.log('\n######## creating INGREDIENTS #########')
    for (let ingredient of ingredientsData) {
      await db.Ingredient.create(ingredient);
    }
    // const newIngredients = await db.Ingredient.create(ingredientsData);
    console.log(`Created ${ingredientsData.length} ingredients`);

    // Create Recipes
    console.log('\n######## creating RECIPES #########')
    for (let recipe of recipesData) {
      let newRecipe = await db.Recipe.create(recipe);
      for (let step of recipeStepsData[newRecipe.id]) {
        step.RecipeId = newRecipe.id;
        await db.RecipeStep.create(step);
      }
      for (let recIng of recipeIngredientData[newRecipe.id]) {
        recIng.RecipeId = newRecipe.id;
        await db.RecIng.create(recIng);
      }
      console.log(`Created recipe: ${newRecipe.name} with ${recipeStepsData[newRecipe.id].length} steps and ${recipeIngredientData[newRecipe.id].length} ingredients `);
    }
    console.log(`Created ${recipesData.length} recipes`);

    // create Users, Purchases and Faves
    console.log('\n######## creating USERS #########')
    for (let user of usersData) {
      const userTmp = {
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        street1: user.street1,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode
      }
      let newUser = await db.User.create(userTmp);
      for (let order of user.orders) {
        order.UserId = newUser.id;
        await db.Purchase.create(order);
      }
      for (let fave of user.faves) {
        fave.UserId = newUser.id;
        await db.Fave.create(fave);
      }
      console.log(`Created user: ${newUser.name} with ${user.orders.length} orders and ${user.faves.length} faves `);
    }
    console.log(`Created ${usersData.length} users`);

    console.log('Exiting...');
    process.exit();

  } catch(err) {
    console.log(err);
  }
}
seedDatabase();
