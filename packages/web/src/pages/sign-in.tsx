import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'
import { FaLock, FaUser } from 'react-icons/fa'
import Link from 'next/link'
import InputStyled from '../components/InputStyled'
import { useAuth } from '../hooks/Auth'
import { FormContainer, Container } from '../styles/pages/sign-in.styled'

const SignInPage: React.FC = () => {
  const { signIn } = useAuth()

  const { handleSubmit: handleSubmitQuiz, register: registerQuiz } = useForm({
    mode: 'onBlur',
  })

  const handleSubmit = async dataQuiz => {
    try {
      await signIn(dataQuiz)
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <Layout padding={true}>
      <Container>
        <CardQuiz header="Sign In" width="450px">
          <FormContainer>
            <p>FAÇA SEU LOGIN</p>
            <form onSubmit={handleSubmitQuiz(handleSubmit)}>
              <InputStyled
                Icon={FaUser}
                type="text"
                placeholder="Nome de usuário"
                {...registerQuiz('username', { required: true })}
              />
              <InputStyled
                Icon={FaLock}
                type="password"
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
      </Container>
    </Layout>
  )
}

export default SignInPage
