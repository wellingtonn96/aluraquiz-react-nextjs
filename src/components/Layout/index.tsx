import React from 'react'
import { UTILS } from '../../constants/utils'
import { Background } from './style'

const Layout: React.FC = ({ children }) => {
  return (
    <Background background={UTILS.bg}>
      <div>{children}</div>
    </Background>
  )
}

export default Layout
