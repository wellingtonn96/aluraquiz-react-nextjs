import React from 'react'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import { ButtonStyled } from '../../../Button/styled'
import api from '../../../../services/api'
import { useQuiz } from '../../../../hooks/Quiz'
import { UTILS } from '../../../../constants/utils'

const FormTheme: React.FC<{
  data: any
  setStep: React.Dispatch<React.SetStateAction<number>>
}> = ({ data, setStep }) => {
  const {
    handleSubmit: handleSubmitTheme,
    register: registerTheme,
    reset: resetTheme,
  } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormTheme = async dataTheme => {
    try {
      await api.put(`themeQuiz/${data.theme.id}`, {
        primary: dataTheme.primary,
        mainBg: dataTheme.mainBg,
        wrong: dataTheme.wrong,
        success: dataTheme.success,
        contrastText: dataTheme.contrastText,
        secondary: dataTheme.secondary,
      })

      setStep(0)
      resetTheme()
    } catch (error) {
      return alert(JSON.stringify({ err: error.message, id: data.theme.id }))
    }
  }

  return (
    <CardQuiz header="Crie o tema do quiz" width="450px">
      <form key={2} onSubmit={handleSubmitTheme(handleSubmitFormTheme)}>
        <input
          {...registerTheme('primary', { required: true })}
          placeholder="Cor primária"
          defaultValue={data.theme.primary}
        />
        <input
          {...registerTheme('secondary', { required: true })}
          placeholder="Cor secondaria"
          defaultValue={data.theme.secondary}
        />
        <input
          {...registerTheme('mainBg', { required: true })}
          placeholder="Cor de fundo"
          defaultValue={data.theme.mainBg}
        />
        <input
          {...registerTheme('contrastText', { required: true })}
          placeholder="Cor de contraste do texto"
          defaultValue={data.theme.contrastText}
        />
        <input
          {...registerTheme('success', { required: true })}
          placeholder="Cor de sucesso"
          defaultValue={data.theme.success}
        />
        <input
          {...registerTheme('wrong', { required: true })}
          placeholder="Cor de erro"
          defaultValue={data.theme.wrong}
        />
        <ButtonStyled type="submit">Criar tema</ButtonStyled>
      </form>
    </CardQuiz>
  )
}

export default FormTheme
