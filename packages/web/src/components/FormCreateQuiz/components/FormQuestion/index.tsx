import React, { useState } from 'react'
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import theme from '../../../../styles/theme'
import { useRouter } from 'next/router'
import { getApiClient } from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { UTILS } from '../../../../constants/utils'
import CardQuiz from '../../../../components/CardQuiz'
import { ButtonStyled } from '../../../../components/Button/styled'
import { ButtonMoreOption, InputStyled, OptionsContainer } from './styles'

const FormQuestion: React.FC<{
  handleGoBack(): void
}> = ({ handleGoBack }) => {
  const router = useRouter()
  const { setQuizContext, quizContext } = useQuiz()
  const [option, setOption] = useState<string[]>(['option_0', 'option_1'])
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

    setOption([...option, `option_${item + 1}`])
  }
  const handleSubmitFormQuestions = async dataQuestion => {
    try {
      !rightAnswer && new Error()

      const api = getApiClient()

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
      setOption(['option_0', 'option_1'])
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
    handleGoBack()
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
