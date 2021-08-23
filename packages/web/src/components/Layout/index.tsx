import React from 'react'
import { UTILS } from '../../constants/utils'
import { Background } from './style'

const Layout: React.FC<{ background: string }> = ({ children, background }) => {
  return (
    <Background background={background}>
      <div>{children}</div>
    </Background>
  )
}

export default Layout
