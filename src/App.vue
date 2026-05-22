<script setup></script>

<template>
  <nav>
    <router-link to="/">Start</router-link>
    <router-link to="/questions">Lernen</router-link>
    <router-link to="/test-training">Test</router-link>
    <router-link to="/settings">Einstellungen</router-link>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
nav {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  background-color: green;
  width: 100%;
}

a {
  position: relative;
  font-weight: 700;
  line-height: 2rem;
  padding: 0.65rem 0.9rem;
  color: white;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

a:hover,
a:focus-visible {
  background-color: rgba(255, 255, 255, 0.12);
}

a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.16);
}

a.router-link-exact-active::after {
  position: absolute;
  right: 0.75rem;
  bottom: 0.35rem;
  left: 0.75rem;
  height: 0.18rem;
  border-radius: 999px;
  background-color: #d6f5df;
  content: '';
}

main {
  margin-top: 4rem;
  width: 100%;
}

#start-quiz {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

#start-quiz > a {
  color: black;
}
</style>
