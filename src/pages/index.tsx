import React from 'react'
import { useRouter } from 'next/router'
import { UTILS } from '../constants/utils'
import styled from 'styled-components'
import theme from '../styles/theme'
import { Background } from '../components/Background/style'
import CardQuiz from '../components/CardQuiz'

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
        <CardQuiz header="NextJs Quiz">
          <CardQuizContent>
            <form onSubmit={handleSubmit}>
              <input type="text" onChange={e => setUser(e.target.value)} />
              <button type="submit">jogar</button>
            </form>
          </CardQuizContent>
        </CardQuiz>
        <CardQuiz header="Quiz da galera!">
          <CardQuizContent></CardQuizContent>
        </CardQuiz>
      </div>
    </Background>
  )
}

export default Home
