import { defineStore } from 'pinia'
import agtJson from './maschi.json'

export const useQuestionsStore = defineStore('questions', () => {
  const categories = [
    agtJson
  ].map((json) => ({
      name: json.category,
      questions: json.questions.map((q) => ({ ...q, category: json.category})),
      include: true,
    })
  )

  const selectedQuestions = () => categories.filter((q) => q.include).map((q) => q.questions).reduce((prev, next) => prev.concat(next))

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

  return { setCategoryInclusion, getCategories, allQuestions, randomQuestions }
})
