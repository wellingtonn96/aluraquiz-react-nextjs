import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import theme from '../../styles/theme'
import { UTILS } from '../../constants/utils'
import { useQuiz } from '../../hooks/Quiz'
import FormQuiz from './components/FormQuiz'
import FormTheme from './components/FormTheme'
import FormQuestion from './components/FormQuestion'

const CreateQuizContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const CreateQuiz: React.FC = () => {
  const {
    quizContext: { step },
  } = useQuiz()

  return (
    <Layout>
      <CreateQuizContainer>
        {!step && <FormQuiz />}
        {step === 2 && <FormTheme />}
        {step === 3 && <FormQuestion />}
      </CreateQuizContainer>
    </Layout>
  )
}

export default CreateQuiz
