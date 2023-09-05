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

const isVisible = (index) => currentQuestionIndex.value == index

const nextQuestion = () => {
  currentQuestionIndex.value = (currentQuestionIndex.value + 1) % props.questions.length
  emit('pageSwitch', currentQuestionIndex.value)
}

const prevQuestion = () => {
  currentQuestionIndex.value = (currentQuestionIndex.value == 0) ? props.questions.length - 1 : currentQuestionIndex.value - 1
  emit('pageSwitch', currentQuestionIndex.value)
}

const numCorrectAnswers = ()=>  questionElements.value.filter((e) => e.isAnswerCorrect()).length

defineExpose({
  nextQuestion,
  prevQuestion,
  numCorrectAnswers
})

</script>

<template>
  <p>{{ currentQuestionIndex+1 }} / {{ questions.length }}</p>
  <MultiselectQuestion
    v-for="(q, index) in questions"
    :key="q.title"
    :question="q"
    :question-index="index"
    :show-results="showResults"
    ref="questionElements"
    v-show="isVisible(index)"
  />
</template>

<style scoped>
#questions {
  display: flex;
  flex-direction: column;
}
</style>
