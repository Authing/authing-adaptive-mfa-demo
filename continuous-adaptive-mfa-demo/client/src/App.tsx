import React from 'react'

import { AuthingMFAProvider } from '@authing/mfa-component-react'

import '@authing/mfa-component-react/dist/index.min.css'

import RouterComponent from './router'

import './App.css'

const { appId, host} = require('../config.json')


export default function App() {
  return (
    <AuthingMFAProvider
      host= { host }
      appId={ appId }
      lang="en-US"
    >
      <RouterComponent></RouterComponent>
    </AuthingMFAProvider>
  )
}
