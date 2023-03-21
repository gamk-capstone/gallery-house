const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

// route at /auth/login POSTS a new, signed, and verified token for a user 
router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// route at /auth/signup creates a new instance of the `User` model, and sends a signed and verified token for that user
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// route at /auth/me GETS an instance of `User` model based on it's header authorization
router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
