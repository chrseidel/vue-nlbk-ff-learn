<script setup>
import { ref } from 'vue'

const props = defineProps({
  description: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
})

console.log(JSON.stringify(props))

const hashCode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
const descriptionHash = hashCode(props.description)
const answerIdentifier = ref(descriptionHash)
const showResult = ref(false)
const toggleResultIndicator = () => showResult.value = !showResult.value

defineExpose({
 toggleResultIndicator
})

</script>

<template>
  <div class="answer">
    <input type="checkbox" :name="answerIdentifier" :id="answerIdentifier" :value="description" />
    <label :for="answerIdentifier">{{ description }}</label>
    <p class="indicator" v-if="isCorrect && showResult">✅</p>
  </div>
</template>

<style scope>
.answer {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  border: 1px solid grey;
  border-radius: 5px;
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
}

input:checked ~ label {
  background-color: green;
  color: white;
}

input[type="checkbox"] {
  display: none;
  padding-right: 0;
  margin-right: 0;
}
</style>
