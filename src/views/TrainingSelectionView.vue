<script setup>
import { useRouter } from 'vue-router'
import { useQuestionsStore } from '../stores/store'
import { trainings } from '../config/trainings'
import { computed } from 'vue'

const router = useRouter()
const store = useQuestionsStore()

const selectedTraining = computed(() => localStorage.getItem('selectedTraining'))

const continueWithLastTraining = () => {
  if (selectedTraining.value) {
    const training = trainings.find(t => t.name === selectedTraining.value)
    if (training) {
      store.selectTraining(training.name)
    }
  }
  router.push('/questions')
}

const selectTraining = (training) => {
  store.selectTraining(training.name)
  router.push('/questions')
}
</script>

<template>
  <div id="training-selection">
    <h1>Wähle dein Training</h1>
    <div v-if="selectedTraining" class="last-training">
      <p>Zuletzt gewählt: <strong>{{ selectedTraining }}</strong></p>
      <button class="continue-button" @click="continueWithLastTraining">Mit diesem Training fortfahren</button>
    </div>
    <div class="training-list">
      <button
        v-for="training in trainings"
        :key="training.name"
        class="training-card"
        @click="selectTraining(training)"
      >
        <h2>{{ training.name }}</h2>
        <p>{{ training.description }}</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
#training-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.last-training {
  background: #e8f5e8;
  border: 1px solid #4caf50;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
}

.continue-button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.continue-button:hover {
  background: #45a049;
}

.training-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.training-card {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.training-card:hover {
  background: #e9ecef;
}

.training-card h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #495057;
}

.training-card p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
}
</style>