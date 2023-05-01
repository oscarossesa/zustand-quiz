import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionData"
import { useQuestionStore } from "./store/questions"

export const Footer = () => {
  const reset = useQuestionStore(store => store.reset)
  const { correct, incorrect, unanswer } = useQuestionData()

  const handleReset = () => reset()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`${correct} correctas - ${incorrect} incorrectas - ${unanswer}`}</strong>
      <div>
        <Button onClick={handleReset}>
          Reset Game
        </Button>
      </div>
    </footer>
  )
}