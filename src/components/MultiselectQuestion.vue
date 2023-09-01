<script setup>
import MultiselectAnswer from './MultiselectAnswer.vue'
import { useQuestionsStore } from '../stores/store'
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

const calcVisibility = () => questionsStore.currentQuestion === props.questionIndex
const questionsStore = useQuestionsStore()
const isVisible = ref(calcVisibility())

questionsStore.$subscribe(() => {
  isVisible.value = calcVisibility()
})
</script>

<template>
  <div class="question" v-show="isVisible">
    <p class="title">
      <i>{{ questionIndex + 1 }}</i
      >{{ question.title }}
    </p>
    <MultiselectAnswer
      v-for="o in question.options"
      :key="o.description"
      :description="o.description"
      :is-correct="o.correct"
      :show-results="showResults"
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
  font-weight: 700;
  padding-bottom: 2rem;
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
</style>
