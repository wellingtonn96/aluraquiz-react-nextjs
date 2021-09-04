import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { ButtonStyled } from '../components/Button/styled'
import api from '../services/api'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { UTILS } from '../constants/utils'
import ReactLoading from 'react-loading'
import theme from '../styles/theme'

const HomeContainer = styled.div`
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
`

const ButtonNewQuizContainer = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: row-reverse;
`

interface IPropsHome {
  quizes: any[] | null
}

const HomePage: React.FC<IPropsHome> = ({ quizes }) => {
  const router = useRouter()

  function handleSubmit(id: string) {
    return router.push(`quiz/?id=${id}`)
  }

  const toggleMenuItems = [
    {
      icon: <FiTrash size={20} />,
      text: 'Deletar',
      onclick: async (id: string) => {
        try {
          await api.delete(`quiz/${id}`)

          router.push(`/`)
        } catch (error) {
          alert(JSON.stringify({ err: error.message }))
        }
      },
    },
    {
      icon: <FiEdit size={20} />,
      text: 'Editar',
      onclick: async (id: string) => {
        try {
          router.push(`/update/${id}`)
        } catch (error) {
          alert(JSON.stringify({ err: error.message }))
        }
      },
    },
  ]

  return (
    <Layout>
      <ButtonNewQuizContainer>
        <ButtonStyled onClick={() => router.push('/create-quiz')} width="160px">
          Novo quiz
        </ButtonStyled>
      </ButtonNewQuizContainer>
      <HomeContainer>
        {quizes ? (
          quizes.map(item => (
            <CardQuiz
              header={item.title}
              itemId={item.id}
              toggleItems={toggleMenuItems}
              background={item.img_bg_url}
              width="350px"
            >
              <p>{item.title}</p>
              <span>{item.description}</span>

              <ButtonStyled onClick={() => handleSubmit(item.id)} type="button">
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
