import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FormTheme from '../../../components/FormUpdateQuiz/components/FormTheme'
import api from '../../../services/api'

const CreateQuizPage: React.FC<{
  data: any
}> = ({ data }) => {
  return (
    <>
      <FormTheme data={data} />
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
    const response = await api.get(`/themeQuiz/${query.id}`)

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
