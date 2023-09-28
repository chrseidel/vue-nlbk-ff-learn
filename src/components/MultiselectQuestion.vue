<script setup>
import MultiselectAnswer from './MultiselectAnswer.vue'
import { ref } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionIndex: {
    type: Number,
    required: true
  },
  showResults: {
    type: Boolean,
    required: true
  }
})

const hasImage = Object.prototype.hasOwnProperty.call(props.question, 'img')

const options = ref([])
const isAnswerCorrect = () => options.value.map(o => o.isCorrectlyMarked()).every((o) => o == true)
const getQuestionIndex = () => props.questionIndex

defineExpose({
  isAnswerCorrect,
  getQuestionIndex
})

</script>

<template>
  <div class="question">
    <p class="title">
      {{ question.title }}
    </p>
    <img v-if="hasImage" :src="'/images/' + question.img"/>
    <MultiselectAnswer
      v-for="o in question.options"
      :question-index="questionIndex"
      :key="o.description"
      :description="o.description"
      :is-correct="o.correct"
      :show-results="showResults"
      ref="options"
    />
  </div>
</template>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.title {
  font-weight: bolder;
  padding-bottom: 1rem;
}

.title > i {
  display: inline-block;
  margin-right: 1.3rem;
  border: 1px solid black;
  width: 4rem;
  height: 3rem;
  border-radius: 2rem;
  text-align: center;
  line-height: 3rem;
  font-weight: bolder;
}

img {
  margin-bottom: 1rem;
  max-width: 100%;
  height: auto;
}
</style>
