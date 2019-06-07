import express from 'express';
import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createModels } from './models';
import { RecipeInstance } from  'models/recipe';
import { RecipeStepInstance } from  'models/recipestep';
import { IngredientInstance } from 'models/ingredient';
import { UserInstance } from 'models/user';
import { PurchaseInstance } from 'models/purchase';
import { FaveInstance } from 'models/fave';

const sequelizeConfig = require('./config/sequelizeConfig.json');
const PORT = process.env.PORT || 4000;

const app: express.Application = express();

const db = createModels(sequelizeConfig);
// db.sequelize.sync({force: true})
//   .then(() => {
//     console.log('Database and tables created');
//   })

//----------------- MIDDLEWARE ---------------//
// Express CORS Middleware

// configure CORS options and add whitelist
const corsOptions = {
  origin: '*',
  credentials: true
}
app.options('*', cors());
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//----------------- HTML ENDPOINT ---------------//
app.get('/', (req: Request, res: Response) => res.send('<h1>Welcome to Cookie Builder API</h1>'));


//----------------- API ENDPOINT ---------------//
// Ingredients
app.get('/api/v1/ingredients', (req: Request, res: Response) => {
  db.Ingredient.findAll()
    .then((ingredients: IngredientInstance[]) => res.json(ingredients));
})

app.post('/api/v1/ingredients', (req: Request, res: Response) => {
  db.Ingredient.create(req.body)
    .then((ingredient: IngredientInstance) => res.json(ingredient));
})

app.get('/api/v1/ingredients/top', (req: Request, res: Response) => {
  db.Ingredient.findAll({order: ['popularity'], limit: 5})
    .then((ingredients: IngredientInstance[]) => res.json(ingredients));
})

// Recipe/Ingredient Map


// Recipes
app.get('/api/v1/recipes', async (req: Request, res: Response) => {
  if (req.query.ingredient) {
    res.json(await db.RecIng.findAll({where: {IngredientId: req.query.ingredient}, include: [{model: db.Recipe}]}));
  } else {
    res.json(await db.Recipe.findAll());
  }
})

app.post('/api/v1/recipes', (req: Request, res: Response) => {
  db.Recipe.create(req.body)
    .then((recipe: RecipeInstance) => res.json(recipe));
})

app.get('/api/v1/recipes/:id', (req: Request, res: Response) => {
  db.Recipe.findByPk(req.params.id)
    .then((recipe: RecipeInstance) => res.json(recipe))
})

app.get('/api/v1/recipes/:id/full', async (req: Request, res: Response) => {
  const recipe = await db.Recipe.findByPk(req.params.id);
  const recipeSteps = await recipe.getRecipeSteps();
  const recings = await db.RecIng.findAll({where: {RecipeId: req.params.id}, include: [{model: db.Ingredient}]});
  res.json({recipe: recipe, recipeSteps: recipeSteps, ingredients:recings});
})

// Recipe Steps
app.get('/api/v1/recipes/:id/steps', (req: Request, res: Response) => {
  db.RecipeStep.findAll({where:{RecipeId: req.params.id}})
    .then((recipesteps: RecipeStepInstance[]) => res.json(recipesteps))
})

// AUTH
// User signup
app.post('/auth/user/signup', (req: Request, res: Response) => {
  console.log('in the signup');
  console.log(req.body);

  db.User.findOne({ where: {email: req.body.email }})
  .then(user => {
    if (user) {
      // send an error and let the user know that the email already exists
      return res.status(409).json({
        message: 'email already exists'
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          console.log('hashing error:', err);
          res.status(200).json({ error: err });
        } else {
          db.User.create({
              email: req.body.email,
              password: hash,
              name: req.body.name,
              street1: req.body.street1,
              street2: req.body.steet2,
              city: req.body.city,
              state: req.body.state,
              postalCode: req.body.postalCode
            })
            .then((newUser: UserInstance) => {
              console.log('here is the result', newUser);
              let user = {
                email: newUser.email,
                _id: newUser.id
              }

              jwt.sign(
                user,
                'waffles',
                {
                  expiresIn: '1h'
                },
                (err, signedJwt) => {
                  res.status(200).json({
                    message: 'User Created',
                    user,
                    signedJwt
                  });
                }
              )
            })
            }
          })
        }
      })
  .catch(err => {
    console.log(err);
    res.status(500).json({ err })
  })

})

// User login
app.post('/auth/user/login', (req: Request, res: Response) => {
  console.log('LOGIN CALLED');
  console.log('body', req.body);
  db.User.findOne({ where: {email: req.body.email }})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Email/Password incorrect'
        })
      }
      console.log('body', req.body);
      console.log('hash', user.password);
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        console.log(match);
        if (err) {
          console.log(err);
          return res.status(500).json({ err });
        }
        if (match) {
          console.log('MATCH: ', match);
          let userJWT = {
            email: user.email,
            _id: user.id
          }
          jwt.sign(
            userJWT,
            'waffles',
            {
              expiresIn: '1h'
            },
            async (err, signedJwt) => {
              const faves = await db.Fave.findAll({where: {UserId: user.id}, include: [{model: db.Recipe}]});
              res.status(200).json({
                message: 'Auth successful',
                userJWT,
                signedJwt,
                user,
                faves
              });
            }
          )
        } else {
          console.log('NOT A MATCH');
          res.status(401).json({ message: 'Email/Password incorrect' });
        }
      })
    })
    .catch(err => {
      console.log('OUTSIDE ERROR_');
      console.log(err);
      res.status(500).json({ err });
    })
})

// add some additional properties to Request Type
interface RequestPlus extends Request {
  token: string;
  userId: number;
}

// check here that user logged in
// pass via header the token
app.use('/auth/user', (req: RequestPlus, res: Response, next: NextFunction) => {
	console.log('activated');
	const bearerHeader = req.headers['authorization'];
	console.log('triggered token check', bearerHeader);

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
    interface verified {
      email?: string;
      _id?: number;
      iat?: number;
      exp?: number;
    }
		jwt.verify(req.token, 'waffles', (err, verified) => {
      if (err) {
        return res.json({message: 'Token has expired. Please log back in.', error: err})
      } else {
        console.log(`verified: ${typeof verified}`);
    		console.log('here is the verified', verified);
         if (typeof verified === 'object') {
           let verifiedObj: verified = verified;
           console.log('yep, we got an object');
          req.userId = verifiedObj._id; //set user id for routes to use
         }
        next();
      }
    })
	}
})

app.get('/auth/user', (req: RequestPlus, res: Response) => {
  console.log('trigger Show', req.userId);
  if (req.userId) {
    db.User.findByPk(req.userId)
      .then((foundUser: UserInstance) => {
        res.json(foundUser);
      })
  } else {
    res.json('No user Id provided');
  }
})

app.get('/auth/user/full', async (req: RequestPlus, res: Response) => {
  console.log('trigger Show', req.userId);
  if (req.userId) {
    const user = await db.User.findByPk(req.userId);
    const faves = await db.Fave.findAll({where: {UserId: req.userId}, include: [{model: db.Recipe}]});
    res.json({user: user, faves: faves});
  } else {
    res.json('No user Id provided');
  }
})

app.get('/auth/user/faves', async (req: RequestPlus, res: Response) => {
  console.log('trigger Show', req.userId);
  if (req.userId) {
    res.json(await db.Fave.findAll({where: {UserId: req.userId}, include: [{model: db.Recipe}]}));
  } else {
    res.json('No user Id provided');
  }
})

app.get('/auth/user/orders', async (req: RequestPlus, res: Response) => {
  console.log('trigger Show', req.userId);
  if (req.userId) {
    res.json(await db.Purchase.findAll({where: {UserId: req.userId}, include: [{model: db.Recipe}]}));
  } else {
    res.json('No user Id provided');
  }
})

//----------------- START 'ER UP ---------------//
app.listen(PORT, () => console.log(`API started on port ${PORT}`));
