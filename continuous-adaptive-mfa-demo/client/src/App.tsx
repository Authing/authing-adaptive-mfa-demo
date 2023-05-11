import React from 'react'

import { AuthingMFAProvider } from '@authing/mfa-component-react'

import '@authing/mfa-component-react/dist/index.min.css'

import RouterComponent from './router'

import './App.css'

export default function App() {
  return (
    <AuthingMFAProvider
      host="https://console.wh.authing-inc.co"
      appId="6421c2b9ce49522bfc07a3f2"
      lang="en-US"
      // host="https://console.mfa.authing-inc.co"
      // appId="641ae676b72ee5baf98d7345"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  )
}
