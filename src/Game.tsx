import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionStore } from "./store/questions"
import { type Question as QuestionType } from "./types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Question = ({ info }: {info: QuestionType }) => {
  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left'}}>
      <Typography variant="h5">
        {info.question}
      </Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
    </SyntaxHighlighter>
    <List sx={{ bgcolor: '#333' }} disablePadding>
      {info.answers.map((answer, index) => (
        <ListItem disablePadding divider>
          <ListItemButton>
            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionStore(store => store.questions)
  const currentQuestion = useQuestionStore(store => store.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <Question info={questionInfo} />
  )
}