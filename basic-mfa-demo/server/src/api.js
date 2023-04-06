const users = require('./user.json');
const express = require('express');
const axios = require('axios');
const {authingManagementClient, appId, userPoolId, host, token } = require('./authing-client')

const router = express.Router();


const triggerMFA = async (username) => {
  const url = `${host}/api/v3/get-mfa-trigger-data`
  console.log(url);
  const { data: mfaTriggerData } = await axios.get(url, {
    params: {
      appId,
      userId: username,
      userIdType: 'username'
    },
    headers: {
      'x-authing-userpool-id': userPoolId,
      authorization: token
    }
  })
  return mfaTriggerData.data
}



router.post('/login', async function (req, res) {
  const { username, password } = req.body
  const user = users.find(user => user.username === username)
  const userPasswordValid = user?.password === password
  if(!userPasswordValid) {
    res.send(401)
    return
  }

  const mfaTriggerData = await triggerMFA(username)

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