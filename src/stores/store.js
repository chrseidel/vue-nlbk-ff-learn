import { defineStore } from 'pinia'
import rechtsgrundlagenJson from './rechtsgrundlagen.json'
import brennenUndLoeschenJson from './brennen-und-loeschen.json'
import fahrzeugkundeJson from './fahrzeugkunde.json'
import { ref } from 'vue'

export const useQuestionsStore = defineStore('questions', () => {
  const rechtsgrundlagen = rechtsgrundlagenJson.questions
  const brennenUndLoeschen = brennenUndLoeschenJson.questions
  const fahrzeugkunde = fahrzeugkundeJson.questions

  const allCategories = rechtsgrundlagen.concat(brennenUndLoeschen).concat(fahrzeugkunde)

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
    currentQuestion.value = (currentQuestion.value + 1) % allCategories.length
  }

  const prevQuestion = () => {
    if (currentQuestion.value == 0) {
      currentQuestion.value = allCategories.length - 1
    } else {
      currentQuestion.value--
    }
  }

  const randomQuestions = (size) => {
    return shuffleArray(allCategories).slice(0, size)
  }

  const allQuestions = () => {
    return allCategories
  }

  return { allQuestions, currentQuestion, nextQuestion, prevQuestion, randomQuestions }
})
