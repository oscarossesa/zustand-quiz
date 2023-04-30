import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionStore } from "./store/questions"
import { type Question as QuestionType } from "./types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const setBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  console.log(userSelectedAnswer, correctAnswer)

  // user has been no selected an option yet
  if (userSelectedAnswer == null) return 'transparent'

  // if already selected an option but it not is correct
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

  // if answer is correct
  if (index === correctAnswer) return 'green'

  // if this is the option selected by the user but not is the correct answer
  if (index === userSelectedAnswer) return 'red'

  // none of the above
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore(store => store.selectAnswer)
  
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', marginTop: 4, p: 2, textAlign: 'left'}}>
      <Typography variant="h5">
        {info.question}
      </Typography>
      
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: setBackgroundColor(info, index)
              }}
            >
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