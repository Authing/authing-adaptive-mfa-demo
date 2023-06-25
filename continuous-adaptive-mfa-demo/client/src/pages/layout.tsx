import React, { Component, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

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

