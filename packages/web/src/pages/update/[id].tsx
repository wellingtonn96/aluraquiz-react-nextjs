import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import theme from '../../styles/theme'

import { useRouter } from 'next/router'
import CardQuiz from '../../components/CardQuiz'
import { ButtonStyled } from '../../components/Button/styled'
import { getApiClient } from '../../services/api'
import { useQuiz } from '../../hooks/Quiz'
import FormQuestion from '../../components/FormCreateQuiz/components/FormQuestion'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

interface IPropsCreateQuiz {
  indexRightAnswer?: number
}

export const CreateQuizContainer = styled.div<IPropsCreateQuiz>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
    margin: 10px 0;
  }

  textarea {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    outline: 0;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
    margin: 10px 0;
  }

  button.moreOptions {
    background: transparent;
    display: flex;
    align-items: center;
    height: 40px;
    margin-top: 10px;
    text-transform: uppercase;
    color: ${theme.colors.secondary};
    border: 0;
    font-size: 16px;
    font-weight: bold;

    svg {
      margin-right: 10px;
    }
  }

  div.options {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 75%;
    }

    button {
      width: 50px;
      height: 40px;
      margin-left: 10px;
      background-color: transparent;
      border: 0;
      border-radius: 5px;

      svg {
        color: ${theme.colors.secondary};
        font-weight: bold;
      }

      &:hover {
        svg {
          color: ${theme.colors.success};
        }
      }
    }
  }
`

const UpdateQuiz: React.FC<{
  data: any
}> = ({ data }) => {
  const router = useRouter()
  const { setQuizContext, quizContext } = useQuiz()

  return (
    <Layout padding={true}>
      <CreateQuizContainer>
        {!quizContext.idQuiz ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1>{data.title}</h1>
              <span>{data.description}</span>
            </div>
            <CardQuiz header="Atualizar o quiz!">
              <ButtonStyled
                onClick={() => router.push(`/update/quiz/${router.query.id}`)}
              >
                Atualizar Quiz
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Atualizar o tema">
              <ButtonStyled
                onClick={() => router.push(`/update/theme/${data.theme.id}`)}
              >
                Atualizar Tema
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Atualizar o questões">
              <ButtonStyled
                onClick={() => router.push(`/update/questions/${data.id}`)}
              >
                Atualiazar questões
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Adicionar mais questões">
              <ButtonStyled
                onClick={() =>
                  setQuizContext({
                    idQuiz: data.id,
                    step: undefined,
                  })
                }
              >
                Adicionar mais questões
              </ButtonStyled>
            </CardQuiz>
          </>
        ) : (
          <FormQuestion
            handleGoBack={() =>
              setQuizContext({
                idQuiz: undefined,
                step: undefined,
              })
            }
          />
        )}
      </CreateQuizContainer>
    </Layout>
  )
}

export default UpdateQuiz

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = getApiClient(ctx)

  const { ['quiz-auth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const response = await api.get(`/quiz/${ctx.query.id}`)

  const data = response.data

  return {
    props: {
      data,
    },
  }
}
