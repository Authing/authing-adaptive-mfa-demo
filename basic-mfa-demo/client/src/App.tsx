import React from 'react'

import { AuthingMFAProvider } from '@authing/mfa-component-react'

import '@authing/mfa-component-react/dist/index.min.css'

import RouterComponent from './router'

import './App.css'

export default function App() {
  return (
    <AuthingMFAProvider
      host="https://console.pre.authing.cn"
      appId="642e7b26bf3d0c1a9a833bbd"
      lang="en-US"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  )
}
