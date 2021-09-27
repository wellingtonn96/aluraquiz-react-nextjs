import React from 'react'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import { getApiClient } from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import styled from 'styled-components'
import theme from '../../../../styles/theme'

const FormQuiz: React.FC = () => {
  const { setQuizContext } = useQuiz()

  const {
    handleSubmit: handleSubmitQuiz,
    register: registerQuiz,
    reset: resetQuiz,
  } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormQuiz = async dataQuiz => {
    try {
      const api = getApiClient()

      const response = await api.post('quiz', {
        title: dataQuiz.title_quiz,
        description: dataQuiz.description_quiz,
        img_bg_url: dataQuiz.img_bg_url,
      })

      const { id } = response.data

      setQuizContext({
        idQuiz: id,
        step: 2,
      })

      resetQuiz()
    } catch (error) {
      return console.log(error)
    }
  }

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

  const TextAreaStyled = styled.textarea`
    width: 100%;
    height: 80px;
    display: flex;
    border-radius: 5px;
    outline: 0;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
    margin: 10px 0;
  `

  return (
    <CardQuiz header="Adicione um novo quiz" width="450px">
      <form key={1} onSubmit={handleSubmitQuiz(handleSubmitFormQuiz)} action="">
        <InputStyled
          {...registerQuiz('title_quiz', { required: true })}
          placeholder="Titulo"
        />
        <InputStyled
          {...registerQuiz('img_bg_url', { required: true })}
          placeholder="URL da imagem de fundo"
        />
        <TextAreaStyled
          {...registerQuiz('description_quiz', { required: true })}
          placeholder="Descrição"
        ></TextAreaStyled>
        <ButtonStyled type="submit">Criar quiz</ButtonStyled>
      </form>
    </CardQuiz>
  )
}

export default FormQuiz
