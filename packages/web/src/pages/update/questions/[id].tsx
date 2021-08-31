import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { ButtonStyled } from '../../../components/Button/styled'
import CardQuiz from '../../../components/CardQuiz'
import Layout from '../../../components/Layout'
import api from '../../../services/api'
import { CreateQuizContainer } from '../[id]'

const CreateQuizPage: React.FC<{
  id: string
  data: any
}> = ({ data }) => {
  const [formQuestion, setFormQuestion] = useState(undefined)
  const router = useRouter()

  return (
    <Layout>
      <CreateQuizContainer>
        {
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1>{data.title}</h1>
              <span>{data.description}</span>
            </div>
            {data.questions.map((item, index) => (
              <>
                <CardQuiz header={`Questão ${index + 1}`}>
                  <p>{item.title}</p>
                  <span>{item.description}</span>
                  <ButtonStyled
                    onClick={() =>
                      router.push(`/update/questions/question/${item.id}`)
                    }
                  >
                    Atualizar Questão
                  </ButtonStyled>
                </CardQuiz>
              </>
            ))}
          </>
        }
      </CreateQuizContainer>
    </Layout>
  )
}

export async function getServerSideProps({
  query,
}: {
  query: {
    id: string
  }
}) {
  try {
    const response = await api.get(`/quiz/${query.id}`)

    const data = response.data

    return {
      props: {
        id: query.id,
        data,
      },
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export default CreateQuizPage
