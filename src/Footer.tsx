import { useQuestionData } from "./hooks/useQuestionData"

export const Footer = () => {
  const { correct, incorrect, unanswer } = useQuestionData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`${correct} correctas - ${incorrect} incorrectas - ${unanswer}`}</strong>
    </footer>
  )
}