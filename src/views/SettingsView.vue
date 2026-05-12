<script setup>
import { useQuestionsStore } from '../stores/store'
import { ref, computed } from 'vue'
import { trainings } from '../config/trainings'

const store = useQuestionsStore()
const categories = ref(store.getCategories())

// Group categories by training
const groupedCategories = computed(() => {
  const groups = {}
  trainings.forEach(training => {
    groups[training.name] = {
      description: training.description,
      categories: categories.value.filter(cat => training.categories.includes(cat.name))
    }
  })
  return groups
})

const setCategoryInclusionStatus = (event) => {
  store.setCategoryInclusion(event.target.name, event.target.checked)
}

</script>

<template>
  <h1>Kategorien</h1>
  <div v-for="(training, trainingName) in groupedCategories" :key="trainingName" class="training-group">
    <h2>{{ trainingName }}</h2>
    <p class="training-description">{{ training.description }}</p>
    <ul>
      <li v-for="category in training.categories" :key="category.name">
        <input :id="category.name" :name="category.name" type="checkbox" :checked="category.include" @change="setCategoryInclusionStatus">
        <label class="category-label" :for="category.name">{{ category.name }}</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.category-label {
  margin-left: 1rem;
}

ul {
  list-style-type: none;
}

.training-group {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
}

.training-group h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
}

.training-description {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

.training-group ul {
  margin: 0;
  padding-left: 1rem;
}
</style>
