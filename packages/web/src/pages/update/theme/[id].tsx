import React from 'react'
import FormTheme from '../../../components/FormUpdateQuiz/components/FormTheme'
import { getApiClient } from '../../../services/api'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

const UpadateThemePage: React.FC<{
  data: any
}> = ({ data }) => {
  return (
    <>
      <FormTheme data={data} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = getApiClient(ctx)

  const { ['quiz-auth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
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

export default UpadateThemePage
