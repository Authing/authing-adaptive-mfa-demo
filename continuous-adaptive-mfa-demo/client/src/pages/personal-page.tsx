import React, { Component, useEffect, useState } from 'react';
import request from 'superagent';
import { useHistory } from 'react-router-dom'
import { AuthenticationClient } from 'authing-js-sdk'
import Cookies from 'js-cookie'

Cookies.set('foo', 'bar')
const appId = '644ccb3a237085bf7c3b57f4'
const appHost = 'https://console.wh.authing-inc.co'
const userPoolId = '644795124e79ca8a0fb9b281'
const subscribeHost = 'wss://events.wh.authing-inc.co'
const authenticationClient = new AuthenticationClient({
    appId,
    appHost,
    subscribeHost,
    userPoolId,
  });
  
export default function PersonalPage() {
  const [loginInfo, setLoginInfo] = useState<any>()
  const history = useHistory()
  //@ts-ignore
  window.setLoading(true)
  useEffect(() => {
    if(!loginInfo) {
      return
    }
    authenticationClient.mfa.subscribe(
      'authing.security.mfa?user=' + loginInfo.username,
      (mfaData) => {
        if(typeof mfaData === 'string') {
          mfaData = JSON.parse(mfaData)
        }
        console.log('mfaData: ', mfaData);
        if(mfaData.applicationMfa.length == 0) {
          return
        }
        //@ts-ignore
        window.mfaTriggerData = mfaData
        history.push('/mfa')
      }
    );
  })

  //@ts-ignore
  window.logout = () => {
    Cookies.remove('token')
    history.push('/login')
  }

  useEffect(() => {
    if(loginInfo) {
      return
    }
    request
      .get('/api/personal')
      .end((err, res) => {
        //@ts-ignore
        window.setLoading(false)
        console.log(err);
        if (err) {
          if (res.statusCode === 401) {
            return history.push('/login');
          }
        }
        if(!res.body.mfaTriggerData) {
          setLoginInfo(res.body);
        } else {
          //@ts-ignore
          window.mfaTriggerData = res.body.mfaTriggerData
          history.push('/mfa')
        }
      })
  }, [loginInfo])
  console.log(JSON.stringify(loginInfo, null, 4))
  return <div style={{
    width: "100%",
    marginTop: "280px",
    position: "relative",
    textAlign: "center"
  }}>
    <h1 style={{
      textAlign: "center",
      fontSize: "40px"
    }}>Login Success</h1>
    <div style={{
      fontSize: "30px"
    }}>UserName: {loginInfo?.username}</div>
    
    <button onClick={() => 
      //@ts-ignore
      window.logout()}>logout</button>
    {/* <p>{JSON.stringify(loginInfo, null, 4)}</p> */}
  </div>;
}
