import React, { useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import theme from '../../../../styles/theme'
import { useRouter } from 'next/router'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { UTILS } from '../../../../constants/utils'
import { MenuItemStyled } from '../../../CardQuiz/style'
import Layout from '../../../Layout'
import { CreateQuizContainer } from '../../../../pages/update/[id]'

const FormQuestion: React.FC<{
  data: any
}> = ({ data }) => {
  const router = useRouter()
  const { quizContext, setQuizContext } = useQuiz()
  const [option, setOption] = useState(data.alternatives)
  const [indexRightAnswer, setIndexRightAnswer] = useState(
    data.alternatives.findIndex(item => item === data.answer)
  )
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
        await api.put(`question/${data.id}`, {
          image_url:
            'https://thumbs.gfycat.com/IncredibleGrouchyEarwig-size_restricted.gif',
          title: dataQuestion.title_question,
          description: dataQuestion.description_question,
          answer: dataQuestion[rightAnswer],
          alternatives: Object.values(dataQuestion).slice(2),
          quizId: quizContext.idQuiz,
        })
      }

      router.back()
    } catch (error) {
      return alert(JSON.stringify({ err: error.message }))
    }
  }

  function handleRightAnswer(index: number) {
    setRightAnswer(`option_${index}`)
    setIndexRightAnswer(index)
  }

  return (
    <Layout>
      <CreateQuizContainer>
        <CardQuiz header="Atualizar questão!" width="450px">
          <form
            key={3}
            onSubmit={handleSubmitQuestion(handleSubmitFormQuestions)}
          >
            <input
              {...registerQuestion('title_question', { required: true })}
              placeholder="Titulo"
              defaultValue={data.title}
            />
            <input
              {...registerQuestion('description_question', {
                required: true,
              })}
              placeholder="Descrição"
              defaultValue={data.description}
            />
            <div>
              {option.map((item, index) => (
                <div className="options">
                  <input
                    {...registerQuestion(`option_${index}` as any, {
                      required: true,
                    })}
                    placeholder={`Opção ${index + 1}`}
                    defaultValue={!item.includes('option') ? item : ''}
                  />
                  <button
                    type="button"
                    onClick={() => handleRightAnswer(index)}
                  >
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
            <ButtonStyled type="submit">Atualizar questão</ButtonStyled>
            {/* <ButtonStyled onClick={() => setStep(0)} type="button">
          Voltar para a home
        </ButtonStyled> */}
          </form>
        </CardQuiz>
      </CreateQuizContainer>
    </Layout>
  )
}

export default FormQuestion
