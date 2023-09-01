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
  }
})

const hashCode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
const descriptionHash = hashCode(props.description)
const answerIdentifier = ref(descriptionHash)
const showResult = ref(false)

const resultClass = computed(() => ({
  correct: showResult.value && props.isCorrect
}))

watch(
  () => props.showResults,
  (newVal) => {
    showResult.value = newVal
  }
)
</script>

<template>
  <div class="answer">
    <input type="checkbox" :name="answerIdentifier" :id="answerIdentifier" :value="description" />
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
}

.indicator {
  position: absolute;
  left: 0;
}

label {
  width: 100%;
  font-size: 1.3rem;
  padding: 1rem;
  border: 2px solid lightgray;
  border-radius: 5px;
}

input:checked ~ label {
  border: 2px solid green;
}

input[type='checkbox'] {
  display: none;
  padding-right: 0;
  margin-right: 0;
}

.correct {
  background-color: green;
  color: white;
}
</style>
