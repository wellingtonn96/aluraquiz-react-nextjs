import React from 'react'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { UTILS } from '../../../../constants/utils'

const FormTheme: React.FC = () => {
  const { quizContext, setQuizContext } = useQuiz()

  const {
    handleSubmit: handleSubmitTheme,
    register: registerTheme,
    reset: resetTheme,
  } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormTheme = async dataTheme => {
    try {
      const response = await api.post('themeQuiz', {
        primary: dataTheme.primary,
        mainBg: dataTheme.mainBg,
        wrong: dataTheme.wrong,
        success: dataTheme.success,
        contrastText: dataTheme.contrastText,
        secondary: dataTheme.secondary,
      })

      const { id } = response.data

      await api.patch(`quiz/${quizContext.idQuiz}`, {
        themeId: id,
      })

      setQuizContext({
        ...quizContext,
        step: 3,
      })
      resetTheme()
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <CardQuiz header="Crie o tema do quiz" width="450px">
      <form key={2} onSubmit={handleSubmitTheme(handleSubmitFormTheme)}>
        <input
          {...registerTheme('primary', { required: true })}
          placeholder="Cor primária"
          defaultValue={UTILS.theme.colors.primary}
        />
        <input
          {...registerTheme('secondary', { required: true })}
          placeholder="Cor secondaria"
          defaultValue={UTILS.theme.colors.secondary}
        />
        <input
          {...registerTheme('mainBg', { required: true })}
          placeholder="Cor de fundo"
          defaultValue={UTILS.theme.colors.mainBg}
        />
        <input
          {...registerTheme('contrastText', { required: true })}
          placeholder="Cor de contraste do texto"
          defaultValue={UTILS.theme.colors.contrastText}
        />
        <input
          {...registerTheme('success', { required: true })}
          placeholder="Cor de sucesso"
          defaultValue={UTILS.theme.colors.success}
        />
        <input
          {...registerTheme('wrong', { required: true })}
          placeholder="Cor de erro"
          defaultValue={UTILS.theme.colors.wrong}
        />
        <ButtonStyled type="submit">Criar tema</ButtonStyled>
      </form>
    </CardQuiz>
  )
}

export default FormTheme
