import { Container, HeaderCardQuiz } from './style'

const CardQuiz: React.FC<{
  header: string
  background?: string
  width?: string
  theme?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}> = ({ children, header, background, width, theme }) => {
  return (
    <Container background={background} width={width} themeCustom={theme}>
      <HeaderCardQuiz themeCustom={theme}>
        <p>{header}</p>
      </HeaderCardQuiz>
      <div className="img-cover"></div>
      <div className="content">{children}</div>
    </Container>
  )
}

export default CardQuiz
