import { defineStore } from 'pinia'
import maschiJson from './maschi.json'
import agtJson from './agt.json'
import brennenUndLoeschenJson from './brennen-und-loeschen.json'
import ersteHilfeJson from './erste-hilfe.json'
import fahrzeugkundeJson from './fahrzeugkunde.json'
import geraetekundeEinfacheTHJson from './geraetekunde-einfache-t-h.json'
import geraetekundeLoeschgeraeteJson from './geraetekunde-loeschgeraete.json'
import geraetekundeRettungsgeraeteJson from './geraetekunde-rettungsgeraete.json'
import geraetekundeSonstigeGeraeteJson from './geraetekunde-sonstige-geraete.json'
import loescheinsatzJson from './loescheinsatz.json'
import personenlicheAusruestungJson from './persoenliche-ausruestung.json'
import rechtsgrundlagenJson from './rechtsgrundlagen.json'
import rettungJson from './rettung.json'
import technischeHilfeleistungJson from './technische-hilfeleistung.json'
import unfallversicherungJson from './unfallversicherung.json'
import verhaltenBeiGefahrJson from './verhalten-bei-gefahr.json'
import { trainings } from '../config/trainings'

export const useQuestionsStore = defineStore('questions', () => {
  const categories = [
    maschiJson,
    agtJson,
    brennenUndLoeschenJson,
    ersteHilfeJson,
    fahrzeugkundeJson,
    geraetekundeEinfacheTHJson,
    geraetekundeLoeschgeraeteJson,
    geraetekundeRettungsgeraeteJson,
    geraetekundeSonstigeGeraeteJson,
    loescheinsatzJson,
    personenlicheAusruestungJson,
    rechtsgrundlagenJson,
    rettungJson,
    technischeHilfeleistungJson,
    unfallversicherungJson,
    verhaltenBeiGefahrJson
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

  const selectTraining = (trainingName) => {
    // First, exclude all categories
    categories.forEach((c) => c.include = false)
    // Find the training and include its categories
    const training = trainings.find(t => t.name === trainingName)
    if (training) {
      training.categories.forEach(catName => {
        const category = categories.find(c => c.name === catName)
        if (category) {
          category.include = true
        }
      })
    }
    // Store the selected training
    localStorage.setItem('selectedTraining', trainingName)
  }

  return { setCategoryInclusion, getCategories, allQuestions, randomQuestions, selectTraining }
})
