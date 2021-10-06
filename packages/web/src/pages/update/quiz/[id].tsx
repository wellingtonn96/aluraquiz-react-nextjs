import { GetServerSideProps } from 'next'
import router from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ButtonStyled } from '../../../components/Button/styled'
import CardQuiz from '../../../components/CardQuiz'
import Layout from '../../../components/Layout'
import { getApiClient } from '../../../services/api'
import { CreateQuizContainer } from '../[id]'
import {
  InputStyled,
  TextAreaStyled,
} from '../../../styles/pages/update/quiz/quiz.styled'

const UpdateQuizPage: React.FC<{
  id: string
  data: any
}> = ({ data }) => {
  const { handleSubmit: handleSubmitQuiz, register: registerQuiz } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormQuiz = async dataQuiz => {
    try {
      const api = getApiClient()

      await api.put(`quiz/${data.id}`, {
        title: dataQuiz.title_quiz,
        description: dataQuiz.description_quiz,
        img_bg_url: dataQuiz.img_bg_url,
      })

      router.back()
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <Layout padding={true}>
      <CreateQuizContainer>
        <CardQuiz header="Adicione um novo quiz" width="450px">
          <form
            key={1}
            onSubmit={handleSubmitQuiz(handleSubmitFormQuiz)}
            action=""
          >
            <InputStyled
              {...registerQuiz('title_quiz', { required: true })}
              placeholder="Titulo"
              defaultValue={data.title}
            />
            <InputStyled
              {...registerQuiz('img_bg_url', { required: true })}
              placeholder="URL da imagem de fundo"
              defaultValue={data.img_bg_url}
            />
            <TextAreaStyled
              {...registerQuiz('description_quiz', { required: true })}
              placeholder="Descrição"
              defaultValue={data.description}
            />
            <ButtonStyled type="submit">Atualizar quiz</ButtonStyled>
          </form>
        </CardQuiz>
      </CreateQuizContainer>
    </Layout>
  )
}

export default UpdateQuizPage

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
      id: ctx.query.id,
      data,
    },
  }
}
