<script setup>
import { defineProps, defineEmits } from 'vue'

const { questions, currentIndex, visible } = defineProps({
  questions: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'selectQuestion'])

const previewText = (title) => {
  if (!title) return ''
  return title.split(' ').slice(0, 8).join(' ') + (title.split(' ').length > 8 ? '…' : '')
}

const select = (index) => {
  emit('selectQuestion', index)
  emit('close')
}

const close = () => {
  emit('close')
}
</script>

<template>
  <div v-if="visible" class="picker-overlay" @click.self="close">
    <div class="picker-sheet" role="dialog" aria-modal="true" aria-label="Frage auswählen">
      <div class="picker-handle"></div>
      <div class="picker-header">
        <h2>Frage auswählen</h2>
        <button type="button" class="picker-close" @click="close" aria-label="Schließen">✕</button>
      </div>
      <div class="picker-list">
        <button
          v-for="(question, index) in questions"
          :key="index"
          type="button"
          class="picker-item"
          :class="{ active: index === currentIndex }"
          @click="select(index)"
        >
          <span class="picker-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="picker-text">{{ previewText(question.title) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

.picker-sheet {
  width: 100%;
  max-width: 700px;
  max-height: 84vh;
  background: white;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 -18px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.picker-handle {
  width: 3rem;
  height: 0.3rem;
  border-radius: 999px;
  background: #d0d0d0;
  margin: 0.75rem auto 0.5rem;
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0.75rem;
  gap: 1rem;
}

.picker-header h2 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.picker-close {
  border: none;
  background: transparent;
  color: #333;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.5rem;
}

.picker-list {
  overflow-y: auto;
  border-top: 1px solid #ececec;
}

.picker-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  background: white;
  text-align: left;
  color: #1a1a1a;
  font: inherit;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f2;
}

.picker-item.active {
  background: #f4fff7;
}

.picker-item:hover {
  background: #f7f7f7;
}

.picker-number {
  flex-shrink: 0;
  min-width: 2.5rem;
  font-weight: 700;
  color: #18794e;
}

.picker-text {
  flex: 1;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}
</style>
