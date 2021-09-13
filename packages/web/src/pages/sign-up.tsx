import React from 'react'
import { useForm } from 'react-hook-form'

import router from 'next/router'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'
import styled from 'styled-components'
import theme from '../styles/theme'
import Link from 'next/link'
import InputStyled from '../components/InputStyled'

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const FormContainer = styled.div`
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  a {
    margin-left: 5px;
    color: ${theme.colors.secondary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  > p {
    margin: 15px 0;
    font-weight: bold;
  }

  p.create-account {
    margin-top: 30px;
    font-weight: normal;
    text-align: center;
  }
`

const SignUpPage: React.FC = () => {
  const { handleSubmit: handleSubmitQuiz, register: registerQuiz } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormQuiz = async dataQuiz => {
    try {
      console.log(dataQuiz)

      router.back()
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <Layout padding={true}>
      <SignUpContainer>
        <CardQuiz header="Criar conta" width="450px">
          <FormContainer>
            <p>CRIE UMA CONTA</p>
            <form onSubmit={handleSubmitQuiz(handleSubmitFormQuiz)} action="">
              <InputStyled
                {...registerQuiz('name', { required: true })}
                placeholder="Nome"
              />

              <InputStyled
                {...registerQuiz('username', { required: true })}
                placeholder="Username"
              />

              <InputStyled
                {...registerQuiz('email', { required: true })}
                placeholder="E-mail"
              />

              <InputStyled
                {...registerQuiz('password', { required: true })}
                placeholder="Senha"
              />

              {/* <a href="">Esqueci minha senha</a> */}
              <ButtonStyled type="submit">criar conta</ButtonStyled>
            </form>

            <p className="create-account">
              Ja tem uma conta?
              <Link href="/sign-in">
                <a>Sign In</a>
              </Link>
            </p>
          </FormContainer>
        </CardQuiz>
      </SignUpContainer>
    </Layout>
  )
}

export default SignUpPage
