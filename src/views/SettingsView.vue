<script setup>
import { useQuestionsStore } from '../stores/store'
import { ref } from 'vue'

const store = useQuestionsStore()
const categories = ref(store.getCategories())
console.log(JSON.stringify(categories.value))

const setCategoryInclusionStatus = (event) => {
  store.setCategoryInclusion(event.target.name, event.target.checked)
}

</script>

<template>
  <h1>Kategorien</h1>
  <ul>
    <li v-for="category in categories" :key="category">
      <input :id="category.name" :name="category.name" type="checkbox" :checked="category.include" @change="setCategoryInclusionStatus">
      <label class="category-label" :for="category.name">{{ category.name }}</label>
    </li>
  </ul>
</template>

<style scoped>
.category-label {
  margin-left: 1rem;
}
</style>
