import React from 'react'
import { Container } from './header.style'
import Link from 'next/link'
import { useAuth } from '../../../hooks/Auth'
import { FaPowerOff } from 'react-icons/fa'

const Header: React.FC = () => {
  const { user, signOut } = useAuth()

  async function getInitialProps(ctx) {
    signOut(ctx)
  }

  return (
    <Container>
      <div>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>

        {user ? (
          <ul>
            <li>
              <Link href="/sign-in">
                <a>Olá, {user.username.toUpperCase()}</a>
              </Link>
            </li>
            <li onClick={getInitialProps}>
              <FaPowerOff size={20} />
            </li>
          </ul>
        ) : (
          <ul>
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
          </ul>
        )}
      </div>
    </Container>
  )
}

export default Header
