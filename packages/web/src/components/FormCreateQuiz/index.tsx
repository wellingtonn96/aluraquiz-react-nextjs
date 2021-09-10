import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { useQuiz } from '../../hooks/Quiz'
import FormQuiz from './components/FormQuiz'
import FormTheme from './components/FormTheme'
import FormQuestion from './components/FormQuestion'
import router, { useRouter } from 'next/router'

const CreateQuizContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const CreateQuiz: React.FC = () => {
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

export default CreateQuiz
