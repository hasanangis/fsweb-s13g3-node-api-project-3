const express = require('express');
const Users = require('./users-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateUserId, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const created = await Users.insert({ name: req.body.name });
    res.status(200).json(created);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  try {
    const updated = await Users.update(req.params.id, { name: req.body.name });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});


router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const created = await Users.post(req.params.id, { text: req.body.text });
    res.status(200).json(created);
  } catch (error) {
    next(error);
  }
});

// routerı dışa aktarmayı unutmayın
module.exports = router;