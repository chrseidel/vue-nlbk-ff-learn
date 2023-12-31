<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  description: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  showResults: {
    type: Boolean,
    required: true
  },
  questionIndex: {
    type: Number,
    required: true
  }
})

const hashCode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

const descriptionHash = hashCode(props.description + props.questionIndex)
const answerIdentifier = ref(descriptionHash)
const showResult = ref(false)

const resultClass = computed(() => ({
  correct: showResult.value && props.isCorrect,
  wrong: showResult.value && !props.isCorrect
}))

watch(
  () => props.showResults,
  (newVal) => {
    showResult.value = newVal
  }
)

const isChecked = ref(false)

const isCorrectlyMarked = () => isChecked.value == props.isCorrect
defineExpose({
  isCorrectlyMarked
})

</script>

<template>
  <div class="answer">
    <input class="question-input" type="checkbox" :name="answerIdentifier" :id="answerIdentifier" v-model="isChecked"/>
    <label :class="resultClass" :for="answerIdentifier">{{ description }}</label>
  </div>
</template>

<style scope>
.answer {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}

.answer > label {
  width: 100%;
  font-size: 1.3rem;
  padding: 0.7rem;
  border: 2px solid lightgray;
  border-radius: 5px;
}

.answer > label {
  cursor: pointer;
}

.question-input:checked ~ label {
  border: 2px solid green;
}

.question-input[type='checkbox'] {
  display: none;
  padding-right: 0;
  margin-right: 0;
}

.correct {
  background-color: green;
  color: white;
}

.question-input:not(:checked) ~ .correct::after, .question-input:checked ~ .wrong::after {
  display: block;
  position: absolute;
  content: "❌";
  top: 1rem;
  left: -1.9rem;
}

.question-input:checked ~ .correct::after, .question-input:not(:checked) ~ .wrong::after {
  display: block;
  position: absolute;
  content: "✅";
  top: 1rem;
  left: -1.9rem;
}

</style>
