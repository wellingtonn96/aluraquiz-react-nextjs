import React, { useState } from 'react'
import axios from 'axios'

import { UTILS } from '../constants/utils'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { Answer, CardQuizContent } from '../styles/quiz.styles'
import { ButtonStyled } from '../components/Button/styled'

const Quiz: React.FC<{
  user: string
  data: any
}> = ({ user, data }) => {
  const router = useRouter()
  const [selected, setSelected] = useState<number>(undefined)
  const [answer, setAnswer] = useState(undefined)
  const [question, setQuestion] = useState(0)
  const [rightAnswer, setRightAnser] = useState(0)

  const questions = data.questions[question]

  const indexRightAnswer = data.questions[question].alternatives.findIndex(
    item => item === data.questions[question].answer
  )

  function handleAnswerConfirm() {
    setAnswer(
      selected === indexRightAnswer
        ? UTILS.theme.colors.success
        : UTILS.theme.colors.wrong
    )
    selected === indexRightAnswer && setRightAnser(state => state + 1)

    question !== UTILS.questions.length &&
      setTimeout(() => {
        setQuestion(state => state + 1)
        setAnswer(undefined)
        setSelected(undefined)
      }, 1000)
  }

  return (
    <Layout>
      <CardQuiz
        background={UTILS.bg}
        header={
          question === UTILS.questions.length
            ? `Você acertou ${rightAnswer} de ${UTILS.questions.length}`
            : `< Pergunta ${question + 1} de ${UTILS.questions.length}`
        }
      >
        {question === UTILS.questions.length ? (
          <CardQuizContent>
            {rightAnswer > 3 ? (
              <p>{`Parabéns ${user} você acertou ${rightAnswer}`}</p>
            ) : (
              <p>{`Você acertou apenas ${rightAnswer}`}</p>
            )}
            <ButtonStyled onClick={() => router.push('/')}>
              Voltar para a home
            </ButtonStyled>
          </CardQuizContent>
        ) : (
          <>
            <CardQuizContent>
              <p>{questions.title}</p>
              <span>{questions.description}</span>
              {questions.alternatives.map((item, index) => (
                <Answer
                  selected={index === selected}
                  answer={answer && answer}
                  onClick={() => setSelected(answer ? selected : index)}
                >
                  {item}
                </Answer>
              ))}

              {answer && (
                <>
                  {selected === indexRightAnswer ? (
                    <p className="rightAnswer">{`😃 você acertou!`}</p>
                  ) : (
                    <p className="rightAnswer">{`😞 você errou!`}</p>
                  )}
                </>
              )}

              <ButtonStyled onClick={handleAnswerConfirm}>
                Confirmar
              </ButtonStyled>
            </CardQuizContent>
          </>
        )}
      </CardQuiz>
    </Layout>
  )
}

export default Quiz

export async function getServerSideProps({
  query,
}: {
  query: {
    user: string
  }
}) {
  try {
    const response = await axios.get(
      'http://localhost:3333/quiz/f87c0d5a-645b-441b-955c-bb3e1200bad0'
    )

    const data = response.data

    console.log(data)

    return {
      props: {
        user: query.user,
        data,
      },
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
