import React, { Component, useEffect, useState } from 'react';
import request from 'superagent';
import { useHistory } from 'react-router-dom'
import { AuthenticationClient } from 'authing-js-sdk'
import Cookies from 'js-cookie'

Cookies.set('foo', 'bar')
const appId = '6421857cd86fbc2dcff956ec'
const appHost = 'https://console.wh.authing-inc.co'
const userPoolId = '6418492c9dc4601eea005d02'
const subscribeHost = 'wss://events.wh.authing-inc.co'
const authenticationClient = new AuthenticationClient({
    appId,
    appHost,
    subscribeHost,
    userPoolId,
    reconnect: 3
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
      'authing.security.mfa?userIdentifier=' + loginInfo.username,
      (mfaData) => {
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
