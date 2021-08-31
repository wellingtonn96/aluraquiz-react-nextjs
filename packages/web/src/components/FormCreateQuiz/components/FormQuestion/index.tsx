import React, { useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import theme from '../../../../styles/theme'
import { useRouter } from 'next/router'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { Background } from '../../../Layout/style'
import { UTILS } from '../../../../constants/utils'

const FormQuestion: React.FC = () => {
  const router = useRouter()
  const { quizContext, setQuizContext } = useQuiz()
  const [option, setOption] = useState(['option 1', 'option 2'])
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
    const lastItemArray = option[option.length - 1].split(' ')

    const item = parseInt(lastItemArray[1])

    setOption([...option, `option ${item + 1}`])
  }

  const handleSubmitFormQuestions = async dataQuestion => {
    try {
      if (rightAnswer) {
        await api.post('question', {
          image_url:
            'https://thumbs.gfycat.com/IncredibleGrouchyEarwig-size_restricted.gif',
          title: dataQuestion.title_question,
          description: dataQuestion.description_question,
          answer: dataQuestion[rightAnswer],
          alternatives: Object.values(dataQuestion).slice(2),
          quizId: quizContext.idQuiz,
        })
      }

      setIndexRightAnswer(undefined)
      setRightAnswer(undefined)
      setOption(['option 1', 'option 2'])
      resetQuestion()
      setQuizContext({
        ...quizContext,
        step: 3,
      })
    } catch (error) {
      return console.log(error)
    }
  }

  function handleRightAnswer(index: number) {
    setRightAnswer(`option_${index}`)
    setIndexRightAnswer(index)
  }

  function handleBackToHome() {
    setQuizContext({
      idQuiz: undefined,
      step: undefined,
    })
  }

  return (
    <CardQuiz header="Criar questões" width="450px">
      <form key={3} onSubmit={handleSubmitQuestion(handleSubmitFormQuestions)}>
        <input
          {...registerQuestion('title_question', { required: true })}
          placeholder="Titulo"
        />
        <input
          {...registerQuestion('description_question', {
            required: true,
          })}
          placeholder="Descrição"
        />
        <div>
          {option.map((item, index) => (
            <div className="options">
              <input
                {...registerQuestion(`option_${index}` as any, {
                  required: true,
                })}
                placeholder={`Opção ${index + 1}`}
              />
              <button type="button" onClick={() => handleRightAnswer(index)}>
                <FaCheck
                  size={25}
                  style={
                    index === indexRightAnswer
                      ? { color: theme.colors.success }
                      : { color: theme.colors.contrastText, opacity: '0.5' }
                  }
                />
              </button>
            </div>
          ))}

          <button
            style={{ color: UTILS.theme.colors.contrastText }}
            onClick={addMoreOption}
            className="moreOptions"
            type="button"
          >
            <FaPlus size={20} />
            adicionar opção
          </button>
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
