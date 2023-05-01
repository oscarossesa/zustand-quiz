import { Container, Stack, Typography, useTheme } from '@mui/material';
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start';
import { Game } from './Game';
import { useQuestionStore } from './store/questions';
import useMediaQuery from "@mui/material/useMediaQuery";
import './App.css'

function App() {
  const questions = useQuestionStore(state => state.questions)

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
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
