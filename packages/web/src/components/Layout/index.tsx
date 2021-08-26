import React from 'react'
import { UTILS } from '../../constants/utils'
import GithubCorner from 'react-github-corner'
import { Background } from './style'

const Layout: React.FC<{ background?: string; cornerColor?: string }> = ({
  children,
  background,
  cornerColor,
}) => {
  return (
    <Background background={background}>
      <GithubCorner
        bannerColor={cornerColor ? cornerColor : UTILS.theme.colors.mainBg}
        href={UTILS.github}
      />
      <div>{children}</div>
    </Background>
  )
}

export default Layout
