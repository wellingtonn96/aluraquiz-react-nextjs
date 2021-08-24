import React from 'react'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'

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

  return (
    <CardQuiz header="Adicione um novo quiz" width="450px">
      <form key={1} onSubmit={handleSubmitQuiz(handleSubmitFormQuiz)} action="">
        <input
          {...registerQuiz('title_quiz', { required: true })}
          placeholder="Titulo"
        />
        <input
          {...registerQuiz('img_bg_url', { required: true })}
          placeholder="URL da imagem de fundo"
        />
        <textarea
          {...registerQuiz('description_quiz', { required: true })}
          placeholder="Descrição"
        ></textarea>
        <ButtonStyled type="submit">Criar quiz</ButtonStyled>
      </form>
    </CardQuiz>
  )
}

export default FormQuiz
