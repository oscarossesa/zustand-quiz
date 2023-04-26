import { Box, Container, Stack, Typography, useTheme } from '@mui/material'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { Game } from './Game'
import { useQuestionStore } from './store/questions'
import useMediaQuery from "@mui/material/useMediaQuery"
import { useQuestionData } from "./hooks/useQuestionData"
import { Results } from './Results'
import './App.css'

function App() {
  const questions = useQuestionStore(state => state.questions)
  const { unanswered } = useQuestionData()

  const theme = useTheme()

  const medium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main>
      <Container maxWidth='sm'>
        
        <Stack direction='row' gap={2} alignContent='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant={medium ? 'h2' : 'h5'} component='h1'>
            JavaScript Quiz
          </Typography>
        </Stack>
        
        <Box margin={5}>
          {questions.length === 0 && <Start />}
        </Box>
        
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <Results />}

        <strong style={{ fontSize: '18px', display: 'block' }}>
          Project based on <a style={{ color: 'yellow' }} href='https://midu.dev/'>¡midudev!</a>
        </strong>
        
        <strong style={{ fontSize: '18px', display: 'block' }}>
          ¿Do you want to learn React ⚛️? <a style={{ color: 'yellow' }} href='https://github.com/midudev/aprendiendo-react'>¡Go ahead!</a>
        </strong>

        <strong style={{ display: 'block', fontSize: '14px', marginTop: '16px' }}>
          Desarrollado con TypeScript + Zustand - 
          <a style={{ color: 'yellow' }} href='https://github.com/oscarossesa/zustand-quiz'>
            Go to code
          </a>
        </strong>
      
      </Container>
    </main>
  )
}

export default App
