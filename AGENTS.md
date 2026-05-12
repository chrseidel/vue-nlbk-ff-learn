# AGENTS.md - Application Overview

## Overview
This Vue.js application is a comprehensive quiz/learning tool for German fire department training (NLBK - Niedersächsisches Landesbrandschule Kuratorium). It supports multiple training programs including "Truppmann Teil 1", "Maschinisten Lehrgang", and "AGT (Ausbildung zum Atemschutzgeräteträger)". Users can learn questions sequentially, take randomized tests, and customize their learning by selecting specific training programs and categories. Built with Vue 3 (Composition API), Vite for tooling, and Pinia for state management, it's designed to be mobile-first and responsive.

## Architecture
- **Framework**: Vue 3 with Composition API for reactive components.
- **Build Tool**: Vite for fast development and bundling.
- **State Management**: Pinia store (`useQuestionsStore`) handles questions, categories, training selection, and category inclusions.
- **Routing**: Vue Router with hash history for navigation between views. Routes: `/` (training selection), `/questions` (learning mode), `/test-training` (test mode), `/settings` (category settings).
- **Configuration**: `src/config/trainings.js` defines available trainings and their associated categories.
- **Components Structure**:
  - `App.vue`: Root component with green navigation bar and router outlet.
  - Views: 
    - `TrainingSelectionView.vue` (training selection landing page with "continue with last training" feature)
    - `QuestionView.vue` (sequential learning mode)
    - `TrainingView.vue` (randomized test mode)
    - `SettingsView.vue` (category management grouped by training)
  - Reusable Components: 
    - `QuestionSet.vue` (manages question display, navigation, and integrates QuestionPicker)
    - `QuestionPicker.vue` (mobile bottom-sheet for jumping to specific questions with preview text)
    - `MultiselectQuestion.vue` (individual question display)
    - `MultiselectAnswer.vue` (answer option checkboxes)
- **Data Source**: Questions loaded from 16 JSON files (`src/stores/`) organized by category/training.
- **Styling**: Scoped CSS with mobile-first approach, using flexbox for layouts. Navigation bar is green with white text.
- **Persistence**: localStorage stores selected training between sessions (key: `selectedTraining`).

## Question Data Structure
Questions are organized in JSON files by category. Each JSON file contains:
- `category`: Category name (maps to training categories)
- `questions`: Array of question objects, each with:
  - `text`: Question text
  - `answers`: Array of answer option objects:
    - `text`: Answer text
    - `correct`: Boolean indicating correctness

## Working Mechanics

### Training Selection (TrainingSelectionView)
- **Landing page**: Users see available trainings on app startup
- **Continue feature**: If a training was previously selected, displays it highlighted with a "Continue" button
- **Training selection**: Clicking a training card calls `store.selectTraining(trainingName)` and navigates to `/questions`
- **Training-based filtering**: Selecting a training sets category inclusions based on that training's configured categories

### Question Loading & Filtering
- On app start or training selection, questions are loaded into Pinia store from JSON files
- `selectTraining(trainingName)` method:
  - Finds training config by name
  - Sets `include: true` only for categories in that training's `categories` array
  - Sets `include: false` for all other categories
- `allQuestions()` returns only questions from categories with `include: true`
- `randomQuestions(size)` returns shuffled subset of included questions

### Learning Mode (QuestionView)
- Displays questions one at a time sequentially
- **Progress button**: Clickable headline showing "X / Y" question count opens QuestionPicker bottom-sheet
- **QuestionPicker**: 
  - Shows grid of question numbers
  - Displays preview text (first words of each question title)
  - Touch-friendly for mobile
  - Selecting a number navigates to that question
- **URL tracking**: Current question index tracked via URL query param (persists on reload)
- **Navigation**: Prev/Next buttons navigate between questions
- **Answer submission**: Users check correct answers, click Submit to see results
- **Results display**: Green checkmark for correct, red X for incorrect answers

### Test Mode (TrainingView)
- Randomizes 20 questions from included categories
- Shows all questions at once with numbered labels
- Users check answers and click Submit once
- Results page displays:
  - Total correct/incorrect count
  - Wrong answers highlighted in red for review

### Settings Mode (SettingsView)
- **Grouped display**: Categories organized under their parent training headings
- **Category toggles**: Checkboxes to include/exclude specific categories
- **Training headers**: Visual separation showing which training each category belongs to
- **Real-time effect**: Toggling categories immediately affects question pools in learning/test modes

### Answer Handling
- Multiselect questions with checkboxes (users can select multiple answers)
- Correctness computed by comparing selected answers to correct answers
- Results show visual feedback: green (correct) or red (incorrect)

### Mobile UX
- Compact layouts with mobile-first CSS
- Touch-friendly buttons and interactive elements
- QuestionPicker bottom-sheet slides up from bottom for navigation
- Responsive grid layout for training cards and question picker
- Navigation bar spans full width with centered content

## State Handling
- **Global State (Pinia Store)**:
  - `categories`: Array of category objects, each with `name`, `questions`, `include` flag
  - `selectedTraining`: Currently selected training name (set by `selectTraining()`)
  - Methods:
    - `selectTraining(name)`: Set category inclusions based on training config, save to localStorage
    - `allQuestions()`: Return questions from `include: true` categories
    - `randomQuestions(size)`: Shuffled subset of included questions
    - `setCategoryInclusion(name, bool)`: Toggle category inclusion
- **Component State**:
  - `QuestionView`: Tracks current question index, results display state, QuestionPicker visibility
  - `TrainingSelectionView`: Reads localStorage for last selected training on mount
  - `TrainingView`: Tracks current question set, results visibility, correct/incorrect counts
  - `QuestionSet`: Manages question display index, navigation, picker open/close
  - `QuestionPicker`: Tracks selected question number, computes preview text truncation
  - `MultiselectAnswer`: Tracks checkbox checked state for each answer
- **Persistence**: 
  - Selected training saved to localStorage (persists across sessions)
  - Current question index tracked via URL (persists on reload in learning mode)
  - Category inclusion state stored in Pinia (resets when training is changed)
- **Data Flow**: Store provides questions to views; components emit events for parent updates (e.g., `pageSwitch` for question selection)

## Key Features
- **Multi-training support**: Seamlessly switch between different training programs
- **Customized learning**: Filter questions by training and category
- **Mobile-optimized question picker**: Bottom-sheet with preview text for easy navigation
- **Progress tracking**: Visual indication of current question position
- **Continue learning**: App remembers last selected training
- **Test mode**: Randomized test with instant results
- **Settings management**: Organized by training for clarity
- **Offline-capable**: No external dependencies; runs in browser with localStorage

## Data Files
16 question JSON files located in `src/stores/`:
- `maschi.json` - Maschinisten Lehrgang
- `agt.json` - AGT training
- `brennen-und-loeschen.json` - Burning and Extinguishing
- `erste-hilfe.json` - First Aid
- `fahrzeugkunde.json` - Vehicle Knowledge
- `geraetekunde-einfache-t-h.json` - Equipment: Simple Technical Help
- `geraetekunde-loeschgeraete.json` - Equipment: Extinguishing Devices
- `geraetekunde-rettungsgeraete.json` - Equipment: Rescue Devices
- `geraetekunde-sonstige-geraete.json` - Equipment: Other Devices
- `loescheinsatz.json` - Extinguishing Operations
- `persoenliche-ausruestung.json` - Personal Equipment
- `rechtsgrundlagen.json` - Legal Basics
- `rettung.json` - Rescue
- `technische-hilfeleistung.json` - Technical Help
- `unfallversicherung.json` - Accident Insurance
- `verhalten-bei-gefahr.json` - Behavior in Danger

## Dependencies
- Vue 3: Core framework
- Vue Router: Client-side routing
- Pinia: State management
- Vite: Build tool
- No external UI libraries; pure Vue 3 and CSS

This app focuses on comprehensive training management with flexible category filtering, mobile-optimized navigation, and simple, performant state management suitable for offline use.
