const axios = require('axios')
const users = require('./user.json');
const { uebaCapture } = require('./ueba')

const express = require('express');
const router = express.Router();

const login = async (req, res) => {
  const { username, password } = req.body
  const user = users.find(user => user.username === username)
  const userPasswordValid = user?.password === password
  if (userPasswordValid) {
    const ueba = {
      "a": "a",
      "b": "b",
      behaviorType: 'login',
      behaviorResult: 'login_success',
      originalIdentity: username
    }
    const mfaTriggerData = await triggerMFA(ueba)
    return {
      user,
      mfaTriggerData
    }
  } else {
    if(user) {
      const ueba = {
        "a": "a",
        "b": "b",
        behaviorType: 'login',
        behaviorResult: 'login_failed_by_password',
        originalIdentity: username
      }
      await triggerMFA(ueba)
      console.log(ueba);
    } else {
      const ueba = {
        "a": "a",
        "b": "b",
        behaviorType: 'login',
        behaviorResult: 'login_failed_by_account',
        originalIdentity: username
      }
      await triggerMFA(ueba)
      console.log(ueba);
    }
    res.send(400)
  }
}

const triggerMFA = async (ueba) => {
  console.log('ueba', ueba);
  // TODO: public/service
  const res = await axios.post('https://console.wh.authing-inc.co/public/service/c523d7e6-ea1e-4a55-8a8a-6368af79d10a',
    {
      "query": {
      },
      "headers": {
      },
      "body": ueba
    }
  )
  return res.data.data.output
}

router.post('/login', async function (req, res) {
  try {
    const loginRes = await login(req, res)
    
    if(!loginRes) {
      return
    }

    const {
      user,
      mfaTriggerData
    } = loginRes
    console.log(mfaTriggerData);
    
    if (mfaTriggerData.applicationMfa.length) {
      res.send({
        status: false,
        mfaTriggerData
      });
    } else {
      res.cookie('token', JSON.stringify(user));
      res.send({
        status: true,
        user: user
      });
    }
  } catch (error) {
    console.log(error);
  }

});

router.get('/personal', function (req, res) {
  res.send(req.user);
});

module.exports = router;