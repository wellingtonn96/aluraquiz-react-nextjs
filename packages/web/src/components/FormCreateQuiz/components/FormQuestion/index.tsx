import React, { useState } from 'react'
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import theme from '../../../../styles/theme'
import { useRouter } from 'next/router'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import styled from 'styled-components'
import { UTILS } from '../../../../constants/utils'

const InputStyled = styled.input`
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
`

export const ButtonMoreOption = styled.button`
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
`

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  div {
    display: flex;
    margin-left: 15px;
    justify-content: space-between;

    button {
      background-color: transparent;
      border: 0;

      &:first-child {
        margin-right: 20px;
      }

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

const FormQuestion: React.FC = () => {
  const router = useRouter()
  const { quizContext, setQuizContext } = useQuiz()
  const [option, setOption] = useState(['option_1', 'option_2'])
  const [indexRightAnswer, setIndexRightAnswer] = useState(undefined)
  const [rightAnswer, setRightAnswer] = useState(undefined)

  const {
    handleSubmit: handleSubmitQuestion,
    register: registerQuestion,
    reset: resetQuestion,
  } = useForm({
    mode: 'onBlur',
  })

  function addMoreOption() {
    const lastItemArray = option[option.length - 1].split('_')

    const item = parseInt(lastItemArray[1])

    console.log(option)

    setOption([...option, `option_${item + 1}`])
  }

  const handleSubmitFormQuestions = async dataQuestion => {
    try {
      !rightAnswer && new Error()

      await api.post('question', {
        image_url:
          'https://thumbs.gfycat.com/IncredibleGrouchyEarwig-size_restricted.gif',
        title: dataQuestion.title_question,
        description: dataQuestion.description_question,
        answer: dataQuestion[rightAnswer],
        alternatives: option.map(item => dataQuestion[item]),
        quizId: quizContext.idQuiz,
      })

      setIndexRightAnswer(undefined)
      setRightAnswer(undefined)
      setOption(['option 1', 'option 2'])
      resetQuestion()
      setQuizContext({
        ...quizContext,
        step: 3,
      })
    } catch (error) {
      if (error instanceof Error) {
        alert('Selecione uma alternativa!')
      } else {
        alert(error.message)
      }
    }
  }

  function handleRightAnswer(index: number) {
    setRightAnswer(`option_${index}`)
    setIndexRightAnswer(index)
  }

  function handleRemoveOption(item: string) {
    setOption(state =>
      state.length > 2
        ? state.filter(stateOption => stateOption !== item)
        : state
    )
  }

  function handleBackToHome() {
    setQuizContext({
      idQuiz: undefined,
      step: undefined,
    })
  }

  return (
    <CardQuiz header="Criar questões" width="450px">
      <form onSubmit={handleSubmitQuestion(handleSubmitFormQuestions)}>
        <InputStyled
          {...registerQuestion('title_question', { required: true })}
          placeholder="Titulo"
        />
        <InputStyled
          {...registerQuestion('description_question', {
            required: true,
          })}
          placeholder="Descrição"
        />
        <div>
          {option.map((item, index) => (
            <OptionsContainer>
              <InputStyled
                {...registerQuestion(`option_${index}` as any, {
                  required: true,
                })}
                placeholder={`Opção ${index + 1}`}
              />
              <div>
                <button type="button" onClick={() => handleRightAnswer(index)}>
                  <FaCheck
                    size={25}
                    style={
                      index === indexRightAnswer
                        ? { color: theme.colors.success }
                        : {
                            color: theme.colors.contrastText,
                            opacity: '0.5',
                          }
                    }
                  />
                </button>
                <button type="button" onClick={() => handleRemoveOption(item)}>
                  <FaTrash
                    size={18}
                    style={{
                      color: theme.colors.contrastText,
                      opacity: '0.5',
                    }}
                  />
                </button>
              </div>
            </OptionsContainer>
          ))}

          <ButtonMoreOption
            style={{ color: UTILS.theme.colors.contrastText }}
            onClick={addMoreOption}
            type="button"
          >
            <FaPlus size={20} />
            adicionar opção
          </ButtonMoreOption>
        </div>
        <ButtonStyled type="submit">Adicionar questão</ButtonStyled>
        <ButtonStyled onClick={handleBackToHome} type="button">
          Finalizar quiz
        </ButtonStyled>
      </form>
    </CardQuiz>
  )
}

export default FormQuestion
