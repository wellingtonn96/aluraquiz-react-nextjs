import React from 'react'
import { AppProps } from 'next/app'

import GlobalStyle from '../styles/global'
import { ThemeProvider } from 'styled-components'
import GithubCorner from 'react-github-corner'
import theme from '../styles/theme'
import { UTILS } from '../constants/utils'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
      <GithubCorner bannerColor={theme.colors.mainBg} href={UTILS.github} />
    </ThemeProvider>
  )
}

export default MyApp
