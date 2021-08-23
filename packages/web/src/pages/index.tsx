import React, { useEffect } from 'react'
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

interface IPropsHome {
  quizes: any[]
}

const Home: React.FC<IPropsHome> = ({ quizes }) => {
  const router = useRouter()
  // const [user, setUser] = React.useState<string>()

  function handleSubmit(id: string) {
    return router.push(`quiz/?id=${id}`)
  }

  return (
    <Layout background={UTILS.bg}>
      <ButtonNewQuizContainer>
        <button onClick={() => router.push('/create-quiz')}>Novo quiz</button>
      </ButtonNewQuizContainer>
      <HomeContainer>
        {quizes.map(item => (
          <CardQuiz header="NextJs Quiz" background={item.img_bg_url}>
            <p>{item.title}</p>
            <span>{item.description}</span>
            <ButtonStyled onClick={() => handleSubmit(item.id)} type="button">
              Responda o quiz
            </ButtonStyled>
          </CardQuiz>
        ))}
      </HomeContainer>
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3333/quiz')

  const response = await res.json()

  return {
    props: {
      quizes: response,
    },
  }
}
