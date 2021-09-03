import React from 'react'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { UTILS } from '../../../../constants/utils'
import styled from 'styled-components'
import theme from '../../../../styles/theme'

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
      return alert(JSON.stringify(error.message))
    }
  }

  return (
    <CardQuiz header="Crie o tema do quiz" width="450px">
      <form key={2} onSubmit={handleSubmitTheme(handleSubmitFormTheme)}>
        <InputStyled
          {...registerTheme('primary', { required: true })}
          placeholder="Cor primária"
          defaultValue={UTILS.theme.colors.primary}
        />
        <InputStyled
          {...registerTheme('secondary', { required: true })}
          placeholder="Cor secondaria"
          defaultValue={UTILS.theme.colors.secondary}
        />
        <InputStyled
          {...registerTheme('mainBg', { required: true })}
          placeholder="Cor de fundo"
          defaultValue={UTILS.theme.colors.mainBg}
        />
        <InputStyled
          {...registerTheme('contrastText', { required: true })}
          placeholder="Cor de contraste do texto"
          defaultValue={UTILS.theme.colors.contrastText}
        />
        <InputStyled
          {...registerTheme('success', { required: true })}
          placeholder="Cor de sucesso"
          defaultValue={UTILS.theme.colors.success}
        />
        <InputStyled
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
