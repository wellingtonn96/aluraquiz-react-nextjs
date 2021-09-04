import React, { useState } from 'react'
import styled from 'styled-components'
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import theme from '../../../../styles/theme'
import { useRouter } from 'next/router'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { UTILS } from '../../../../constants/utils'
import Layout from '../../../Layout'

interface IPropsCreateQuiz {
  indexRightAnswer?: number
}

export const CreateQuizContainer = styled.div<IPropsCreateQuiz>`
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

    > input {
      width: 68%;
      margin-right: 15px;
    }

    > div {
      display: flex;
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
  }
`

const FormQuestion: React.FC<{
  data: any
}> = ({ data }) => {
  const router = useRouter()
  const { quizContext } = useQuiz()
  const [alternatives, setAlternatives] = useState(data.alternatives)
  const [option, setOption] = useState<string[]>(() => {
    return data.alternatives.map((item, index) => `option_${index}`)
  })
  const [indexRightAnswer, setIndexRightAnswer] = useState(
    data.alternatives.findIndex(item => item === data.answer)
  )
  const [rightAnswer, setRightAnswer] = useState(undefined)

  const {
    handleSubmit: handleSubmitQuestion,
    register: registerQuestion,
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
      await api.put(`question/${data.id}`, {
        image_url:
          'https://thumbs.gfycat.com/IncredibleGrouchyEarwig-size_restricted.gif',
        title: dataQuestion.title_question,
        description: dataQuestion.description_question,
        answer: dataQuestion[rightAnswer],
        alternatives: option.map(item => dataQuestion[item]),
        quizId: quizContext.idQuiz,
      })

      router.back()
    } catch (error) {
      return alert(JSON.stringify({ err: error.message }))
    }
  }

  function handleRightAnswer(index: number) {
    setRightAnswer(`option_${index}`)
    setIndexRightAnswer(index)
  }

  function handleRemoveOption(item: string, index: number) {
    setOption(state =>
      state.length > 2
        ? state.filter(stateOption => stateOption !== item)
        : state
    )

    setAlternatives(state =>
      state.filter(
        stateAlternatives => stateAlternatives !== alternatives[index]
      )
    )
  }

  return (
    <Layout>
      <CreateQuizContainer>
        <CardQuiz header="Atualizar questão!" width="450px">
          <form onSubmit={handleSubmitQuestion(handleSubmitFormQuestions)}>
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
                    defaultValue={alternatives[index]}
                  />
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRightAnswer(index)}
                    >
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
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(item, index)}
                    >
                      <FaTrash
                        size={18}
                        style={{
                          color: theme.colors.contrastText,
                          opacity: '0.5',
                        }}
                      />
                    </button>
                  </div>
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
          </form>
        </CardQuiz>
      </CreateQuizContainer>
    </Layout>
  )
}

export default FormQuestion
