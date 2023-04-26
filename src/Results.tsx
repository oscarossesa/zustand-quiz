import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionData"
import { useQuestionStore } from "./store/questions"

export const Results = () => {
  const { correct, incorrect } = useQuestionData()
  const reset = useQuestionStore(state => state.reset)

  return (
    <div style={{ marginTop: '16px'}}>
      <h1>¡Your Results!</h1>

      <strong>
        <p>✅ {correct} correct</p>
        <p>❌ {incorrect} incorrect</p>
      </strong>

      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          ¡Start a new Game!
        </Button>
      </div>
    </div>
  )
}