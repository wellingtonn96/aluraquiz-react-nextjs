import { Container, HeaderCardQuiz } from './style'

const CardQuiz: React.FC<{
  header: string
}> = ({ children, header }) => {
  return (
    <Container>
      <HeaderCardQuiz>
        <p>{header}</p>
      </HeaderCardQuiz>
      {children}
    </Container>
  )
}

export default CardQuiz
