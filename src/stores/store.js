import { defineStore } from 'pinia'
import rechtsgrundlagenJson from './rechtsgrundlagen.json'
import brennenUndLoeschenJson from './brennen-und-loeschen.json'
import fahrzeugkundeJson from './fahrzeugkunde.json'
import { ref } from 'vue'

export const useQuestionsStore = defineStore('questions', () => {
  const categories = [rechtsgrundlagenJson, brennenUndLoeschenJson, fahrzeugkundeJson].map((json) => ({
      name: json.category,
      questions: json.questions,
      include: true,
    })
  )

  const selectedQuestions = () => categories.filter((q) => q.include).map((q) => q.questions).reduce((prev, next) => prev.concat(next))

  const currentQuestion = ref(0)

  const shuffleArray = (array) => {
    const arrCopy = [...array]
    for (let i = arrCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arrCopy[i]
      arrCopy[i] = arrCopy[j]
      arrCopy[j] = temp
    }
    return arrCopy
  }

  const nextQuestion = () => {
    currentQuestion.value = (currentQuestion.value + 1) % selectedQuestions().length
  }

  const prevQuestion = () => {
    if (currentQuestion.value == 0) {
      currentQuestion.value = selectedQuestions().length - 1
    } else {
      currentQuestion.value--
    }
  }

  const randomQuestions = (size) => {
    return shuffleArray(selectedQuestions()).slice(0, size)
  }

  const allQuestions = () => {
    return selectedQuestions()
  }

  const setCategoryInclusion = (name, isInclude) => {
    categories.filter((c) => c.name == name).forEach((c) => c.include = isInclude)
  }

  const getCategories = () => categories.map((category) => ({name: category.name, include: category.include}))

  return { setCategoryInclusion, getCategories, allQuestions, currentQuestion, nextQuestion, prevQuestion, randomQuestions }
})
