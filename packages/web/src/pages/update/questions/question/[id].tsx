import React from 'react'
import FormQuestion from '../../../../components/FormUpdateQuiz/components/FormQuestion'

import { getApiClient } from '../../../../services/api'

const QuestionQuizPage: React.FC<{
  data: any
}> = ({ data }) => {
  return (
    <>
      <FormQuestion data={data} />
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

    const response = await api.get(`/question/${query.id}`)

    const data = response.data

    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export default QuestionQuizPage
