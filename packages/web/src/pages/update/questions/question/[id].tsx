import React from 'react'
import FormQuestion from '../../../../components/FormUpdateQuiz/components/FormQuestion'

import api from '../../../../services/api'

const CreateQuizPage: React.FC<{
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
    const response = await api.get(`/question/${query.id}`)

    const data = response.data

    console.log('passei por aqui', data)

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

export default CreateQuizPage
