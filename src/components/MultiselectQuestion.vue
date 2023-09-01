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
const hasImage = Object.prototype.hasOwnProperty.call(props.question, 'img')
questionsStore.$subscribe(() => {
  isVisible.value = calcVisibility()
})
// const publicPath = ref(process.env.BASE_URL)
</script>

<template>
  <div class="question" v-show="isVisible">
    <p class="title">
      <i>{{ questionIndex + 1 }}</i
      >{{ question.title }}
    </p>
    <img v-if="hasImage" :src="'/images/' + question.img"/>
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
  align-items: center;
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

img {
  margin-bottom: 1rem;
  max-width: 100%;
  height: auto;
}
</style>
