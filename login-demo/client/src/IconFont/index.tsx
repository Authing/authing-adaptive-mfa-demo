import React, { FC } from 'react'
import { getClassnames } from './utils'
import './iconfont'
import './style.css'

export const IconFont: FC<{
  type: string
  style?: React.CSSProperties
  className?: string
}> = ({ type, style, className }) => {
  return (
    <svg style={{ ...style }} className={getClassnames(['g2-icon', className])}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}