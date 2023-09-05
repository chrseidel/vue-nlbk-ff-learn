<script setup>
import QuestionSet from '../components/QuestionSet.vue'

import { useQuestionsStore } from '../stores/store'
import { ref } from 'vue'

const questionsStore = useQuestionsStore()
const questions = ref(questionsStore.allQuestions())
const isCheckBtnVisible = ref(true)
const isNextBtnVisisble = ref(false)
const showResult = ref(false)
const questionSet = ref(null)

const checkAnswers = () => {
  showNextButton()
  showResult.value = true
}

const nextQuestion = () => {
  showResult.value = false
  showCheckButton()
  questionSet.value.nextQuestion()
}

const showNextButton = () => {
  isCheckBtnVisible.value = false
  isNextBtnVisisble.value = true
}

const showCheckButton = () => {
  isCheckBtnVisible.value = true
  isNextBtnVisisble.value = false
}

const prevQuestion = () => {
  questionSet.value.prevQuestion()
}
</script>

<template>
  <div id="main">
    <QuestionSet :questions="questions" :show-results="showResult" ref="questionSet"/>
    <div id="control">
      <button id="btn-prev" @click="prevQuestion()">zurück</button>
      <button v-if="isCheckBtnVisible" id="btn-check" @click="checkAnswers()">Lösung</button>
      <button v-if="isNextBtnVisisble" id="btn-next" @click="nextQuestion()">weiter</button>
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
</style>
