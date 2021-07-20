import React from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { UTILS } from '../constants/utils'
import styled from 'styled-components'
import theme from '../styles/theme'

interface IBackgroundProps {
  background: string
}

const Background = styled.div<IBackgroundProps>`
  font-size: 16px;
  background: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: cover;

  background-position: center;
  height: 100vh;
  width: 100%;
  margin: 0 auto;

  > div {
    max-width: 980px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 80px 20px;
  }
`

const CardQuiz = styled.div`
  background-color: ${theme.colors.primary};
  width: 350px;
  margin-bottom: 20px;
  border: 1px solid ${theme.colors.mainBg};
  color: ${theme.colors.contrastText};
  border-radius: 5px;
`
const HeaderCardQuiz = styled.div`
  background-color: ${theme.colors.mainBg};
  padding: 15px;
`
const CardQuizContent = styled.div`
  padding: 35px;

  input {
    width: 100%;
    height: 40px;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
  }

  button {
    width: 100%;
    height: 40px;
    text-transform: uppercase;
    margin-top: 20px;
    border: 0;
    outline: 0;
    font-weight: bold;

    &:hover {
      opacity: 0.5;
    }
  }
`
const Home: React.FC = () => {
  const router = useRouter()
  const [user, setUser] = React.useState<string>()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    return user && router.push(`quiz/?user=${user}`)
  }

  return (
    <Background background={UTILS.bg}>
      <div>
        <CardQuiz>
          <HeaderCardQuiz>
            <p>NextJs Quiz</p>
          </HeaderCardQuiz>
          <CardQuizContent>
            <form onSubmit={handleSubmit}>
              <input type="text" onChange={e => setUser(e.target.value)} />
              <button type="submit">jogar</button>
            </form>
          </CardQuizContent>
        </CardQuiz>
        <CardQuiz>
          <HeaderCardQuiz>
            <p>Quiz da galera!</p>
          </HeaderCardQuiz>
          <CardQuizContent></CardQuizContent>
        </CardQuiz>
      </div>
    </Background>
  )
}

export default Home
