import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    justify-content: center;
  }

  div.loading {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    justify-self: center;
  }
`

export const ButtonNewQuizContainer = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: row-reverse;
`
