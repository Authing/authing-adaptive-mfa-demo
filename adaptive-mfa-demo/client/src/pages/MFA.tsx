import React, { useEffect } from 'react'

import { useAuthingMFA, AuthingMFA } from '@authing/mfa-component-react'
import { useHistory } from 'react-router-dom'

export default function MFA() {
  const authingMFA = useAuthingMFA()
  const history = useHistory()
  //@ts-ignore
  window.setLoading(true)
  //@ts-ignore
  console.log(window.mfaTriggerData);
  
  useEffect(() => {
    authingMFA.start({
      el: document.querySelector('#authing-mfa-container') as Element,
      //@ts-ignore
      mfaTriggerData: window.mfaTriggerData
    })

    authingMFA.on('load', function () {
      console.log('Authing MFA load')
    })
    
    authingMFA.on('mount', function () {
      console.log('Authing MFA mount: ', document.querySelector('.authing-mfa-content'))
    })
    
    authingMFA.on('unmount', function () {
      console.log('Authing MFA unmount')
    })
    
    authingMFA.on('success', function (code, data) {
      //如果这里报错，你应该现登录一下 authing 就行了
      console.log("token="+atob(data.token.split('.')[1]));
      document.cookie = "token="+atob(data.token.split('.')[1])
      history.push('/personal')
      console.log('Authing MFA success: ', code, data)
    })
    
    authingMFA.on('fail', function (message) {
      console.log('Authing MFA fail: ', message)
    })
    //@ts-ignore
    window.setLoading(false)
  }, [])

  return (
    <div id="authing-mfa-container">123</div>
  )
}