import React from 'react'

import { AuthingMFAProvider } from '@authing/mfa-component-react'

import '@authing/mfa-component-react/dist/index.min.css'

import RouterComponent from './router'

import './App.css'
import 'antd/dist/reset.css';
import { useGuardIconfont } from './IconFont/useGuardIconfont'

export default function App() {
  useGuardIconfont("https://files.authing.co/authing-user-portal")
  return (
    <RouterComponent></RouterComponent>
  )
}
