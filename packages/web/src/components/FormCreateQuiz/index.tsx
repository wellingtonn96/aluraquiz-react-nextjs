import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import theme from '../../styles/theme'
import { UTILS } from '../../constants/utils'
import { useQuiz } from '../../hooks/Quiz'
import FormQuiz from './components/FormQuiz'
import FormTheme from './components/FormTheme'
import FormQuestion from './components/FormQuestion'

interface IPropsCreateQuiz {
  indexRightAnswer?: number
}

const CreateQuizContainer = styled.div<IPropsCreateQuiz>`
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

const CreateQuiz: React.FC = () => {
  const {
    quizContext: { step },
  } = useQuiz()

  return (
    <Layout background={UTILS.bg}>
      <CreateQuizContainer>
        {step === 1 && <FormQuiz />}
        {step === 2 && <FormTheme />}
        {step === 3 && <FormQuestion />}
      </CreateQuizContainer>
    </Layout>
  )
}

export default CreateQuiz
