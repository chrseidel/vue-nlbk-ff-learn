<script setup>
import QuestionSet from '../components/QuestionSet.vue'
import { useQuestionsStore } from '../stores/store'
import { ref } from 'vue'

const questionsStore = useQuestionsStore()
const questions = ref(questionsStore.randomQuestions(20))
const questionSetCmpnt = ref(null)
const showQuestions = ref(true)
const resultsVisible = ref(false)

const numCorrectAnswers = ref(null)

const nextQuestion = () => questionSetCmpnt.value.nextQuestion()
const prevQuestion = () => questionSetCmpnt.value.prevQuestion()

const onPageSwitch = (pageIndex) => {
  isLastPage.value = pageIndex == questions.value.length-1
  isFirstPage.value = pageIndex == 0
}

const isFirstPage = ref(true)
const isLastPage = ref(false)

const showResults = () => {
  numCorrectAnswers.value = questionSetCmpnt.value.numCorrectAnswers()
  showQuestions.value = false
  resultsVisible.value = true
}

</script>

<template>
  <div id="main">
    <QuestionSet v-if="showQuestions" :questions="questions" :show-results=false ref="questionSetCmpnt" @page-switch="(newPage) => onPageSwitch(newPage)"/>
    <div v-if="showQuestions" id="control">
      <button :disabled="isFirstPage" id="btn-prev" @click="prevQuestion()">Zurück</button>
      <button v-show="!isLastPage" id="btn-next" @click="nextQuestion()">Weiter</button>
      <button v-show="isLastPage" id="btn-finish" @click="showResults()">Lösen</button>
    </div>
    <div v-if="resultsVisible">
      <p>{{ numCorrectAnswers }} / {{ questions.length }} Fragen korrekt.</p>
    </div>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

#control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button {
  display: block;
  width: 45%;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  color: white;
  border-radius: 5px;
}

#btn-next {
  background-color: green;
}

#btn-check {
  border: 1px solid green;
  color: black;
  background-color: white;
}

#btn-prev {
  background-color: white;
  color: black;
  border: 1px solid grey;
}

#btn-prev[disabled] {
  color: lightgrey;
  border: 1px solid lightgrey
}
</style>
