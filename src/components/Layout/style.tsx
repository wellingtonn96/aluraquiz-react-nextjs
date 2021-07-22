import styled from 'styled-components'

interface IBackgroundProps {
  background: string
}

export const Background = styled.div<IBackgroundProps>`
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
