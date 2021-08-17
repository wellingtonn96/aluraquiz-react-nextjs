import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

interface IPropsCardQuiz {
  background?: string
  width?: string
}

export const Container = styled.div<IPropsCardQuiz>`
  background-color: ${theme.colors.primary};
  margin-bottom: 20px;

  color: ${theme.colors.contrastText};
  border-radius: 5px;

  @media (min-width: 760px) {
    width: ${props => (props.width ? props.width : '350px')};
  }

  ${props =>
    props.background &&
    css`
      > div.img-cover {
        background: url(${props.background});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 150px;
      }
    `}

  div.content {
    border: 1px solid ${theme.colors.mainBg};
    border-top: transparent;
    padding: 35px;

    p {
      font-weight: bold;
      margin-bottom: 20px;
    }

    span {
      opacity: 0.5;
    }
  }
`
export const HeaderCardQuiz = styled.div`
  background-color: ${theme.colors.mainBg};
  color: ${theme.colors.primary};
  padding: 18px 30px;
  font-weight: bold;
`
