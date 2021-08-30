import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'

const HomeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  /* background-color: red; */

  @media (max-width: 480px) {
    justify-content: center;
  }
`

const ButtonNewQuizContainer = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: row-reverse;
`

interface IPropsHome {
  quizes: any[]
}

const HomePage: React.FC<IPropsHome> = ({ quizes }) => {
  const router = useRouter()

  function handleSubmit(id: string) {
    return router.push(`quiz/?id=${id}`)
  }

  return (
    <Layout>
      <ButtonNewQuizContainer>
        <ButtonStyled onClick={() => router.push('/create-quiz')} width="160px">
          Novo quiz
        </ButtonStyled>
      </ButtonNewQuizContainer>
      <HomeContainer>
        {quizes.map(item => (
          <CardQuiz
            header={item.title}
            idQuiz={item.id}
            toggle={true}
            background={item.img_bg_url}
            width="350px"
          >
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

export default HomePage

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3333/quiz')

  const response = await res.json()

  return {
    props: {
      quizes: response,
    },
  }
}
