import React from 'react'
import { getApiClient } from '../../../services/api'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import { CreateQuizContainer } from '../[id]'
import CardQuiz from '../../../components/CardQuiz'
import { ButtonStyled } from '../../../components/Button/styled'

const UpadateThemePage: React.FC<{
  data: any
}> = ({ data }) => {
  const {
    handleSubmit: handleSubmitTheme,
    register: registerTheme,
    reset: resetTheme,
  } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormTheme = async dataTheme => {
    try {
      const api = getApiClient()

      await api.put(`themeQuiz/${data.id}`, {
        primary: dataTheme.primary,
        mainBg: dataTheme.mainBg,
        wrong: dataTheme.wrong,
        success: dataTheme.success,
        contrastText: dataTheme.contrastText,
        secondary: dataTheme.secondary,
      })

      router.back()
      resetTheme()
    } catch (error) {
      return alert(JSON.stringify({ err: error.message, id: data.id }))
    }
  }

  return (
    <Layout padding={true}>
      <CreateQuizContainer>
        <CardQuiz header="Crie o tema do quiz" width="450px">
          <form key={2} onSubmit={handleSubmitTheme(handleSubmitFormTheme)}>
            <input
              {...registerTheme('primary', { required: true })}
              placeholder="Cor primária"
              defaultValue={data.primary}
            />
            <input
              {...registerTheme('secondary', { required: true })}
              placeholder="Cor secondaria"
              defaultValue={data.secondary}
            />
            <input
              {...registerTheme('mainBg', { required: true })}
              placeholder="Cor de fundo"
              defaultValue={data.mainBg}
            />
            <input
              {...registerTheme('contrastText', { required: true })}
              placeholder="Cor de contraste do texto"
              defaultValue={data.contrastText}
            />
            <input
              {...registerTheme('success', { required: true })}
              placeholder="Cor de sucesso"
              defaultValue={data.success}
            />
            <input
              {...registerTheme('wrong', { required: true })}
              placeholder="Cor de erro"
              defaultValue={data.wrong}
            />
            <ButtonStyled type="submit">Criar tema</ButtonStyled>
          </form>
        </CardQuiz>
      </CreateQuizContainer>
    </Layout>
  )
}

export default UpadateThemePage

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

  const response = await api.get(`/themeQuiz/${ctx.query.id}`)

  const data = response.data

  return {
    props: {
      id: ctx.query.id,
      data,
    },
  }
}
