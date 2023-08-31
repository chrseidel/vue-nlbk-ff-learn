<script setup>
import MultiselectQuestion from './MultiselectQuestion.vue';

defineProps({
  questions: {
    type: Array,
    required: true
  }
})
</script>

<template>
    <MultiselectQuestion v-for="(q, index) in questions" :key="q.title" :question="q" :question-index="index" />
</template>

<style scoped>
#questions {
  display: flex;
  flex-direction: column;
}
</style>
