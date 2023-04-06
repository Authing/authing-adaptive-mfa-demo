import React, { useEffect, useState } from 'react';
import request from 'superagent';
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function PersonalPage() {
  const [loginInfo, setLoginInfo] = useState<any>()
  const history = useHistory()
  //@ts-ignore
  window.setLoading(true)

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
        setLoginInfo(res.body);
      })
  }, [loginInfo])
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
  </div>;
}
