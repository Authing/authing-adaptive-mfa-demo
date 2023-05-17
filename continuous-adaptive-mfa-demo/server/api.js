const axios = require('axios')
const users = require('./user.json');
const { uebaCapture, generateUEBAData } = require('./ueba')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVkX2F0IjoiMjAyMy0wMy0yNFQwODozMDoyNi40NjRaIiwiYWRkcmVzcyI6eyJjb3VudHJ5IjpudWxsLCJwb3N0YWxfY29kZSI6bnVsbCwicmVnaW9uIjpudWxsLCJmb3JtYXR0ZWQiOm51bGx9LCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IjEzMTAwMzA5NTg0IiwibG9jYWxlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwiYmlydGhkYXRlIjpudWxsLCJnZW5kZXIiOiJVIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJlbWFpbCI6InJvb3RAYXV0aGluZy5jbiIsIndlYnNpdGUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJvZmlsZSI6bnVsbCwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwibWlkZGxlX25hbWUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnaXZlbl9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJzdWIiOiI1YTU5N2YzNTA4NWEyMDAwMTQ0YTEwZWQiLCJleHRlcm5hbF9pZCI6bnVsbCwidW5pb25pZCI6bnVsbCwidXNlcm5hbWUiOiJyb290IiwiZGF0YSI6eyJ0eXBlIjoidXNlciIsInVzZXJQb29sSWQiOiI1OWY4NmI0ODMyZWIyODA3MWJkZDkyMTQiLCJhcHBJZCI6IjYzMmJlMDlmMmM5N2ZjMWM0ODkyOWI2NiIsImlkIjoiNWE1OTdmMzUwODVhMjAwMDE0NGExMGVkIiwidXNlcklkIjoiNWE1OTdmMzUwODVhMjAwMDE0NGExMGVkIiwiX2lkIjoiNWE1OTdmMzUwODVhMjAwMDE0NGExMGVkIiwicGhvbmUiOiIxMzEwMDMwOTU4NCIsImVtYWlsIjoicm9vdEBhdXRoaW5nLmNuIiwidXNlcm5hbWUiOiJyb290IiwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjU5Zjg2YjQ4MzJlYjI4MDcxYmRkOTIxNCJ9LCJ1c2VycG9vbF9pZCI6IjU5Zjg2YjQ4MzJlYjI4MDcxYmRkOTIxNCIsImF1ZCI6IjYzMmJlMDlmMmM5N2ZjMWM0ODkyOWI2NiIsImV4cCI6MTY4MDg2MTUwNSwiaWF0IjoxNjc5NjUxOTA1LCJpc3MiOiJodHRwczovL2NvbnNvbGUud2guYXV0aGluZy1pbmMuY28vb2lkYyJ9.7uFdSxveMhsuRYdA0x8zQdHHhOa5Bi3UufurCkpK8Hk'

const {authingManagementClient, appId, userPoolId } = require('./authing-client')

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
      originalIdentity: username
    })
    return {
      user,
      ueba
    }
  } else {
    if(user) {
      const ueba = await uebaCapture(req, {
        behaviorType: 'login',
        behaviorResult: 'login_failed_by_password',
        originalIdentity: username
      })
      console.log(ueba);
    } else {
      await uebaCapture(req, {
        behaviorType: 'login',
        behaviorResult: 'login_failed_by_account',
        originalIdentity: username
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
      user,
      ueba
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