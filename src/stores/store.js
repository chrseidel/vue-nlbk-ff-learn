import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuestionsStore = defineStore('questions', () => {
  const currentQuestion = ref(0)
  const numQuestions = ref(1)

  const nextQuestion = () => {
    currentQuestion.value = (currentQuestion.value + 1) % numQuestions.value
  }

  const prevQuestion = () => {
    currentQuestion.value = (currentQuestion.value - 1) % numQuestions.value
  }

  const setNumQuestions = (num) => numQuestions.value = num

  return { currentQuestion, nextQuestion, prevQuestion, setNumQuestions}
})