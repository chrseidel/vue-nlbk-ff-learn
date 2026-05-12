<script setup>
import { ref, watch } from 'vue'
import MultiselectQuestion from './MultiselectQuestion.vue'
import QuestionPicker from './QuestionPicker.vue'

const props = defineProps({
  questions: {
    type: Array,
    required: true
  },
  showResults: {
    type: Boolean,
    required: true
  },
  currentIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['pageSwitch'])

const questionElements = ref([])
const currentQuestionIndex = ref(props.currentIndex)
const showQuestions = ref([])
const showResultMode = ref(false)
const pickerOpen = ref(false)

const openPicker = () => {
  pickerOpen.value = true
}

const closePicker = () => {
  pickerOpen.value = false
}

const selectQuestion = (index) => {
  currentQuestionIndex.value = index
  emit('pageSwitch', currentQuestionIndex.value)
}

watch(() => props.currentIndex, (newIndex) => {
  currentQuestionIndex.value = newIndex
})

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
    <button type="button" class="progress" @click="openPicker">
      {{ currentQuestionIndex+1 }} / {{ questions.length }} – {{ questions[currentQuestionIndex].category }}
    </button>
    <MultiselectQuestion
      v-for="(q, index) in questions"
      :key="q.title"
      :question="q"
      :question-index="index"
      :show-results="showResults"
      ref="questionElements"
      v-show="isVisible(index)"
    />
    <QuestionPicker
      :questions="questions"
      :current-index="currentQuestionIndex"
      :visible="pickerOpen"
      @close="closePicker"
      @selectQuestion="selectQuestion"
    />
  </div>
</template>

<style scoped>
#questions {
  display: flex;
  flex-direction: column;
}

.progress {
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
  border: 1px solid #d8d8d8;
  border-radius: 0.75rem;
  padding: 0.35rem 1rem;
  background: #fdfdfd;
  color: #1a1a1a;
  cursor: pointer;
  margin-bottom: 1rem;
}

.progress:focus-visible {
  outline: 2px solid #4cae4c;
  outline-offset: 3px;
}
</style>
