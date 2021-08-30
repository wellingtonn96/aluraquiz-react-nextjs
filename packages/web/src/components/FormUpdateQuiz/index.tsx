import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import theme from '../../styles/theme'
import FormQuiz from './components/FormQuiz'
import FormTheme from './components/FormTheme'
import FormQuestion from './components/FormQuestion'
import CardQuiz from '../CardQuiz'
import { ButtonStyled } from '../Button/styled'
import { useState } from 'react'

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

const CreateQuiz: React.FC<{
  id: string
  data: any
}> = ({ data }) => {
  const [step, setStep] = useState(0)
  const [formQuestion, setFormQuestion] = useState(undefined)

  return (
    <Layout>
      <CreateQuizContainer>
        {step === 0 && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1>{data.title}</h1>
              <span>{data.description}</span>
            </div>
            <CardQuiz header="Atualizar o quiz!">
              <ButtonStyled onClick={() => setStep(1)}>
                Atualizar Quiz
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Atualizar o tema">
              <ButtonStyled onClick={() => setStep(2)}>
                Atualizar Tema
              </ButtonStyled>
            </CardQuiz>
            <CardQuiz header="Atualizar o questões">
              <ButtonStyled onClick={() => setStep(3)}>
                Atualiazar questões
              </ButtonStyled>
            </CardQuiz>
          </>
        )}

        {step === 1 && <FormQuiz data={data} setStep={setStep} />}
        {step === 2 && <FormTheme data={data} setStep={setStep} />}
        {step === 3 && (
          <>
            {!formQuestion ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h1>{data.title}</h1>
                  <span>{data.description}</span>
                </div>
                {data.questions.map((item, index) => (
                  <>
                    <CardQuiz header={`Questão ${index + 1}`}>
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                      <ButtonStyled onClick={() => setFormQuestion(item)}>
                        Atualizar Questão
                      </ButtonStyled>
                    </CardQuiz>
                  </>
                ))}
              </>
            ) : (
              <FormQuestion data={formQuestion} setStep={setStep} />
            )}
          </>
        )}
      </CreateQuizContainer>
    </Layout>
  )
}

export default CreateQuiz
