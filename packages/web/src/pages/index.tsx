import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'
import { UTILS } from '../constants/utils'
import ReactLoading from 'react-loading'
import theme from '../styles/theme'
import Link from 'next/link'
import { useAuth } from '../hooks/Auth'

const HomeContainer = styled.div`
  div.main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 480px) {
      justify-content: center;
    }

    div.loading {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      justify-self: center;
    }
  }

  div {
    h1 {
      margin-bottom: 60px;
      font-size: 24px;
    }
  }
`

const ApresentationContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 700px;
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 45px;
      font-weight: 600;
      margin-bottom: 30px;
    }

    span {
      color: #94a2b3;
    }
  }

  div {
    margin-top: 35px;

    a.get-start-link {
      background-color: ${theme.colors.secondary};
      padding: 15px 35px;
      border-radius: 20px;
      text-decoration: none;
      color: ${theme.colors.contrastText};
      margin-right: 20px;
      font-weight: bold;
    }

    a:nth-child(2) {
      text-decoration: none;
      color: #299ef3;
      margin-left: 20px;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

interface IPropsHome {
  quizes: any[] | null
}

const HomePage: React.FC<IPropsHome> = ({ quizes }) => {
  const { user } = useAuth()

  const router = useRouter()

  function handleSubmit(id: string) {
    return router.push(`quiz/?id=${id}`)
  }

  return (
    <Layout>
      <ApresentationContainer>
        <div>
          <div>
            <h1>Crie seu quiz personalizado e desafie a galera!</h1>
            <span>
              Com a plataforma Quiz Generator não existe limites para a criação
              dos seus quizes personalizados, seja desafiado ou desafie quem
              quiser.
            </span>
          </div>
          <div>
            <Link href="#home">
              <a className="get-start-link">Começar</a>
            </Link>
            ou
            {user ? (
              <Link href="/home">
                <a>Crie um novo quiz</a>
              </Link>
            ) : (
              <Link href="/sign-in">
                <a>Crie um novo quiz</a>
              </Link>
            )}
          </div>
        </div>
      </ApresentationContainer>
      <HomeContainer id="home">
        <div>
          <h1>Quizes mais recentes</h1>
        </div>
        <div className="main">
          {quizes ? (
            quizes.map(item => (
              <CardQuiz
                header={item.title}
                itemId={item.id}
                background={item.img_bg_url}
                width="350px"
              >
                <p>{item.title}</p>
                <span>{item.description}</span>

                <ButtonStyled
                  onClick={() => handleSubmit(item.id)}
                  type="button"
                >
                  Responda o quiz
                </ButtonStyled>
              </CardQuiz>
            ))
          ) : (
            <div className="loading">
              <ReactLoading
                color={theme.colors.secondary}
                type="spinningBubbles"
              />
            </div>
          )}
        </div>
      </HomeContainer>
    </Layout>
  )
}

export default HomePage

export async function getServerSideProps() {
  try {
    const res = await fetch(`${UTILS.api}/quiz`)

    const response = await res.json()

    return {
      props: {
        quizes: response,
      },
    }
  } catch (error) {
    return {
      props: {
        quizes: null,
      },
    }
  }
}
