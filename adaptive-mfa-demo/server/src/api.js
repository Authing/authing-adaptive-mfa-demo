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
      behaviorResult: "login_success",
      originalIdentity: username,
      behaviorType: "login",
      ip: "127.0.5.19"
    }
    const mfaTriggerData = await triggerMFA(ueba)
    return {
      user,
      mfaTriggerData
    }
  } else {
    if(user) {
      const ueba = {
        behaviorType: 'login',
        behaviorResult: 'account_wrong',
        originalIdentity: username,
        ip: "127.0.5.19"
      }
      triggerMFA(ueba)
      console.log(ueba);
    } else {
      const ueba = {
        behaviorType: 'login',
        behaviorResult: 'account_wrong',
        originalIdentity: username,
        ip: "127.0.5.19"
      }
      triggerMFA(ueba)
      console.log(ueba);
    }
    res.send(400)
  }
}

const triggerMFA = async (ueba) => {
  console.log('ueba', ueba);
  // TODO: public/service
  const res = await axios.post('https://console.wh.authing-inc.co/public/service/4428ece3304f431581eb7738125e5582',
    {
      "query": {},
      "headers": {},
      "body": ueba
    },
    {
      headers: {
        "content-type": "application/json",
        "x-authing-userpool-id": "644795124e79ca8a0fb9b281"
      }
    }
  )
  if(res.data?.data?.output) {
    console.log(res.data);
    return res.data.data.output
  }
  console.log(res.data);
  // return res.data.data.output
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
    
    if (mfaTriggerData?.applicationMfa?.length) {
      console.log(JSON.stringify(mfaTriggerData.applicationMfa));
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