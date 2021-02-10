import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

import { User } from '../models/user';

const router: express.Application = express();

// User signup
router.post('/user/signup', (req: Request, res: Response) => {
  const db = req.app.get('DB');
  db.User.findOne({ where: {email: req.body.email }})
  .then((user: User) => {
    if (user) {
      // send an error and let the user know that the email already exists
      return res.status(409).json({
        message: 'email already exists'
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(200).json({ error: err });
        } else {
          req.body.password = hash;
          db.User.create(req.body)
            .then((user: User) => {
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
                  console.log(faves);

                  res.status(200).json({
                    message: 'User Created',
                    user,
                    faves,
                    signedJwt
                  });
                }
              )
            })
            }
          })
        }
      })
  .catch((err: Error) => {
    res.status(500).json({ err })
  })

})

// User login
router.post('/user/login', (req: Request, res: Response) => {
  const db = req.app.get('DB');
  db.User.findOne({ where: {email: req.body.email }})
    .then((user: User) => {
      if (!user) {
        return res.status(401).json({
          message: 'Email/Password incorrect'
        })
      }
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if (err) {
          return res.status(500).json({ err });
        }
        if (match) {
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
              user.password = '';
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
          res.status(401).json({ message: 'Email/Password incorrect' });
        }
      })
    })
    .catch((err: Error) => {
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
router.use('/user', (req: RequestPlus, res: Response, next: NextFunction) => {
	const bearerHeader = req.headers['authorization'];

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
        return res.status(401).json({status: 401, message: 'Token has expired. Please log back in.', error: err})
      } else {
         if (typeof verified === 'object') {
           let verifiedObj: verified = verified;
          req.userId = verifiedObj._id; //set user id for routes to use
         }
      }
    })
	}
  next();
})

router.get('/user', (req: RequestPlus, res: Response) => {
  const db = req.app.get('DB');
  if (req.userId) {
    db.User.findByPk(req.userId, {attributes: {exclude: ['password']}})
      .then((foundUser: User) => {
        res.json(foundUser);
      })
  } else {
    res.json('No user Id provided');
  }
})

// need an update for user
// router.put
// email: req.body.email,
// password: hash,
// name: req.body.name,
// street1: req.body.street1,
// street2: req.body.steet2,
// city: req.body.city,
// state: req.body.state,
// postalCode: req.body.postalCode

router.get('/user/full', async (req: RequestPlus, res: Response) => {
  const db = req.app.get('DB');
  if (req.userId) {
    const user = await db.User.findByPk(req.userId, {attributes: {exclude: ['password']}});
    const faves = await db.Fave.findAll({where: {UserId: req.userId}, include: [{model: db.Recipe}]});
    res.json({user: user, faves: faves});
  } else {
    res.json('No user Id provided');
  }
})

router.get('/user/faves', async (req: RequestPlus, res: Response) => {
  const db = req.app.get('DB');
  if (req.userId) {
    res.json(await db.Fave.findAll({where: {UserId: req.userId}, include: [{model: db.Recipe}]}));
  } else {
    res.json('No user Id provided');
  }
})

router.post('/user/faves/:recipeId', async (req: RequestPlus, res: Response) => {
  const db = req.app.get('DB');
  if (req.userId) {
    await db.Fave.create({RecipeId: req.params.recipeId, UserId: req.userId});
    res.json(await db.Fave.findAll({where: {UserId: req.userId}, include: [{model: db.Recipe}]}));
  } else {
    res.json('No user Id provided');
  }
})

router.delete('/user/faves/:recipeId', async (req: RequestPlus, res: Response) => {
  const db = req.app.get('DB');
  if (req.userId) {
    res.json(await db.Fave.destroy({where: {RecipeId: req.params.recipeId, UserId: req.userId}}));
  } else {
    res.json('No user Id provided');
  }
})

router.get('/user/orders', async (req: RequestPlus, res: Response) => {
  const db = req.app.get('DB');
  if (req.userId) {
    const purchases = await db.Purchase.findAll({where: {UserId: req.userId}, include: [{model: db.Recipe}], order: [['createdAt', 'DESC']],});
    res.json(purchases);
  } else {
    res.json('No user Id provided');
  }
})

router.post('/user/orders', async (req: RequestPlus, res: Response) => {
  const db = req.app.get('DB');
  if (req.userId) {
    const purchase = await db.Purchase.create(req.body);
    res.json(purchase);
  } else {
    res.json('No user Id provided');
  }
})

export default router;
