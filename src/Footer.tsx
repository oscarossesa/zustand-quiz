import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionData"
import { useQuestionStore } from "./store/questions"

export const Footer = () => {
  const reset = useQuestionStore(store => store.reset)
  const { correct, incorrect, unanswered } = useQuestionData()

  const handleReset = () => reset()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correct - ❌ ${incorrect} incorrect - ❓ ${unanswered} unanswered`}</strong>
      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <Button onClick={handleReset}>
          Reset Game
        </Button>
      </div>
    </footer>
  )
}