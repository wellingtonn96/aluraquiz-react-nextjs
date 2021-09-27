import React from 'react'
import { UTILS } from '../../constants/utils'
import GithubCorner from 'react-github-corner'
import { Background, HeaderContainer } from './style'
import Link from 'next/link'
import { useAuth } from '../../hooks/Auth'

interface IPropsLayout {
  background?: string
  cornerColor?: string
  padding?: boolean
  home?: boolean
}

const Layout: React.FC<IPropsLayout> = ({
  children,
  background,
  cornerColor,
  padding,
  home,
}) => {
  const { user } = useAuth()
  return (
    <Background background={background} padding={padding}>
      <HeaderContainer>
        <ul>
          {!user && (
            <>
              {!home ? (
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/sign-up">
                      <a>Sign Up</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sign-in">
                      <a>Sign In</a>
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </HeaderContainer>
      <GithubCorner
        bannerColor={cornerColor ? cornerColor : UTILS.theme.colors.mainBg}
        href={UTILS.github}
      />
      <div>{children}</div>
    </Background>
  )
}

export default Layout
