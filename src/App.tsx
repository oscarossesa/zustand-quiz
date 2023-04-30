import { Container, Stack, Typography } from '@mui/material';
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start';
import { Game } from './Game';
import { useQuestionStore } from './store/questions';
import './App.css'

function App() {
  const questions = useQuestionStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignContent='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>JavaScript Quiz</Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
