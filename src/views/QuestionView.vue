<script setup>
import QuestionSet from '../components/QuestionSet.vue'
import { useQuestionsStore } from '../stores/store'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const questionsStore = useQuestionsStore()
const questions = ref(questionsStore.allQuestions())
const isCheckBtnVisible = ref(true)
const isNextBtnVisisble = ref(false)
const showResult = ref(false)
const questionSet = ref(null)
const currentQuestionIndex = ref(0)

const updateURL = () => {
  router.replace({ 
    query: { 
      q: currentQuestionIndex.value 
    }
  })
}

const checkAnswers = () => {
  showNextButton()
  showResult.value = true
}

const nextQuestion = () => {
  showResult.value = false
  showCheckButton()
  currentQuestionIndex.value++
  updateURL()
}

const prevQuestion = () => {
  currentQuestionIndex.value--
  updateURL()
}

const onPageSwitch = (newIndex) => {
  currentQuestionIndex.value = newIndex
  updateURL()
}

const showNextButton = () => {
  isCheckBtnVisible.value = false
  isNextBtnVisisble.value = true
}

const showCheckButton = () => {
  isCheckBtnVisible.value = true
  isNextBtnVisisble.value = false
}

// Initialisiere die Startfrage aus der URL
onMounted(() => {
  const startQuestion = parseInt(route.query.q) || 0
  if (startQuestion >= 0 && startQuestion < questions.value.length) {
    currentQuestionIndex.value = startQuestion
  }
})
</script>

<template>
  <div id="main">
    <QuestionSet 
      :questions="questions" 
      :show-results="showResult" 
      :current-index="currentQuestionIndex"
      ref="questionSet" 
      :show-questions="[currentQuestionIndex]"
      @page-switch="onPageSwitch"
    />
    <div id="control">
      <button 
        id="btn-prev" 
        @click="prevQuestion()"
        :disabled="currentQuestionIndex <= 0"
      >zurück</button>
      <button 
        v-if="isCheckBtnVisible" 
        id="btn-check" 
        @click="checkAnswers()"
      >Lösung</button>
      <button 
        v-if="isNextBtnVisisble" 
        id="btn-next" 
        @click="nextQuestion()"
        :disabled="currentQuestionIndex >= questions.length - 1"
      >weiter</button>
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
