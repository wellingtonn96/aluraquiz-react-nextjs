import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'
import theme from '../styles/theme'
import { useRouter } from 'next/router'
import api from '../services/api'

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
  const router = useRouter()
  const [option, setOption] = useState(['option 1', 'option 2'])
  const [step, setStep] = useState(1)
  const [idQuiz, setIdQuiz] = useState(undefined)
  const [indexRightAnswer, setIndexRightAnswer] = useState(undefined)
  const [rightAnswer, setRightAnswer] = useState(undefined)

  const { handleSubmit, register, reset } = useForm()

  function addMoreOption() {
    const lastItemArray = option[option.length - 1].split(' ')

    const item = parseInt(lastItemArray[1])

    setOption([...option, `option ${item + 1}`])
  }

  function handleChangeStep(step: number) {
    reset()
    setStep(step)
  }

  const handleSubmitFormQuiz = async data => {
    try {
      const response = await api.post('quiz', {
        title: data.title_quiz,
        description: data.description_quiz,
        img_bg_url: data.img_bg_url,
      })

      const { id } = response.data

      setIdQuiz(id)
      handleChangeStep(2)
    } catch (error) {
      return console.log(error)
    }
  }

  const handleSubmitFormTheme = async data => {
    try {
      const response = await api.post('themeQuiz', {
        primary: data.primary,
        mainBg: data.mainBg,
        wrong: data.wrong,
        success: data.success,
        contrastText: data.contrastText,
        secondary: data.secondary,
      })

      const { id } = response.data

      await api.patch(`quiz/${idQuiz}`, {
        themeId: id,
      })

      handleChangeStep(3)
    } catch (error) {
      return console.log(error)
    }
  }

  const handleSubmitFormQuestions = async (data: any) => {
    try {
      if (rightAnswer) {
        await api.post('question', {
          image_url:
            'https://thumbs.gfycat.com/IncredibleGrouchyEarwig-size_restricted.gif',
          title: data.title_question,
          description: data.description_question,
          answer: data[rightAnswer],
          alternatives: Object.values(data).slice(2),
          quizId: idQuiz,
        })
      }

      setIndexRightAnswer(undefined)
      setOption(['option 1', 'option 2'])
      reset()
      handleChangeStep(3)
    } catch (error) {
      return console.log(error)
    }
  }

  function handleRightAnswer(index: number) {
    setRightAnswer(`option_${index + 1}`)
    setIndexRightAnswer(index)
  }

  return (
    <Layout>
      <CreateQuizContainer>
        {step === 1 && (
          <CardQuiz header="Adicione um novo quiz" width="450px">
            <form onSubmit={handleSubmit(handleSubmitFormQuiz)} action="">
              <input
                {...register('title_quiz', { required: true })}
                placeholder="Titulo"
              />
              <input
                {...register('img_bg_url', { required: true })}
                placeholder="URL da imagem de fundo"
              />
              <textarea
                {...register('description_quiz', { required: true })}
                placeholder="Descrição"
              ></textarea>
              <ButtonStyled type="submit">Criar quiz</ButtonStyled>
            </form>
          </CardQuiz>
        )}
        {step === 2 && (
          <CardQuiz header="Crie o tema do quiz" width="450px">
            <form onSubmit={handleSubmit(handleSubmitFormTheme)}>
              <input
                {...register('primary', { required: true })}
                placeholder="Cor primária"
              />
              <input
                {...register('secondary', { required: true })}
                placeholder="Cor secondaria"
              />
              <input
                {...register('mainBg', { required: true })}
                placeholder="Cor de fundo"
              />
              <input
                {...register('contrastText', { required: true })}
                placeholder="Cor de contraste do texto"
              />
              <input
                {...register('success', { required: true })}
                placeholder="Cor de sucesso"
              />
              <input
                {...register('wrong', { required: true })}
                placeholder="Cor de erro"
              />
              <ButtonStyled type="submit">Criar tema</ButtonStyled>
            </form>
          </CardQuiz>
        )}
        {step === 3 && (
          <CardQuiz header="Criar questões" width="450px">
            <form onSubmit={handleSubmit(handleSubmitFormQuestions)}>
              <input
                {...register('title_question', { required: true })}
                placeholder="Titulo"
              />
              <input
                {...register('description_question', { required: true })}
                placeholder="Descrição"
              />
              <div>
                {option.map((item, index) => (
                  <div className="options">
                    <input
                      {...register(`${item.replace(' ', '_')}`, {
                        required: true,
                      })}
                      placeholder={`Opção ${index + 1}`}
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
                            : { opacity: '0.5' }
                        }
                      />
                    </button>
                    {/* <button
                      type="button"
                      onClick={() => setIndexRightAnswer(index)}
                    >
                      <FaTrash size={18} />
                    </button> */}
                  </div>
                ))}

                <button
                  onClick={addMoreOption}
                  className="moreOptions"
                  type="button"
                >
                  <FaPlus size={20} />
                  adicionar opção
                </button>
              </div>
              <ButtonStyled type="submit">Adicionar questão</ButtonStyled>
              <ButtonStyled onClick={() => router.push('/')} type="button">
                Finalizar quiz
              </ButtonStyled>
            </form>
          </CardQuiz>
        )}
      </CreateQuizContainer>
    </Layout>
  )
}

export default CreateQuiz
