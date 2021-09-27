import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FormQuiz from '../../../components/FormUpdateQuiz/components/FormQuiz'

import { getApiClient } from '../../../services/api'

const UpdateQuizPage: React.FC<{
  id: string
  data: any
}> = ({ data }) => {
  return (
    <>
      <FormQuiz data={data} />
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
    const api = getApiClient()

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

export default UpdateQuizPage
