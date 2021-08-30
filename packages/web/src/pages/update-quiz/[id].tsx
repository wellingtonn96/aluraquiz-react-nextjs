import { useRouter } from 'next/router'
import React, { useState } from 'react'
import UpdateQuiz from '../../components/FormUpdateQuiz'
import api from '../../services/api'

const CreateQuizPage: React.FC<{
  id: string
  data: any
}> = ({ id, data }) => {
  return (
    <>
      <UpdateQuiz id={id as string} data={data} />
    </>
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
