import styled, { css } from 'styled-components'
import theme from '../styles/theme'

export const CardQuizContent = styled.div`
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
    margin-top: 20px;
    border: 0;
    outline: 0;
    font-weight: bold;

    &:hover {
      opacity: 0.7;
    }
  }

  p.rightAnswer {
    margin-top: 20px;
    margin-bottom: 0;
  }
`

interface IAnswer {
  selected?: boolean
  answer: string | undefined
}

export const Answer = styled.div<IAnswer>`
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
          opacity: 0.6;
        `}

  &:hover {
    opacity: 1;
  }
`
