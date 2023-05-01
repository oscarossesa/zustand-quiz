import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Question } from '../types'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[],
  currentQuestion: number,
  fetchQuestions: (limit: number) => Promise<void>,
  selectAnswer: (questionId: number, answerIndex: number) => void,
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  reset: () => void,
}

const API_URL = import.meta.env.PROD ? 'https://oscarossesa.github.io/zustand-quiz/' : 'http://localhost:5173/'

export const useQuestionStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({    
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch(`${API_URL}/data.json`)
          const json = await res.json()

          const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

          set({ questions }, false, 'FETCH_QUESTIONS')
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get()

          const newQuestions = structuredClone(questions)
          const questionIndex = questions.findIndex(q => q.id === questionId)
          const questionInfo = newQuestions[questionIndex]
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
          
          if (isCorrectUserAnswer) confetti()

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
          }
          
          set({ questions: newQuestions }, false, 'SELECT_ANSWER')
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get()
          const nextQuestion = currentQuestion + 1

          if (nextQuestion < questions. length) {
            set({ currentQuestion: nextQuestion}, false, 'GO_NEXT_QUESTION')
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get()
          const previousQuestion = currentQuestion - 1

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion}, false, 'GO_PREVIOUS_QUESTION')
          }
        },
        reset: () => {
          set({ currentQuestion: 0, questions: [] }, false, 'RESET')
        }
      }),
      {
        name: 'question-store',
      }
    )
  )
)
