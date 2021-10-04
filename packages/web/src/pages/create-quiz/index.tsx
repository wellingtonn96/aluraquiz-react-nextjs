import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import FormQuestion from '../../components/FormCreateQuiz/components/FormQuestion'
import FormQuiz from '../../components/FormCreateQuiz/components/FormQuiz'
import FormTheme from '../../components/FormCreateQuiz/components/FormTheme'
import Layout from '../../components/Layout'
import { useQuiz } from '../../hooks/Quiz'
import { getApiClient } from '../../services/api'
import { CreateQuizContainer } from '../update/[id]'

const CreateQuizPage: React.FC = () => {
  const router = useRouter()

  const {
    quizContext: { step },
    setQuizContext,
  } = useQuiz()

  function goBack() {
    router.push('/')
    setQuizContext({
      idQuiz: undefined,
      step: undefined,
    })
  }

  return (
    <Layout padding={true}>
      <CreateQuizContainer>
        {!step && <FormQuiz />}
        {step === 2 && <FormTheme />}
        {step === 3 && <FormQuestion handleGoBack={goBack} />}
      </CreateQuizContainer>
    </Layout>
  )
}

export default CreateQuizPage

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

  return {
    props: {},
  }
}
