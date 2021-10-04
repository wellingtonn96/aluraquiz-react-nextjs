import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../../components/Layout'
import CardQuiz from '../../components/CardQuiz'
import { ButtonStyled } from '../../components/Button/styled'
import Link from 'next/link'
import InputStyled from '../../components/InputStyled'
import { getApiClient } from '../../services/api'
import { useAuth } from '../../hooks/Auth'
import { FormContainer, Container } from './styles'

const SignUpPage: React.FC = () => {
  const { signIn } = useAuth()

  const { handleSubmit: handleSubmitQuiz, register: registerQuiz } = useForm({
    mode: 'onBlur',
  })

  const handleSubmitFormQuiz = async dataQuiz => {
    try {
      const api = getApiClient()

      await api.post('users', dataQuiz)

      signIn({
        username: dataQuiz.username,
        password: dataQuiz.password,
      })
    } catch (error) {
      return alert(JSON.stringify(error.message))
    }
  }

  return (
    <Layout padding={true}>
      <Container>
        <CardQuiz header="Criar conta" width="450px">
          <FormContainer>
            <p>CRIE UMA CONTA</p>
            <form onSubmit={handleSubmitQuiz(handleSubmitFormQuiz)} action="">
              <InputStyled
                {...registerQuiz('name', { required: true })}
                placeholder="Nome"
              />
              <InputStyled
                {...registerQuiz('lastname', { required: true })}
                placeholder="Sobrenome"
              />

              <InputStyled
                {...registerQuiz('username', { required: true })}
                placeholder="Username"
              />

              <InputStyled
                type="email"
                {...registerQuiz('email', { required: true })}
                placeholder="E-mail"
              />

              <InputStyled
                type="password"
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
      </Container>
    </Layout>
  )
}

export default SignUpPage
