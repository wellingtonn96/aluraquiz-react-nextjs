import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'
import styled from 'styled-components'
import theme from '../styles/theme'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import Link from 'next/link'
import InputStyled from '../components/InputStyled'
import { useAuth } from '../hooks/Auth'

const SignInContainer = styled.div`
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

const SignInPage: React.FC = () => {
  const { signIn } = useAuth()

  const { handleSubmit: handleSubmitQuiz, register: registerQuiz } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormQuiz = async dataQuiz => {
    try {
      await signIn(dataQuiz)
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <Layout padding={true}>
      <SignInContainer>
        <CardQuiz header="Sign In" width="450px">
          <FormContainer>
            <p>FAÇA SEU LOGIN</p>
            <form onSubmit={handleSubmitQuiz(handleSubmitFormQuiz)} action="">
              <InputStyled
                Icon={FaEnvelope}
                type="email"
                placeholder="E-mail"
                {...registerQuiz('email', { required: true })}
              />
              <InputStyled
                Icon={FaLock}
                {...registerQuiz('password', { required: true })}
                placeholder="Senha"
              />
              {/* <a href="">Esqueci minha senha</a> */}
              <ButtonStyled type="submit">Sign In</ButtonStyled>
            </form>

            <p className="create-account">
              Não tem uma conta?
              <Link href="/sign-up">
                <a>Criar conta</a>
              </Link>
            </p>
          </FormContainer>
        </CardQuiz>
      </SignInContainer>
    </Layout>
  )
}

export default SignInPage
