import React, { Component, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
// import { Link } from "react-router-dom";

// import { AuthenticationClient } from 'authing-js-sdk'
import { useHistory } from 'react-router-dom'

// const appId = '64203d17f400d3d1ee957a4b'
// const appHost = 'https://console.wh.authing-inc.co'
// const userPoolId = '6418492c9dc4601eea005d02'
// const subscribeHost = 'wss://events.wh.authing-inc.co'
// const authenticationClient = new AuthenticationClient({
//     appId,
//     appHost,
//     subscribeHost,
//     userPoolId,
//     reconnect: 3
//   });

export default function Layout(props: any) {
  const history = useHistory()

  const token = Cookies.get('token')
  if(token) {
    const history = useHistory()
    history.push('/personal')
  }
  const [loading, setLoading] = useState(false)
  //@ts-ignore
  window.setLoading = setLoading
  // useEffect(() => {
  //   authenticationClient.mfa.subscribe(
  //     'authing.security.mfa?userIdentifier=huangqiang',
  //     (mfaData) => {
  //       console.log('mfaData: ', mfaData);
  //       //@ts-ignore
  //       window.mfaTriggerData = mfaData
  //       history.push('/mfa')
  //     }
  //   );
  // })

  return <div>
    <div>
      {/* <Link to="/register">Register</Link> - */}
      {/* <Link to="/login">Login</Link> - */}
      {/* <Link to="/personal">Personal</Link> */}
    </div>
    <div>{props.children}</div>
    {
      loading &&
        <div className="chase-wrapper">
          <div className="chase-item"></div>
          <div className="chase-item"></div>
          <div className="chase-item"></div>
          <div className="chase-item"></div>
          <div className="chase-item"></div>
          <div className="chase-item"></div>
        </div>
    }
  </div>
}

