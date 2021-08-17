import { Container, HeaderCardQuiz } from './style'

const CardQuiz: React.FC<{
  header: string
  background?: string
  width?: string
}> = ({ children, header, background, width }) => {
  return (
    <Container background={background} width={width}>
      <HeaderCardQuiz>
        <p>{header}</p>
      </HeaderCardQuiz>
      <div className="img-cover"></div>
      <div className="content">{children}</div>
    </Container>
  )
}

export default CardQuiz
