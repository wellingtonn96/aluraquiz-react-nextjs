import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { UTILS } from '../constants/utils'
import { ButtonStyled } from '../components/Button/styled'
import theme from '../styles/theme'

const HomeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`

const ButtonNewQuizContainer = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: row-reverse;

  button {
    background-color: ${theme.colors.contrastText};
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
      opacity: 0.5;
    }
  }
`

const Home: React.FC = () => {
  const router = useRouter()
  // const [user, setUser] = React.useState<string>()

  function handleSubmit() {
    return router.push(`quiz/?user=`)
  }

  return (
    <Layout>
      <ButtonNewQuizContainer>
        <button onClick={() => router.push('/create-quiz')}>Novo quiz</button>
      </ButtonNewQuizContainer>
      <HomeContainer>
        <CardQuiz header="NextJs Quiz" background={UTILS.bg}>
          <p>{UTILS.title}</p>
          <span>{UTILS.description}</span>
          <ButtonStyled onClick={handleSubmit} type="button">
            Responda o quiz
          </ButtonStyled>
        </CardQuiz>
        <CardQuiz header="NextJs Quiz" background={UTILS.bg}>
          <p>{UTILS.title}</p>
          <span>{UTILS.description}</span>
          <ButtonStyled onClick={handleSubmit} type="button">
            Responda o quiz
          </ButtonStyled>
        </CardQuiz>
        <CardQuiz header="NextJs Quiz" background={UTILS.bg}>
          <p>{UTILS.title}</p>
          <span>{UTILS.description}</span>
          <ButtonStyled onClick={handleSubmit} type="button">
            Responda o quiz
          </ButtonStyled>
        </CardQuiz>
        <CardQuiz header="NextJs Quiz" background={UTILS.bg}>
          <p>{UTILS.title}</p>
          <span>{UTILS.description}</span>
          <ButtonStyled onClick={handleSubmit} type="button">
            Responda o quiz
          </ButtonStyled>
        </CardQuiz>
        <CardQuiz header="NextJs Quiz" background={UTILS.bg}>
          <p>{UTILS.title}</p>
          <span>{UTILS.description}</span>
          <ButtonStyled onClick={handleSubmit} type="button">
            Responda o quiz
          </ButtonStyled>
        </CardQuiz>
      </HomeContainer>
    </Layout>
  )
}

export default Home
