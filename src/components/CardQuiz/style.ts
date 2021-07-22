import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  background-color: ${theme.colors.primary};
  width: 350px;
  margin-bottom: 20px;
  border: 1px solid ${theme.colors.mainBg};
  color: ${theme.colors.contrastText};
  border-radius: 5px;
`
export const HeaderCardQuiz = styled.div`
  background-color: ${theme.colors.mainBg};
  color: ${theme.colors.primary};
  padding: 15px;
`
