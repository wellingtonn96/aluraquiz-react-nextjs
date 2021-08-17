import styled, { css } from 'styled-components'
import theme from '../styles/theme'

export const CardQuizContent = styled.div`
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
