import styled from 'styled-components'
import theme from '../../styles/theme'

export const ButtonStyled = styled.button`
  background-color: ${theme.colors.contrastText};
  width: 100%;
  height: 40px;
  border-radius: 5px;
  text-transform: uppercase;
  margin-top: 20px;
  border: 0;
  outline: 0;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    opacity: 0.5;
  }
`
