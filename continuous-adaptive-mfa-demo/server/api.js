const users = require('./user.json');
const { uebaCapture } = require('./ueba')

const express = require('express');
const router = express.Router();

const login = async (req, res) => {
  const { username, password } = req.body
  const user = users.find(user => user.username === username)
  const userPasswordValid = user?.password === password
  if (userPasswordValid) {
    const ueba = await uebaCapture(req, {
      behaviorType: 'login',
      behaviorResult: 'login_success',
      originalIdentity: username,
      ip: "127.0.5.19"
    })
    return {
      user
    }
  } else {
    if(user) {
      const ueba = await uebaCapture(req, {
        behaviorType: 'login',
        behaviorResult: 'account_wrong',
        originalIdentity: username,
        ip: "127.0.5.19"
      })
      console.log(ueba);
    } else {
      await uebaCapture(req, {
        behaviorType: 'login',
        behaviorResult: 'account_wrong',
        originalIdentity: username,
        ip: "127.0.5.19"
      })
    }
    res.send(400)
  }
}

router.post('/login', async function (req, res) {
  try {
    const loginRes = await login(req, res)
    
    if(!loginRes) {
      return
    }

    const {
      user
    } = loginRes
    
    res.cookie('token', JSON.stringify(user));
    res.send({
      status: true,
      user: user
    });
  } catch (error) {
    console.log(error);
  }

});

router.get('/personal', function (req, res) {
  res.send(req.user);
});

module.exports = router;