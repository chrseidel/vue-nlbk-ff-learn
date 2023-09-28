<script setup>
import { ref } from 'vue'
import MultiselectQuestion from './MultiselectQuestion.vue'

const props = defineProps({
  questions: {
    type: Array,
    required: true
  },
  showResults: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['pageSwitch'])

const questionElements = ref([])
const currentQuestionIndex = ref(0)
const showQuestions = ref([])
const showResultMode = ref(false)


const isVisible = (index) => {
  return (!showResultMode.value && currentQuestionIndex.value == index) || showQuestions.value.includes(index)
}

const nextQuestion = () => {
  currentQuestionIndex.value = (currentQuestionIndex.value + 1) % props.questions.length
  emit('pageSwitch', currentQuestionIndex.value)
}

const prevQuestion = () => {
  currentQuestionIndex.value = (currentQuestionIndex.value == 0) ? props.questions.length - 1 : currentQuestionIndex.value - 1
  emit('pageSwitch', currentQuestionIndex.value)
}

const numCorrectAnswers = ()=>  questionElements.value.filter((e) => e.isAnswerCorrect()).length
const getWrongAnswers = () => questionElements.value.filter((e) => !e.isAnswerCorrect())
const show = (questionsIndexes) => {
  showResultMode.value = true
  showQuestions.value = questionsIndexes
}

defineExpose({
  nextQuestion,
  prevQuestion,
  numCorrectAnswers,
  getWrongAnswers,
  show
})

</script>

<template>
  <div>
  <p class="progress" v-show="!showResultMode">{{ currentQuestionIndex+1 }} / {{ questions.length }} – {{ questions[currentQuestionIndex].category }}</p>
  <MultiselectQuestion
    v-for="(q, index) in questions"
    :key="q.title"
    :question="q"
    :question-index="index"
    :show-results="showResults"
    ref="questionElements"
    v-show="isVisible(index)"
  />
</div>
</template>

<style scoped>
#questions {
  display: flex;
  flex-direction: column;
}

.progress {
  font-size: small;
}


</style>
