import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

interface IPropsCardQuiz {
  background?: string
  width?: string
  themeCustom?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}

export const Container = styled.div<IPropsCardQuiz>`
  background-color: ${props =>
    props.themeCustom ? props.themeCustom.primary : theme.colors.primary};
  margin-bottom: 20px;

  color: ${props =>
    props.themeCustom
      ? props.themeCustom.contrastText
      : theme.colors.contrastText};
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
    border: 1px solid
      ${props =>
        props.themeCustom ? props.themeCustom.mainBg : theme.colors.mainBg};
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

interface IPropsHeaderQuiz {
  themeCustom?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}

export const HeaderCardQuiz = styled.div<IPropsHeaderQuiz>`
  background-color: ${props =>
    props.themeCustom ? props.themeCustom.mainBg : theme.colors.mainBg};
  padding: 18px 30px;
  font-weight: bold;

  p {
    opacity: 0.8;
    color: ${props =>
      props.themeCustom
        ? props.themeCustom.contrastText
        : theme.colors.contrastText};
  }
`
