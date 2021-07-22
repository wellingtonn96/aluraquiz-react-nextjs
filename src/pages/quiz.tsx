import React, { useState } from 'react'

import { UTILS } from '../constants/utils'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CardQuiz from '../components/CardQuiz'
import { Answer, CardQuizContent } from '../styles/quiz.styles'

const Quiz: React.FC<{
  user: string
}> = ({ user }) => {
  const router = useRouter()
  const [selected, setSelected] = useState<number>(undefined)
  const [answer, setAnswer] = useState(undefined)
  const [question, setQuestion] = useState(0)
  const [rightAnswer, setRightAnser] = useState(0)
  const questions = UTILS.questions[question]

  function handleAnswerConfirm() {
    setAnswer(
      selected === questions.answer
        ? UTILS.theme.colors.success
        : UTILS.theme.colors.wrong
    )
    selected === questions.answer && setRightAnser(state => state + 1)

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
            <button onClick={() => router.push('/')}>Voltar para a home</button>
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
                  {selected === questions.answer ? (
                    <p className="rightAnswer">{`😃 você acertou!`}</p>
                  ) : (
                    <p className="rightAnswer">{`😞 você errou!`}</p>
                  )}
                </>
              )}

              <button onClick={handleAnswerConfirm}>Confirmar</button>
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
  return {
    props: {
      user: query.user,
    },
  }
}
