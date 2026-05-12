# AGENTS.md - Application Overview

## Overview
This Vue.js application is a quiz/learning tool for the "AGT Fragenkatalog" (likely related to German fire department exams, based on NLBK references). It allows users to learn questions sequentially or take randomized tests, with category filtering and progress tracking. Built with Vue 3 (Composition API), Vite for tooling, and Pinia for state management, it's designed to be mobile-first and responsive.

## Architecture
- **Framework**: Vue 3 with Composition API for reactive components.
- **Build Tool**: Vite for fast development and bundling.
- **State Management**: Pinia store (`useQuestionsStore`) handles questions, categories, and inclusions.
- **Routing**: Vue Router with hash history for navigation between views.
- **Components Structure**:
  - `App.vue`: Root component with global navigation and conditional progress bar.
  - Views: `QuestionView.vue` (sequential learning), `TrainingView.vue` (randomized testing), `SettingsView.vue` (category toggles).
  - Reusable Components: `QuestionSet.vue` (manages question display), `MultiselectQuestion.vue` (individual questions), `MultiselectAnswer.vue` (answer options), `BottomSheet.vue` (modal for question jumping).
- **Data Source**: Questions loaded from `maschi.json` (structured as categories with questions and options).
- **Styling**: Scoped CSS with mobile-first approach, using flexbox for layouts.

## Working Mechanics
- **Question Loading**: On app start, questions are loaded into the Pinia store from JSON, filtered by included categories.
- **Learning Mode (QuestionView)**: Displays questions one at a time sequentially. Users check answers, view results, and navigate via prev/next buttons. URL query param (`?q=index`) tracks current question. Progress shown in nav bar (button with X/Y and thin progress bar). Bottom sheet modal allows jumping to any question via a grid of numbered buttons.
- **Test Mode (TrainingView)**: Randomizes 20 questions, shows all at once for answering, then displays results with wrong answers highlighted. No navigation; submit once.
- **Settings Mode**: Toggles category inclusions, affecting available questions in store.
- **Answer Handling**: Multiselect questions with checkboxes; correctness checked on submission. Results show green/red with icons.
- **Mobile UX**: Compact layouts, touch-friendly buttons, overlay modals (e.g., bottom sheet slides up from bottom).

## State Handling
- **Global State (Pinia Store)**:
  - `categories`: Array of category objects (name, questions, include flag).
  - Methods: `allQuestions()` (filtered by inclusion), `randomQuestions(size)` (shuffled subset), `setCategoryInclusion(name, bool)` (updates inclusion).
  - Reactive: Changes in settings immediately affect question pools.
- **Component State**:
  - `QuestionView`: Tracks current index, show results, bottom sheet visibility. Updates URL on index change.
  - `TrainingView`: Tracks results visibility, correct count, wrong indices.
  - `QuestionSet`: Manages current question index, show mode (single vs. results).
  - `MultiselectAnswer`: Tracks checked state, computes correctness.
- **Persistence**: No local storage; state resets on reload. URL params persist question index in learning mode.
- **Data Flow**: Store provides questions to views; components emit events (e.g., page switches) for parent updates. Bottom sheet communicates jumps via emits.

## Key Features
- Category-based filtering for customized learning.
- Progress visualization (nav bar + bottom sheet grid).
- Mobile-optimized: Responsive grid in bottom sheet, touch interactions.
- Accessibility: Labels, ARIA-friendly inputs, keyboard navigation implied.

## Dependencies
- Vue 3, Vue Router, Pinia.
- No external UI libs; pure Vue/CSS.
- JSON data file for questions.

This app focuses on educational mechanics with simple, performant state management suitable for offline use.
