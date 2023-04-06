const users = require('./user.json');

const express = require('express');
const router = express.Router();
router.post('/login', async function (req, res) {
  const { username, password } = req.body
  const user = users.find(user => user.username === username)
  const userPasswordValid = user?.password === password
  if(!userPasswordValid) {
    res.send(401)
    return
  }
  res.cookie('token', JSON.stringify(user));
  res.send({
    status: true,
    user: user
  });
});

router.get('/personal', function (req, res) {
  const token = req.cookies['token'];
  if (token === null || token.length === 0) {
      res.sendStatus(401);
      return
  }
  const user = JSON.parse(token)
  res.send(user);
});

module.exports = router;