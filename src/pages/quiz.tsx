import React, { useState } from 'react'

import { UTILS } from '../constants/utils'

import styled, { css } from 'styled-components'
import theme from '../styles/theme'

interface IBackgroundProps {
  background: string
}

const Background = styled.div<IBackgroundProps>`
  font-size: 16px;
  background: url(${({ background }) => background});
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: fixed;
  width: 100%;
  margin: 0 auto;

  > div {
    max-width: 980px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 80px 20px;
  }
`

const CardQuiz = styled.div`
  background-color: ${theme.colors.primary};
  width: 350px;
  margin-bottom: 20px;
  border: 1px solid ${theme.colors.mainBg};
  color: ${theme.colors.contrastText};
  border-radius: 5px;
`
const HeaderCardQuiz = styled.div`
  background-color: ${theme.colors.mainBg};
  padding: 15px;
`
const CardQuizContent = styled.div`
  padding: 35px;

  input {
    width: 100%;
    height: 40px;
    background: transparent;
    border: 1px solid ${theme.colors.mainBg};
    color: ${theme.colors.contrastText};
    padding: 0 10px;
    font-size: 18px;
  }

  p {
    font-weight: bold;
    margin-bottom: 20px;
  }

  span {
    opacity: 0.5;
  }

  button {
    background-color: ${theme.colors.contrastText};
    border-radius: 5px;
    width: 100%;
    height: 40px;
    text-transform: uppercase;
    margin-top: 35px;
    border: 0;
    outline: 0;
    font-weight: bold;

    &:hover {
      opacity: 0.7;
    }
  }
`

interface IAnswer {
  selected?: boolean
  answer: string | undefined
}

const Answer = styled.div<IAnswer>`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 10px 20px;
  ${({ answer, selected }) =>
    answer && selected
      ? css`
          background-color: ${answer};
        `
      : css`
          background-color: ${theme.colors.secondary};
        `}
  color: ${theme.colors.primary};
  width: 100%;
  margin-top: 15px;
  border: 0;
  outline: 0;
  font-weight: bold;
  ${({ selected }) =>
    selected
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.4;
        `}

  &:hover {
    opacity: 1;
  }
`

const Home: React.FC = () => {
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
    <Background background={UTILS.bg}>
      <div>
        <CardQuiz>
          <HeaderCardQuiz>
            {question === UTILS.questions.length ? (
              <p>{`Você acertou ${rightAnswer} de ${UTILS.questions.length}`}</p>
            ) : (
              <p>{` < Pergunta ${question + 1} de ${
                UTILS.questions.length
              }`}</p>
            )}
          </HeaderCardQuiz>

          {question === UTILS.questions.length ? (
            <CardQuizContent>
              {rightAnswer > 3 ? (
                <p>{`Parabéns você acertou ${rightAnswer}`}</p>
              ) : (
                <p>{`Você acertou apenas ${rightAnswer}`}</p>
              )}
            </CardQuizContent>
          ) : (
            <>
              <CardQuizContent>
                <p>{questions.title}</p>
                <span>{questions.description}</span>
                {questions.alternatives
                  .sort((item, index) => item[index] - item[index])
                  .map((item, index) => (
                    <Answer
                      selected={index === selected}
                      answer={answer && answer}
                      onClick={() => setSelected(answer ? selected : index)}
                    >
                      {item}
                    </Answer>
                  ))}
                <button onClick={handleAnswerConfirm}>Confirmar</button>
              </CardQuizContent>
            </>
          )}
        </CardQuiz>
      </div>
    </Background>
  )
}

export default Home
