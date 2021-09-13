import React from 'react'
import { useForm } from 'react-hook-form'
import CardQuiz from '../../../CardQuiz'
import styled from 'styled-components'
import { ButtonStyled } from '../../../Button/styled'
import api from '../../../../services/api'
import router from 'next/router'
import Layout from '../../../Layout'
import { CreateQuizContainer } from '../../../../pages/update/[id]'
import InputStyled from '../../../InputStyled'
import theme from '../../../../styles/theme'

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

const FormQuiz: React.FC<{
  data: any
}> = ({ data }) => {
  const {
    handleSubmit: handleSubmitQuiz,
    register: registerQuiz,
    reset: resetQuiz,
  } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormQuiz = async dataQuiz => {
    try {
      await api.put(`quiz/${data.id}`, {
        title: dataQuiz.title_quiz,
        description: dataQuiz.description_quiz,
        img_bg_url: dataQuiz.img_bg_url,
      })

      router.back()
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <Layout padding={true}>
      <CreateQuizContainer>
        <CardQuiz header="Adicione um novo quiz" width="450px">
          <form
            key={1}
            onSubmit={handleSubmitQuiz(handleSubmitFormQuiz)}
            action=""
          >
            <InputStyled
              {...registerQuiz('title_quiz', { required: true })}
              placeholder="Titulo"
              defaultValue={data.title}
            />
            <InputStyled
              {...registerQuiz('img_bg_url', { required: true })}
              placeholder="URL da imagem de fundo"
              defaultValue={data.img_bg_url}
            />
            <TextAreaStyled
              {...registerQuiz('description_quiz', { required: true })}
              placeholder="Descrição"
              defaultValue={data.description}
            />
            <ButtonStyled type="submit">Atualizar quiz</ButtonStyled>
          </form>
        </CardQuiz>
      </CreateQuizContainer>
    </Layout>
  )
}

export default FormQuiz
