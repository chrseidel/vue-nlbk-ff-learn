<script setup>
import QuestionSet from '../components/QuestionSet.vue'
import questionsJson from '../questions.json'
import { useQuestionsStore } from '../stores/store';
import { ref } from 'vue'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const randomQuestions = shuffleArray(questionsJson.questions).slice(0, 4)
const randomSelection = ref(randomQuestions)
const questionsStore = useQuestionsStore()
questionsStore.setNumQuestions(randomQuestions.length)

</script>

<template>
    <div id="main">
    <QuestionSet :questions="randomSelection"/>
    <div id="control">
      <button id="btn-prev" v-on:click="questionsStore.prevQuestion()">zurück</button>
      <button id="btn-next" v-on:click="questionsStore.nextQuestion()">weiter</button>
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

#btn-prev {
  background-color: white;
  color: black;
  border: 1px solid grey;
}
</style>
